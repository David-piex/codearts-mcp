import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import { createDeployClient } from "../../../src/products/deploy/client.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_BASE_URL &&
      source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_DEPLOY_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readProjectId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_PROJECT_ID?.trim() || "7bd39587c14048aebdadd0f9c22b1402";
}

function readApplicationId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_APPLICATION_ID?.trim() || "1bde719ea6924c71a9fdd64dbba5b6a1";
}

function readTaskId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_TASK_ID?.trim() || "12fd680dd703431da99565be7a9b2014";
}

function readHostGroupProjectId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_HOST_GROUP_PROJECT_ID?.trim() || "7bd39587c14048aebdadd0f9c22b1402";
}

function readHostGroupId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_HOST_GROUP_ID?.trim() || "e3688fe4160640798d6d0612f848ddb5";
}

function readEnvironmentId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_ENVIRONMENT_ID?.trim() || "305352cc6b274e26b215c8222e084928";
}

function readTemplateProbeTemplateId(source: NodeJS.ProcessEnv) {
  return (
    source.HUAWEICLOUD_DEPLOY_LIVE_TEMPLATE_PROBE_TEMPLATE_ID?.trim() ||
    "6efb0b24e2e9489eb0e53ee12904a19e"
  );
}

function readTemplateProbeHostGroupId(source: NodeJS.ProcessEnv) {
  return (
    source.HUAWEICLOUD_DEPLOY_LIVE_TEMPLATE_PROBE_HOST_GROUP_ID?.trim() ||
    "e3688fe4160640798d6d0612f848ddb5"
  );
}

function readHostId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_HOST_ID?.trim() || "bb51c89c976c48818310772ddefc79a4";
}

function readRecordId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_RECORD_ID?.trim() || "00000000000000000000000000000000";
}

function formatTimestamp(date: Date) {
  return String(date.getTime());
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function expectPipelineControlledDeployError(error: unknown) {
  const status = (error as { status?: number }).status;
  const code = (error as { code?: string }).code;

  return status === 400 && ["Deploy.00011042", "Deploy.00016004"].includes(code ?? "");
}

if (hasLiveEnv(process.env)) {
  describe("createDeployClient live smoke", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.deployBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createDeployClient(http);
    const projectId = readProjectId(process.env);
    const applicationId = readApplicationId(process.env);
    const taskId = readTaskId(process.env);
    const hostGroupProjectId = readHostGroupProjectId(process.env);
    const hostGroupId = readHostGroupId(process.env);
    const environmentId = readEnvironmentId(process.env);
    const templateProbeTemplateId = readTemplateProbeTemplateId(process.env);
    const templateProbeHostGroupId = readTemplateProbeHostGroupId(process.env);
    const hostId = readHostId(process.env);
    const recordId = readRecordId(process.env);
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const startTimestampText = formatTimestamp(startDate);
    const endTimestampText = formatTimestamp(endDate);
    const startDateText = formatDate(startDate);
    const endDateText = formatDate(endDate);

    it("lists apps and tasks for the known live project", async () => {
      const [apps, tasks] = await Promise.all([
        client.listApps({
          project_id: projectId,
          page: 1,
          page_size: 20
        }),
        client.listTasks({
          project_id: projectId,
          page: 1,
          page_size: 20
        })
      ]);

      expect(Array.isArray(apps.applications)).toBe(true);
      expect(apps.applications.length).toBeGreaterThan(0);
      expect(Array.isArray(tasks.tasks)).toBe(true);
      expect(tasks.tasks.length).toBeGreaterThan(0);
    }, 30000);

    it("lists the known live host group project and loads host group resources", async () => {
      const [hostGroups, hostGroup, hosts, environments] = await Promise.all([
        client.listHostGroups({
          project_id: hostGroupProjectId,
          page: 1,
          page_size: 20
        }),
        client.getHostGroup({
          group_id: hostGroupId
        }),
        client.listHostGroupHosts({
          group_id: hostGroupId,
          page: 1,
          page_size: 20
        }),
        client.listHostGroupEnvironments({
          group_id: hostGroupId,
          page: 1,
          page_size: 20
        })
      ]);

      expect(Array.isArray(hostGroups.host_groups)).toBe(true);
      expect(hostGroups.host_groups.some((item) => item.group_id === hostGroupId)).toBe(true);
      expect(hostGroup.group_id).toBe(hostGroupId);
      expect(Array.isArray(hosts.hosts)).toBe(true);
      expect(hosts.hosts.length).toBeGreaterThan(0);
      expect(Array.isArray(environments.environments)).toBe(true);
      expect(environments.environments.length).toBeGreaterThan(0);
    }, 30000);

    it("gets the known live app and task", async () => {
      const [app, task, appHostGroups, environments] = await Promise.all([
        client.getApp({
          application_id: applicationId
        }),
        client.getTask({
          task_id: taskId
        }),
        client.listAppHostGroups({
          application_id: applicationId,
          project_id: projectId,
          page: 1,
          page_size: 20
        }),
        client.listEnvironments({
          application_id: applicationId,
          project_id: projectId,
          page: 1,
          page_size: 20
        })
      ]);

      expect(app.application_id).toBe(applicationId);
      expect(typeof app.name).toBe("string");
      expect(task.task_id).toBe(taskId);
      expect(typeof task.name).toBe("string");
      expect(Array.isArray(appHostGroups.host_groups)).toBe(true);
      expect(Array.isArray(environments.environments)).toBe(true);
    }, 30000);

    it("creates a deploy task from the official template route and reads non-empty steps", async () => {
      const createdName = `codex-springboot-${Date.now()}`;
      const created = await client.createTaskByTemplate({
        project_id: projectId,
        project_name: "Codearts-mcp",
        template_id: templateProbeTemplateId,
        task_name: createdName,
        configs: [
          { name: "serviceName", type: "text", value: "codeartsmcpdemo" },
          { name: "package_name", type: "text", value: "codeartsmcpdemo" },
          { name: "releaseVersion", type: "text", value: "1.0.0" },
          { name: "jdk_path", type: "text", value: "/usr/local/jdk" },
          { name: "package_url", type: "text", value: "/codeartsmcpdemo/1.0.0/1.0.0/codeartsmcpdemo.jar" },
          { name: "spring_path", type: "text", value: "/usr/local/codeartsmcpdemo.jar" },
          { name: "download_path", type: "text", value: "/usr/local/" },
          { name: "service_port", type: "text", value: "8080" },
          { name: "host_group", type: "host_group", value: templateProbeHostGroupId },
          { name: "component_name", type: "text", value: "aom-codeartsmcpdemo" },
          { name: "log_path", type: "text", value: "/usr/local/*.log" }
        ]
      });

      const createdTask = await client.getTask({
        task_id: created.task_id
      });

      expect(created.task_name).toBe(createdName);
      expect(created.task_id).toMatch(/^[0-9a-f]{32}$/);
      expect(createdTask.task_id).toBe(created.task_id);
      expect(createdTask.template_id).toBeTruthy();
      expect(Object.keys(createdTask.steps ?? {}).length).toBeGreaterThan(0);
      expect(createdTask.state ?? createdTask.status).toBe("Available");
    }, 30000);

    it("lists operations logs, histories, and status for the known live task", async () => {
      const [logs, histories, status] = await Promise.all([
        client.listAppOperationsLog({
          app_id: applicationId,
          page_size: 20,
          page_index: 1,
          start_date: startTimestampText,
          end_date: endTimestampText
        }),
        client.listHistories({
          project_id: projectId,
          task_id: taskId,
          page: 1,
          page_size: 20,
          start_date: startDateText,
          end_date: endDateText
        }),
        client.getStatus({
          task_id: taskId
        })
      ]);

      expect(Array.isArray(logs.logs)).toBe(true);
      expect(Array.isArray(histories.histories)).toBe(true);
      expect(status.task_id).toBe(taskId);
    }, 30000);

    it("reads deploy source detail for known live tasks", async () => {
      const [activeSource, legacySource] = await Promise.all([
        client.getDeploySourceDetail({
          task_id: "5b9ea99424874552a9338afa2af2c54d"
        }),
        client.getDeploySourceDetail({
          task_id: taskId
        })
      ]);

      expect(activeSource.task_id).toBe("5b9ea99424874552a9338afa2af2c54d");
      expect(activeSource.trigger_source).toBeTruthy();
      expect(legacySource.task_id).toBe(taskId);
      expect(legacySource.trigger_source).toBeTruthy();
    }, 30000);

    it("reaches the v4 applications discovery endpoint", async () => {
      const discovered = await client.listV4Applications({
        project_id: projectId,
        limit: 100,
        offset: 0,
        keyword: "codex"
      });

      expect(discovered.project_id).toBe(projectId);
      expect(typeof discovered.total).toBe("number");
      expect(Array.isArray(discovered.applications)).toBe(true);
    }, 30000);

    it("reaches record-bound deploy detail endpoints with a valid-shape record id", async () => {
      await expect(
        client.getHistoryDetail({
          task_id: taskId,
          record_id: recordId
        })
      ).rejects.toMatchObject({
        code: "Deploy.00011303"
      });

      await expect(
        client.getAppLog({
          application_id: applicationId,
          record_id: recordId,
          offset: "0",
          end_offset: "2000"
        })
      ).rejects.toMatchObject({
        code: "Deploy.00011303"
      });

      await expect(
        client.getExecutionParams({
          task_id: taskId,
          record_id: recordId
        })
      ).rejects.toMatchObject({
        code: "Deploy.00011303"
      });
    }, 30000);

    it("reaches the write endpoints safely without triggering a real deploy execution", async () => {
      const environmentHosts = await client.listEnvironmentHosts({
        application_id: applicationId,
        environment_id: environmentId,
        page: 1,
        page_size: 20
      });

      expect(Array.isArray(environmentHosts.hosts)).toBe(true);

      await expect(
        client.startApp({
          task_id: taskId
        })
      ).rejects.toSatisfy(expectPipelineControlledDeployError);

      await expect(
        client.stopApp({
          task_id: taskId,
          record_id: recordId
        })
      ).rejects.toMatchObject({
        code: "Deploy.00011303",
        status: 404
      });

      await expect(
        client.rollbackApp({
          task_id: taskId,
          record_id: recordId
        })
      ).rejects.toSatisfy(expectPipelineControlledDeployError);
    }, 30000);
  });
} else {
  describe.skip("createDeployClient live smoke", () => {});
}
