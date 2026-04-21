import { describe, expect, it, vi } from "vitest";
import { findListedWorkItem } from "./live-smoke-helpers.js";

describe("findListedWorkItem", () => {
  it("scans later pages when the first page does not include the target work item", async () => {
    const listWorkItems = vi
      .fn()
      .mockResolvedValueOnce({
        work_items: Array.from({ length: 20 }, (_, index) => ({
          id: String(index + 1),
          subject: `item-${index + 1}`
        }))
      })
      .mockResolvedValueOnce({
        work_items: [
          {
            id: "70785395",
            subject: "codex-req-debug-updated"
          }
        ]
      });

    const found = await findListedWorkItem(
      {
        listWorkItems
      },
      {
        projectId: "project-1",
        workItemId: "70785395"
      }
    );

    expect(found).toEqual({
      page: 2,
      item: {
        id: "70785395",
        subject: "codex-req-debug-updated"
      }
    });
    expect(listWorkItems).toHaveBeenCalledTimes(2);
    expect(listWorkItems).toHaveBeenNthCalledWith(1, {
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    expect(listWorkItems).toHaveBeenNthCalledWith(2, {
      project_id: "project-1",
      page: 2,
      page_size: 20
    });
  });
});
