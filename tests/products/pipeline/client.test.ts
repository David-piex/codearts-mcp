import { describe, expect, it } from "vitest";
import { createPipelineClient } from "../../../src/products/pipeline/client.js";

describe("createPipelineClient", () => {
  it("supports pipelines field when listing pipelines", async () => {
    const client = createPipelineClient({
      post: async () => ({
        pipelines: [{ pipeline_id: "pipe-1", name: "release-main", creator_name: "yao" }],
        total: 1
      })
    } as never);

    const result = await client.listPipelines({
      project_id: "owner-project",
      page: 1,
      page_size: 20
    });

    expect(result.records).toEqual([
      { pipeline_id: "pipe-1", name: "release-main", creator_name: "yao" }
    ]);
    expect(result.total).toBe(1);
  });

  it("preserves owner project fields and latest run summary when listing pipelines", async () => {
    const client = createPipelineClient({
      post: async () => ({
        records: [
          {
            pipeline_id: "pipe-1",
            name: "release-main",
            creator_name: "yao",
            project_id: "owner-project",
            project_name: "owner-name",
            manifest_version: "3.0",
            latest_run: {
              pipeline_run_id: "run-1",
              status: "COMPLETED",
              run_number: 8,
              trigger_type: "Manual"
            }
          }
        ],
        total: 1
      })
    } as never);

    const result = await client.listPipelines({
      project_id: "owner-project",
      page: 1,
      page_size: 20
    });

    expect(result.records).toEqual([
      {
        pipeline_id: "pipe-1",
        name: "release-main",
        creator_name: "yao",
        project_id: "owner-project",
        project_name: "owner-name",
        manifest_version: "3.0",
        latest_run: {
          pipeline_run_id: "run-1",
          status: "COMPLETED",
          run_number: 8,
          trigger_type: "Manual"
        }
      }
    ]);
    expect(result.total).toBe(1);
  });

  it("filters out pipelines that belong to a different project than the requested scope", async () => {
    const client = createPipelineClient({
      post: async () => ({
        records: [
          {
            pipeline_id: "pipe-foreign",
            name: "release-main",
            creator_name: "yao",
            project_id: "owner-project",
            project_name: "housekeeper"
          },
          {
            pipeline_id: "pipe-local",
            name: "deploy-main",
            creator_name: "alice",
            project_id: "requested-project",
            project_name: "codearts-mcp"
          },
          {
            pipeline_id: "pipe-legacy",
            name: "legacy-pipeline",
            creator_name: "legacy"
          }
        ],
        total: 3
      })
    } as never);

    const result = await client.listPipelines({
      project_id: "requested-project",
      page: 1,
      page_size: 20
    });

    expect(result.records).toEqual([
      {
        pipeline_id: "pipe-local",
        name: "deploy-main",
        creator_name: "alice",
        project_id: "requested-project",
        project_name: "codearts-mcp"
      },
      {
        pipeline_id: "pipe-legacy",
        name: "legacy-pipeline",
        creator_name: "legacy"
      }
    ]);
    expect(result.total).toBe(2);
  });

  it("maps pipeline artifacts responses", async () => {
    const client = createPipelineClient({
      get: async () => ({
        artifacts: [
          {
            name: "gateway.jar",
            artifact_uri: "/com/demo/gateway.jar",
            artifact_download_url_with_id: "https://download.example.com/gateway.jar"
          }
        ]
      })
    } as never);

    const result = await client.listArtifacts({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1"
    });

    expect(result.artifacts).toEqual([
      {
        name: "gateway.jar",
        artifact_uri: "/com/demo/gateway.jar",
        artifact_download_url_with_id: "https://download.example.com/gateway.jar"
      }
    ]);
  });

  it("maps reject manual review responses", async () => {
    const client = createPipelineClient({
      post: async () => ({
        success: true
      })
    } as never);

    const result = await client.rejectRun({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1"
    });

    expect(result).toEqual({ success: true });
  });

  it("supports pipeline_runs field when listing runs", async () => {
    const client = createPipelineClient({
      post: async () => ({
        pipeline_runs: [{ pipeline_run_id: "run-1", status: "COMPLETED", executor_name: "yao" }],
        total: 1
      })
    } as never);

    const result = await client.listRuns({ project_id: "p-1", pipeline_id: "pipe-1", page: 1, page_size: 20 });

    expect(result.records).toEqual([
      { pipeline_run_id: "run-1", status: "COMPLETED", executor_name: "yao" }
    ]);
    expect(result.total).toBe(1);
  });

  it("loads pipeline run summary from run detail endpoint", async () => {
    let requestedPath = "";
    const client = createPipelineClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          id: "run-1",
          status: "COMPLETED",
          executor_name: "yao",
          trigger_type: "Manual"
        };
      }
    } as never);

    const result = await client.getRun({ project_id: "p-1", pipeline_id: "pipe-1", run_id: "run-1" });

    expect(requestedPath).toContain("/pipeline-runs/detail?pipeline_run_id=run-1");
    expect(result).toEqual({
      pipeline_run_id: "run-1",
      status: "COMPLETED",
      executor_name: "yao",
      trigger_type: "Manual"
    });
  });

  it("surfaces provider errors from getPipeline instead of returning an empty pipeline", async () => {
    const client = createPipelineClient({
      get: async () => ({
        error_code: "DEVPIPE.00011136",
        error_msg: "项目ID和流水线不匹配"
      })
    } as never);

    await expect(
      client.getPipeline({ project_id: "wrong-project", pipeline_id: "pipe-1" })
    ).rejects.toMatchObject({
      code: "DEVPIPE.00011136",
      status: 400
    });
  });

  it("maps richer pipeline detail fields", async () => {
    const client = createPipelineClient({
      get: async () => ({
        id: "pipe-1",
        name: "release-main",
        description: "Release flow",
        manifest_version: "3.0",
        creator_name: "Bob",
        is_publish: true,
        project_id: "owner-project",
        project_name: "owner-name",
        detail_url: "https://example.com/detail",
        modify_url: "https://example.com/modify"
      })
    } as never);

    const result = await client.getPipeline({ project_id: "p-1", pipeline_id: "pipe-1" });

    expect(result).toEqual({
      id: "pipe-1",
      name: "release-main",
      description: "Release flow",
      manifest_version: "3.0",
      creator_name: "Bob",
      is_publish: true,
      project_id: "owner-project",
      project_name: "owner-name",
      detail_url: "https://example.com/detail",
      modify_url: "https://example.com/modify"
    });
  });

  it("prefers run-variables endpoint for executed run parameters", async () => {
    const client = createPipelineClient({
      get: async () => [
        {
          name: "branch",
          value: "main",
          type: "string",
          is_runtime: "true"
        }
      ]
    } as never);

    const result = await client.getRunParameters({ project_id: "p-1", pipeline_id: "pipe-1", run_id: "run-1" });

    expect(result.parameters).toEqual([
      {
        name: "branch",
        value: "main",
        value_type: "string",
        is_runtime: true
      }
    ]);
  });

  it("falls back to list-runtime-vars when run-variables is unavailable", async () => {
    const client = createPipelineClient({
      get: async (path: string) => {
        if (path.includes("/run-variables?mode=0")) {
          throw new Error("not supported");
        }

        return {
          variables: [{ name: "branch", value: "main", value_type: "string", is_runtime: true }]
        };
      }
    } as never);

    const result = await client.getRunParameters({ project_id: "p-1", pipeline_id: "pipe-1", run_id: "run-1" });

    expect(result.parameters).toEqual([
      {
        name: "branch",
        value: "main",
        value_type: "string",
        is_runtime: true
      }
    ]);
  });
});
