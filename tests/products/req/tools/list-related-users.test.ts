import { describe, expect, it, vi } from "vitest";
import { reqListRelatedUsersInput as reqListRelatedUsersInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListRelatedUsersInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListRelatedUsersHandler,
  mapReqRelatedUsers
} from "../../../../src/products/req/tools/list-related-users.js";

describe("mapReqRelatedUsers", () => {
  it("returns normalized related users grouped by relation type", () => {
    const result = mapReqRelatedUsers({
      project_id: "project-1",
      related_author_list: [
        {
          user_name: "alice",
          user_num_id: 101,
          user_id: "user-1",
          domain_id: "domain-1",
          domain_name: "tenant-a",
          nick_name_py: "alice"
        }
      ],
      related_assignee_list: [
        {
          user_name: "bob",
          user_num_id: 102,
          user_id: "user-2",
          domain_id: "domain-1",
          domain_name: "tenant-a",
          nick_name_py: "bob"
        }
      ],
      related_developer_list: []
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      authorCount: 1,
      assigneeCount: 1,
      developerCount: 0,
      totalCount: 2,
      authors: [
        {
          userName: "alice",
          userNumId: 101,
          userId: "user-1",
          domainId: "domain-1",
          domainName: "tenant-a",
          nickNamePy: "alice"
        }
      ],
      assignees: [
        {
          userName: "bob",
          userNumId: 102,
          userId: "user-2",
          domainId: "domain-1",
          domainName: "tenant-a",
          nickNamePy: "bob"
        }
      ],
      developers: []
    });
  });
});

describe("reqListRelatedUsersInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqListRelatedUsersInput.parse(input)).toEqual(input);
    expect(reqListRelatedUsersInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListRelatedUsersHandler", () => {
  it("returns content and structured output for grouped related users", async () => {
    const client = {
      listRelatedUsers: vi.fn(async () => ({
        project_id: "project-1",
        related_author_list: [
          {
            user_name: "alice",
            user_num_id: 101,
            user_id: "user-1",
            domain_id: "domain-1",
            domain_name: "tenant-a",
            nick_name_py: "alice"
          }
        ],
        related_assignee_list: [],
        related_developer_list: [
          {
            user_name: "bob",
            user_num_id: 102,
            user_id: "user-2",
            domain_id: "domain-1",
            domain_name: "tenant-a",
            nick_name_py: "bob"
          }
        ]
      }))
    };
    const handler = createReqListRelatedUsersHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.listRelatedUsers).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("Loaded 2 related users");
    expect(result.structuredContent).toEqual({
      summary: "Loaded 2 related users",
      item: {
        projectId: "project-1",
        authorCount: 1,
        assigneeCount: 0,
        developerCount: 1,
        totalCount: 2,
        authors: [
          {
            userName: "alice",
            userNumId: 101,
            userId: "user-1",
            domainId: "domain-1",
            domainName: "tenant-a",
            nickNamePy: "alice"
          }
        ],
        assignees: [],
        developers: [
          {
            userName: "bob",
            userNumId: 102,
            userId: "user-2",
            domainId: "domain-1",
            domainName: "tenant-a",
            nickNamePy: "bob"
          }
        ]
      },
      raw: undefined
    });
  });
});
