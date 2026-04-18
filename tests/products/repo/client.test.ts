import { describe, expect, it } from "vitest";
import { createRepoClient } from "../../../src/products/repo/client.js";

describe("createRepoClient", () => {
  it("supports array responses when listing repositories", async () => {
    const client = createRepoClient({
      get: async () => [{ id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }]
    } as never);

    const result = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });

    expect(result.repositories).toEqual([
      { id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }
    ]);
    expect(result.total).toBe(1);
  });

  it("uses repository path when listing branches", async () => {
    let requestedPath = "";
    const client = createRepoClient({
      get: async (path: string) => {
        requestedPath = path;
        return [{ name: "master", protected: true }];
      }
    } as never);

    const result = await client.listBranches({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(requestedPath).toContain("/v4/repositories/repo-1/repository/branches");
    expect(result.branches[0]?.name).toBe("master");
  });

  it("supports wrapped tag responses from the live provider", async () => {
    const client = createRepoClient({
      get: async () => ({
        result: {
          total: 2,
          tags: [
            { name: "v1.0.0", is_double_name: false },
            { name: "v1.1.0", is_double_name: true }
          ]
        }
      })
    } as never);

    const result = await client.listTags({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(result).toEqual({
      tags: [
        { name: "v1.0.0", is_double_name: false },
        { name: "v1.1.0", is_double_name: true }
      ],
      total: 2
    });
  });

  it("supports stringified tag payloads from the live provider", async () => {
    const client = createRepoClient({
      get: async () =>
        JSON.stringify({
          result: {
            total: 1,
            tags: [{ name: "v2.0.0", is_double_name: false }]
          }
        })
    } as never);

    const result = await client.listTags({ repository_id: "repo-1", page: 1, page_size: 20 });

    expect(result).toEqual({
      tags: [{ name: "v2.0.0", is_double_name: false }],
      total: 1
    });
  });
});
