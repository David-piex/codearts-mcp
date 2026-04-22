import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createSessionAwarePipelineCreateStrategyHandler,
  createSessionAwarePipelineDeleteStrategyHandler,
  createSessionAwarePipelineListStrategiesHandler,
  createSessionAwarePipelineSwitchStrategyHandler,
  createSessionAwarePipelineUpdateStrategyHandler
} from "../../src/server/create-server.js";
import { executeSessionAwareHandler } from "./http-test-helpers.js";

describe("pipeline management integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("executes pipeline_list_strategies through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineListStrategiesHandler,
      input: {
        domain_id: "domain-1",
        offset: 10,
        limit: 5,
        include_tenant_rule_set: false,
        name: "Tenant",
        is_valid: true,
        type: "tenant"
      },
      responsePayload: {
        data: [
          {
            id: "strategy-1",
            name: "Tenant Strategy",
            type: "tenant",
            version: "1.0",
            operator: "yao",
            is_valid: true,
            level: "tenant",
            is_public: true
          }
        ],
        total: 1
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        page_info: {
          page: 3,
          pageSize: 5,
          total: 1
        },
        items: [
          {
            id: "strategy-1",
            domainId: "domain-1",
            ruleSetId: "strategy-1",
            name: "Tenant Strategy",
            type: "tenant",
            isValid: true,
            level: "tenant",
            isPublic: true
          }
        ]
      }
    });

    expect(String(request.url)).toContain("/v2/domain-1/tenant/rule-sets/query?");
    expect(String(request.url)).toContain("offset=10");
    expect(String(request.url)).toContain("limit=5");
    expect(String(request.url)).toContain("include_tenant_rule_set=false");
    expect(String(request.url)).toContain("name=Tenant");
    expect(String(request.url)).toContain("is_valid=true");
    expect(String(request.url)).toContain("type=tenant");
    expect(request.init.method).toBe("GET");
  });

  it("executes pipeline_create_strategy through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineCreateStrategyHandler,
      input: {
        domain_id: "domain-1",
        name: "Tenant Strategy",
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
        rule_set_id: "strategy-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "strategy-1",
          domainId: "domain-1",
          ruleSetId: "strategy-1",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/domain-1/tenant/rule-sets/create");
    expect(request.init.method).toBe("POST");
    expect(String(request.init.body)).toContain("\"name\":\"Tenant Strategy\"");
    expect(String(request.init.body)).toContain("\"id\":\"rule-1\"");
    expect(String(request.init.body)).toContain("\"is_valid\":true");
  });

  it("executes pipeline_update_strategy through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineUpdateStrategyHandler,
      input: {
        domain_id: "domain-1",
        rule_set_id: "strategy-1",
        name: "Tenant Strategy v2",
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
        rule_set_id: "strategy-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "strategy-1",
          domainId: "domain-1",
          ruleSetId: "strategy-1",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/domain-1/tenant/rule-sets/strategy-1/update");
    expect(request.init.method).toBe("PUT");
    expect(String(request.init.body)).toContain("\"name\":\"Tenant Strategy v2\"");
    expect(String(request.init.body)).toContain("\"id\":\"rule-2\"");
    expect(String(request.init.body)).toContain("\"is_valid\":false");
  });

  it("executes pipeline_switch_strategy through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineSwitchStrategyHandler,
      input: {
        domain_id: "domain-1",
        rule_set_id: "strategy-1",
        is_valid: false,
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_set_id: "strategy-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "strategy-1",
          domainId: "domain-1",
          ruleSetId: "strategy-1",
          isValid: false,
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/domain-1/tenant/rule-sets/strategy-1/switch");
    expect(request.init.method).toBe("PUT");
    expect(String(request.init.body)).toContain("\"is_valid\":false");
  });

  it("executes pipeline_delete_strategy through the session-aware runtime client", async () => {
    const { result, request } = await executeSessionAwareHandler({
      createHandler: createSessionAwarePipelineDeleteStrategyHandler,
      input: {
        domain_id: "domain-1",
        rule_set_id: "strategy-1",
        dry_run: false
      },
      responsePayload: {
        status: true,
        rule_set_id: "strategy-1"
      }
    });

    expect(result).toMatchObject({
      structuredContent: {
        item: {
          id: "strategy-1",
          domainId: "domain-1",
          ruleSetId: "strategy-1",
          status: true,
          executed: true
        }
      }
    });

    expect(String(request.url)).toContain("/v2/domain-1/tenant/rule-sets/strategy-1/delete");
    expect(request.init.method).toBe("DELETE");
  });
});
