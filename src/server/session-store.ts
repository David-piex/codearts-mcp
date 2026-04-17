export type SessionCredentialConfig = {
  access_key: string;
  secret_key: string;
  region: string;
  req_base_url: string;
  repo_base_url: string;
  pipeline_base_url: string;
  check_base_url: string;
  testplan_base_url: string;
  deploy_base_url: string;
  build_base_url: string;
  artifact_base_url: string;
  govern_base_url?: string;
  inspector_base_url?: string;
  perftest_base_url?: string;
  updated_at: string;
};

export type SessionCredentialStore = {
  get: (sessionId: string) => SessionCredentialConfig | undefined;
  set: (sessionId: string, value: SessionCredentialConfig) => void;
  clear: (sessionId: string) => void;
};

export function createSessionCredentialStore(): SessionCredentialStore {
  const store = new Map<string, SessionCredentialConfig>();

  return {
    get(sessionId) {
      return store.get(sessionId);
    },
    set(sessionId, value) {
      store.set(sessionId, value);
    },
    clear(sessionId) {
      store.delete(sessionId);
    }
  };
}
