import { describe, expect, it, vi } from "vitest";
import { reqBatchDeleteProjectMembersInput as reqBatchDeleteProjectMembersInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqBatchDeleteProjectMembersInput } from "../../../../src/products/req/schemas/member.js";
import {
  createReqBatchDeleteProjectMembersHandler,
  mapBatchDeletedProjectMembers,
  previewBatchDeleteProjectMembers
} from "../../../../src/products/req/tools/batch-delete-project-members.js";

describe("previewBatchDeleteProjectMembers", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewBatchDeleteProjectMembers({
      project_id: "project-1",
      user_ids: ["user-1", "user-2"],
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      userIds: ["user-1", "user-2"],
      removedCount: 0,
      executed: false
    });
  });
});

describe("mapBatchDeletedProjectMembers", () => {
  it("returns normalized batch delete data", () => {
    const result = mapBatchDeletedProjectMembers({
      project_id: "project-1",
      user_ids: ["user-1", "user-2"],
      removedCount: 2
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      userIds: ["user-1", "user-2"],
      removedCount: 2,
      executed: true
    });
  });
});

describe("reqBatchDeleteProjectMembersInput exports", () => {
  it("keeps the barrel export compatible with the member schema module", () => {
    const input = {
      project_id: "project-1",
      user_ids: ["user-1"]
    };

    expect(reqBatchDeleteProjectMembersInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqBatchDeleteProjectMembersInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqBatchDeleteProjectMembersHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      batchDeleteProjectMembers: vi.fn()
    };
    const handler = createReqBatchDeleteProjectMembersHandler(client);

    const result = await handler({
      project_id: "project-1",
      user_ids: ["user-1"],
      dry_run: true
    });

    expect(client.batchDeleteProjectMembers).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: remove 1 members from project project-1" }],
      structuredContent: {
        summary: "Dry run: remove 1 members from project project-1",
        item: {
          projectId: "project-1",
          userIds: ["user-1"],
          removedCount: 0,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed batch deletes", async () => {
    const client = {
      batchDeleteProjectMembers: vi.fn(async () => ({
        project_id: "project-1",
        user_ids: ["user-1", "user-2"],
        removedCount: 2
      }))
    };
    const handler = createReqBatchDeleteProjectMembersHandler(client);

    const result = await handler({
      project_id: "project-1",
      user_ids: ["user-1", "user-2"],
      dry_run: false
    });

    expect(client.batchDeleteProjectMembers).toHaveBeenCalledWith({
      project_id: "project-1",
      user_ids: ["user-1", "user-2"],
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Removed 2 members from project project-1" }],
      structuredContent: {
        summary: "Removed 2 members from project project-1",
        item: {
          projectId: "project-1",
          userIds: ["user-1", "user-2"],
          removedCount: 2,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
