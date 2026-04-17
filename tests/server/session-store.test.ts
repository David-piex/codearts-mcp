import { describe, expect, it } from "vitest";
import {
  createSessionCredentialStore,
  type SessionCredentialConfig
} from "../../src/server/session-store.js";

describe("session credential store", () => {
  it("stores and retrieves credentials per session", () => {
    const store = createSessionCredentialStore();
    const config: SessionCredentialConfig = {
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
    };

    store.set("session-a", config);

    expect(store.get("session-a")).toEqual(config);
    expect(store.get("session-b")).toBeUndefined();
  });

  it("clears one session without affecting others", () => {
    const store = createSessionCredentialStore();

    store.set("session-a", {
      access_key: "ak-a",
      secret_key: "sk-a",
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
    store.set("session-b", {
      access_key: "ak-b",
      secret_key: "sk-b",
      region: "cn-north-4",
      req_base_url: "https://req.example.com",
      repo_base_url: "https://repo.example.com",
      pipeline_base_url: "https://pipeline.example.com",
      check_base_url: "https://check.example.com",
      testplan_base_url: "https://testplan.example.com",
      deploy_base_url: "https://deploy.example.com",
      build_base_url: "https://build.example.com",
      artifact_base_url: "https://artifact.example.com",
      updated_at: "2026-04-15T07:05:00.000Z"
    });

    store.clear("session-a");

    expect(store.get("session-a")).toBeUndefined();
    expect(store.get("session-b")?.access_key).toBe("ak-b");
  });
});
