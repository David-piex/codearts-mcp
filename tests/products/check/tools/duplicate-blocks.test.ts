import { describe, expect, it } from "vitest";
import {
  createCheckGetMeasureDuplicationInfoHandler,
  createCheckListRelatedDuplicateBlocksHandler
} from "../../../../src/products/check/tools/additional-read-tools.js";

describe("Check duplicate block tools", () => {
  it("maps related duplicate blocks into MCP list output", async () => {
    const handler = createCheckListRelatedDuplicateBlocksHandler({
      listRelatedDuplicateBlocks: async () => ({
        task_id: "task-1",
        blocks: [
          {
            blockId: "block-1",
            filePath: "src/App.java",
            startLine: 1,
            endLine: 20
          }
        ],
        total: 1,
        raw: {
          total: 1
        }
      })
    } as never);

    const result = await handler({ task_id: "task-1", file_path: "src/App.java" });

    expect(result.content[0]?.text).toContain("related duplicate blocks");
    expect(result.structuredContent.items).toEqual([
      {
        id: "block-1",
        name: undefined,
        duplicateBlock: {
          blockId: "block-1",
          filePath: "src/App.java",
          startLine: 1,
          endLine: 20
        }
      }
    ]);
    expect(result.structuredContent.raw).toEqual({ total: 1 });
  });

  it("maps measure duplication info into MCP item output", async () => {
    const handler = createCheckGetMeasureDuplicationInfoHandler({
      getMeasureDuplicationInfo: async () => ({
        task_id: "task-1",
        raw: {
          codeHubFileUrl: "https://example.com/src/App.java",
          rawLines: "20",
          code: [{ lineNumber: 1, lineContent: "class App {}" }]
        }
      })
    } as never);

    const result = await handler({
      task_id: "task-1",
      file_path: "src/App.java",
      start_line: 1,
      end_line: 20
    });

    expect(result.content[0]?.text).toContain("Loaded Check measure duplication info");
    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      duplicationInfo: {
        codeHubFileUrl: "https://example.com/src/App.java",
        rawLines: "20",
        code: [{ lineNumber: 1, lineContent: "class App {}" }]
      }
    });
  });
});
