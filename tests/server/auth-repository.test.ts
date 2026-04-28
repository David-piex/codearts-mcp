import { mkdtempSync } from "node:fs";
import * as fs from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi, afterEach } from "vitest";

vi.mock("node:fs", { spy: true });

import {
  createFileAuthRepository,
  type PersistedAuthRecord
} from "../../src/server/auth-repository.js";

function createRecord(overrides: Partial<PersistedAuthRecord> = {}): PersistedAuthRecord {
  return {
    auth_id: "auth-1",
    token_hash: "hash-1",
    encrypted_access_key: {
      scheme: "aes-256-gcm",
      iv: "a",
      ciphertext: "b",
      auth_tag: "c"
    },
    encrypted_secret_key: {
      scheme: "aes-256-gcm",
      iv: "d",
      ciphertext: "e",
      auth_tag: "f"
    },
    region: "cn-north-4",
    req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
    repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
    pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
    check_base_url: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
    testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
    deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
    build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
    artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn",
    created_at: "2026-04-19T09:00:00.000Z",
    updated_at: "2026-04-19T09:00:00.000Z",
    last_used_at: "2026-04-19T09:00:00.000Z",
    ...overrides
  };
}

describe("file auth repository", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("persists and reloads auth records", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path);

    await repo.upsert(createRecord());

    const reloaded = createFileAuthRepository(path);
    expect(await reloaded.findByTokenHash("hash-1")).toMatchObject({
      auth_id: "auth-1",
      region: "cn-north-4"
    });
    if (process.platform !== "win32") {
      expect((fs.statSync(path).mode & 0o777)).toBe(0o600);
    }
  });

  it("marks records revoked without deleting history", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path);

    await repo.upsert(createRecord({ auth_id: "auth-2", token_hash: "hash-2" }));
    await repo.revoke("auth-2", "2026-04-19T09:10:00.000Z");

    expect(await repo.findActiveByAuthId("auth-2")).toBeUndefined();
    expect(await repo.findByTokenHash("hash-2")).toMatchObject({
      auth_id: "auth-2",
      revoked_at: "2026-04-19T09:10:00.000Z"
    });
  });

  it("does not return expired records as active", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path);

    await repo.upsert(
      createRecord({
        auth_id: "auth-3",
        token_hash: "hash-3",
        expires_at: "2020-01-01T00:00:00.000Z"
      })
    );

    expect(await repo.findActiveByAuthId("auth-3")).toBeUndefined();
    expect(await repo.findByTokenHash("hash-3")).toMatchObject({
      auth_id: "auth-3",
      expires_at: "2020-01-01T00:00:00.000Z"
    });
  });

  it("reuses cached file contents for repeated reads in the same repository instance", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync");

    await repo.upsert(createRecord({ auth_id: "auth-cache", token_hash: "hash-cache" }));

    readFileSyncSpy.mockClear();

    expect(await repo.findActiveByAuthId("auth-cache")).toMatchObject({
      auth_id: "auth-cache"
    });
    expect(await repo.findByTokenHash("hash-cache")).toMatchObject({
      token_hash: "hash-cache"
    });

    expect(readFileSyncSpy).not.toHaveBeenCalled();
  });

  it("refreshes cached contents when another repository instance updates the file", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const firstRepo = createFileAuthRepository(path);
    const secondRepo = createFileAuthRepository(path);

    await firstRepo.upsert(createRecord({ auth_id: "auth-shared", token_hash: "hash-shared-1" }));

    expect(await firstRepo.findByTokenHash("hash-shared-1")).toMatchObject({
      token_hash: "hash-shared-1"
    });

    await secondRepo.upsert(
      createRecord({
        auth_id: "auth-shared",
        token_hash: "hash-shared-2",
        region: "cn-east-3",
        req_base_url: "https://projectman-ext.cn-east-3.myhuaweicloud.com"
      })
    );

    expect(await firstRepo.findByTokenHash("hash-shared-2")).toMatchObject({
      auth_id: "auth-shared",
      token_hash: "hash-shared-2",
      region: "cn-east-3"
    });
  });

  it("uses cached lookup indexes for token and auth-id reads", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path);

    await repo.upsert(createRecord({ auth_id: "auth-index", token_hash: "hash-index" }));

    const findSpy = vi.spyOn(Array.prototype, "find");
    findSpy.mockClear();

    expect(await repo.findByTokenHash("hash-index")).toMatchObject({
      auth_id: "auth-index"
    });
    expect(await repo.findActiveByAuthId("auth-index")).toMatchObject({
      token_hash: "hash-index"
    });

    expect(findSpy).not.toHaveBeenCalled();
  });

  it("throttles file signature checks during hot read bursts", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path, {
      fileCheckIntervalMs: 60_000,
      now: () => 1_000
    });
    const statSyncSpy = vi.spyOn(fs, "statSync");

    await repo.upsert(createRecord({ auth_id: "auth-hot", token_hash: "hash-hot" }));

    statSyncSpy.mockClear();

    expect(await repo.findActiveByAuthId("auth-hot")).toMatchObject({
      auth_id: "auth-hot"
    });
    expect(await repo.findByTokenHash("hash-hot")).toMatchObject({
      token_hash: "hash-hot"
    });

    expect(statSyncSpy).not.toHaveBeenCalled();
  });

  it("refreshes timestamps in place when a token record is touched", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path);

    await repo.upsert(
      createRecord({
        auth_id: "auth-touch",
        token_hash: "hash-touch",
        updated_at: "2026-04-19T09:00:00.000Z",
        last_used_at: "2026-04-19T09:00:00.000Z",
        expires_at: "2026-04-20T09:00:00.000Z"
      })
    );

    await repo.touchByTokenHash("hash-touch", {
      lastUsedAt: "2026-04-21T09:00:00.000Z",
      updatedAt: "2026-04-21T09:00:00.000Z",
      expiresAt: "2026-05-21T09:00:00.000Z"
    });

    expect(await repo.findByTokenHash("hash-touch")).toMatchObject({
      auth_id: "auth-touch",
      token_hash: "hash-touch",
      updated_at: "2026-04-21T09:00:00.000Z",
      last_used_at: "2026-04-21T09:00:00.000Z",
      expires_at: "2026-05-21T09:00:00.000Z"
    });
  });

  it("prewarms cached indexes so the first lookup does not reread the file", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const seedRepo = createFileAuthRepository(path);
    const readFileSyncSpy = vi.spyOn(fs, "readFileSync");

    await seedRepo.upsert(
      createRecord({ auth_id: "auth-prewarm", token_hash: "hash-prewarm" })
    );

    const repo = createFileAuthRepository(path);
    readFileSyncSpy.mockClear();

    expect(await repo.prewarm()).toEqual({
      recordCount: 1
    });

    readFileSyncSpy.mockClear();

    expect(await repo.findByTokenHash("hash-prewarm")).toMatchObject({
      auth_id: "auth-prewarm",
      token_hash: "hash-prewarm"
    });
    expect(readFileSyncSpy).not.toHaveBeenCalled();
  });
});
