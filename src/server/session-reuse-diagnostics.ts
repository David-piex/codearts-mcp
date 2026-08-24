export type SessionReuseDiagnosticsEvent = {
  recordedAt: string;
  method: string;
  path: string;
  statusCode: number;
  sessionId?: string;
  mcpMethod?: string;
  toolName?: string;
};

export type SessionReuseDiagnosticsSnapshot = {
  maxRetainedEvents: number;
  retainedEventCount: number;
  totals: {
    initialize: number;
    toolCalls: number;
    authConfigureSession: number;
    nonAuthToolCalls: number;
  };
  ratios: {
    initializeToToolCall: number | null;
    authConfigureSessionToToolCall: number | null;
    authConfigureSessionToInitialize: number | null;
  };
  sessions: {
    seen: number;
    withToolCalls: number;
    withAuthConfigureSession: number;
    withNonAuthToolCalls: number;
    authOnly: number;
    reusedForNonAuthToolCalls: number;
    averageNonAuthToolCallsPerActiveSession: number | null;
  };
  topSessions: Array<{
    sessionId: string;
    totalEvents: number;
    initializeCount: number;
    toolCalls: number;
    authConfigureSessionCalls: number;
    nonAuthToolCalls: number;
    firstSeenAt: string;
    lastSeenAt: string;
  }>;
  findings: string[];
};

type SessionReuseDiagnosticsStore = {
  record: (event: SessionReuseDiagnosticsEvent) => void;
  snapshot: () => SessionReuseDiagnosticsSnapshot;
};

function roundRatio(value: number) {
  return Math.round(value * 1_000) / 1_000;
}

function divide(numerator: number, denominator: number) {
  if (denominator === 0) {
    return null;
  }

  return roundRatio(numerator / denominator);
}

function isRetainedEvent(event: SessionReuseDiagnosticsEvent) {
  const family = event.path.match(/^\/mcp\/([a-z]+)\/?$/)?.[1];
  const isUnifiedRoute = /^\/mcp\/?$/.test(event.path);
  return Boolean(
    (isUnifiedRoute || (family && isProductToolFamily(family))) &&
      (event.mcpMethod || event.toolName)
  );
}

export function createSessionReuseDiagnosticsStore(options?: {
  maxEvents?: number;
  now?: () => Date;
}): SessionReuseDiagnosticsStore {
  const maxEvents = options?.maxEvents ?? 500;
  const now = options?.now ?? (() => new Date());
  const events: SessionReuseDiagnosticsEvent[] = [];

  return {
    record(event) {
      if (!isRetainedEvent(event)) {
        return;
      }

      events.push({
        ...event,
        recordedAt: event.recordedAt || now().toISOString()
      });

      if (events.length > maxEvents) {
        events.splice(0, events.length - maxEvents);
      }
    },
    snapshot() {
      const totals = {
        initialize: 0,
        toolCalls: 0,
        authConfigureSession: 0,
        nonAuthToolCalls: 0
      };
      const sessions = new Map<
        string,
        {
          totalEvents: number;
          initializeCount: number;
          toolCalls: number;
          authConfigureSessionCalls: number;
          nonAuthToolCalls: number;
          firstSeenAt: string;
          lastSeenAt: string;
        }
      >();

      for (const event of events) {
        if (event.mcpMethod === "initialize") {
          totals.initialize += 1;
        }

        if (event.mcpMethod === "tools/call") {
          totals.toolCalls += 1;

          if (event.toolName === "auth_configure_session") {
            totals.authConfigureSession += 1;
          } else {
            totals.nonAuthToolCalls += 1;
          }
        }

        if (!event.sessionId) {
          continue;
        }

        const current =
          sessions.get(event.sessionId) ??
          {
            totalEvents: 0,
            initializeCount: 0,
            toolCalls: 0,
            authConfigureSessionCalls: 0,
            nonAuthToolCalls: 0,
            firstSeenAt: event.recordedAt,
            lastSeenAt: event.recordedAt
          };

        current.totalEvents += 1;
        current.firstSeenAt =
          current.firstSeenAt < event.recordedAt ? current.firstSeenAt : event.recordedAt;
        current.lastSeenAt =
          current.lastSeenAt > event.recordedAt ? current.lastSeenAt : event.recordedAt;

        if (event.mcpMethod === "initialize") {
          current.initializeCount += 1;
        }

        if (event.mcpMethod === "tools/call") {
          current.toolCalls += 1;

          if (event.toolName === "auth_configure_session") {
            current.authConfigureSessionCalls += 1;
          } else {
            current.nonAuthToolCalls += 1;
          }
        }

        sessions.set(event.sessionId, current);
      }

      const sessionRows = [...sessions.entries()]
        .map(([sessionId, row]) => ({
          sessionId,
          ...row
        }))
        .sort((left, right) => {
          if (right.toolCalls !== left.toolCalls) {
            return right.toolCalls - left.toolCalls;
          }

          if (right.totalEvents !== left.totalEvents) {
            return right.totalEvents - left.totalEvents;
          }

          return right.lastSeenAt.localeCompare(left.lastSeenAt);
        });

      const activeSessionRows = sessionRows.filter((row) => row.nonAuthToolCalls > 0);
      const findings: string[] = [];

      if (totals.toolCalls === 0) {
        findings.push("No MCP tool calls were recorded in the retained sample.");
      } else {
        if ((divide(totals.initialize, totals.toolCalls) ?? 0) >= 0.5) {
          findings.push(
            "Initialize calls are frequent relative to tool calls, which points to repeated client reconnects."
          );
        }

        if ((divide(totals.authConfigureSession, totals.toolCalls) ?? 0) >= 0.3) {
          findings.push(
            "auth_configure_session is occurring often relative to tool calls, so some clients may not be reusing authenticated sessions."
          );
        }

        if (sessionRows.some((row) => row.nonAuthToolCalls > 1)) {
          findings.push("Some MCP sessions are being reused for multiple non-auth tool calls.");
        }
      }

      if (findings.length === 0) {
        findings.push("Recent MCP traffic does not show an obvious session reuse issue.");
      }

      return {
        maxRetainedEvents: maxEvents,
        retainedEventCount: events.length,
        totals,
        ratios: {
          initializeToToolCall: divide(totals.initialize, totals.toolCalls),
          authConfigureSessionToToolCall: divide(totals.authConfigureSession, totals.toolCalls),
          authConfigureSessionToInitialize: divide(
            totals.authConfigureSession,
            totals.initialize
          )
        },
        sessions: {
          seen: sessionRows.length,
          withToolCalls: sessionRows.filter((row) => row.toolCalls > 0).length,
          withAuthConfigureSession: sessionRows.filter(
            (row) => row.authConfigureSessionCalls > 0
          ).length,
          withNonAuthToolCalls: activeSessionRows.length,
          authOnly: sessionRows.filter(
            (row) => row.authConfigureSessionCalls > 0 && row.nonAuthToolCalls === 0
          ).length,
          reusedForNonAuthToolCalls: sessionRows.filter((row) => row.nonAuthToolCalls > 1).length,
          averageNonAuthToolCallsPerActiveSession:
            activeSessionRows.length === 0
              ? null
              : roundRatio(
                  activeSessionRows.reduce((sum, row) => sum + row.nonAuthToolCalls, 0) /
                    activeSessionRows.length
                )
        },
        topSessions: sessionRows.slice(0, 10),
        findings
      };
    }
  };
}
import { isProductToolFamily } from "../contracts/product-families.js";
