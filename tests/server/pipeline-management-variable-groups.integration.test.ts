import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineBindVariableGroupsToPipelineHandler,
  createSessionAwarePipelineCreateVariableGroupHandler,
  createSessionAwarePipelineDeleteVariableGroupHandler,
  createSessionAwarePipelineListVariableGroupsHandler,
  createSessionAwarePipelineUpdateVariableGroupHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("pipeline management integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_list_variable_groups through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListVariableGroupsHandler,
      input: {
        project_id: "project-1",
        page: 2,
        page_size: 10,
        name: "Release"
      },
      responsePayload: {
          pipeline_variable_groups: [
            {
              id: "vg-1",
              name: "Release Vars",
              variables: [{ name: "ENV", value: "prod", is_secret: false }]
            }
          ],
          offset: 10,
          limit: 10,
          total: 1
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 2,
          pageSize: 10,
          total: 1
        },
        items: [
          {
            id: "vg-1",
            projectId: "project-1",
            name: "Release Vars"
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline/variable/group/list");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"offset\":10");
    expect(String(request.init.body)).toContain("\"limit\":10");
    expect(String(request.init.body)).toContain("\"name\":\"Release\"");
  });


  it("executes pipeline_create_variable_group through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineCreateVariableGroupHandler,
      input: {
        project_id: "project-1",
        name: "Release Vars",
        description: "Release variables",
        variables: [
          {
            name: "ENV",
            sequence: 1,
            type: "string",
            value: "prod",
            is_secret: false
          }
        ],
        dry_run: false
      },
      responsePayload: {
          id: "vg-1",
          project_id: "project-1",
          domain_id: "domain-1",
          name: "Release Vars",
          description: "Release variables",
          variables: [
            {
              name: "ENV",
              sequence: 1,
              type: "string",
              value: "prod",
              is_secret: false
            }
          ]
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "vg-1",
          projectId: "project-1",
          domainId: "domain-1",
          name: "Release Vars",
          description: "Release variables",
          variables: [
            {
              name: "ENV",
              sequence: 1,
              type: "string",
              value: "prod",
              isSecret: false
            }
          ],
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline/variable/group/create");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"projectId\":\"project-1\"");
    expect(String(request.init.body)).toContain("\"name\":\"Release Vars\"");
    expect(String(request.init.body)).toContain("\"description\":\"Release variables\"");
    expect(String(request.init.body)).toContain("\"is_secret\":false");
  });


  it("executes pipeline_update_variable_group through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineUpdateVariableGroupHandler,
      input: {
        project_id: "project-1",
        id: "vg-1",
        name: "Release Vars v2",
        description: "Updated release variables",
        variables: [
          {
            name: "ENV",
            sequence: 1,
            type: "string",
            value: "staging",
            is_secret: false
          }
        ],
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "vg-1",
          projectId: "project-1",
          name: "Release Vars v2",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline/variable/group/update");
    expect(request.init.method).toBe("PUT");
    expect(String(request.init.body)).toContain("\"projectId\":\"project-1\"");
    expect(String(request.init.body)).toContain("\"id\":\"vg-1\"");
    expect(String(request.init.body)).toContain("\"name\":\"Release Vars v2\"");
    expect(String(request.init.body)).toContain("\"description\":\"Updated release variables\"");
  });


  it("executes pipeline_delete_variable_group through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineDeleteVariableGroupHandler,
      input: {
        project_id: "project-1",
        id: "vg-1",
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "vg-1",
          projectId: "project-1",
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline/variable/group/delete?");
    expect(String(request.url)).toContain("id=vg-1");
    expect(request.init.method).toBe("DELETE");
  });


  it("executes pipeline_bind_variable_groups_to_pipeline through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineBindVariableGroupsToPipelineHandler,
      input: {
        project_id: "project-1",
        pipeline_id: "pipeline-1",
        pipeline_group_ids: ["vg-1", "vg-2"],
        dry_run: false
      },
      responsePayload: {
        success: true
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "pipeline-1",
          projectId: "project-1",
          pipelineId: "pipeline-1",
          pipelineGroupIds: ["vg-1", "vg-2"],
          success: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v5/project-1/api/pipeline/variable/group/relation");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"pipeline_id\":\"pipeline-1\"");
    expect(String(request.init.body)).toContain("\"pipeline_group_ids\":[\"vg-1\",\"vg-2\"]");
  });

});
