import { describe, expect, it } from "vitest";
import { createCheckListMeasureFilesHandler } from "../../../../src/products/check/tools/additional-read-tools.js";

describe("createCheckListMeasureFilesHandler", () => {
  it("maps measure files into MCP list output", async () => {
    const handler = createCheckListMeasureFilesHandler({
      listMeasureFiles: async () => ({
        task_id: "task-1",
        files: [
          {
            id: 499506,
            filePath: "src/App.java",
            language: "JAVA"
          }
        ],
        total: 1,
        raw: {
          total: 1
        }
      })
    } as never);

    const result = await handler({ task_id: "task-1", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("measure files");
    expect(result.structuredContent.items).toEqual([
      {
        id: "499506",
        name: undefined,
        measureFile: {
          id: 499506,
          filePath: "src/App.java",
          language: "JAVA"
        }
      }
    ]);
    expect(result.structuredContent.raw).toEqual({ total: 1 });
  });
});
