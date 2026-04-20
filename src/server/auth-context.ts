import { parseCookieHeader } from "./auth-cookie.js";
import { hashAuthToken } from "./auth-token.js";
import type { SessionCredentialStore } from "./session-store.js";

type ResolvableAuthRecord = {
  auth_id: string;
  revoked_at?: string;
  expires_at?: string;
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
}) {
  const hashToken = options.hashToken ?? hashAuthToken;

  return {
    async resolve(request: {
      headers: Record<string, string | undefined>;
      queryToken?: string;
    }) {
      const authHeader = request.headers.authorization;
      const bearerToken =
        authHeader?.startsWith("Bearer ") === true ? authHeader.slice(7).trim() : undefined;
      const cookies = parseCookieHeader(request.headers.cookie);
      const rawToken = bearerToken ?? request.queryToken ?? cookies[options.authCookieName];

      if (!rawToken) {
        return undefined;
      }

      const record = await options.repository.findByTokenHash(hashToken(rawToken));

      if (!record || record.revoked_at) {
        return undefined;
      }

      return {
        authId: record.auth_id,
        rawToken
      };
    }
  };
}
