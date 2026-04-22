import { describe, expect, it } from "vitest";
import {
  mapCreatedProjectPipelineStrategy,
  previewCreateProjectPipelineStrategy
} from "../../../../src/products/pipeline/tools/create-project-strategy.js";
import {
  mapUpdatedProjectPipelineStrategy,
  previewUpdateProjectPipelineStrategy
} from "../../../../src/products/pipeline/tools/update-project-strategy.js";
import {
  mapDeletedProjectPipelineStrategy,
  previewDeleteProjectPipelineStrategy
} from "../../../../src/products/pipeline/tools/delete-project-strategy.js";
import {
  mapSwitchedProjectPipelineStrategy,
  previewSwitchProjectPipelineStrategy
} from "../../../../src/products/pipeline/tools/switch-project-strategy.js";
import {
  mapInheritedProjectPipelineStrategy,
  previewInheritProjectPipelineStrategy
} from "../../../../src/products/pipeline/tools/inherit-project-strategy.js";
import { mapProjectPipelineStrategyDetail } from "../../../../src/products/pipeline/tools/get-project-strategy.js";
import { mapProjectPipelineStrategyList } from "../../../../src/products/pipeline/tools/list-project-strategies.js";
import { mapProjectPipelineStrategyRelatedInfo } from "../../../../src/products/pipeline/tools/get-project-strategy-related-info.js";
import { mapProjectPipelineStrategySummary } from "../../../../src/products/pipeline/tools/get-project-strategy-detail.js";
import {
  expectDryRunPreview,
  expectMappedItem,
  expectMappedPage
} from "./tool-test-helpers.js";

describe("previewCreateProjectPipelineStrategy", () => {
  it("returns a dry-run summary for creating a project pipeline strategy", () => {
    const result = previewCreateProjectPipelineStrategy({
      project_id: "project-1",
      name: "Project Strategy",
      rules: [{ id: "rule-1", is_valid: true }],
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      name: "Project Strategy",
      ruleCount: 1,
      executed: false
    });
  });
});

describe("mapCreatedProjectPipelineStrategy", () => {
  it("returns normalized created project strategy data", () => {
    const result = mapCreatedProjectPipelineStrategy({
      project_id: "project-1",
      rule_set_id: "strategy-1",
      status: true
    });

    expectMappedItem(result, {
      id: "strategy-1",
      projectId: "project-1",
      ruleSetId: "strategy-1",
      status: true,
      executed: true
    });
  });
});

describe("previewUpdateProjectPipelineStrategy", () => {
  it("returns a dry-run summary for updating a project pipeline strategy", () => {
    const result = previewUpdateProjectPipelineStrategy({
      project_id: "project-1",
      rule_set_id: "strategy-1",
      name: "Project Strategy v2",
      rules: [{ id: "rule-2", is_valid: false }],
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      ruleSetId: "strategy-1",
      name: "Project Strategy v2",
      ruleCount: 1,
      executed: false
    });
  });
});

describe("mapUpdatedProjectPipelineStrategy", () => {
  it("returns normalized updated project strategy data", () => {
    const result = mapUpdatedProjectPipelineStrategy({
      project_id: "project-1",
      rule_set_id: "strategy-1",
      status: true
    });

    expectMappedItem(result, {
      id: "strategy-1",
      projectId: "project-1",
      ruleSetId: "strategy-1",
      status: true,
      executed: true
    });
  });
});

describe("previewDeleteProjectPipelineStrategy", () => {
  it("returns a dry-run summary for deleting a project pipeline strategy", () => {
    const result = previewDeleteProjectPipelineStrategy({
      project_id: "project-1",
      rule_set_id: "strategy-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      ruleSetId: "strategy-1",
      executed: false
    });
  });
});

describe("mapDeletedProjectPipelineStrategy", () => {
  it("returns normalized deleted project strategy data", () => {
    const result = mapDeletedProjectPipelineStrategy({
      project_id: "project-1",
      rule_set_id: "strategy-1",
      status: true
    });

    expectMappedItem(result, {
      id: "strategy-1",
      projectId: "project-1",
      ruleSetId: "strategy-1",
      status: true,
      executed: true
    });
  });
});

describe("previewSwitchProjectPipelineStrategy", () => {
  it("returns a dry-run summary for switching a project pipeline strategy", () => {
    const result = previewSwitchProjectPipelineStrategy({
      project_id: "project-1",
      rule_set_id: "strategy-1",
      is_valid: false,
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      ruleSetId: "strategy-1",
      isValid: false,
      executed: false
    });
  });
});

describe("mapSwitchedProjectPipelineStrategy", () => {
  it("returns normalized switched project strategy data", () => {
    const result = mapSwitchedProjectPipelineStrategy({
      project_id: "project-1",
      rule_set_id: "strategy-1",
      is_valid: false,
      status: true
    });

    expectMappedItem(result, {
      id: "strategy-1",
      projectId: "project-1",
      ruleSetId: "strategy-1",
      isValid: false,
      status: true,
      executed: true
    });
  });
});

describe("previewInheritProjectPipelineStrategy", () => {
  it("returns a dry-run summary for inheriting a project pipeline strategy", () => {
    const result = previewInheritProjectPipelineStrategy({
      project_id: "project-1",
      name: "Inherited Strategy",
      parent_id: "parent-1",
      rules: ["rule-1", "rule-2"],
      is_valid: true,
      dry_run: true
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      name: "Inherited Strategy",
      parentId: "parent-1",
      rules: ["rule-1", "rule-2"],
      isValid: true,
      executed: false
    });
  });
});

describe("mapInheritedProjectPipelineStrategy", () => {
  it("returns normalized inherited project strategy data", () => {
    const result = mapInheritedProjectPipelineStrategy({
      project_id: "project-1",
      rule_set_id: "strategy-2",
      status: true
    });

    expectMappedItem(result, {
      id: "strategy-2",
      projectId: "project-1",
      ruleSetId: "strategy-2",
      status: true,
      executed: true
    });
  });
});

describe("mapProjectPipelineStrategyList", () => {
  it("returns normalized project pipeline strategy list data", () => {
    const result = mapProjectPipelineStrategyList(
      "project-1",
      [
        {
          id: "strategy-1",
          name: "Project Strategy",
          type: "project",
          version: "1.0",
          operator: "yao",
          operate_time: 1_713_685_200_100,
          is_valid: true,
          level: "project",
          is_public: false,
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
          projectId: "project-1",
          ruleSetId: "strategy-1",
          name: "Project Strategy",
          type: "project",
          version: "1.0",
          operator: "yao",
          operateTime: 1_713_685_200_100,
          isValid: true,
          level: "project",
          isPublic: false,
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

describe("mapProjectPipelineStrategyDetail", () => {
  it("returns normalized project pipeline strategy gray detail", () => {
    const result = mapProjectPipelineStrategyDetail({
      id: "strategy-1",
      name: "Project Strategy",
      type: "project",
      version: "1.0",
      creator: "yao",
      create_time: "2026-04-21T10:00:00Z",
      updater: "alice",
      update_time: "2026-04-21T11:00:00Z",
      is_valid: true,
      level: "project",
      is_public: false,
      is_legacy: false,
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
      name: "Project Strategy",
      type: "project",
      version: "1.0",
      creator: "yao",
      createTime: "2026-04-21T10:00:00Z",
      updater: "alice",
      updateTime: "2026-04-21T11:00:00Z",
      isValid: true,
      level: "project",
      isPublic: false,
      isLegacy: false,
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

describe("mapProjectPipelineStrategyRelatedInfo", () => {
  it("returns normalized project strategy related info", () => {
    const result = mapProjectPipelineStrategyRelatedInfo("project-1", "strategy-1", {
      project_count: 1,
      pipeline_count: 6
    });

    expectMappedItem(result, {
      id: "strategy-1",
      projectId: "project-1",
      ruleSetId: "strategy-1",
      projectCount: 1,
      pipelineCount: 6
    });
  });
});

describe("mapProjectPipelineStrategySummary", () => {
  it("returns normalized project strategy summary detail", () => {
    const result = mapProjectPipelineStrategySummary("project-1", {
      id: "strategy-1",
      name: "Project Strategy",
      type: "project",
      version: "1.0",
      operator: "yao",
      operate_time: 1_713_685_200_100,
      is_valid: true,
      level: "project",
      is_public: false,
      is_legacy: false
    });

    expectMappedItem(result, {
      id: "strategy-1",
      projectId: "project-1",
      ruleSetId: "strategy-1",
      name: "Project Strategy",
      type: "project",
      version: "1.0",
      operator: "yao",
      operateTime: 1_713_685_200_100,
      isValid: true,
      level: "project",
      isPublic: false,
      isLegacy: false
    });
  });
});
