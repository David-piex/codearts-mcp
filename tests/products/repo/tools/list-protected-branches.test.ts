import { describe, expect, it } from "vitest";
import { mapProtectedBranches } from "../../../../src/products/repo/tools/list-protected-branches.js";

describe("mapProtectedBranches", () => {
  it("returns normalized protected branches with action counts", () => {
    const result = mapProtectedBranches(
      [
        {
          id: 1,
          name: "main",
          actions: [
            {
              action: "push",
              enable: true,
              users: [{ id: 1 }, { id: 2 }],
              roles: [{ id: 1 }]
            }
          ]
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "1",
        name: "main",
        actionCount: 1,
        actions: [
          {
            action: "push",
            enable: true,
            userCount: 2,
            roleCount: 1
          }
        ]
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
