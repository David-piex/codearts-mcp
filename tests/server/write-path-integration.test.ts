import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createServer,
  createSessionAwareDeployCreateApplicationHandler,
  createSessionAwarePipelineRunPipelineHandler,
  createSessionAwareReqCreateWorkItemHandler
} from "../../src/server/create-server.js";
import { encryptSecretValue } from "../../src/server/auth-crypto.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

const masterKey = "0123456789abcdef0123456789abcdef";

function createPersistedAuthRecord() {
  return {
    auth_id: "auth-1",
    token_hash: "hash-1",
    encrypted_access_key: encryptSecretValue("ak-1", masterKey),
    encrypted_secret_key: encryptSecretValue("sk-1", masterKey),
    region: "cn-north-4",
    req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
    repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
    pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
    check_base_url: "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
    testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
    deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
    build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
    artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn",
    created_at: "2026-04-20T10:00:00.000Z",
    updated_at: "2026-04-20T10:00:00.000Z",
    last_used_at: "2026-04-20T10:00:00.000Z"
  };
}

function configureHttpRuntime(store = createSessionCredentialStore()) {
  createServer({
    mode: "http",
    config: {
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 3000
    },
    sessionStore: store,
    authRepository: {
      upsert: () => undefined,
      findByTokenHash: () => undefined,
      findActiveByAuthId: (authId) =>
        authId === "auth-1" ? createPersistedAuthRecord() : undefined,
      revoke: () => undefined
    },
    authMasterKey: masterKey
  });

  return store;
}

describe("write path integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes req_create_work_item through the session-aware runtime client", async () => {
    const store = configureHttpRuntime();
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          id: 101,
          name: "Add login",
          description: "Implement login flow",
          status: { id: 7, name: "New" },
          tracker: { id: 5, name: "Story" }
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    });

    vi.stubGlobal("fetch", fetchMock as typeof fetch);

    const handler = createSessionAwareReqCreateWorkItemHandler(store);

    await expect(
      handler(
        {
          project_id: "project-1",
          title: "Add login",
          work_item_type: "Story",
          description: "Implement login flow",
          dry_run: false
        },
        {
          authInfo: {
            authId: "auth-1"
          }
        } as never
      )
    ).resolves.toMatchObject({
      structuredContent: {
        item: {
          id: "101",
          title: "Add login",
          status: "New",
          type: "Story",
          executed: true
        }
      }
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    expect(url).toContain("/v4/projects/project-1/issue");
    expect(init.method).toBe("POST");
    expect(headers.Authorization).toContain("SDK-HMAC-SHA256");
    expect(String(init.body)).toContain("\"name\":\"Add login\"");
  });

  it("executes deploy_create_application through the session-aware runtime client", async () => {
    const store = configureHttpRuntime();
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          application_id: "app-1",
          name: "App-20260420",
          arrange_infos: [{ task_id: "task-1" }]
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    });

    vi.stubGlobal("fetch", fetchMock as typeof fetch);

    const handler = createSessionAwareDeployCreateApplicationHandler(store);

    await expect(
      handler(
        {
          project_id: "project-1",
          name: "App-20260420",
          arrange_infos: [
            {
              template_id: "template-1",
              operation_list: [{ name: "deploy" }]
            }
          ],
          dry_run: false
        },
        {
          authInfo: {
            authId: "auth-1"
          }
        } as never
      )
    ).resolves.toMatchObject({
      structuredContent: {
        item: {
          id: "app-1",
          name: "App-20260420",
          taskId: "task-1",
          executed: true
        }
      }
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    expect(url).toContain("/v1/applications");
    expect(init.method).toBe("POST");
    expect(headers.Authorization).toContain("SDK-HMAC-SHA256");
    expect(String(init.body)).toContain("\"name\":\"App-20260420\"");
  });

  it("executes pipeline_run_pipeline through the session-aware runtime client", async () => {
    const store = configureHttpRuntime();
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          pipeline_run_id: "run-1"
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    });

    vi.stubGlobal("fetch", fetchMock as typeof fetch);

    const handler = createSessionAwarePipelineRunPipelineHandler(store);

    await expect(
      handler(
        {
          project_id: "project-1",
          pipeline_id: "pipeline-1",
          branch: "main",
          description: "manual trigger",
          dry_run: false
        },
        {
          authInfo: {
            authId: "auth-1"
          }
        } as never
      )
    ).resolves.toMatchObject({
      structuredContent: {
        item: {
          projectId: "project-1",
          pipelineId: "pipeline-1",
          pipelineRunId: "run-1",
          branch: "main",
          executed: true
        }
      }
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    expect(url).toContain("/v5/project-1/api/pipelines/pipeline-1/run");
    expect(init.method).toBe("POST");
    expect(headers.Authorization).toContain("SDK-HMAC-SHA256");
    expect(String(init.body)).toContain("\"target_branch\":\"main\"");
  });
});
