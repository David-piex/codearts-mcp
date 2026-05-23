import { describe, expect, it, vi } from "vitest";
import {
  createReqFindIterationsHandler,
  mapReqFoundIterations
} from "../../../../src/products/req/tools/find-iterations.js";

describe("mapReqFoundIterations", () => {
  it("returns normalized iteration records", () => {
    const result = mapReqFoundIterations(
      [
        {
          id: 1001,
          name: "Sprint 1",
          status: "open",
          begin_time: "2026-05-01",
          end_time: "2026-05-15",
          updated_time: 1_779_268_000_000
        }
      ],
      1
    );

    expect(result.items).toEqual([
      {
        id: "1001",
        name: "Sprint 1",
        status: "open",
        beginTime: "2026-05-01",
        endTime: "2026-05-15",
        description: undefined,
        updatedTime: 1_779_268_000_000,
        deleted: undefined
      }
    ]);
    expect(result.raw).toEqual({ total: 1 });
  });
});

describe("createReqFindIterationsHandler", () => {
  it("calls the client and returns visible text", async () => {
    const client = {
      findIterations: vi.fn(async () => ({
        iterations: [
          {
            id: "1001",
            name: "Sprint 1",
            status: "open"
          }
        ],
        total: 1
      }))
    };
    const handler = createReqFindIterationsHandler(client);

    const result = await handler({
      project_id: "project-1",
      updated_time_interval: "2026-05-01,2026-05-23"
    });

    expect(client.findIterations).toHaveBeenCalledWith({
      project_id: "project-1",
      updated_time_interval: "2026-05-01,2026-05-23"
    });
    expect(result.content[0]?.text).toContain("1 iterations found");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "1001",
      name: "Sprint 1"
    });
  });
});
