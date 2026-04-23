import { describe, expect, it, vi } from "vitest";
import { reqListJobCacheBoardsInput as reqListJobCacheBoardsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListJobCacheBoardsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListJobCacheBoardsHandler,
  mapReqJobCacheBoards
} from "../../../../src/products/req/tools/list-job-cache-boards.js";

describe("mapReqJobCacheBoards", () => {
  it("returns normalized board cache fields", () => {
    const result = mapReqJobCacheBoards(
      [
        {
          id: "subject",
          header: "标题",
          type: "text",
          show: "true"
        }
      ],
      1111
    );

    expect(result.items).toEqual([
      {
        id: "subject",
        header: "标题",
        type: "text",
        visible: true
      }
    ]);
    expect(result.raw).toEqual({ cacheId: 1111 });
  });
});

describe("reqListJobCacheBoardsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      type: "board",
      region: "cn-north-4"
    };

    expect(reqListJobCacheBoardsInput.parse(input)).toEqual(input);
    expect(reqListJobCacheBoardsInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListJobCacheBoardsHandler", () => {
  it("returns normalized board cache fields", async () => {
    const client = {
      listJobCacheBoards: vi.fn(async () => ({
        cache_id: 1111,
        fields: [
          {
            id: "subject",
            header: "标题",
            type: "text",
            show: true
          }
        ]
      }))
    };
    const handler = createReqListJobCacheBoardsHandler(client);

    const result = await handler({
      project_id: "project-1",
      region: "cn-north-4"
    });

    expect(client.listJobCacheBoards).toHaveBeenCalledWith({
      project_id: "project-1",
      type: "board",
      region: "cn-north-4"
    });
    expect(result.content[0]?.text).toContain("1 board cache fields found");
    expect(result.structuredContent.items).toEqual([
      {
        id: "subject",
        header: "标题",
        type: "text",
        visible: true
      }
    ]);
  });
});
