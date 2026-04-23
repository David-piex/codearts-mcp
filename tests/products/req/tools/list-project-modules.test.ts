import { describe, expect, it, vi } from "vitest";
import { reqListProjectModulesInput as reqListProjectModulesInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListProjectModulesInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqListProjectModulesHandler,
  mapReqProjectModules
} from "../../../../src/products/req/tools/list-project-modules.js";

describe("mapReqProjectModules", () => {
  it("maps project modules into a normalized list result", () => {
    const result = mapReqProjectModules(
      [
        {
          module_id: 1,
          module_name: "Backend",
          deepth: 1,
          is_parent: true,
          owner: {
            user_id: "u-1",
            user_name: "owner",
            nick_name: "Owner"
          }
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "1",
        name: "Backend",
        depth: 1,
        isParent: true,
        owner: {
          userId: "u-1",
          userName: "owner",
          nickName: "Owner"
        }
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});

describe("reqListProjectModulesInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      project_id: "project-1",
      page: 1,
      page_size: 20
    };

    expect(reqListProjectModulesInput.parse(input)).toEqual(input);
    expect(reqListProjectModulesInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListProjectModulesHandler", () => {
  it("returns normalized module list content", async () => {
    const client = {
      listProjectModules: vi.fn(async () => ({
        modules: [
          {
            module_id: 1,
            module_name: "Backend"
          }
        ],
        total: 1
      }))
    };
    const handler = createReqListProjectModulesHandler(client);

    const result = await handler({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(client.listProjectModules).toHaveBeenCalledWith({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });
    expect(result.structuredContent.items).toEqual([
      {
        id: "1",
        name: "Backend",
        depth: undefined,
        isParent: undefined,
        owner: undefined
      }
    ]);
  });
});
