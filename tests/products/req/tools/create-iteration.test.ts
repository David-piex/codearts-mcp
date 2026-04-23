import { describe, expect, it, vi } from "vitest";
import { reqCreateIterationInput as reqCreateIterationInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCreateIterationInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqCreateIterationHandler,
  mapCreatedIteration,
  previewCreateIteration
} from "../../../../src/products/req/tools/create-iteration.js";

describe("previewCreateIteration", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewCreateIteration({
      project_id: "project-1",
      name: "Sprint 4",
      begin_time: "2026-04-15",
      end_time: "2026-04-28",
      description: "Close backlog",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      name: "Sprint 4",
      beginTime: "2026-04-15",
      endTime: "2026-04-28",
      description: "Close backlog",
      executed: false
    });
  });
});

describe("mapCreatedIteration", () => {
  it("returns normalized created iteration data", () => {
    const result = mapCreatedIteration({
      id: 302,
      project_id: "project-1",
      name: "Sprint 4",
      begin_time: "2026-04-15",
      end_time: "2026-04-28",
      description: "Close backlog"
    });

    expect(result.item).toEqual({
      id: "302",
      projectId: "project-1",
      name: "Sprint 4",
      beginTime: "2026-04-15",
      endTime: "2026-04-28",
      description: "Close backlog",
      executed: true
    });
  });
});

describe("reqCreateIterationInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      name: "Sprint 4",
      begin_time: "2026-04-15",
      end_time: "2026-04-28"
    };

    expect(reqCreateIterationInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqCreateIterationInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqCreateIterationHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      createIteration: vi.fn()
    };
    const handler = createReqCreateIterationHandler(client);

    const result = await handler({
      project_id: "project-1",
      name: "Sprint 4",
      begin_time: "2026-04-15",
      end_time: "2026-04-28",
      description: "Close backlog",
      dry_run: true
    });

    expect(client.createIteration).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: create iteration Sprint 4" }],
      structuredContent: {
        summary: "Dry run: create iteration Sprint 4",
        item: {
          projectId: "project-1",
          name: "Sprint 4",
          beginTime: "2026-04-15",
          endTime: "2026-04-28",
          description: "Close backlog",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed creates", async () => {
    const client = {
      createIteration: vi.fn(async () => ({
        id: 302,
        project_id: "project-1",
        name: "Sprint 4",
        begin_time: "2026-04-15",
        end_time: "2026-04-28",
        description: "Close backlog"
      }))
    };
    const handler = createReqCreateIterationHandler(client);

    const result = await handler({
      project_id: "project-1",
      name: "Sprint 4",
      begin_time: "2026-04-15",
      end_time: "2026-04-28",
      description: "Close backlog",
      dry_run: false
    });

    expect(client.createIteration).toHaveBeenCalledWith({
      project_id: "project-1",
      name: "Sprint 4",
      begin_time: "2026-04-15",
      end_time: "2026-04-28",
      description: "Close backlog",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Created iteration Sprint 4" }],
      structuredContent: {
        summary: "Created iteration Sprint 4",
        item: {
          id: "302",
          projectId: "project-1",
          name: "Sprint 4",
          beginTime: "2026-04-15",
          endTime: "2026-04-28",
          description: "Close backlog",
          executed: true
        },
        raw: undefined
      }
    });
  });
});
