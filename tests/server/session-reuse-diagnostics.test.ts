import { describe, expect, it } from "vitest";
import {
  createSessionReuseDiagnosticsStore,
  type SessionReuseDiagnosticsEvent
} from "../../src/server/session-reuse-diagnostics.js";

function createEvent(
  overrides: Partial<SessionReuseDiagnosticsEvent>
): SessionReuseDiagnosticsEvent {
  return {
    recordedAt: "2026-04-23T07:00:00.000Z",
    method: "POST",
    path: "/mcp/req",
    statusCode: 200,
    ...overrides
  };
}

describe("session reuse diagnostics", () => {
  it("summarizes initialize/auth/tools ratios and session reuse patterns", () => {
    const diagnostics = createSessionReuseDiagnosticsStore({
      maxEvents: 10
    });

    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:00.000Z",
        sessionId: "session-a",
        mcpMethod: "initialize"
      })
    );
    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:01.000Z",
        sessionId: "session-a",
        mcpMethod: "tools/call",
        toolName: "auth_configure_session"
      })
    );
    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:02.000Z",
        sessionId: "session-a",
        mcpMethod: "tools/call",
        toolName: "req_list_projects"
      })
    );
    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:03.000Z",
        sessionId: "session-a",
        mcpMethod: "tools/call",
        toolName: "req_get_project"
      })
    );
    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:04.000Z",
        sessionId: "session-b",
        mcpMethod: "initialize"
      })
    );
    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:05.000Z",
        sessionId: "session-b",
        mcpMethod: "tools/call",
        toolName: "auth_configure_session"
      })
    );

    const snapshot = diagnostics.snapshot();

    expect(snapshot).toMatchObject({
      retainedEventCount: 6,
      totals: {
        initialize: 2,
        toolCalls: 4,
        authConfigureSession: 2,
        nonAuthToolCalls: 2
      },
      ratios: {
        initializeToToolCall: 0.5,
        authConfigureSessionToToolCall: 0.5,
        authConfigureSessionToInitialize: 1
      },
      sessions: {
        withToolCalls: 2,
        withAuthConfigureSession: 2,
        withNonAuthToolCalls: 1,
        authOnly: 1,
        reusedForNonAuthToolCalls: 1
      }
    });

    expect(snapshot.topSessions[0]).toMatchObject({
      sessionId: "session-a",
      initializeCount: 1,
      toolCalls: 3,
      authConfigureSessionCalls: 1,
      nonAuthToolCalls: 2,
      firstSeenAt: "2026-04-23T07:00:00.000Z",
      lastSeenAt: "2026-04-23T07:00:03.000Z"
    });
    expect(snapshot.findings).toContain(
      "Some MCP sessions are being reused for multiple non-auth tool calls."
    );
  });

  it("caps retained events to the configured max", () => {
    const diagnostics = createSessionReuseDiagnosticsStore({
      maxEvents: 3
    });

    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:00.000Z",
        sessionId: "session-a",
        mcpMethod: "initialize"
      })
    );
    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:01.000Z",
        sessionId: "session-a",
        mcpMethod: "tools/call",
        toolName: "auth_configure_session"
      })
    );
    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:02.000Z",
        sessionId: "session-a",
        mcpMethod: "tools/call",
        toolName: "req_list_projects"
      })
    );
    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:03.000Z",
        sessionId: "session-b",
        mcpMethod: "initialize"
      })
    );
    diagnostics.record(
      createEvent({
        recordedAt: "2026-04-23T07:00:04.000Z",
        sessionId: "session-b",
        mcpMethod: "tools/call",
        toolName: "auth_configure_session"
      })
    );

    const snapshot = diagnostics.snapshot();

    expect(snapshot.retainedEventCount).toBe(3);
    expect(snapshot.totals).toMatchObject({
      initialize: 1,
      toolCalls: 2,
      authConfigureSession: 1,
      nonAuthToolCalls: 1
    });
    expect(snapshot.topSessions[0]).toMatchObject({
      sessionId: "session-b"
    });
  });
});
