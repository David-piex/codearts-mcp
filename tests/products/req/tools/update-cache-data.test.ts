import { describe, expect, it, vi } from "vitest";
import { reqUpdateCacheDataInput as reqUpdateCacheDataInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateCacheDataInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqUpdateCacheDataHandler,
  mapUpdatedCacheData,
  previewUpdateCacheData
} from "../../../../src/products/req/tools/update-cache-data.js";

describe("previewUpdateCacheData", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdateCacheData({
      project_id: "project-1",
      type: "backlog",
      region: "cn-north-4",
      cache_id: 11,
      visible_fields: ["subject", "status"],
      fields: [
        {
          field: "subject",
          visible: true,
          order: 1
        }
      ],
      dry_run: true
    });

    expect(result.summary).toBe("Dry run: update cache data for type backlog");
    expect(result.item).toEqual({
      projectId: "project-1",
      type: "backlog",
      region: "cn-north-4",
      cacheId: 11,
      visibleFieldIds: ["subject", "status"],
      fields: [
        {
          field: "subject",
          visible: true,
          order: 1
        }
      ],
      updatedCount: 0,
      executed: false
    });
  });
});

describe("mapUpdatedCacheData", () => {
  it("returns normalized updated cache data", () => {
    const result = mapUpdatedCacheData({
      project_id: "project-1",
      type: "backlog",
      region: "cn-north-4",
      cache_id: 11,
      updated_count: 2,
      fields: [
        {
          id: "subject",
          field: "subject",
          header: "Subject",
          type: "text",
          visible: true,
          order: 1
        }
      ]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      type: "backlog",
      region: "cn-north-4",
      cacheId: 11,
      updatedCount: 2,
      fields: [
        {
          id: "subject",
          field: "subject",
          header: "Subject",
          type: "text",
          visible: true,
          order: 1
        }
      ],
      executed: true
    });
  });
});

describe("reqUpdateCacheDataInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      type: "backlog",
      fields: [
        {
          field: "subject",
          visible: true,
          order: 1
        }
      ]
    };

    expect(reqUpdateCacheDataInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateCacheDataInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUpdateCacheDataHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateCacheData: vi.fn()
    };
    const handler = createReqUpdateCacheDataHandler(client);

    const result = await handler({
      project_id: "project-1",
      type: "backlog",
      visible_fields: ["subject", "status"],
      dry_run: true
    });

    expect(client.updateCacheData).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: update cache data for type backlog" }],
      structuredContent: {
        summary: "Dry run: update cache data for type backlog",
        item: {
          projectId: "project-1",
          type: "backlog",
          region: undefined,
          cacheId: undefined,
          visibleFieldIds: ["subject", "status"],
          fields: [],
          updatedCount: 0,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed updates", async () => {
    const client = {
      updateCacheData: vi.fn(async () => ({
        project_id: "project-1",
        type: "backlog",
        region: "cn-north-4",
        cache_id: 11,
        updated_count: 2,
        fields: [
          {
            id: "subject",
            field: "subject",
            header: "Subject",
            type: "text",
            visible: true,
            order: 1
          }
        ]
      }))
    };
    const handler = createReqUpdateCacheDataHandler(client);

    const result = await handler({
      project_id: "project-1",
      type: "backlog",
      region: "cn-north-4",
      fields: [
        {
          field: "subject",
          visible: true,
          order: 1
        }
      ],
      dry_run: false
    });

    expect(client.updateCacheData).toHaveBeenCalledWith({
      project_id: "project-1",
      type: "backlog",
      region: "cn-north-4",
      fields: [
        {
          field: "subject",
          visible: true,
          order: 1
        }
      ],
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated cache data for type backlog" }],
      structuredContent: {
        summary: "Updated cache data for type backlog",
        item: {
          projectId: "project-1",
          type: "backlog",
          region: "cn-north-4",
          cacheId: 11,
          updatedCount: 2,
          fields: [
            {
              id: "subject",
              field: "subject",
              header: "Subject",
              type: "text",
              visible: true,
              order: 1
            }
          ],
          executed: true
        },
        raw: undefined
      }
    });
  });
});
