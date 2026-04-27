import { describe, expect, it, vi } from "vitest";
import {
  reqGetReleasePlanInput as reqGetReleasePlanInputFromBarrel,
  reqListReleasePlansInput as reqListReleasePlansInputFromBarrel
} from "../../../../src/products/req/schemas.js";
import {
  reqGetReleasePlanInput,
  reqListReleasePlansInput
} from "../../../../src/products/req/schemas/plan.js";
import {
  createReqGetReleasePlanHandler,
  mapReleasePlan
} from "../../../../src/products/req/tools/get-release-plan.js";
import {
  createReqListReleasePlansHandler,
  mapReleasePlans
} from "../../../../src/products/req/tools/list-release-plans.js";

describe("release plan read input exports", () => {
  it("keeps the barrel exports compatible with the plan schema module", () => {
    const listInput = {
      project_id: "project-1",
      page: 1,
      page_size: 10,
      key_word: "R1",
      updated_time_interval: "1706845235000,1706845835000"
    };
    const getInput = {
      project_id: "project-1",
      plan_id: "plan-1"
    };

    expect(reqListReleasePlansInput.parse(listInput)).toEqual(listInput);
    expect(reqListReleasePlansInputFromBarrel.parse(listInput)).toEqual(listInput);
    expect(reqGetReleasePlanInput.parse(getInput)).toEqual(getInput);
    expect(reqGetReleasePlanInputFromBarrel.parse(getInput)).toEqual(getInput);
  });
});

describe("release plan read mappers", () => {
  it("maps release plan list and detail responses", () => {
    const plan = {
      id: "plan-1",
      title: "R1",
      category: "PI",
      status: "planned",
      children: [
        {
          id: "plan-child",
          title: "Iteration 1",
          category: "Iteration",
          status: "going"
        }
      ]
    };

    expect(mapReleasePlans([plan], 1, 10, 1).items).toEqual([
      {
        id: "plan-1",
        title: "R1",
        category: "PI",
        description: undefined,
        state: undefined,
        status: "planned",
        createdBy: undefined,
        modifiedBy: undefined,
        planStartDate: undefined,
        planEndDate: undefined,
        createdDate: undefined,
        parentId: undefined,
        baseline: undefined,
        workload: undefined,
        owner: undefined,
        children: [
          {
            id: "plan-child",
            title: "Iteration 1",
            category: "Iteration",
            description: undefined,
            state: undefined,
            status: "going",
            createdBy: undefined,
            modifiedBy: undefined,
            planStartDate: undefined,
            planEndDate: undefined,
            createdDate: undefined,
            parentId: undefined,
            baseline: undefined,
            workload: undefined,
            owner: undefined,
            children: undefined
          }
        ]
      }
    ]);

    expect(
      mapReleasePlan({
        project_id: "project-1",
        status: "success",
        plan
      }).item
    ).toMatchObject({
      projectId: "project-1",
      status: "success",
      plan: {
        id: "plan-1",
        title: "R1",
        category: "PI"
      }
    });
  });
});

describe("release plan read handlers", () => {
  it("lists and gets release plans", async () => {
    const listClient = {
      listReleasePlans: vi.fn(async () => ({
        plans: [
          {
            id: "plan-1",
            title: "R1",
            category: "PI",
            status: "planned"
          }
        ],
        total: 1,
        status: "success"
      }))
    };
    const getClient = {
      getReleasePlan: vi.fn(async () => ({
        project_id: "project-1",
        status: "success",
        plan: {
          id: "plan-1",
          title: "R1",
          category: "PI"
        }
      }))
    };

    const listResult = await createReqListReleasePlansHandler(listClient)({
      project_id: "project-1",
      page: 1,
      page_size: 10,
      key_word: "R1"
    });
    const getResult = await createReqGetReleasePlanHandler(getClient)({
      project_id: "project-1",
      plan_id: "plan-1"
    });

    expect(listClient.listReleasePlans).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 10,
      key_word: "R1"
    });
    expect(getClient.getReleasePlan).toHaveBeenCalledWith({
      project_id: "project-1",
      plan_id: "plan-1"
    });
    expect(listResult.structuredContent.items).toHaveLength(1);
    expect(getResult.structuredContent.item).toMatchObject({
      projectId: "project-1",
      plan: {
        id: "plan-1",
        title: "R1"
      }
    });
  });
});
