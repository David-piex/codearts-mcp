import { describe, expect, it, vi } from "vitest";
import { reqBatchDeleteWorkItemsV2TokenInput as reqBatchDeleteWorkItemsV2TokenInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqBatchDeleteWorkItemsV2TokenInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqBatchDeleteWorkItemsV2TokenHandler,
  mapBatchDeletedWorkItemsV2Token,
  previewBatchDeleteWorkItemsV2Token
} from "../../../../src/products/req/tools/batch-delete-work-items-v2-token.js";

const input = {
  project_id: "project-1",
  work_item_ids: ["9190894", "9179013"],
  x_auth_token: "token-123456"
};

describe("batch delete work items V2 token tool", () => {
  it("previews token-header batch delete requests without exposing the full token", () => {
    const result = previewBatchDeleteWorkItemsV2Token({ ...input, dry_run: true });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      workItemIds: ["9190894", "9179013"],
      xAuthToken: "toke...3456",
      endpoint: "/v2/workitem/batch-delete",
      deletedCount: 0,
      executed: false
    });
  });

  it("maps executed token-header batch delete data", () => {
    const response = { status: "success" };
    const result = mapBatchDeletedWorkItemsV2Token({
      project_id: "project-1",
      work_item_ids: ["9190894", "9179013"],
      status: "success",
      deleted_issue_ids: ["9190894"],
      deleted_issues: [
        {
          id: 9190894,
          tracker_id: 7,
          subject: "123",
          status_id: 1,
          done_ratio: 0,
          expected_work_hours: 0,
          actual_work_hours: 0,
          deleted: false,
          is_archived: false
        }
      ],
      raw: response
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemIds: ["9190894", "9179013"],
      status: "success",
      deletedIssueIds: ["9190894"],
      deletedIssues: [
        {
          id: 9190894,
          tracker_id: 7,
          subject: "123",
          status_id: 1,
          done_ratio: 0,
          expected_work_hours: 0,
          actual_work_hours: 0,
          deleted: false,
          is_archived: false
        }
      ],
      deletedCount: 1,
      executed: true
    });
    expect(result.raw).toEqual(response);
  });

  it("keeps the barrel export compatible with the work-item schema module", () => {
    expect(reqBatchDeleteWorkItemsV2TokenInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqBatchDeleteWorkItemsV2TokenInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      batchDeleteWorkItemsV2Token: vi.fn()
    };
    const handler = createReqBatchDeleteWorkItemsV2TokenHandler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.batchDeleteWorkItemsV2Token).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe(
      "Dry run: batch delete 2 work items through V2 token-header endpoint"
    );
  });

  it("executes batch delete through the client", async () => {
    const client = {
      batchDeleteWorkItemsV2Token: vi.fn(async () => ({
        project_id: "project-1",
        work_item_ids: ["9190894", "9179013"],
        status: "success",
        deleted_issue_ids: ["9190894"],
        deleted_issues: [
          {
            id: 9190894,
            tracker_id: 7,
            subject: "123",
            status_id: 1
          }
        ],
        raw: { status: "success" }
      }))
    };
    const handler = createReqBatchDeleteWorkItemsV2TokenHandler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.batchDeleteWorkItemsV2Token).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      deletedIssueIds: ["9190894"],
      deletedCount: 1,
      executed: true
    });
  });
});
