import { parseCookieHeader } from "./auth-cookie.js";
import { hashAuthToken } from "./auth-token.js";
import type { SessionCredentialStore } from "./session-store.js";

type ResolvableAuthRecord = {
  auth_id: string;
  revoked_at?: string;
  expires_at?: string;
};

type ResolvedAuthContext = {
  authId: string;
  rawToken?: string;
};

export function createAuthContextResolver(options: {
  authCookieName: string;
  repository: {
    findByTokenHash:
      | ((hash: string) => Promise<ResolvableAuthRecord | undefined>)
      | ((hash: string) => ResolvableAuthRecord | undefined);
  };
  sessionStore: SessionCredentialStore;
  hashToken?: (raw: string) => string;
  cacheTtlMs?: number;
  now?: () => number;
}) {
  const hashToken = options.hashToken ?? hashAuthToken;
  const cacheTtlMs = options.cacheTtlMs ?? 5_000;
  const now = options.now ?? Date.now;
  const tokenCache = new Map<
    string,
    {
      expiresAt: number;
      result: ResolvedAuthContext | undefined;
    }
  >();

  return {
    async resolve(request: {
      sessionId?: string;
      headers: Record<string, string | undefined>;
      queryToken?: string;
    }): Promise<ResolvedAuthContext | undefined> {
      const authHeader = request.headers.authorization;
      const bearerToken =
        authHeader?.startsWith("Bearer ") === true ? authHeader.slice(7).trim() : undefined;
      const explicitToken = bearerToken ?? request.queryToken;

      if (!explicitToken && request.sessionId) {
        const sessionAuthId = options.sessionStore.getAuthId(request.sessionId);

        if (sessionAuthId) {
          return {
            authId: sessionAuthId
          };
        }
      }

      const cookies = parseCookieHeader(request.headers.cookie);
      const rawToken = explicitToken ?? cookies[options.authCookieName];

      if (!rawToken) {
        return undefined;
      }

      const cached = tokenCache.get(rawToken);

      if (cached && cached.expiresAt > now()) {
        return cached.result;
      }

      const record = await options.repository.findByTokenHash(hashToken(rawToken));

      if (!record || record.revoked_at) {
        tokenCache.set(rawToken, {
          expiresAt: now() + cacheTtlMs,
          result: undefined
        });
        return undefined;
      }

      const result = {
        authId: record.auth_id,
        rawToken
      };

      tokenCache.set(rawToken, {
        expiresAt: now() + cacheTtlMs,
        result
      });

      return result;
    }
  };
}
