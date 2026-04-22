import { afterEach, describe, it, vi } from "vitest";
import { expectWritePathRateLimit } from "./http-test-helpers.js";

describe("write path rate limits", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits repeated pipeline_create_project_strategy executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_create_project_strategy",
      responsePayload: {
        status: true,
        rule_set_id: "project-strategy-1"
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        name: `Project Strategy ${index}`,
        rules: [
          {
            id: "rule-1",
            is_valid: true
          }
        ],
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        name: "Project Strategy blocked",
        rules: [
          {
            id: "rule-1",
            is_valid: true
          }
        ],
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_update_project_strategy executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_update_project_strategy",
      responsePayload: {
        status: true,
        rule_set_id: "project-strategy-1"
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        rule_set_id: "project-strategy-1",
        name: `Project Strategy ${index}`,
        rules: [
          {
            id: "rule-1",
            is_valid: true
          }
        ],
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        rule_set_id: "project-strategy-1",
        name: "Project Strategy blocked",
        rules: [
          {
            id: "rule-1",
            is_valid: true
          }
        ],
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_inherit_project_strategy executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_inherit_project_strategy",
      responsePayload: {
        status: true,
        rule_set_id: "strategy-2"
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        name: `Inherited Strategy ${index}`,
        parent_id: "tenant-strategy-1",
        rules: ["rule-1", "rule-2"],
        is_valid: true,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        name: "Inherited Strategy blocked",
        parent_id: "tenant-strategy-1",
        rules: ["rule-1", "rule-2"],
        is_valid: true,
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_switch_project_strategy executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_switch_project_strategy",
      responsePayload: {
        status: true,
        rule_set_id: "project-strategy-1"
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        rule_set_id: "project-strategy-1",
        is_valid: index % 2 === 0,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        rule_set_id: "project-strategy-1",
        is_valid: false,
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_delete_project_strategy executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_delete_project_strategy",
      responsePayload: {
        status: true,
        rule_set_id: "project-strategy-1"
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        rule_set_id: `project-strategy-${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        rule_set_id: "project-strategy-blocked",
        dry_run: false
      }
    });
  });
});
