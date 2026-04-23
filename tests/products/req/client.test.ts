import { describe, expect, it, vi } from "vitest";
import { createReqClient } from "../../../src/products/req/client.js";

function createPageInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  };
}

function createProjectInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "p-1",
    ...(overrides ?? {})
  };
}

function createProjectPageInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "p-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  };
}

function createProjectWorkItemInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "p-1",
    work_item_id: "70779173",
    ...(overrides ?? {})
  };
}

describe("createReqClient", () => {
  it("normalizes project_name into name when listing projects", async () => {
    const client = createReqClient({
      get: async () => ({
        projects: [{ project_id: "p-1", project_name: "Demo", project_num_id: 7 }],
        total: 1
      })
    } as never);

    const result = await client.listProjects(createPageInput());

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

    const first = await client.listProjects(createPageInput());
    now += 1_000;
    const second = await client.listProjects(createPageInput());

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

    const first = await client.listProjects(createPageInput());
    now += 30_001;
    const second = await client.listProjects(createPageInput());

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
      client.listProjects(createPageInput()),
      client.listProjects(createPageInput())
    ]);

    expect(left.total).toBe(1);
    expect(right.total).toBe(1);
    expect(get).toHaveBeenCalledTimes(1);
  });

  it("keeps the default project list cache alive beyond the legacy 15 second window", async () => {
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
        now: () => now
      }
    );

    await client.listProjects(createPageInput());
    now += 20_000;
    await client.listProjects(createPageInput());

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

    const result = await client.getProject(createProjectInput({ project_id: "p-2" }));

    expect(result).toEqual({
      project_id: "p-2",
      name: "Codearts-mcp",
      project_num_id: 13548721,
      description: "demo"
    });
  });

  it("maps createProject to the scrum project endpoint and response fields", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          project_id: "project-1",
          project_name: "Alpha",
          description: "Demo project",
          project_num_id: 101,
          project_type: "scrum"
        };
      }
    } as never);

    const result = await client.createProject({
      name: "Alpha",
      description: "Demo project"
    });

    expect(requestedPath).toBe("/v4/project");
    expect(requestedBody).toEqual({
      project_name: "Alpha",
      description: "Demo project",
      project_type: "scrum"
    });
    expect(result).toEqual({
      project_id: "project-1",
      project_name: "Alpha",
      description: "Demo project",
      project_num_id: 101,
      project_type: "scrum"
    });
  });

  it("maps updateProject to the project update endpoint and synthesized response", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      put: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return undefined;
      }
    } as never);

    const result = await client.updateProject({
      project_id: "project-1",
      name: "Alpha 2",
      description: "Updated project"
    });

    expect(requestedPath).toBe("/v4/projects/project-1");
    expect(requestedBody).toEqual({
      project_name: "Alpha 2",
      description: "Updated project"
    });
    expect(result).toEqual({
      project_id: "project-1",
      project_name: "Alpha 2",
      description: "Updated project"
    });
  });

  it("maps deleteProject to the project delete endpoint and synthesized response", async () => {
    let requestedPath = "";
    const client = createReqClient({
      delete: async (path: string) => {
        requestedPath = path;

        return undefined;
      }
    } as never);

    const result = await client.deleteProject({
      project_id: "project-1"
    });

    expect(requestedPath).toBe("/v4/projects/project-1");
    expect(result).toEqual({
      project_id: "project-1",
      deleted: true
    });
  });

  it("maps checkProjectName to the name check endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          exist: false
        };
      }
    } as never);

    const result = await client.checkProjectName({
      name: "Alpha"
    });

    expect(requestedPath).toBe("/v4/projects/check-name");
    expect(requestedBody).toEqual({
      project_name: "Alpha"
    });
    expect(result).toEqual({
      exist: false
    });
  });

  it("maps listNotAddedProjects to the domain not-added endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          projects: [
            {
              project_id: "project-1",
              project_name: "Alpha",
              project_num_id: 101,
              description: "Demo project",
              project_type: "scrum"
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listNotAddedProjects(createPageInput());

    expect(requestedPath).toBe("/v4/projects/domain/not-added?offset=0&limit=20");
    expect(result).toEqual({
      projects: [
        {
          project_id: "project-1",
          project_name: "Alpha",
          project_num_id: 101,
          description: "Demo project",
          project_type: "scrum"
        }
      ],
      total: 1
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
      ...createProjectInput(),
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
        ...createProjectPageInput()
      }),
      client.getWorkItem(createProjectWorkItemInput())
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

    const result = await client.listWorkItems(createProjectPageInput());

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
