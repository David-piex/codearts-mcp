import { describe, expect, it, vi } from "vitest";
import { reqAddProjectMemberInput as reqAddProjectMemberInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqAddProjectMemberInput } from "../../../../src/products/req/schemas/member.js";
import {
  createReqAddProjectMemberHandler,
  mapAddedProjectMember,
  previewAddProjectMember
} from "../../../../src/products/req/tools/add-project-member.js";

describe("previewAddProjectMember", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewAddProjectMember({
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      role_id: 3,
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      userId: "user-1",
      domainId: "domain-1",
      roleId: 3,
      added: false,
      executed: false
    });
  });
});

describe("mapAddedProjectMember", () => {
  it("returns normalized added member data", () => {
    const result = mapAddedProjectMember({
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      role_id: 3
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      userId: "user-1",
      domainId: "domain-1",
      roleId: 3,
      added: true,
      executed: true
    });
  });
});

describe("reqAddProjectMemberInput exports", () => {
  it("keeps the barrel export compatible with the member schema module", () => {
    const input = {
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1"
    };

    expect(reqAddProjectMemberInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqAddProjectMemberInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });
});

describe("createReqAddProjectMemberHandler", () => {
  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      addProjectMember: vi.fn()
    };
    const handler = createReqAddProjectMemberHandler(client);

    const result = await handler({
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      dry_run: true
    });

    expect(client.addProjectMember).not.toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: "Dry run: add member user-1 to project project-1" }],
      structuredContent: {
        summary: "Dry run: add member user-1 to project project-1",
        item: {
          projectId: "project-1",
          userId: "user-1",
          domainId: "domain-1",
          roleId: undefined,
          added: false,
          executed: false
        },
        raw: undefined
      }
    });
  });

  it("returns content and structured output for executed adds", async () => {
    const client = {
      addProjectMember: vi.fn(async () => ({
        project_id: "project-1",
        user_id: "user-1",
        domain_id: "domain-1",
        role_id: 3,
        added: true as const
      }))
    };
    const handler = createReqAddProjectMemberHandler(client);

    const result = await handler({
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      role_id: 3,
      dry_run: false
    });

    expect(client.addProjectMember).toHaveBeenCalledWith({
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      role_id: 3,
      dry_run: false
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Added member user-1 to project project-1" }],
      structuredContent: {
        summary: "Added member user-1 to project project-1",
        item: {
          projectId: "project-1",
          userId: "user-1",
          domainId: "domain-1",
          roleId: 3,
          added: true,
          executed: true
        },
        raw: undefined
      }
    });
  });
});
