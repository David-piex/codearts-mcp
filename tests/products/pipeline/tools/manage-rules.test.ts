import { describe, expect, it } from "vitest";
import {
  mapCreatedPipelineRule,
  previewCreatePipelineRule
} from "../../../../src/products/pipeline/tools/create-rule.js";
import {
  mapUpdatedPipelineRule,
  previewUpdatePipelineRule
} from "../../../../src/products/pipeline/tools/update-rule.js";
import {
  mapDeletedPipelineRule,
  previewDeletePipelineRule
} from "../../../../src/products/pipeline/tools/delete-rule.js";
import { mapPipelineRuleDetail } from "../../../../src/products/pipeline/tools/get-rule.js";
import { mapPipelineRuleList } from "../../../../src/products/pipeline/tools/list-rules.js";
import { mapPipelineRuleRelatedInfo } from "../../../../src/products/pipeline/tools/get-rule-related-info.js";
import { mapPipelineRuleTypes } from "../../../../src/products/pipeline/tools/list-rule-types.js";
import {
  expectDryRunPreview,
  expectMappedItem,
  expectMappedItems,
  expectMappedPage
} from "./tool-test-helpers.js";

describe("previewCreatePipelineRule", () => {
  it("returns a dry-run summary for creating a pipeline rule", () => {
    const result = previewCreatePipelineRule({
      domain_id: "domain-1",
      name: "Build Gate",
      type: "Build",
      layout_content: "layout",
      content: [
        {
          group_name: "Group A",
          properties: [{ key: "coverage", type: "judge", name: "Coverage", value: "0.8", value_type: "float" }]
        }
      ],
      dry_run: true
    });

    expectDryRunPreview(result, {
      domainId: "domain-1",
      name: "Build Gate",
      type: "Build",
      layoutContent: "layout",
      groupCount: 1,
      executed: false
    });
  });
});

describe("mapCreatedPipelineRule", () => {
  it("returns normalized created rule data", () => {
    const result = mapCreatedPipelineRule({
      domain_id: "domain-1",
      rule_id: "rule-1",
      status: true
    });

    expectMappedItem(result, {
      id: "rule-1",
      domainId: "domain-1",
      ruleId: "rule-1",
      status: true,
      executed: true
    });
  });
});

describe("previewUpdatePipelineRule", () => {
  it("returns a dry-run summary for updating a pipeline rule", () => {
    const result = previewUpdatePipelineRule({
      domain_id: "domain-1",
      rule_id: "rule-1",
      name: "Build Gate v2",
      type: "Build",
      content: [
        {
          group_name: "Group A",
          properties: [{ key: "coverage", type: "judge", name: "Coverage", value: "0.9", value_type: "float" }]
        }
      ],
      dry_run: true
    });

    expectDryRunPreview(result, {
      domainId: "domain-1",
      ruleId: "rule-1",
      name: "Build Gate v2",
      type: "Build",
      groupCount: 1,
      executed: false
    });
  });
});

describe("mapUpdatedPipelineRule", () => {
  it("returns normalized updated rule data", () => {
    const result = mapUpdatedPipelineRule({
      domain_id: "domain-1",
      rule_id: "rule-1",
      status: true
    });

    expectMappedItem(result, {
      id: "rule-1",
      domainId: "domain-1",
      ruleId: "rule-1",
      status: true,
      executed: true
    });
  });
});

describe("previewDeletePipelineRule", () => {
  it("returns a dry-run summary for deleting a pipeline rule", () => {
    const result = previewDeletePipelineRule({
      domain_id: "domain-1",
      rule_id: "rule-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      domainId: "domain-1",
      ruleId: "rule-1",
      executed: false
    });
  });
});

describe("mapDeletedPipelineRule", () => {
  it("returns normalized deleted rule data", () => {
    const result = mapDeletedPipelineRule({
      domain_id: "domain-1",
      rule_id: "rule-1",
      status: true
    });

    expectMappedItem(result, {
      id: "rule-1",
      domainId: "domain-1",
      ruleId: "rule-1",
      status: true,
      executed: true
    });
  });
});

describe("mapPipelineRuleDetail", () => {
  it("returns normalized pipeline rule detail", () => {
    const result = mapPipelineRuleDetail({
      id: "rule-1",
      name: "Build Gate",
      type: "Build",
      is_valid: true,
      version: "1.0",
      plugin_id: "plugin-1",
      plugin_name: "official_devcloud_cloudBuild",
      plugin_version: "0.0.15",
      creator: "yao",
      create_time: "2026-01-01T00:00:00Z",
      updater: "yao",
      update_time: "2026-01-02T00:00:00Z",
      content: [
        {
          group_name: "Group A",
          properties: [{ key: "coverage", type: "judge", name: "Coverage", value: "0.8", value_type: "float" }]
        }
      ]
    });

    expectMappedItem(result, {
      id: "rule-1",
      name: "Build Gate",
      type: "Build",
      isValid: true,
      version: "1.0",
      pluginId: "plugin-1",
      pluginName: "official_devcloud_cloudBuild",
      pluginVersion: "0.0.15",
      creator: "yao",
      createTime: "2026-01-01T00:00:00Z",
      updater: "yao",
      updateTime: "2026-01-02T00:00:00Z",
      content: [
        {
          groupName: "Group A",
          properties: [
            {
              key: "coverage",
              type: "judge",
              name: "Coverage",
              value: "0.8",
              valueType: "float"
            }
          ]
        }
      ]
    });
  });
});

describe("mapPipelineRuleList", () => {
  it("returns normalized pipeline rule list data", () => {
    const result = mapPipelineRuleList(
      "domain-1",
      [
        {
          id: "rule-1",
          name: "Build Gate",
          type: "Build",
          version: "1.0",
          operator: "yao",
          operate_time: 1_700_000_000_000
        }
      ],
      0,
      20,
      1
    );

    expectMappedPage(result, {
      items: [
        {
          id: "rule-1",
          domainId: "domain-1",
          ruleId: "rule-1",
          name: "Build Gate",
          type: "Build",
          version: "1.0",
          operator: "yao",
          operateTime: 1_700_000_000_000
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

describe("mapPipelineRuleRelatedInfo", () => {
  it("returns normalized rule usage info", () => {
    const result = mapPipelineRuleRelatedInfo("domain-1", "rule-1", {
      rule_set_count: 2,
      project_count: 3,
      pipeline_count: 4
    });

    expectMappedItem(result, {
      id: "rule-1",
      domainId: "domain-1",
      ruleId: "rule-1",
      ruleSetCount: 2,
      projectCount: 3,
      pipelineCount: 4
    });
  });
});

describe("mapPipelineRuleTypes", () => {
  it("returns normalized rule type list", () => {
    const result = mapPipelineRuleTypes("org-1", [
      { typeKey: "Build", typeName: "Build" },
      { typeKey: "Gate", typeName: "Gate" }
    ]);

    expectMappedItems(result, [
      { id: "Build", organizationId: "org-1", typeKey: "Build", typeName: "Build" },
      { id: "Gate", organizationId: "org-1", typeKey: "Gate", typeName: "Gate" }
    ]);
  });
});
