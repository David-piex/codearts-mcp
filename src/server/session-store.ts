export type SessionCredentialStore = {
  getAuthId: (sessionId: string) => string | undefined;
  bind: (sessionId: string, authId: string, ttlMs?: number) => void;
  clear: (sessionId: string) => void;
};

type SessionBinding = {
  authId: string;
  expiresAt?: number;
};

export function createSessionCredentialStore(options?: {
  ttlMs?: number;
  now?: () => number;
}): SessionCredentialStore {
  const store = new Map<string, SessionBinding>();
  const now = options?.now ?? Date.now;

  function resolveTtlMs(overrideTtlMs?: number) {
    return overrideTtlMs ?? options?.ttlMs;
  }

  function isExpired(binding: SessionBinding) {
    return binding.expiresAt !== undefined && binding.expiresAt <= now();
  }

  return {
    getAuthId(sessionId) {
      const binding = store.get(sessionId);

      if (!binding) {
        return undefined;
      }

      if (isExpired(binding)) {
        store.delete(sessionId);
        return undefined;
      }

      return binding.authId;
    },
    bind(sessionId, authId, ttlMs) {
      const effectiveTtlMs = resolveTtlMs(ttlMs);

      store.set(sessionId, {
        authId,
        expiresAt:
          effectiveTtlMs !== undefined ? now() + Math.max(0, effectiveTtlMs) : undefined
      });
    },
    clear(sessionId) {
      store.delete(sessionId);
    }
  };
}
