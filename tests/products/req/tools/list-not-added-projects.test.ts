import { describe, expect, it, vi } from "vitest";
import { reqListNotAddedProjectsInput as reqListNotAddedProjectsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListNotAddedProjectsInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqListNotAddedProjectsHandler,
  mapReqNotAddedProjects
} from "../../../../src/products/req/tools/list-not-added-projects.js";

describe("mapReqNotAddedProjects", () => {
  it("returns normalized not-added projects with pagination", () => {
    const result = mapReqNotAddedProjects(
      [
        {
          project_id: "project-1",
          project_name: "Alpha",
          project_num_id: 101,
          description: "Demo project",
          project_type: "scrum"
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "project-1",
        name: "Alpha",
        numberId: 101,
        description: "Demo project",
        type: "scrum"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});

describe("reqListNotAddedProjectsInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    expect(reqListNotAddedProjectsInput.parse({})).toEqual({
      page: 1,
      page_size: 20
    });
    expect(reqListNotAddedProjectsInputFromBarrel.parse({})).toEqual({
      page: 1,
      page_size: 20
    });
  });

  it("rejects page sizes above the Req API limit", () => {
    expect(() =>
      reqListNotAddedProjectsInput.parse({
        page: 1,
        page_size: 101
      })
    ).toThrow(/100/);
  });
});

describe("createReqListNotAddedProjectsHandler", () => {
  it("returns list text and structured output", async () => {
    const client = {
      listNotAddedProjects: vi.fn(async () => ({
        projects: [
          {
            project_id: "project-1",
            project_name: "Alpha",
            project_num_id: 101,
            description: "Demo project",
            project_type: "scrum"
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListNotAddedProjectsHandler(client);

    const result = await handler({
      page: 1,
      page_size: 20
    });

    expect(client.listNotAddedProjects).toHaveBeenCalledWith({
      page: 1,
      page_size: 20
    });
    expect(result).toEqual({
      content: [
        {
          type: "text",
          text: "1 not-added projects found\n\n- project_id: project-1 | name: Alpha | numberId: 101 | type: scrum\n\ntotal: 1"
        }
      ],
      structuredContent: {
        summary: "1 not-added projects found",
        items: [
          {
            id: "project-1",
            name: "Alpha",
            numberId: 101,
            description: "Demo project",
            type: "scrum"
          }
        ],
        page_info: {
          page: 1,
          pageSize: 20,
          total: 1
        },
        raw: undefined
      }
    });
  });
});
