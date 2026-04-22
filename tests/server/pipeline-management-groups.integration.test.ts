import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineCreateGroupHandler,
  createSessionAwarePipelineDeleteGroupHandler,
  createSessionAwarePipelineListGroupsHandler,
  createSessionAwarePipelineMovePipelinesToGroupHandler,
  createSessionAwarePipelineUpdateGroupHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("pipeline management integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_list_groups through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListGroupsHandler,
      input: {
        project_id: "project-1"
      },
      responsePayload: [
          {
            id: "group-root",
            name: "Root",
            path_id: "group-root",
            children: [
              {
                id: "group-child",
                name: "Child",
                parent_id: "group-root",
                path_id: "group-root.group-child"
              }
            ]
          }
        ]
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 1,
          pageSize: 1,
          total: 1
        },
        items: [
          {
            id: "group-root",
            projectId: "project-1",
            name: "Root",
            pathId: "group-root",
            childCount: 1
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline-group/tree");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_create_group through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineCreateGroupHandler,
      input: {
        project_id: "project-1",
        name: "Release",
        parent_id: "group-root",
        dry_run: false
      },
      responsePayload: {
          id: "group-1",
          project_id: "project-1",
          name: "Release",
          parent_id: "group-root"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "group-1",
          projectId: "project-1",
          name: "Release",
          parentId: "group-root",
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline-group/create");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"project_id\":\"project-1\"");
    expect(String(request.init.body)).toContain("\"name\":\"Release\"");
    expect(String(request.init.body)).toContain("\"parent_id\":\"group-root\"");
  });

  it("executes pipeline_update_group through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineUpdateGroupHandler,
      input: {
        project_id: "project-1",
        id: "group-1",
        name: "Release v2",
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "group-1",
          projectId: "project-1",
          name: "Release v2",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline-group/update");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"id\":\"group-1\"");
    expect(String(request.init.body)).toContain("\"name\":\"Release v2\"");
  });

  it("executes pipeline_delete_group through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineDeleteGroupHandler,
      input: {
        project_id: "project-1",
        id: "group-1",
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "group-1",
          projectId: "project-1",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline-group/delete?");
    expect(String(request.url)).toContain("id=group-1");
    expect(request.init.method).toBe("DELETE");
  });

  it("executes pipeline_move_pipelines_to_group through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineMovePipelinesToGroupHandler,
      input: {
        project_id: "project-1",
        group_id: "group-1",
        pipelines: [
          {
            pipeline_id: "pipeline-1",
            pipeline_name: "release-main"
          }
        ],
        dry_run: false
      },
      responsePayload: [
        {
          code: "success",
          pipeline_id: "pipeline-1",
          pipeline_name: "release-main"
        }
      ]
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 1,
          pageSize: 1,
          total: 1
        },
        items: [
          {
            id: "pipeline-1",
            projectId: "project-1",
            groupId: "group-1",
            code: "success",
            pipelineId: "pipeline-1",
            pipelineName: "release-main"
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline-group/pipeline/move");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"group_id\":\"group-1\"");
    expect(String(request.init.body)).toContain("\"pipeline_id\":\"pipeline-1\"");
  });
});
