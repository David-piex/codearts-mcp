import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
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
  it("persists and reloads auth records", async () => {
    const path = join(mkdtempSync(join(tmpdir(), "codearts-mcp-")), "auth-store.json");
    const repo = createFileAuthRepository(path);

    await repo.upsert(createRecord());

    const reloaded = createFileAuthRepository(path);
    expect(await reloaded.findByTokenHash("hash-1")).toMatchObject({
      auth_id: "auth-1",
      region: "cn-north-4"
    });
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
});
