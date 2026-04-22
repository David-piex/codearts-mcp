import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import { createTestPlanClient } from "../../../src/products/testplan/client.js";

const fallbackProjectIds = [
  "7bd39587c14048aebdadd0f9c22b1402",
  "b60f3ec187f34c35ad3033d1d6d73876",
  "eed055d650fb49dd88e49e6bdf88d344",
  "eb80951449fa4af8bac57494f0f4defd"
];

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_BASE_URL &&
      source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_TESTPLAN_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readLiveProjectIds(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_TESTPLAN_LIVE_PROJECT_IDS;

  if (!raw) {
    return fallbackProjectIds;
  }

  const ids = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return ids.length > 0 ? ids : fallbackProjectIds;
}

function readPlanId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_TESTPLAN_LIVE_PLAN_ID?.trim() || "vd040000umltrdd2";
}

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

function createProjectPlanInput<T extends Record<string, unknown>>(
  projectId: string,
  planId: string,
  overrides?: T
): {
  project_id: string;
  plan_id: string;
} & T {
  return {
    project_id: projectId,
    plan_id: planId,
    ...(overrides ?? {})
  } as {
    project_id: string;
    plan_id: string;
  } & T;
}

if (hasLiveEnv(process.env)) {
  describe("createTestPlanClient live smoke", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.testPlanBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createTestPlanClient(http);
    const projectIds = readLiveProjectIds(process.env);
    const planId = readPlanId(process.env);
    const supportedProjectId = "eb80951449fa4af8bac57494f0f4defd";

    it("lists plans across configured projects", async () => {
      const results = await Promise.all(
        projectIds.map(async (project_id) => {
          try {
            const result = await client.listPlans(createProjectPageInput(project_id));

            return { project_id, ok: true as const, result };
          } catch (error: any) {
            return {
              project_id,
              ok: false as const,
              error: {
                code: error?.code,
                status: error?.status
              }
            };
          }
        })
      );

      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((entry) => entry.ok && Array.isArray(entry.result.plans))
      ).toBe(true);
      expect(
        results.some((entry) => !entry.ok && entry.error.code === "CLOUDTEST.00012003")
      ).toBe(true);
    }, 30000);

    it("lists issues for the known live plan", async () => {
      const result = await client.listIssues(
        createProjectPlanInput(supportedProjectId, planId)
      );

      expect(Array.isArray(result.issues)).toBe(true);
    }, 30000);

    it("lists cases for the known live plan", async () => {
      const result = await client.listCases(
        createProjectPageInput(supportedProjectId, {
          plan_id: planId
        })
      );

      expect(Array.isArray(result.cases)).toBe(true);
    }, 30000);

    it("shows unpublished detail routes for getPlan/getCase/listRuns", async () => {
      await expect(
        client.getPlan(createProjectPlanInput(supportedProjectId, planId))
      ).rejects.toMatchObject({
        code: "APIGW.0101",
        status: 404
      });

      await expect(
        client.getCase({
          project_id: supportedProjectId,
          case_id: "00000000000000000000000000000000"
        })
      ).rejects.toMatchObject({
        code: "APIGW.0101",
        status: 404
      });

      await expect(
        client.listRuns(
          createProjectPageInput(supportedProjectId, {
            plan_id: planId
          })
        )
      ).rejects.toMatchObject({
        code: "APIGW.0101",
        status: 404
      });
    }, 30000);

    it("shows the current runCases route is unpublished in Beijing 4", async () => {
      await expect(
        client.runCases({
          project_id: supportedProjectId,
          execute_list: [{ case_id: "00000000000000000000000000000000" }]
        })
      ).rejects.toMatchObject({
        code: "APIGW.0101",
        status: 404
      });
    }, 30000);
  });
} else {
  describe.skip("createTestPlanClient live smoke", () => {});
}
