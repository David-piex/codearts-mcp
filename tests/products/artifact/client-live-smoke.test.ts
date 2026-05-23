import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import { createArtifactClient } from "../../../src/products/artifact/client.js";
import { mapSequentiallyWithDelay } from "./live-smoke-helpers.js";

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

const FILE_TREE_SWEEP_DELAY_MS = 150;
const probeRepoName = "libs-release";
const probeArtifactPath = "/mcp-live-probe.txt";

function createProjectPageInput<T extends Record<string, unknown>>(
  projectId: string,
  overrides?: T
): {
  project_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    project_id: projectId,
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    project_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createTenantProjectPageInput<T extends Record<string, unknown>>(
  tenantId: string,
  projectId: string,
  overrides?: T
): {
  tenant_id: string;
  project_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    tenant_id: tenantId,
    project_id: projectId,
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    tenant_id: string;
    project_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createTenantProjectRepoInput<T extends Record<string, unknown>>(
  tenantId: string,
  projectId: string,
  overrides?: T
): {
  tenant_id: string;
  project_id: string;
  repo_name: string;
} & T {
  return {
    tenant_id: tenantId,
    project_id: projectId,
    repo_name: probeRepoName,
    ...(overrides ?? {})
  } as {
    tenant_id: string;
    project_id: string;
    repo_name: string;
  } & T;
}

function createTenantProjectRepoFileInput<T extends Record<string, unknown>>(
  tenantId: string,
  projectId: string,
  overrides?: T
): {
  tenant_id: string;
  project_id: string;
  repo_name: string;
  path: string;
  format: string;
} & T {
  return {
    tenant_id: tenantId,
    project_id: projectId,
    repo_name: probeRepoName,
    path: probeArtifactPath,
    format: "generic",
    ...(overrides ?? {})
  } as {
    tenant_id: string;
    project_id: string;
    repo_name: string;
    path: string;
    format: string;
  } & T;
}

function createTenantProjectAuditPageInput<T extends Record<string, unknown>>(
  tenantId: string,
  projectId: string,
  overrides?: T
): {
  tenant_id: string;
  project_id: string;
  repo: string;
  module: string;
  page: number;
  page_size: number;
} & T {
  return {
    tenant_id: tenantId,
    project_id: projectId,
    repo: probeRepoName,
    module: "file",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    tenant_id: string;
    project_id: string;
    repo: string;
    module: string;
    page: number;
    page_size: number;
  } & T;
}

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
      source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
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
          result: await client.listVersions(createProjectPageInput(project_id))
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
          result: await client.listLatestVersionFiles(createProjectPageInput(project_id))
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
          result: await client.listRepositories(
            createTenantProjectPageInput(tenantId, project_id)
          )
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

      const probes = projectIds.flatMap((project_id) =>
        repoNames.map((repo_name) => ({
          project_id,
          repo_name
        }))
      );

      const results = await mapSequentiallyWithDelay(
        probes,
        async ({ project_id, repo_name }) => ({
          project_id,
          repo_name,
          result: await client.getFileTree(
            createTenantProjectRepoInput(tenantId, project_id, {
              repo_name
            })
          )
        }),
        { delayMs: FILE_TREE_SWEEP_DELAY_MS }
      );

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
          ...createProjectPageInput(projectIds[0]!, {
            page_size: 10
          })
        })
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.listFiles(
          createProjectPageInput(projectIds[0]!, {
            repo_name: probeRepoName
          })
        )
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.getFile(createTenantProjectRepoFileInput(tenantId, projectIds[0]!))
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.getDownloadUrl(createTenantProjectRepoFileInput(tenantId, projectIds[0]!))
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.showAudit(createTenantProjectAuditPageInput(tenantId, projectIds[0]!))
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });

      await expect(
        client.deleteFile(createTenantProjectRepoFileInput(tenantId, projectIds[0]!))
      ).rejects.toMatchObject({ code: "APIGW.0101", status: 404 });
    }, 30000);
  });
} else {
  describe.skip("createArtifactClient live smoke", () => {});
}
