import { describe, expect, it, vi } from "vitest";
import { reqDeleteIterationInput as reqDeleteIterationInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqDeleteIterationInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqDeleteIterationHandler,
  mapDeletedIteration,
  previewDeleteIteration
} from "../../../../src/products/req/tools/delete-iteration.js";

describe("previewDeleteIteration", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewDeleteIteration({
      project_id: "project-1",
      iteration_id: "301",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "301",
      projectId: "project-1",
      deleted: false,
      executed: false
    });
  });
});

describe("mapDeletedIteration", () => {
  it("returns normalized deleted iteration data", () => {
    const result = mapDeletedIteration({
      project_id: "project-1",
      iteration_id: "301"
    });

    expect(result.item).toEqual({
      id: "301",
      projectId: "project-1",
      deleted: true,
      executed: true
    });
  });
});

describe("reqDeleteIterationInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      iteration_id: "301"
    };

    expect(reqDeleteIterationInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqDeleteIterationInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqDeleteIterationHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      deleteIteration: vi.fn()
    };
    const handler = createReqDeleteIterationHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "301",
      dry_run: true
    });

    expect(client.deleteIteration).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: delete iteration 301" }],
      structuredContent: {
        summary: "Dry run: delete iteration 301",
        item: {
          id: "301",
          projectId: "project-1",
          deleted: false,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed deletes", async () => {
    const client = {
      deleteIteration: vi.fn(async () => ({
        project_id: "project-1",
        iteration_id: "301",
        deleted: true as const
      }))
    };
    const handler = createReqDeleteIterationHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "301",
      dry_run: false
    });

    expect(client.deleteIteration).toHaveBeenCalledWith({
      project_id: "project-1",
      iteration_id: "301",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Deleted iteration 301" }],
      structuredContent: {
        summary: "Deleted iteration 301",
        item: {
          id: "301",
          projectId: "project-1",
          deleted: true,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
