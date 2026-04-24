import { describe, expect, it, vi } from "vitest";
import { reqListAssociatedWikisInput as reqListAssociatedWikisInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListAssociatedWikisInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListAssociatedWikisHandler,
  mapReqAssociatedWikis
} from "../../../../src/products/req/tools/list-associated-wikis.js";

describe("mapReqAssociatedWikis", () => {
  it("returns normalized associated wikis with pagination", () => {
    const result = mapReqAssociatedWikis(
      [
        {
          issue_id: 70779173,
          wiki_title: "Design Notes",
          wiki_author: {
            user_num_id: 4091,
            user_id: "user-1",
            user_name: "alice",
            nick_name: "Alice"
          },
          project: {
            project_name: "Payments",
            project_id: "project-1"
          },
          created_date: "2021-11-18 19:47:34",
          wiki_id: "1839097",
          region: "region01"
        }
      ],
      2,
      20,
      21
    );

    expect(result.items).toEqual([
      {
        issueId: "70779173",
        wikiId: "1839097",
        wikiTitle: "Design Notes",
        createdDate: "2021-11-18 19:47:34",
        region: "region01",
        projectId: "project-1",
        projectName: "Payments",
        wikiAuthor: {
          userId: "user-1",
          userNumId: 4091,
          userName: "alice",
          nickName: "Alice"
        }
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 20,
      total: 21
    });
  });
});

describe("reqListAssociatedWikisInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "70779173",
      page: 1,
      page_size: 20
    };

    expect(reqListAssociatedWikisInput.parse(input)).toEqual(input);
    expect(reqListAssociatedWikisInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListAssociatedWikisHandler", () => {
  it("returns content and structured output for normalized associated wikis", async () => {
    const client = {
      listAssociatedWikis: vi.fn(async () => ({
        total: 1,
        wikis: [
          {
            issue_id: 70779173,
            wiki_title: "Design Notes",
            wiki_author: {
              user_num_id: 4091,
              user_id: "user-1",
              user_name: "alice",
              nick_name: "Alice"
            },
            project: {
              project_name: "Payments",
              project_id: "project-1"
            },
            created_date: "2021-11-18 19:47:34",
            wiki_id: "1839097",
            region: "region01"
          }
        ]
      }))
    };
    const handler = createReqListAssociatedWikisHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "70779173",
      page: 1,
      page_size: 20
    });

    expect(client.listAssociatedWikis).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "70779173",
      page: 1,
      page_size: 20
    });
    expect(result.content[0]?.text).toContain("1 associated wikis found");
    expect(result.structuredContent).toEqual({
      summary: "1 associated wikis found",
      items: [
        {
          issueId: "70779173",
          wikiId: "1839097",
          wikiTitle: "Design Notes",
          createdDate: "2021-11-18 19:47:34",
          region: "region01",
          projectId: "project-1",
          projectName: "Payments",
          wikiAuthor: {
            userId: "user-1",
            userNumId: 4091,
            userName: "alice",
            nickName: "Alice"
          }
        }
      ],
      page_info: {
        page: 1,
        pageSize: 20,
        total: 1
      },
      raw: undefined
    });
  });

  it("adds a project-scoped hint when the associated wiki list is empty", async () => {
    const handler = createReqListAssociatedWikisHandler({
      listAssociatedWikis: async () => ({
        total: 0,
        wikis: []
      })
    });

    const result = await handler({
      project_id: "project-empty",
      work_item_id: "wi-9",
      page: 1,
      page_size: 20
    });

    expect(result.content[0]?.text).toContain("0 associated wikis found");
    expect(result.content[0]?.text).toContain("If you expected associated wikis here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
