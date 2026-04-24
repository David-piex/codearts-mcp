import { describe, expect, it, vi } from "vitest";
import { reqCountWorkItemTreeInput as reqCountWorkItemTreeInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCountWorkItemTreeInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqCountWorkItemTreeHandler,
  mapReqWorkItemTreeCount
} from "../../../../src/products/req/tools/count-work-item-tree.js";

describe("mapReqWorkItemTreeCount", () => {
  it("returns normalized work item tree count data", () => {
    const result = mapReqWorkItemTreeCount({
      project_id: "project-1",
      total_count: 25,
      tracker_ids: [7, 2, 3],
      page: 1,
      page_size: 15
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      totalCount: 25,
      trackerIds: [7, 2, 3],
      page: 1,
      pageSize: 15
    });
  });
});

describe("reqCountWorkItemTreeInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      page: 1,
      page_size: 15,
      tracker_ids: [7, 2, 3] as const
    };

    expect(reqCountWorkItemTreeInput.parse(input)).toEqual(input);
    expect(reqCountWorkItemTreeInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqCountWorkItemTreeHandler", () => {
  it("returns normalized work item tree count output", async () => {
    const client = {
      countWorkItemTree: vi.fn(async () => ({
        project_id: "project-1",
        total_count: 25,
        tracker_ids: [7, 2, 3],
        page: 1,
        page_size: 15
      }))
    };
    const handler = createReqCountWorkItemTreeHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 15,
      tracker_ids: [7, 2, 3]
    });

    expect(client.countWorkItemTree).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 15,
      tracker_ids: [7, 2, 3]
    });
    expect(result.content[0]?.text).toContain("Loaded work item tree count for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      totalCount: 25,
      trackerIds: [7, 2, 3],
      page: 1,
      pageSize: 15
    });
  });
});
