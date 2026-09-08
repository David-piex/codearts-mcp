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

const DEFAULT_AUTH_TOKEN_TTL_MS = 60 * 60 * 24 * 30 * 1000;
const MAX_RENEWAL_WINDOW_MS = 24 * 60 * 60 * 1000;
const MIN_RENEWAL_WINDOW_MS = 60_000;

function parseExpirationTime(expiresAt?: string) {
  if (!expiresAt) {
    return undefined;
  }

  const parsed = Date.parse(expiresAt);
  return Number.isNaN(parsed) ? Number.NaN : parsed;
}

function createDefaultRenewalWindowMs(authTokenTtlMs: number) {
  return Math.min(
    MAX_RENEWAL_WINDOW_MS,
    Math.max(MIN_RENEWAL_WINDOW_MS, Math.floor(authTokenTtlMs / 10))
  );
}

function shouldRenewToken(
  expiresAtMs: number | undefined,
  currentTime: number,
  renewalWindowMs: number
) {
  if (expiresAtMs === undefined) {
    return true;
  }

  return expiresAtMs - currentTime <= renewalWindowMs;
}

export function createAuthContextResolver(options: {
  authCookieName: string;
  repository: {
    findByTokenHash:
      | ((hash: string) => Promise<ResolvableAuthRecord | undefined>)
      | ((hash: string) => ResolvableAuthRecord | undefined);
    touchByTokenHash?:
      | ((
          hash: string,
          timestamps: {
            lastUsedAt: string;
            updatedAt: string;
            expiresAt: string;
          }
        ) => Promise<void> | void)
      | undefined;
  };
  sessionStore: SessionCredentialStore;
  hashToken?: (raw: string) => string;
  cacheTtlMs?: number;
  maxCacheEntries?: number;
  authTokenTtlMs?: number;
  renewalWindowMs?: number;
  now?: () => number;
}) {
  const hashToken = options.hashToken ?? hashAuthToken;
  const cacheTtlMs = options.cacheTtlMs ?? 5_000;
  const maxCacheEntries = options.maxCacheEntries ?? 10_000;
  const authTokenTtlMs = options.authTokenTtlMs ?? DEFAULT_AUTH_TOKEN_TTL_MS;
  const renewalWindowMs =
    options.renewalWindowMs ?? createDefaultRenewalWindowMs(authTokenTtlMs);
  const now = options.now ?? Date.now;
  const tokenCache = new Map<
    string,
    {
      expiresAt: number;
      result: ResolvedAuthContext | undefined;
    }
  >();

  function pruneTokenCache(currentTime: number) {
    for (const [token, entry] of tokenCache) {
      if (entry.expiresAt <= currentTime) {
        tokenCache.delete(token);
      }
    }

    while (tokenCache.size >= maxCacheEntries) {
      const oldest = tokenCache.keys().next().value;
      if (oldest === undefined) break;
      tokenCache.delete(oldest);
    }
  }

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

      const currentTime = now();
      const cached = tokenCache.get(rawToken);

      if (cached && cached.expiresAt > currentTime) {
        return cached.result;
      }

      pruneTokenCache(currentTime);

      const tokenHash = hashToken(rawToken);
      const record = await options.repository.findByTokenHash(tokenHash);
      const recordExpiresAt = parseExpirationTime(record?.expires_at);

      if (
        !record ||
        record.revoked_at ||
        (recordExpiresAt !== undefined &&
          (!Number.isFinite(recordExpiresAt) || recordExpiresAt <= currentTime))
      ) {
        tokenCache.set(rawToken, {
          expiresAt: currentTime + cacheTtlMs,
          result: undefined
        });
        return undefined;
      }

      let effectiveExpiresAt = recordExpiresAt;

      if (
        options.repository.touchByTokenHash &&
        shouldRenewToken(recordExpiresAt, currentTime, renewalWindowMs)
      ) {
        effectiveExpiresAt = currentTime + authTokenTtlMs;
        const timestamp = new Date(currentTime).toISOString();
        await options.repository.touchByTokenHash(tokenHash, {
          lastUsedAt: timestamp,
          updatedAt: timestamp,
          expiresAt: new Date(effectiveExpiresAt).toISOString()
        });
      }

      const result = {
        authId: record.auth_id,
        rawToken
      };

      tokenCache.set(rawToken, {
        expiresAt:
          effectiveExpiresAt === undefined
            ? currentTime + cacheTtlMs
            : Math.min(currentTime + cacheTtlMs, effectiveExpiresAt),
        result
      });

      return result;
    }
  };
}
