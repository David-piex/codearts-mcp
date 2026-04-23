import { describe, expect, it, vi } from "vitest";
import { reqListWorkItemStatusAttributesInput as reqListWorkItemStatusAttributesInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqListWorkItemStatusAttributesInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqListWorkItemStatusAttributesHandler,
  mapReqWorkItemStatusAttributes
} from "../../../../src/products/req/tools/list-work-item-status-attributes.js";

describe("mapReqWorkItemStatusAttributes", () => {
  it("returns normalized work item status attributes", () => {
    const result = mapReqWorkItemStatusAttributes([
      {
        name: "开始态",
        type: "START",
        project_id: "project-1"
      }
    ]);

    expect(result.items).toEqual([
      {
        name: "开始态",
        type: "START",
        projectId: "project-1"
      }
    ]);
  });
});

describe("reqListWorkItemStatusAttributesInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqListWorkItemStatusAttributesInput.parse(input)).toEqual(input);
    expect(reqListWorkItemStatusAttributesInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqListWorkItemStatusAttributesHandler", () => {
  it("returns normalized work item status attributes", async () => {
    const client = {
      listWorkItemStatusAttributes: vi.fn(async () => ({
        issue_status_attributes: [
          {
            name: "开始态",
            type: "START",
            project_id: "project-1"
          }
        ]
      }))
    };
    const handler = createReqListWorkItemStatusAttributesHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.listWorkItemStatusAttributes).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("1 work item status attributes found");
    expect(result.structuredContent.items).toEqual([
      {
        name: "开始态",
        type: "START",
        projectId: "project-1"
      }
    ]);
  });
});
