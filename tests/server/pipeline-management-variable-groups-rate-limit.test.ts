import { afterEach, describe, it, vi } from "vitest";
import { expectWritePathRateLimit } from "./http-test-helpers.js";

describe("write path rate limits", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits repeated pipeline_create_variable_group executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_create_variable_group",
      responsePayload: {
        id: "vg-1",
        project_id: "project-1",
        name: "Release Vars"
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        name: `Release Vars ${index}`,
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
      }),
      blockedInput: {
        project_id: "project-1",
        name: "Release Vars blocked",
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
      }
    });
  });

  it("limits repeated pipeline_update_variable_group executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_update_variable_group",
      responsePayload: {
        success: true
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        id: "vg-1",
        name: `Release Vars ${index}`,
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
      }),
      blockedInput: {
        project_id: "project-1",
        id: "vg-1",
        name: "Release Vars blocked",
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
      }
    });
  });

  it("limits repeated pipeline_bind_variable_groups_to_pipeline executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_bind_variable_groups_to_pipeline",
      responsePayload: {
        success: true
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        pipeline_id: `pipeline-${index}`,
        pipeline_group_ids: ["vg-1", "vg-2"],
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        pipeline_id: "pipeline-blocked",
        pipeline_group_ids: ["vg-1", "vg-2"],
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_delete_variable_group executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_delete_variable_group",
      responsePayload: {
        success: true
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        id: `vg-${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        id: "vg-blocked",
        dry_run: false
      }
    });
  });
});
