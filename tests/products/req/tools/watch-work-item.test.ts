import { describe, expect, it, vi } from "vitest";
import { reqWatchWorkItemInput as reqWatchWorkItemInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqWatchWorkItemInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqWatchWorkItemHandler,
  mapWatchedWorkItem,
  previewWatchWorkItem
} from "../../../../src/products/req/tools/watch-work-item.js";

const input = {
  work_item_id: "9192160",
  type: "scrum",
  x_auth_token: "token-123456"
};

describe("watch work item tool", () => {
  it("previews watch requests without exposing the full token", () => {
    const result = previewWatchWorkItem({ ...input, dry_run: true });

    expect(result.summary).toBe("Dry run: watch CodeArts Req work item");
    expect(result.item).toEqual({
      workItemId: "9192160",
      type: "scrum",
      xAuthToken: "toke...3456",
      endpoint: "/v2/issues/watch",
      executed: false
    });
  });

  it("maps executed watch requests", () => {
    const response = {
      status: "success",
      result: {
        watcher: {
          id: 226991,
          watchable_type: "Issue",
          watchable_id: 9192160,
          user_id: 4091,
          region: "example"
        }
      }
    };
    const result = mapWatchedWorkItem({
      ...input,
      status: "success",
      watcher: response.result.watcher,
      raw: response
    });

    expect(result.summary).toBe("Watched CodeArts Req work item");
    expect(result.item).toEqual({
      workItemId: "9192160",
      type: "scrum",
      status: "success",
      watcherId: "226991",
      watchableType: "Issue",
      watchableId: "9192160",
      userId: "4091",
      region: "example",
      executed: true
    });
    expect(result.raw).toEqual(response);
  });

  it("keeps the barrel export compatible with the work-item schema module", () => {
    expect(reqWatchWorkItemInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqWatchWorkItemInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      watchWorkItem: vi.fn()
    };
    const handler = createReqWatchWorkItemHandler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.watchWorkItem).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: watch CodeArts Req work item");
  });

  it("executes watch through the client", async () => {
    const client = {
      watchWorkItem: vi.fn(async () => ({
        ...input,
        status: "success",
        watcher: {
          id: 226991,
          watchable_type: "Issue",
          watchable_id: 9192160,
          user_id: 4091,
          region: "example"
        },
        raw: { status: "success" }
      }))
    };
    const handler = createReqWatchWorkItemHandler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.watchWorkItem).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.structuredContent.item).toMatchObject({
      workItemId: "9192160",
      watcherId: "226991",
      executed: true
    });
  });
});
