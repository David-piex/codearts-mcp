import { afterEach, describe, expect, it } from "vitest";
import {
  callTool,
  createTestHttpAuthConfig,
  createTestHttpServerRegistry,
  initializeConfiguredSession
} from "./http-mcp-test-helpers.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK
  );
}

function readRepoWritableProjectId(source: NodeJS.ProcessEnv) {
  return (
    source.HUAWEICLOUD_REPO_LIVE_WRITE_PROJECT_ID?.trim() ||
    source.HUAWEICLOUD_REPO_LIVE_PROJECT_ID?.trim() ||
    source.HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID?.trim() ||
    undefined
  );
}

if (hasLiveEnv(process.env)) {
  describe("repo_create_repository live", () => {
    const servers = createTestHttpServerRegistry();

    afterEach(async () => {
      await servers.closeAll();
    });

    it("creates a repository over the HTTP MCP session and returns its uuid", async () => {
      const writableProjectId = readRepoWritableProjectId(process.env);
      if (!writableProjectId) {
        process.stdout.write(
          "[live-soft-pass] repo writable project is not configured; skipping repository creation.\n"
        );
        return;
      }

      const authConfig = createTestHttpAuthConfig({
        prefix: "codearts-mcp-repo-create-live-",
        ttlSeconds: 60 * 30
      });
      const { port } = await servers.start(authConfig);
      const { sessionId, cookie, configured } = await initializeConfiguredSession(port, {
        clientName: "vitest-repo-create-live",
        accessKey: process.env.HUAWEICLOUD_AK!,
        secretKey: process.env.HUAWEICLOUD_SK!,
        region: process.env.HUAWEICLOUD_REGION!
      });

      expect(configured.response.status).toBe(200);

      const repoName = `mcprepo${Date.now()}live`;
      const created = await callTool(port, {
        id: "repo-create-live",
        name: "repo_create_repository",
        arguments: {
          project_uuid: writableProjectId,
          name: repoName,
          description: `vitest repo live ${new Date().toISOString()}`,
          visibility_level: 20,
          enable_readme: true,
          dry_run: false
        },
        sessionId: sessionId ?? undefined,
        cookie: cookie ?? undefined
      });

      expect(created.response.status).toBe(200);
      expect(created.body.result?.isError).not.toBe(true);
      const repositoryUuid = String(created.body.result?.structuredContent?.item?.repositoryUuid ?? "");
      expect(repositoryUuid).toMatch(
        /^[0-9a-f]{32}$/
      );
      expect(created.body.result?.structuredContent?.item?.name).toBe(repoName);
    }, 120000);
  });
} else {
  describe.skip("repo_create_repository live", () => {});
}
