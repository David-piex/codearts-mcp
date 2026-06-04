import { describe, expect, it, vi } from "vitest";
import { reqCreateWorkItemCustomFieldInput as reqCreateWorkItemCustomFieldInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateWorkItemCustomFieldInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqCreateWorkItemCustomFieldHandler,
  mapCreatedWorkItemCustomField,
  previewCreateWorkItemCustomField
} from "../../../../src/products/req/tools/create-work-item-custom-field.js";

const input = {
  project_id: "p-1",
  name: "Business line",
  type: "text",
  scrum_type: "Story",
  memo: "desc",
  options: "A,B"
} as const;

describe("create work item custom field tool", () => {
  it("previews custom field creation", () => {
    const result = previewCreateWorkItemCustomField({ ...input, dry_run: true });

    expect(result.item).toEqual({
      projectId: "p-1",
      name: "Business line",
      type: "text",
      scrumType: "Story",
      memo: "desc",
      options: "A,B",
      endpoint: "/v3/{project_id}/custom-fields",
      executed: false
    });
  });

  it("maps executed custom field creation", () => {
    const raw = { id: 1, name: "Business line" };
    const result = mapCreatedWorkItemCustomField({
      id: 1,
      identifier: "cf-1",
      name: "Business line",
      type: "text",
      custom_field: "custom_field16",
      tracker_id: 7,
      project_id: "p-1",
      memo: "desc",
      options: "A,B",
      region: "cn",
      created: "2026-06-04 10:00:00",
      modified: "2026-06-04 10:00:00",
      is_delete: false,
      raw
    });

    expect(result.item).toEqual({
      id: "1",
      identifier: "cf-1",
      name: "Business line",
      type: "text",
      customField: "custom_field16",
      trackerId: 7,
      projectId: "p-1",
      memo: "desc",
      options: "A,B",
      region: "cn",
      created: "2026-06-04 10:00:00",
      modified: "2026-06-04 10:00:00",
      isDelete: false,
      executed: true
    });
    expect(result.raw).toEqual(raw);
  });

  it("keeps the barrel export compatible", () => {
    expect(reqCreateWorkItemCustomFieldInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateWorkItemCustomFieldInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("short-circuits dry runs", async () => {
    const client = { createWorkItemCustomField: vi.fn() };
    const handler = createReqCreateWorkItemCustomFieldHandler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.createWorkItemCustomField).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: create work item custom field Business line");
  });

  it("executes through client", async () => {
    const client = {
      createWorkItemCustomField: vi.fn(async () => ({
        id: 1,
        name: "Business line",
        raw: { id: 1 }
      }))
    };
    const handler = createReqCreateWorkItemCustomFieldHandler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.createWorkItemCustomField).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "1",
      name: "Business line",
      executed: true
    });
  });
});
