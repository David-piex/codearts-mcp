import { describe, expect, it, vi } from "vitest";
import { reqUpdateIterationInput as reqUpdateIterationInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateIterationInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqUpdateIterationHandler,
  mapUpdatedIteration,
  previewUpdateIteration
} from "../../../../src/products/req/tools/update-iteration.js";

describe("previewUpdateIteration", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdateIteration({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3 Updated",
      begin_time: "2026-04-02",
      end_time: "2026-04-15",
      description: "Updated scope",
      status: "1",
      over_type: "custom",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "301",
      projectId: "project-1",
      name: "Sprint 3 Updated",
      beginTime: "2026-04-02",
      endTime: "2026-04-15",
      description: "Updated scope",
      status: "1",
      overType: "custom",
      executed: false
    });
  });
});

describe("mapUpdatedIteration", () => {
  it("returns normalized updated iteration data", () => {
    const result = mapUpdatedIteration({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3 Updated",
      begin_time: "2026-04-02",
      end_time: "2026-04-15",
      description: "Updated scope",
      status: "2",
      over_type: "auto"
    });

    expect(result.item).toEqual({
      id: "301",
      projectId: "project-1",
      name: "Sprint 3 Updated",
      beginTime: "2026-04-02",
      endTime: "2026-04-15",
      description: "Updated scope",
      status: "2",
      overType: "auto",
      executed: true
    });
  });
});

describe("reqUpdateIterationInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3 Updated",
      status: "1",
      over_type: "custom"
    };

    expect(reqUpdateIterationInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateIterationInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUpdateIterationHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateIteration: vi.fn()
    };
    const handler = createReqUpdateIterationHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3 Updated",
      description: "Updated scope",
      status: "1",
      over_type: "custom",
      dry_run: true
    });

    expect(client.updateIteration).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: update iteration 301" }],
      structuredContent: {
        summary: "Dry run: update iteration 301",
        item: {
          id: "301",
          projectId: "project-1",
          name: "Sprint 3 Updated",
          beginTime: undefined,
          endTime: undefined,
          description: "Updated scope",
          status: "1",
          overType: "custom",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed updates", async () => {
    const client = {
      updateIteration: vi.fn(async () => ({
        project_id: "project-1",
        iteration_id: "301",
        name: "Sprint 3 Updated",
        begin_time: "2026-04-02",
        end_time: "2026-04-15",
        description: "Updated scope",
        status: "2",
        over_type: "auto"
      }))
    };
    const handler = createReqUpdateIterationHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3 Updated",
      begin_time: "2026-04-02",
      end_time: "2026-04-15",
      description: "Updated scope",
      status: "2",
      over_type: "auto",
      dry_run: false
    });

    expect(client.updateIteration).toHaveBeenCalledWith({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3 Updated",
      begin_time: "2026-04-02",
      end_time: "2026-04-15",
      description: "Updated scope",
      status: "2",
      over_type: "auto",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated iteration 301" }],
      structuredContent: {
        summary: "Updated iteration 301",
        item: {
          id: "301",
          projectId: "project-1",
          name: "Sprint 3 Updated",
          beginTime: "2026-04-02",
          endTime: "2026-04-15",
          description: "Updated scope",
          status: "2",
          overType: "auto",
          executed: true
        },
        raw: undefined
      }
    });
  });
});
