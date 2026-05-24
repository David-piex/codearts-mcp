import { describe, expect, it } from "vitest";
import {
  createCheckGetIssueFilterHandler,
  createCheckGetMeasureDuplicationInfoHandler,
  createCheckListIssuesByFilterHandler,
  createCheckListMeasureFilesV2Handler,
  createCheckListRelatedDuplicateBlocksHandler,
  createCheckListRelatedDuplicateBlocksV2Handler
} from "../../../../src/products/check/tools/additional-read-tools.js";

describe("Check duplicate block tools", () => {
  it("maps issues by filter into MCP list output", async () => {
    const handler = createCheckListIssuesByFilterHandler({
      listIssuesByFilter: async () => ({
        task_id: "task-1",
        issues: [
          {
            mergeKey: "issue-1",
            ruleId: "rule-1",
            filePath: "src/App.java"
          }
        ],
        total: 1,
        raw: {
          total: 1
        }
      })
    } as never);

    const result = await handler({ task_id: "task-1", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("issues by filter");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      issue: {
        mergeKey: "issue-1",
        ruleId: "rule-1"
      }
    });
  });

  it("maps issue filter facets into MCP list output", async () => {
    const handler = createCheckGetIssueFilterHandler({
      getIssueFilter: async () => ({
        task_id: "task-1",
        facets: [
          {
            property: "statusIds",
            values: [{ val: "0", count: "1" }]
          }
        ],
        total: 1,
        raw: {
          facets: []
        }
      })
    } as never);

    const result = await handler({ task_id: "task-1", facets: "statusIds" });

    expect(result.content[0]?.text).toContain("issue filter facets");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "statusIds",
      facet: {
        property: "statusIds"
      }
    });
  });

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

  it("maps V2 measure files into MCP list output", async () => {
    const handler = createCheckListMeasureFilesV2Handler({
      listMeasureFilesV2: async () => ({
        task_id: "task-1",
        files: [
          {
            filePath: "src/App.java",
            fileName: "App.java",
            duplicateRate: "2.5"
          }
        ],
        total: 1,
        raw: {
          total: 1
        }
      })
    } as never);

    const result = await handler({ task_id: "task-1", page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("measure files V2");
    expect(result.structuredContent.items).toEqual([
      {
        id: "src/App.java",
        name: "App.java",
        measureFile: {
          filePath: "src/App.java",
          fileName: "App.java",
          duplicateRate: "2.5"
        }
      }
    ]);
  });

  it("maps V2 related duplicate blocks into MCP list output", async () => {
    const handler = createCheckListRelatedDuplicateBlocksV2Handler({
      listRelatedDuplicateBlocksV2: async () => ({
        task_id: "task-1",
        blocks: [
          {
            blockId: "block-1",
            filePath: "src/App.java",
            startLine: 1
          }
        ],
        total: 1,
        raw: {
          total: 1
        }
      })
    } as never);

    const result = await handler({ task_id: "task-1", block_id: "block-1" });

    expect(result.content[0]?.text).toContain("related duplicate blocks V2");
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "block-1",
      duplicateBlock: {
        blockId: "block-1"
      }
    });
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
