import { describe, expect, it } from "vitest";
import {
  checkCreateRulesetInput,
  checkCreateTaskInput,
  checkDeleteRulesetInput,
  checkDetectTaskLanguageInput,
  checkGetMeasureTotalInput,
  checkGetProjectConfigInput,
  checkSetDefaultRulesetInput,
  checkUpdatePipelineTaskInput,
  checkUpdateTaskConfigParametersInput,
  checkUpdateTaskOwnerMatchingSwitchInput,
  checkUpdateTaskWebhookInput,
  checkUpdateTaskResourcePoolInput,
  checkListConfigItemsInput,
  checkListCodehubRepositoriesInput,
  checkListTaskAllFilesInput,
  checkListTaskIssuesInput,
  checkModifyCriterionsetRelationsInput,
  checkRunTaskInput
} from "../../../src/products/check/schemas.js";

describe("check schemas", () => {
  it("accepts create task resource and path fields", () => {
    const parsed = checkCreateTaskInput.parse({
      project_id: "project-1",
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      language: "java",
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      include_paths: "src,lib",
      exclude_dir: "dist"
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      language: "java",
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      include_paths: "src,lib",
      exclude_dir: "dist",
      dry_run: true
    });
  });

  it("accepts create and delete ruleset schemas with dry-run defaults", () => {
    expect(checkCreateRulesetInput.parse({
      project_id: "project-1",
      template_name: "java-custom",
      language: "JAVA",
      is_default: "1",
      template_id: "ruleset-1",
      rule_ids: "rule-1,rule-2",
      uncheck_ids: "rule-3",
      custom_attributes: [
        {
          attribute: "severity",
          rules: [
            {
              rule_id: "rule-1",
              value: "1"
            }
          ]
        }
      ]
    })).toEqual({
      project_id: "project-1",
      template_name: "java-custom",
      language: "JAVA",
      is_default: "1",
      template_id: "ruleset-1",
      rule_ids: "rule-1,rule-2",
      uncheck_ids: "rule-3",
      custom_attributes: [
        {
          attribute: "severity",
          rules: [
            {
              rule_id: "rule-1",
              value: "1"
            }
          ]
        }
      ],
      dry_run: true
    });

    expect(checkDeleteRulesetInput.parse({
      project_id: "project-1",
      ruleset_id: "ruleset-1"
    })).toEqual({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      dry_run: true
    });
  });

  it("accepts run task ref field", () => {
    const parsed = checkRunTaskInput.parse({
      task_id: "task-1",
      ref: "refs/merge-requests/12/head"
    });

    expect(parsed).toMatchObject({
      task_id: "task-1",
      ref: "refs/merge-requests/12/head",
      dry_run: true
    });
  });

  it("accepts task issue filter query fields", () => {
    const parsed = checkListTaskIssuesInput.parse({
      task_id: "task-1",
      severity: "1",
      defect_level: "2",
      rule_id: "rule-1",
      rule_name: "NullPointer",
      file_path: "src/App.java",
      status: "open",
      checker: "java"
    });

    expect(parsed).toMatchObject({
      task_id: "task-1",
      severity: "1",
      defect_level: "2",
      rule_id: "rule-1",
      rule_name: "NullPointer",
      file_path: "src/App.java",
      status: "open",
      checker: "java",
      page: 1,
      page_size: 20
    });
  });

  it("accepts new read-only task and repository query schemas", () => {
    expect(checkListTaskAllFilesInput.parse({
      task_id: "task-1",
      file_path: "src",
      get_son: true
    })).toEqual({
      task_id: "task-1",
      file_path: "src",
      get_son: true
    });

    expect(checkDetectTaskLanguageInput.parse({
      task_id: "task-1"
    })).toEqual({
      task_id: "task-1",
      scan_file: true
    });

    expect(checkListCodehubRepositoriesInput.parse({
      project_id: "project-1",
      search: "demo"
    })).toMatchObject({
      project_id: "project-1",
      search: "demo",
      page: 1,
      page_size: 20
    });
  });

  it("accepts config and measure read schemas", () => {
    expect(checkGetProjectConfigInput.parse({
      id: "config-1",
      operator: "szh"
    })).toEqual({
      id: "config-1",
      operator: "szh"
    });

    expect(checkListConfigItemsInput.parse({
      ids: ["ruleset-1", "ruleset-2"]
    })).toEqual({
      ids: ["ruleset-1", "ruleset-2"]
    });

    expect(checkGetMeasureTotalInput.parse({
      task_id: "task-1",
      query: {
        branch: "main"
      }
    })).toEqual({
      task_id: "task-1",
      query: {
        branch: "main"
      }
    });
  });

  it("accepts criterionset relation mutation schema with dry-run default", () => {
    const parsed = checkModifyCriterionsetRelationsInput.parse({
      set_id: "ruleset-1",
      operator: "szh",
      show_tool_versions: ["java:1.0"],
      criterion_ids_list: [
        {
          id: "criterion-1",
          status: "enable",
          is_support_version: "enable",
          params: {
            threshold: 10
          }
        }
      ]
    });

    expect(parsed).toEqual({
      set_id: "ruleset-1",
      operator: "szh",
      show_tool_versions: ["java:1.0"],
      criterion_ids_list: [
        {
          id: "criterion-1",
          status: "enable",
          is_support_version: "enable",
          params: {
            threshold: 10
          }
        }
      ],
      dry_run: true
    });
  });

  it("accepts task resource pool and pipeline task update schemas", () => {
    expect(checkUpdateTaskResourcePoolInput.parse({
      task_id: "task-1",
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      body: {
        pool_name: "high-cpu"
      }
    })).toEqual({
      task_id: "task-1",
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      body: {
        pool_name: "high-cpu"
      },
      dry_run: true
    });

    expect(checkUpdatePipelineTaskInput.parse({
      task_id: "task-2",
      body: {
        task_name: "pipeline-check"
      }
    })).toEqual({
      task_id: "task-2",
      body: {
        task_name: "pipeline-check"
      },
      dry_run: true
    });
  });

  it("accepts new check mutation schemas", () => {
    expect(checkUpdateTaskOwnerMatchingSwitchInput.parse({
      task_id: "task-1",
      enabled: true
    })).toEqual({
      task_id: "task-1",
      enabled: true,
      dry_run: true
    });

    expect(checkSetDefaultRulesetInput.parse({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      language: "JAVA"
    })).toEqual({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      language: "JAVA",
      dry_run: true
    });

    expect(checkUpdateTaskWebhookInput.parse({
      task_id: "task-1",
      body: { enabled: true, url: "https://example.com/hook" }
    })).toEqual({
      task_id: "task-1",
      body: { enabled: true, url: "https://example.com/hook" },
      dry_run: true
    });

    expect(checkUpdateTaskConfigParametersInput.parse({
      project_id: "project-1",
      task_id: "task-1",
      body: { scan_type: "full" }
    })).toEqual({
      project_id: "project-1",
      task_id: "task-1",
      body: { scan_type: "full" },
      dry_run: true
    });
  });
});
