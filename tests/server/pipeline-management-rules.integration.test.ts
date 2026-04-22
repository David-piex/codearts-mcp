import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineCreateRuleHandler,
  createSessionAwarePipelineDeleteRuleHandler,
  createSessionAwarePipelineListRulesHandler,
  createSessionAwarePipelineUpdateRuleHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("pipeline management integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_list_rules through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListRulesHandler,
      input: {
        domain_id: "domain-1",
        offset: 20,
        limit: 10,
        type: "Build",
        name: "Gate"
      },
      responsePayload: {
        data: [
          {
            id: "rule-1",
            name: "Build Gate",
            type: "Build",
            version: "1.0",
            operator: "yao"
          }
        ],
        total: 1
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 3,
          pageSize: 10,
          total: 1
        },
        items: [
          {
            id: "rule-1",
            domainId: "domain-1",
            ruleId: "rule-1",
            name: "Build Gate",
            type: "Build",
            version: "1.0"
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v2/domain-1/rules/query?");
    expect(String(request.url)).toContain("offset=20");
    expect(String(request.url)).toContain("limit=10");
    expect(String(request.url)).toContain("type=Build");
    expect(String(request.url)).toContain("name=Gate");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_create_rule through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineCreateRuleHandler,
      input: {
        domain_id: "domain-1",
        name: "Build Gate",
        type: "Build",
        layout_content: "{\"layout\":\"coverage\"}",
        content: [
          {
            group_name: "Coverage",
            properties: [
              {
                key: "coverage",
                type: "judge",
                name: "Coverage",
                operator: ">=",
                value: "0.8",
                value_type: "float",
                is_valid: true
              }
            ]
          }
        ],
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_id: "rule-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "rule-1",
          domainId: "domain-1",
          ruleId: "rule-1",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/domain-1/rules/create");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"name\":\"Build Gate\"");
    expect(String(request.init.body)).toContain("\"type\":\"Build\"");
    expect(String(request.init.body)).toContain("\"layout_content\":\"{\\\"layout\\\":\\\"coverage\\\"}\"");
    expect(String(request.init.body)).toContain("\"group_name\":\"Coverage\"");
  });

  it("executes pipeline_update_rule through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineUpdateRuleHandler,
      input: {
        domain_id: "domain-1",
        rule_id: "rule-1",
        name: "Build Gate v2",
        type: "Build",
        content: [
          {
            group_name: "Coverage",
            properties: [
              {
                key: "coverage",
                type: "judge",
                name: "Coverage",
                operator: ">=",
                value: "0.9",
                value_type: "float",
                is_valid: true
              }
            ]
          }
        ],
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_id: "rule-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "rule-1",
          domainId: "domain-1",
          ruleId: "rule-1",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/domain-1/rules/rule-1/update");
    expect(request.init.method).toBe("PUT");
    expect(String(request.init.body)).toContain("\"name\":\"Build Gate v2\"");
    expect(String(request.init.body)).toContain("\"type\":\"Build\"");
    expect(String(request.init.body)).toContain("\"value\":\"0.9\"");
  });

  it("executes pipeline_delete_rule through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineDeleteRuleHandler,
      input: {
        domain_id: "domain-1",
        rule_id: "rule-1",
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_id: "rule-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "rule-1",
          domainId: "domain-1",
          ruleId: "rule-1",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/domain-1/rules/rule-1/delete");
    expect(request.init.method).toBe("DELETE");
  });
});
