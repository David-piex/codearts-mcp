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

  it("maps official V2 module setting queries to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            total_count: 1,
            modules: [
              {
                id: 885859,
                name: "Promotion",
                path_name: "Promotion"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listModuleSettingsV2({
      project_id: "p-1",
      page: 2,
      page_size: 10,
      search: "Promotion"
    });

    expect(requestedPath).toBe(
      "/v2/module/modules?project_id=p-1&page_no=2&page_size=10&offset=10&limit=10&search=Promotion"
    );
    expect(result).toEqual({
      modules: [
        {
          id: 885859,
          name: "Promotion",
          path_name: "Promotion"
        }
      ],
      total: 1
    });
  });

  it("maps project template name validation to the documented V2 endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            exist: false
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.validateProjectTemplateName({
      name: "Scrum Template"
    });

    expect(requestedPath).toBe("/v2/project-template/name-validation?name=Scrum+Template");
    expect(result).toEqual({
      exist: false
    });
  });

  it("maps official V2 work item saved query requests to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            shared: [{ id: "q-1", name: "Shared query" }],
            created: [{ id: "q-2", name: "My query" }]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listWorkItemQueries({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v2/query/list-all?projectId=p-1&project_id=p-1");
    expect(result).toEqual({
      shared: [{ id: "q-1", name: "Shared query" }],
      created: [{ id: "q-2", name: "My query" }]
    });
  });

  it("maps DevUC project member queries to the documented V3 endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            member_list: [
              {
                user_id: "user-1",
                user_name: "alice",
                nick_name: "Alice",
                role_id: 3,
                role_name: "Member"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listDevucProjectMembers({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v3/projects/p-1/members");
    expect(result).toEqual({
      members: [
        {
          user_id: "user-1",
          user_name: "alice",
          nick_name: "Alice",
          role_id: 3,
          role_name: "Member"
        }
      ]
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
      parent_work_item_id: "9001",
      iteration_id: "iteration-1",
      module_id: "module-1",
      severity_id: 11,
      assigned_id: "user-2",
      developer_id: "4091",
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
      parent_issue_id: 9001,
      iteration_id: "iteration-1",
      module_id: "module-1",
      severity_id: 11,
      assigned_id: "user-2",
      developer_id: 4091,
      done_ratio: 20,
      expected_work_hours: 8,
      begin_time: "2028-04-15",
      end_time: "2028-04-22"
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
      developer_id: "4091",
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
      developer_id: 4091,
      done_ratio: 60,
      expected_work_hours: 13,
      begin_time: "2028-04-15",
      end_time: "2028-04-22"
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
                tracker: { name: "Task" },
                assigned_to: {
                  assigned_user_id: "user-1",
                  assigned_user_num_id: 101,
                  assigned_nick_name: "Alice"
                }
              }
            ]
          };
        }

        return {
          id: 70779173,
          name: "mcp-live-smoke-updated",
          status: { name: "新建" },
          tracker: { name: "Task" },
          description: "temporary live smoke item",
          start_date: "2028-04-12",
          due_date: "2028-04-19",
          assigned_to: {
            id: 16666,
            identifier: "user-uuid-2",
            name: "tenant/bob",
            assigned_nick_name: "Bob"
          }
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
          tracker: { name: "Task" },
          tracker_name: "Task",
          assigned_to: {
            assigned_user_id: "user-1",
            assigned_user_num_id: 101,
            assigned_nick_name: "Alice"
          }
        }
      ],
      total: 1
    });
    expect(detail).toEqual({
      id: 70779173,
      name: "mcp-live-smoke-updated",
      subject: "mcp-live-smoke-updated",
      status: { name: "新建" },
      tracker: { name: "Task" },
      tracker_name: "Task",
      description: "temporary live smoke item",
      start_date: "2028-04-12",
      due_date: "2028-04-19",
      assigned_to: {
        id: 16666,
        identifier: "user-uuid-2",
        name: "tenant/bob",
        assigned_nick_name: "Bob"
      }
    });
  });

  it("maps official V3 work item list requests to the documented issue-list endpoint", async () => {
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
                id: 70779173,
                subject: "V3 story",
                status: { name: "New" },
                tracker: { name: "Story" },
                updated_on: "1779328509000"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listWorkItemsV3({
      project_id: "p-1",
      page: 2,
      page_size: 10,
      tracker_id: "7"
    });

    expect(requestedPath).toBe("/v3/workitem/issue-list");
    expect(requestedBody).toEqual({
      page_no: "2",
      page_size: "10",
      project_id: "p-1",
      tracker_id: "7"
    });
    expect(result).toEqual({
      work_items: [
        {
          id: 70779173,
          subject: "V3 story",
          status: { name: "New" },
          tracker: { name: "Story" },
          updated_on: "1779328509000"
        }
      ],
      total: 1
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
              tracker: { name: "Task" },
              assigned_to: {
                assigned_user_id: "user-1",
                assigned_user_num_id: 101,
                assigned_nick_name: "Alice"
              }
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
          tracker: { name: "Task" },
          tracker_name: "Task",
          assigned_to: {
            assigned_user_id: "user-1",
            assigned_user_num_id: 101,
            assigned_nick_name: "Alice"
          }
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
      developer_id: "4091",
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
        developer_id: 4091,
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
      developer_id: "4091",
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

  it("maps official V2 work item record queries to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            journals_total: 1,
            record: [
              {
                id: 1,
                notes: "updated",
                created_on: "1779267066000"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listWorkItemRecordsV2({
      project_id: "p-1",
      work_item_id: "70844211",
      page: 2,
      page_size: 10,
      type: "scrum"
    });

    expect(requestedPath).toBe(
      "/v2/issues/get-record?project_id=p-1&issue_id=70844211&offset=10&limit=10&type=scrum"
    );
    expect(result).toEqual({
      records: [
        {
          id: 1,
          notes: "updated",
          created_on: "1779267066000"
        }
      ],
      total: 1
    });
  });

  it("maps official V4 child work item queries to the documented endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            "70779173": [
              {
                id: 70779174,
                subject: "Child story",
                status: { name: "New" },
                tracker: { name: "Story" }
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listChildWorkItemsV4({
      project_id: "p-1",
      parent_id: "70779173",
      tracker_id: "5,6,7,2,3",
      query_type: "basic"
    });

    expect(requestedPath).toBe("/v4/issues/child-issue-list");
    expect(requestedBody).toEqual({
      parent_ids: 70779173,
      project_id: "p-1",
      tracker_id: "5,6,7,2,3",
      queryType: "basic"
    });
    expect(result).toEqual({
      result: {
        "70779173": [
          {
            id: 70779174,
            subject: "Child story",
            status: { name: "New" },
            tracker: { name: "Story" }
          }
        ]
      }
    });
  });

  it("maps official assigned status config queries to the documented V3 endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: [
            {
              id: 11,
              name: "In Review",
              status_id: 3
            }
          ]
        };
      }
    } as never);

    const result = await client.listWorkItemAssignedStatusConfigs({
      project_id: "p-1",
      work_item_id: "70779173"
    });

    expect(requestedPath).toBe("/v3/workitem/p-1/issue-assigned/70779173");
    expect(result).toEqual({
      configs: [
        {
          id: 11,
          name: "In Review",
          status_id: 3
        }
      ]
    });
  });

  it("maps direct official V4 child work item queries to the documented project issue child endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: [
            {
              id: 70779174,
              subject: "Child story",
              status: { name: "New" }
            }
          ]
        };
      }
    } as never);

    const result = await client.listChildWorkItemsDirectV4({
      project_id: "p-1",
      work_item_id: "70779173"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/70779173/child");
    expect(result).toEqual({
      work_items: [
        {
          id: 70779174,
          subject: "Child story",
          status: { name: "New" }
        }
      ]
    });
  });

  it("maps findIterations to the v3 version find endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            versions: [
              {
                id: 101,
                name: "Sprint 1",
                status: "open",
                updated_time: 1_779_268_000_000
              }
            ],
            total: 1
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.findIterations({
      project_id: "p-1",
      updated_time_interval: "2026-05-01,2026-05-23"
    });

    expect(requestedPath).toBe(
      "/v3/version/find-version?projectId=p-1&updated_time_interval=2026-05-01%2C2026-05-23"
    );
    expect(result).toEqual({
      iterations: [
        {
          id: 101,
          name: "Sprint 1",
          status: "open",
          updated_time: 1_779_268_000_000
        }
      ],
      total: 1
    });
  });

  it("maps listProjectVersions to the official project versions endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            versions: [{ id: 21727203, name: "Sprint 1", status: "1" }],
            total_count: 1
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listProjectVersions({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v4/projects/p-1/versions");
    expect(result).toEqual({
      versions: [{ id: 21727203, name: "Sprint 1", status: "1" }],
      total: 1
    });
  });

  it("maps getVersionDetailV2 to the official V2 version detail endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            version: {
              id: 21727203,
              name: "Sprint 1",
              status: "1",
              total: 3
            }
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.getVersionDetailV2({
      version_id: "21727203"
    });

    expect(requestedPath).toBe("/v2/version/show?versionId=21727203");
    expect(result).toEqual({
      id: 21727203,
      name: "Sprint 1",
      status: "1",
      total: 3
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

  it("maps official V2 work item comment queries to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            journals_total: 1,
            comments: [
              {
                id: 1,
                notes: "ok",
                created_on: "1779267066000"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listWorkItemCommentsV2({
      project_id: "p-1",
      work_item_id: "70844211",
      page: 2,
      page_size: 10,
      type: "scrum"
    });

    expect(requestedPath).toBe(
      "/v2/issues/get-comments?issue_id=70844211&project_uuid=p-1&offset=10&limit=10&type=scrum"
    );
    expect(result).toEqual({
      comments: [
        {
          id: 1,
          notes: "ok",
          created_on: "1779267066000"
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

  it("maps work hour permission queries to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            is_history_processor: true
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.getWorkHourPermission({
      project_id: "p-1",
      work_item_id: "70779173"
    });

    expect(requestedPath).toBe("/v3/projects/p-1/issues/70779173/history-permission");
    expect(result).toEqual({
      project_id: "p-1",
      work_item_id: "70779173",
      is_history_processor: true
    });
  });

  it("maps member work hour queries to the v3 member work-hours endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            total: 1,
            work_hours: [
              {
                issue_id: 70779173,
                subject: "Story A",
                project_name: "mall",
                user_id: "user-1",
                nick_name: "szh",
                work_date: "2026-05-23",
                work_hours_num: "2.0"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listProjectMemberWorkHours({
      page: 2,
      page_size: 10,
      project_id: "p-1",
      staff_id: "user-1",
      begin_time: "2026-05-01",
      end_time: "2026-05-23"
    });

    expect(requestedPath).toBe("/v3/work-hours/get-member-work-hours");
    expect(requestedBody).toEqual({
      page_no: "2",
      page_size: "10",
      project_uuid: "p-1",
      staff_id: "user-1",
      begin_time: "2026-05-01",
      end_time: "2026-05-23"
    });
    expect(result).toEqual({
      work_hours: [
        {
          issue_id: 70779173,
          subject: "Story A",
          project_name: "mall",
          user_id: "user-1",
          nick_name: "szh",
          work_date: "2026-05-23",
          work_hours_num: "2.0"
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

  it("maps official V5 associated wiki queries to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          total: 1,
          data: [
            {
              issue_id: "9164403",
              title: "Wiki A",
              wiki_id: "wiki-1",
              type: "Wiki",
              project: { name: "mall4cloud" },
              author: { nick_name: "szh" }
            }
          ]
        };
      }
    } as never);

    const result = await client.listAssociatedWikisV5({
      project_id: "p-1",
      work_item_id: "9164403"
    });

    expect(requestedPath).toBe("/v5/p-1/issue/attach-wiki?issue_id=9164403");
    expect(result).toEqual({
      wikis: [
        {
          issue_id: "9164403",
          title: "Wiki A",
          wiki_id: "wiki-1",
          type: "Wiki",
          project: { name: "mall4cloud" },
          author: { nick_name: "szh" }
        }
      ],
      total: 1
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

  it("maps official V2 project domain setting queries to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            total_count: 1,
            domains: [
              {
                id: 14,
                name: "Performance",
                flag: 1
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listProjectDomainsV2({
      project_id: "p-1",
      flag: 1,
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe("/v2/domain/domain?project_id=p-1&flag=1&page_no=2&page_size=10&offset=10&limit=10");
    expect(result).toEqual({
      domains: [
        {
          id: 14,
          name: "Performance",
          flag: 1
        }
      ],
      total: 1
    });
  });

  it("maps bugs per developer queries to the documented metric endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          project_id: "p-1",
          project_name: "Payments",
          metric_value: "2.0",
          metric_name: "bugs_per_developer",
          dividend_value: "2",
          divisor_value: "1"
        };
      }
    } as never);

    const result = await client.getProjectBugsPerDeveloper({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v1/p-1/bugs-per-developer/query");
    expect(requestedBody).toEqual({});
    expect(result).toEqual({
      project_id: "p-1",
      project_name: "Payments",
      metric_value: "2.0",
      metric_name: "bugs_per_developer",
      dividend_value: "2",
      divisor_value: "1"
    });
  });

  it("maps project completion rate queries to the documented metric endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          project_id: "p-1",
          project_name: "Payments",
          metric_value: 0.8945,
          metric_name: "completion_rate",
          dividend_value: 15,
          divisor_value: 20
        };
      }
    } as never);

    const result = await client.getProjectCompletionRate({
      project_id: "p-1",
      date_range: "1598457600000,1598544000000",
      sprint_id: "8883443",
      metric_type: "on-time_completion_rate",
      dividend: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      },
      divisor: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      }
    });

    expect(requestedPath).toBe("/v1/p-1/completion-rate/query");
    expect(requestedBody).toEqual({
      date_range: "1598457600000,1598544000000",
      sprint_id: "8883443",
      metric_type: "on-time_completion_rate",
      dividend: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      },
      divisor: {
        on_time: "ontime",
        custom_field16: "自定义字段值"
      }
    });
    expect(result).toEqual({
      project_id: "p-1",
      project_name: "Payments",
      metric_value: 0.8945,
      metric_name: "completion_rate",
      dividend_value: 15,
      divisor_value: 20
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
      projectUUId: "p-1",
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

  it("maps official V2 work setting template queries to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            templates: [
              {
                name: "Scrum template",
                description: "Default"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listWorkSettingTemplatesV2({
      search: "Scrum"
    });

    expect(requestedPath).toBe("/v2/project-template/template?search=Scrum");
    expect(result).toEqual({
      templates: [
        {
          name: "Scrum template",
          description: "Default"
        }
      ],
      total: undefined
    });
  });

  it("maps official V2 associated code queries to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            total: 1,
            list: [
              {
                relatedId: 70779173,
                type: "commit",
                branchName: "main",
                commitMsg: "fix work item"
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listAssociatedCodeV2({
      project_id: "p-1",
      work_item_id: "70779173",
      page: 2,
      page_size: 10,
      type: "commit"
    });

    expect(requestedPath).toBe(
      "/v2/issues/get-commit-list-by-related-id?pageNo=2&pageSize=10&projectUUId=p-1&relatedId=70779173&type=commit"
    );
    expect(result).toEqual({
      items: [
        {
          relatedId: 70779173,
          type: "commit",
          branchName: "main",
          commitMsg: "fix work item"
        }
      ],
      total: 1
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

  it("maps official V4 issue custom field queries to the documented endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          datas: [
            {
              custom_field: "custom_field16",
              name: "Business line",
              type: "text"
            }
          ]
        };
      }
    } as never);

    const result = await client.listWorkItemCustomFieldsV4({
      project_id: "p-1",
      included_not_in_use: true,
      names: ["Business line"]
    });

    expect(requestedPath).toBe("/v4/projects/p-1/issues/custom-fields");
    expect(requestedBody).toEqual({
      included_not_in_use: true,
      names: ["Business line"]
    });
    expect(result).toEqual({
      custom_fields: [
        {
          custom_field: "custom_field16",
          name: "Business line",
          type: "text"
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

  it("maps work item template create-or-update requests to the documented project template endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body?: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {},
          status: "success"
        };
      }
    } as never);

    const result = await client.createWorkItemTemplate({
      project_id: "p-1",
      tracker_id: 7,
      description: "<p>story template</p>",
      issue_field_configs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ]
    });

    expect(requestedPath).toBe("/v2/project/templates");
    expect(requestedBody).toEqual({
      projectUUId: "p-1",
      trackerId: 7,
      description: "<p>story template</p>",
      issueFieldConfigs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ]
    });
    expect(result).toEqual({
      project_id: "p-1",
      tracker_id: 7,
      description: "<p>story template</p>",
      issue_field_configs: [
        {
          field: "status_id",
          is_required: 1,
          default_value: "新建",
          position: 1
        }
      ],
      status: "success"
    });
  });

  it("maps getWorkItemIssueDetails to the documented issue-details endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            issue: {
              id: 2884248,
              subject: "33333",
              author: {
                first_name: "alice",
                last_name: "wang",
                identifier: "user-uuid-1",
                name: "tenant/alice",
                id: 15533,
                assigned_nick_name: "Alice"
              },
              created_on: "1754307805000",
              updated_on: "1754378971000",
              start_date: "1754323200000",
              done_ratio: 0,
              description: "<p>story desc</p>",
              expected_work_hours: 0,
              release_dev: "",
              project: {
                identifier: "p-1",
                name: "Project A",
                project_type: "scrum",
                id: 6349386
              },
              tracker: {
                name: "Story",
                id: 7
              },
              status: {
                name: "新建",
                id: 1
              },
              priority: {
                name: "中",
                id: 2
              },
              assigned_to: {
                first_name: "bob",
                last_name: "li",
                identifier: "user-uuid-2",
                name: "tenant/bob",
                id: 16666,
                assigned_nick_name: "Bob"
              },
              developer: {},
              severity: {
                name: "一般",
                id: 12
              },
              domain: {
                id: 14,
                name: "性能"
              },
              module: {
                id: 8,
                name: "网关"
              },
              story_point: {
                id: 3,
                name: "1"
              },
              parent_issue: {
                id: 200,
                name: "Parent story"
              },
              find_release_dev: "",
              assigned_cc_user: [],
              accessories_list: [
                {
                  attachment_id: 26262,
                  issue_id: 2884248,
                  container_type: "Issue",
                  file_name: "demo.json",
                  disk_file_name: "demo-disk.json",
                  digest: "1",
                  creator_num_id: 15533,
                  created_date: "2025-08-04 19:43:46",
                  disk_directory: "/projectMan/demo.json",
                  creator_id: "user-uuid-1"
                }
              ],
              custom_value_new: {
                custom_field: "custom_field16",
                field_name: "业务域",
                value: "支付",
                field_type: "text",
                description: "业务归属"
              },
              custom_fields: [
                {
                  name: "业务域",
                  value: "支付",
                  new_name: "业务条线"
                }
              ],
              inner_text: "latest comment"
            }
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.getWorkItemIssueDetails({
      project_id: "p-1",
      work_item_id: "2884248",
      include: "children,parent"
    });

    expect(requestedPath).toBe(
      "/v2/issues/show?issueId=2884248&projectUUId=p-1&include=children%2Cparent"
    );
    expect(result).toEqual({
      id: "2884248",
      subject: "33333",
      created_on: "1754307805000",
      updated_on: "1754378971000",
      start_date: "1754323200000",
      done_ratio: 0,
      description: "<p>story desc</p>",
      expected_work_hours: 0,
      release_dev: "",
      find_release_dev: "",
      inner_text: "latest comment",
      project: {
        identifier: "p-1",
        name: "Project A",
        project_type: "scrum",
        id: 6349386
      },
      tracker: {
        name: "Story",
        id: 7
      },
      status: {
        name: "新建",
        id: 1
      },
      priority: {
        name: "中",
        id: 2
      },
      severity: {
        name: "一般",
        id: 12
      },
      module: {
        id: 8,
        name: "网关"
      },
      domain: {
        id: 14,
        name: "性能"
      },
      story_point: {
        id: 3,
        name: "1"
      },
      parent_issue: {
        id: 200,
        name: "Parent story"
      },
      author: {
        first_name: "alice",
        last_name: "wang",
        identifier: "user-uuid-1",
        name: "tenant/alice",
        id: 15533,
        assigned_nick_name: "Alice"
      },
      assigned_to: {
        first_name: "bob",
        last_name: "li",
        identifier: "user-uuid-2",
        name: "tenant/bob",
        id: 16666,
        assigned_nick_name: "Bob"
      },
      developer: {},
      assigned_cc_user: [],
      custom_fields: [
        {
          name: "业务域",
          value: "支付",
          new_name: "业务条线"
        }
      ],
      custom_value_new: {
        custom_field: "custom_field16",
        field_name: "业务域",
        value: "支付",
        field_type: "text",
        description: "业务归属"
      },
      accessories_list: [
        {
          attachment_id: 26262,
          issue_id: 2884248,
          container_type: "Issue",
          file_name: "demo.json",
          disk_file_name: "demo-disk.json",
          digest: "1",
          creator_num_id: 15533,
          created_date: "2025-08-04 19:43:46",
          disk_directory: "/projectMan/demo.json",
          creator_id: "user-uuid-1"
        }
      ]
    });
  });

  it("maps copyWorkItems to the documented duplication endpoint and normalizes grouped results", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body?: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            successIssues: [
              {
                id: 69901043,
                tracker_id: 7,
                project_id: 13281266,
                projectUUId: "src-project",
                subject: "Story A",
                status_id: 1,
                assigned_to_id: 1274137,
                priority_id: 2,
                author: 1274137,
                created_on: "2025-08-18 23:36:51",
                updated_on: "1755531417000",
                description: "TEST",
                severity_id: 12,
                expected_work_hours: 0,
                actual_work_hours: 0,
                story_point_id: 3,
                closed_flag: 0,
                is_archived: false
              }
            ],
            createIssues: [
              {
                id: 69913248,
                tracker_id: 7,
                project_id: 13290000,
                projectUUId: "target-project",
                subject: "Story A",
                status_id: 1,
                assigned_to_id: 1274137,
                priority_id: 2,
                author: 1274137,
                created_on: "2025-08-18 23:36:51",
                updated_on: "1755531417000",
                description: "TEST",
                severity_id: 12,
                expected_work_hours: 0,
                actual_work_hours: 0,
                story_point_id: 3,
                closed_flag: 0,
                is_archived: false
              }
            ],
            errorIssues: [
              {
                id: 69901044,
                tracker_id: 3,
                project_id: 13281266,
                projectUUId: "src-project",
                subject: "Bug B",
                status_id: 6,
                assigned_to_id: 1274999,
                priority_id: 3,
                author: 1274137,
                created_on: "2025-08-18 23:37:10",
                updated_on: "1755531420000",
                description: "FAILED",
                severity_id: 10,
                expected_work_hours: 1,
                actual_work_hours: 0.5,
                story_point_id: 0,
                closed_flag: 1,
                is_archived: false
              }
            ]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.copyWorkItems({
      from_project_id: "src-project",
      to_project_id: "target-project",
      work_item_ids: ["69901043", "69901044"],
      copy_comments: true,
      copy_work_hours: false
    });

    expect(requestedPath).toBe("/v2/workitem/duplication");
    expect(requestedBody).toEqual({
      fromProjectUUId: "src-project",
      toProjectUUId: "target-project",
      issueIds: "69901043,69901044",
      copyComments: true,
      copyWorkHours: false
    });
    expect(result).toEqual({
      from_project_id: "src-project",
      to_project_id: "target-project",
      work_item_ids: ["69901043", "69901044"],
      copy_comments: true,
      copy_work_hours: false,
      status: "success",
      success_work_items: [
        {
          id: "69901043",
          tracker_id: 7,
          project_id: "13281266",
          project_uuid: "src-project",
          subject: "Story A",
          status_id: 1,
          assigned_to_id: 1274137,
          priority_id: 2,
          author: 1274137,
          created_on: "2025-08-18 23:36:51",
          updated_on: "1755531417000",
          description: "TEST",
          severity_id: 12,
          expected_work_hours: 0,
          actual_work_hours: 0,
          story_point_id: 3,
          closed_flag: 0,
          is_archived: false
        }
      ],
      created_work_items: [
        {
          id: "69913248",
          tracker_id: 7,
          project_id: "13290000",
          project_uuid: "target-project",
          subject: "Story A",
          status_id: 1,
          assigned_to_id: 1274137,
          priority_id: 2,
          author: 1274137,
          created_on: "2025-08-18 23:36:51",
          updated_on: "1755531417000",
          description: "TEST",
          severity_id: 12,
          expected_work_hours: 0,
          actual_work_hours: 0,
          story_point_id: 3,
          closed_flag: 0,
          is_archived: false
        }
      ],
      error_work_items: [
        {
          id: "69901044",
          tracker_id: 3,
          project_id: "13281266",
          project_uuid: "src-project",
          subject: "Bug B",
          status_id: 6,
          assigned_to_id: 1274999,
          priority_id: 3,
          author: 1274137,
          created_on: "2025-08-18 23:37:10",
          updated_on: "1755531420000",
          description: "FAILED",
          severity_id: 10,
          expected_work_hours: 1,
          actual_work_hours: 0.5,
          story_point_id: 0,
          closed_flag: 1,
          is_archived: false
        }
      ]
    });
  });

  it("rejects copyWorkItems when the duplication endpoint does not report success", async () => {
    const client = createReqClient({
      post: async () => ({
        result: {
          successIssues: []
        }
      })
    } as never);

    await expect(
      client.copyWorkItems({
        from_project_id: "src-project",
        to_project_id: "target-project",
        work_item_ids: ["69901043"],
        copy_comments: false,
        copy_work_hours: false
      })
    ).rejects.toThrow(/did not report success/i);
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

    expect(requestedPath).toBe("/v4/issue-status/tracker-handler-config?project_uuid=p-1&tracker_id=7");
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

  it("includes the required empty key_word query parameter for release plan reads", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          status: "success",
          result: [],
          page: {
            page: 1,
            size: 10,
            count: 0
          }
        };
      }
    } as never);

    const result = await client.listReleasePlans({
      project_id: "p-1",
      page: 1,
      page_size: 10
    });

    expect(requestedPath).toBe(
      "/v1/planservice/projects/p-1/plans/query?page=1&size=10&key_word=&updated_time_interval="
    );
    expect(result).toEqual({
      plans: [],
      total: 0,
      page: 1,
      page_size: 10,
      status: "success",
      message: undefined
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

  it("maps parent work item queries to the documented parent-issues endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: {
            issue: { id: 20, subject: "Child task" },
            parent_issues: [{ id: 10, subject: "Parent story" }]
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.listParentWorkItems({
      project_id: "p-1",
      work_item_id: "20"
    });

    expect(requestedPath).toBe("/v4/p-1/issue-parent-issues?issue_id=20");
    expect(result).toEqual({
      issue: { id: 20, subject: "Child task" },
      parent_issues: [{ id: 10, subject: "Parent story" }]
    });
  });

  it("maps work item stay time queries to the documented duration endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body?: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          fails: ["1212123"],
          data: [{ id: "6330741", stay_time: 1238172 }],
          total_stay_time: 1238172,
          total: 1
        };
      }
    } as never);

    const result = await client.listWorkItemStayTimes({
      project_id: "p-1",
      work_item_ids: ["6330741", "1212123"]
    });

    expect(requestedPath).toBe("/v4/issues/duration");
    expect(requestedBody).toEqual({
      project_id: "p-1",
      issue_ids: ["6330741", "1212123"]
    });
    expect(result).toEqual({
      fails: ["1212123"],
      data: [{ id: "6330741", stay_time: 1238172 }],
      total_stay_time: 1238172,
      total: 1
    });
  });

  it("maps todo work item search to the documented cross-project todo endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body?: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          issue_list: [{ id: 7220820, subject: "demo_issue" }],
          total: 1
        };
      }
    } as never);

    const result = await client.searchTodoWorkItems({
      page: 2,
      page_size: 15,
      subject: "demo",
      status_id: "5",
      due_date: "1682265600000,1682265600000"
    });

    expect(requestedPath).toBe("/v4/issues");
    expect(requestedBody).toEqual({
      offset: 15,
      limit: 15,
      subject: "demo",
      due_date: "1682265600000,1682265600000",
      status_id: "5"
    });
    expect(result).toEqual({
      work_items: [{ id: 7220820, subject: "demo_issue" }],
      total: 1
    });
  });

  it("maps personal workbench search to the documented my-issues endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body?: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            issueList: [{ id: 69880891, subject: "St-001" }],
            total: 7898
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.searchMyWorkItems({
      page: 1,
      page_size: 15
    });

    expect(requestedPath).toBe("/v3/work-search/my-issues");
    expect(requestedBody).toEqual({
      pageNo: 1,
      pageSize: 15
    });
    expect(result).toEqual({
      work_items: [{ id: 69880891, subject: "St-001" }],
      total: 7898
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

    expect(requestedPath).toBe("/v4/project/project-configs/after?projectUUId=p-1");
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

  it("maps project bug density queries to the documented metric endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body?: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          project_id: "p-1",
          project_name: "Payments",
          metric_value: "0.45",
          metric_name: "bug_density",
          dividend_value: "9",
          divisor_value: "20"
        };
      }
    } as never);

    const result = await client.getProjectBugDensity({
      project_id: "p-1",
      date_range: "1598457600000,1598544000000",
      metric_type: "bug_density",
      dividend: {
        custom_fields: [
          {
            name: "severity",
            options: "high,medium"
          }
        ]
      },
      divisor: {
        custom_fields: [
          {
            name: "module",
            options: "billing"
          }
        ]
      }
    });

    expect(requestedPath).toBe("/v2/p-1/bug-density/query");
    expect(requestedBody).toEqual({
      date_range: "1598457600000,1598544000000",
      metric_type: "bug_density",
      dividend: {
        custom_fields: [
          {
            name: "severity",
            options: "high,medium"
          }
        ]
      },
      divisor: {
        custom_fields: [
          {
            name: "module",
            options: "billing"
          }
        ]
      }
    });
    expect(result).toEqual({
      project_id: "p-1",
      project_name: "Payments",
      metric_value: "0.45",
      metric_name: "bug_density",
      dividend_value: "9",
      divisor_value: "20"
    });
  });

  it("maps project work hour type queries to the documented work-hours-type endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          total: 2,
          work_hours_types: [
            {
              id: 21,
              name: "研发设计",
              status: 1
            },
            {
              id: 22,
              name: "后端开发",
              status: 1
            }
          ]
        };
      }
    } as never);

    const result = await client.listProjectWorkHourTypes({
      project_id: "p-1",
      page: 2,
      page_size: 10,
      status: 1
    });

    expect(requestedPath).toBe("/v4/projects/p-1/work-hours-type?limit=10&offset=10&status=1");
    expect(result).toEqual({
      total: 2,
      work_hours_types: [
        {
          id: 21,
          name: "研发设计",
          status: 1
        },
        {
          id: 22,
          name: "后端开发",
          status: 1
        }
      ]
    });
  });

  it("maps official V5 project work hour type queries to the documented endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return {
          result: [
            {
              id: 21,
              name: "Development",
              status: 1
            }
          ]
        };
      }
    } as never);

    const result = await client.listProjectWorkHourTypesV5({
      project_id: "p-1",
      status: 1
    });

    expect(requestedPath).toBe("/v5/projects/p-1/work-hours-type?status=1");
    expect(result).toEqual({
      work_hours_types: [
        {
          id: 21,
          name: "Development",
          status: 1
        }
      ]
    });
  });

  it("maps official V2 scrum version work item queries with projectUUId body key", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            issues: [
              {
                id: 70779173,
                subject: "Version story",
                fixed_version: { id: 301, name: "Sprint 1" }
              }
            ],
            total_count: 1
          }
        };
      }
    } as never);

    const result = await client.queryScrumVersionWorkItemsV2({
      project_id: "p-1",
      fixed_version_id: "301",
      subject: "version",
      tracker_id: "7",
      display_mode: "tree",
      issue_query: "assigned_to_id=me"
    });

    expect(requestedPath).toBe("/v2/version/query-scrum-version");
    expect(requestedBody).toMatchObject({
      projectUUId: "p-1"
    });
    expect(requestedBody).not.toHaveProperty("project_id");
    expect(result).toEqual({
      issues: [
        {
          id: 70779173,
          subject: "Version story",
          fixed_version: { id: 301, name: "Sprint 1" }
        }
      ],
    });
  });

  it("maps work item status name checks to the documented check-name endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      post: async (path: string, body?: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          result: {
            exist: false
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.checkWorkItemStatusName({
      project_id: "p-1",
      status_name: "In Review"
    });

    expect(requestedPath).toBe("/v2/issue-status/check-name");
    expect(requestedBody).toEqual({
      projectUUId: "p-1",
      definedName: "In Review"
    });
    expect(result).toEqual({
      exist: false
    });
  });

  it("maps user feature queries to the documented user-features endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      get: async (path: string) => {
        requestedPath = path;

        return [
          {
            key: "issue.associate-wiki",
            control: "show"
          },
          {
            key: "issue.automation",
            control: "show"
          }
        ];
      }
    } as never);

    const result = await client.listUserFeatures({
      project_id: "p-1"
    });

    expect(requestedPath).toBe("/v1/projects/p-1/user/features");
    expect(result).toEqual({
      project_id: "p-1",
      features: [
        {
          key: "issue.associate-wiki",
          control: "show"
        },
        {
          key: "issue.automation",
          control: "show"
        }
      ]
    });
  });

  it("normalizes wrapped and dictionary user feature responses while preserving raw fields", async () => {
    const wrappedClient = createReqClient({
      get: async () => ({
        total: 1,
        result: [
          {
            key: "issue.associate-wiki",
            control: "show",
            enabled: true
          }
        ]
      })
    } as never);

    await expect(
      wrappedClient.listUserFeatures({
        project_id: "p-1"
      })
    ).resolves.toEqual({
      project_id: "p-1",
      total: 1,
      result: [
        {
          key: "issue.associate-wiki",
          control: "show",
          enabled: true
        }
      ],
      features: [
        {
          key: "issue.associate-wiki",
          control: "show",
          enabled: true
        }
      ]
    });

    const dictionaryClient = createReqClient({
      get: async () => ({
        associateWiki: {
          key: "issue.associate-wiki",
          control: "show"
        },
        automation: {
          key: "issue.automation",
          control: "hide"
        }
      })
    } as never);

    await expect(
      dictionaryClient.listUserFeatures({
        project_id: "p-1"
      })
    ).resolves.toEqual({
      project_id: "p-1",
      associateWiki: {
        key: "issue.associate-wiki",
        control: "show"
      },
      automation: {
        key: "issue.automation",
        control: "hide"
      },
      features: [
        {
          key: "issue.associate-wiki",
          control: "show"
        },
        {
          key: "issue.automation",
          control: "hide"
        }
      ]
    });
  });

  it("maps project template delete requests to the documented template endpoint", async () => {
    let requestedPath = "";
    const client = createReqClient({
      delete: async (path: string) => {
        requestedPath = path;

        return {
          id: 1518,
          name: "1233",
          sourceId: "381fcca9c056482d92da3e8b9da71db5",
          sourceName: "DevOps全流程示例项目xxxx",
          description: null,
          identifier: "08f7a8eeaf874a3fbb360fab28014ed0",
          authorId: 233087,
          domainId: "073a9e220f000f620fb8c010f47a3f80",
          type: "scrum",
          isPublic: 1
        };
      }
    } as never);

    const result = await client.deleteProjectTemplate({
      template_id: "1518"
    });

    expect(requestedPath).toBe("/v4/projects/templates/1518");
    expect(result).toEqual({
      id: 1518,
      name: "1233",
      sourceId: "381fcca9c056482d92da3e8b9da71db5",
      sourceName: "DevOps全流程示例项目xxxx",
      description: null,
      identifier: "08f7a8eeaf874a3fbb360fab28014ed0",
      authorId: 233087,
      domainId: "073a9e220f000f620fb8c010f47a3f80",
      type: "scrum",
      isPublic: 1
    });
  });

  it("maps project template update requests to the documented template endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createReqClient({
      put: async (path: string, body?: Record<string, unknown>) => {
        requestedPath = path;
        requestedBody = body;

        return {
          project_template: {
            id: 1538,
            name: "12344",
            type: null
          }
        };
      }
    } as never);

    const result = await client.updateProjectTemplate({
      template_id: "1538",
      name: "12344",
      description: ""
    });

    expect(requestedPath).toBe("/v4/projects/templates/1538");
    expect(requestedBody).toEqual({
      name: "12344",
      description: ""
    });
    expect(result).toEqual({
      id: 1538,
      name: "12344",
      type: null
    });
  });

  it("maps program and requirement-pool read requests to documented endpoints", async () => {
    const requested: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createReqClient({
      get: async (path: string) => {
        requested.push({ method: "GET", path });

        if (path.startsWith("/v4/programs?")) {
          return { programs: [{ program_id: "program-1", name: "Space" }], total: 1 };
        }
        if (path.includes("/fields?")) {
          return { fields: [{ id: "field-1", name: "subject" }] };
        }
        if (path.includes("/irs/ir-1/children?")) {
          return { irs: [{ ir_id: "ir-child-1", subject: "Child" }], total: 1 };
        }
        if (path.includes("/irs/ir-1/histories?")) {
          return { histories: [{ ir_id: "ir-1" }], total: 1 };
        }
        if (path.includes("/rrs/rr-1/histories?")) {
          return { histories: [{ rr_id: "rr-1" }], total: 1 };
        }
        if (path.includes("/rrs?")) {
          return { rrs: [{ id: "rr-1" }], total: 1 };
        }
        if (path === "/v2/issue-severity/all") {
          return { result: { severities: [{ id: 10, name: "关键" }] } };
        }

        return { ir_id: "ir-1", subject: "IR" };
      },
      post: async (path: string, body?: unknown) => {
        requested.push({ method: "POST", path, body });
        return { rr_status_list: [{ rr_id: "rr-1", status: { id: "22", label: "进行中" } }] };
      }
    } as never);

    await client.listPrograms({ page: 2, page_size: 10, search: "space", sort_key: "name", sort_dir: "desc" });
    await client.listProgramFields({ program_id: "program-1", field_type: "RR" });
    await client.getIr({ program_id: "program-1", ir_id: "ir-1" });
    await client.listIrChildren({ program_id: "program-1", ir_id: "ir-1", query_type: "RR", page: 1, page_size: 20 });
    await client.listIrHistories({ ir_id: "ir-1", page: 1, page_size: 20 });
    await client.listRrs({ program_id: "program-1", query_type: "ALL", page: 1, page_size: 20 });
    await client.listRrStatuses({ program_id: "program-1", rr_ids: ["rr-1"] });
    await client.listRrHistories({ rr_id: "rr-1", page: 1, page_size: 20 });
    await client.listIssueSeverities({});

    expect(requested).toEqual([
      { method: "GET", path: "/v4/programs?offset=10&limit=10&search=space&sort_key=name&sort_dir=DESC" },
      { method: "GET", path: "/v4/programs/program-1/fields?field_type=RR" },
      { method: "GET", path: "/v4/programs/program-1/irs/ir-1" },
      { method: "GET", path: "/v4/programs/program-1/irs/ir-1/children?query_type=RR&offset=0&limit=20" },
      { method: "GET", path: "/v4/irs/ir-1/histories?offset=0&limit=20" },
      { method: "GET", path: "/v4/programs/program-1/rrs?query_type=ALL&offset=0&limit=20" },
      { method: "POST", path: "/v4/programs/program-1/rr-status", body: { rr_ids: ["rr-1"] } },
      { method: "GET", path: "/v4/rrs/rr-1/histories?offset=0&limit=20" },
      { method: "GET", path: "/v2/issue-severity/all" }
    ]);
  });

  it("maps IPD config write requests to documented endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createReqClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });

        if (path.endsWith("/modules")) {
          return { status: "success", result: { id: "m-1", display_value: "Module A" } };
        }
        if (path.endsWith("/feature-sets")) {
          return { status: "success", result: { id: "fs-1", title: "Feature Set A", parent_id: "root" } };
        }

        return { status: "success", result: { id: "label-1", title: "urgent", color: "#86CAFF" } };
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "PUT", path, body });

        if (path.includes("/modules/")) {
          return { status: "success", result: { id: "m-1", display_value: "Module B" } };
        }
        if (path.includes("/feature-sets/")) {
          return { status: "success", result: { id: "fs-1", title: "Feature Set B", parent_id: "root", position_float: 1 } };
        }

        return { status: "success", result: { id: "label-1", title: "normal", color: "#6DDEBB" } };
      },
      delete: async (path: string) => {
        requests.push({ method: "DELETE", path });

        if (path.includes("/modules/")) {
          return { status: "success", result: { id: "m-1", display_value: "Module B" } };
        }
        if (path.includes("/feature-sets/")) {
          return { status: "success" };
        }

        return { status: "success", result: { id: "label-1", title: "normal" } };
      }
    } as never);

    const [
      createdModule,
      updatedModule,
      deletedModule,
      createdLabel,
      updatedLabel,
      deletedLabel,
      createdFeatureSet,
      updatedFeatureSet,
      deletedFeatureSet
    ] = await Promise.all([
      client.createIpdModule({
        project_id: "ipd-1",
        display_value: "Module A",
        parent_id: "root",
        description: "module desc",
        assignee: "user-1"
      }),
      client.updateIpdModule({
        project_id: "ipd-1",
        module_id: "m-1",
        display_value: "Module B",
        parent_id: "root"
      }),
      client.deleteIpdModule({
        project_id: "ipd-1",
        module_id: "m-1"
      }),
      client.createIpdLabel({
        project_id: "ipd-1",
        label_type: "requirement",
        color: "#86CAFF",
        title: "urgent"
      }),
      client.updateIpdLabel({
        project_id: "ipd-1",
        label_id: "label-1",
        label_type: "requirement",
        title: "normal"
      }),
      client.deleteIpdLabel({
        project_id: "ipd-1",
        label_id: "label-1"
      }),
      client.createIpdFeatureSet({
        project_id: "ipd-1",
        title: "Feature Set A",
        parent_id: "root"
      }),
      client.updateIpdFeatureSet({
        project_id: "ipd-1",
        feature_set_id: "fs-1",
        title: "Feature Set B",
        parent_id: "root",
        position_float: 1
      }),
      client.deleteIpdFeatureSet({
        project_id: "ipd-1",
        feature_set_id: "fs-1"
      })
    ]);

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/modules",
        body: {
          display_value: "Module A",
          parent_id: "root",
          description: "module desc",
          assignee: "user-1"
        }
      },
      {
        method: "PUT",
        path: "/v1/ipdprojectservice/projects/ipd-1/modules/m-1",
        body: {
          display_value: "Module B",
          parent_id: "root"
        }
      },
      {
        method: "DELETE",
        path: "/v1/ipdprojectservice/projects/ipd-1/modules/m-1"
      },
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/tags",
        body: {
          label_type: "requirement",
          color: "#86CAFF",
          title: "urgent"
        }
      },
      {
        method: "PUT",
        path: "/v1/ipdprojectservice/projects/ipd-1/tags/label-1",
        body: {
          label_type: "requirement",
          title: "normal"
        }
      },
      {
        method: "DELETE",
        path: "/v1/ipdprojectservice/projects/ipd-1/tags/label-1"
      },
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/feature-sets",
        body: {
          title: "Feature Set A",
          parent_id: "root"
        }
      },
      {
        method: "PUT",
        path: "/v1/ipdprojectservice/projects/ipd-1/feature-sets/fs-1",
        body: {
          parent_id: "root",
          title: "Feature Set B",
          position_float: 1
        }
      },
      {
        method: "DELETE",
        path: "/v1/ipdprojectservice/projects/ipd-1/feature-sets/fs-1"
      }
    ]);
    expect(createdModule).toEqual(expect.objectContaining({ id: "m-1", display_value: "Module A" }));
    expect(updatedModule).toEqual(expect.objectContaining({ id: "m-1", display_value: "Module B" }));
    expect(deletedModule).toEqual(expect.objectContaining({ id: "m-1", display_value: "Module B" }));
    expect(createdLabel).toEqual(expect.objectContaining({ id: "label-1", title: "urgent" }));
    expect(updatedLabel).toEqual(expect.objectContaining({ id: "label-1", title: "normal" }));
    expect(deletedLabel).toEqual(expect.objectContaining({ id: "label-1", title: "normal" }));
    expect(createdFeatureSet).toEqual(expect.objectContaining({ id: "fs-1", title: "Feature Set A", parent_id: "root" }));
    expect(updatedFeatureSet).toEqual(expect.objectContaining({ id: "fs-1", title: "Feature Set B", position_float: 1 }));
    expect(deletedFeatureSet).toEqual(expect.objectContaining({ id: "fs-1" }));
  });

  it("maps IPD issue mutations to documented endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createReqClient({
      post: async (path: string, body: unknown) => {
        requests.push({ method: "POST", path, body });
        return { status: "success", result: [{ id: "issue-1", title: "IPD task", category: "Task" }] };
      },
      put: async (path: string, body: unknown) => {
        requests.push({ method: "PUT", path, body });
        return { status: "success", result: [{ success: [{ id: "issue-1" }], failed: [] }] };
      },
      delete: async (path: string, body?: unknown) => {
        requests.push({ method: "DELETE", path, body });
        return { status: "success", result: [{ success: [{ id: "issue-1" }], failed: [] }] };
      }
    } as never);

    const [created, batchCreated, updated, deleted] = await Promise.all([
      client.createIpdIssue({
        project_id: "ipd-1",
        title: "IPD task",
        description: "desc",
        category: "Task",
        assignee: "user-1",
        status: "Start",
        extra_fields: { business_domain: "software" }
      }),
      client.batchCreateIpdIssues({
        project_id: "ipd-1",
        issues: [
          {
            title: "Bug A",
            description: "desc",
            category: "Bug",
            status: "Start",
            assignee: { id: "user-1" },
            extra_fields: { priority: "high" }
          }
        ]
      }),
      client.batchUpdateIpdIssues({
        project_id: "ipd-1",
        issue_ids: ["issue-1"],
        attribute: {
          category: "Task",
          priority: "high",
          extra_fields: { business_domain: "software" }
        }
      }),
      client.batchDeleteIpdIssues({
        project_id: "ipd-1",
        issue_ids: ["issue-1"],
        is_permanent_delete: false,
        src_project_id: "src-1"
      })
    ]);

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/issues",
        body: {
          title: "IPD task",
          description: "desc",
          category: "Task",
          assignee: "user-1",
          status: "Start",
          business_domain: "software"
        }
      },
      {
        method: "POST",
        path: "/v2/ipdprojectservice/projects/ipd-1/issues/batch",
        body: [
          {
            title: "Bug A",
            description: "desc",
            category: "Bug",
            status: "Start",
            assignee: { id: "user-1" },
            priority: "high"
          }
        ]
      },
      {
        method: "PUT",
        path: "/v1/ipdprojectservice/projects/ipd-1/issues/batch",
        body: {
          id: ["issue-1"],
          attribute: {
            category: "Task",
            priority: "high",
            business_domain: "software"
          }
        }
      },
      {
        method: "DELETE",
        path: "/v1/ipdprojectservice/projects/ipd-1/issues/batch?is_permanent_delete=false&src_project_id=src-1",
        body: ["issue-1"]
      }
    ]);
    expect(created).toEqual([expect.objectContaining({ id: "issue-1" })]);
    expect(batchCreated).toEqual([expect.objectContaining({ id: "issue-1" })]);
    expect(updated).toEqual([{ success: [{ id: "issue-1" }], failed: [] }]);
    expect(deleted).toEqual([{ success: [{ id: "issue-1" }], failed: [] }]);
  });

  it("maps IPD attachment and image requests to documented endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createReqClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
        return { status: "success", result: [{ id: "att-1", issue_id: "issue-1", file_name: "demo.txt" }] };
      },
      getBinary: async (path: string) => {
        requests.push({ method: "GET_BINARY", path });
        return { body: new Uint8Array([1, 2, 3]), contentType: "application/octet-stream", fileName: "demo.bin" };
      },
      postMultipart: async (path: string, body: unknown) => {
        requests.push({ method: "POST_MULTIPART", path, body });
        if (path.includes("/images")) {
          return { status: "success", result: { id: "issue-1", title: "Task" } };
        }
        return { status: "success", result: [{ id: "att-1", issue_id: "issue-1", file_name: "demo.txt" }] };
      },
      delete: async (path: string) => {
        requests.push({ method: "DELETE", path });
        return { status: "success", result: { id: "issue-1", title: "Task" } };
      }
    } as never);

    const [uploadedAttachment, attachments, downloadedAttachment, uploadedImage, deletedImage, downloadedImage] =
      await Promise.all([
        client.uploadIpdIssueAttachment({
          project_id: "ipd-1",
          issue_id: "issue-1",
          file_name: "demo.txt",
          file_content: new Uint8Array([1])
        }),
        client.listIpdIssueAttachments({ project_id: "ipd-1", issue_id: "issue-1", source_project_id: "src-1" }),
        client.downloadIpdIssueAttachment({ project_id: "ipd-1", attachment_id: "att-1" }),
        client.uploadIpdIssueImage({
          project_id: "ipd-1",
          issue_id: "issue-1",
          file_name: "demo.png",
          file_content: new Uint8Array([1])
        }),
        client.deleteIpdIssueImage({ project_id: "ipd-1", issue_id: "issue-1", file_name: "demo.png" }),
        client.downloadIpdIssueImage({
          project_id: "ipd-1",
          issue_id: "issue-1",
          file_name: "demo.png",
          field_code: "description"
        })
      ]);

    expect(requests.map(({ method, path }) => ({ method, path }))).toEqual([
      {
        method: "POST_MULTIPART",
        path: "/v1/ipdprojectservice/projects/ipd-1/issues/issue-1/attachments/upload"
      },
      {
        method: "GET",
        path: "/v1/ipdprojectservice/projects/ipd-1/attachments?issue_id=issue-1&source_project_id=src-1"
      },
      {
        method: "GET_BINARY",
        path: "/v1/ipdprojectservice/projects/ipd-1/attachments/download/att-1"
      },
      {
        method: "POST_MULTIPART",
        path: "/v2/ipdprojectservice/projects/ipd-1/images?issue_id=issue-1"
      },
      {
        method: "DELETE",
        path: "/v2/ipdprojectservice/projects/ipd-1/images?issue_id=issue-1&file_name=demo.png"
      },
      {
        method: "GET_BINARY",
        path: "/v2/ipdprojectservice/projects/ipd-1/images?issue_id=issue-1&file_name=demo.png&field_code=description"
      }
    ]);
    expect(uploadedAttachment).toEqual([expect.objectContaining({ id: "att-1" })]);
    expect(attachments.attachments).toEqual([expect.objectContaining({ id: "att-1" })]);
    expect(downloadedAttachment.body).toEqual(new Uint8Array([1, 2, 3]));
    expect(uploadedImage).toEqual(expect.objectContaining({ id: "issue-1" }));
    expect(deletedImage).toEqual(expect.objectContaining({ id: "issue-1" }));
    expect(downloadedImage.body).toEqual(new Uint8Array([1, 2, 3]));
  });

  it("maps IPD work hour requests to documented endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const workHourResult = {
      status: "success",
      result: {
        data: [{ id: "wh-1", workitem_id: "issue-1", work_hours: "2" }],
        work_hours_total: "2"
      }
    };
    const client = createReqClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
        return {
          status: "success",
          result: [{ id: "cat-1", value: "dev", display_value: "Development" }]
        };
      },
      post: async (path: string, body: unknown) => {
        requests.push({ method: "POST", path, body });
        if (path.endsWith("/work-hour/query")) {
          return {
            status: "success",
            result: [
              {
                workitem: { id: "issue-1" },
                work_date: "1706803200000",
                work_hour_category: "dev",
                work_hours: 6
              }
            ],
            page: { count: 1 }
          };
        }

        return workHourResult;
      },
      put: async (path: string, body: unknown) => {
        requests.push({ method: "PUT", path, body });
        return workHourResult;
      },
      delete: async (path: string) => {
        requests.push({ method: "DELETE", path });
        return workHourResult;
      }
    } as never);

    const [workHours, categories, created, updated, deleted] = await Promise.all([
      client.listIpdWorkHours({
        project_id: "ipd-1",
        plan_pi: ["pi-1"],
        plan_iteration: ["iter-1"],
        workitem_id: ["issue-1"],
        created_by: ["user-1"],
        page: 2,
        page_size: 10
      }),
      client.listIpdWorkHourCategories({ project_id: "ipd-1", display_value: "dev" }),
      client.createIpdWorkHour({
        project_id: "ipd-1",
        issue_id: "issue-1",
        work_date_begin: "2025-07-25",
        work_date_end: "2025-07-25",
        work_hours: 2,
        work_hour_type: 1,
        include_weekend: false,
        work_hour_category: "dev",
        description: "done"
      }),
      client.updateIpdWorkHour({
        project_id: "ipd-1",
        issue_id: "issue-1",
        workhour_id: "wh-1",
        work_hours: 3,
        work_hour_category: "test",
        description: "fix"
      }),
      client.deleteIpdWorkHour({ project_id: "ipd-1", issue_id: "issue-1", workhour_id: "wh-1" })
    ]);

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/work-hour/query",
        body: {
          params: {
            plan_pi: ["pi-1"],
            plan_iteration: ["iter-1"],
            workitem_id: ["issue-1"],
            created_by: ["user-1"]
          },
          page_info: { offset: 10, limit: 10 }
        }
      },
      {
        method: "GET",
        path: "/v1/ipdprojectservice/projects/ipd-1/work-hour/options?display_value=dev"
      },
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/work-items/issue-1/work-hour",
        body: {
          work_hour_category: "dev",
          work_date_begin: "2025-07-25",
          work_date_end: "2025-07-25",
          work_hours: 2,
          work_hour_type: 1,
          include_weekend: false,
          description: "done"
        }
      },
      {
        method: "PUT",
        path: "/v1/projects/ipd-1/work-items/issue-1/work-hour/wh-1",
        body: {
          work_hours: 3,
          work_hour_category: "test",
          description: "fix"
        }
      },
      {
        method: "DELETE",
        path: "/v1/projects/ipd-1/work-items/issue-1/work-hour/wh-1"
      }
    ]);
    expect(workHours).toEqual({ work_hours: [expect.objectContaining({ work_hours: 6 })], total: 1 });
    expect(categories.categories).toEqual([expect.objectContaining({ id: "cat-1", value: "dev" })]);
    expect(created).toEqual({ data: [expect.objectContaining({ id: "wh-1" })], work_hours_total: "2" });
    expect(updated).toEqual({ data: [expect.objectContaining({ id: "wh-1" })], work_hours_total: "2" });
    expect(deleted).toEqual({ data: [expect.objectContaining({ id: "wh-1" })], work_hours_total: "2" });
  });

  it("maps IPD field config requests to documented endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createReqClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
        if (path.includes("/options-used")) {
          return { "opt-1": "2" };
        }

        return [
          {
            project_id: "ipd-1",
            project_name: "IPD Project",
            model_id: "10003",
            category_codes: "RR,Bug"
          }
        ];
      },
      post: async (path: string, body: unknown) => {
        requests.push({ method: "POST", path, body });
        if (path.includes("/fields/query")) {
          return {
            page: { count: 1 },
            result: [{ id: "field-1", field_id: "field-1", code: "c_field", display_name: "Priority" }]
          };
        }

        return {
          id: path.includes("/meta/fields/") ? "field-2" : "field-1",
          code: path.includes("/meta/fields/") ? "c_project_field" : "c_field",
          display_name: "Priority",
          field_type_id: "10001"
        };
      }
    } as never);

    const [tenantFields, tenantUsed, tenantOptionUsed, projectOptionUsed, updatedTenant, updatedProject] =
      await Promise.all([
        client.listIpdTenantFields({
          page: 1,
          page_size: 10,
          search: "Priority",
          sort_info: { field: "display_name", asc: true }
        }),
        client.getIpdTenantFieldUsed({ field_id: "field-1" }),
        client.getIpdTenantFieldOptionUsed({ code: "c_field" }),
        client.getIpdProjectFieldOptionUsed({ project_id: "ipd-1", code: "c_project_field" }),
        client.updateIpdTenantField({
          field_id: "field-1",
          field_type_id: "10001",
          display_name: "Priority",
          option: [{ id: "opt-1", display_value: "High", value: "opt-1" }],
          extra_fields: { definition_type: "4" }
        }),
        client.updateIpdProjectField({
          project_id: "ipd-1",
          field_id: "field-2",
          field_type_id: "10001",
          display_name: "Priority",
          extra_fields: { definition_type: "5" }
        })
      ]);

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v1/ipdprojectservice/tenant/fields/query?page=1&size=10",
        body: {
          search: "Priority",
          sort_info: { field: "display_name", asc: true }
        }
      },
      {
        method: "GET",
        path: "/v1/ipdprojectservice/tenant/fields/field-1/used"
      },
      {
        method: "GET",
        path: "/v1/ipdprojectservice/tenant/field/options-used?code=c_field"
      },
      {
        method: "GET",
        path: "/v1/ipdprojectservice/projects/ipd-1/field/options-used?code=c_project_field"
      },
      {
        method: "POST",
        path: "/v1/ipdprojectservice/tenant/fields/field-1",
        body: {
          field_type_id: "10001",
          display_name: "Priority",
          option: [{ id: "opt-1", display_value: "High", value: "opt-1" }],
          definition_type: "4"
        }
      },
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/meta/fields/field-2",
        body: {
          field_type_id: "10001",
          display_name: "Priority",
          definition_type: "5"
        }
      }
    ]);
    expect(tenantFields).toEqual({ fields: [expect.objectContaining({ id: "field-1" })], total: 1 });
    expect(tenantUsed.usage).toEqual([expect.objectContaining({ project_id: "ipd-1" })]);
    expect(tenantOptionUsed).toEqual({ "opt-1": "2" });
    expect(projectOptionUsed).toEqual({ "opt-1": "2" });
    expect(updatedTenant).toEqual(expect.objectContaining({ id: "field-1", code: "c_field" }));
    expect(updatedProject).toEqual(expect.objectContaining({ id: "field-2", code: "c_project_field" }));
  });

  it("maps IPD extra read requests to documented endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createReqClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });

        return {
          total: 1,
          data: [
            {
              wiki_id: "wiki-1",
              title: "Wiki A",
              issue_id: "issue-1",
              project: { project_id: "ipd-1", name: "IPD" },
              author: { id: "u-1", name: "Alice" }
            }
          ]
        };
      },
      post: async (path: string, body: unknown) => {
        requests.push({ method: "POST", path, body });

        if (path.includes("/issues/tree")) {
          return {
            status: "success",
            result: { issues: [{ id: "issue-1", title: "IR A", category: "IR", children: [] }], total: 1 }
          };
        }
        if (path.includes("/issues/group")) {
          return {
            status: "success",
            result: {
              field_info: { id: "field-1", display_name: "Status" },
              data: [{ id: "g-1", display_value: "Open", total: 2 }]
            }
          };
        }
        if (path.includes("/tenant/query")) {
          return { status: "success", result: { issues: [{ id: "issue-2", title: "Bug A", category: "Bug" }], total: 1 } };
        }

        return {
          status: "success",
          result: [{ category: "IR", category_name: "IR", total: 3, processing: 1, completed: 2, expired: 0 }]
        };
      }
    } as never);

    const [tree, wikis, grouped, tenantIssues, dashboard] = await Promise.all([
      client.listIpdIssueTree({
        project_id: "ipd-1",
        category: "IR,US",
        keyword: "login",
        number: ["IR-1"],
        plan: [{ plan_pi: "pi-1", plan_iteration: ["iter-1"] }],
        modified_date: { start_date: "2025-01-01", end_date: "2025-01-31" },
        page: 2,
        page_size: 10
      }),
      client.listIpdAttachedWikis({ project_id: "ipd-1", issue_id: "issue-1", category: "IR" }),
      client.groupIpdIssues({
        project_id: "ipd-1",
        issue_type: "IR",
        group_field_id: "field-1",
        is_project_group: true,
        group_sort: "desc",
        filter: [{ status: { values: ["open"], operator: "in" } }],
        sort: [{ field: "modified_date", asc: false }],
        filter_mode: "AND_OR",
        page: 1,
        page_size: 20
      }),
      client.listIpdTenantIssues({
        project_id: ["ipd-1", "ipd-2"],
        issue_type: "Bug",
        filter_mode: "AND_OR",
        page: 1,
        page_size: 20
      }),
      client.getIpdStatisticDashboard({
        project_id: "ipd-1",
        classification: "requirement",
        plan: { plan_pi: "pi-1", plan_iteration: "iter-1" },
        created_date: { start_date: "2025-01-01", end_date: "2025-01-31" }
      })
    ]);

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/issues/tree?category=IR%2CUS",
        body: {
          keyword: "login",
          number: ["IR-1"],
          plan: [{ plan_pi: "pi-1", plan_iteration: ["iter-1"] }],
          modified_date: { start_date: "2025-01-01", end_date: "2025-01-31" },
          offset: 10,
          limit: 10
        }
      },
      {
        method: "GET",
        path: "/v1/ipdprojectservice/projects/ipd-1/issue/get-attached-wikis?issue_id=issue-1&category=IR"
      },
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/issues/group?issue_type=IR&group_field_id=field-1&is_project_group=true&group_sort=desc",
        body: {
          filter: [{ status: { values: ["open"], operator: "in" } }],
          filter_mode: "AND_OR",
          page: { page_no: 1, page_size: 20 },
          sort: [{ field: "modified_date", asc: false }]
        }
      },
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/tenant/query?issue_type=Bug&project_id=ipd-1%2Cipd-2",
        body: {
          filter_mode: "AND_OR",
          page: { page_no: 1, page_size: 20 }
        }
      },
      {
        method: "POST",
        path: "/v1/ipdprojectservice/projects/ipd-1/statistic/dashboard?classification=requirement",
        body: {
          plan: { plan_pi: "pi-1", plan_iteration: "iter-1" },
          created_date: { start_date: "2025-01-01", end_date: "2025-01-31" }
        }
      }
    ]);
    expect(tree).toEqual({ issues: [expect.objectContaining({ id: "issue-1" })], total: 1 });
    expect(wikis).toEqual({ wikis: [expect.objectContaining({ wiki_id: "wiki-1" })], total: 1 });
    expect(grouped.data).toEqual([expect.objectContaining({ id: "g-1" })]);
    expect(tenantIssues).toEqual({ issues: [expect.objectContaining({ id: "issue-2" })], total: 1 });
    expect(dashboard.items).toEqual([expect.objectContaining({ category: "IR", total: 3 })]);
  });

  it("maps IPD feature set and trace read requests to documented endpoints", async () => {
    const requests: Array<{ method: string; path: string }> = [];
    const client = createReqClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });

        if (path.endsWith("/snapshots/version")) {
          return { status: "success", result: [{ id: "snap-1", title: "Baseline" }] };
        }
        if (path.includes("/feature-set/query")) {
          return { status: "success", result: [{ id: "fs-1", title: "Feature Set", parent_id: "root" }] };
        }
        if (path.includes("/snapshots-feature/query")) {
          return { status: "success", result: { issues: [{ id: "issue-1", title: "Feature" }], total: 1 } };
        }
        if (path.includes("/e2e/graphs")) {
          return { id: "issue-1", title: "Feature", status: "Open" };
        }
        if (path.includes("/flow/detail")) {
          return { status: "success", result: { next_flow: [{ code: "to_done", name: "Done" }] } };
        }

        return { status: "success", total: 1, result: [{ name: "分析", belonging: "IN_PROGRESS" }] };
      }
    } as never);

    const [snapshots, featureSets, features, graph, statuses, flowDetail] = await Promise.all([
      client.listIpdSnapshotVersions({ project_id: "ipd-1" }),
      client.listIpdFeatureSets({ project_id: "ipd-1", snapshot_version_id: "snap-1" }),
      client.listIpdSnapshotFeatures({
        project_id: "ipd-1",
        snapshot_version_id: "snap-1",
        feature_set_id: "fs-1",
        page: 2,
        page_size: 10
      }),
      client.getIpdE2EGraph({ project_id: "ipd-1", issue_id: "issue-1", category: "SF", is_src: true }),
      client.listIpdCategoryStatuses({ project_id: "ipd-1", category_id: "10065" }),
      client.getIpdWorkItemFlowDetail({ project_id: "ipd-1", issue_id: "issue-1", issue_category: "Bug" })
    ]);

    expect(requests).toEqual([
      { method: "GET", path: "/v1/ipdprojectservice/projects/ipd-1/snapshots/version" },
      { method: "GET", path: "/v1/ipdprojectservice/projects/ipd-1/feature-set/query?snapshot_version_id=snap-1" },
      {
        method: "GET",
        path: "/v1/ipdprojectservice/projects/ipd-1/snapshots-feature/query?snapshot_version_id=snap-1&feature_set_id=fs-1&offset=10&limit=10"
      },
      { method: "GET", path: "/v1/ipdprojectservice/projects/ipd-1/e2e/graphs?issue_id=issue-1&category=SF&is_src=true" },
      { method: "GET", path: "/v1/ipdprojectservice/projects/ipd-1/category/10065/statuses" },
      { method: "GET", path: "/v1/ipdprojectservice/projects/ipd-1/work-item/issue-1/flow/detail?issue_category=Bug" }
    ]);
    expect(snapshots.snapshots).toEqual([expect.objectContaining({ id: "snap-1" })]);
    expect(featureSets.feature_sets).toEqual([expect.objectContaining({ id: "fs-1" })]);
    expect(features).toEqual({ issues: [expect.objectContaining({ id: "issue-1" })], total: 1 });
    expect(graph).toEqual(expect.objectContaining({ id: "issue-1", title: "Feature" }));
    expect(flowDetail.next_flow).toEqual([expect.objectContaining({ code: "to_done", name: "Done" })]);
    expect(statuses).toEqual({ statuses: [expect.objectContaining({ name: "分析" })], total: 1 });
  });
  it("allows custom IPD project model selection and model_id alias", async () => {
    const requests: Array<{ method: string; path: string }> = [];
    const client = createReqClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
        return {
          result: [
            {
              project_id: "ipd-1",
              project_name: "IPD Project",
              model_id: "20001"
            }
          ]
        };
      }
    } as never);

    const [customModel, aliasModel] = await Promise.all([
      client.listIpdProjects({
        search: "demo",
        model: "20001"
      }),
      client.listIpdProjects({
        model_id: "custom-model-x"
      })
    ]);

    expect(requests).toEqual([
      {
        method: "GET",
        path: "/v1/ipdprojectservice/projects/ipd?search=demo&model=20001"
      },
      {
        method: "GET",
        path: "/v1/ipdprojectservice/projects/ipd?model=custom-model-x"
      }
    ]);
    expect(customModel.projects).toEqual([expect.objectContaining({ project_id: "ipd-1", model_id: "20001" })]);
    expect(aliasModel.projects).toEqual([expect.objectContaining({ project_id: "ipd-1", model_id: "20001" })]);
  });
});
