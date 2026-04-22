import { describe, expect, it, vi } from "vitest";
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

  it("reuses a short-lived cache for repeated identical repository list calls", async () => {
    let now = 1_000;
    const get = vi.fn(async () => [{ id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }]);
    const client = createRepoClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => now
      }
    );

    const first = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });
    now += 1_000;
    const second = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });

    expect(second).toEqual(first);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("refreshes the repository list cache after the short cache window expires", async () => {
    let now = 1_000;
    const get = vi
      .fn()
      .mockResolvedValueOnce([{ id: 1, name: "sample-1" }])
      .mockResolvedValueOnce([{ id: 2, name: "sample-2" }]);
    const client = createRepoClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => now
      }
    );

    const first = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });
    now += 30_001;
    const second = await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });

    expect(first.repositories[0]?.id).toBe(1);
    expect(second.repositories[0]?.id).toBe(2);
    expect(get).toHaveBeenCalledTimes(2);
  });

  it("deduplicates concurrent listRepositories calls for the same key", async () => {
    const get = vi.fn(async () => [{ id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }]);
    const client = createRepoClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => 1_000
      }
    );

    const [left, right] = await Promise.all([
      client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 }),
      client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 })
    ]);

    expect(left.total).toBe(1);
    expect(right.total).toBe(1);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("keeps the default repository list cache alive beyond the legacy 15 second window", async () => {
    let now = 1_000;
    const get = vi.fn(async () => [{ id: 1, name: "sample", ssh_url: "git@example.com:sample.git" }]);
    const client = createRepoClient(
      {
        get
      } as never,
      {
        now: () => now
      }
    );

    await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });
    now += 20_000;
    await client.listRepositories({ project_id: "p-1", page: 1, page_size: 20 });

    expect(get).toHaveBeenCalledTimes(1);
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

  it("uses the official create repository path and normalizes the response", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: {
            repository_uuid: "repo-uuid-1",
            project_uuid: "project-uuid-1"
          }
        };
      }
    } as never);

    const result = await client.createRepository({
      project_uuid: "project-uuid-1",
      name: "demo-repo",
      import_members: 1,
      template_id: "template-1",
      visibility_level: 20,
      enable_readme: true,
      description: "demo repository"
    });

    expect(requestedPath).toBe("/v1/repositories");
    expect(requestedBody).toEqual({
      project_uuid: "project-uuid-1",
      name: "demo-repo",
      import_members: 1,
      template_id: "template-1",
      visibility_level: 20,
      enable_readme: 1,
      description: "demo repository"
    });
    expect(result).toEqual({
      repository_uuid: "repo-uuid-1",
      project_uuid: "project-uuid-1"
    });
  });

  it("omits undefined optional fields when creating a repository", async () => {
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (_path: string, body: Record<string, unknown>) => {
        requestedBody = body;
        return {
          repository_uuid: "repo-uuid-2",
          project_uuid: "project-uuid-2"
        };
      }
    } as never);

    await client.createRepository({
      project_uuid: "project-uuid-2",
      name: "minimal-repo"
    });

    expect(requestedBody).toStrictEqual({
      project_uuid: "project-uuid-2",
      name: "minimal-repo"
    });
  });

  it("normalizes boolean enable_readme values to provider integers", async () => {
    let requestedBody: Record<string, unknown> | undefined;
    const client = createRepoClient({
      post: async (_path: string, body: Record<string, unknown>) => {
        requestedBody = body;
        return {
          result: {
            repository_uuid: "repo-uuid-3"
          },
          status: "success"
        };
      }
    } as never);

    await client.createRepository({
      project_uuid: "project-uuid-3",
      name: "bool-readme-repo",
      enable_readme: true
    });

    expect(requestedBody).toStrictEqual({
      project_uuid: "project-uuid-3",
      name: "bool-readme-repo",
      enable_readme: 1
    });
  });

  it("throws when the provider returns a failed create repository envelope", async () => {
    const client = createRepoClient({
      post: async () => ({
        error: {
          code: "CH.000001",
          message: "JSON parse error"
        },
        status: "failed"
      })
    } as never);

    await expect(
      client.createRepository({
        project_uuid: "project-uuid-4",
        name: "failed-repo",
        enable_readme: true
      })
    ).rejects.toMatchObject({
      name: "AppError",
      message: "JSON parse error",
      code: "CH.000001"
    });
  });
});
