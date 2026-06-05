import { describe, expect, it } from "vitest";
import {
  createPipelineBatchUpdatePipelinePermissionHandler,
  createPipelineUpdatePipelineNoticeConfHandler,
  createPipelineUpdateProjectNoticeEventSwitchHandler,
  mapPipelineWrite,
  previewPipelineWrite
} from "../../../../src/products/pipeline/tools/manage-pipeline-notice-permission.js";
import { expectDryRunPreview, expectMappedItem } from "./tool-test-helpers.js";

describe("previewPipelineWrite", () => {
  it("returns a dry-run summary for pipeline notice and permission writes", () => {
    const result = previewPipelineWrite("update official notice", {
      projectId: "project-1",
      pipelineId: "pipe-1"
    });

    expectDryRunPreview(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      executed: false
    });
  });
});

describe("mapPipelineWrite", () => {
  it("returns normalized write output for pipeline notice and permission writes", () => {
    const result = mapPipelineWrite("updated official notice", {
      projectId: "project-1",
      pipelineId: "pipe-1",
      status: "success"
    });

    expectMappedItem(result, {
      projectId: "project-1",
      pipelineId: "pipe-1",
      status: "success",
      executed: true
    });
  });
});

describe("pipeline notice and permission write handlers", () => {
  it("returns dry-run output for project notice event switch", async () => {
    const handler = createPipelineUpdateProjectNoticeEventSwitchHandler({
      updateProjectNoticeEventSwitch: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      type: 3,
      enable: true,
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      type: 3,
      enable: true,
      executed: false
    });
  });

  it("maps executed output for pipeline notice config update", async () => {
    const handler = createPipelineUpdatePipelineNoticeConfHandler({
      updatePipelineNoticeConf: async () => ({ status: "success" })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      type: "2",
      event: {
        id: "pipelineRun.failed",
        selected: true,
        notice_roles: ["CREATOR", "EXECUTOR"]
      },
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineId: "pipe-1",
      type: "2",
      event: {
        id: "pipelineRun.failed",
        selected: true,
        notice_roles: ["CREATOR", "EXECUTOR"]
      },
      status: "success",
      executed: true
    });
  });

  it("maps executed output for batch update pipeline permission", async () => {
    const handler = createPipelineBatchUpdatePipelinePermissionHandler({
      batchUpdatePipelinePermission: async () => ({ status: "success" })
    });

    const result = await handler({
      project_id: "project-1",
      pipeline_ids: ["pipe-1", "pipe-2"],
      is_project_switch: false,
      roles: [{
        operation_query: true,
        operation_execute: true,
        operation_update: true,
        operation_delete: false,
        operation_authorize: false,
        role_id: 4
      }],
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      pipelineIds: ["pipe-1", "pipe-2"],
      isProjectSwitch: false,
      roles: [{
        operation_query: true,
        operation_execute: true,
        operation_update: true,
        operation_delete: false,
        operation_authorize: false,
        role_id: 4
      }],
      status: "success",
      executed: true
    });
  });
});
