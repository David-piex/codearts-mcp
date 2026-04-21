import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import { createReqClient } from "../../../src/products/req/client.js";
import { findListedWorkItem } from "./live-smoke-helpers.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_BASE_URL &&
      source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_REQ_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readProjectIds(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_REQ_LIVE_PROJECT_IDS?.trim();

  if (!raw) {
    return [
      "7bd39587c14048aebdadd0f9c22b1402",
      "b60f3ec187f34c35ad3033d1d6d73876",
      "eed055d650fb49dd88e49e6bdf88d344",
      "eb80951449fa4af8bac57494f0f4defd"
    ];
  }

  const ids = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return ids.length > 0 ? ids : [];
}

function readLiveWorkItem(source: NodeJS.ProcessEnv) {
  const projectId = source.HUAWEICLOUD_REQ_LIVE_WORK_ITEM_PROJECT_ID?.trim();
  const workItemId = source.HUAWEICLOUD_REQ_LIVE_WORK_ITEM_ID?.trim();

  if (!projectId || !workItemId) {
    return undefined;
  }

  return { projectId, workItemId };
}

function readWritableProjectId(source: NodeJS.ProcessEnv, projectIds: string[]) {
  return source.HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID?.trim() || projectIds[0];
}

if (hasLiveEnv(process.env)) {
  describe("createReqClient live smoke", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.reqBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createReqClient(http);
    const configuredProjectIds = readProjectIds(process.env);
    const liveWorkItem = readLiveWorkItem(process.env);
    const writableProjectId = readWritableProjectId(process.env, configuredProjectIds);

    it("lists projects and gets a real project", async () => {
      const result = await client.listProjects({
        page: 1,
        page_size: 20
      });

      expect(Array.isArray(result.projects)).toBe(true);
      expect(result.projects.length).toBeGreaterThan(0);

      const projectId = writableProjectId ?? result.projects[0]!.project_id;
      const project = await client.getProject({
        project_id: projectId
      });

      expect(project.project_id).toBe(projectId);
      expect(typeof project.name).toBe("string");
    }, 30000);

    it("lists iterations and members for a configured project", async () => {
      const projectId = writableProjectId!;

      const [iterations, members] = await Promise.all([
        client.listIterations({
          project_id: projectId,
          page: 1,
          page_size: 20
        }),
        client.listProjectMembers({
          project_id: projectId,
          page: 1,
          page_size: 20
        })
      ]);

      expect(Array.isArray(iterations.iterations)).toBe(true);
      expect(Array.isArray(members.members)).toBe(true);
      expect(members.members.length).toBeGreaterThan(0);
    }, 30000);

    it("creates, gets, updates, and lists a real work item on the writable project", async () => {
      if (liveWorkItem) {
        const workItem = await client.getWorkItem({
          project_id: liveWorkItem.projectId,
          work_item_id: liveWorkItem.workItemId
        });

        expect(String(workItem.id)).toBe(liveWorkItem.workItemId);
        expect(typeof workItem.subject).toBe("string");
        return;
      }

      const title = `mcp-live-smoke-${Date.now()}`;
      const created = await client.createWorkItem({
        project_id: writableProjectId!,
        title,
        work_item_type: "task"
      });

      expect(typeof created.id).toMatch(/string|number/);
      expect(created.name).toBe(title);

      const workItemId = String(created.id);
      const got = await client.getWorkItem({
        project_id: writableProjectId!,
        work_item_id: workItemId
      });

      expect(String(got.id)).toBe(workItemId);
      expect(got.subject).toBe(title);

      const updatedTitle = `${title}-updated`;
      const updated = await client.updateWorkItem({
        project_id: writableProjectId!,
        work_item_id: workItemId,
        title: updatedTitle
      });

      expect(String(updated.id)).toBe(workItemId);
      expect(updated.name).toBe(updatedTitle);

      const found = await findListedWorkItem(client, {
        projectId: writableProjectId!,
        workItemId,
        pageSize: 20,
        maxPages: 5
      });

      expect(found).toBeTruthy();
      expect(found?.item.subject).toBe(updatedTitle);
    }, 30000);
  });
} else {
  describe.skip("createReqClient live smoke", () => {});
}
