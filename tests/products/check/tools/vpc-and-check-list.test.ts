import { describe, expect, it } from "vitest";
import { createCheckGetVpcepAuthorizationHandler } from "../../../../src/products/check/tools/get-vpcep-authorization.js";
import { createCheckListTaskCheckListHandler } from "../../../../src/products/check/tools/list-task-check-list.js";

describe("Check VPC and check-list tools", () => {
  it("returns VPC endpoint authorization as a raw item", async () => {
    const handler = createCheckGetVpcepAuthorizationHandler({
      getVpcepAuthorization: async () => ({
        task_id: "task-1",
        raw: {
          result: "Allow",
          config: false
        }
      })
    });

    const result = await handler({ task_id: "task-1" });

    expect(result.content[0]?.text).toContain("Loaded Check VPC endpoint authorization task-1");
    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      authorization: {
        result: "Allow",
        config: false
      }
    });
  });

  it("returns task check-list records with raw payload", async () => {
    const handler = createCheckListTaskCheckListHandler({
      listTaskCheckList: async () => ({
        checks: [
          {
            taskId: "child-task-1",
            branchName: "main"
          }
        ],
        total: 1,
        raw: {
          total: 1,
          list: [
            {
              taskId: "child-task-1",
              branchName: "main"
            }
          ]
        }
      })
    });

    const result = await handler({
      task_id: "task-1",
      check_type: "branch",
      page: 1,
      page_size: 10,
      search: "main"
    });

    expect(result.content[0]?.text).toContain("1 task checks found");
    expect(result.structuredContent.items?.[0]?.check).toEqual({
      taskId: "child-task-1",
      branchName: "main"
    });
    expect(result.structuredContent.taskId).toBe("task-1");
    expect(result.structuredContent.checkType).toBe("branch");
    expect(result.structuredContent.raw).toEqual({
      total: 1,
      list: [
        {
          taskId: "child-task-1",
          branchName: "main"
        }
      ]
    });
  });
});
