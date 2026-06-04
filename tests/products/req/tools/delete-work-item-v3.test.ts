import { describe, expect, it, vi } from "vitest";
import { reqDeleteWorkItemV3Input as reqDeleteWorkItemV3InputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqDeleteWorkItemV3Input } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqDeleteWorkItemV3Handler,
  mapDeletedWorkItemV3,
  previewDeleteWorkItemV3
} from "../../../../src/products/req/tools/delete-work-item-v3.js";

const input = {
  project_id: "project-1",
  work_item_id: "9192160",
  type: "scrum",
  x_auth_token: "token-123456"
};

describe("delete work item V3 tool", () => {
  it("previews V3 token-header delete requests without exposing the full token", () => {
    const result = previewDeleteWorkItemV3({ ...input, dry_run: true });

    expect(result.summary).toBe("Dry run: delete CodeArts Req work item through V3 token-header endpoint");
    expect(result.item).toEqual({
      projectId: "project-1",
      workItemId: "9192160",
      type: "scrum",
      xAuthToken: "toke...3456",
      endpoint: "/v3/issue/delete",
      executed: false
    });
  });

  it("maps executed V3 delete requests", () => {
    const response = { status: "success" };
    const result = mapDeletedWorkItemV3({
      project_id: "project-1",
      work_item_id: "9192160",
      type: "scrum",
      status: "success",
      deleted_issues: [{ id: 9192160, subject: "Story A" }],
      delete_attachment_files: ["a.txt"],
      issues: [{ id: 9192160 }],
      raw: response
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemId: "9192160",
      type: "scrum",
      status: "success",
      deletedIssues: [{ id: 9192160, subject: "Story A" }],
      deleteAttachmentFiles: ["a.txt"],
      issues: [{ id: 9192160 }],
      executed: true
    });
    expect(result.raw).toEqual(response);
  });

  it("keeps the barrel export compatible with the work-item schema module", () => {
    expect(reqDeleteWorkItemV3Input.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqDeleteWorkItemV3InputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      deleteWorkItemV3: vi.fn()
    };
    const handler = createReqDeleteWorkItemV3Handler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.deleteWorkItemV3).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe(
      "Dry run: delete CodeArts Req work item through V3 token-header endpoint"
    );
  });

  it("executes V3 delete through the client", async () => {
    const client = {
      deleteWorkItemV3: vi.fn(async () => ({
        project_id: "project-1",
        work_item_id: "9192160",
        type: "scrum",
        status: "success",
        deleted_issues: [{ id: 9192160 }],
        delete_attachment_files: ["a.txt"],
        issues: [{ id: 9192160 }],
        raw: { status: "success" }
      }))
    };
    const handler = createReqDeleteWorkItemV3Handler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.deleteWorkItemV3).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      workItemId: "9192160",
      executed: true
    });
  });
});
