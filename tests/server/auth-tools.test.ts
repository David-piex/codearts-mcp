import { describe, expect, it } from "vitest";
import {
  createConfigureSessionHandler,
  createClearSessionHandler
} from "../../src/server/create-server.js";
import { createSessionCredentialStore } from "../../src/server/session-store.js";

describe("session auth tools", () => {
  it("configures credentials for the current session from region defaults", async () => {
    const store = createSessionCredentialStore();
    const handler = createConfigureSessionHandler(store);

    const result = await handler(
      {
        access_key: "ak-1",
        secret_key: "sk-1",
        region: "cn-north-4"
      },
      { sessionId: "session-a" }
    );

    expect(result.structuredContent.session_id).toBe("session-a");
    expect(store.get("session-a")).toMatchObject({
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com"
    });
  });

  it("applies explicit endpoint overrides on top of region defaults", async () => {
    const store = createSessionCredentialStore();
    const handler = createConfigureSessionHandler(store);

    await handler(
      {
        access_key: "ak-1",
        secret_key: "sk-1",
        region: "cn-north-4",
        deploy_base_url: "https://custom-deploy.example.com"
      },
      { sessionId: "session-b" }
    );

    expect(store.get("session-b")).toMatchObject({
      region: "cn-north-4",
      req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      deploy_base_url: "https://custom-deploy.example.com"
    });
  });

  it("still accepts callers that provide every endpoint explicitly", async () => {
    const store = createSessionCredentialStore();
    const handler = createConfigureSessionHandler(store);

    await handler(
      {
        access_key: "ak-1",
        secret_key: "sk-1",
        region: "cn-north-4",
        req_base_url: "https://req.example.com",
        repo_base_url: "https://repo.example.com",
        pipeline_base_url: "https://pipeline.example.com",
        check_base_url: "https://check.example.com",
        testplan_base_url: "https://testplan.example.com",
        deploy_base_url: "https://deploy.example.com",
        build_base_url: "https://build.example.com",
        artifact_base_url: "https://artifact.example.com"
      },
      { sessionId: "session-c" }
    );

    expect(store.get("session-c")).toMatchObject({
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com"
    });
  });

  it("rejects malformed regions", async () => {
    const store = createSessionCredentialStore();
    const handler = createConfigureSessionHandler(store);

    await expect(
      handler(
        {
          access_key: "ak-1",
          secret_key: "sk-1",
          region: "bad region"
        },
        { sessionId: "session-d" }
      )
    ).rejects.toThrow(/Invalid CodeArts region/);
  });

  it("clears credentials for the current session", async () => {
    const store = createSessionCredentialStore();
    store.set("session-a", {
      access_key: "ak-1",
      secret_key: "sk-1",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:00:00.000Z"
    });

    const handler = createClearSessionHandler(store);
    const result = await handler({}, { sessionId: "session-a" });

    expect(result.structuredContent.cleared).toBe(true);
    expect(store.get("session-a")).toBeUndefined();
  });
});
