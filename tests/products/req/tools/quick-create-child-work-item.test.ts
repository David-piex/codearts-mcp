import { describe, expect, it, vi } from "vitest";
import { reqQuickCreateChildWorkItemInput as reqQuickCreateChildWorkItemInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqQuickCreateChildWorkItemInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqQuickCreateChildWorkItemHandler,
  mapQuickCreatedChildWorkItem,
  previewQuickCreateChildWorkItem
} from "../../../../src/products/req/tools/quick-create-child-work-item.js";

const input = {
  project_id: "project-1",
  title: "Child Story",
  parent_issue_id: 70779173,
  tracker_id: 7,
  assigned_to_id: 101,
  fixed_version_id: "123.0"
};

describe("quick create child work item tool", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    expect(reqQuickCreateChildWorkItemInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqQuickCreateChildWorkItemInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("previews dry-run child work item creation", () => {
    const result = previewQuickCreateChildWorkItem({ ...input, dry_run: true });

    expect(result.summary).toBe("Dry run: quick create child work item Child Story");
    expect(result.item).toEqual({
      projectId: "project-1",
      title: "Child Story",
      parentIssueId: 70779173,
      trackerId: 7,
      assignedToId: 101,
      fixedVersionId: "123.0",
      executed: false
    });
  });

  it("maps executed child work item creation", () => {
    const rawIssue = {
      id: 70800001,
      subject: "Child Story",
      parent_issue_id: 70779173
    };
    const result = mapQuickCreatedChildWorkItem({
      id: 70800001,
      subject: "Child Story",
      description: "<p>created</p>",
      status: { id: 1, name: "New" },
      tracker: { id: 7, name: "Story" },
      project_id: "project-1",
      parent_issue_id: 70779173,
      assigned_to_id: 101,
      fixed_version_id: "123.0",
      rawIssue
    });

    expect(result.summary).toBe("Quick created child work item Child Story");
    expect(result.item).toEqual({
      id: "70800001",
      title: "Child Story",
      description: "<p>created</p>",
      status: "New",
      statusId: 1,
      type: "Story",
      typeId: 7,
      projectId: "project-1",
      parentIssueId: 70779173,
      assignedToId: 101,
      fixedVersionId: "123.0",
      executed: true
    });
    expect(result.raw).toEqual({ rawIssue });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      quickCreateChildWorkItem: vi.fn()
    };
    const handler = createReqQuickCreateChildWorkItemHandler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.quickCreateChildWorkItem).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: quick create child work item Child Story");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      parentIssueId: 70779173,
      trackerId: 7,
      executed: false
    });
  });

  it("executes creation through the client", async () => {
    const client = {
      quickCreateChildWorkItem: vi.fn(async () => ({
        id: 70800001,
        subject: "Child Story",
        status: { id: 1, name: "New" },
        tracker: { id: 7, name: "Story" },
        project_id: "project-1",
        parent_issue_id: 70779173
      }))
    };
    const handler = createReqQuickCreateChildWorkItemHandler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.quickCreateChildWorkItem).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.content[0]?.text).toBe("Quick created child work item Child Story");
    expect(result.structuredContent.item).toMatchObject({
      id: "70800001",
      title: "Child Story",
      status: "New",
      type: "Story",
      parentIssueId: 70779173,
      executed: true
    });
  });
});
