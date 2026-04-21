import { describe, expect, it, vi } from "vitest";
import { createReqClient } from "../../../src/products/req/client.js";

describe("createReqClient", () => {
  it("normalizes project_name into name when listing projects", async () => {
    const client = createReqClient({
      get: async () => ({
        projects: [{ project_id: "p-1", project_name: "Demo", project_num_id: 7 }],
        total: 1
      })
    } as never);

    const result = await client.listProjects({ page: 1, page_size: 20 });

    expect(result.projects).toEqual([{ project_id: "p-1", name: "Demo", project_num_id: 7 }]);
  });

  it("reuses a short-lived cache for repeated identical project list calls", async () => {
    let now = 1_000;
    const get = vi.fn(async () => ({
      projects: [{ project_id: "p-1", project_name: "Demo", project_num_id: 7 }],
      total: 1
    }));
    const client = createReqClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => now
      }
    );

    const first = await client.listProjects({ page: 1, page_size: 20 });
    now += 1_000;
    const second = await client.listProjects({ page: 1, page_size: 20 });

    expect(second).toEqual(first);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("refreshes the project list cache after the short cache window expires", async () => {
    let now = 1_000;
    const get = vi
      .fn()
      .mockResolvedValueOnce({
        projects: [{ project_id: "p-1", project_name: "Demo 1", project_num_id: 7 }],
        total: 1
      })
      .mockResolvedValueOnce({
        projects: [{ project_id: "p-2", project_name: "Demo 2", project_num_id: 8 }],
        total: 1
      });
    const client = createReqClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => now
      }
    );

    const first = await client.listProjects({ page: 1, page_size: 20 });
    now += 30_001;
    const second = await client.listProjects({ page: 1, page_size: 20 });

    expect(first.projects[0]?.project_id).toBe("p-1");
    expect(second.projects[0]?.project_id).toBe("p-2");
    expect(get).toHaveBeenCalledTimes(2);
  });

  it("deduplicates concurrent listProjects calls for the same key", async () => {
    const get = vi.fn(async () => ({
      projects: [{ project_id: "p-1", project_name: "Demo", project_num_id: 7 }],
      total: 1
    }));
    const client = createReqClient(
      {
        get
      } as never,
      {
        listCacheTtlMs: 30_000,
        now: () => 1_000
      }
    );

    const [left, right] = await Promise.all([
      client.listProjects({ page: 1, page_size: 20 }),
      client.listProjects({ page: 1, page_size: 20 })
    ]);

    expect(left.total).toBe(1);
    expect(right.total).toBe(1);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("reads nested project payload when getting a project", async () => {
    const client = createReqClient({
      get: async () => ({
        project: {
          project_id: "p-2",
          name: "Codearts-mcp",
          project_num_id: 13548721,
          description: "demo"
        }
      })
    } as never);

    const result = await client.getProject({ project_id: "p-2" });

    expect(result).toEqual({
      project_id: "p-2",
      name: "Codearts-mcp",
      project_num_id: 13548721,
      description: "demo"
    });
  });

  it("sends a default priority when creating a work item", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          id: 101,
          name: "Add login"
        };
      }
    } as never);

    const result = await client.createWorkItem({
      project_id: "p-1",
      title: "Add login",
      work_item_type: "task"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issue");
    expect(requestedBody).toEqual({
      name: "Add login",
      description: undefined,
      tracker_id: 2,
      priority_id: 2
    });
    expect(result.id).toBe(101);
  });

  it("uses issues endpoints when listing and getting work items", async () => {
    const requestedPaths: string[] = [];
    const client = createReqClient({
      get: async (path: string) => {
        requestedPaths.push(path);

        if (path.includes("/issues?")) {
          return {
            total: 1,
            issues: [
              {
                id: 70779173,
                subject: "mcp-live-smoke",
                status: { name: "新建" },
                tracker: { name: "Task" }
              }
            ]
          };
        }

        return {
          id: 70779173,
          name: "mcp-live-smoke-updated",
          status: { name: "新建" },
          tracker: { name: "Task" },
          description: "temporary live smoke item"
        };
      }
    } as never);

    const [list, detail] = await Promise.all([
      client.listWorkItems({
        project_id: "p-1",
        page: 1,
        page_size: 20
      }),
      client.getWorkItem({
        project_id: "p-1",
        work_item_id: "70779173"
      })
    ]);

    expect(requestedPaths).toContain("/v4/projects/p-1/issues?offset=0&limit=20");
    expect(requestedPaths).toContain("/v4/projects/p-1/issues/70779173");
    expect(list).toEqual({
      work_items: [
        {
          id: 70779173,
          subject: "mcp-live-smoke",
          status: { name: "新建" },
          tracker_name: "Task"
        }
      ],
      total: 1
    });
    expect(detail).toEqual({
      id: 70779173,
      subject: "mcp-live-smoke-updated",
      status: { name: "新建" },
      tracker_name: "Task",
      description: "temporary live smoke item"
    });
  });

  it("parses stringified issue-list payloads", async () => {
    const client = createReqClient({
      get: async () =>
        JSON.stringify({
          total: 1,
          issues: [
            {
              id: 70779181,
              subject: "mcp-live-smoke-updated",
              status: { name: "新建" },
              tracker: { name: "Task" }
            }
          ]
        })
    } as never);

    const result = await client.listWorkItems({
      project_id: "p-1",
      page: 1,
      page_size: 20
    });

    expect(result).toEqual({
      work_items: [
        {
          id: 70779181,
          subject: "mcp-live-smoke-updated",
          status: { name: "新建" },
          tracker_name: "Task"
        }
      ],
      total: 1
    });
  });
});
