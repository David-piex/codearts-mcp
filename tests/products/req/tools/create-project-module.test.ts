import { describe, expect, it, vi } from "vitest";
import { reqCreateProjectModuleInput as reqCreateProjectModuleInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateProjectModuleInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqCreateProjectModuleHandler,
  mapCreatedProjectModule,
  previewCreateProjectModule
} from "../../../../src/products/req/tools/create-project-module.js";

describe("previewCreateProjectModule", () => {
  it("returns a dry-run preview without execution", () => {
    const result = previewCreateProjectModule({
      project_id: "project-1",
      module_name: "Backend",
      owner_user_id: "user-1",
      parent_module_id: 10,
      description: "API module",
      dry_run: true
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      name: "Backend",
      ownerUserId: "user-1",
      parentModuleId: 10,
      description: "API module",
      executed: false
    });
  });
});

describe("mapCreatedProjectModule", () => {
  it("maps created project module response", () => {
    const result = mapCreatedProjectModule({
      module_id: 7,
      module_name: "Backend",
      description: "API module",
      owner: {
        user_id: "user-1",
        user_name: "owner",
        nick_name: "Owner"
      }
    });

    expect(result.item).toEqual({
      id: "7",
      name: "Backend",
      description: "API module",
      owner: {
        userId: "user-1",
        userName: "owner",
        nickName: "Owner"
      },
      executed: true
    });
  });
});

describe("reqCreateProjectModuleInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      project_id: "project-1",
      module_name: "Backend",
      owner_user_id: "user-1"
    };

    expect(reqCreateProjectModuleInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateProjectModuleInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqCreateProjectModuleHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      createProjectModule: vi.fn()
    };
    const handler = createReqCreateProjectModuleHandler(client);

    const result = await handler({
      project_id: "project-1",
      module_name: "Backend",
      owner_user_id: "user-1",
      dry_run: true
    });

    expect(client.createProjectModule).not.toHaveBeenCalled();
    expect(result.structuredContent.item?.executed).toBe(false);
  });

  it("executes creates when dry_run is false", async () => {
    const client = {
      createProjectModule: vi.fn(async () => ({
        module_id: 7,
        module_name: "Backend"
      }))
    };
    const handler = createReqCreateProjectModuleHandler(client);

    const result = await handler({
      project_id: "project-1",
      module_name: "Backend",
      owner_user_id: "user-1",
      dry_run: false
    });

    expect(client.createProjectModule).toHaveBeenCalledWith({
      project_id: "project-1",
      module_name: "Backend",
      owner_user_id: "user-1",
      dry_run: false
    });
    expect(result.structuredContent.item).toEqual({
      id: "7",
      name: "Backend",
      description: undefined,
      owner: undefined,
      executed: true
    });
  });
});
