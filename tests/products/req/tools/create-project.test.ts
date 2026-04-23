import { describe, expect, it, vi } from "vitest";
import { reqCreateProjectInput as reqCreateProjectInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateProjectInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqCreateProjectHandler,
  mapCreatedProject,
  previewCreateProject
} from "../../../../src/products/req/tools/create-project.js";

describe("previewCreateProject", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewCreateProject({
      name: "Alpha",
      description: "Demo project",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      name: "Alpha",
      description: "Demo project",
      executed: false
    });
  });
});

describe("mapCreatedProject", () => {
  it("returns normalized created project data", () => {
    const result = mapCreatedProject({
      project_id: "project-1",
      project_name: "Alpha",
      description: "Demo project",
      project_num_id: 101,
      project_type: "scrum"
    });

    expect(result.item).toEqual({
      id: "project-1",
      name: "Alpha",
      description: "Demo project",
      numberId: 101,
      type: "scrum",
      executed: true
    });
  });
});

describe("reqCreateProjectInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      name: "Alpha",
      description: "Demo project"
    };

    expect(reqCreateProjectInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateProjectInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqCreateProjectHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      createProject: vi.fn()
    };
    const handler = createReqCreateProjectHandler(client);

    const result = await handler({
      name: "Alpha",
      description: "Demo project",
      dry_run: true
    });

    expect(client.createProject).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: create project Alpha" }],
      structuredContent: {
        summary: "Dry run: create project Alpha",
        item: {
          name: "Alpha",
          description: "Demo project",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed creates", async () => {
    const client = {
      createProject: vi.fn(async () => ({
        project_id: "project-1",
        project_name: "Alpha",
        description: "Demo project",
        project_num_id: 101,
        project_type: "scrum"
      }))
    };
    const handler = createReqCreateProjectHandler(client);

    const result = await handler({
      name: "Alpha",
      description: "Demo project",
      dry_run: false
    });

    expect(client.createProject).toHaveBeenCalledWith({
      name: "Alpha",
      description: "Demo project",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Created project Alpha" }],
      structuredContent: {
        summary: "Created project Alpha",
        item: {
          id: "project-1",
          name: "Alpha",
          description: "Demo project",
          numberId: 101,
          type: "scrum",
          executed: true
        },
        raw: undefined
      }
    });
  });
});
