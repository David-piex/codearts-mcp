import { describe, expect, it } from "vitest";
import { mapReqIterations } from "../../../../src/products/req/tools/list-iterations.js";

describe("mapReqIterations", () => {
  it("returns normalized iterations with pagination", () => {
    const result = mapReqIterations(
      [
        {
          id: 1,
          name: "Sprint 1",
          status: "ongoing",
          begin_time: "2026-04-01",
          end_time: "2026-04-14",
          description: "Iteration one",
          updated_time: 1713200000,
          deleted: false
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "1",
        name: "Sprint 1",
        status: "ongoing",
        beginTime: "2026-04-01",
        endTime: "2026-04-14",
        description: "Iteration one",
        updatedTime: 1713200000,
        deleted: false
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
