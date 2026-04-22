import { createAuthContextResolver } from "../../src/server/auth-context.js";

type AuthContextResolverOptions = Parameters<typeof createAuthContextResolver>[0];
type AuthResolverTestOverrides = Omit<
  Partial<AuthContextResolverOptions>,
  "repository" | "sessionStore"
> & {
  repository?: Partial<AuthContextResolverOptions["repository"]>;
  sessionStore?: Partial<AuthContextResolverOptions["sessionStore"]>;
};

export function createSessionStoreStub(
  overrides: Partial<AuthContextResolverOptions["sessionStore"]> = {}
) {
  return {
    getAuthId: (_sessionId: string) => undefined,
    bind: (_sessionId: string, _authId: string) => undefined,
    clear: (_sessionId: string) => undefined,
    ...overrides
  };
}

export function createResolver(
  overrides: AuthResolverTestOverrides = {}
) {
  const { repository, sessionStore, ...rest } = overrides;

  return createAuthContextResolver({
    authCookieName: "codearts_mcp_auth",
    repository: {
      findByTokenHash: async () => undefined,
      ...repository
    } as AuthContextResolverOptions["repository"],
    sessionStore: createSessionStoreStub(sessionStore),
    hashToken: () => "cookie-hash",
    ...rest
  });
}

export function createResolveInput(options?: {
  sessionId?: string;
  bearerToken?: string;
  cookieToken?: string;
  queryToken?: string;
}) {
  const headers: Record<string, string> = {};

  if (options?.bearerToken) {
    headers.authorization = `Bearer ${options.bearerToken}`;
  }

  if (options?.cookieToken) {
    headers.cookie = `codearts_mcp_auth=${options.cookieToken}`;
  }

  return {
    ...(options?.sessionId ? { sessionId: options.sessionId } : {}),
    headers,
    ...(options?.queryToken ? { queryToken: options.queryToken } : {})
  };
}
