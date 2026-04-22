import { afterEach, describe, it, vi } from "vitest";
import { expectWritePathRateLimit } from "./http-test-helpers.js";

describe("write path rate limits", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits repeated pipeline_create_group executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_create_group",
      responsePayload: {
        id: "group-1",
        project_id: "project-1",
        name: "Release"
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        name: `Release-${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        name: "Release-blocked",
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_update_group executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_update_group",
      responsePayload: {
        success: true
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        id: "group-1",
        name: `Release-${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        id: "group-1",
        name: "Release-blocked",
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_delete_group executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_delete_group",
      responsePayload: {
        success: true
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        id: `group-${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        id: "group-blocked",
        dry_run: false
      }
    });
  });
});
