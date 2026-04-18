import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import { createArtifactClient } from "../../../src/products/artifact/client.js";

const fallbackProjectIds = [
  "7bd39587c14048aebdadd0f9c22b1402",
  "b60f3ec187f34c35ad3033d1d6d73876",
  "eed055d650fb49dd88e49e6bdf88d344",
  "eb80951449fa4af8bac57494f0f4defd"
];

const fallbackRepoNames = [
  "libs-release",
  "libs-snapshot",
  "generic",
  "docker",
  "maven",
  "npm"
];

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_BASE_URL &&
      source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_ARTIFACT_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readLiveProjectIds(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_ARTIFACT_LIVE_PROJECT_IDS;

  if (!raw) {
    return fallbackProjectIds;
  }

  const ids = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return ids.length > 0 ? ids : fallbackProjectIds;
}

function readLiveTenantId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_ARTIFACT_LIVE_TENANT_ID?.trim() || undefined;
}

function readLiveRepositoryId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_ARTIFACT_LIVE_REPOSITORY_ID?.trim() || "00000000000000000000000000000000";
}

function readLiveRepoNames(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_ARTIFACT_LIVE_REPO_NAMES;

  if (!raw) {
    return fallbackRepoNames;
  }

  const names = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return names.length > 0 ? names : fallbackRepoNames;
}

if (hasLiveEnv(process.env)) {
  describe("createArtifactClient live smoke", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.artifactBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createArtifactClient(http);
    const projectIds = readLiveProjectIds(process.env);
    const tenantId = readLiveTenantId(process.env);
    const repositoryId = readLiveRepositoryId(process.env);
    const repoNames = readLiveRepoNames(process.env);

    it("lists versions from at least one configured project", async () => {
      const results = await Promise.all(
        projectIds.map(async (project_id) => ({
          project_id,
          result: await client.listVersions({
            project_id,
            page: 1,
            page_size: 20
          })
        }))
      );

      expect(results.length).toBeGreaterThan(0);

      for (const entry of results) {
        expect(Array.isArray(entry.result.versions)).toBe(true);
        expect(entry.result.total === undefined || typeof entry.result.total === "number").toBe(true);
      }
    }, 30000);

    it("lists latest-version files from at least one configured project", async () => {
      const results = await Promise.all(
        projectIds.map(async (project_id) => ({
          project_id,
          result: await client.listLatestVersionFiles({
            project_id,
            page: 1,
            page_size: 20
          })
        }))
      );

      expect(results.length).toBeGreaterThan(0);

      for (const entry of results) {
        expect(Array.isArray(entry.result.files)).toBe(true);
        expect(entry.result.total === undefined || typeof entry.result.total === "number").toBe(true);
      }
    }, 30000);

    it("lists repositories when a live tenant id is configured", async () => {
      if (!tenantId) {
        return;
      }

      const results = await Promise.all(
        projectIds.map(async (project_id) => ({
          project_id,
          result: await client.listRepositories({
            tenant_id: tenantId,
            project_id,
            page: 1,
            page_size: 20
          })
        }))
      );

      expect(results.length).toBeGreaterThan(0);

      for (const entry of results) {
        expect(Array.isArray(entry.result.repositories)).toBe(true);
        expect(entry.result.total === undefined || typeof entry.result.total === "number").toBe(true);
      }
    }, 30000);

    it("gets file trees across the configured project and repo-name sweep when a live tenant id is configured", async () => {
      if (!tenantId) {
        return;
      }

      const results: Array<{
        project_id: string;
        repo_name: string;
        result: Awaited<ReturnType<typeof client.getFileTree>>;
      }> = [];

      for (const project_id of projectIds) {
        for (const repo_name of repoNames) {
          results.push({
            project_id,
            repo_name,
            result: await client.getFileTree({
              tenant_id: tenantId,
              project_id,
              repo_name
            })
          });
        }
      }

      expect(results.length).toBeGreaterThan(0);

      for (const entry of results) {
        expect(entry.result.root_path).toBe("/");
        expect(Array.isArray(entry.result.nodes)).toBe(true);
      }
    }, 60000);

    it("reaches repository detail with a valid-shape repository id", async () => {
      const result = await client.getRepository({ repository_id: repositoryId });

      expect(result.id).toBe(repositoryId);
      expect(typeof result.name).toBe("string");
    }, 30000);

    it("confirms the currently unpublished Artifact routes in Beijing 4", async () => {
      if (!tenantId) {
        return;
      }

      await expect(
        client.listBuildArchives({
          page: 1,
          page_size: 20
        })
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.searchArtifacts({
          artifact_name: "mcp-live-probe",
          project_id: projectIds[0]!,
          page: 1,
          page_size: 10
        })
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.listFiles({
          project_id: projectIds[0]!,
          repo_name: "libs-release",
          page: 1,
          page_size: 20
        })
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.getFile({
          tenant_id: tenantId,
          project_id: projectIds[0]!,
          repo_name: "libs-release",
          path: "/mcp-live-probe.txt",
          format: "generic"
        })
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.getDownloadUrl({
          tenant_id: tenantId,
          project_id: projectIds[0]!,
          repo_name: "libs-release",
          path: "/mcp-live-probe.txt",
          format: "generic"
        })
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.showAudit({
          tenant_id: tenantId,
          project_id: projectIds[0]!,
          module: "file",
          repo: "libs-release",
          page: 1,
          page_size: 20
        })
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.deleteFile({
          tenant_id: tenantId,
          project_id: projectIds[0]!,
          repo_name: "libs-release",
          path: "/mcp-live-probe.txt",
          format: "generic"
        })
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });
    }, 30000);
  });
} else {
  describe.skip("createArtifactClient live smoke", () => {});
}
