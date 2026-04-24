import { describe, expect, it, vi } from "vitest";
import {
  reqCreateWorkItemTemplateInput as reqCreateWorkItemTemplateInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import { reqCreateWorkItemTemplateInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqCreateWorkItemTemplateHandler,
  mapCreatedWorkItemTemplate,
  previewCreateWorkItemTemplate
} from "../../../../src/products/req/tools/create-work-item-template.js";

describe("work item template write schema exports", () => {
  it("keeps create work item template schema exports compatible", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 7,
      description: "<p>story template</p>"
    };

    expect(reqCreateWorkItemTemplateInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateWorkItemTemplateInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("previewCreateWorkItemTemplate", () => {
  it("returns a dry-run preview without execution", () => {
    const result = previewCreateWorkItemTemplate({
      project_id: "project-1",
      tracker_id: 7,
      description: "<p>story template</p>",
      issue_field_configs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      dry_run: true
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      description: "<p>story template</p>",
      issueFieldConfigs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      executed: false
    });
  });
});

describe("mapCreatedWorkItemTemplate", () => {
  it("returns normalized created-or-updated work item template data", () => {
    const result = mapCreatedWorkItemTemplate({
      project_id: "project-1",
      tracker_id: 7,
      description: "<p>story template</p>",
      issue_field_configs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      status: "success"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      description: "<p>story template</p>",
      issueFieldConfigs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      status: "success",
      executed: true
    });
  });
});

describe("createReqCreateWorkItemTemplateHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      createWorkItemTemplate: vi.fn()
    };
    const handler = createReqCreateWorkItemTemplateHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 7,
      description: "<p>story template</p>",
      dry_run: true
    });

    expect(client.createWorkItemTemplate).not.toHaveBeenCalled();
    expect(result.structuredContent.item?.executed).toBe(false);
  });

  it("executes create-or-update when dry_run is false", async () => {
    const client = {
      createWorkItemTemplate: vi.fn(async () => ({
        project_id: "project-1",
        tracker_id: 7 as const,
        description: "<p>story template</p>",
        issue_field_configs: [
          {
            field: "status_id",
            is_required: 1,
            default_value: "新建",
            position: 1
          }
        ],
        status: "success"
      }))
    };
    const handler = createReqCreateWorkItemTemplateHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 7 as const,
      description: "<p>story template</p>",
      issue_field_configs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      dry_run: false
    });

    expect(client.createWorkItemTemplate).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7,
      description: "<p>story template</p>",
      issue_field_configs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      dry_run: false
    });
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      description: "<p>story template</p>",
      issueFieldConfigs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      status: "success",
      executed: true
    });
  });
});
