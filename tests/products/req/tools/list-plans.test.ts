import { describe, expect, it, vi } from "vitest";
import { reqListPlansInput as reqListPlansInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListPlansInput } from "../../../../src/products/req/schemas/plan.js";
import {
  createReqListPlansHandler,
  mapReqPlans
} from "../../../../src/products/req/tools/list-plans.js";

describe("mapReqPlans", () => {
  it("returns normalized plans with pagination", () => {
    const result = mapReqPlans(
      [
        {
          id: "plan-1",
          name: "2026 Q2",
          type: "release",
          project_id: "project-1",
          creator: "alice",
          updater: "bob",
          created_on: "2026-04-01T00:00:00Z",
          updated_on: "2026-04-20T00:00:00Z"
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "plan-1",
        name: "2026 Q2",
        type: "release",
        projectId: "project-1",
        creator: "alice",
        updater: "bob",
        createdOn: "2026-04-01T00:00:00Z",
        updatedOn: "2026-04-20T00:00:00Z"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});

describe("reqListPlansInput exports", () => {
  it("keeps the barrel export compatible with the plan schema module", () => {
    const input = {
      project_id: "project-1",
      page: 1,
      page_size: 20
    };

    expect(reqListPlansInput.parse(input)).toEqual(input);
    expect(reqListPlansInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListPlansHandler", () => {
  it("returns normalized plan list output", async () => {
    const client = {
      listPlans: vi.fn(async () => ({
        plans: [
          {
            id: "plan-1",
            name: "2026 Q2",
            type: "release",
            project_id: "project-1"
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListPlansHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(client.listPlans).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 plans found in this page");
    expect(result.content[0]?.text).toContain("name: 2026 Q2");
    expect(result.structuredContent.items).toEqual([
      {
        id: "plan-1",
        name: "2026 Q2",
        type: "release",
        projectId: "project-1",
        creator: undefined,
        updater: undefined,
        createdOn: undefined,
        updatedOn: undefined
      }
    ]);
  });
});
