import { describe, expect, it, vi } from "vitest";
import { reqCopyWorkItemsInput as reqCopyWorkItemsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCopyWorkItemsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqCopyWorkItemsHandler,
  mapCopiedWorkItems,
  previewCopyWorkItems
} from "../../../../src/products/req/tools/copy-work-items.js";

describe("reqCopyWorkItemsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      from_project_id: "src-project",
      to_project_id: "target-project",
      work_item_ids: ["69901043", "69901044"]
    };

    expect(reqCopyWorkItemsInput.parse(input)).toEqual({
      ...input,
      copy_comments: false,
      copy_work_hours: false,
      dry_run: true
    });
    expect(reqCopyWorkItemsInputFromBarrel.parse(input)).toEqual({
      ...input,
      copy_comments: false,
      copy_work_hours: false,
      dry_run: true
    });
  });
});

describe("previewCopyWorkItems", () => {
  it("returns a dry-run preview without execution", () => {
    const result = previewCopyWorkItems({
      from_project_id: "src-project",
      to_project_id: "target-project",
      work_item_ids: ["69901043", "69901044"],
      copy_comments: true,
      copy_work_hours: false,
      dry_run: true
    });

    expect(result).toEqual({
      summary: "Dry run: copy 2 work items to project target-project",
      item: {
        fromProjectId: "src-project",
        toProjectId: "target-project",
        workItemIds: ["69901043", "69901044"],
        copyComments: true,
        copyWorkHours: false,
        successWorkItems: [],
        createdWorkItems: [],
        errorWorkItems: [],
        executed: false
      },
      raw: undefined
    });
  });
});

describe("mapCopiedWorkItems", () => {
  it("returns normalized copied work-item data", () => {
    const result = mapCopiedWorkItems({
      from_project_id: "src-project",
      to_project_id: "target-project",
      work_item_ids: ["69901043", "69901044"],
      copy_comments: true,
      copy_work_hours: false,
      status: "success",
      success_work_items: [
        {
          id: "69901043",
          tracker_id: 7,
          project_id: "13281266",
          project_uuid: "src-project",
          subject: "Story A"
        }
      ],
      created_work_items: [
        {
          id: "69913248",
          tracker_id: 7,
          project_id: "13290000",
          project_uuid: "target-project",
          subject: "Story A"
        }
      ],
      error_work_items: [
        {
          id: "69901044",
          tracker_id: 3,
          project_id: "13281266",
          project_uuid: "src-project",
          subject: "Bug B"
        }
      ]
    });

    expect(result).toEqual({
      summary: "Copied 2 work items to project target-project",
      item: {
        fromProjectId: "src-project",
        toProjectId: "target-project",
        workItemIds: ["69901043", "69901044"],
        copyComments: true,
        copyWorkHours: false,
        status: "success",
        successWorkItems: [
          {
            id: "69901043",
            tracker_id: 7,
            project_id: "13281266",
            project_uuid: "src-project",
            subject: "Story A"
          }
        ],
        createdWorkItems: [
          {
            id: "69913248",
            tracker_id: 7,
            project_id: "13290000",
            project_uuid: "target-project",
            subject: "Story A"
          }
        ],
        errorWorkItems: [
          {
            id: "69901044",
            tracker_id: 3,
            project_id: "13281266",
            project_uuid: "src-project",
            subject: "Bug B"
          }
        ],
        executed: true
      },
      raw: undefined
    });
  });
});

describe("createReqCopyWorkItemsHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      copyWorkItems: vi.fn()
    };
    const handler = createReqCopyWorkItemsHandler(client);

    const result = await handler({
      from_project_id: "src-project",
      to_project_id: "target-project",
      work_item_ids: ["69901043", "69901044"],
      copy_comments: true,
      copy_work_hours: false,
      dry_run: true
    });

    expect(client.copyWorkItems).not.toHaveBeenCalled();
    expect(result.structuredContent.item?.executed).toBe(false);
  });

  it("executes copy when dry_run is false", async () => {
    const client = {
      copyWorkItems: vi.fn(async () => ({
        from_project_id: "src-project",
        to_project_id: "target-project",
        work_item_ids: ["69901043", "69901044"],
        copy_comments: true,
        copy_work_hours: false,
        status: "success",
        success_work_items: [
          {
            id: "69901043",
            tracker_id: 7,
            project_id: "13281266",
            project_uuid: "src-project",
            subject: "Story A"
          }
        ],
        created_work_items: [
          {
            id: "69913248",
            tracker_id: 7,
            project_id: "13290000",
            project_uuid: "target-project",
            subject: "Story A"
          }
        ],
        error_work_items: []
      }))
    };
    const handler = createReqCopyWorkItemsHandler(client);

    const result = await handler({
      from_project_id: "src-project",
      to_project_id: "target-project",
      work_item_ids: ["69901043", "69901044"],
      copy_comments: true,
      copy_work_hours: false,
      dry_run: false
    });

    expect(client.copyWorkItems).toHaveBeenCalledWith({
      from_project_id: "src-project",
      to_project_id: "target-project",
      work_item_ids: ["69901043", "69901044"],
      copy_comments: true,
      copy_work_hours: false,
      dry_run: false
    });
    expect(result.structuredContent.item).toEqual({
      fromProjectId: "src-project",
      toProjectId: "target-project",
      workItemIds: ["69901043", "69901044"],
      copyComments: true,
      copyWorkHours: false,
      status: "success",
      successWorkItems: [
        {
          id: "69901043",
          tracker_id: 7,
          project_id: "13281266",
          project_uuid: "src-project",
          subject: "Story A"
        }
      ],
      createdWorkItems: [
        {
          id: "69913248",
          tracker_id: 7,
          project_id: "13290000",
          project_uuid: "target-project",
          subject: "Story A"
        }
      ],
      errorWorkItems: [],
      executed: true
    });
  });
});
