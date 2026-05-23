import { describe, expect, it } from "vitest";
import { createArtifactGetRepositoryUserInfoHandler } from "../../../../src/products/artifact/tools/get-repository-user-info.js";
import { createArtifactListRepositoryUsersHandler } from "../../../../src/products/artifact/tools/list-repository-users.js";

describe("Artifact repository user tools", () => {
  it("returns repository user info while preserving the raw payload", async () => {
    const handler = createArtifactGetRepositoryUserInfoHandler({
      getRepositoryUserInfo: async () => ({
        username: "repo-user",
        raw: {
          username: "repo-user",
          password: "secret"
        }
      })
    });

    const result = await handler({});

    expect(result.content[0]?.text).toContain("Loaded Artifact repository user info");
    expect(result.structuredContent.item?.id).toBe("repo-user");
    expect(result.structuredContent.item).toEqual(expect.objectContaining({
      username: "repo-user",
      userInfo: {
        username: "repo-user",
        password: "secret"
      }
    }));
  });

  it("returns repository users as a normalized list", async () => {
    const handler = createArtifactListRepositoryUsersHandler({
      listRepositoryUsers: async () => ({
        users: [
          {
            user_id: "user-1",
            user_name: "repo-user",
            repo_user_name: "domain_user-1"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ page: 1, page_size: 10, user_name: "repo" });

    expect(result.content[0]?.text).toContain("1 repository users found");
    expect(result.structuredContent.items?.[0]?.id).toBe("");
    expect(result.structuredContent.items?.[0]?.user).toEqual({
      user_id: "user-1",
      user_name: "repo-user",
      repo_user_name: "domain_user-1"
    });
    expect(result.structuredContent.page_info?.total).toBe(1);
  });
});
