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

function createProjectIterationInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "p-1",
    iteration_id: "301",
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

  it("maps addProjectMember to the member add endpoint and synthesized response", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return undefined;
      }
    } as never);

    const result = await client.addProjectMember({
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      domain_name: "tenant-a",
      role_id: -1
    });

    expect(requestedPath).toBe("/v4/projects/project-1/member");
    expect(requestedBody).toEqual({
      user_id: "user-1",
      domain_id: "domain-1",
      domain_name: "tenant-a",
      role_id: -1
    });
    expect(result).toEqual({
      project_id: "project-1",
      user_id: "user-1",
      domain_id: "domain-1",
      domain_name: "tenant-a",
      role_id: -1,
      added: true
    });
  });

  it("maps batchAddProjectMembers to the members add endpoint and synthesized response", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return undefined;
      }
    } as never);

    const result = await client.batchAddProjectMembers({
      project_id: "project-1",
      members: [
        { user_id: "user-1", role_id: 3 },
        { user_id: "user-2" }
      ]
    });

    expect(requestedPath).toBe("/v4/projects/project-1/members");
    expect(requestedBody).toEqual({
      users: [
        { user_id: "user-1", role_id: 3 },
        { user_id: "user-2" }
      ]
    });
    expect(result).toEqual({
      project_id: "project-1",
      members: [
        { user_id: "user-1", role_id: 3 },
        { user_id: "user-2" }
      ],
      addedCount: 2
    });
  });

  it("maps batchDeleteProjectMembers to the members delete endpoint and synthesized response", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      delete: async (path: string, body?: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return undefined;
      }
    } as never);

    const result = await client.batchDeleteProjectMembers({
      project_id: "project-1",
      user_ids: ["user-1", "user-2"]
    });

    expect(requestedPath).toBe("/v4/projects/project-1/members");
    expect(requestedBody).toEqual({
      user_ids: ["user-1", "user-2"]
    });
    expect(result).toEqual({
      project_id: "project-1",
      user_ids: ["user-1", "user-2"],
      removedCount: 2
    });
  });

  it("maps updateProjectMemberRole to the member role endpoint and wraps user_ids", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return undefined;
      }
    } as never);

    const result = await client.updateProjectMemberRole({
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5
    });

    expect(requestedPath).toBe("/v4/projects/project-1/members/role");
    expect(requestedBody).toEqual({
      role_id: 5,
      user_ids: ["user-1"]
    });
    expect(result).toEqual({
      project_id: "project-1",
      user_id: "user-1",
      role_id: 5,
      updated: true
    });
  });

  it("maps leaveProject to the quit endpoint and synthesized response", async () => {
    let requestedPath = "";
    const client = createReqClient({
      delete: async (path: string) => {
        requestedPath = path;

        return undefined;
      }
    } as never);

    const result = await client.leaveProject({
      project_id: "project-1"
    });

    expect(requestedPath).toBe("/v4/projects/project-1/quit");
    expect(result).toEqual({
      project_id: "project-1",
      left: true
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

  it("uses iteration detail, create, update and delete endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: Record<string, unknown> }> = [];
    const client = createReqClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });

        return {
          iteration_id: 301,
          name: "Sprint 3",
          begin_time: "2026-04-01",
          end_time: "2026-04-14",
          description: "Ship Task 4",
          status: "1",
          progress: "68"
        };
      },
      post: async (path: string, body: Record<string, unknown>) => {
        requests.push({ method: "POST", path, body });

        return {
          id: 302
        };
      },
      put: async (path: string, body: Record<string, unknown>) => {
        requests.push({ method: "PUT", path, body });

        return undefined;
      },
      delete: async (path: string) => {
        requests.push({ method: "DELETE", path });

        return undefined;
      }
    } as never);

    const [detail, created, updated, deleted] = await Promise.all([
      client.getIteration(createProjectIterationInput()),
      client.createIteration({
        project_id: "p-1",
        name: "Sprint 4",
        begin_time: "2026-04-15",
        end_time: "2026-04-28",
        description: "Close backlog"
      }),
      client.updateIteration({
        project_id: "p-1",
        iteration_id: "301",
        name: "Sprint 3 Updated",
        begin_time: "2026-04-02",
        end_time: "2026-04-15",
        description: "Updated scope",
        status: "2",
        over_type: "auto"
      }),
      client.deleteIteration(createProjectIterationInput())
    ]);

    expect(requests).toEqual([
      {
        method: "GET",
        path: "/v4/iterations/301"
      },
      {
        method: "POST",
        path: "/v4/projects/p-1/iteration",
        body: {
          name: "Sprint 4",
          begin_time: "2026-04-15",
          end_time: "2026-04-28",
          description: "Close backlog"
        }
      },
      {
        method: "PUT",
        path: "/v4/projects/p-1/iterations/301",
        body: {
          name: "Sprint 3 Updated",
          begin_time: "2026-04-02",
          end_time: "2026-04-15",
          description: "Updated scope",
          status: "2",
          over_type: "auto"
        }
      },
      {
        method: "DELETE",
        path: "/v4/projects/p-1/iterations/301"
      }
    ]);
    expect(detail).toEqual({
      iteration_id: 301,
      name: "Sprint 3",
      begin_time: "2026-04-01",
      end_time: "2026-04-14",
      description: "Ship Task 4",
      status: "1",
      progress: "68"
    });
    expect(created).toEqual({
      id: 302,
      project_id: "p-1",
      name: "Sprint 4",
      begin_time: "2026-04-15",
      end_time: "2026-04-28",
      description: "Close backlog"
    });
    expect(updated).toEqual({
      project_id: "p-1",
      iteration_id: "301",
      name: "Sprint 3 Updated",
      begin_time: "2026-04-02",
      end_time: "2026-04-15",
      description: "Updated scope",
      status: "2",
      over_type: "auto"
    });
    expect(deleted).toEqual({
      project_id: "p-1",
      iteration_id: "301",
      deleted: true
    });
  });

  it("uses batch delete, state update and immovable-issues iteration endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: Record<string, unknown> }> = [];
    const client = createReqClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });

        return {
          number: "REQ-12",
          id: 991,
          status_id: 7,
          status_name: "Blocked"
        };
      },
      post: async (path: string, body: Record<string, unknown>) => {
        requests.push({ method: "POST", path, body });

        return {
          result: "",
          status: "success"
        };
      },
      delete: async (path: string, body?: Record<string, unknown>) => {
        requests.push({ method: "DELETE", path, body });

        return undefined;
      }
    } as never);

    const [batchDeleted, stateUpdated, issues] = await Promise.all([
      client.batchDeleteIterations({
        project_id: "p-1",
        iteration_ids: ["iter-alpha", "iter-beta"]
      }),
      client.updateIterationState({
        project_id: "p-1",
        iteration_id: "301",
        name: "Sprint 3",
        status: "2",
        start_date: "2026-04-01",
        due_date: "2026-04-14"
      }),
      client.queryIterationImmovableIssues({
        project_id: "p-1",
        version_id: "301"
      })
    ]);

    expect(requests).toEqual([
      {
        method: "DELETE",
        path: "/v4/projects/p-1/iterations",
        body: {
          iteration_ids: ["iter-alpha", "iter-beta"]
        }
      },
      {
        method: "POST",
        path: "/v2/version/state/update",
        body: {
          project_id: "p-1",
          id: "301",
          name: "Sprint 3",
          status: "2",
          start_date: "2026-04-01",
          due_date: "2026-04-14"
        }
      },
      {
        method: "GET",
        path: "/v2/version/query-immovable-issues?project_id=p-1&version_id=301"
      }
    ]);
    expect(batchDeleted).toEqual({
      project_id: "p-1",
      iteration_ids: ["iter-alpha", "iter-beta"],
      deletedCount: 2
    });
    expect(stateUpdated).toEqual({
      project_id: "p-1",
      iteration_id: "301",
      name: "Sprint 3",
      status: "2",
      start_date: "2026-04-01",
      due_date: "2026-04-14",
      result: "",
      update_status: "success"
    });
    expect(issues).toEqual({
      items: [
        {
          number: "REQ-12",
          id: 991,
          status_id: 7,
          status_name: "Blocked"
        }
      ]
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

  it("maps deleteWorkItem to the issue delete endpoint and synthesized response", async () => {
    let requestedPath = "";
    const client = createReqClient({
      delete: async (path: string) => {
        requestedPath = path;

        return undefined;
      }
    } as never);

    const result = await client.deleteWorkItem(createProjectWorkItemInput());

    expect(requestedPath).toBe("/v4/projects/p-1/issues/70779173");
    expect(result).toEqual({
      project_id: "p-1",
      work_item_id: "70779173",
      deleted: true
    });
  });

  it("maps batchUpdateWorkItems to the batch-update endpoint with id and attribute keys", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      put: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return undefined;
      }
    } as never);

    const result = await client.batchUpdateWorkItems({
      project_id: "p-1",
      work_item_ids: ["70779173", "70779174"],
      status_id: 3,
      priority_id: 2
    });

    expect(requestedPath).toBe("/v2/projects/p-1/issues/batch-update");
    expect(requestedBody).toEqual({
      id: ["70779173", "70779174"],
      attribute: {
        status_id: 3,
        priority_id: 2
      }
    });
    expect(result).toEqual({
      project_id: "p-1",
      work_item_ids: ["70779173", "70779174"],
      status_id: 3,
      priority_id: 2,
      updatedCount: 2
    });
  });

  it("maps listWorkItemRecords to the singular issue records endpoint and normalizes payloads", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          records: [
            {
              id: 11,
              created_time: "2026-02-11T10:00:00Z",
              user: {
                user_id: "user-1",
                user_name: "alice",
                user_num_id: 101,
                nick_name: "Alice"
              },
              details: [
                {
                  id: 91,
                  name: "status",
                  old_value: "New",
                  new_value: "Doing",
                  operation: "update",
                  property: "status_id"
                }
              ]
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listWorkItemRecords({
      project_id: "p-1",
      work_item_id: "70779173",
      page: 2,
      page_size: 10,
      journalized_type: "Issue"
    });

    expect(requestedPath).toBe(
      "/v4/projects/p-1/issue/70779173/records?offset=10&limit=10&journalizedType=Issue"
    );
    expect(result).toEqual({
      records: [
        {
          id: 11,
          created_time: "2026-02-11T10:00:00Z",
          user: {
            user_id: "user-1",
            user_name: "alice",
            user_num_id: 101,
            nick_name: "Alice"
          },
          details: [
            {
              id: 91,
              name: "status",
              old_value: "New",
              new_value: "Doing",
              operation: "update",
              property: "status_id"
            }
          ]
        }
      ],
      total: 1
    });
  });

  it("maps listWorkItemComments to the v4 comments endpoint and normalizes payloads", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          comments: [
            {
              id: 88,
              comment: "Looks good",
              created_time: "2026-04-20T10:00:00Z",
              timestamp: 1_745_145_600_000,
              user: {
                nick_name: "Alice",
                user_name: "alice",
                user_num_id: 1001
              }
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listWorkItemComments({
      project_id: "p-1",
      work_item_id: "70779173",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/70779173/comments?offset=10&limit=10");
    expect(result).toEqual({
      comments: [
        {
          id: 88,
          comment: "Looks good",
          created_time: "2026-04-20T10:00:00Z",
          timestamp: 1_745_145_600_000,
          user: {
            nick_name: "Alice",
            user_name: "alice",
            user_num_id: 1001
          }
        }
      ],
      total: 1
    });
  });

  it("maps addWorkItemComment to the legacy notes endpoint and synthesizes a stable response", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            issue: {
              id: 70779173
            }
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.addWorkItemComment({
      project_id: "p-1",
      work_item_id: "70779173",
      content: "First comment"
    });

    expect(requestedPath).toBe("/v2/issues/update-issue-notes");
    expect(requestedBody).toEqual({
      id: "70779173",
      notes: "First comment",
      project_uuid: "p-1",
      type: "scrum"
    });
    expect(result).toEqual({
      work_item_id: "70779173",
      content: "First comment"
    });
  });

  it("rejects addWorkItemComment when the legacy notes endpoint does not report success", async () => {
    const client = createReqClient({
      post: async () => ({
        result: {
          issue: {
            id: 70779173
          }
        }
      })
    } as never);

    await expect(
      client.addWorkItemComment({
        project_id: "p-1",
        work_item_id: "70779173",
        content: "First comment"
      })
    ).rejects.toThrow(/did not report success/i);
  });

  it("maps updateWorkItemComment to the issue-note endpoint and preserves stable fields", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            status: "success"
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.updateWorkItemComment({
      project_id: "p-1",
      work_item_id: "70779173",
      comment_id: "88",
      content: "Updated comment"
    });

    expect(requestedPath).toBe("/v2/workitem/issue-note");
    expect(requestedBody).toEqual({
      id: "70779173",
      noteId: "88",
      notes: "Updated comment",
      projectUUId: "p-1",
      type: "scrum"
    });
    expect(result).toEqual({
      work_item_id: "70779173",
      comment_id: "88",
      content: "Updated comment",
      status: "success"
    });
  });

  it("rejects updateWorkItemComment when the issue-note endpoint returns a non-success status", async () => {
    const client = createReqClient({
      post: async () => ({
        result: {
          status: "error"
        },
        status: "error"
      })
    } as never);

    await expect(
      client.updateWorkItemComment({
        project_id: "p-1",
        work_item_id: "70779173",
        comment_id: "88",
        content: "Updated comment"
      })
    ).rejects.toThrow(/did not report success/i);
  });
});
