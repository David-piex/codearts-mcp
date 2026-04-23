import { describe, expect, it, vi } from "vitest";
import {
  createReqUpdateProjectModuleHandler,
  previewUpdateProjectModule
} from "../../../../src/products/req/tools/update-project-module.js";

describe("previewUpdateProjectModule", () => {
  it("returns a dry-run preview without execution", () => {
    const result = previewUpdateProjectModule({
      project_id: "project-1",
      module_id: "7",
      module_name: "Backend API",
      owner_user_id: "user-1",
      description: "Updated",
      dry_run: true
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      moduleId: "7",
      name: "Backend API",
      ownerUserId: "user-1",
      description: "Updated",
      executed: false
    });
  });
});

describe("createReqUpdateProjectModuleHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateProjectModule: vi.fn()
    };
    const handler = createReqUpdateProjectModuleHandler(client);

    const result = await handler({
      project_id: "project-1",
      module_id: "7",
      module_name: "Backend API",
      owner_user_id: "user-1",
      dry_run: true
    });

    expect(client.updateProjectModule).not.toHaveBeenCalled();
    expect(result.structuredContent.item?.executed).toBe(false);
  });

  it("executes updates when dry_run is false", async () => {
    const client = {
      updateProjectModule: vi.fn(async () => ({
        module_id: 7,
        module_name: "Backend API"
      }))
    };
    const handler = createReqUpdateProjectModuleHandler(client);

    const result = await handler({
      project_id: "project-1",
      module_id: "7",
      module_name: "Backend API",
      owner_user_id: "user-1",
      dry_run: false
    });

    expect(client.updateProjectModule).toHaveBeenCalledWith({
      project_id: "project-1",
      module_id: "7",
      module_name: "Backend API",
      owner_user_id: "user-1",
      dry_run: false
    });
    expect(result.structuredContent.item?.executed).toBe(true);
  });
});
