import { describe, expect, it } from "vitest";
import { createHuaweiAuthHeaders } from "../../../src/core/auth/huawei-auth.js";
import { loadEnvConfig } from "../../../src/core/config/env.js";
import { createHttpClient } from "../../../src/core/http/client.js";
import { createPipelineClient } from "../../../src/products/pipeline/client.js";

function hasLiveEnv(source: NodeJS.ProcessEnv) {
  return Boolean(
    source.HUAWEICLOUD_BASE_URL &&
      source.HUAWEICLOUD_REGION &&
      source.HUAWEICLOUD_AK &&
      source.HUAWEICLOUD_SK &&
      source.HUAWEICLOUD_PIPELINE_BASE_URL &&
      source.MCP_SERVER_NAME &&
      source.MCP_SERVER_VERSION
  );
}

function readProjectIds(source: NodeJS.ProcessEnv) {
  const raw = source.HUAWEICLOUD_PIPELINE_LIVE_PROJECT_IDS?.trim();

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

function readConfiguredPipeline(source: NodeJS.ProcessEnv) {
  const projectId = source.HUAWEICLOUD_PIPELINE_LIVE_PROJECT_ID?.trim();
  const pipelineId = source.HUAWEICLOUD_PIPELINE_LIVE_PIPELINE_ID?.trim();

  if (!projectId || !pipelineId) {
    return undefined;
  }

  return { projectId, pipelineId };
}

function readRunBranch(source: NodeJS.ProcessEnv) {
  return source.HUAWEICLOUD_PIPELINE_LIVE_BRANCH?.trim();
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

function createProjectPipelineInput<T extends Record<string, unknown>>(
  projectId: string,
  pipelineId: string,
  overrides?: T
): {
  project_id: string;
  pipeline_id: string;
} & T {
  return {
    project_id: projectId,
    pipeline_id: pipelineId,
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
  } & T;
}

function createProjectPipelinePageInput<T extends Record<string, unknown>>(
  projectId: string,
  pipelineId: string,
  overrides?: T
): {
  project_id: string;
  pipeline_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    project_id: projectId,
    pipeline_id: pipelineId,
    page: 1,
    page_size: 10,
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createProjectPipelineRunInput<T extends Record<string, unknown>>(
  projectId: string,
  pipelineId: string,
  runId: string,
  overrides?: T
): {
  project_id: string;
  pipeline_id: string;
  run_id: string;
} & T {
  return {
    project_id: projectId,
    pipeline_id: pipelineId,
    run_id: runId,
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  } & T;
}

async function findLivePipeline(
  client: ReturnType<typeof createPipelineClient>,
  source: NodeJS.ProcessEnv
) {
  const configured = readConfiguredPipeline(source);

  if (configured) {
    return configured;
  }

  for (const projectId of readProjectIds(source)) {
    const pipelines = await client.listPipelines(createProjectPageInput(projectId));

    const first = pipelines.records[0];

    if (first?.pipeline_id) {
      return {
        projectId,
        pipelineId: first.pipeline_id
      };
    }
  }

  throw new Error("No live pipeline found for the configured pipeline projects.");
}

async function waitForListedRun(
  client: ReturnType<typeof createPipelineClient>,
  input: {
    projectId: string;
    pipelineId: string;
    runId: string;
  }
) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const listed = await client.listRuns(
      createProjectPipelinePageInput(input.projectId, input.pipelineId)
    );

    const found = listed.records.find((record) => record.pipeline_run_id === input.runId);

    if (found) {
      return {
        listed,
        found
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }

  throw new Error(`Pipeline run ${input.runId} was not listed in time.`);
}

if (hasLiveEnv(process.env)) {
  describe("createPipelineClient live smoke", () => {
    const config = loadEnvConfig(process.env);
    const http = createHttpClient({
      baseUrl: config.pipelineBaseUrl,
      authHeaders: createHuaweiAuthHeaders(config.accessKey, config.secretKey)
    });
    const client = createPipelineClient(http);

    it("lists pipelines across configured projects and gets a real pipeline", async () => {
      const target = await findLivePipeline(client, process.env);
      const pipeline = await client.getPipeline(
        createProjectPipelineInput(target.projectId, target.pipelineId)
      );

      expect(pipeline.id).toBe(target.pipelineId);
      expect(typeof pipeline.name).toBe("string");
      expect(pipeline.name.length).toBeGreaterThan(0);
    }, 30000);

    it("lists runs for a real pipeline and gets the latest run detail", async () => {
      const target = await findLivePipeline(client, process.env);
      const runs = await client.listRuns(
        createProjectPipelinePageInput(target.projectId, target.pipelineId)
      );

      expect(Array.isArray(runs.records)).toBe(true);
      if (runs.records.length === 0) {
        return;
      }

      const latestRunId = runs.records[0]!.pipeline_run_id;
      const [run, detail] = await Promise.all([
        client.getRun(
          createProjectPipelineRunInput(target.projectId, target.pipelineId, latestRunId)
        ),
        client.getRunDetail(
          createProjectPipelineRunInput(target.projectId, target.pipelineId, latestRunId)
        )
      ]);

      expect(run.pipeline_run_id).toBe(latestRunId);
      expect(detail.id).toBe(latestRunId);
      expect(detail.pipeline_id).toBe(target.pipelineId);
    }, 30000);

    it("triggers a real pipeline run and observes it through read APIs", async () => {
      const target = await findLivePipeline(client, process.env);
      const existingRuns = await client.listRuns(
        createProjectPipelinePageInput(target.projectId, target.pipelineId)
      );
      const latestBranch =
        ((existingRuns.records[0] as { build_params?: { target_branch?: string } } | undefined)
          ?.build_params?.target_branch ??
          readRunBranch(process.env) ??
          "master");

      const started = await client.runPipeline(
        createProjectPipelineInput(target.projectId, target.pipelineId, {
          branch: latestBranch,
          description: `codex-live-${Date.now()}`
        })
      );

      expect(started.pipeline_run_id).toMatch(/^[0-9a-f]{32}$/);

      const runId = started.pipeline_run_id!;
      const [run, detail, listed] = await Promise.all([
        client.getRun(
          createProjectPipelineRunInput(target.projectId, target.pipelineId, runId)
        ),
        client.getRunDetail(
          createProjectPipelineRunInput(target.projectId, target.pipelineId, runId)
        ),
        waitForListedRun(client, {
          projectId: target.projectId,
          pipelineId: target.pipelineId,
          runId
        })
      ]);

      expect(run.pipeline_run_id).toBe(runId);
      expect(["INIT", "RUNNING", "COMPLETED", "SUCCEEDED"]).toContain(run.status);
      expect(detail.id).toBe(runId);
      expect(detail.pipeline_id).toBe(target.pipelineId);
      expect(listed.found.pipeline_run_id).toBe(runId);
      expect(Array.isArray(listed.listed.records)).toBe(true);
    }, 30000);
  });
} else {
  describe.skip("createPipelineClient live smoke", () => {});
}
