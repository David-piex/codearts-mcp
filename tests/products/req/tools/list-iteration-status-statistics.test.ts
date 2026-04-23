import { describe, expect, it, vi } from "vitest";
import { reqListIterationStatusStatisticsInput as reqListIterationStatusStatisticsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListIterationStatusStatisticsInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqListIterationStatusStatisticsHandler,
  mapReqIterationStatusStatistics
} from "../../../../src/products/req/tools/list-iteration-status-statistics.js";

describe("mapReqIterationStatusStatistics", () => {
  it("returns normalized iteration status statistics", () => {
    const result = mapReqIterationStatusStatistics([
      {
        user: {
          id: 12,
          user_id: "user-1",
          user_num_id: 11,
          name: "tenant_user-1",
          nick_name: "Alice",
          first_name: "alice"
        },
        item_count: 2,
        data: {
          "5874579": 1,
          "5874580": 1
        }
      }
    ]);

    expect(result.items).toEqual([
      {
        user: {
          id: 12,
          name: "tenant_user-1",
          nickName: "Alice",
          userId: "user-1",
          userNumId: 11,
          firstName: "alice"
        },
        itemCount: 2,
        data: {
          "5874579": 1,
          "5874580": 1
        }
      }
    ]);
    expect(result.page_info).toBeUndefined();
  });
});

describe("reqListIterationStatusStatisticsInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      iteration_id: "iteration-1",
      tracker_id: 7,
      status_id: 1
    };

    expect(reqListIterationStatusStatisticsInput.parse(input)).toEqual(input);
    expect(reqListIterationStatusStatisticsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListIterationStatusStatisticsHandler", () => {
  it("returns normalized content and structured output", async () => {
    const client = {
      listIterationStatusStatistics: vi.fn(async () => ({
        statistics: [
          {
            user: {
              id: 12,
              user_id: "user-1",
              user_num_id: 11,
              name: "tenant_user-1",
              nick_name: "Alice",
              first_name: "alice"
            },
            item_count: 2,
            data: {
              "5874579": 1,
              "5874580": 1
            }
          }
        ]
      }))
    };
    const handler = createReqListIterationStatusStatisticsHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "iteration-1",
      tracker_id: 7,
      status_id: 1
    });

    expect(client.listIterationStatusStatistics).toHaveBeenCalledWith({
      project_id: "project-1",
      iteration_id: "iteration-1",
      tracker_id: 7,
      status_id: 1
    });
    expect(result).toEqual({
      content: [
        {
          type: "text",
          text: ["1 iteration status statistics found", "", "- user: Alice | itemCount: 2"].join("\n")
        }
      ],
      structuredContent: {
        summary: "1 iteration status statistics found",
        items: [
          {
            user: {
              id: 12,
              name: "tenant_user-1",
              nickName: "Alice",
              userId: "user-1",
              userNumId: 11,
              firstName: "alice"
            },
            itemCount: 2,
            data: {
              "5874579": 1,
              "5874580": 1
            }
          }
        ],
        page_info: undefined,
        raw: undefined
      }
    });
  });
});
