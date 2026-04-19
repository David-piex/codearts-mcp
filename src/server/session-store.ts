export type SessionCredentialStore = {
  getAuthId: (sessionId: string) => string | undefined;
  bind: (sessionId: string, authId: string) => void;
  clear: (sessionId: string) => void;
};

export function createSessionCredentialStore(): SessionCredentialStore {
  const store = new Map<string, string>();

  return {
    getAuthId(sessionId) {
      return store.get(sessionId);
    },
    bind(sessionId, authId) {
      store.set(sessionId, authId);
    },
    clear(sessionId) {
      store.delete(sessionId);
    }
  };
}
