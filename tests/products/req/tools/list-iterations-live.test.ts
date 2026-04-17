import { describe, expect, it } from "vitest";
import { createReqListIterationsHandler } from "../../../../src/products/req/tools/list-iterations.js";

describe("createReqListIterationsHandler", () => {
  it("maps provider iterations into MCP output", async () => {
    const handler = createReqListIterationsHandler({
      listIterations: async () => ({
        iterations: [
          {
            id: 11,
            name: "Sprint 1",
            status: "1",
            begin_time: "2026-04-01",
            end_time: "2026-04-15",
            description: "Core delivery",
            updated_time: 1713168000000,
            deleted: false
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "p-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items).toEqual([
      {
        id: "11",
        name: "Sprint 1",
        status: "1",
        beginTime: "2026-04-01",
        endTime: "2026-04-15",
        description: "Core delivery",
        updatedTime: 1713168000000,
        deleted: false
      }
    ]);
  });
});
