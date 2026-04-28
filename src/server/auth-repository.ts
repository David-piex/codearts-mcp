import * as fs from "node:fs";
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

type AuthRepositoryIndexes = {
  byAuthId: Map<string, PersistedAuthRecord>;
  byTokenHash: Map<string, PersistedAuthRecord>;
};

type FileSignature = {
  mtimeMs: number;
  size: number;
};

type FileAuthRepositoryOptions = {
  fileCheckIntervalMs?: number;
  now?: () => number;
};

function loadFile(path: string): AuthRepositoryFile {
  if (!fs.existsSync(path)) {
    return {
      version: 1,
      records: []
    };
  }

  return JSON.parse(fs.readFileSync(path, "utf8")) as AuthRepositoryFile;
}

function saveFile(path: string, data: AuthRepositoryFile) {
  fs.mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  fs.writeFileSync(path, JSON.stringify(data, null, 2), { mode: 0o600 });
  fs.chmodSync(path, 0o600);
}

function getFileSignature(path: string): FileSignature | undefined {
  if (!fs.existsSync(path)) {
    return undefined;
  }

  const stats = fs.statSync(path);

  return {
    mtimeMs: stats.mtimeMs,
    size: stats.size
  };
}

function signaturesMatch(left: FileSignature | undefined, right: FileSignature | undefined) {
  return left?.mtimeMs === right?.mtimeMs && left?.size === right?.size;
}

function isExpired(record: PersistedAuthRecord, currentTime = Date.now()) {
  return record.expires_at !== undefined && Date.parse(record.expires_at) <= currentTime;
}

function buildIndexes(data: AuthRepositoryFile): AuthRepositoryIndexes {
  const byAuthId = new Map<string, PersistedAuthRecord>();
  const byTokenHash = new Map<string, PersistedAuthRecord>();

  for (const record of data.records) {
    byAuthId.set(record.auth_id, record);
    byTokenHash.set(record.token_hash, record);
  }

  return {
    byAuthId,
    byTokenHash
  };
}

export function createFileAuthRepository(
  path: string,
  options: FileAuthRepositoryOptions = {}
) {
  const fileCheckIntervalMs = options.fileCheckIntervalMs ?? 0;
  const now = options.now ?? Date.now;
  let cachedFile: AuthRepositoryFile | undefined;
  let cachedIndexes: AuthRepositoryIndexes | undefined;
  let cachedSignature = getFileSignature(path);
  let lastSignatureCheckAt = now();

  function readCachedFile() {
    const currentTime = now();
    let currentSignature = cachedSignature;

    if (
      cachedFile === undefined ||
      currentTime - lastSignatureCheckAt >= fileCheckIntervalMs
    ) {
      currentSignature = getFileSignature(path);
      lastSignatureCheckAt = currentTime;
    }

    if (cachedFile !== undefined && signaturesMatch(cachedSignature, currentSignature)) {
      return cachedFile;
    }

    const nextFile = loadFile(path);

    cachedFile = nextFile;
    cachedIndexes = buildIndexes(nextFile);
    cachedSignature = currentSignature;

    return nextFile;
  }

  function readCachedIndexes() {
    readCachedFile();
    return cachedIndexes!;
  }

  function writeCachedFile(data: AuthRepositoryFile) {
    saveFile(path, data);
    cachedFile = data;
    cachedIndexes = buildIndexes(data);
    cachedSignature = getFileSignature(path);
    lastSignatureCheckAt = now();
  }

  return {
    prewarm() {
      const data = readCachedFile();

      return {
        recordCount: data.records.length
      };
    },

    upsert(record: PersistedAuthRecord) {
      const data = readCachedFile();
      const records = data.records.filter((item) => item.auth_id !== record.auth_id);

      records.push(record);
      writeCachedFile({
        version: 1,
        records
      });
    },

    findByTokenHash(tokenHash: string) {
      return readCachedIndexes().byTokenHash.get(tokenHash);
    },

    findActiveByAuthId(authId: string) {
      const record = readCachedIndexes().byAuthId.get(authId);

      if (!record || record.revoked_at !== undefined || isExpired(record, now())) {
        return undefined;
      }

      return record;
    },

    revoke(authId: string, revokedAt: string) {
      const data = readCachedFile();

      writeCachedFile({
        version: data.version,
        records: data.records.map((item) =>
          item.auth_id === authId ? { ...item, revoked_at: revokedAt } : item
        )
      });
    },

    touchByTokenHash(
      tokenHash: string,
      timestamps: {
        lastUsedAt: string;
        updatedAt: string;
        expiresAt: string;
      }
    ) {
      const data = readCachedFile();
      let touched = false;
      const records = data.records.map((item) => {
        if (item.token_hash !== tokenHash) {
          return item;
        }

        touched = true;
        return {
          ...item,
          last_used_at: timestamps.lastUsedAt,
          updated_at: timestamps.updatedAt,
          expires_at: timestamps.expiresAt
        };
      });

      if (!touched) {
        return;
      }

      writeCachedFile({
        version: data.version,
        records
      });
    }
  };
}
