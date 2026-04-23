import { describe, expect, it, vi } from "vitest";
import { reqUpdateIterationStateInput as reqUpdateIterationStateInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateIterationStateInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqUpdateIterationStateHandler,
  mapUpdatedIterationState,
  previewUpdateIterationState
} from "../../../../src/products/req/tools/update-iteration-state.js";

describe("previewUpdateIterationState", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdateIterationState({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3",
      status: "2",
      start_date: "2026-04-01",
      due_date: "2026-04-14",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      iterationId: "301",
      name: "Sprint 3",
      status: "2",
      startDate: "2026-04-01",
      dueDate: "2026-04-14",
      executed: false
    });
  });
});

describe("mapUpdatedIterationState", () => {
  it("returns normalized state update data", () => {
    const result = mapUpdatedIterationState({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3",
      status: "2",
      start_date: "2026-04-01",
      due_date: "2026-04-14",
      result: "",
      update_status: "success"
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      iterationId: "301",
      name: "Sprint 3",
      status: "2",
      startDate: "2026-04-01",
      dueDate: "2026-04-14",
      result: "",
      updateStatus: "success",
      executed: true
    });
  });
});

describe("reqUpdateIterationStateInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3",
      status: "2"
    };

    expect(reqUpdateIterationStateInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateIterationStateInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUpdateIterationStateHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateIterationState: vi.fn()
    };
    const handler = createReqUpdateIterationStateHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3",
      status: "2",
      start_date: "2026-04-01",
      due_date: "2026-04-14",
      dry_run: true
    });

    expect(client.updateIterationState).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: update iteration state 301" }],
      structuredContent: {
        summary: "Dry run: update iteration state 301",
        item: {
          projectId: "project-1",
          iterationId: "301",
          name: "Sprint 3",
          status: "2",
          startDate: "2026-04-01",
          dueDate: "2026-04-14",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed state updates", async () => {
    const client = {
      updateIterationState: vi.fn(async () => ({
        project_id: "project-1",
        iteration_id: "301",
        name: "Sprint 3",
        status: "2",
        start_date: "2026-04-01",
        due_date: "2026-04-14",
        result: "",
        update_status: "success"
      }))
    };
    const handler = createReqUpdateIterationStateHandler(client);

    const result = await handler({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3",
      status: "2",
      start_date: "2026-04-01",
      due_date: "2026-04-14",
      dry_run: false
    });

    expect(client.updateIterationState).toHaveBeenCalledWith({
      project_id: "project-1",
      iteration_id: "301",
      name: "Sprint 3",
      status: "2",
      start_date: "2026-04-01",
      due_date: "2026-04-14",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated iteration state 301" }],
      structuredContent: {
        summary: "Updated iteration state 301",
        item: {
          projectId: "project-1",
          iterationId: "301",
          name: "Sprint 3",
          status: "2",
          startDate: "2026-04-01",
          dueDate: "2026-04-14",
          result: "",
          updateStatus: "success",
          executed: true
        },
        raw: undefined
      }
    });
  });
});
