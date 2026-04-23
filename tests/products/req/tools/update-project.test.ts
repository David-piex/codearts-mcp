import { describe, expect, it, vi } from "vitest";
import { reqUpdateProjectInput as reqUpdateProjectInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateProjectInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqUpdateProjectHandler,
  mapUpdatedProject,
  previewUpdateProject
} from "../../../../src/products/req/tools/update-project.js";

describe("previewUpdateProject", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdateProject({
      project_id: "project-1",
      name: "Alpha 2",
      description: "Updated project",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "project-1",
      name: "Alpha 2",
      description: "Updated project",
      executed: false
    });
  });
});

describe("mapUpdatedProject", () => {
  it("returns normalized updated project data", () => {
    const result = mapUpdatedProject({
      project_id: "project-1",
      project_name: "Alpha 2",
      description: "Updated project"
    });

    expect(result.item).toEqual({
      id: "project-1",
      name: "Alpha 2",
      description: "Updated project",
      executed: true
    });
  });
});

describe("reqUpdateProjectInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      project_id: "project-1",
      name: "Alpha 2",
      description: "Updated project"
    };

    expect(reqUpdateProjectInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateProjectInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUpdateProjectHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateProject: vi.fn()
    };
    const handler = createReqUpdateProjectHandler(client);

    const result = await handler({
      project_id: "project-1",
      name: "Alpha 2",
      description: "Updated project",
      dry_run: true
    });

    expect(client.updateProject).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: update project project-1" }],
      structuredContent: {
        summary: "Dry run: update project project-1",
        item: {
          id: "project-1",
          name: "Alpha 2",
          description: "Updated project",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed updates", async () => {
    const client = {
      updateProject: vi.fn(async () => ({
        project_id: "project-1",
        project_name: "Alpha 2",
        description: "Updated project"
      }))
    };
    const handler = createReqUpdateProjectHandler(client);

    const result = await handler({
      project_id: "project-1",
      name: "Alpha 2",
      description: "Updated project",
      dry_run: false
    });

    expect(client.updateProject).toHaveBeenCalledWith({
      project_id: "project-1",
      name: "Alpha 2",
      description: "Updated project",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated project project-1" }],
      structuredContent: {
        summary: "Updated project project-1",
        item: {
          id: "project-1",
          name: "Alpha 2",
          description: "Updated project",
          executed: true
        },
        raw: undefined
      }
    });
  });
});
