import { describe, expect, it, vi } from "vitest";
import { reqGetProjectSummaryInput as reqGetProjectSummaryInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqGetProjectSummaryInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqGetProjectSummaryHandler,
  mapReqProjectSummary
} from "../../../../src/products/req/tools/get-project-summary.js";

describe("mapReqProjectSummary", () => {
  it("returns normalized project summary data", () => {
    const result = mapReqProjectSummary({
      project_id: "project-1",
      bug_statistics: [
        {
          module: "计费",
          total: 2,
          critical_num: 0,
          serious_num: 1,
          normal_num: 1,
          tip_num: 0,
          defect_index: 1.5
        }
      ],
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
      ],
      issue_completion_rates: [
        {
          tracker_id: 7,
          issue_status: {
            new_num: 1,
            process_num: 2,
            solved_num: 1,
            test_num: 0,
            closed_num: 3,
            rejected_num: 0
          }
        }
      ]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      bugStatistics: [
        {
          module: "计费",
          total: 2,
          criticalNum: 0,
          seriousNum: 1,
          normalNum: 1,
          tipNum: 0,
          defectIndex: 1.5
        }
      ],
      demandStatistics: [
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
      ],
      issueCompletionRates: [
        {
          trackerId: 7,
          issueStatus: {
            newNum: 1,
            processNum: 2,
            solvedNum: 1,
            testNum: 0,
            closedNum: 3,
            rejectedNum: 0
          }
        }
      ]
    });
  });
});

describe("reqGetProjectSummaryInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqGetProjectSummaryInput.parse(input)).toEqual(input);
    expect(reqGetProjectSummaryInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqGetProjectSummaryHandler", () => {
  it("returns normalized project summary output", async () => {
    const client = {
      getProjectSummary: vi.fn(async () => ({
        project_id: "project-1",
        bug_statistics: [],
        demand_statistics: [],
        issue_completion_rates: []
      }))
    };
    const handler = createReqGetProjectSummaryHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.getProjectSummary).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("Loaded project summary for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      bugStatistics: [],
      demandStatistics: [],
      issueCompletionRates: []
    });
  });
});
