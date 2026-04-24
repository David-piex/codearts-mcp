import { describe, expect, it, vi } from "vitest";
import { reqGetWorkItemIssueDetailsInput as reqGetWorkItemIssueDetailsInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqGetWorkItemIssueDetailsInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqGetWorkItemIssueDetailsHandler,
  mapReqWorkItemIssueDetails
} from "../../../../src/products/req/tools/get-work-item-issue-details.js";

describe("reqGetWorkItemIssueDetailsInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_id: "2884248"
    };

    expect(reqGetWorkItemIssueDetailsInput.parse(input)).toEqual({
      ...input,
      include: "children,parent"
    });
    expect(reqGetWorkItemIssueDetailsInputFromBarrel.parse(input)).toEqual({
      ...input,
      include: "children,parent"
    });
  });
});

describe("mapReqWorkItemIssueDetails", () => {
  it("returns normalized deep issue detail data", () => {
    const result = mapReqWorkItemIssueDetails({
      id: "2884248",
      subject: "33333",
      description: "<p>story desc</p>",
      created_on: "1754307805000",
      updated_on: "1754378971000",
      status: { id: 1, name: "新建" },
      tracker: { id: 7, name: "Story" },
      project: { identifier: "project-1", name: "Project A", id: 10 },
      module: { id: 8, name: "网关" },
      parent_issue: { id: 200, name: "Parent story" },
      custom_fields: [{ name: "业务域", value: "支付" }],
      accessories_list: [{ attachment_id: 26262, file_name: "demo.json" }],
      inner_text: "latest comment"
    });

    expect(result.item).toEqual({
      id: "2884248",
      title: "33333",
      description: "<p>story desc</p>",
      createdOn: "1754307805000",
      updatedOn: "1754378971000",
      status: { id: 1, name: "新建" },
      tracker: { id: 7, name: "Story" },
      project: { identifier: "project-1", name: "Project A", id: 10 },
      module: { id: 8, name: "网关" },
      parentIssue: { id: 200, name: "Parent story" },
      customFields: [{ name: "业务域", value: "支付" }],
      attachments: [{ attachment_id: 26262, file_name: "demo.json" }],
      latestComment: "latest comment"
    });
  });
});

describe("createReqGetWorkItemIssueDetailsHandler", () => {
  it("returns normalized deep issue detail output", async () => {
    const client = {
      getWorkItemIssueDetails: vi.fn(async () => ({
        id: "2884248",
        subject: "33333",
        description: "<p>story desc</p>",
        created_on: "1754307805000",
        updated_on: "1754378971000",
        status: { id: 1, name: "新建" },
        tracker: { id: 7, name: "Story" },
        project: { identifier: "project-1", name: "Project A", id: 10 },
        module: { id: 8, name: "网关" },
        parent_issue: { id: 200, name: "Parent story" },
        custom_fields: [{ name: "业务域", value: "支付" }],
        accessories_list: [{ attachment_id: 26262, file_name: "demo.json" }],
        inner_text: "latest comment"
      }))
    };
    const handler = createReqGetWorkItemIssueDetailsHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_id: "2884248"
    });

    expect(client.getWorkItemIssueDetails).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_id: "2884248",
      include: "children,parent"
    });
    expect(result.content[0]?.text).toContain("Loaded work item issue details 2884248");
    expect(result.structuredContent.item).toEqual({
      id: "2884248",
      title: "33333",
      description: "<p>story desc</p>",
      createdOn: "1754307805000",
      updatedOn: "1754378971000",
      status: { id: 1, name: "新建" },
      tracker: { id: 7, name: "Story" },
      project: { identifier: "project-1", name: "Project A", id: 10 },
      module: { id: 8, name: "网关" },
      parentIssue: { id: 200, name: "Parent story" },
      customFields: [{ name: "业务域", value: "支付" }],
      attachments: [{ attachment_id: 26262, file_name: "demo.json" }],
      latestComment: "latest comment"
    });
  });
});
