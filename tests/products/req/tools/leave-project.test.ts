import { describe, expect, it, vi } from "vitest";
import { reqLeaveProjectInput as reqLeaveProjectInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqLeaveProjectInput } from "../../../../src/products/req/schemas/member.js";
import {
  createReqLeaveProjectHandler,
  mapLeftProject,
  previewLeaveProject
} from "../../../../src/products/req/tools/leave-project.js";

describe("previewLeaveProject", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewLeaveProject({
      project_id: "project-1",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      left: false,
      executed: false
    });
  });
});

describe("mapLeftProject", () => {
  it("returns normalized leave-project data", () => {
    const result = mapLeftProject({
      project_id: "project-1"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      left: true,
      executed: true
    });
  });
});

describe("reqLeaveProjectInput exports", () => {
  it("keeps the barrel export compatible with the member schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqLeaveProjectInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqLeaveProjectInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqLeaveProjectHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      leaveProject: vi.fn()
    };
    const handler = createReqLeaveProjectHandler(client);

    const result = await handler({
      project_id: "project-1",
      dry_run: true
    });

    expect(client.leaveProject).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: leave project project-1" }],
      structuredContent: {
        summary: "Dry run: leave project project-1",
        item: {
          projectId: "project-1",
          left: false,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed leaves", async () => {
    const client = {
      leaveProject: vi.fn(async () => ({
        project_id: "project-1",
        left: true as const
      }))
    };
    const handler = createReqLeaveProjectHandler(client);

    const result = await handler({
      project_id: "project-1",
      dry_run: false
    });

    expect(client.leaveProject).toHaveBeenCalledWith({
      project_id: "project-1",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Left project project-1" }],
      structuredContent: {
        summary: "Left project project-1",
        item: {
          projectId: "project-1",
          left: true,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
