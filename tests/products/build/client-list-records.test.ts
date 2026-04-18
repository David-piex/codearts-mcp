import { afterEach, describe, expect, it, vi } from "vitest";
import { createBuildClient } from "../../../src/products/build/client.js";

describe("createBuildClient listRecords", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses the documented build-info-records endpoint", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-17T10:00:00"));

    let requestedPath = "";
    const client = createBuildClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            total_record: "1",
            job_build_states: [
              {
                number: 3,
                state: "SUCCESS",
                trigger_type: "MANUAL",
                daily_build_number: "20260417.3"
              }
            ]
          }
        };
      }
    } as never);

    const result = await client.listRecords({
      job_id: "job-1",
      page: 1,
      page_size: 20
    });

    expect(requestedPath).toContain("/v1/record/job-1/list?");
    expect(requestedPath).toContain("page_index=0");
    expect(requestedPath).toContain("page_size=20");
    expect(requestedPath).toContain("start_time=2026-03-18+10%3A00%3A00");
    expect(requestedPath).toContain("end_time=2026-04-17+10%3A00%3A00");
    expect(result).toEqual({
      records: [
        {
          record_id: "job-1#3",
          job_id: "job-1",
          build_no: 3,
          daily_build_number: "20260417.3",
          status: "SUCCESS",
          trigger_type: "MANUAL"
        }
      ],
      total: 1
    });
  });
});
