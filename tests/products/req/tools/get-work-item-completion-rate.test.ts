import { describe, expect, it, vi } from "vitest";
import { reqGetWorkItemCompletionRateInput as reqGetWorkItemCompletionRateInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqGetWorkItemCompletionRateInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqGetWorkItemCompletionRateHandler,
  mapReqWorkItemCompletionRate
} from "../../../../src/products/req/tools/get-work-item-completion-rate.js";

describe("mapReqWorkItemCompletionRate", () => {
  it("returns normalized work item completion rate data", () => {
    const result = mapReqWorkItemCompletionRate({
      project_id: "project-1",
      total: 1,
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
      total: 1,
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

describe("reqGetWorkItemCompletionRateInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqGetWorkItemCompletionRateInput.parse(input)).toEqual(input);
    expect(reqGetWorkItemCompletionRateInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqGetWorkItemCompletionRateHandler", () => {
  it("returns normalized work item completion rate output", async () => {
    const client = {
      getWorkItemCompletionRate: vi.fn(async () => ({
        project_id: "project-1",
        total: 1,
        issue_completion_rates: []
      }))
    };
    const handler = createReqGetWorkItemCompletionRateHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.getWorkItemCompletionRate).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("Loaded work item completion rates for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      total: 1,
      issueCompletionRates: []
    });
  });
});
