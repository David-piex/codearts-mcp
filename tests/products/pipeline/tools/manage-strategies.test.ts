import { describe, expect, it } from "vitest";
import {
  mapCreatedPipelineStrategy,
  previewCreatePipelineStrategy
} from "../../../../src/products/pipeline/tools/create-strategy.js";
import {
  mapUpdatedPipelineStrategy,
  previewUpdatePipelineStrategy
} from "../../../../src/products/pipeline/tools/update-strategy.js";
import {
  mapDeletedPipelineStrategy,
  previewDeletePipelineStrategy
} from "../../../../src/products/pipeline/tools/delete-strategy.js";
import {
  mapSwitchedPipelineStrategy,
  previewSwitchPipelineStrategy
} from "../../../../src/products/pipeline/tools/switch-strategy.js";
import { mapPipelineStrategyDetail } from "../../../../src/products/pipeline/tools/get-strategy.js";
import { mapPipelineStrategyList } from "../../../../src/products/pipeline/tools/list-strategies.js";
import { mapPipelineStrategyRelatedInfo } from "../../../../src/products/pipeline/tools/get-strategy-related-info.js";
import { mapPipelineStrategyChildren } from "../../../../src/products/pipeline/tools/list-strategy-children.js";
import {
  expectDryRunPreview,
  expectMappedItem,
  expectMappedPage
} from "./tool-test-helpers.js";

describe("previewCreatePipelineStrategy", () => {
  it("returns a dry-run summary for creating a pipeline strategy", () => {
    const result = previewCreatePipelineStrategy({
      domain_id: "domain-1",
      name: "Tenant Strategy",
      rules: [{ id: "rule-1", is_valid: true }],
      dry_run: true
    });

    expectDryRunPreview(result, {
      domainId: "domain-1",
      name: "Tenant Strategy",
      ruleCount: 1,
      executed: false
    });
  });
});

describe("mapCreatedPipelineStrategy", () => {
  it("returns normalized created strategy data", () => {
    const result = mapCreatedPipelineStrategy({
      domain_id: "domain-1",
      rule_set_id: "strategy-1",
      status: true
    });

    expectMappedItem(result, {
      id: "strategy-1",
      domainId: "domain-1",
      ruleSetId: "strategy-1",
      status: true,
      executed: true
    });
  });
});

describe("previewUpdatePipelineStrategy", () => {
  it("returns a dry-run summary for updating a pipeline strategy", () => {
    const result = previewUpdatePipelineStrategy({
      domain_id: "domain-1",
      rule_set_id: "strategy-1",
      name: "Tenant Strategy v2",
      rules: [{ id: "rule-2", is_valid: false }],
      dry_run: true
    });

    expectDryRunPreview(result, {
      domainId: "domain-1",
      ruleSetId: "strategy-1",
      name: "Tenant Strategy v2",
      ruleCount: 1,
      executed: false
    });
  });
});

describe("mapUpdatedPipelineStrategy", () => {
  it("returns normalized updated strategy data", () => {
    const result = mapUpdatedPipelineStrategy({
      domain_id: "domain-1",
      rule_set_id: "strategy-1",
      status: true
    });

    expectMappedItem(result, {
      id: "strategy-1",
      domainId: "domain-1",
      ruleSetId: "strategy-1",
      status: true,
      executed: true
    });
  });
});

describe("previewDeletePipelineStrategy", () => {
  it("returns a dry-run summary for deleting a pipeline strategy", () => {
    const result = previewDeletePipelineStrategy({
      domain_id: "domain-1",
      rule_set_id: "strategy-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      domainId: "domain-1",
      ruleSetId: "strategy-1",
      executed: false
    });
  });
});

describe("mapDeletedPipelineStrategy", () => {
  it("returns normalized deleted strategy data", () => {
    const result = mapDeletedPipelineStrategy({
      domain_id: "domain-1",
      rule_set_id: "strategy-1",
      status: true
    });

    expectMappedItem(result, {
      id: "strategy-1",
      domainId: "domain-1",
      ruleSetId: "strategy-1",
      status: true,
      executed: true
    });
  });
});

describe("previewSwitchPipelineStrategy", () => {
  it("returns a dry-run summary for switching a pipeline strategy", () => {
    const result = previewSwitchPipelineStrategy({
      domain_id: "domain-1",
      rule_set_id: "strategy-1",
      is_valid: false,
      dry_run: true
    });

    expectDryRunPreview(result, {
      domainId: "domain-1",
      ruleSetId: "strategy-1",
      isValid: false,
      executed: false
    });
  });
});

describe("mapSwitchedPipelineStrategy", () => {
  it("returns normalized switched strategy data", () => {
    const result = mapSwitchedPipelineStrategy({
      domain_id: "domain-1",
      rule_set_id: "strategy-1",
      is_valid: false,
      status: true
    });

    expectMappedItem(result, {
      id: "strategy-1",
      domainId: "domain-1",
      ruleSetId: "strategy-1",
      isValid: false,
      status: true,
      executed: true
    });
  });
});

describe("mapPipelineStrategyDetail", () => {
  it("returns normalized pipeline strategy detail", () => {
    const result = mapPipelineStrategyDetail({
      id: "strategy-1",
      name: "Tenant Strategy",
      type: "tenant",
      version: "1.0",
      creator: "yao",
      create_time: "2026-04-21T08:00:00Z",
      updater: "alice",
      update_time: "2026-04-21T09:00:00Z",
      is_valid: true,
      level: "tenant",
      is_public: true,
      rule_instances: [
        {
          id: "rule-1",
          name: "Build Gate",
          type: "build",
          is_valid: true
        }
      ]
    });

    expectMappedItem(result, {
      id: "strategy-1",
      name: "Tenant Strategy",
      type: "tenant",
      version: "1.0",
      creator: "yao",
      createTime: "2026-04-21T08:00:00Z",
      updater: "alice",
      updateTime: "2026-04-21T09:00:00Z",
      isValid: true,
      level: "tenant",
      isPublic: true,
      ruleInstances: [
        {
          id: "rule-1",
          name: "Build Gate",
          type: "build",
          isValid: true
        }
      ]
    });
  });
});

describe("mapPipelineStrategyList", () => {
  it("returns normalized pipeline strategy list data", () => {
    const result = mapPipelineStrategyList(
      "domain-1",
      [
        {
          id: "strategy-1",
          name: "Tenant Strategy",
          type: "tenant",
          version: "1.0",
          operator: "yao",
          operate_time: 1_713_685_200_000,
          is_valid: true,
          level: "tenant",
          is_public: true,
          is_legacy: false
        }
      ],
      0,
      20,
      1
    );

    expectMappedPage(result, {
      items: [
        {
          id: "strategy-1",
          domainId: "domain-1",
          ruleSetId: "strategy-1",
          name: "Tenant Strategy",
          type: "tenant",
          version: "1.0",
          operator: "yao",
          operateTime: 1_713_685_200_000,
          isValid: true,
          level: "tenant",
          isPublic: true,
          isLegacy: false
        }
      ],
      pageInfo: {
        page: 1,
        pageSize: 20,
        total: 1
      }
    });
  });
});

describe("mapPipelineStrategyRelatedInfo", () => {
  it("returns normalized strategy usage info", () => {
    const result = mapPipelineStrategyRelatedInfo("domain-1", "strategy-1", {
      project_count: 2,
      pipeline_count: 5
    });

    expectMappedItem(result, {
      id: "strategy-1",
      domainId: "domain-1",
      ruleSetId: "strategy-1",
      projectCount: 2,
      pipelineCount: 5
    });
  });
});

describe("mapPipelineStrategyChildren", () => {
  it("returns normalized child strategy list data", () => {
    const result = mapPipelineStrategyChildren(
      "domain-1",
      "strategy-1",
      [
        {
          id: "strategy-2",
          name: "Project Strategy",
          type: "project",
          version: "1.1",
          operator: "alice",
          operate_time: 1_713_685_200_001,
          is_valid: true,
          level: "project",
          is_public: false,
          is_legacy: false
        }
      ],
      0,
      10,
      1
    );

    expectMappedPage(result, {
      items: [
        {
          id: "strategy-2",
          parentRuleSetId: "strategy-1",
          domainId: "domain-1",
          ruleSetId: "strategy-2",
          name: "Project Strategy",
          type: "project",
          version: "1.1",
          operator: "alice",
          operateTime: 1_713_685_200_001,
          isValid: true,
          level: "project",
          isPublic: false,
          isLegacy: false
        }
      ],
      pageInfo: {
        page: 1,
        pageSize: 10,
        total: 1
      }
    });
  });
});
