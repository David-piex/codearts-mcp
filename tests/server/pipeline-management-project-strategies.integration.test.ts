import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineCreateProjectStrategyHandler,
  createSessionAwarePipelineDeleteProjectStrategyHandler,
  createSessionAwarePipelineInheritProjectStrategyHandler,
  createSessionAwarePipelineListProjectStrategiesHandler,
  createSessionAwarePipelineSwitchProjectStrategyHandler,
  createSessionAwarePipelineUpdateProjectStrategyHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("pipeline management integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_list_project_strategies through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListProjectStrategiesHandler,
      input: {
        project_id: "project-1",
        offset: 0,
        limit: 10,
        include_tenant_rule_set: true,
        name: "Project",
        is_valid: true,
        type: "project"
      },
      responsePayload: {
        data: [
          {
            id: "strategy-2",
            name: "Project Strategy",
            type: "project",
            version: "1.0",
            operator: "alice",
            is_valid: true,
            level: "project",
            is_public: false
          }
        ],
        total: 1
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 1,
          pageSize: 10,
          total: 1
        },
        items: [
          {
            id: "strategy-2",
            projectId: "project-1",
            ruleSetId: "strategy-2",
            name: "Project Strategy",
            type: "project",
            isValid: true,
            level: "project",
            isPublic: false
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v2/project-1/rule-sets/query?");
    expect(String(request.url)).toContain("offset=0");
    expect(String(request.url)).toContain("limit=10");
    expect(String(request.url)).toContain("include_tenant_rule_set=true");
    expect(String(request.url)).toContain("name=Project");
    expect(String(request.url)).toContain("is_valid=true");
    expect(String(request.url)).toContain("type=project");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_create_project_strategy through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineCreateProjectStrategyHandler,
      input: {
        project_id: "project-1",
        name: "Project Strategy",
        rules: [
          {
            id: "rule-1",
            is_valid: true
          }
        ],
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_set_id: "project-strategy-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "project-strategy-1",
          projectId: "project-1",
          ruleSetId: "project-strategy-1",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/project-1/rule-sets/create");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"name\":\"Project Strategy\"");
    expect(String(request.init.body)).toContain("\"cloud_project_id\":\"project-1\"");
    expect(String(request.init.body)).toContain("\"id\":\"rule-1\"");
  });

  it("executes pipeline_update_project_strategy through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineUpdateProjectStrategyHandler,
      input: {
        project_id: "project-1",
        rule_set_id: "project-strategy-1",
        name: "Project Strategy v2",
        rules: [
          {
            id: "rule-2",
            is_valid: false
          }
        ],
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_set_id: "project-strategy-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "project-strategy-1",
          projectId: "project-1",
          ruleSetId: "project-strategy-1",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/project-1/rule-sets/project-strategy-1/update");
    expect(request.init.method).toBe("PUT");
    expect(String(request.init.body)).toContain("\"name\":\"Project Strategy v2\"");
    expect(String(request.init.body)).toContain("\"id\":\"rule-2\"");
    expect(String(request.init.body)).toContain("\"is_valid\":false");
  });

  it("executes pipeline_inherit_project_strategy through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineInheritProjectStrategyHandler,
      input: {
        project_id: "project-1",
        name: "Inherited Strategy",
        parent_id: "tenant-strategy-1",
        rules: ["rule-1", "rule-2"],
        is_valid: true,
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_set_id: "strategy-2"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "strategy-2",
          projectId: "project-1",
          ruleSetId: "strategy-2",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/project-1/rule-sets/inherit");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"name\":\"Inherited Strategy\"");
    expect(String(request.init.body)).toContain("\"parent_id\":\"tenant-strategy-1\"");
    expect(String(request.init.body)).toContain("\"cloud_project_id\":\"project-1\"");
    expect(String(request.init.body)).toContain("\"rules\":[\"rule-1\",\"rule-2\"]");
    expect(String(request.init.body)).toContain("\"is_valid\":true");
  });

  it("executes pipeline_switch_project_strategy through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineSwitchProjectStrategyHandler,
      input: {
        project_id: "project-1",
        rule_set_id: "project-strategy-1",
        is_valid: false,
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_set_id: "project-strategy-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "project-strategy-1",
          projectId: "project-1",
          ruleSetId: "project-strategy-1",
          isValid: false,
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/project-1/rule-sets/project-strategy-1/switch");
    expect(request.init.method).toBe("PUT");
    expect(String(request.init.body)).toContain("\"is_valid\":false");
  });

  it("executes pipeline_delete_project_strategy through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineDeleteProjectStrategyHandler,
      input: {
        project_id: "project-1",
        rule_set_id: "project-strategy-1",
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_set_id: "project-strategy-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "project-strategy-1",
          projectId: "project-1",
          ruleSetId: "project-strategy-1",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/project-1/rule-sets/project-strategy-1/delete");
    expect(request.init.method).toBe("DELETE");
  });
});
