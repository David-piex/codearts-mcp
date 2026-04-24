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

  it("uses project module list, create, update and delete endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: Record<string, unknown> }> = [];
    const client = createReqClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });

        return {
          modules: [
            {
              module_id: 7,
              module_name: "Backend",
              description: "API module"
            }
          ],
          total: 1
        };
      },
      post: async (path: string, body: Record<string, unknown>) => {
        requests.push({ method: "POST", path, body });

        return {
          module_id: 8,
          module_name: "Frontend",
          description: "UI module"
        };
      },
      put: async (path: string, body: Record<string, unknown>) => {
        requests.push({ method: "PUT", path, body });

        return {
          module_id: 7,
          module_name: "Backend API",
          description: "Updated API module"
        };
      },
      delete: async (path: string) => {
        requests.push({ method: "DELETE", path });

        return undefined;
      }
    } as never);

    const [listed, created, updated, deleted] = await Promise.all([
      client.listProjectModules(createProjectPageInput()),
      client.createProjectModule({
        project_id: "p-1",
        module_name: "Frontend",
        owner_user_id: "user-1",
        parent_module_id: 1,
        description: "UI module"
      }),
      client.updateProjectModule({
        project_id: "p-1",
        module_id: "7",
        module_name: "Backend API",
        owner_user_id: "user-1",
        description: "Updated API module"
      }),
      client.deleteProjectModule({
        project_id: "p-1",
        module_id: "7"
      })
    ]);

    expect(requests).toEqual([
      {
        method: "GET",
        path: "/v4/projects/p-1/modules?offset=0&limit=20"
      },
      {
        method: "POST",
        path: "/v4/projects/p-1/module",
        body: {
          module_name: "Frontend",
          description: "UI module",
          parent_module_id: 1,
          owner: {
            user_id: "user-1"
          }
        }
      },
      {
        method: "PUT",
        path: "/v4/projects/p-1/modules/7",
        body: {
          module_name: "Backend API",
          description: "Updated API module",
          owner: {
            user_id: "user-1"
          }
        }
      },
      {
        method: "DELETE",
        path: "/v4/projects/p-1/modules/7"
      }
    ]);
    expect(listed).toEqual({
      modules: [
        {
          module_id: 7,
          module_name: "Backend",
          description: "API module"
        }
      ],
      total: 1
    });
    expect(created).toEqual({
      module_id: 8,
      module_name: "Frontend",
      description: "UI module",
      owner: undefined
    });
    expect(updated).toEqual({
      module_id: 7,
      module_name: "Backend API",
      description: "Updated API module",
      owner: undefined
    });
    expect(deleted).toEqual({
      project_id: "p-1",
      module_id: "7",
      deleted: true
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
      work_item_type: "task",
      iteration_id: "iteration-1",
      module_id: "module-1",
      severity_id: 11,
      assigned_id: "user-2",
      done_ratio: 20,
      expected_work_hours: 8,
      start_date: 1839340800000,
      due_date: 1839945600000
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issue");
    expect(requestedBody).toEqual({
      name: "Add login",
      description: undefined,
      tracker_id: 2,
      priority_id: 2,
      iteration_id: "iteration-1",
      module_id: "module-1",
      severity_id: 11,
      assigned_id: "user-2",
      done_ratio: 20,
      expected_work_hours: 8,
      start_date: 1839340800000,
      due_date: 1839945600000
    });
    expect(result.id).toBe(101);
  });

  it("maps updateWorkItem to the issue detail endpoint with extended mutable fields", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      put: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          id: 70779173,
          name: "Refine login flow",
          description: "Clarify edge cases",
          status: { id: 3, name: "Doing" },
          tracker: { id: 7, name: "Story" }
        };
      }
    } as never);

    const result = await client.updateWorkItem({
      project_id: "p-1",
      work_item_id: "70779173",
      title: "Refine login flow",
      description: "Clarify edge cases",
      status_id: 3,
      work_item_type: "Story",
      priority_id: 1,
      iteration_id: "iteration-1",
      module_id: "module-1",
      severity_id: 11,
      assigned_id: "user-2",
      done_ratio: 60,
      expected_work_hours: 13,
      start_date: 1839340800000,
      due_date: 1839945600000
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/70779173");
    expect(requestedBody).toEqual({
      name: "Refine login flow",
      description: "Clarify edge cases",
      status_id: 3,
      tracker_id: 7,
      priority_id: 1,
      iteration_id: "iteration-1",
      module_id: "module-1",
      severity_id: 11,
      assigned_id: "user-2",
      done_ratio: 60,
      expected_work_hours: 13,
      start_date: 1839340800000,
      due_date: 1839945600000
    });
    expect(result).toEqual({
      id: 70779173,
      name: "Refine login flow",
      description: "Clarify edge cases",
      status: { id: 3, name: "Doing" },
      tracker: { id: 7, name: "Story" }
    });
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
      priority_id: 2,
      severity_id: 11,
      assigned_id: "user-2",
      done_ratio: 40,
      iteration_id: "iteration-1",
      module_id: "module-1"
    });

    expect(requestedPath).toBe("/v2/projects/p-1/issues/batch-update");
    expect(requestedBody).toEqual({
      id: ["70779173", "70779174"],
      attribute: {
        status_id: 3,
        priority_id: 2,
        severity_id: 11,
        assigned_id: "user-2",
        done_ratio: 40,
        iteration_id: "iteration-1",
        module_id: "module-1"
      }
    });
    expect(result).toEqual({
      project_id: "p-1",
      work_item_ids: ["70779173", "70779174"],
      status_id: 3,
      priority_id: 2,
      severity_id: 11,
      assigned_id: "user-2",
      done_ratio: 40,
      iteration_id: "iteration-1",
      module_id: "module-1",
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

  it("maps work item work hour queries to the v3 work-hours endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            total: 1,
            data: [
              {
                id: "wh-1",
                issue_id: 70779173,
                user_id: "user-1",
                user_num_id: 1001,
                user_name: "alice",
                nick_name: "Alice",
                work_date: "2025/07/25",
                work_date_timestamp: "1753372800000",
                work_hours: "1.0",
                region: "example"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listWorkItemWorkHours({
      project_id: "p-1",
      work_item_id: "70779173"
    });

    expect(requestedPath).toBe("/v3/projects/p-1/issues/70779173/work-hours");
    expect(result).toEqual({
      work_hours: [
        {
          id: "wh-1",
          issue_id: 70779173,
          user_id: "user-1",
          user_num_id: 1001,
          user_name: "alice",
          nick_name: "Alice",
          work_date: "2025/07/25",
          work_date_timestamp: "1753372800000",
          work_hours: "1.0",
          region: "example"
        }
      ],
      total: 1
    });
  });

  it("maps work item image uploads to the documented multipart endpoint", async () => {
    let requestedPath = "";
    let uploadedFileName = "";
    let uploadedFileText = "";
    let uploadedContentType = "";
    const client = createReqClient({
      postMultipart: async (path: string, body: FormData) => {
        requestedPath = path;
        const file = body.get("file");

        if (!(file instanceof File)) {
          throw new Error("expected multipart file");
        }

        uploadedFileName = file.name;
        uploadedFileText = await file.text();
        uploadedContentType = file.type;

        return {
          img_id: "1",
          img_url: "/v1/upload/demo/202604/demo.png"
        };
      }
    } as never);

    const result = await client.uploadIssueImage({
      project_id: "p-1",
      file_name: "demo.png",
      file_content: new Uint8Array([102, 97, 107, 101]),
      content_type: "image/png"
    });

    expect(requestedPath).toBe("/v2/p-1/img");
    expect(uploadedFileName).toBe("demo.png");
    expect(uploadedFileText).toBe("fake");
    expect(uploadedContentType).toBe("image/png");
    expect(result).toEqual({
      project_id: "p-1",
      file_name: "demo.png",
      img_id: "1",
      img_url: "/v1/upload/demo/202604/demo.png"
    });
  });

  it("maps image file downloads to the documented binary endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      getBinary: async (path: string) => {
        requestedPath = path;

        return {
          body: new Uint8Array([1, 2, 3]),
          contentType: "image/png",
          fileName: "demo.png"
        };
      }
    } as never);

    const result = await client.downloadImageFile({
      project_id: "p-1",
      image_uri: "/v1/upload/demo/202604/demo.png"
    });

    expect(requestedPath).toBe(
      "/v4/projects/p-1/image-file?image_uri=%2Fv1%2Fupload%2Fdemo%2F202604%2Fdemo.png"
    );
    expect(result).toEqual({
      image_uri: "/v1/upload/demo/202604/demo.png",
      body: new Uint8Array([1, 2, 3]),
      content_type: "image/png",
      file_name: "demo.png"
    });
  });

  it("maps work item attachment uploads to the documented multipart endpoint", async () => {
    let requestedPath = "";
    let uploadedFileName = "";
    let uploadedFileText = "";
    let uploadedContentType = "";
    const client = createReqClient({
      postMultipart: async (path: string, body: FormData) => {
        requestedPath = path;
        const file = body.get("attachment");

        if (!(file instanceof File)) {
          throw new Error("expected multipart attachment");
        }

        uploadedFileName = file.name;
        uploadedFileText = await file.text();
        uploadedContentType = file.type;

        return {
          disk_filename: "disk-demo",
          file_name: "demo.txt",
          id: 72372,
          issue_id: 70779173,
          project_id: "p-1",
          size: "4"
        };
      }
    } as never);

    const result = await client.uploadAttachment({
      project_id: "p-1",
      work_item_id: "70779173",
      file_name: "demo.txt",
      file_content: new Uint8Array([102, 97, 107, 101]),
      content_type: "text/plain"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/70779173/attachments/upload");
    expect(uploadedFileName).toBe("demo.txt");
    expect(uploadedFileText).toBe("fake");
    expect(uploadedContentType).toBe("text/plain");
    expect(result).toEqual({
      project_id: "p-1",
      work_item_id: "70779173",
      attachment_id: "72372",
      disk_filename: "disk-demo",
      file_name: "demo.txt",
      size: "4"
    });
  });

  it("maps work item attachment downloads to the documented binary endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      getBinary: async (path: string) => {
        requestedPath = path;

        return {
          body: new Uint8Array([1, 2, 3, 4]),
          contentType: "text/plain",
          fileName: "demo.txt"
        };
      }
    } as never);

    const result = await client.downloadAttachment({
      project_id: "p-1",
      work_item_id: "70779173",
      attachment_id: "72372"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/70779173/attachments/72372");
    expect(result).toEqual({
      project_id: "p-1",
      work_item_id: "70779173",
      attachment_id: "72372",
      body: new Uint8Array([1, 2, 3, 4]),
      content_type: "text/plain",
      file_name: "demo.txt"
    });
  });

  it("maps add work item work hour to the v3 work-hours endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            data: [
              {
                id: "wh-1",
                issue_id: 70779173,
                user_id: "user-1",
                user_num_id: 1001,
                user_name: "alice",
                nick_name: "Alice",
                work_date: "2025/07/25",
                work_date_timestamp: "1753372800000",
                work_hours: "1.0",
                region: "example"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.addWorkItemWorkHour({
      project_id: "p-1",
      work_item_id: "70779173",
      work_hours: 1,
      start_date: "2025-07-25",
      due_date: "2025-07-25",
      region: "example"
    });

    expect(requestedPath).toBe("/v3/projects/p-1/issues/70779173/work-hours");
    expect(requestedBody).toEqual({
      work_hours: 1,
      start_date: "2025-07-25",
      due_date: "2025-07-25",
      region: "example"
    });
    expect(result).toEqual({
      id: "wh-1",
      work_item_id: "70779173",
      user_id: "user-1",
      user_num_id: 1001,
      user_name: "alice",
      nick_name: "Alice",
      work_date: "2025/07/25",
      work_date_timestamp: "1753372800000",
      work_hours: "1.0",
      region: "example"
    });
  });

  it("maps attachment deletion to the documented attachment endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      delete: async (path: string) => {
        requestedPath = path;
        return null;
      }
    } as never);

    const result = await client.deleteAttachment({
      project_id: "p-1",
      work_item_id: "70779173",
      attachment_id: "72372"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/70779173/attachments/72372");
    expect(result).toEqual({
      project_id: "p-1",
      work_item_id: "70779173",
      attachment_id: "72372",
      deleted: true
    });
  });

  it("maps associated wiki queries to the documented wiki endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          total: 1,
          wikis: [
            {
              issue_id: 70779173,
              wiki_title: "Design Notes",
              wiki_author: {
                user_num_id: 4091,
                user_id: "user-1",
                user_name: "alice",
                nick_name: "Alice"
              },
              project: {
                project_name: "Payments",
                project_id: "p-1"
              },
              created_date: "2021-11-18 19:47:34",
              wiki_id: "1839097",
              region: "region01"
            }
          ]
        };
      }
    } as never);

    const result = await client.listAssociatedWikis({
      project_id: "p-1",
      work_item_id: "70779173",
      page: 2,
      page_size: 20
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/70779173/associated-wikis?limit=20&offset=20");
    expect(result).toEqual({
      total: 1,
      wikis: [
        {
          issue_id: 70779173,
          wiki_title: "Design Notes",
          wiki_author: {
            user_num_id: 4091,
            user_id: "user-1",
            user_name: "alice",
            nick_name: "Alice"
          },
          project: {
            project_name: "Payments",
            project_id: "p-1"
          },
          created_date: "2021-11-18 19:47:34",
          wiki_id: "1839097",
          region: "region01"
        }
      ]
    });
  });

  it("maps project domain queries to the documented domain endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          total: 2,
          domains: [
            {
              domain_id: "domain-1",
              domain_name: "性能"
            },
            {
              domain_id: "domain-2",
              domain_name: "功能"
            }
          ]
        };
      }
    } as never);

    const result = await client.listProjectDomains({
      project_id: "p-1",
      page: 2,
      page_size: 20
    });

    expect(requestedPath).toBe("/v4/projects/p-1/domains?offset=20&limit=20");
    expect(result).toEqual({
      total: 2,
      domains: [
        {
          domain_id: "domain-1",
          domain_name: "性能"
        },
        {
          domain_id: "domain-2",
          domain_name: "功能"
        }
      ]
    });
  });

  it("maps project work hour queries to the v4 project work-hours endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          total: 1,
          work_hours: [
            {
              issue_id: 69813204,
              issue_type: "Story",
              subject: "Align acceptance criteria",
              project_name: "Payments",
              user_id: "user-1",
              user_name: "alice",
              nick_name: "Alice",
              work_date: "2020-02-19",
              work_hours_num: "1.0",
              summary: "Backend development"
            }
          ]
        };
      }
    } as never);

    const result = await client.listProjectWorkHours({
      page: 2,
      page_size: 10,
      project_ids: ["p-1", "p-2"],
      begin_time: "2025-07-01",
      end_time: "2025-07-31",
      work_hours_dates: "2025-07-02,2025-07-03",
      work_hours_types: "21,22"
    });

    expect(requestedPath).toBe("/v4/projects/work-hours");
    expect(requestedBody).toEqual({
      offset: 10,
      limit: 10,
      project_ids: ["p-1", "p-2"],
      begin_time: "2025-07-01",
      end_time: "2025-07-31",
      work_hours_dates: "2025-07-02,2025-07-03",
      work_hours_types: "21,22"
    });
    expect(result).toEqual({
      work_hours: [
        {
          issue_id: 69813204,
          issue_type: "Story",
          subject: "Align acceptance criteria",
          project_name: "Payments",
          user_id: "user-1",
          user_name: "alice",
          nick_name: "Alice",
          work_date: "2020-02-19",
          work_hours_num: "1.0",
          summary: "Backend development"
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

  it("maps associated issue queries to the legacy associate endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            associateIssues: {
              issues: [
                {
                  id: 9132318,
                  subject: "Align acceptance criteria",
                  status_id: 3,
                  status_name: "Resolved",
                  new_status_name: "Resolved",
                  status_attribute_name: "Done",
                  project_name: "Payments",
                  identifier: "REQ-88",
                  assigned_to: {
                    assigned_user_id: "user-1",
                    assigned_user_num_id: 101,
                    assigned_nick_name: "Alice",
                    name: "alice"
                  }
                }
              ],
              total_count: 1
            }
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listAssociatedIssues({
      project_id: "p-1",
      work_item_id: "70779173",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe(
      "/v2/issues/inquire-associate?project_id=p-1&issue_id=70779173&page_no=2&page_size=10"
    );
    expect(result).toEqual({
      issues: [
        {
          id: 9132318,
          subject: "Align acceptance criteria",
          status_id: 3,
          status_name: "Resolved",
          new_status_name: "Resolved",
          status_attribute_name: "Done",
          project_name: "Payments",
          identifier: "REQ-88",
          assigned_to: {
            assigned_user_id: "user-1",
            assigned_user_num_id: 101,
            assigned_nick_name: "Alice",
            name: "alice"
          }
        }
      ],
      total: 1
    });
  });

  it("maps associated commit queries to the v4 associated-commits endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          commits: [
            {
              branch_name: "feature/login",
              commit_id: "abc123def456",
              commit_msg: "feat: add login flow",
              commit_short_id: "abc123d",
              commit_url: "https://example.com/commit/abc123def456",
              create_date: "2026-04-23T10:00:00Z",
              repository_id: "repo-1",
              type: "commit",
              update_date: "2026-04-23T10:05:00Z",
              user: {
                nick_name: "Alice",
                user_id: "user-1"
              }
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listAssociatedCommits({
      project_id: "p-1",
      work_item_id: "70779173",
      page: 2,
      page_size: 10,
      type: "branch"
    });

    expect(requestedPath).toBe(
      "/v4/projects/p-1/issues/70779173/associated-commits?type=branch&offset=10&limit=10"
    );
    expect(result).toEqual({
      commits: [
        {
          branch_name: "feature/login",
          commit_id: "abc123def456",
          commit_msg: "feat: add login flow",
          commit_short_id: "abc123d",
          commit_url: "https://example.com/commit/abc123def456",
          create_date: "2026-04-23T10:00:00Z",
          repository_id: "repo-1",
          type: "commit",
          update_date: "2026-04-23T10:05:00Z",
          user: {
            nick_name: "Alice",
            user_id: "user-1"
          }
        }
      ],
      total: 1
    });
  });

  it("maps associated test case queries to the v4 associate-test-cases endpoint with local pagination", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          test_cases: [
            {
              case_id: "case-1",
              case_level: "P1",
              case_name: "Login succeeds",
              case_num: "TC-101",
              created_time: 1_745_392_000_000
            },
            {
              case_id: "case-2",
              case_level: "P2",
              case_name: "Login fails",
              case_num: "TC-102",
              created_time: 1_745_392_100_000
            }
          ],
          total: 2
        };
      }
    } as never);

    const result = await client.listAssociatedTestCases({
      project_id: "p-1",
      work_item_id: "70779173",
      page: 2,
      page_size: 1
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/70779173/associate-test-cases");
    expect(result).toEqual({
      test_cases: [
        {
          case_id: "case-2",
          case_level: "P2",
          case_name: "Login fails",
          case_num: "TC-102",
          created_time: 1_745_392_100_000
        }
      ],
      total: 2
    });
  });

  it("maps related users queries to the documented related-user endpoint", async () => {
    const get = vi.fn(async () => ({
      result: {
        related_author_list: [
          {
            user_name: "alice",
            user_num_id: 101,
            user_id: "user-1",
            domain_id: "domain-1",
            domain_name: "tenant-a",
            nick_name_py: "alice"
          }
        ],
        related_assignee_list: [],
        related_developer_list: []
      },
      status: "success"
    }));
    const client = createReqClient({
      get
    } as never);

    const result = await client.listRelatedUsers({
      project_id: "p-1"
    });

    expect(get).toHaveBeenCalledWith("/v1/related-user/p-1/all");
    expect(result).toEqual({
      project_id: "p-1",
      related_author_list: [
        {
          user_name: "alice",
          user_num_id: 101,
          user_id: "user-1",
          domain_id: "domain-1",
          domain_name: "tenant-a",
          nick_name_py: "alice"
        }
      ],
      related_assignee_list: [],
      related_developer_list: []
    });
  });

  it("maps work item statuses queries to the documented statuses endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          total: 1,
          issue_statuses: [
            {
              id: "status-1",
              status_id: 1,
              name: "新建",
              tracker_ids: [2, 7],
              status_attribute: {
                id: 1,
                name: "开始态"
              }
            }
          ]
        };
      }
    } as never);

    const result = await client.listWorkItemStatuses({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/statuses");
    expect(result).toEqual({
      issue_statuses: [
        {
          id: "status-1",
          status_id: 1,
          name: "新建",
          tracker_ids: [2, 7],
          status_attribute: {
            id: 1,
            name: "开始态"
          }
        }
      ],
      total: 1
    });
  });

  it("maps work item status attribute and detail queries to the documented endpoints", async () => {
    const requestedPaths: string[] = [];
    const client = createReqClient({
      get: async (path: string) => {
        requestedPaths.push(path);

        if (path.startsWith("/v2/p-1/issue-status-attributes")) {
          return {
            issue_status_attributes: [
              {
                name: "开始态",
                type: "START",
                project_id: "p-1"
              }
            ],
            total: 1
          };
        }

        return {
          result: {
            issue_statuses: [
              {
                id: 1,
                status_id: "status-1",
                name: "新建",
                is_closed: 0,
                is_initial: 1,
                issue_field_configs: [
                  {
                    field: "subject",
                    name: "标题",
                    field_type: "text"
                  }
                ],
                issue_status_attribute: {
                  project_id: "p-1",
                  name: "开始态",
                  type: "START"
                }
              }
            ],
            initial: [
              {
                id: 1,
                status_id: "status-1",
                name: "新建",
                is_closed: 0
              }
            ]
          }
        };
      }
    } as never);

    const [attributes, details] = await Promise.all([
      client.listWorkItemStatusAttributes({
        project_id: "p-1"
      }),
      client.listWorkItemStatusDetails({
        project_id: "p-1",
        tracker_id: 7
      })
    ]);

    expect(requestedPaths).toEqual([
      "/v2/p-1/issue-status-attributes",
      "/v2/issue-status/all?project_id=p-1&tracker_id=7"
    ]);
    expect(attributes).toEqual({
      issue_status_attributes: [
        {
          name: "开始态",
          type: "START",
          project_id: "p-1"
        }
      ],
      total: 1
    });
    expect(details).toEqual({
      project_id: "p-1",
      tracker_id: 7,
      grouped_statuses: {
        initial: [
          {
            id: 1,
            status_id: "status-1",
            name: "新建",
            is_closed: 0
          }
        ]
      },
      issue_statuses: [
        {
          id: 1,
          status_id: "status-1",
          name: "新建",
          is_closed: 0,
          is_initial: 1,
          issue_field_configs: [
            {
              field: "subject",
              name: "标题",
              field_type: "text"
            }
          ],
          issue_status_attribute: {
            project_id: "p-1",
            name: "开始态",
            type: "START"
          }
        }
      ]
    });
  });

  it("maps work item status config and project public config queries to the documented endpoints", async () => {
    const requestedPaths: string[] = [];
    const client = createReqClient({
      get: async (path: string) => {
        requestedPaths.push(path);

        if (path.startsWith("/v3/issue-status/issue-status-config")) {
          return {
            result: {
              issueStatus: [
                {
                  trackerList: [7],
                  id: "status-1",
                  statusId: 1,
                  definedName: "新建",
                  is_initial: true,
                  issueStatusAttribute: {
                    id: 1,
                    name: "开始态",
                    type: "START"
                  }
                }
              ],
              workitem_readonly_mode: true
            }
          };
        }

        if (path.startsWith("/v2/issue-status/optional-status-config")) {
          return {
            result: {
              issueStatus: [
                {
                  trackerList: [7],
                  id: "status-2",
                  statusId: 2,
                  definedName: "处理中",
                  is_closed: false
                }
              ]
            }
          };
        }

        return {
          closed_workitem_readonly_mode: true
        };
      }
    } as never);

    const [configs, optionalConfigs, publicConfig] = await Promise.all([
      client.listWorkItemStatusConfigs({
        project_id: "p-1",
        tracker_id: 7
      }),
      client.listOptionalWorkItemStatusConfigs({
        project_id: "p-1",
        tracker_id: 7
      }),
      client.getProjectPublicConfig({
        project_id: "p-1"
      })
    ]);

    expect(requestedPaths).toEqual([
      "/v3/issue-status/issue-status-config?projectUUId=p-1&trackerId=7",
      "/v2/issue-status/optional-status-config?projectUUId=p-1&trackerId=7",
      "/v4/project/p-1/public-configs"
    ]);
    expect(configs).toEqual({
      project_id: "p-1",
      tracker_id: 7,
      issue_statuses: [
        {
          trackerList: [7],
          id: "status-1",
          statusId: 1,
          definedName: "新建",
          is_initial: true,
          issueStatusAttribute: {
            id: 1,
            name: "开始态",
            type: "START"
          }
        }
      ],
      workitem_readonly_mode: true
    });
    expect(optionalConfigs).toEqual({
      project_id: "p-1",
      tracker_id: 7,
      issue_statuses: [
        {
          trackerList: [7],
          id: "status-2",
          statusId: 2,
          definedName: "处理中",
          is_closed: false
        }
      ]
    });
    expect(publicConfig).toEqual({
      project_id: "p-1",
      closed_workitem_readonly_mode: true
    });
  });

  it("maps work item workflow config queries to the documented workflow config endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          workflows: [
            {
              id: "flow-1",
              name: "新建",
              status_id: 1,
              direct_to: [
                {
                  id: "flow-2",
                  name: "进行中",
                  status_id: 2,
                  enabled: true
                }
              ]
            }
          ]
        };
      }
    } as never);

    const result = await client.listWorkItemWorkflowConfig({
      project_id: "p-1",
      tracker_id: 7
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/workflow/config?tracker_id=7");
    expect(result).toEqual({
      workflows: [
        {
          id: "flow-1",
          name: "新建",
          status_id: 1,
          direct_to: [
            {
              id: "flow-2",
              name: "进行中",
              status_id: 2,
              enabled: true
            }
          ]
        }
      ]
    });
  });

  it("maps work item templates queries to the documented templates endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          templates: [
            {
              id: 1793674,
              project_id: 30384422,
              tracker_id: 2,
              description: "",
              issue_field_config: "{\"fields\":[]}"
            }
          ]
        };
      }
    } as never);

    const result = await client.listWorkItemTemplates({
      project_id: "p-1",
      tracker_id: 2
    });

    expect(requestedPath).toBe("/v4/projects/p-1/templates?tracker_id=2");
    expect(result).toEqual({
      templates: [
        {
          id: 1793674,
          project_id: 30384422,
          tracker_id: 2,
          description: "",
          issue_field_config: "{\"fields\":[]}"
        }
      ]
    });
  });

  it("maps work item custom field queries to the documented custom-field endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            custom_field: [
              {
                tracker_list: ["2", "7"],
                region: "example",
                id: 492316,
                project_id: 34883337,
                tracker_id: -2,
                custom_field: "custom_field16",
                type: "text",
                name: "测试必填",
                sort: 1,
                memo: "",
                created: "2025-06-28 10:00:30",
                modified: "2025-06-28 10:00:30",
                is_delete: false
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listWorkItemCustomFields({
      project_id: "p-1",
      tracker_id: 3
    });

    expect(requestedPath).toBe("/v2/custom-field/query-custom-field?project_id=p-1&tracker_id=3");
    expect(result).toEqual({
      custom_field: [
        {
          tracker_list: ["2", "7"],
          region: "example",
          id: 492316,
          project_id: 34883337,
          tracker_id: -2,
          custom_field: "custom_field16",
          type: "text",
          name: "测试必填",
          sort: 1,
          memo: "",
          created: "2025-06-28 10:00:30",
          modified: "2025-06-28 10:00:30",
          is_delete: false
        }
      ]
    });
  });

  it("maps work item template config queries to the documented template config endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            templates: [
              {
                id: "tpl-1",
                name: "默认模板",
                issue_field_configs: [
                  {
                    field: "subject",
                    name: "标题",
                    field_type: "text",
                    default_value: "",
                    is_visible: true,
                    is_required: true,
                    position: 1,
                    tracker_list: [7]
                  }
                ]
              }
            ]
          }
        };
      }
    } as never);

    const result = await client.getWorkItemTemplateConfig({
      project_id: "p-1",
      tracker_id: 7
    });

    expect(requestedPath).toBe("/v2/template/config?projectUUId=p-1&trackerId=7");
    expect(result).toEqual({
      project_id: "p-1",
      tracker_id: 7,
      templates: [
        {
          id: "tpl-1",
          name: "默认模板",
          issue_field_configs: [
            {
              field: "subject",
              name: "标题",
              field_type: "text",
              default_value: "",
              is_visible: true,
              is_required: true,
              position: 1,
              tracker_list: [7]
            }
          ]
        }
      ]
    });
  });

  it("maps work item status rule flag queries to the documented status-rule-flag endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            statusRuleFlag: {
              tracker_config_id: "tracker-config-1",
              issue_field_config: true,
              code_commit: false
            }
          }
        };
      }
    } as never);

    const result = await client.getWorkItemStatusRuleFlag({
      project_id: "p-1",
      tracker_id: 7
    });

    expect(requestedPath).toBe("/v2/issue-status/status-rule-flag?project_id=p-1&tracker_id=7");
    expect(result).toEqual({
      project_id: "p-1",
      tracker_id: 7,
      status_rule_flag: {
        tracker_config_id: "tracker-config-1",
        issue_field_config: true,
        code_commit: false
      }
    });
  });

  it("maps work item tracker handler queries to the documented tracker-handler-config endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          tracker_handlers: [
            {
              handler_id: -1,
              handler_name: "处理人"
            }
          ]
        };
      }
    } as never);

    const result = await client.listWorkItemTrackerHandlers({
      project_id: "p-1",
      tracker_id: 7
    });

    expect(requestedPath).toBe("/v4/issue-status/tracker-handler-config?project_id=p-1&tracker_id=7");
    expect(result).toEqual({
      tracker_handlers: [
        {
          handler_id: -1,
          handler_name: "处理人"
        }
      ]
    });
  });

  it("maps board work item queries to the documented board work-items endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          work_items: [
            {
              id: "4633454879781163008",
              subject: "看板卡片示例",
              sequence: "5500756",
              priority: "低",
              important: "提示",
              severity: "一般",
              status: {
                id: "status-1",
                name: "新建"
              }
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listBoardWorkItems({
      project_id: "p-1",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe("/v4/projects/p-1/work-items?offset=10&limit=10");
    expect(result).toEqual({
      work_items: [
        {
          id: "4633454879781163008",
          subject: "看板卡片示例",
          sequence: "5500756",
          priority: "低",
          important: "提示",
          severity: "一般",
          status: {
            id: "status-1",
            name: "新建"
          }
        }
      ],
      total: 1
    });
  });

  it("maps board work item status record queries to the documented status-records endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          records: [
            {
              work_item_record_id: "record-1",
              work_item_id: "wi-1",
              project_id: "p-1",
              work_item_statuses: [
                {
                  id: "status-record-1",
                  status: {
                    id: "status-1",
                    name: "研发",
                    type: "IN_PROGRESS",
                    description: "demo",
                    parent_status_id: "parent-1"
                  }
                }
              ]
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listBoardWorkItemStatusRecords({
      project_id: "p-1",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe("/v4/projects/p-1/work-items/status-records?offset=10&limit=10");
    expect(result).toEqual({
      records: [
        {
          work_item_record_id: "record-1",
          work_item_id: "wi-1",
          project_id: "p-1",
          work_item_statuses: [
            {
              id: "status-record-1",
              status: {
                id: "status-1",
                name: "研发",
                type: "IN_PROGRESS",
                description: "demo",
                parent_status_id: "parent-1"
              }
            }
          ]
        }
      ],
      total: 1
    });
  });

  it("maps board work item workflow config queries to the documented board workflow config endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          workflows: [
            {
              parent_name: "进行中",
              parent_type: "IN_PROGRESS",
              status_id: "status-1",
              name: "研发",
              status_type: "IN_PROGRESS",
              direct_to: [
                {
                  parent_name: "已完成",
                  parent_type: "COMPLETE",
                  status_id: "status-2",
                  name: "测试",
                  status_type: "COMPLETE",
                  enabled: true,
                  parent_id: "parent-2"
                }
              ],
              assign_to: "user-1",
              comment: "A transfer to B",
              required_assign: false,
              required_notes: true,
              field_type: false,
              parent_id: "parent-1"
            }
          ]
        };
      }
    } as never);

    const result = await client.listBoardWorkItemWorkflowConfig({
      project_id: "p-1",
      board_id: "board-1"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/work-items/workflow/config?board_id=board-1");
    expect(result).toEqual({
      workflows: [
        {
          parent_name: "进行中",
          parent_type: "IN_PROGRESS",
          status_id: "status-1",
          name: "研发",
          status_type: "IN_PROGRESS",
          direct_to: [
            {
              parent_name: "已完成",
              parent_type: "COMPLETE",
              status_id: "status-2",
              name: "测试",
              status_type: "COMPLETE",
              enabled: true,
              parent_id: "parent-2"
            }
          ],
          assign_to: "user-1",
          comment: "A transfer to B",
          required_assign: false,
          required_notes: true,
          field_type: false,
          parent_id: "parent-1"
        }
      ]
    });
  });

  it("maps board cache field queries to the documented jobcache board endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            id: 1111,
            fields: [
              {
                id: "subject",
                header: "标题",
                type: "text",
                show: true
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listJobCacheBoards({
      project_id: "p-1",
      type: "board",
      region: "cn-north-4"
    });

    expect(requestedPath).toBe("/v3/projects/p-1/jobcache/board?type=board&region=cn-north-4");
    expect(result).toEqual({
      cache_id: 1111,
      fields: [
        {
          id: "subject",
          header: "标题",
          type: "text",
          show: true
        }
      ]
    });
  });

  it("maps cache data queries to the documented list-cache endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            fields: [
              {
                trackerList: [2, 7],
                name: "标题",
                field: "subject",
                isCustom: false,
                type: "text",
                required: true,
                fieldGroup: "basic",
                sortable: true,
                priorityOption: [
                  {
                    id: "1",
                    name: "低"
                  }
                ]
              }
            ],
            visibleFields: [
              {
                trackerList: [7],
                name: "状态",
                field: "status",
                isCustom: false,
                type: "select",
                required: false,
                fieldGroup: "basic",
                sortable: true
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listCacheData({
      project_id: "p-1",
      type: "backlog"
    });

    expect(requestedPath).toBe("/v3/job-cache/list-cache");
    expect(requestedBody).toEqual({
      projectUUId: "p-1",
      type: "backlog"
    });
    expect(result).toEqual({
      project_id: "p-1",
      type: "backlog",
      fields: [
        {
          trackerList: [2, 7],
          name: "标题",
          field: "subject",
          isCustom: false,
          type: "text",
          required: true,
          fieldGroup: "basic",
          sortable: true,
          priorityOption: [
            {
              id: "1",
              name: "低"
            }
          ]
        }
      ],
      visible_fields: [
        {
          trackerList: [7],
          name: "状态",
          field: "status",
          isCustom: false,
          type: "select",
          required: false,
          fieldGroup: "basic",
          sortable: true
        }
      ]
    });
  });

  it("maps cache data updates to the documented update-cache endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            cache_id: 1111,
            updated_count: 2,
            fields: [
              {
                id: "subject",
                field: "subject",
                header: "Subject",
                type: "text",
                visible: true,
                order: 1
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.updateCacheData({
      project_id: "p-1",
      type: "backlog",
      region: "cn-north-4",
      visible_fields: ["subject", "status"],
      fields: [
        {
          field: "subject",
          visible: true,
          order: 1
        }
      ]
    });

    expect(requestedPath).toBe("/v3/job-cache/update-cache");
    expect(requestedBody).toEqual({
      projectUUId: "p-1",
      type: "backlog",
      region: "cn-north-4",
      visibleFields: ["subject", "status"],
      fields: [
        {
          field: "subject",
          visible: true,
          order: 1
        }
      ]
    });
    expect(result).toEqual({
      project_id: "p-1",
      type: "backlog",
      region: "cn-north-4",
      cache_id: 1111,
      updated_count: 2,
      fields: [
        {
          id: "subject",
          field: "subject",
          header: "Subject",
          type: "text",
          visible: true,
          order: 1
        }
      ]
    });
  });

  it("falls back to the related_user endpoint when the documented related-user path returns not_found", async () => {
    const get = vi
      .fn()
      .mockRejectedValueOnce({
        name: "AppError",
        category: "not_found",
        status: 404
      })
      .mockResolvedValueOnce({
        result: {
          related_author_list: [],
          related_assignee_list: [
            {
              user_name: "bob",
              user_num_id: 102,
              user_id: "user-2",
              domain_id: "domain-1",
              domain_name: "tenant-a",
              nick_name_py: "bob"
            }
          ],
          related_developer_list: []
        },
        status: "success"
      });
    const client = createReqClient({
      get
    } as never);

    const result = await client.listRelatedUsers({
      project_id: "p-1"
    });

    expect(get).toHaveBeenNthCalledWith(1, "/v1/related-user/p-1/all");
    expect(get).toHaveBeenNthCalledWith(2, "/v1/related_user/p-1/all");
    expect(result).toEqual({
      project_id: "p-1",
      related_author_list: [],
      related_assignee_list: [
        {
          user_name: "bob",
          user_num_id: 102,
          user_id: "user-2",
          domain_id: "domain-1",
          domain_name: "tenant-a",
          nick_name_py: "bob"
        }
      ],
      related_developer_list: []
    });
  });

  it("maps updateWorkItemFlow to the issue-flowage endpoint and preserves normalized fields", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            issue: {
              id: 70779173,
              subject: "Align acceptance criteria",
              updated_on: "2026-04-23T10:00:00Z",
              tracker: {
                id: 7,
                name: "Story"
              },
              status: {
                id: 3,
                name: "Resolved"
              }
            }
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.updateWorkItemFlow({
      project_id: "p-1",
      work_item_id: "70779173",
      status_id: 3
    });

    expect(requestedPath).toBe("/v2/workitem/issue-flowage");
    expect(requestedBody).toEqual({
      status_id: 3,
      projectUUId: "p-1",
      id: "70779173",
      type: "scrum"
    });
    expect(result).toEqual({
      work_item_id: "70779173",
      title: "Align acceptance criteria",
      status_id: 3,
      status_name: "Resolved",
      type_id: 7,
      type_name: "Story",
      updated_on: "2026-04-23T10:00:00Z"
    });
  });

  it("rejects updateWorkItemFlow when the issue-flowage endpoint does not report success", async () => {
    const client = createReqClient({
      post: async () => ({
        result: {
          issue: {
            id: 70779173
          }
        },
        status: "error"
      })
    } as never);

    await expect(
      client.updateWorkItemFlow({
        project_id: "p-1",
        work_item_id: "70779173",
        status_id: 3
      })
    ).rejects.toThrow(/did not report success/i);
  });

  it("maps plan read endpoints to the documented request shapes", async () => {
    const get = vi
      .fn()
      .mockResolvedValueOnce({
        result: {
          total: 12,
          total_count: 12,
          issues: [
            {
              id: "plan-1",
              name: "2026 Q2",
              type: "release",
              project_id: "p-1"
            }
          ]
        }
      })
      .mockResolvedValueOnce({
        result: {
          id: "plan-1",
          name: "2026 Q2",
          type: "release",
          project_id: "p-1",
          creator: "alice",
          updater: "bob",
          created_on: "2026-04-01T00:00:00Z",
          updated_on: "2026-04-20T00:00:00Z"
        }
      });
    const post = vi
      .fn()
      .mockResolvedValueOnce({
        result: {
          total: 2,
          total_count: 2,
          issues: [
            {
              id: 101,
              subject: "Plan candidate",
              tracker: {
                id: 7,
                name: "Story"
              },
              status: {
                id: 1,
                name: "New"
              }
            }
          ]
        }
      })
      .mockResolvedValueOnce({
        result: {
          milestone_cur_count: 1,
          issue_cur_count: 1,
          issues_count: 3,
          issues: [
            {
              id: 102,
              subject: "Planned work item",
              tracker: {
                id: 6,
                name: "Epic"
              },
              status: {
                id: 2,
                name: "Doing"
              }
            }
          ]
        }
      });
    const client = createReqClient({
      get,
      post
    } as never);

    const plans = await client.listPlans({
      project_id: "p-1",
      page: 2,
      page_size: 10,
      status_id: 1
    });
    const plan = await client.getPlan({
      project_id: "p-1",
      plan_id: "plan-1"
    });
    const addable = await client.listPlanAddableWorkItems({
      project_id: "p-1",
      plan_id: "plan-1",
      page: 3,
      page_size: 5,
      subject: "candidate"
    });
    const planWorkItems = await client.listPlanWorkItems({
      project_id: "p-1",
      plan_id: "plan-1",
      page: 4,
      page_size: 6,
      subject: "delivery",
      show_type: "tree",
      tracker_id: 7
    });

    expect(get).toHaveBeenNthCalledWith(
      1,
      "/v2/workitem/plan?project_id=p-1&page_no=2&page_size=10&status_id=1"
    );
    expect(get).toHaveBeenNthCalledWith(2, "/v3/plan/p-1/plan-1/info");
    expect(post).toHaveBeenNthCalledWith(1, "/v3/plan/p-1/plan-1/addable-issues", {
      subject: "candidate",
      page_no: 3,
      page_size: 5
    });
    expect(post).toHaveBeenNthCalledWith(2, "/v3/plan/p-1/plan-1/issues", {
      show_type: "tree",
      subject: "delivery",
      pageNo: 4,
      pageSize: 6,
      tracker_id: 7
    });
    expect(plans).toEqual({
      plans: [
        {
          id: "plan-1",
          name: "2026 Q2",
          type: "release",
          project_id: "p-1"
        }
      ],
      total: 12
    });
    expect(plan).toEqual({
      id: "plan-1",
      name: "2026 Q2",
      type: "release",
      project_id: "p-1",
      creator: "alice",
      updater: "bob",
      created_on: "2026-04-01T00:00:00Z",
      updated_on: "2026-04-20T00:00:00Z"
    });
    expect(addable).toEqual({
      work_items: [
        {
          id: 101,
          subject: "Plan candidate",
          tracker: {
            id: 7,
            name: "Story"
          },
          status: {
            id: 1,
            name: "New"
          }
        }
      ],
      total: 2
    });
    expect(planWorkItems).toEqual({
      work_items: [
        {
          id: 102,
          subject: "Planned work item",
          tracker: {
            id: 6,
            name: "Epic"
          },
          status: {
            id: 2,
            name: "Doing"
          }
        }
      ],
      total: 3,
      milestone_cur_count: 1,
      issue_cur_count: 1,
      issues_count: 3
    });
  });

  it("maps iteration work item queries to the documented iteration issues endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          total: 1,
          issues: [
            {
              id: 102,
              subject: "Iteration item",
              tracker: {
                id: 7,
                name: "Story"
              },
              status: {
                id: 3,
                name: "Doing"
              }
            }
          ]
        };
      }
    } as never);

    const result = await client.listIterationWorkItems({
      project_id: "p-1",
      iteration_id: "301",
      page: 1,
      page_size: 20,
      keyword: "login",
      tracker_id: 7,
      status_id: 3
    });

    expect(requestedPath).toBe(
      "/v4/projects/p-1/iterations/301/issues?offset=0&limit=20&search=login&tracker_id=7&status_id=3"
    );
    expect(result).toEqual({
      work_items: [
        {
          id: 102,
          subject: "Iteration item",
          tracker: {
            id: 7,
            name: "Story"
          },
          status: {
            id: 3,
            name: "Doing"
          }
        }
      ],
      total: 1
    });
  });

  it("maps plan write endpoints to the documented request shapes", async () => {
    const requests: Array<{
      method: string;
      path: string;
      body?: Record<string, unknown> | string[];
    }> = [];
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requests.push({
          method: "POST",
          path,
          body
        });

        return {
          status: "success",
          result: {
            id: "plan-1",
            name: "2026 Q3",
            type: "mind",
            project_id: "p-1",
            img_url: "https://example.com/plan.png",
            creator: {
              user_id: "user-1",
              domain_id: "domain-1",
              nick_name: "Alice",
              first_name: "Alice"
            }
          }
        };
      },
      put: async (path: string, body: Record<string, unknown>) => {
        requests.push({
          method: "PUT",
          path,
          body
        });

        return {
          status: "success",
          result: {
            id: "plan-1",
            name: "2026 Q3 Updated",
            type: "mind",
            project_id: "p-1",
            img_url: "https://example.com/plan.png",
            creator: {
              user_id: "user-1",
              domain_id: "domain-1",
              nick_name: "Alice",
              first_name: "Alice"
            }
          }
        };
      },
      delete: async (path: string, body?: string[]) => {
        requests.push({
          method: "DELETE",
          path,
          body
        });

        return {
          status: "success"
        };
      }
    } as never);

    const [created, updated, deleted] = await Promise.all([
      client.createPlan({
        project_id: "p-1",
        name: "2026 Q3",
        type: "mind"
      }),
      client.updatePlan({
        project_id: "p-1",
        plan_id: "plan-1",
        name: "2026 Q3 Updated"
      }),
      client.deletePlan({
        project_id: "p-1",
        plan_id: "plan-1"
      })
    ]);

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v3/plan/p-1/management",
        body: {
          name: "2026 Q3",
          type: "mind"
        }
      },
      {
        method: "PUT",
        path: "/v3/plan/p-1/management/plan-1",
        body: {
          name: "2026 Q3 Updated"
        }
      },
      {
        method: "DELETE",
        path: "/v3/plan/p-1/management",
        body: ["plan-1"]
      }
    ]);
    expect(created).toEqual({
      id: "plan-1",
      name: "2026 Q3",
      type: "mind",
      project_id: "p-1",
      img_url: "https://example.com/plan.png",
      creator: {
        user_id: "user-1",
        domain_id: "domain-1",
        nick_name: "Alice",
        first_name: "Alice"
      }
    });
    expect(updated).toEqual({
      id: "plan-1",
      name: "2026 Q3 Updated",
      type: "mind",
      project_id: "p-1",
      img_url: "https://example.com/plan.png",
      creator: {
        user_id: "user-1",
        domain_id: "domain-1",
        nick_name: "Alice",
        first_name: "Alice"
      }
    });
    expect(deleted).toEqual({
      project_id: "p-1",
      plan_id: "plan-1",
      deleted: true
    });
  });

  it("maps plan work item write endpoints to the documented request shapes", async () => {
    const requests: Array<{
      method: string;
      path: string;
      body?: Record<string, unknown> | string[];
    }> = [];
    const client = createReqClient({
      post: async (path: string, body: string[]) => {
        requests.push({
          method: "POST",
          path,
          body
        });

        return {
          status: "success"
        };
      },
      delete: async (path: string) => {
        requests.push({
          method: "DELETE",
          path
        });

        return {
          status: "success"
        };
      }
    } as never);

    const [added, cleared] = await Promise.all([
      client.addPlanWorkItems({
        project_id: "p-1",
        plan_id: "plan-1",
        work_item_ids: ["70779173", "70779174"]
      }),
      client.clearPlanWorkItems({
        project_id: "p-1",
        plan_id: "plan-1"
      })
    ]);

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v3/plan/p-1/plan-1/issue",
        body: ["70779173", "70779174"]
      },
      {
        method: "DELETE",
        path: "/v3/plan/p-1/plan-1/issue"
      }
    ]);
    expect(added).toEqual({
      project_id: "p-1",
      plan_id: "plan-1",
      work_item_ids: ["70779173", "70779174"],
      addedCount: 2
    });
    expect(cleared).toEqual({
      project_id: "p-1",
      plan_id: "plan-1",
      cleared: true
    });
  });

  it("maps plan image update and filtered plan listing to the documented request shapes", async () => {
    const requests: Array<{
      method: string;
      path: string;
      body?: Record<string, unknown>;
    }> = [];
    const client = createReqClient({
      put: async (path: string, body: Record<string, unknown>) => {
        requests.push({
          method: "PUT",
          path,
          body
        });

        return {
          status: "success",
          result: {
            id: "plan-1",
            name: "2026 Q3",
            type: "mind",
            project_id: "p-1",
            img_url: "/v1/upload/demo/202604/abc123.png"
          }
        };
      },
      post: async (path: string, body: Record<string, unknown>) => {
        requests.push({
          method: "POST",
          path,
          body
        });

        return {
          plans: [
            {
              result: {
                id: "plan-1",
                name: "2026 Q3",
                type: "gantt",
                project_id: "p-1",
                img_url: "/v1/upload/demo/202604/abc123.png",
                creator: {
                  user_id: "user-1"
                }
              },
              status: "success"
            }
          ],
          total: 1,
          minds: 0,
          gantts: 1
        };
      }
    } as never);

    const [updated, searched] = await Promise.all([
      client.updatePlanImage({
        project_id: "p-1",
        plan_id: "plan-1",
        img_url: "/v1/upload/demo/202604/abc123.png"
      }),
      client.listPlans({
        project_id: "p-1",
        search: "Q3",
        user_ids: ["user-1"],
        sort: "name",
        type: "gantt",
        page: 1,
        page_size: 15
      })
    ]);

    expect(requests).toEqual([
      {
        method: "PUT",
        path: "/v3/plan/p-1/management/plan-1/img",
        body: {
          img_url: "/v1/upload/demo/202604/abc123.png"
        }
      },
      {
        method: "POST",
        path: "/v3/plan/p-1/managements",
        body: {
          search: "Q3",
          user_ids: ["user-1"],
          sort: "name",
          type: "gantt",
          page_no: 1,
          page_size: 15
        }
      }
    ]);
    expect(updated).toEqual({
      id: "plan-1",
      name: "2026 Q3",
      type: "mind",
      project_id: "p-1",
      img_url: "/v1/upload/demo/202604/abc123.png",
      updated: true
    });
    expect(searched).toEqual({
      plans: [
        {
          id: "plan-1",
          name: "2026 Q3",
          type: "gantt",
          project_id: "p-1",
          img_url: "/v1/upload/demo/202604/abc123.png",
          creator: {
            user_id: "user-1"
          }
        }
      ],
      total: 1,
      minds: 0,
      gantts: 1
    });
  });

  it("preserves legacy plan filters when enhanced plan listing uses the managements endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          plans: [],
          total: 0,
          minds: 0,
          gantts: 0
        };
      }
    } as never);

    const result = await client.listPlans({
      project_id: "p-1",
      plan_id: "plan-1",
      status_id: 2,
      search: "Q3",
      user_ids: ["user-1"],
      sort: "updated_on",
      type: "gantt",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe("/v3/plan/p-1/managements");
    expect(requestedBody).toEqual({
      plan_id: "plan-1",
      status_id: 2,
      search: "Q3",
      user_ids: ["user-1"],
      sort: "updated_on",
      type: "gantt",
      page_no: 2,
      page_size: 10
    });
    expect(result).toEqual({
      plans: [],
      total: 0,
      minds: 0,
      gantts: 0
    });
  });

  it("rejects plan image updates when the endpoint does not report success", async () => {
    const client = createReqClient({
      put: async () => ({
        status: "error",
        result: {
          id: "plan-1"
        }
      })
    } as never);

    await expect(
      client.updatePlanImage({
        project_id: "p-1",
        plan_id: "plan-1",
        img_url: "/v1/upload/demo/202604/abc123.png"
      })
    ).rejects.toThrow(/did not report success/i);
  });

  it("maps plan work item create to the documented request shape", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            issue: {
              id: 101,
              subject: "Epic A",
              description: "Plan item",
              status: { id: 1, name: "New" },
              tracker: { id: 5, name: "Epic" },
              project: { identifier: "p-1" }
            }
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.createPlanWorkItem({
      project_id: "p-1",
      title: "Epic A",
      work_item_type: "Epic",
      description: "Plan item",
      plan_id: "plan-1",
      parent_work_item_id: "88",
      priority_id: 3,
      severity_id: 11,
      start_date: 1839340800000,
      due_date: 1839945600000,
      status_id: 1,
      done_ratio: 10,
      expected_work_hours: 8
    });

    expect(requestedPath).toBe("/v2/issues/create");
    expect(requestedBody).toEqual({
      projectUUId: "p-1",
      tracker_id: 5,
      priority_id: 3,
      subject: "Epic A",
      parent_issue_id: 88,
      description: "Plan item",
      due_date: 1839945600000,
      start_date: 1839340800000,
      severity_id: 11,
      done_ratio: 10,
      status_id: 1,
      expected_work_hours: 8,
      plan_id: "plan-1"
    });
    expect(result).toEqual({
      id: 101,
      name: "Epic A",
      description: "Plan item",
      status: { id: 1, name: "New" },
      tracker: { id: 5, name: "Epic" },
      project_id: "p-1",
      plan_id: "plan-1"
    });
  });

  it("maps project statistics read endpoints to the documented request shapes", async () => {
    const get = vi
      .fn()
      .mockResolvedValueOnce({
        demand_statistics: [
          {
            module: "计费",
            total: 6,
            new_num: 1,
            process_num: 2,
            solved_num: 1,
            test_num: 1,
            closed_num: 1,
            rejected_num: 0
          }
        ]
      })
      .mockResolvedValueOnce({
        project_id: "p-1",
        bug_statistics: [
          {
            module: "计费",
            total: 2,
            critical_num: 0,
            serious_num: 1,
            normal_num: 1,
            tip_num: 0,
            defect_index: 1.5
          }
        ],
        demand_statistics: [
          {
            module: "计费",
            total: 6,
            new_num: 1,
            process_num: 2,
            solved_num: 1,
            test_num: 1,
            closed_num: 1,
            rejected_num: 0
          }
        ],
        issue_completion_rates: [
          {
            tracker_id: 7,
            issue_status: {
              new_num: 1,
              process_num: 2,
              solved_num: 1,
              test_num: 0,
              closed_num: 3,
              rejected_num: 0
            }
          }
        ]
      })
      .mockResolvedValueOnce({
        issue_completion_rates: [
          {
            tracker_id: 7,
            issue_status: {
              new_num: 1,
              process_num: 2,
              solved_num: 1,
              test_num: 0,
              closed_num: 3,
              rejected_num: 0
            }
          }
        ],
        total: 1
      });
    const client = createReqClient({
      get
    } as never);

    const demandStatistics = await client.listProjectDemandStatistics({
      project_id: "p-1"
    });
    const projectSummary = await client.getProjectSummary({
      project_id: "p-1"
    });
    const completionRate = await client.getWorkItemCompletionRate({
      project_id: "p-1"
    });

    expect(get).toHaveBeenNthCalledWith(1, "/v4/projects/p-1/demand-statistic");
    expect(get).toHaveBeenNthCalledWith(2, "/v4/projects/p-1/summary");
    expect(get).toHaveBeenNthCalledWith(3, "/v4/projects/p-1/issue-completion-rate");
    expect(demandStatistics).toEqual({
      project_id: "p-1",
      demand_statistics: [
        {
          module: "计费",
          total: 6,
          new_num: 1,
          process_num: 2,
          solved_num: 1,
          test_num: 1,
          closed_num: 1,
          rejected_num: 0
        }
      ]
    });
    expect(projectSummary).toEqual({
      project_id: "p-1",
      bug_statistics: [
        {
          module: "计费",
          total: 2,
          critical_num: 0,
          serious_num: 1,
          normal_num: 1,
          tip_num: 0,
          defect_index: 1.5
        }
      ],
      demand_statistics: [
        {
          module: "计费",
          total: 6,
          new_num: 1,
          process_num: 2,
          solved_num: 1,
          test_num: 1,
          closed_num: 1,
          rejected_num: 0
        }
      ],
      issue_completion_rates: [
        {
          tracker_id: 7,
          issue_status: {
            new_num: 1,
            process_num: 2,
            solved_num: 1,
            test_num: 0,
            closed_num: 3,
            rejected_num: 0
          }
        }
      ]
    });
    expect(completionRate).toEqual({
      project_id: "p-1",
      total: 1,
      issue_completion_rates: [
        {
          tracker_id: 7,
          issue_status: {
            new_num: 1,
            process_num: 2,
            solved_num: 1,
            test_num: 0,
            closed_num: 3,
            rejected_num: 0
          }
        }
      ]
    });
  });

  it("maps child work item queries to the documented child issue list endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            total_count: 1,
            issues: [
              {
                id: 9184453,
                subject: "task-标签过滤01",
                parent_issue: {
                  id: 9184452,
                  subject: "story-标签过滤01"
                },
                project: {
                  identifier: "p-1",
                  name: "Demo"
                },
                tracker: {
                  id: 2,
                  name: "Task"
                },
                status: {
                  id: 1,
                  name: "新建"
                }
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listChildWorkItems({
      project_id: "p-1",
      parent_id: "9184452",
      page: 1,
      page_size: 10,
      subject: "task",
      query_type: "basic"
    });

    expect(requestedPath).toBe("/v2/issues/child-issue-list");
    expect(requestedBody).toEqual({
      parent_id: 9184452,
      project_uuid: "p-1",
      subject: "task",
      query_type: "basic",
      page_no: 1,
      page_size: 10
    });
    expect(result).toEqual({
      work_items: [
        {
          id: 9184453,
          subject: "task-标签过滤01",
          parent_issue: {
            id: 9184452,
            subject: "story-标签过滤01"
          },
          project: {
            identifier: "p-1",
            name: "Demo"
          },
          tracker: {
            id: 2,
            name: "Task"
          },
          status: {
            id: 1,
            name: "新建"
          }
        }
      ],
      total: 1
    });
  });

  it("maps project work item record queries to the documented project records endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          records: [
            {
              id: 789,
              issue_id: 123,
              field_key: "status",
              field_name: "状态",
              new_value: "{\"id\":\"2\",\"name\":\"开发中\"}",
              old_value: "{\"id\":\"1\",\"name\":\"创建\"}",
              operated_time: 1601175640000,
              operation: "修改",
              property: "attr",
              operator: {
                id: 4091,
                name: "demo_user_name",
                nick_name: "张三"
              }
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listProjectWorkItemRecords({
      project_id: "p-1",
      page: 2,
      page_size: 10,
      operated_time_interval: "1601175600000,1601262000000"
    });

    expect(requestedPath).toBe(
      "/v4/projects/p-1/issues/records?offset=10&limit=10&operated_time_interval=1601175600000%2C1601262000000"
    );
    expect(result).toEqual({
      records: [
        {
          id: 789,
          issue_id: 123,
          field_key: "status",
          field_name: "状态",
          new_value: "{\"id\":\"2\",\"name\":\"开发中\"}",
          old_value: "{\"id\":\"1\",\"name\":\"创建\"}",
          operated_time: 1601175640000,
          operation: "修改",
          property: "attr",
          operator: {
            id: 4091,
            name: "demo_user_name",
            nick_name: "张三"
          }
        }
      ],
      total: 1
    });
  });

  it("maps work item tree count queries to the documented scrum issue tree count endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            total_count: 25
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.countWorkItemTree({
      project_id: "p-1",
      page: 1,
      page_size: 15,
      tracker_ids: [7, 2, 3]
    });

    expect(requestedPath).toBe("/v4/p-1/scrum-issue-tree-count");
    expect(requestedBody).toEqual({
      page_no: 1,
      page_size: 15,
      project_uuid: "p-1",
      tracker_id: "7,2,3"
    });
    expect(result).toEqual({
      project_id: "p-1",
      total_count: 25,
      tracker_ids: [7, 2, 3],
      page: 1,
      page_size: 15
    });
  });

  it("maps work item tree list queries to the documented scrum issue tree endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            total_count: 2,
            issues: [
              {
                id: 101,
                subject: "Parent story",
                status: {
                  id: "1",
                  name: "新建"
                },
                tracker: {
                  id: 7,
                  name: "Story"
                },
                assigned_to: {
                  id: "user-1",
                  name: "alice"
                },
                isParent: true
              },
              {
                id: 102,
                subject: "Child task",
                status: {
                  id: "2",
                  name: "处理中"
                },
                tracker: {
                  id: 2,
                  name: "Task"
                },
                assigned_to: {
                  id: "user-2",
                  name: "bob"
                },
                isParent: false
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listWorkItemTree({
      project_id: "p-1",
      page: 2,
      page_size: 20,
      tracker_ids: [7, 2]
    });

    expect(requestedPath).toBe("/v5/scrum/issue-tree");
    expect(requestedBody).toEqual({
      pageNo: 2,
      pageSize: 20,
      projectUUId: "p-1",
      tracker_id: "7,2"
    });
    expect(result).toEqual({
      project_id: "p-1",
      page: 2,
      page_size: 20,
      tracker_ids: [7, 2],
      work_items: [
        {
          id: 101,
          subject: "Parent story",
          status: {
            id: "1",
            name: "新建"
          },
          tracker: {
            id: 7,
            name: "Story"
          },
          assigned_to: {
            id: "user-1",
            name: "alice"
          },
          isParent: true
        },
        {
          id: 102,
          subject: "Child task",
          status: {
            id: "2",
            name: "处理中"
          },
          tracker: {
            id: 2,
            name: "Task"
          },
          assigned_to: {
            id: "user-2",
            name: "bob"
          },
          isParent: false
        }
      ],
      total: 2
    });
  });

  it("maps work item tag queries to the documented query-tags endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            tags: [
              {
                id: 88486,
                name: "backend",
                encode_name: "backend",
                tag_count: 3
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listWorkItemTags({
      project_id: "p-1",
      page: 2,
      page_size: 10,
      name: "back"
    });

    expect(requestedPath).toBe(
      "/v2/issues/query-tags?offset=10&limit=10&project_uuid=p-1&name=back"
    );
    expect(result).toEqual({
      tags: [
        {
          id: 88486,
          name: "backend",
          encode_name: "backend",
          tag_count: 3
        }
      ],
      total: 1
    });
  });

  it("maps work item index count queries to the documented scrum index-count endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            related_issue_count: 1,
            related_wiki_count: 2,
            related_test_case_count: 3,
            related_test_plan_count: 4,
            code_commit_count: 5,
            code_branch_count: 6,
            code_mergerequest_count: 7
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.getWorkItemIndexCounts({
      project_id: "p-1",
      work_item_id: "70779173"
    });

    expect(requestedPath).toBe(
      "/v3/workitem/scrum/index-count?issue_id=70779173&project_uuid=p-1"
    );
    expect(result).toEqual({
      project_id: "p-1",
      work_item_id: "70779173",
      related_issue_count: 1,
      related_wiki_count: 2,
      related_test_case_count: 3,
      related_test_plan_count: 4,
      code_commit_count: 5,
      code_branch_count: 6,
      code_mergerequest_count: 7
    });
  });

  it("maps due-days-after queries to the documented project-config endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          date_after: 7
        };
      }
    } as never);

    const result = await client.getProjectDueDaysAfter({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v4/project/project-configs/after?project_id=p-1");
    expect(result).toEqual({
      project_id: "p-1",
      date_after: 7
    });
  });

  it("maps workhour config queries to the documented project-config endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          workhour_type_required: false,
          workhour_readonly_mode: true
        };
      }
    } as never);

    const result = await client.getProjectWorkhourConfig({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v4/project/project-configs/workhour-config?project_id=p-1");
    expect(result).toEqual({
      project_id: "p-1",
      workhour_type_required: false,
      workhour_readonly_mode: true
    });
  });

  it("maps current user info queries to the documented user endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          domain_id: "domain-1",
          domain_name: "tenant-a",
          user_num_id: 4060,
          user_id: "user-1",
          user_name: "demo_user_name",
          nick_name: "Tom",
          created_time: 1562318865000,
          updated_time: 1598074854000,
          gender: "male",
          user_type: "User"
        };
      }
    } as never);

    const result = await client.getCurrentUserInfo({});

    expect(requestedPath).toBe("/v4/user");
    expect(result).toEqual({
      domain_id: "domain-1",
      domain_name: "tenant-a",
      user_num_id: 4060,
      user_id: "user-1",
      user_name: "demo_user_name",
      nick_name: "Tom",
      created_time: 1562318865000,
      updated_time: 1598074854000,
      gender: "male",
      user_type: "User"
    });
  });

  it("maps current user role queries to the documented user-role endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          user_role: 3
        };
      }
    } as never);

    const result = await client.getCurrentUserRole({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/user-role");
    expect(result).toEqual({
      project_id: "p-1",
      user_role: 3
    });
  });

  it("maps project bug statistic queries to the documented bug-statistic endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          bug_statistics: [
            {
              critical_num: 0,
              defect_index: 1,
              module: "统计分数",
              normal_num: 1,
              serious_num: 0,
              tip_num: 0,
              total: 1
            }
          ]
        };
      }
    } as never);

    const result = await client.listProjectBugStatistics({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/bug-statistic");
    expect(result).toEqual({
      project_id: "p-1",
      bug_statistics: [
        {
          critical_num: 0,
          defect_index: 1,
          module: "统计分数",
          normal_num: 1,
          serious_num: 0,
          tip_num: 0,
          total: 1
        }
      ]
    });
  });
});
