import { describe, expect, it } from "vitest";
import { createBuildListBuildInfoRecordsV3Handler } from "../../../../src/products/build/tools/list-build-info-records-v3.js";

describe("createBuildListBuildInfoRecordsV3Handler", () => {
  it("maps v3 build-info records into MCP output", async () => {
    const handler = createBuildListBuildInfoRecordsV3Handler({
      listBuildInfoRecordsV3: async () => ({
        records: [
          {
            number: 8,
            state: "success",
            trigger_type: "Manual"
          }
        ],
        total: 1,
        raw: {}
      })
    });

    const result = await handler({
      job_id: "job-1",
      start_time: "2026-05-01 00:00:00",
      end_time: "2026-05-24 23:59:59",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("1 Build v3 build-info records found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "8",
        name: undefined,
        record: {
          number: 8,
          state: "success",
          trigger_type: "Manual"
        }
      }
    ]);
  });
});
