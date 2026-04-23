import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemTrackerHandlersInput as reqListWorkItemTrackerHandlersInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemTrackerHandlersInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemTrackerHandlersHandler,
  mapReqWorkItemTrackerHandlers
} from "../../../../src/products/req/tools/list-work-item-tracker-handlers.js";

describe("mapReqWorkItemTrackerHandlers", () => {
  it("returns normalized work item tracker handlers", () => {
    const result = mapReqWorkItemTrackerHandlers([
      {
        handler_id: -1,
        handler_name: "处理人"
      }
    ]);

    expect(result.items).toEqual([
      {
        handlerId: -1,
        handlerName: "处理人"
      }
    ]);
  });
});

describe("reqListWorkItemTrackerHandlersInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 7
    };

    expect(reqListWorkItemTrackerHandlersInput.parse(input)).toEqual(input);
    expect(reqListWorkItemTrackerHandlersInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemTrackerHandlersHandler", () => {
  it("returns normalized work item tracker handlers", async () => {
    const client = {
      listWorkItemTrackerHandlers: vi.fn(async () => ({
        tracker_handlers: [
          {
            handler_id: -1,
            handler_name: "处理人"
          }
        ]
      }))
    };
    const handler = createReqListWorkItemTrackerHandlersHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 7
    });

    expect(client.listWorkItemTrackerHandlers).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7
    });
    expect(result.content[0]?.text).toContain("1 work item tracker handlers found");
    expect(result.structuredContent.items).toEqual([
      {
        handlerId: -1,
        handlerName: "处理人"
      }
    ]);
  });
});
