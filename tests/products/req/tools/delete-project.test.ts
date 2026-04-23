import { describe, expect, it, vi } from "vitest";
import { reqDeleteProjectInput as reqDeleteProjectInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqDeleteProjectInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqDeleteProjectHandler,
  mapDeletedProject,
  previewDeleteProject
} from "../../../../src/products/req/tools/delete-project.js";

describe("previewDeleteProject", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewDeleteProject({
      project_id: "project-1",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "project-1",
      deleted: false,
      executed: false
    });
  });
});

describe("mapDeletedProject", () => {
  it("returns normalized deleted project data", () => {
    const result = mapDeletedProject({
      project_id: "project-1"
    });

    expect(result.item).toEqual({
      id: "project-1",
      deleted: true,
      executed: true
    });
  });
});

describe("reqDeleteProjectInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqDeleteProjectInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqDeleteProjectInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqDeleteProjectHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      deleteProject: vi.fn()
    };
    const handler = createReqDeleteProjectHandler(client);

    const result = await handler({
      project_id: "project-1",
      dry_run: true
    });

    expect(client.deleteProject).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: delete project project-1" }],
      structuredContent: {
        summary: "Dry run: delete project project-1",
        item: {
          id: "project-1",
          deleted: false,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed deletes", async () => {
    const client = {
      deleteProject: vi.fn(async () => ({
        project_id: "project-1",
        deleted: true
      }))
    };
    const handler = createReqDeleteProjectHandler(client);

    const result = await handler({
      project_id: "project-1",
      dry_run: false
    });

    expect(client.deleteProject).toHaveBeenCalledWith({
      project_id: "project-1",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Deleted project project-1" }],
      structuredContent: {
        summary: "Deleted project project-1",
        item: {
          id: "project-1",
          deleted: true,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
