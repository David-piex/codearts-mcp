import { describe, expect, it } from "vitest";
import { createReqListProjectMembersHandler } from "../../../../src/products/req/tools/list-project-members.js";

describe("createReqListProjectMembersHandler", () => {
  it("maps provider members into MCP output", async () => {
    const handler = createReqListProjectMembersHandler({
      listProjectMembers: async () => ({
        members: [
          {
            user_id: "user-1",
            user_name: "yao",
            user_num_id: 1001,
            nick_name: "Yao",
            role_id: 4,
            role_name: "开发人员",
            user_type: "User",
            forbidden: 0,
            domain_id: "domain-1",
            domain_name: "tenant-a"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "p-1", page: 1, page_size: 20 });

    expect(result.structuredContent.items).toEqual([
      {
        id: "user-1",
        userName: "yao",
        userNumId: 1001,
        nickName: "Yao",
        roleId: 4,
        roleName: "开发人员",
        userType: "User",
        forbidden: 0,
        domainId: "domain-1",
        domainName: "tenant-a"
      }
    ]);
  });

  it("adds a project-scoped hint when the project member list is empty", async () => {
    const handler = createReqListProjectMembersHandler({
      listProjectMembers: async () => ({
        members: [],
        total: 0
      })
    });

    const result = await handler({ project_id: "project-empty", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("0 project members found");
    expect(result.content[0]?.text).toContain("If you expected project members here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
