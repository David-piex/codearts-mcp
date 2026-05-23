import { describe, expect, it } from "vitest";
import {
  createReqListDevucProjectMembersHandler,
  mapReqProjectMembers
} from "../../../../src/products/req/tools/list-project-members.js";

describe("mapReqProjectMembers", () => {
  it("returns normalized project members with pagination", () => {
    const result = mapReqProjectMembers(
      [
        {
          domain_id: "domain-1",
          domain_name: "main",
          user_id: "user-1",
          user_name: "alice",
          user_num_id: 101,
          role_id: 1,
          nick_name: "Alice",
          role_name: "Owner",
          user_type: "member",
          forbidden: 0
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "user-1",
        userName: "alice",
        userNumId: 101,
        nickName: "Alice",
        roleId: 1,
        roleName: "Owner",
        userType: "member",
        forbidden: 0,
        domainId: "domain-1",
        domainName: "main"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });

  it("returns normalized DevUC project member output", async () => {
    const handler = createReqListDevucProjectMembersHandler({
      listDevucProjectMembers: async () => ({
        members: [
          {
            user_id: "user-1",
            user_name: "alice",
            nick_name: "Alice",
            role_id: 3,
            role_name: "Member"
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1"
    });

    expect(result.structuredContent).toMatchObject({
      summary: "1 project members found",
      items: [
        {
          id: "user-1",
          userName: "alice",
          nickName: "Alice",
          roleId: 3,
          roleName: "Member"
        }
      ]
    });
    expect(result.content[0]?.text).toBe("1 project members found");
  });
});
