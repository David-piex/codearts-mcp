import { describe, expect, it, vi } from "vitest";
import { reqBatchUpdateWorkItemsV2TokenInput as reqBatchUpdateWorkItemsV2TokenInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqBatchUpdateWorkItemsV2TokenInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqBatchUpdateWorkItemsV2TokenHandler,
  mapBatchUpdatedWorkItemsV2Token,
  previewBatchUpdateWorkItemsV2Token
} from "../../../../src/products/req/tools/batch-update-work-items-v2-token.js";

describe("previewBatchUpdateWorkItemsV2Token", () => {
  it("returns a dry-run summary for the official token-header endpoint", () => {
    const result = previewBatchUpdateWorkItemsV2Token({
      project_id: "project-1",
      work_item_ids: ["70844211", "70844212"],
      assigned_to_id: "4091",
      x_auth_token: "token-123456",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      workItemIds: ["70844211", "70844212"],
      assignedToId: "4091",
      xAuthToken: "toke...3456",
      endpoint: "/v2/workitem/issues",
      executed: false
    });
  });
});

describe("mapBatchUpdatedWorkItemsV2Token", () => {
  it("returns normalized token-header batch update data", () => {
    const result = mapBatchUpdatedWorkItemsV2Token({
      project_id: "project-1",
      work_item_ids: ["70844211", "70844212"],
      assigned_to_id: "4091",
      status: "success",
      project: {
        id: 35138974,
        identifier: "5192de5eb435430c8cd41c6ae6028848"
      },
      journal_ids: ["1", "2"],
      error_issues: [70844212],
      versions_issues: [],
      success_issues: ["70844211"],
      raw: { status: "success" }
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      workItemIds: ["70844211", "70844212"],
      assignedToId: "4091",
      status: "success",
      project: {
        id: 35138974,
        identifier: "5192de5eb435430c8cd41c6ae6028848"
      },
      journalIds: ["1", "2"],
      errorIssues: ["70844212"],
      versionsIssues: [],
      successIssues: ["70844211"],
      executed: true
    });
  });
});

describe("reqBatchUpdateWorkItemsV2TokenInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      work_item_ids: ["70844211"],
      assigned_to_id: "4091",
      x_auth_token: "token-123456"
    };

    expect(reqBatchUpdateWorkItemsV2TokenInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqBatchUpdateWorkItemsV2TokenInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("rejects empty token-header updates when no supported mutable fields are provided", () => {
    const input = {
      project_id: "project-1",
      work_item_ids: ["70844211"],
      x_auth_token: "token-123456"
    };

    expect(() => reqBatchUpdateWorkItemsV2TokenInput.parse(input)).toThrow(/assigned_to_id/i);
    expect(() => reqBatchUpdateWorkItemsV2TokenInputFromBarrel.parse(input)).toThrow(/assigned_to_id/i);
  });
});

describe("createReqBatchUpdateWorkItemsV2TokenHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      batchUpdateWorkItemsV2Token: vi.fn()
    };
    const handler = createReqBatchUpdateWorkItemsV2TokenHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_ids: ["70844211", "70844212"],
      assigned_to_id: "4091",
      x_auth_token: "token-123456",
      dry_run: true
    });

    expect(client.batchUpdateWorkItemsV2Token).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [
        {
          type: "text",
          text: "Dry run: batch update 2 work items through V2 token-header endpoint"
        }
      ],
      structuredContent: {
        summary: "Dry run: batch update 2 work items through V2 token-header endpoint",
        item: {
          projectId: "project-1",
          workItemIds: ["70844211", "70844212"],
          assignedToId: "4091",
          xAuthToken: "toke...3456",
          endpoint: "/v2/workitem/issues",
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed token-header updates", async () => {
    const client = {
      batchUpdateWorkItemsV2Token: vi.fn(async () => ({
        project_id: "project-1",
        work_item_ids: ["70844211", "70844212"],
        assigned_to_id: "4091",
        status: "success",
        project: {
          id: 35138974,
          identifier: "5192de5eb435430c8cd41c6ae6028848"
        },
        journal_ids: ["11"],
        error_issues: [70844212],
        versions_issues: [],
        success_issues: ["70844211"],
        raw: { status: "success" }
      }))
    };
    const handler = createReqBatchUpdateWorkItemsV2TokenHandler(client);

    const result = await handler({
      project_id: "project-1",
      work_item_ids: ["70844211", "70844212"],
      assigned_to_id: "4091",
      x_auth_token: "token-123456",
      dry_run: false
    });

    expect(client.batchUpdateWorkItemsV2Token).toHaveBeenCalledWith({
      project_id: "project-1",
      work_item_ids: ["70844211", "70844212"],
      assigned_to_id: "4091",
      x_auth_token: "token-123456",
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated work items through V2 token-header endpoint" }],
      structuredContent: {
        summary: "Updated work items through V2 token-header endpoint",
        item: {
          projectId: "project-1",
          workItemIds: ["70844211", "70844212"],
          assignedToId: "4091",
          status: "success",
          project: {
            id: 35138974,
            identifier: "5192de5eb435430c8cd41c6ae6028848"
          },
          journalIds: ["11"],
          errorIssues: ["70844212"],
          versionsIssues: [],
          successIssues: ["70844211"],
          executed: true
        },
        raw: { status: "success" }
      }
    });
  });
});
