import { describe, expect, it, vi } from "vitest";
import { reqGetIterationInput as reqGetIterationInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqGetIterationInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqGetIterationHandler,
  mapReqIteration
} from "../../../../src/products/req/tools/get-iteration.js";

describe("mapReqIteration", () => {
  it("returns normalized iteration detail data", () => {
    const result = mapReqIteration({
      iteration_id: 301,
      name: "Sprint 3",
      status: "1",
      begin_time: "2026-04-01",
      end_time: "2026-04-14",
      description: "Ship Task 4",
      progress: "68",
      total: 12,
      opened_total: 8,
      closed_total: 4,
      have_task: true,
      charts: {
        burndown: [1, 2, 3]
      },
      created_time: 1713200000,
      updated_time: 1713203600
    });

    expect(result.item).toEqual({
      id: "301",
      name: "Sprint 3",
      status: "1",
      beginTime: "2026-04-01",
      endTime: "2026-04-14",
      description: "Ship Task 4",
      progress: "68",
      total: 12,
      openedTotal: 8,
      closedTotal: 4,
      haveTask: true,
      charts: {
        burndown: [1, 2, 3]
      },
      createdTime: 1713200000,
      updatedTime: 1713203600
    });
  });
});

describe("reqGetIterationInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      iteration_id: "301"
    };

    expect(reqGetIterationInput.parse(input)).toEqual(input);
    expect(reqGetIterationInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqGetIterationHandler", () => {
  it("returns content and structured output for iteration details", async () => {
    const client = {
      getIteration: vi.fn(async () => ({
        iteration_id: 301,
        name: "Sprint 3",
        status: "1",
        begin_time: "2026-04-01",
        end_time: "2026-04-14",
        progress: "68"
      }))
    };
    const handler = createReqGetIterationHandler(client);

    const result = await handler({
      iteration_id: "301"
    });

    expect(client.getIteration).toHaveBeenCalledWith({
      iteration_id: "301"
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Loaded iteration 301" }],
      structuredContent: {
        summary: "Loaded iteration 301",
        item: {
          id: "301",
          name: "Sprint 3",
          status: "1",
          beginTime: "2026-04-01",
          endTime: "2026-04-14",
          description: undefined,
          progress: "68",
          total: undefined,
          openedTotal: undefined,
          closedTotal: undefined,
          haveTask: undefined,
          charts: undefined,
          createdTime: undefined,
          updatedTime: undefined
        },
        raw: undefined
      }
    });
  });
});
