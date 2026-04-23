import { describe, expect, it, vi } from "vitest";
import { reqUpdateProjectMemberRoleInput as reqUpdateProjectMemberRoleInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateProjectMemberRoleInput } from "../../../../src/products/req/schemas/member.js";
import {
  createReqUpdateProjectMemberRoleHandler,
  mapUpdatedProjectMemberRole,
  previewUpdateProjectMemberRole
} from "../../../../src/products/req/tools/update-project-member-role.js";

describe("previewUpdateProjectMemberRole", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewUpdateProjectMemberRole({
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      userId: "user-1",
      roleId: 5,
      updated: false,
      executed: false
    });
  });
});

describe("mapUpdatedProjectMemberRole", () => {
  it("returns normalized member role update data", () => {
    const result = mapUpdatedProjectMemberRole({
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      userId: "user-1",
      roleId: 5,
      updated: true,
      executed: true
    });
  });
});

describe("reqUpdateProjectMemberRoleInput exports", () => {
  it("keeps the barrel export compatible with the member schema module", () => {
    const input = {
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5
    };

    expect(reqUpdateProjectMemberRoleInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateProjectMemberRoleInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqUpdateProjectMemberRoleHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateProjectMemberRole: vi.fn()
    };
    const handler = createReqUpdateProjectMemberRoleHandler(client);

    const result = await handler({
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5,
      dry_run: true
    });

    expect(client.updateProjectMemberRole).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: update member user-1 role in project project-1" }],
      structuredContent: {
        summary: "Dry run: update member user-1 role in project project-1",
        item: {
          projectId: "project-1",
          userId: "user-1",
          roleId: 5,
          updated: false,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed role updates", async () => {
    const client = {
      updateProjectMemberRole: vi.fn(async () => ({
        project_id: "project-1",
        user_id: "user-1",
        role_id: 5,
        updated: true as const
      }))
    };
    const handler = createReqUpdateProjectMemberRoleHandler(client);

    const result = await handler({
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5,
      dry_run: false
    });

    expect(client.updateProjectMemberRole).toHaveBeenCalledWith({
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5,
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Updated member user-1 role in project project-1" }],
      structuredContent: {
        summary: "Updated member user-1 role in project project-1",
        item: {
          projectId: "project-1",
          userId: "user-1",
          roleId: 5,
          updated: true,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
