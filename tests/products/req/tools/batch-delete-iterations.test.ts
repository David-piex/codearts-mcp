import { describe, expect, it, vi } from "vitest";
import { reqBatchDeleteIterationsInput as reqBatchDeleteIterationsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqBatchDeleteIterationsInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqBatchDeleteIterationsHandler,
  mapBatchDeletedIterations,
  previewBatchDeleteIterations
} from "../../../../src/products/req/tools/batch-delete-iterations.js";

describe("previewBatchDeleteIterations", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewBatchDeleteIterations({
      project_id: "project-1",
      iteration_ids: ["301", "302"],
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      iterationIds: ["301", "302"],
      deletedCount: 0,
      executed: false
    });
  });
});

describe("mapBatchDeletedIterations", () => {
  it("returns normalized batch delete data", () => {
    const result = mapBatchDeletedIterations({
      project_id: "project-1",
      iteration_ids: ["301", "302"]
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      iterationIds: ["301", "302"],
      deletedCount: 2,
      executed: true
    });
  });
});

describe("reqBatchDeleteIterationsInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      iteration_ids: ["301", "302"]
    };

    expect(reqBatchDeleteIterationsInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqBatchDeleteIterationsInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqBatchDeleteIterationsHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      batchDeleteIterations: vi.fn()
    };
    const handler = createReqBatchDeleteIterationsHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_ids: ["301", "302"],
      dry_run: true
    });

    expect(client.batchDeleteIterations).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: batch delete 2 iterations" }],
      structuredContent: {
        summary: "Dry run: batch delete 2 iterations",
        item: {
          projectId: "project-1",
          iterationIds: ["301", "302"],
          deletedCount: 0,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed deletes", async () => {
    const client = {
      batchDeleteIterations: vi.fn(async () => ({
        project_id: "project-1",
        iteration_ids: ["301", "302"],
        deletedCount: 2
      }))
    };
    const handler = createReqBatchDeleteIterationsHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_ids: ["301", "302"],
      dry_run: false
    });

    expect(client.batchDeleteIterations).toHaveBeenCalledWith({
      project_id: "project-1",
      iteration_ids: ["301", "302"],
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Deleted 2 iterations" }],
      structuredContent: {
        summary: "Deleted 2 iterations",
        item: {
          projectId: "project-1",
          iterationIds: ["301", "302"],
          deletedCount: 2,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
