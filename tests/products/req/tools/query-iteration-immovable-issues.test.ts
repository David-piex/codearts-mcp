import { describe, expect, it, vi } from "vitest";
import { reqQueryIterationImmovableIssuesInput as reqQueryIterationImmovableIssuesInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqQueryIterationImmovableIssuesInput } from "../../../../src/products/req/schemas/iteration.js";
import {
  createReqQueryIterationImmovableIssuesHandler,
  mapReqIterationImmovableIssues
} from "../../../../src/products/req/tools/query-iteration-immovable-issues.js";

describe("mapReqIterationImmovableIssues", () => {
  it("returns a list-shaped result from the legacy single-object payload", () => {
    const result = mapReqIterationImmovableIssues([
      {
        number: "REQ-12",
        id: 991,
        status_id: 7,
        status_name: "Blocked"
      }
    ]);

    expect(result.items).toEqual([
      {
        number: "REQ-12",
        id: "991",
        statusId: 7,
        statusName: "Blocked"
      }
    ]);
  });
});

describe("reqQueryIterationImmovableIssuesInput exports", () => {
  it("keeps the barrel export compatible with the iteration schema module", () => {
    const input = {
      project_id: "project-1",
      version_id: "301"
    };

    expect(reqQueryIterationImmovableIssuesInput.parse(input)).toEqual(input);
    expect(reqQueryIterationImmovableIssuesInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqQueryIterationImmovableIssuesHandler", () => {
  it("returns list content and structured output", async () => {
    const client = {
      queryIterationImmovableIssues: vi.fn(async () => ({
        items: [
          {
            number: "REQ-12",
            id: 991,
            status_id: 7,
            status_name: "Blocked"
          }
        ]
      }))
    };
    const handler = createReqQueryIterationImmovableIssuesHandler(client);

    const result = await handler({
      project_id: "project-1",
      version_id: "301"
    });

    expect(client.queryIterationImmovableIssues).toHaveBeenCalledWith({
      project_id: "project-1",
      version_id: "301"
    });
    expect(result.content[0]?.text).toContain("number: REQ-12");
    expect(result).toEqual({
      content: [expect.objectContaining({ type: "text" })],
      structuredContent: {
        summary: "1 immovable issues found",
        items: [
          {
            number: "REQ-12",
            id: "991",
            statusId: 7,
            statusName: "Blocked"
          }
        ],
        page_info: undefined,
        raw: undefined
      }
    });
  });
});
