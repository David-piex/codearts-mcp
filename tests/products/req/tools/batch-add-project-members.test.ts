import { describe, expect, it, vi } from "vitest";
import { reqBatchAddProjectMembersInput as reqBatchAddProjectMembersInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqBatchAddProjectMembersInput } from "../../../../src/products/req/schemas/member.js";
import {
  createReqBatchAddProjectMembersHandler,
  mapBatchAddedProjectMembers,
  previewBatchAddProjectMembers
} from "../../../../src/products/req/tools/batch-add-project-members.js";

describe("previewBatchAddProjectMembers", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewBatchAddProjectMembers({
      project_id: "project-1",
      members: [
        { user_id: "user-1", role_id: 3 },
        { user_id: "user-2" }
      ],
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      members: [
        { userId: "user-1", roleId: 3 },
        { userId: "user-2", roleId: undefined }
      ],
      addedCount: 0,
      executed: false
    });
  });
});

describe("mapBatchAddedProjectMembers", () => {
  it("returns normalized batch add data", () => {
    const result = mapBatchAddedProjectMembers({
      project_id: "project-1",
      members: [
        { user_id: "user-1", role_id: 3 },
        { user_id: "user-2" }
      ],
      addedCount: 2
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      members: [
        { userId: "user-1", roleId: 3 },
        { userId: "user-2", roleId: undefined }
      ],
      addedCount: 2,
      executed: true
    });
  });
});

describe("reqBatchAddProjectMembersInput exports", () => {
  it("keeps the barrel export compatible with the member schema module", () => {
    const input = {
      project_id: "project-1",
      members: [{ user_id: "user-1" }]
    };

    expect(reqBatchAddProjectMembersInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqBatchAddProjectMembersInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqBatchAddProjectMembersHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      batchAddProjectMembers: vi.fn()
    };
    const handler = createReqBatchAddProjectMembersHandler(client);

    const result = await handler({
      project_id: "project-1",
      members: [{ user_id: "user-1" }],
      dry_run: true
    });

    expect(client.batchAddProjectMembers).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: add 1 members to project project-1" }],
      structuredContent: {
        summary: "Dry run: add 1 members to project project-1",
        item: {
          projectId: "project-1",
          members: [{ userId: "user-1", roleId: undefined }],
          addedCount: 0,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed batch adds", async () => {
    const client = {
      batchAddProjectMembers: vi.fn(async () => ({
        project_id: "project-1",
        members: [
          { user_id: "user-1", role_id: 3 },
          { user_id: "user-2" }
        ],
        addedCount: 2
      }))
    };
    const handler = createReqBatchAddProjectMembersHandler(client);

    const result = await handler({
      project_id: "project-1",
      members: [
        { user_id: "user-1", role_id: 3 },
        { user_id: "user-2" }
      ],
      dry_run: false
    });

    expect(client.batchAddProjectMembers).toHaveBeenCalledWith({
      project_id: "project-1",
      members: [
        { user_id: "user-1", role_id: 3 },
        { user_id: "user-2" }
      ],
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Added 2 members to project project-1" }],
      structuredContent: {
        summary: "Added 2 members to project project-1",
        item: {
          projectId: "project-1",
          members: [
            { userId: "user-1", roleId: 3 },
            { userId: "user-2", roleId: undefined }
          ],
          addedCount: 2,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
