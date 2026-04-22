import { afterEach, describe, it, vi } from "vitest";
import { expectWritePathRateLimit } from "./http-test-helpers.js";

describe("write path rate limits", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits repeated pipeline_create_tag executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_create_tag",
      responsePayload: {
        success: true
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        name: `release-${index}`,
        color: "#0b81f6",
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        name: "release-blocked",
        color: "#0b81f6",
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_update_tag executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_update_tag",
      responsePayload: {
        success: true
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        tag_id: "tag-1",
        name: `release-${index}`,
        color: "#12a57a",
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        tag_id: "tag-1",
        name: "release-blocked",
        color: "#12a57a",
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_set_tags_for_pipelines executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_set_tags_for_pipelines",
      responsePayload: {
        success: true
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        pipeline_ids: [`pipeline-${index}`],
        tag_ids: ["tag-1", "tag-2"],
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        pipeline_ids: ["pipeline-blocked"],
        tag_ids: ["tag-1", "tag-2"],
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_delete_tag executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_delete_tag",
      responsePayload: {
        success: true
      },
      allowedInput: (index) => ({
        project_id: "project-1",
        tag_id: `tag-${index}`,
        dry_run: false
      }),
      blockedInput: {
        project_id: "project-1",
        tag_id: "tag-blocked",
        dry_run: false
      }
    });
  });
});
