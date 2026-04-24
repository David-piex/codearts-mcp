import { describe, expect, it, vi } from "vitest";
import { reqListProjectDemandStatisticsInput as reqListProjectDemandStatisticsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListProjectDemandStatisticsInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqListProjectDemandStatisticsHandler,
  mapReqProjectDemandStatistics
} from "../../../../src/products/req/tools/list-project-demand-statistics.js";

describe("mapReqProjectDemandStatistics", () => {
  it("returns normalized project demand statistics", () => {
    const result = mapReqProjectDemandStatistics([
      {
        module: "计费",
        total: 6,
        new_num: 1,
        process_num: 2,
        solved_num: 1,
        test_num: 1,
        closed_num: 1,
        rejected_num: 0
      }
    ]);

    expect(result.items).toEqual([
      {
        module: "计费",
        total: 6,
        newNum: 1,
        processNum: 2,
        solvedNum: 1,
        testNum: 1,
        closedNum: 1,
        rejectedNum: 0
      }
    ]);
  });
});

describe("reqListProjectDemandStatisticsInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqListProjectDemandStatisticsInput.parse(input)).toEqual(input);
    expect(reqListProjectDemandStatisticsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListProjectDemandStatisticsHandler", () => {
  it("returns normalized project demand statistics output", async () => {
    const client = {
      listProjectDemandStatistics: vi.fn(async () => ({
        project_id: "project-1",
        demand_statistics: [
          {
            module: "计费",
            total: 6,
            new_num: 1,
            process_num: 2,
            solved_num: 1,
            test_num: 1,
            closed_num: 1,
            rejected_num: 0
          }
        ]
      }))
    };
    const handler = createReqListProjectDemandStatisticsHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.listProjectDemandStatistics).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("1 project demand statistics found");
    expect(result.structuredContent.items).toEqual([
      {
        module: "计费",
        total: 6,
        newNum: 1,
        processNum: 2,
        solvedNum: 1,
        testNum: 1,
        closedNum: 1,
        rejectedNum: 0
      }
    ]);
  });
});
