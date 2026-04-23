import { describe, expect, it, vi } from "vitest";
import {
  createReqDeleteProjectModuleHandler,
  previewDeleteProjectModule
} from "../../../../src/products/req/tools/delete-project-module.js";

describe("previewDeleteProjectModule", () => {
  it("returns a dry-run preview without execution", () => {
    const result = previewDeleteProjectModule({
      project_id: "project-1",
      module_id: "7",
      dry_run: true
    });

    expect(result.item).toEqual({
      id: "7",
      projectId: "project-1",
      deleted: false,
      executed: false
    });
  });
});

describe("createReqDeleteProjectModuleHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      deleteProjectModule: vi.fn()
    };
    const handler = createReqDeleteProjectModuleHandler(client);

    const result = await handler({
      project_id: "project-1",
      module_id: "7",
      dry_run: true
    });

    expect(client.deleteProjectModule).not.toHaveBeenCalled();
    expect(result.structuredContent.item?.executed).toBe(false);
  });

  it("executes deletes when dry_run is false", async () => {
    const client = {
      deleteProjectModule: vi.fn(async () => ({
        project_id: "project-1",
        module_id: "7",
        deleted: true as const
      }))
    };
    const handler = createReqDeleteProjectModuleHandler(client);

    const result = await handler({
      project_id: "project-1",
      module_id: "7",
      dry_run: false
    });

    expect(client.deleteProjectModule).toHaveBeenCalledWith({
      project_id: "project-1",
      module_id: "7",
      dry_run: false
    });
    expect(result.structuredContent.item).toEqual({
      id: "7",
      projectId: "project-1",
      deleted: true,
      executed: true
    });
  });
});
