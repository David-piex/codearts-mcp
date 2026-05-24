import { describe, expect, it } from "vitest";
import { createBuildListPeriodHistoryV3Handler } from "../../../../src/products/build/tools/list-period-history-v3.js";

describe("createBuildListPeriodHistoryV3Handler", () => {
  it("maps v3 period history records into MCP output", async () => {
    const handler = createBuildListPeriodHistoryV3Handler({
      listPeriodHistoryV3: async () => ({
        records: [
          {
            record_id: "record-1",
            job_id: "job-1",
            build_number: 7,
            result: "success"
          }
        ],
        total: 1,
        raw: {}
      })
    });

    const result = await handler({
      job_id: "job-1",
      start_time: "2026-05-01",
      end_time: "2026-05-24",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("1 Build v3 period history records found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "record-1",
        name: undefined,
        record: {
          record_id: "record-1",
          job_id: "job-1",
          build_number: 7,
          result: "success"
        }
      }
    ]);
  });
});
