import { existsSync, readFileSync } from "node:fs";
import { afterEach, describe, expect, it } from "vitest";
import {
  callTool,
  createTestHttpServerRegistry,
  createTestHttpAuthConfig,
  initializeConfiguredSession,
  initializeSession
} from "./http-mcp-test-helpers.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK
  );
}

function createLiveAuthConfig() {
  return createTestHttpAuthConfig({
    prefix: "codearts-mcp-http-live-auth-",
    ttlSeconds: 60 * 30
  });
}

function readReqWritableProjectId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_REQ_LIVE_WRITE_PROJECT_ID?.trim() || "7bd39587c14048aebdadd0f9c22b1402";
}

function readDeployTaskId(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_DEPLOY_LIVE_TASK_ID?.trim() || "12fd680dd703431da99565be7a9b2014";
}

function readPipelineProjectIds(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_PIPELINE_LIVE_PROJECT_IDS?.trim();

  if (!raw) {
    return [
      "7bd39587c14048aebdadd0f9c22b1402",
      "b60f3ec187f34c35ad3033d1d6d73876",
      "eed055d650fb49dd88e49e6bdf88d344",
      "eb80951449fa4af8bac57494f0f4defd"
    ];
  }

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function readConfiguredPipeline(source: NodeJS.ProcessEnv) {
  const projectId = source.HUAWEICLOUD_PIPELINE_LIVE_PROJECT_ID?.trim();
  const pipelineId = source.HUAWEICLOUD_PIPELINE_LIVE_PIPELINE_ID?.trim();

  if (!projectId || !pipelineId) {
    return undefined;
  }

  return { projectId, pipelineId };
}

function readPipelineBranch(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_PIPELINE_LIVE_BRANCH?.trim() || "master";
}

async function findPipelineViaMcp(
  port: number,
  sessionId: string,
  cookie: string,
  source: NodeJS.ProcessEnv
) {
  const configured = readConfiguredPipeline(source);

  if (configured) {
    return configured;
  }

  for (const projectId of readPipelineProjectIds(source)) {
    const listed = await callTool(port, {
      id: `pipeline-list-${projectId}`,
      name: "pipeline_list_pipelines",
      arguments: {
        project_id: projectId,
        page: 1,
        page_size: 20
      },
      sessionId,
      cookie
    });

    const first = listed.body.result?.structuredContent?.items?.[0];

    if (listed.response.status === 200 && first?.id && typeof first.id === "string") {
      return {
        projectId,
        pipelineId: first.id
      };
    }
  }

  throw new Error("No live pipeline available through the HTTP MCP session.");
}

if (hasLiveEnv(process.env)) {
  describe("http live smoke", () => {
    const servers = createTestHttpServerRegistry();

    afterEach(async () => {
      await servers.closeAll();
    });

    it("reuses persisted auth across reconnects and executes req/deploy/pipeline write tools over HTTP", async () => {
      const authConfig = createLiveAuthConfig();
      const { port } = await servers.start(authConfig);

      const {
        initialized: firstInit,
        configured,
        sessionId: firstSessionId,
        cookie,
        authToken,
        authId
      } = await initializeConfiguredSession(port, {
        clientName: "vitest-live",
        accessKey: process.env.HUAWEICLOUD_AK!,
        secretKey: process.env.HUAWEICLOUD_SK!,
        region: process.env.HUAWEICLOUD_REGION!
      });

      expect(firstInit.response.status).toBe(200);
      expect(firstSessionId).toBeTruthy();

      expect(configured.response.status).toBe(200);
      expect(cookie).toContain(`${authConfig.authCookieName}=`);
      expect(authToken).toBeTruthy();
      expect(authId).toBeTruthy();
      expect(existsSync(authConfig.authDataPath)).toBe(true);
      expect(readFileSync(authConfig.authDataPath, "utf8")).toContain(String(authId));

      const reconnectInit = await initializeSession(port, {
        clientName: "vitest-live",
        cookie: cookie ?? undefined
      });
      const reconnectSessionId = reconnectInit.sessionId;

      expect(reconnectInit.response.status).toBe(200);
      expect(reconnectSessionId).toBeTruthy();
      expect(reconnectSessionId).not.toBe(firstSessionId);

      const reqCreated = await callTool(port, {
        id: "req-create",
        name: "req_create_work_item",
        arguments: {
          project_id: readReqWritableProjectId(process.env),
          title: `mcp-http-live-${Date.now()}`,
          work_item_type: "task",
          dry_run: false
        },
        sessionId: reconnectSessionId ?? undefined,
        cookie: cookie ?? undefined
      });

      expect(reqCreated.response.status).toBe(200);
      expect(reqCreated.body.result?.isError).not.toBe(true);
      expect(reqCreated.body.result?.structuredContent?.item?.executed).toBe(true);
      expect(String(reqCreated.body.result?.structuredContent?.item?.id ?? "")).not.toBe("");

      const pipelineTarget = await findPipelineViaMcp(
        port,
        reconnectSessionId!,
        cookie!,
        process.env
      );
      const pipelineStarted = await callTool(port, {
        id: "pipeline-run",
        name: "pipeline_run_pipeline",
        arguments: {
          project_id: pipelineTarget.projectId,
          pipeline_id: pipelineTarget.pipelineId,
          branch: readPipelineBranch(process.env),
          description: `mcp-http-live-${Date.now()}`,
          dry_run: false
        },
        sessionId: reconnectSessionId ?? undefined,
        cookie: cookie ?? undefined
      });

      expect(pipelineStarted.response.status).toBe(200);
      expect(pipelineStarted.body.result?.isError).not.toBe(true);
      expect(pipelineStarted.body.result?.structuredContent?.item?.executed).toBe(true);
      expect(String(pipelineStarted.body.result?.structuredContent?.item?.pipelineRunId ?? "")).toMatch(
        /^[0-9a-f]{32}$/
      );

      const deployStarted = await callTool(port, {
        id: "deploy-start",
        name: "deploy_start_app",
        arguments: {
          task_id: readDeployTaskId(process.env),
          dry_run: false
        },
        sessionId: reconnectSessionId ?? undefined,
        cookie: cookie ?? undefined
      });

      expect(deployStarted.response.status).toBe(200);
      expect(deployStarted.body.result?.isError).toBe(true);
      expect(deployStarted.body.result?.content?.[0]?.text).toContain("来自流水线");
    }, 120000);
  });
} else {
  describe.skip("http live smoke", () => {});
}
