import { afterEach, describe, expect, it, vi } from "vitest";
import { createServer } from "../../src/server/create-server.js";
import { encryptSecretValue } from "../../src/server/auth-crypto.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

const masterKey = "0123456789abcdef0123456789abcdef";

function expectRateLimitResult(result: unknown, actionName: string) {
  expect(result).toMatchObject({
    isError: true,
    content: [
      {
        type: "text",
        text: `Too many ${actionName} requests for this MCP session. Try again later.`
      }
    ]
  });
}

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

function createConfiguredServer() {
  const sessionStore = createSessionCredentialStore();
  const server = createServer({
    mode: "http",
    config: {
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 3000
    },
    sessionStore,
    authRepository: {
      upsert: () => undefined,
      findByTokenHash: () => undefined,
      findActiveByAuthId: (authId) =>
        authId === "auth-1" ? createPersistedAuthRecord() : undefined,
      revoke: () => undefined
    },
    authMasterKey: masterKey
  });

  return {
    sessionStore,
    server
  };
}

function readRegisteredHandler(
  server: unknown,
  name: string
): (input: unknown, extra: unknown) => Promise<unknown> {
  const registeredTools = (server as { _registeredTools?: Record<string, { handler: Function }> })
    ._registeredTools;
  const handler = registeredTools?.[name]?.handler;

  if (!handler) {
    throw new Error(`Expected registered handler for ${name}.`);
  }

  return handler as (input: unknown, extra: unknown) => Promise<unknown>;
}

describe("write path rate limits", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits repeated req_create_work_item executions in http mode", async () => {
    const { server } = createConfiguredServer();
    const handler = readRegisteredHandler(server, "req_create_work_item");
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          id: 101,
          name: "Add login",
          status: { id: 7, name: "New" },
          tracker: { id: 5, name: "Story" }
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" }
        }
      );
    });

    vi.stubGlobal("fetch", fetchMock as typeof fetch);

    for (let index = 0; index < 5; index += 1) {
      await expect(
        handler(
          {
            project_id: "project-1",
            title: `Add login ${index}`,
            work_item_type: "Story",
            dry_run: false
          },
          {
            sessionId: "session-write",
            authInfo: {
              authId: "auth-1"
            }
          }
        )
      ).resolves.toBeTruthy();
    }

    const blockedResult = await handler(
      {
        project_id: "project-1",
        title: "Add login blocked",
        work_item_type: "Story",
        dry_run: false
      },
      {
        sessionId: "session-write",
        authInfo: {
          authId: "auth-1"
        }
      }
    );

    expectRateLimitResult(blockedResult, "req_create_work_item");

    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("limits repeated deploy_create_application executions in http mode", async () => {
    const { server } = createConfiguredServer();
    const handler = readRegisteredHandler(server, "deploy_create_application");
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          application_id: "app-1",
          name: "App-20260420",
          arrange_infos: [{ task_id: "task-1" }]
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" }
        }
      );
    });

    vi.stubGlobal("fetch", fetchMock as typeof fetch);

    for (let index = 0; index < 5; index += 1) {
      await expect(
        handler(
          {
            project_id: "project-1",
            name: `App-20260420-${index}`,
            arrange_infos: [
              {
                template_id: "template-1",
                operation_list: [{ name: "deploy" }]
              }
            ],
            dry_run: false
          },
          {
            sessionId: "session-write",
            authInfo: {
              authId: "auth-1"
            }
          }
        )
      ).resolves.toBeTruthy();
    }

    const blockedResult = await handler(
      {
        project_id: "project-1",
        name: "App-20260420-blocked",
        arrange_infos: [
          {
            template_id: "template-1",
            operation_list: [{ name: "deploy" }]
          }
        ],
        dry_run: false
      },
      {
        sessionId: "session-write",
        authInfo: {
          authId: "auth-1"
        }
      }
    );

    expectRateLimitResult(blockedResult, "deploy_create_application");

    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("limits repeated pipeline_run_pipeline executions in http mode", async () => {
    const { server } = createConfiguredServer();
    const handler = readRegisteredHandler(server, "pipeline_run_pipeline");
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          pipeline_run_id: "run-1"
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" }
        }
      );
    });

    vi.stubGlobal("fetch", fetchMock as typeof fetch);

    for (let index = 0; index < 5; index += 1) {
      await expect(
        handler(
          {
            project_id: "project-1",
            pipeline_id: "pipeline-1",
            branch: "main",
            description: `manual trigger ${index}`,
            dry_run: false
          },
          {
            sessionId: "session-write",
            authInfo: {
              authId: "auth-1"
            }
          }
        )
      ).resolves.toBeTruthy();
    }

    const blockedResult = await handler(
      {
        project_id: "project-1",
        pipeline_id: "pipeline-1",
        branch: "main",
        description: "manual trigger blocked",
        dry_run: false
      },
      {
        sessionId: "session-write",
        authInfo: {
          authId: "auth-1"
        }
      }
    );

    expectRateLimitResult(blockedResult, "pipeline_run_pipeline");

    expect(fetchMock).toHaveBeenCalledTimes(5);
  });
});
