import { describe, expect, it } from "vitest";
import {
  mapCurrentUserRepositories,
  mapGroupRepositories,
  mapRepositoryMembers,
  mapRepositoryUserGroups
} from "../../../../src/products/repo/tools/repository-list-result.js";

describe("repository list result mappers", () => {
  it("maps current user repositories with rich repository fields", () => {
    const result = mapCurrentUserRepositories(
      [
        {
          id: 100,
          name: "demo",
          name_with_namespace: "group/demo",
          ssh_url_to_repo: "git@example.com:group/demo.git",
          http_url_to_repo: "https://example.com/group/demo.git",
          project_id: "project-1",
          star_count: 2,
          archived: false
        }
      ],
      1,
      20,
      1
    );

    expect(result.items?.[0]).toMatchObject({
      id: "100",
      name: "demo",
      nameWithNamespace: "group/demo",
      sshUrl: "git@example.com:group/demo.git",
      httpUrl: "https://example.com/group/demo.git",
      projectId: "project-1",
      starCount: 2,
      archived: false
    });
    expect(result.page_info).toEqual({ page: 1, pageSize: 20, total: 1 });
  });

  it("maps group repositories", () => {
    const result = mapGroupRepositories([{ id: "101", name: "service", path: "service" }], 2, 10, 12);

    expect(result.summary).toBe("1 group repositories found");
    expect(result.items?.[0]).toMatchObject({
      id: "101",
      name: "service",
      path: "service"
    });
    expect(result.page_info).toEqual({ page: 2, pageSize: 10, total: 12 });
  });

  it("maps repository user groups with documented field aliases", () => {
    const result = mapRepositoryUserGroups(
      [
        {
          member_group_id: 7,
          member_group_name: "maintainers",
          member_count: 3,
          project_id: "project-1"
        },
        {
          user_group_id: "8",
          user_group_name: "developers",
          user_count: 5
        }
      ],
      1,
      20,
      2
    );

    expect(result.items).toEqual([
      {
        id: "7",
        name: "maintainers",
        projectId: "project-1",
        userCount: 3,
        description: undefined
      },
      {
        id: "8",
        name: "developers",
        projectId: undefined,
        userCount: 5,
        description: undefined
      }
    ]);
  });

  it("maps repository members", () => {
    const result = mapRepositoryMembers(
      [
        {
          user_id: 9,
          user_name: "dev",
          user_nick_name: "Dev User",
          tenant_name: "tenant",
          project_role_name: "Developer",
          repository_role_name: "Committer",
          action_enabled: true
        }
      ],
      1,
      20,
      1
    );

    expect(result.items?.[0]).toMatchObject({
      userId: "9",
      userName: "dev",
      userNickName: "Dev User",
      tenantName: "tenant",
      projectRoleName: "Developer",
      repositoryRoleName: "Committer",
      actionEnabled: true
    });
  });
});
