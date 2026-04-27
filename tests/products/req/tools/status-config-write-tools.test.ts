import { describe, expect, it, vi } from "vitest";
import {
  reqBatchCreateTrackerConfigInput as reqBatchCreateTrackerConfigInputFromBarrel,
  reqCreateProjectStatusConfigInput as reqCreateProjectStatusConfigInputFromBarrel,
  reqUpdateTrackerConfigInput as reqUpdateTrackerConfigInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqBatchCreateTrackerConfigInput,
  reqCreateProjectStatusConfigInput,
  reqUpdateTrackerConfigInput
} from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqBatchCreateTrackerConfigHandler,
  previewBatchCreateTrackerConfig
} from "../../../../src/products/req/tools/batch-create-tracker-config.js";
import {
  createReqCreateProjectStatusConfigHandler,
  previewCreateProjectStatusConfig
} from "../../../../src/products/req/tools/create-project-status-config.js";
import {
  normalizeStatusConfig
} from "../../../../src/products/req/tools/status-config-mappers.js";
import {
  createReqUpdateTrackerConfigHandler,
  previewUpdateTrackerConfig
} from "../../../../src/products/req/tools/update-tracker-config.js";

describe("status config write input exports", () => {
  it("keeps the barrel exports compatible with the work-item schema module", () => {
    const createInput = {
      project_id: "project-1",
      defined_name: "待验证",
      status_attribute: 35098945
    };
    const batchInput = {
      project_id: "project-1",
      tracker_id: 7,
      status_config_ids: ["status-1"]
    };
    const updateInput = {
      project_id: "project-1",
      tracker_id: 7,
      status_config_id: "status-1",
      new_position: 3
    };

    expect(reqCreateProjectStatusConfigInput.parse(createInput)).toEqual({
      ...createInput,
      dry_run: true
    });
    expect(reqCreateProjectStatusConfigInputFromBarrel.parse(createInput)).toEqual({
      ...createInput,
      dry_run: true
    });
    expect(reqBatchCreateTrackerConfigInput.parse(batchInput)).toEqual({
      ...batchInput,
      dry_run: true
    });
    expect(reqBatchCreateTrackerConfigInputFromBarrel.parse(batchInput)).toEqual({
      ...batchInput,
      dry_run: true
    });
    expect(reqUpdateTrackerConfigInput.parse(updateInput)).toEqual({
      ...updateInput,
      dry_run: true
    });
    expect(reqUpdateTrackerConfigInputFromBarrel.parse(updateInput)).toEqual({
      ...updateInput,
      dry_run: true
    });
  });
});

describe("status config write previews", () => {
  it("previews status config mutations without execution", () => {
    expect(
      previewCreateProjectStatusConfig({
        project_id: "project-1",
        defined_name: "待验证",
        description: "Ready for QA",
        status_attribute: 35098945,
        dry_run: true
      }).item
    ).toEqual({
      projectId: "project-1",
      definedName: "待验证",
      description: "Ready for QA",
      statusAttribute: 35098945,
      executed: false
    });

    expect(
      previewBatchCreateTrackerConfig({
        project_id: "project-1",
        tracker_id: 7,
        status_config_ids: ["status-1"],
        dry_run: true
      }).item
    ).toEqual({
      projectId: "project-1",
      trackerId: 7,
      statusConfigIds: ["status-1"],
      executed: false
    });

    expect(
      previewUpdateTrackerConfig({
        project_id: "project-1",
        tracker_id: 7,
        status_config_id: "status-1",
        new_position: 3,
        dry_run: true
      }).item
    ).toEqual({
      projectId: "project-1",
      trackerId: 7,
      statusConfigId: "status-1",
      newPosition: 3,
      executed: false
    });
  });
});

describe("normalizeStatusConfig", () => {
  it("normalizes upstream status config fields", () => {
    expect(
      normalizeStatusConfig({
        id: "status-1",
        statusId: 15,
        definedName: "待验证",
        position: 2,
        statusAttribute: 35098945,
        statusAttributeName: "进行态",
        issueStatusAttribute: {
          id: "attr-1",
          name: "进行态",
          type: "doing"
        },
        trackerId: 7
      })
    ).toEqual({
      trackerList: undefined,
      id: "status-1",
      statusId: 15,
      definedName: "待验证",
      description: undefined,
      position: 2,
      flag: undefined,
      closed: undefined,
      initial: undefined,
      statusAttributeId: 35098945,
      statusAttributeName: "进行态",
      statusAttribute: {
        id: "attr-1",
        name: "进行态",
        type: "doing"
      },
      trackerId: 7
    });
  });
});

describe("status config write handlers", () => {
  it("short-circuits dry-run mutations", async () => {
    const createClient = { createProjectStatusConfig: vi.fn() };
    const batchClient = { batchCreateTrackerConfig: vi.fn() };
    const updateClient = { updateTrackerConfig: vi.fn() };

    const createResult = await createReqCreateProjectStatusConfigHandler(createClient)({
      project_id: "project-1",
      defined_name: "待验证",
      status_attribute: 35098945
    });
    const batchResult = await createReqBatchCreateTrackerConfigHandler(batchClient)({
      project_id: "project-1",
      tracker_id: 7,
      status_config_ids: ["status-1"]
    });
    const updateResult = await createReqUpdateTrackerConfigHandler(updateClient)({
      project_id: "project-1",
      tracker_id: 7,
      status_config_id: "status-1",
      new_position: 3
    });

    expect(createClient.createProjectStatusConfig).not.toHaveBeenCalled();
    expect(batchClient.batchCreateTrackerConfig).not.toHaveBeenCalled();
    expect(updateClient.updateTrackerConfig).not.toHaveBeenCalled();
    expect(createResult.structuredContent.item?.executed).toBe(false);
    expect(batchResult.structuredContent.item?.executed).toBe(false);
    expect(updateResult.structuredContent.item?.executed).toBe(false);
  });

  it("executes mutations when dry_run is false", async () => {
    const createClient = {
      createProjectStatusConfig: vi.fn(async () => ({
        status: "success",
        result: {
          id: "status-1",
          definedName: "待验证"
        }
      }))
    };
    const batchClient = {
      batchCreateTrackerConfig: vi.fn(async () => ({
        status: "success",
        result: {
          issueStatusConfigs: [
            {
              id: "status-1",
              definedName: "待验证",
              trackerId: 7
            }
          ]
        }
      }))
    };
    const updateClient = {
      updateTrackerConfig: vi.fn(async () => ({
        status: "success"
      }))
    };

    const createResult = await createReqCreateProjectStatusConfigHandler(createClient)({
      project_id: "project-1",
      defined_name: "待验证",
      status_attribute: 35098945,
      dry_run: false
    });
    const batchResult = await createReqBatchCreateTrackerConfigHandler(batchClient)({
      project_id: "project-1",
      tracker_id: 7,
      status_config_ids: ["status-1"],
      dry_run: false
    });
    const updateResult = await createReqUpdateTrackerConfigHandler(updateClient)({
      project_id: "project-1",
      tracker_id: 7,
      status_config_id: "status-1",
      new_position: 3,
      dry_run: false
    });

    expect(createClient.createProjectStatusConfig).toHaveBeenCalledWith({
      project_id: "project-1",
      defined_name: "待验证",
      status_attribute: 35098945,
      dry_run: false
    });
    expect(batchClient.batchCreateTrackerConfig).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7,
      status_config_ids: ["status-1"],
      dry_run: false
    });
    expect(updateClient.updateTrackerConfig).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7,
      status_config_id: "status-1",
      new_position: 3,
      dry_run: false
    });
    expect(createResult.structuredContent.item).toMatchObject({
      projectId: "project-1",
      status: "success",
      executed: true
    });
    expect(batchResult.structuredContent.item).toMatchObject({
      projectId: "project-1",
      trackerId: 7,
      status: "success",
      executed: true
    });
    expect(updateResult.structuredContent.item).toMatchObject({
      projectId: "project-1",
      trackerId: 7,
      status: "success",
      executed: true
    });
  });
});
