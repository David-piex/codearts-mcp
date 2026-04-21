import { randomUUID } from "node:crypto";
import { z } from "zod";
import { AppError } from "../core/errors/app-error.js";
import { recordRequestPhase } from "./request-context.js";
import { createAuthToken } from "./auth-token.js";
import { encryptSecretValue } from "./auth-crypto.js";
import type { PersistedAuthRecord } from "./auth-repository.js";
import type { RateLimiter } from "./rate-limiter.js";
import {
  mergeSessionEndpointOverrides,
  resolveRegionDefaults
} from "./region-defaults.js";
import type { SessionCredentialStore } from "./session-store.js";

export type AuthRepository = {
  upsert: (record: PersistedAuthRecord) => void;
  findByTokenHash: (tokenHash: string) => PersistedAuthRecord | undefined;
  findActiveByAuthId: (authId: string) => PersistedAuthRecord | undefined;
  revoke: (authId: string, revokedAt: string) => void;
};

export type HttpAuthRequestInfo = {
  authId?: string;
  rawToken?: string;
  onTokenIssued?: (rawToken: string) => void;
  onAuthCleared?: () => void;
};

export function readHttpAuthRequestInfo(extra: {
  authInfo?: unknown;
}): HttpAuthRequestInfo | undefined {
  if (!extra.authInfo || typeof extra.authInfo !== "object") {
    return undefined;
  }

  return extra.authInfo as HttpAuthRequestInfo;
}

export const configureSessionInputSchema = z.object({
  access_key: z.string().min(1),
  secret_key: z.string().min(1),
  region: z.string().min(1),
  req_base_url: z.string().url().optional(),
  repo_base_url: z.string().url().optional(),
  pipeline_base_url: z.string().url().optional(),
  check_base_url: z.string().url().optional(),
  testplan_base_url: z.string().url().optional(),
  deploy_base_url: z.string().url().optional(),
  build_base_url: z.string().url().optional(),
  artifact_base_url: z.string().url().optional()
});

function requireSessionId(sessionId?: string): string {
  if (!sessionId) {
    throw new AppError("auth_error", "No MCP session is available for this request.");
  }

  return sessionId;
}

function enforceRateLimit(
  rateLimiter: RateLimiter | undefined,
  sessionId: string,
  actionName: string
) {
  rateLimiter?.check(`${actionName}:${sessionId}`, actionName);
}

function measurePhase<T>(name: string, work: () => T): T {
  const startedAt = Date.now();

  try {
    return work();
  } finally {
    recordRequestPhase(name, Date.now() - startedAt);
  }
}

export function createConfigureSessionHandlerWithPersistence(options: {
  sessionStore: SessionCredentialStore;
  repository?: AuthRepository;
  masterKey?: string;
  createToken?: typeof createAuthToken;
  authTokenTtlSeconds?: number;
  rateLimiter?: RateLimiter;
}) {
  return async (
    input: unknown,
    extra: {
      sessionId?: string;
      authInfo?: unknown;
    }
  ) => {
    const parsed = measurePhase("auth_input_parse", () =>
      configureSessionInputSchema.parse(input)
    );
    const sessionId = requireSessionId(extra.sessionId);
    enforceRateLimit(options.rateLimiter, sessionId, "auth_configure_session");
    const repository = options.repository;
    const masterKey = options.masterKey;

    if (!repository || !masterKey) {
      throw new AppError(
        "auth_error",
        "HTTP auth persistence is not configured for this server."
      );
    }

    const endpoints = measurePhase("auth_endpoint_resolve", () =>
      mergeSessionEndpointOverrides(resolveRegionDefaults(parsed.region), {
        req_base_url: parsed.req_base_url,
        repo_base_url: parsed.repo_base_url,
        pipeline_base_url: parsed.pipeline_base_url,
        check_base_url: parsed.check_base_url,
        testplan_base_url: parsed.testplan_base_url,
        deploy_base_url: parsed.deploy_base_url,
        build_base_url: parsed.build_base_url,
        artifact_base_url: parsed.artifact_base_url
      })
    );
    const now = new Date().toISOString();
    const token = measurePhase("auth_token_create", () =>
      (options.createToken ?? createAuthToken)()
    );
    const authId = measurePhase("auth_auth_id_create", () => randomUUID());

    const encryptedAccessKey = measurePhase("auth_credential_encrypt", () =>
      encryptSecretValue(parsed.access_key, masterKey)
    );
    const encryptedSecretKey = measurePhase("auth_secret_encrypt", () =>
      encryptSecretValue(parsed.secret_key, masterKey)
    );

    measurePhase("auth_repository_upsert", () =>
      repository.upsert({
        auth_id: authId,
        token_hash: token.hash,
        encrypted_access_key: encryptedAccessKey,
        encrypted_secret_key: encryptedSecretKey,
        region: parsed.region,
        ...endpoints,
        created_at: now,
        updated_at: now,
        last_used_at: now,
        expires_at: new Date(
          Date.now() + (options.authTokenTtlSeconds ?? 60 * 60 * 24 * 30) * 1000
        ).toISOString()
      })
    );

    measurePhase("auth_session_bind", () => options.sessionStore.bind(sessionId, authId));
    measurePhase("auth_token_issue_callback", () =>
      readHttpAuthRequestInfo(extra)?.onTokenIssued?.(token.raw)
    );

    return {
      content: [
        {
          type: "text" as const,
          text:
            `Session ${sessionId} configured for ${parsed.region}. ` +
            "Save the returned auth_token and reuse it via Authorization: Bearer <token> " +
            "or by connecting to /mcp?auth_token=<token> when your client does not persist cookies."
        }
      ],
      structuredContent: {
        session_id: sessionId,
        auth_id: authId,
        configured: true,
        region: parsed.region,
        token_issued: true,
        auth_token: token.raw,
        token_preview: `${token.raw.slice(0, 6)}...`,
        cookie_expected: true,
        bearer_supported: true,
        query_token_supported: true,
        query_token_parameter: "auth_token"
      },
      _httpAuthToken: token.raw
    };
  };
}

export function createClearSessionHandlerWithPersistence(options: {
  sessionStore: SessionCredentialStore;
  repository?: AuthRepository;
  rateLimiter?: RateLimiter;
}) {
  return async (
    _input: unknown,
    extra: {
      sessionId?: string;
      authInfo?: unknown;
    }
  ) => {
    const sessionId = requireSessionId(extra.sessionId);
    enforceRateLimit(options.rateLimiter, sessionId, "auth_clear_session");
    const authId = options.sessionStore.getAuthId(sessionId);

    if (authId && options.repository) {
      options.repository.revoke(authId, new Date().toISOString());
    }

    options.sessionStore.clear(sessionId);
    readHttpAuthRequestInfo(extra)?.onAuthCleared?.();

    return {
      content: [{ type: "text" as const, text: `Session ${sessionId} credentials cleared.` }],
      structuredContent: {
        session_id: sessionId,
        cleared: true
      }
    };
  };
}
