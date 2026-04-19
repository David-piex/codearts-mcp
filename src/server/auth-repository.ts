import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export type PersistedEncryptedValue = {
  scheme: string;
  iv: string;
  ciphertext: string;
  auth_tag: string;
};

export type PersistedAuthRecord = {
  auth_id: string;
  token_hash: string;
  encrypted_access_key: PersistedEncryptedValue;
  encrypted_secret_key: PersistedEncryptedValue;
  region: string;
  req_base_url: string;
  repo_base_url: string;
  pipeline_base_url: string;
  check_base_url: string;
  testplan_base_url: string;
  deploy_base_url: string;
  build_base_url: string;
  artifact_base_url: string;
  created_at: string;
  updated_at: string;
  last_used_at: string;
  expires_at?: string;
  revoked_at?: string;
};

type AuthRepositoryFile = {
  version: number;
  records: PersistedAuthRecord[];
};

function loadFile(path: string): AuthRepositoryFile {
  if (!existsSync(path)) {
    return {
      version: 1,
      records: []
    };
  }

  return JSON.parse(readFileSync(path, "utf8")) as AuthRepositoryFile;
}

function saveFile(path: string, data: AuthRepositoryFile) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2));
}

function isExpired(record: PersistedAuthRecord) {
  return record.expires_at !== undefined && Date.parse(record.expires_at) <= Date.now();
}

export function createFileAuthRepository(path: string) {
  return {
    async upsert(record: PersistedAuthRecord) {
      const data = loadFile(path);
      const records = data.records.filter((item) => item.auth_id !== record.auth_id);

      records.push(record);
      saveFile(path, {
        version: 1,
        records
      });
    },

    async findByTokenHash(tokenHash: string) {
      return loadFile(path).records.find((item) => item.token_hash === tokenHash);
    },

    async findActiveByAuthId(authId: string) {
      return loadFile(path).records.find(
        (item) =>
          item.auth_id === authId && item.revoked_at === undefined && !isExpired(item)
      );
    },

    async revoke(authId: string, revokedAt: string) {
      const data = loadFile(path);

      saveFile(path, {
        version: data.version,
        records: data.records.map((item) =>
          item.auth_id === authId ? { ...item, revoked_at: revokedAt } : item
        )
      });
    }
  };
}
