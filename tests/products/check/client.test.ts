import { describe, expect, it } from "vitest";
import { createCheckClient } from "../../../src/products/check/client.js";

function createClient(transport: Record<string, unknown>) {
  return createCheckClient(transport as never);
}

function createTaskInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "project-1",
    task_name: "scan-demo",
    git_url: "https://example.com/demo.git",
    git_branch: "main",
    language: "java",
    ...(overrides ?? {})
  };
}

function createProjectPageInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "project-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  };
}

function createTaskRefInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    task_id: "task-1",
    ...(overrides ?? {})
  };
}

function createTaskPageInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    task_id: "task-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  };
}

function createProjectTaskInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "project-1",
    task_id: "task-1",
    ...(overrides ?? {})
  };
}

describe("createCheckClient", () => {
  it("uses the documented create-task payload with rule_sets", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          task_id: "task-1",
          task_name: "scan-demo"
        };
      }
    });

    await client.createTask(createTaskInput({
      rule_set_id: "ruleset-1",
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      include_paths: "src,lib",
      exclude_dir: "dist",
      task_type: "full"
    }));

    expect(requestedPath).toBe("/v2/project-1/task");
    expect(requestedBody).toEqual({
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      check_type: ["source"],
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      include_paths: "src,lib",
      exclude_dir: "dist",
      rule_sets: [
        {
          language: "java",
          ruleset_id: "ruleset-1"
        }
      ],
      task_type: "full"
    });
  });

  it("uses documented create and delete ruleset endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {
          result: {
            template_id: "ruleset-1",
            template_name: "java-custom",
            language: "JAVA",
            is_default: "1"
          }
        };
      },
      delete: async (path: string) => {
        requests.push({ method: "DELETE", path });
        return null;
      }
    });

    await expect(client.createRuleset({
      project_id: "project-1",
      template_name: "java-custom",
      language: "JAVA",
      is_default: "1",
      template_id: "ruleset-base",
      rule_ids: "rule-1,rule-2",
      uncheck_ids: "rule-3",
      custom_attributes: [
        {
          attribute: "severity",
          rules: [
            {
              rule_id: "rule-1",
              value: "1"
            }
          ]
        }
      ]
    })).resolves.toEqual({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      template_name: "java-custom",
      language: "JAVA",
      is_default: "1",
      raw: {
        template_id: "ruleset-1",
        template_name: "java-custom",
        language: "JAVA",
        is_default: "1"
      }
    });

    await expect(client.deleteRuleset({
      project_id: "project-1",
      ruleset_id: "ruleset-1"
    })).resolves.toEqual({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      raw: undefined
    });

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v2/ruleset",
        body: {
          project_id: "project-1",
          template_name: "java-custom",
          language: "JAVA",
          is_default: "1",
          rule_ids: "rule-1,rule-2",
          uncheck_ids: "rule-3",
          template_id: "ruleset-base",
          custom_attributes: [
            {
              attribute: "severity",
              rules: [
                {
                  rule_id: "rule-1",
                  value: "1"
                }
              ]
            }
          ]
        }
      },
      {
        method: "DELETE",
        path: "/v2/project-1/ruleset/ruleset-1"
      }
    ]);
  });

  it("maps incremental task type to the documented inc value", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1"
        };
      }
    });

    await client.createTask(createTaskInput({
      task_type: "incremental"
    }));

    expect(requestedBody).toEqual({
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      check_type: ["source"],
      resource_pool_id: undefined,
      resource_pool_type: undefined,
      include_paths: undefined,
      exclude_dir: undefined,
      language: ["java"],
      task_type: "inc"
    });
  });

  it("uses the project-scoped metrics endpoint when project_id is provided", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            summary: {
              code_lines: 1200
            }
          }
        };
      }
    });

    await client.getMetrics(createProjectTaskInput());

    expect(requestedPath).toBe("/v2/project-1/tasks/task-1/metrics-summary");
  });

  it("sends an empty json object when running a task", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1"
        };
      }
    });

    await client.runTask(createTaskRefInput());

    expect(requestedBody).toEqual({});
  });

  it("passes the documented ref when running a task", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1",
          exec_id: "exec-1"
        };
      }
    });

    const result = await client.runTask(
      createTaskRefInput({
        ref: "refs/merge-requests/12/head"
      })
    );

    expect(requestedBody).toEqual({
      ref: "refs/merge-requests/12/head"
    });
    expect(result).toEqual({
      task_id: "task-1",
      job_id: "exec-1",
      exec_id: "exec-1",
      status: undefined
    });
  });

  it("sends an empty json object when stopping a task", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1"
        };
      }
    });

    await client.stopTask(createTaskRefInput());

    expect(requestedBody).toEqual({});
  });

  it("falls back to the requested task id when stop returns an empty success body", async () => {
    const client = createClient({
      post: async () => null
    });

    const result = await client.stopTask(createTaskRefInput());

    expect(result).toEqual({
      task_id: "task-1",
      status: undefined
    });
  });

  it("uses documented Check issue status and PDF async job endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {
          status: "success",
          result: "ok"
        };
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "PUT", path, body });
        return {
          status: "success",
          result: {
            timeAsk: 3,
            asyncJobId: 569151
          }
        };
      }
    });

    await expect(client.updateIssueStatus({
      task_id: "task-1",
      status: "5",
      comment: "tool false positive",
      merge_key: "merge-1",
      merge_id: "mr-1",
      job_id: "job-1",
      operator: "szh"
    })).resolves.toEqual({
      task_id: "task-1",
      merge_key: "merge-1",
      status: "success",
      result: "ok",
      raw: {
        status: "success",
        result: "ok"
      }
    });

    await expect(client.createPdfAsyncJob({
      task_id: "task-1",
      project_name: "mall4cloud"
    })).resolves.toEqual({
      task_id: "task-1",
      async_job_id: 569151,
      time_ask: 3,
      raw: {
        timeAsk: 3,
        asyncJobId: 569151
      }
    });

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v1/defect/issue-status",
        body: {
          taskId: "task-1",
          mergeId: "mr-1",
          jobId: "job-1",
          status: "5",
          comment: "tool false positive",
          mergeKey: "merge-1",
          operator: "szh"
        }
      },
      {
        method: "PUT",
        path: "/v1/tasks/task-1/pdf-async-job?project_name=mall4cloud",
        body: {}
      }
    ]);
  });

  it("uses documented Check task configuration write endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown; options?: unknown }> = [];
    const client = createClient({
      put: async (path: string, body?: unknown, options?: unknown) => {
        requests.push({ method: "PUT", path, body, options });
        return {
          httpStatus: "OK",
          status: "success",
          result: "updated"
        };
      }
    });

    await expect(client.updateCodeGate({
      task_id: "task-1",
      operator: "szh",
      review_data: [
        {
          compare_type: ">=",
          is_check: 1,
          name: "fatal",
          value: 0
        }
      ]
    })).resolves.toEqual({
      task_id: "task-1",
      status: "success",
      result: "updated",
      raw: {
        httpStatus: "OK",
        status: "success",
        result: "updated"
      }
    });

    await expect(client.updateIgnoreFiles({
      task_id: "task-1",
      nodes: [
        {
          file_path: "src/generated",
          name: "generated",
          is_leaf: false,
          checkbox_status: "all"
        }
      ]
    })).resolves.toEqual({
      task_id: "task-1",
      result: "updated",
      raw: {
        httpStatus: "OK",
        status: "success",
        result: "updated"
      }
    });

    await expect(client.updateCheckMode({
      task_id: "task-1",
      mr_check_mode: 0,
      operator: "szh"
    })).resolves.toEqual({
      task_id: "task-1",
      status: "success",
      result: "updated",
      raw: {
        httpStatus: "OK",
        status: "success",
        result: "updated"
      }
    });

    expect(requests).toEqual([
      {
        method: "PUT",
        path: "/v1/task/code-gate",
        body: {
          id: "task-1",
          reviewData: [
            {
              compareType: ">=",
              isCheck: 1,
              name: "fatal",
              value: 0
            }
          ]
        },
        options: {
          headers: {
            operator: "szh"
          }
        }
      },
      {
        method: "PUT",
        path: "/v4/task/task-1/ignore-files",
        body: {
          nodes: [
            {
              name: "generated",
              file_path: "src/generated",
              is_leaf: false,
              checkbox_status: "all"
            }
          ]
        },
        options: undefined
      },
      {
        method: "PUT",
        path: "/v1/task/check-mode",
        body: {
          id: "task-1",
          mrCheckMode: 0
        },
        options: {
          headers: {
            operator: "szh"
          }
        }
      }
    ]);
  });

  it("uses the real project-scoped tasks endpoint when project_id is provided", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          tasks: [
            {
              task_id: "task-1",
              task_name: "scan-demo",
              git_url: "https://example.com/demo.git",
              git_branch: "main"
            }
          ],
          total: 1
        };
      }
    });

    const result = await client.listTasks(createProjectPageInput());

    expect(requestedPath).toContain("/v2/project-1/tasks?offset=0&limit=20");
    expect(result.tasks[0]).toEqual({
      task_id: "task-1",
      task_name: "scan-demo",
      project_name: undefined,
      repository_name: "https://example.com/demo.git",
      branch_name: "main",
      language: undefined,
      status: undefined
    });
  });

  it("uses additional official read endpoints", async () => {
    const paths: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        paths.push(path);
        if (path.includes("next-status")) {
          return { result: { statuses: [{ id: "1", name: "Open" }] } };
        }
        return { result: { id: "raw-1", ok: true } };
      }
    });

    await client.getTaskById({ task_id: "task-1" });
    await client.getTaskIssueStatistics({ task_id: "task-1" });
    await client.getDefectMetricTrend({
      task_id: "task-1",
      start_time: "2026-01-01",
      end_time: "2026-01-31",
      metric_type: "defect"
    });
    await client.listDefectNextStatuses({ query: { status_id: 1 } });
    await client.getSingleDefect({ defect_id: "defect-1", task_id: "task-1" });
    await client.getAsyncJobV2({ task_id: "task-1", async_job_id: "job-1" });
    await client.getAsyncJob({ task_id: "task-1", async_job_id: "123" });
    await client.getPdfFile({ task_id: "task-1", job_file: "defects/PdfFiles/report.pdf" });
    await client.getTaskMeasures({ task_id: "task-1" });
    await client.downloadLogFile({ sub_job_id: "sub-job-1" });
    await client.getDefectFileContent({
      task_id: "task-1",
      defect_id: "defect-1",
      file_path: "src/app.ts"
    });

    expect(paths).toEqual([
      "/v3/task/task-1",
      "/v1/defects/task-statistics?task_id=task-1",
      "/v1/history/defect-metric-trend?task_id=task-1&start_time=2026-01-01&end_time=2026-01-31&metric_type=defect",
      "/v1/defects/next-status?status_id=1",
      "/v1/defect?defect_id=defect-1&task_id=task-1",
      "/v2/async-job?task_id=task-1&async_job_id=job-1",
      "/v1/tasks/task-1/async-job/123",
      "/v1/tasks/task-1/pdf-file?job_file=defects%2FPdfFiles%2Freport.pdf",
      "/v1/defects/task-measures?task_id=task-1",
      "/v1/log-file?sub_job_id=sub-job-1",
      "/v1/defects/file-content?task_id=task-1&defect_id=defect-1&file_path=src%2Fapp.ts"
    ]);
  });

  it("maps project-scoped ruleset responses from the real info payload", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          info: [
            {
              template_id: "ruleset-1",
              template_name: "Java Default",
              language: "JAVA",
              creator_id: "system"
            }
          ]
        };
      }
    });

    const result = await client.listRulesets(createProjectPageInput());

    expect(requestedPath).toContain("/v2/project-1/rulesets?offset=0&limit=20");
    expect(result).toEqual({
      rulesets: [
        {
          id: "ruleset-1",
          name: "Java Default",
          language: "java",
          is_system: true
        }
      ],
      total: 1
    });
  });

  it("uses the documented defects-detail endpoint for task issues", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          defects: [],
          total: 0
        };
      }
    });

    await client.listTaskIssues(
      createTaskPageInput({
        page: 2,
        page_size: 50,
        severity: "1",
        status_ids: "0,1",
        delay_status: "0",
        rule_id: "rule-1",
        rule_name: "NullPointer",
        file_path: "src/App.java",
        status: "open",
        checker: "java"
      })
    );

    expect(requestedPath).toBe(
      "/v2/tasks/task-1/defects-detail?offset=50&limit=50&defect_level=1&rule_id=rule-1&rule_name=NullPointer&file_path=src%2FApp.java&status=open&status_ids=0%2C1&delay_status=0&checker=java"
    );
  });

  it("maps documented defects-detail fields into MCP issue items", async () => {
    const client = createClient({
      get: async () => ({
        defects: [
          {
            defect_id: "issue-1",
            rule_name: "NullPointer",
            defect_level: "1",
            file_path: "src/App.java",
            line_number: "42"
          }
        ],
        total: 1
      })
    });

    const result = await client.listTaskIssues(createTaskPageInput());

    expect(result).toEqual({
      issues: [
        {
          issue_id: "issue-1",
          rule_name: "NullPointer",
          severity: "1",
          file_path: "src/App.java",
          line: 42
        }
      ],
      total: 1
    });
  });

  it("uses documented task log, path tree, and console log endpoints", async () => {
    const paths: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        paths.push(path);
        if (path.includes("/log-detail")) {
          return { result: { log_info: [{ display_name: "compile", level: "error" }] } };
        }
        if (path.includes("/listpathtree")) {
          return {
            result: {
              info: [{ file_name: "src", file_path: "/src", is_leaf: false }],
              total: 1
            }
          };
        }
        return { result: { log: "scan started", hasMore: false } };
      }
    });

    await expect(client.getTaskLogDetail({
      project_id: "project-1",
      task_id: "task-1",
      execute_id: "exec-1"
    })).resolves.toEqual({
      task_id: "task-1",
      raw: { log_info: [{ display_name: "compile", level: "error" }] }
    });
    await expect(client.listTaskPathTree({
      project_id: "project-1",
      task_id: "task-1",
      current_path: "/src",
      page: 2,
      page_size: 20
    })).resolves.toEqual({
      nodes: [{ file_name: "src", file_path: "/src", is_leaf: false }],
      total: 1
    });
    await expect(client.getConsoleLog({
      job_id: "job-1",
      start_offset: 0,
      end_offset: 100,
      size: 200,
      sort: "asc"
    })).resolves.toEqual({
      job_id: "job-1",
      raw: { log: "scan started", hasMore: false }
    });
    expect(paths).toEqual([
      "/v2/project-1/tasks/task-1/log-detail?execute_id=exec-1",
      "/v2/project-1/tasks/task-1/listpathtree?offset=20&limit=20&current_path=%2Fsrc",
      "/v1/console-log?job_id=job-1&start_offset=0&end_offset=100&size=200&sort=asc"
    ]);
  });

  it("maps top-level defects summary fields for task detail", async () => {
    const client = createClient({
      get: async () => ({
        task_id: "task-1",
        task_name: "sample",
        git_url: "git@example.com/demo.git",
        git_branch: "master",
        review_result: "success",
        last_check_time: "2026-04-17T00:57:38Z"
      })
    });

    const result = await client.getTask(createTaskRefInput());

    expect(result).toEqual({
      task_id: "task-1",
      task_name: "sample",
      project_name: undefined,
      repository_name: "git@example.com/demo.git",
      branch_name: "master",
      language: undefined,
      status: "success",
      last_check_time: "2026-04-17T00:57:38Z"
    });
  });

  it("maps top-level metric_info fields for metrics summary", async () => {
    const client = createClient({
      get: async () => ({
        metric_info: {
          code_size: "5",
          code_duplication_total: "2"
        }
      })
    });

    const result = await client.getMetrics(createProjectTaskInput());

    expect(result).toEqual({
      task_id: "task-1",
      code_lines: 5,
      issues_count: undefined,
      duplicated_lines: 2
    });
  });

  it("reads additional task metadata endpoints from the Check API docs", async () => {
    const requests: string[] = [];
    const putRequests: Array<{ path: string; body?: unknown }> = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.endsWith("/resource-pool")) {
          return { result: { pool_id: "pool-1", pool_name: "default" } };
        }
        if (path.endsWith("/jobs")) {
          return { result: { jobs: [{ job_id: "job-1", status: "done" }], total: 1 } };
        }
        if (path.endsWith("/progress")) {
          return { result: { progress: 100 } };
        }
        if (path.endsWith("/rulesets")) {
          return { result: { value: [{ id: "ruleset-1", name: "Java" }], total: 1 } };
        }
        if (path.endsWith("/check-parameters")) {
          return { result: { parameters: [{ id: "param-1", name: "threshold" }], total: 1 } };
        }
        if (path.endsWith("/settings")) {
          return { result: { value: { language: "java" } } };
        }

        return { result: { branches: [{ id: "branch-1", name: "main" }], total: 1 } };
      },
      put: async (path: string, body?: unknown) => {
        putRequests.push({ path, body });
        return { result: "updated", status: "success" };
      }
    });

    await expect(client.getTaskResourcePool(createTaskRefInput())).resolves.toEqual({
      task_id: "task-1",
      raw: { pool_id: "pool-1", pool_name: "default" }
    });
    await expect(client.listTaskJobs(createTaskRefInput())).resolves.toEqual({
      jobs: [{ job_id: "job-1", status: "done" }],
      total: 1
    });
    await expect(client.getTaskProgress(createTaskRefInput())).resolves.toEqual({
      task_id: "task-1",
      raw: { progress: 100 }
    });
    await expect(client.listTaskRulesetsV2(createProjectTaskInput())).resolves.toEqual({
      rulesets: [{ id: "ruleset-1", name: "Java" }],
      total: 1
    });
    await expect(client.listTaskRulesetsV3(createProjectTaskInput())).resolves.toEqual({
      rulesets: [{ id: "ruleset-1", name: "Java" }],
      total: 1
    });
    await expect(
      client.getTaskRulesetCheckParametersV2({
        project_id: "project-1",
        task_id: "task-1",
        ruleset_id: "ruleset-1"
      })
    ).resolves.toEqual({
      parameters: [{ id: "param-1", name: "threshold" }],
      total: 1
    });
    await expect(
      client.getTaskRulesetCheckParametersV3({
        project_id: "project-1",
        task_id: "task-1",
        ruleset_id: "ruleset-1"
      })
    ).resolves.toEqual({
      parameters: [{ id: "param-1", name: "threshold" }],
      total: 1
    });
    await expect(client.getTaskSettings(createProjectTaskInput())).resolves.toEqual({
      task_id: "task-1",
      raw: { language: "java" }
    });
    await expect(client.updateTaskResourcePool({
      task_id: "task-1",
      resource_pool_id: "pool-2",
      resource_pool_type: "custom",
      body: {
        pool_name: "high-cpu"
      }
    })).resolves.toEqual({
      task_id: "task-1",
      status: "success",
      result: "updated",
      raw: { result: "updated", status: "success" }
    });
    await expect(client.updatePipelineTask({
      task_id: "task-1",
      body: {
        task_name: "pipeline-check"
      }
    })).resolves.toEqual({
      task_id: "task-1",
      status: "success",
      result: "updated",
      raw: { result: "updated", status: "success" }
    });
    await expect(client.listTaskBranches(createProjectTaskInput())).resolves.toEqual({
      branches: [{ id: "branch-1", name: "main" }],
      total: 1
    });

    expect(requests).toEqual([
      "/v1/tasks/task-1/resource-pool",
      "/v4/tasks/task-1/jobs",
      "/v2/tasks/task-1/progress",
      "/v2/project-1/tasks/task-1/rulesets",
      "/v3/project-1/tasks/task-1/rulesets",
      "/v2/project-1/tasks/task-1/ruleset/ruleset-1/check-parameters",
      "/v3/project-1/tasks/task-1/ruleset/ruleset-1/check-parameters",
      "/v2/project-1/tasks/task-1/settings",
      "/v3/project-1/tasks/task-1/branches"
    ]);
    expect(putRequests).toEqual([
      {
        path: "/v1/tasks/task-1/resource-pool",
        body: {
          pool_name: "high-cpu",
          resource_pool_id: "pool-2",
          resource_pool_type: "custom"
        }
      },
      {
        path: "/v2/pipeline-task/task-1",
        body: {
          task_name: "pipeline-check"
        }
      }
    ]);
  });

  it("uses documented file, language, repository, and checker version endpoints", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/file-list")) {
          return { result: { files: [{ id: "file-1", path: "src/App.java" }], total: 1 } };
        }
        if (path.includes("/all-files")) {
          return { result: { value: [{ id: "file-2", path: "src/lib" }], total: 1 } };
        }
        if (path.includes("/detect-language")) {
          return { result: { languages: ["java"] } };
        }
        if (path.includes("/repo-list")) {
          return { result: { repositories: [{ id: "repo-1", name: "demo" }], total: 1 } };
        }

        return { result: { version: "2026.05", checkers: [{ name: "java" }] } };
      }
    });

    await expect(client.listTaskFiles(createTaskRefInput())).resolves.toEqual({
      files: [{ id: "file-1", path: "src/App.java" }],
      total: 1
    });
    await expect(client.listTaskAllFiles({
      task_id: "task-1",
      file_path: "src",
      get_son: true
    })).resolves.toEqual({
      files: [{ id: "file-2", path: "src/lib" }],
      total: 1
    });
    await expect(client.detectTaskLanguage({
      task_id: "task-1",
      scan_file: false
    })).resolves.toEqual({
      task_id: "task-1",
      raw: { languages: ["java"] }
    });
    await expect(client.listCodehubRepositories({
      project_id: "project-1",
      page: 2,
      page_size: 10,
      search: "demo"
    })).resolves.toEqual({
      repositories: [{ id: "repo-1", name: "demo" }],
      total: 1
    });
    await expect(client.getDomainCheckersVersion({ domain_id: "domain-1" })).resolves.toEqual({
      domain_id: "domain-1",
      raw: { version: "2026.05", checkers: [{ name: "java" }] }
    });

    expect(requests).toEqual([
      "/v4/tasks/task-1/file-list",
      "/v4/tasks/task-1/all-files?file_path=src&get_son=true",
      "/v1/tasks/task-1/detect-language?scan_file=false",
      "/v4/codehub/repo-list?offset=10&limit=10&project_id=project-1&search=demo",
      "/v2/domain-1/checkers-version"
    ]);
  });

  it("uses documented check record, rules, default ruleset, and language endpoints", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/checkrecord")) {
          return { result: { records: [{ id: "record-1", status: "success" }], total: 1 } };
        }
        if (path.includes("/v2/rules")) {
          return { result: { rules: [{ id: "rule-1", name: "NoBug" }], total: 1 } };
        }
        if (path.includes("/get-default-sets")) {
          return { result: { JAVA: "ruleset-1" } };
        }

        return { result: ["JAVA", "PYTHON"] };
      }
    });

    await expect(client.listTaskCheckRecords({
      project_id: "project-1",
      task_id: "task-1",
      page: 2,
      page_size: 10,
      start_time: "2026-05-01T00:00:00Z",
      end_time: "2026-05-23T00:00:00Z"
    })).resolves.toEqual({
      records: [{ id: "record-1", status: "success" }],
      total: 1
    });
    await expect(client.listRules({
      page: 3,
      page_size: 20,
      rule_languages: "JAVA",
      rule_severity: "MAJOR",
      keyword: "bug"
    })).resolves.toEqual({
      rules: [{ id: "rule-1", name: "NoBug" }],
      total: 1
    });
    await expect(client.listDefaultRulesets({ project_id: "project-1" })).resolves.toEqual({
      project_id: "project-1",
      raw: { JAVA: "ruleset-1" }
    });
    await expect(client.listSupportedLanguages()).resolves.toEqual({
      languages: ["JAVA", "PYTHON"]
    });

    expect(requests).toEqual([
      "/v2/project-1/tasks/task-1/checkrecord?offset=10&limit=10&start_time=2026-05-01T00%3A00%3A00Z&end_time=2026-05-23T00%3A00%3A00Z",
      "/v2/rules?offset=40&limit=20&rule_languages=JAVA&rule_severity=MAJOR&name=bug",
      "/v1/criterionset/get-default-sets?project_id=project-1",
      "/v2/excute/language/all"
    ]);
  });

  it("uses documented notification, measures, branch, tenant, and template task endpoints", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/task/notification/")) {
          return {
            codeGateFailed: {
              sendMail: true,
              sendMessage: true
            }
          };
        }
        if (path.includes("/code-sum-measures")) {
          return {
            codeLineCountSum: 10,
            defectCountSum: 2
          };
        }
        if (path.includes("/branches")) {
          return {
            data: ["main", "dev"],
            total: 2
          };
        }
        if (path.includes("/transmission/notification")) {
          return {
            result: {
              executeTask: {
                eventType: "taskExecuteCompleted",
                sendMail: 1
              }
            },
            status: "success"
          };
        }
        if (path.includes("/tenant-package-status")) {
          return {
            result: {
              charge_type: "free",
              duration: 120
            }
          };
        }

        return {
          data: [
            {
              id: "template-1",
              name: "Java template",
              taskId: "task-1"
            }
          ],
          total: 1
        };
      }
    });

    await expect(client.getTaskNotification(createTaskRefInput())).resolves.toEqual({
      task_id: "task-1",
      raw: {
        codeGateFailed: {
          sendMail: true,
          sendMessage: true
        }
      }
    });
    await expect(client.getCodeSumMeasures()).resolves.toEqual({
      raw: {
        codeLineCountSum: 10,
        defectCountSum: 2
      }
    });
    await expect(client.listTaskRepositoryBranches({
      task_id: "task-1",
      page: 2,
      page_size: 20,
      is_uncreated_only: true,
      search: "ma",
      repo_type: "gitcode"
    })).resolves.toEqual({
      branches: [
        { id: "main", name: "main", branch: "main" },
        { id: "dev", name: "dev", branch: "dev" }
      ],
      total: 2
    });
    await expect(client.listTaskRepositoryBranches({
      task_id: "task-1",
      page: 1,
      page_size: 10
    })).resolves.toEqual({
      branches: [
        { id: "main", name: "main", branch: "main" },
        { id: "dev", name: "dev", branch: "dev" }
      ],
      total: 2
    });
    await expect(client.getTransmissionNotification({
      is_check_project: 1,
      domain_id: "domain-1",
      project_id: "project-1"
    })).resolves.toEqual({
      raw: {
        executeTask: {
          eventType: "taskExecuteCompleted",
          sendMail: 1
        }
      }
    });
    await expect(client.getTenantPackageStatus({
      project_id: "project-1"
    })).resolves.toEqual({
      raw: {
        charge_type: "free",
        duration: 120
      }
    });
    await expect(client.listTemplateTasks({
      project_id: "project-1",
      page: 2,
      page_size: 15,
      search: "Java"
    })).resolves.toEqual({
      tasks: [
        {
          id: "template-1",
          name: "Java template",
          taskId: "task-1"
        }
      ],
      total: 1
    });

    expect(requests).toEqual([
      "/v1/task/notification/task-1",
      "/v1/tasks/code-sum-measures",
      "/v4/tasks/task-1/branches?page=2&page_size=20&is_uncreated_only=true&search=ma&repo_type=gitcode",
      "/v4/tasks/task-1/branches?page=1&page_size=10",
      "/v2/transmission/notification?is_check_project=1&domain_id=domain-1&project_id=project-1",
      "/v4/tenant/tenant-package-status?project_id=project-1",
      "/v4/template-tasks?page=1&page_size=15&project_id=project-1&search=Java"
    ]);
  });

  it("uses documented plugin, task webhook, and code health SVG endpoints", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/plugins")) {
          return {
            plugins: [
              {
                id: "plugin-1",
                name: "CodeHealth",
                version: "1.0.0",
                publisher_name: "Huawei"
              }
            ],
            total: 1
          };
        }
        if (path.includes("/task-webhook-info")) {
          return {
            result: {
              enabled: true,
              url: "https://example.com/hook"
            }
          };
        }

        return "<svg></svg>";
      }
    });

    await expect(client.listPlugins({
      id: "plugin-1",
      name: "CodeHealth",
      version: "1.0.0",
      publisher_name: "Huawei"
    })).resolves.toEqual({
      plugins: [
        {
          id: "plugin-1",
          name: "CodeHealth",
          version: "1.0.0",
          publisher_name: "Huawei"
        }
      ],
      total: 1
    });
    await expect(client.getTaskWebhookInfo(createTaskRefInput())).resolves.toEqual({
      task_id: "task-1",
      raw: {
        enabled: true,
        url: "https://example.com/hook"
      }
    });
    await expect(client.getCodeHealthSvg(createTaskRefInput())).resolves.toEqual({
      task_id: "task-1",
      raw: "<svg></svg>"
    });

    expect(requests).toEqual([
      "/v2/plugins?id=plugin-1&name=CodeHealth&version=1.0.0&publisher_name=Huawei",
      "/v4/tasks/task-1/task-webhook-info",
      "/v4/task/task-1/code-health-svg"
    ]);
  });

  it("uses documented check mutation endpoints for webhook, owner switch, default ruleset, and config parameters", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createClient({
      put: async (path: string, body: unknown) => {
        requests.push({ method: "PUT", path, body });
        return { status: "ok", result: "success" };
      },
      post: async (path: string, body: unknown) => {
        requests.push({ method: "POST", path, body });
        return { status: "ok", result: "success" };
      }
    });

    await expect(client.updateTaskWebhook({
      task_id: "task-1",
      body: { enabled: true, url: "https://example.com/hook" }
    })).resolves.toMatchObject({ task_id: "task-1", status: "ok" });
    await expect(client.updateTaskOwnerMatchingSwitch({
      task_id: "task-1",
      enabled: false
    })).resolves.toMatchObject({ task_id: "task-1", status: "ok" });
    await expect(client.setDefaultRuleset({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      language: "JAVA"
    })).resolves.toMatchObject({ project_id: "project-1", ruleset_id: "ruleset-1", language: "JAVA" });
    await expect(client.updateTaskConfigParameters({
      project_id: "project-1",
      task_id: "task-1",
      body: { scan_type: "full" }
    })).resolves.toMatchObject({ task_id: "task-1", status: "ok" });

    expect(requests).toEqual([
      { method: "PUT", path: "/v4/tasks/task-1/webhook", body: { enabled: true, url: "https://example.com/hook" } },
      { method: "PUT", path: "/v1/tasks/task-1/owner-matching-switch", body: { enabled: false } },
      { method: "POST", path: "/v2/project-1/ruleset/ruleset-1/JAVA/default", body: {} },
      { method: "POST", path: "/v2/project-1/tasks/task-1/config-parameters", body: { scan_type: "full" } }
    ]);
  });

  it("uses documented ruleset metadata endpoints", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/ruleset/ruleset-1/rules")) {
          return {
            info: [
              {
                rule_id: "rule-1",
                rule_name: "NoBug",
                rule_language: "JAVA"
              }
            ],
            total: 1
          };
        }
        if (path.includes("/criterionsets/language")) {
          return {
            result: {
              criterionSetList: [
                {
                  id: "set-1",
                  name: "Java default",
                  language: "JAVA"
                }
              ],
              total: 1
            }
          };
        }
        if (path.includes("/criterion-rule/query")) {
          return {
            result: {
              id: "criterion-1",
              name: "NoBug",
              severity: "1"
            }
          };
        }
        if (path.includes("/all-thirdtools")) {
          return {
            result: ["checker01", "checker02"]
          };
        }
        if (path.includes("/criterionsets/set-1")) {
          return {
            result: {
              id: "set-1",
              name: "Java default"
            }
          };
        }
        if (path.includes("/criterion-filters")) {
          return {
            result: {
              filters: [
                {
                  id: "filter-1",
                  name: "Security"
                }
              ],
              total: 1
            }
          };
        }
        if (path.includes("/v2/criterions")) {
          return {
            result: {
              criterions: [
                {
                  id: "criterion-2",
                  name: "NoBug",
                  language: "JAVA"
                }
              ],
              total: 1
            }
          };
        }
        if (path.includes("/defects-statistic")) {
          return {
            result: {
              total_defects: 2,
              fixed_defects: 1
            }
          };
        }
        if (path.includes("/vpcep-authorization")) {
          return {
            status: "ok",
            data: {
              result: "Allow",
              config: false
            }
          };
        }
        if (path.includes("/check-list")) {
          return {
            result: {
              total: 1,
              list: [
                {
                  taskId: "child-task-1",
                  branchName: "main"
                }
              ]
            }
          };
        }

        return {
          result: {
            criterionSetList: [
              {
                id: "set-2",
                name: "Python default",
                language: "PYTHON"
              }
            ],
            total: 1
          }
        };
      }
    });

    await expect(client.listRulesetRules({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      page: 2,
      page_size: 10,
      types: "1",
      languages: "JAVA",
      tags: "cwe",
      keyword: "security",
      sort_by: "rule_name",
      sort_order: "asc"
    })).resolves.toEqual({
      rules: [
        {
          rule_id: "rule-1",
          rule_name: "NoBug",
          rule_language: "JAVA"
        }
      ],
      total: 1
    });
    await expect(client.listRulesetRules({
      project_id: "project-1",
      ruleset_id: "ruleset-1",
      page: 1,
      page_size: 20
    })).resolves.toEqual({
      rules: [
        {
          rule_id: "rule-1",
          rule_name: "NoBug",
          rule_language: "JAVA"
        }
      ],
      total: 1
    });
    await expect(client.listCriterionsetsByLanguage({
      project_id: "project-1",
      language: "JAVA",
      page: 3,
      page_size: 50,
      search: "default",
      keyword: "java",
      sort_by: "name",
      sort_order: "asc"
    })).resolves.toEqual({
      criterionsets: [
        {
          id: "set-1",
          name: "Java default",
          language: "JAVA"
        }
      ],
      total: 1
    });
    await expect(client.getCriterionRule({
      criterion_rule_id: "criterion-1"
    })).resolves.toEqual({
      criterion_rule_id: "criterion-1",
      raw: {
        id: "criterion-1",
        name: "NoBug",
        severity: "1"
      }
    });
    await expect(client.listThirdTools({
      rule_type: 3,
      language: "JAVA"
    })).resolves.toEqual({
      tools: ["checker01", "checker02"]
    });
    await expect(client.getCriterionset({
      set_id: "set-1",
      operator: "user-1"
    })).resolves.toEqual({
      set_id: "set-1",
      raw: {
        id: "set-1",
        name: "Java default"
      }
    });
    await expect(client.listAllCriterionsets({
      page: 2,
      page_size: 20,
      languages: "PYTHON",
      search: "default",
      my_create: false,
      project_id: "project-1",
      is_call_status: true,
      sort_field: "last_update_time",
      sort_order: "down",
      operator: "user-1"
    })).resolves.toEqual({
      criterionsets: [
        {
          id: "set-2",
          name: "Python default",
          language: "PYTHON"
        }
      ],
      total: 1
    });
    await expect(client.listCriterionFilters({
      project_id: "project-1",
      language: "JAVA",
      checker_name: "java-checker",
      key: "security",
      operator: "user-1"
    })).resolves.toEqual({
      filters: [
        {
          id: "filter-1",
          name: "Security"
        }
      ],
      total: 1
    });
    await expect(client.listCriterions({
      languages: "JAVA,PYTHON",
      search: "bug",
      keyword: "bug",
      sort_by: "name",
      sort_order: "desc",
      page: 3,
      page_size: 25
    })).resolves.toEqual({
      criterions: [
        {
          id: "criterion-2",
          name: "NoBug",
          language: "JAVA"
        }
      ],
      total: 1
    });
    await expect(client.getDefectTaskStatistics({
      task_id: "task-1"
    })).resolves.toEqual({
      task_id: "task-1",
      raw: {
        total_defects: 2,
        fixed_defects: 1
      }
    });
    await expect(client.getVpcepAuthorization({
      task_id: "task-1"
    })).resolves.toEqual({
      task_id: "task-1",
      raw: {
        result: "Allow",
        config: false
      }
    });
    await expect(client.listTaskCheckList({
      task_id: "task-1",
      check_type: "branch",
      page: 1,
      page_size: 10,
      search: "main"
    })).resolves.toEqual({
      checks: [
        {
          taskId: "child-task-1",
          branchName: "main"
        }
      ],
      total: 1,
      raw: {
        total: 1,
        list: [
          {
            taskId: "child-task-1",
            branchName: "main"
          }
        ]
      }
    });

    expect(requests).toEqual([
      "/v2/project-1/ruleset/ruleset-1/rules?offset=10&limit=10&types=1&languages=JAVA&tags=cwe&keyword=security&sort_by=rule_name&sort_order=asc",
      "/v2/project-1/ruleset/ruleset-1/rules?offset=0&limit=20&types=1",
      "/v1/criterionsets/language?project_id=project-1&language=JAVA&page=3&page_size=50&search=default&keyword=java&sort_by=name&sort_order=asc",
      "/v1/rule/criterion-rule/query/criterion-1",
      "/v2/excute/all-thirdtools?rule_type=3&language=JAVA",
      "/v1/criterionsets/set-1?operator=user-1",
      "/v2/all-criterionsets?page=2&page_size=20&languages=PYTHON&search=default&my_create=false&project_id=project-1&is_call_status=true&sort_field=last_update_time&sort_order=down&operator=user-1",
      "/v1/criterion-filters?project_id=project-1&language=JAVA&checker_name=java-checker&key=security",
      "/v2/criterions?page=3&page_size=25&languages=JAVA%2CPYTHON&search=bug&keyword=bug&sort_by=name&sort_order=desc",
      "/v2/tasks/task-1/defects-statistic",
      "/v1/vpcep-authorization?task_id=task-1",
      "/v4/task/task-1/check-list?page=1&page_size=10&check_type=branch&search=main"
    ]);
  });

  it("uses documented config and measure endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
        return {
          result: {
            id: "config-1",
            name: "Default config"
          }
        };
      },
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        if (path.includes("/config-items")) {
          return {
            data: [
              {
                id: "rule-1",
                name: "AvoidHardcode"
              }
            ],
            total: 1
          };
        }

        return {
          result: {
            taskId: "task-1",
            defectCount: 2
          }
        };
      }
    });

    await expect(client.getProjectConfig({ id: "config-1", operator: "szh" })).resolves.toEqual({
      id: "config-1",
      raw: {
        id: "config-1",
        name: "Default config"
      }
    });
    await expect(client.listConfigItems({ ids: ["ruleset-1"] })).resolves.toEqual({
      items: [
        {
          id: "rule-1",
          name: "AvoidHardcode"
        }
      ],
      total: 1,
      raw: {
        data: [
          {
            id: "rule-1",
            name: "AvoidHardcode"
          }
        ],
        total: 1
      }
    });
    await expect(client.getMeasureTotal({ task_id: "task-1", query: { branch: "main" } })).resolves.toEqual({
      task_id: "task-1",
      raw: {
        taskId: "task-1",
        defectCount: 2
      }
    });
    await expect(client.listMeasureFiles({
      task_id: "task-1",
      job_id: "job-1",
      page: 1,
      page_size: 20
    })).resolves.toEqual({
      task_id: "task-1",
      files: [],
      total: 0,
      raw: {
        id: "config-1",
        name: "Default config"
      }
    });
    await expect(client.listMeasureFilesV2({
      task_id: "task-1",
      job_id: "job-1",
      filter_type: "all",
      sort_field: "filePath",
      sort_type: "asc",
      search: "App",
      page: 1,
      page_size: 20
    })).resolves.toEqual({
      task_id: "task-1",
      files: [],
      total: 0,
      raw: {
        taskId: "task-1",
        defectCount: 2
      }
    });
    await expect(client.listRelatedDuplicateBlocks({
      task_id: "task-1",
      file_path: "src/App.java",
      job_id: "job-1"
    })).resolves.toEqual({
      task_id: "task-1",
      blocks: [],
      total: 0,
      raw: {
        id: "config-1",
        name: "Default config"
      }
    });
    await expect(client.listRelatedDuplicateBlocksV2({
      task_id: "task-1",
      file_path: "src/App.java",
      job_id: "job-1",
      start_line: 1,
      duplication_type: "duplication_code"
    })).resolves.toEqual({
      task_id: "task-1",
      blocks: [],
      total: 0,
      raw: {
        taskId: "task-1",
        defectCount: 2
      }
    });
    await expect(client.getMeasureDuplicationInfo({
      task_id: "task-1",
      file_path: "src/App.java",
      start_line: 1,
      end_line: 20
    })).resolves.toEqual({
      task_id: "task-1",
      raw: {
        taskId: "task-1",
        defectCount: 2
      }
    });

    expect(requests).toEqual([
      {
        method: "GET",
        path: "/v1/simple-query/config-1"
      },
      {
        method: "POST",
        path: "/v1/config-items",
        body: {
          ids: ["ruleset-1"]
        }
      },
      {
        method: "POST",
        path: "/v1/measure/measure-total",
        body: {
          branch: "main",
          taskId: "task-1"
        }
      },
      {
        method: "GET",
        path: "/v1/tasks/task-1/measure-list?job_id=job-1&page_num=1&page_size=20"
      },
      {
        method: "POST",
        path: "/v2/measure/measure-list",
        body: {
          taskId: "task-1",
          jobId: "job-1",
          filterType: "all",
          sortField: "filePath",
          sortType: "asc",
          search: "App",
          page: 1,
          pageSize: 20
        }
      },
      {
        method: "GET",
        path: "/v1/tasks/task-1/related-duplicate-blocks?job_id=job-1&file_path=src%2FApp.java"
      },
      {
        method: "POST",
        path: "/v2/related-duplicate-blocks",
        body: {
          taskId: "task-1",
          jobId: "job-1",
          filePath: "src/App.java",
          blockId: undefined,
          startLine: 1,
          duplicationType: "duplication_code"
        }
      },
      {
        method: "POST",
        path: "/v1/measure/measure-duplication-info",
        body: {
          taskId: "task-1",
          filePath: "src/App.java",
          jobId: undefined,
          blockId: undefined,
          startLine: 1,
          endLine: 20
        }
      }
    ]);
  });

  it("uses documented issue filter endpoints", async () => {
    const requests: Array<{ path: string; body?: unknown }> = [];
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        if (path.includes("issue-list-by-filter")) {
          return {
            status: "success",
            result: {
              total: 1,
              info: [
                {
                  mergeKey: "issue-1",
                  ruleId: "rule-1",
                  filePath: "src/App.java"
                }
              ]
            }
          };
        }

        return {
          status: "success",
          result: {
            total: null,
            facets: [
              {
                property: "statusIds",
                values: [{ val: "0", count: "1" }]
              }
            ]
          }
        };
      }
    });

    await expect(client.listIssuesByFilter({
      task_id: "task-1",
      page: 1,
      page_size: 20,
      job_id: "job-1",
      rule_ids: "rule-1",
      status_ids: "0",
      user_tags: ["security"],
      cwes: ["CWE-79"]
    })).resolves.toEqual({
      task_id: "task-1",
      issues: [
        {
          mergeKey: "issue-1",
          ruleId: "rule-1",
          filePath: "src/App.java"
        }
      ],
      total: 1,
      raw: {
        total: 1,
        info: [
          {
            mergeKey: "issue-1",
            ruleId: "rule-1",
            filePath: "src/App.java"
          }
        ]
      }
    });

    await expect(client.getIssueFilter({
      task_id: "task-1",
      facets: "statusIds,severities",
      severities: "1"
    })).resolves.toEqual({
      task_id: "task-1",
      facets: [
        {
          property: "statusIds",
          values: [{ val: "0", count: "1" }]
        }
      ],
      total: 1,
      raw: {
        total: null,
        facets: [
          {
            property: "statusIds",
            values: [{ val: "0", count: "1" }]
          }
        ]
      }
    });

    expect(requests).toEqual([
      {
        path: "/v1/defect/issue-list-by-filter",
        body: {
          taskId: "task-1",
          mergeId: undefined,
          jobId: "job-1",
          languages: undefined,
          ruleIds: "rule-1",
          authors: undefined,
          isNew: undefined,
          statusIds: "0",
          severities: undefined,
          delayStatus: undefined,
          fileNames: undefined,
          userTags: ["security"],
          cwes: ["CWE-79"],
          page: 1,
          pageSize: 20
        }
      },
      {
        path: "/v1/defect/issue-filter",
        body: {
          taskId: "task-1",
          mergeId: undefined,
          jobId: undefined,
          languages: undefined,
          ruleIds: undefined,
          authors: undefined,
          isNew: undefined,
          statusIds: undefined,
          severities: "1",
          delayStatus: undefined,
          fileNames: undefined,
          userTags: undefined,
          cwes: undefined,
          facets: "statusIds,severities"
        }
      }
    ]);
  });

  it("uses documented Check export and assistant endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
        if (path.includes("pdf-file")) return "%PDF-1.7";
        return {
          result: {
            id: 123,
            jobFile: "defects/PdfFiles/report.pdf",
            jobStatus: "SUCCESS"
          }
        };
      },
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {
          status: "success",
          result: "风险：低 建议：保持"
        };
      }
    });

    await expect(client.getAsyncJob({
      task_id: "task-1",
      async_job_id: "123"
    })).resolves.toEqual({
      task_id: "task-1",
      async_job_id: "123",
      raw: {
        id: 123,
        jobFile: "defects/PdfFiles/report.pdf",
        jobStatus: "SUCCESS"
      }
    });

    await expect(client.getPdfFile({
      task_id: "task-1",
      job_file: "defects/PdfFiles/report.pdf"
    })).resolves.toEqual({
      task_id: "task-1",
      job_file: "defects/PdfFiles/report.pdf",
      raw: "%PDF-1.7"
    });

    await expect(client.extractTaskAssistantSummary({
      project_id: "project-1",
      task_id: "task-1",
      merge_id: "mr-1",
      job_id: "job-1"
    })).resolves.toEqual({
      task_id: "task-1",
      summary: "风险：低 建议：保持",
      raw: {
        summary: "风险：低 建议：保持"
      }
    });

    expect(requests).toEqual([
      {
        method: "GET",
        path: "/v1/tasks/task-1/async-job/123"
      },
      {
        method: "GET",
        path: "/v1/tasks/task-1/pdf-file?job_file=defects%2FPdfFiles%2Freport.pdf"
      },
      {
        method: "POST",
        path: "/v1/defects/assistant-analysis/task-summary?project_id=project-1",
        body: {
          task_id: "task-1",
          merge_id: "mr-1",
          job_id: "job-1"
        }
      }
    ]);
  });

  it("uses documented criterionset relation mutation endpoint", async () => {
    let request: { path?: string; body?: unknown; options?: unknown } = {};
    const client = createClient({
      post: async (path: string, body?: unknown, options?: unknown) => {
        request = { path, body, options };
        return {
          result: {
            status: "success"
          }
        };
      }
    });

    await expect(client.modifyCriterionsetRelations({
      set_id: "ruleset-1",
      operator: "szh",
      show_tool_versions: ["java:1.0"],
      criterion_ids_list: [
        {
          id: "criterion-1",
          status: "enable",
          is_support_version: "enable",
          params: {
            threshold: 10
          }
        }
      ]
    })).resolves.toEqual({
      set_id: "ruleset-1",
      raw: {
        status: "success"
      }
    });

    expect(request).toEqual({
      path: "/v1/relations",
      body: {
        setId: "ruleset-1",
        showToolVersions: ["java:1.0"],
        criterionIdsList: [
          {
            id: "criterion-1",
            status: "enable",
            params: {
              threshold: 10
            },
            isSupportVersion: "enable"
          }
        ]
      },
      options: {
        headers: {
          operator: "szh"
        }
      }
    });
  });
});
