import { describe, expect, it } from "vitest";
import { createRepoListProtectedBranchesHandler } from "../../../../src/products/repo/tools/list-protected-branches.js";

describe("createRepoListProtectedBranchesHandler", () => {
  it("maps protected branches into MCP output", async () => {
    const handler = createRepoListProtectedBranchesHandler({
      listProtectedBranches: async () => ({
        branches: [
          {
            id: 2112012342,
            name: "main",
            actions: [
              {
                action: "push",
                enable: true,
                users: [{ id: 9124, name: "test_user", nick_name: "user" }],
                roles: [{ id: 23836589, name: "Committer" }]
              }
            ]
          }
        ],
        total: 1
      })
    });

    const result = await handler({ repository_id: "1001", page: 1, page_size: 20 });

    expect(result.structuredContent.items?.[0]).toEqual({
      id: "2112012342",
      name: "main",
      actionCount: 1,
      actions: [
        {
          action: "push",
          enable: true,
          userCount: 1,
          roleCount: 1
        }
      ]
    });
  });
});
