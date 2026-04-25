import type { ReturnTypeCreateHttpClient } from "../types.js";

export type CheckClient = {
  createTask: (input: {
    project_id: string;
    task_name: string;
    git_url: string;
    git_branch: string;
    language: string;
    rule_set_id?: string;
    task_type?: string;
  }) => Promise<{
    task_id: string;
    task_name?: string;
    project_id?: string;
    git_url?: string;
    git_branch?: string;
    language?: string;
    status?: string;
  }>;
  runTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    job_id?: string;
    status?: string;
  }>;
  stopTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    status?: string;
  }>;
  listTasks: (input: {
    page: number;
    page_size: number;
    project_id?: string;
    keyword?: string;
  }) => Promise<{
    tasks: Array<{
      task_id: string;
      task_name: string;
      project_name?: string;
      repository_name?: string;
      branch_name?: string;
      language?: string;
      status?: string;
    }>;
    total?: number;
  }>;
  getTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    task_name: string;
    project_name?: string;
    repository_name?: string;
    branch_name?: string;
    language?: string;
    status?: string;
    last_check_time?: string;
  }>;
  listTaskIssues: (input: {
    task_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    severity?: string;
    defect_level?: string;
    rule_id?: string;
    rule_name?: string;
    file_path?: string;
    status?: string;
    checker?: string;
  }) => Promise<{
    issues: Array<{
      issue_id: string;
      rule_name?: string;
      severity?: string;
      file_path?: string;
      line?: number;
    }>;
    total?: number;
  }>;
  getMetrics: (input: { task_id: string; project_id?: string }) => Promise<{
    task_id: string;
    code_lines?: number;
    issues_count?: number;
    duplicated_lines?: number;
  }>;
  listRulesets: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    language?: string;
  }) => Promise<{
    rulesets: Array<{
      id: string;
      name: string;
      language?: string;
      is_system?: boolean;
    }>;
    total?: number;
  }>;
};

export function createCheckClient(_http: ReturnTypeCreateHttpClient): CheckClient {
  return {
    async createTask(input) {
      const taskType = input.task_type === "incremental" ? "inc" : input.task_type;
      const payload = input.rule_set_id
        ? {
            git_url: input.git_url,
            git_branch: input.git_branch,
            check_type: ["source"],
            rule_sets: [
              {
                language: input.language,
                ruleset_id: input.rule_set_id
              }
            ],
            task_type: taskType
          }
        : {
            git_url: input.git_url,
            git_branch: input.git_branch,
            check_type: ["source"],
            language: [input.language],
            task_type: taskType
          };
      const response = (await _http.post(
        `/v2/${encodeURIComponent(input.project_id)}/task`,
        payload
      )) as {
        task_id?: string;
        task_name?: string;
        project_id?: string;
        git_url?: string;
        git_branch?: string;
        language?: string;
        status?: string | number;
        result?: {
          task_id?: string;
          task_name?: string;
          project_id?: string;
          git_url?: string;
          git_branch?: string;
          language?: string;
          status?: string | number;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? "",
        task_name: item.task_name ?? input.task_name,
        project_id: item.project_id ?? input.project_id,
        git_url: item.git_url ?? input.git_url,
        git_branch: item.git_branch ?? input.git_branch,
        language: item.language ?? input.language,
        status: item.status === undefined ? undefined : String(item.status)
      };
    },
    async runTask(input) {
      const response = (await _http.post(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/run`,
        {}
      )) as {
        task_id?: string;
        job_id?: string;
        status?: string | number;
        result?: {
          task_id?: string;
          job_id?: string;
          status?: string | number;
        };
      };

      const item = response.result ?? response;

      return {
        task_id: item.task_id ?? input.task_id,
        job_id: item.job_id,
        status: item.status === undefined ? undefined : String(item.status)
      };
    },
    async stopTask(input) {
      const response = (await _http.post(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/stop`,
        {}
      )) as
        | {
            task_id?: string;
            status?: string | number;
            result?: {
              task_id?: string;
              status?: string | number;
            };
          }
        | null;

      const item = response?.result ?? response ?? {};

      return {
        task_id: item.task_id ?? input.task_id,
        status: item.status === undefined ? undefined : String(item.status)
      };
    },
    async listTasks(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("task_name", input.keyword);
      }

      const path = input.project_id
        ? `/v2/${encodeURIComponent(input.project_id)}/tasks?${query.toString()}`
        : `/v2/tasks?${query.toString()}`;

      const response = (await _http.get(path)) as {
        tasks?: Array<{
          task_id?: string;
          taskId?: string;
          task_name?: string;
          name?: string;
          project_name?: string;
          projectName?: string;
          repo_name?: string;
          repository_name?: string;
          codeHubName?: string;
          git_url?: string;
          branch_name?: string;
          branch?: string;
          git_branch?: string;
          language?: string;
          status?: string | number;
        }>;
        total?: number;
        total_count?: number;
      };

      return {
        tasks: (response.tasks ?? []).map((item) => ({
          task_id: item.task_id ?? item.taskId ?? "",
          task_name: item.task_name ?? item.name ?? "",
          project_name: item.project_name ?? item.projectName,
          repository_name:
            item.repository_name ?? item.repo_name ?? item.codeHubName ?? item.git_url,
          branch_name: item.branch_name ?? item.branch ?? item.git_branch,
          language: item.language,
          status: item.status === undefined ? undefined : String(item.status)
        })),
        total: response.total ?? response.total_count
      };
    },
    async getTask(input) {
      const response = (await _http.get(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/defects-summary`
      )) as {
        task_id?: string;
        task_name?: string;
        git_url?: string;
        git_branch?: string;
        branch_name?: string;
        language?: string;
        review_result?: string | number;
        status?: string | number;
        last_check_time?: string;
        result?: {
          info?: {
            taskId?: string;
            taskName?: string;
            projectName?: string;
            codeHubName?: string;
            branch?: string;
            language?: string;
            lastCheckTime?: string;
          };
          issue_summary?: {
            task_status?: string | number;
          };
        };
      };

      const info = response.result?.info;
      const summary = response.result?.issue_summary;

      return {
        task_id: response.task_id ?? info?.taskId ?? input.task_id,
        task_name: response.task_name ?? info?.taskName ?? info?.codeHubName ?? input.task_id,
        project_name: info?.projectName,
        repository_name: response.git_url ?? info?.codeHubName,
        branch_name: response.git_branch ?? response.branch_name ?? info?.branch,
        language: response.language ?? info?.language,
        status:
          response.review_result === undefined && response.status === undefined
            ? summary?.task_status === undefined
              ? undefined
              : String(summary.task_status)
            : String(response.review_result ?? response.status),
        last_check_time: response.last_check_time ?? info?.lastCheckTime
      };
    },
    async listTaskIssues(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const defectLevel = input.defect_level ?? input.severity;
      if (defectLevel) {
        query.set("defect_level", defectLevel);
      }
      if (input.rule_id) {
        query.set("rule_id", input.rule_id);
      }
      if (input.rule_name ?? input.keyword) {
        query.set("rule_name", input.rule_name ?? input.keyword ?? "");
      }
      if (input.file_path) {
        query.set("file_path", input.file_path);
      }
      if (input.status) {
        query.set("status", input.status);
      }
      if (input.checker) {
        query.set("checker", input.checker);
      }
      const response = (await _http.get(
        `/v2/tasks/${encodeURIComponent(input.task_id)}/defects-detail?${query.toString()}`
      )) as {
        defects?: Array<{
          defect_id?: string;
          defectId?: string;
          issue_id?: string;
          issueId?: string;
          rule_name?: string;
          ruleName?: string;
          defect_level?: string | number;
          severity?: string;
          file_path?: string;
          filePath?: string;
          line?: number;
          line_num?: number;
          line_number?: string | number;
        }>;
        issues?: Array<{
          issue_id?: string;
          issueId?: string;
          rule_name?: string;
          ruleName?: string;
          severity?: string;
          defect_id?: string;
          defectId?: string;
          defect_level?: string | number;
          file_path?: string;
          filePath?: string;
          line?: number;
          line_num?: number;
          line_number?: string | number;
        }>;
        total?: number;
        total_count?: number;
      };

      return {
        issues: (response.defects ?? response.issues ?? []).map((item) => ({
          issue_id: item.issue_id ?? item.issueId ?? item.defect_id ?? item.defectId ?? "",
          rule_name: item.rule_name ?? item.ruleName,
          severity:
            item.severity ?? (item.defect_level === undefined ? undefined : String(item.defect_level)),
          file_path: item.file_path ?? item.filePath,
          line:
            item.line ??
            item.line_num ??
            (item.line_number === undefined ? undefined : Number(item.line_number))
        })),
        total: response.total ?? response.total_count
      };
    },
    async getMetrics(input: { task_id: string; project_id?: string }) {
      const path = input.project_id
        ? `/v2/${encodeURIComponent(input.project_id)}/tasks/${encodeURIComponent(input.task_id)}/metrics-summary`
        : `/v2/tasks/${encodeURIComponent(input.task_id)}/metrics-summary`;
      const response = (await _http.get(path)) as {
        metric_info?: {
          code_size?: string | number;
          code_duplication_total?: string | number;
          issue_count?: string | number;
        };
        result?: {
          metrics?: {
            code_lines?: number;
            issues_count?: number;
            duplicated_lines?: number;
          };
          summary?: {
            code_lines?: number;
            issues_count?: number;
            duplicated_lines?: number;
          };
        };
      };

      const metrics = response.result?.metrics ?? response.result?.summary;
      const rawMetrics = response.metric_info;

      return {
        task_id: input.task_id,
        code_lines:
          metrics?.code_lines ??
          (rawMetrics?.code_size === undefined ? undefined : Number(rawMetrics.code_size)),
        issues_count:
          metrics?.issues_count ??
          (rawMetrics?.issue_count === undefined ? undefined : Number(rawMetrics.issue_count)),
        duplicated_lines:
          metrics?.duplicated_lines ??
          (rawMetrics?.code_duplication_total === undefined
            ? undefined
            : Number(rawMetrics.code_duplication_total))
      };
    },
    async listRulesets(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("name", input.keyword);
      }

      if (input.language) {
        query.set("language", input.language);
      }

      const response = (await _http.get(
        `/v2/${encodeURIComponent(input.project_id)}/rulesets?${query.toString()}`
      )) as {
        rulesets?: Array<{
          id?: string | number;
          ruleset_id?: string | number;
          name?: string;
          language?: string;
          is_system?: boolean;
        }>;
        info?: Array<{
          template_id?: string | number;
          id?: string | number;
          ruleset_id?: string | number;
          template_name?: string;
          name?: string;
          language?: string;
          is_system?: boolean;
          creator_id?: string;
        }>;
        total?: number;
        total_count?: number;
      };

      const rulesets: Array<{
        id?: string | number;
        ruleset_id?: string | number;
        template_id?: string | number;
        name?: string;
        template_name?: string;
        language?: string;
        is_system?: boolean;
        creator_id?: string;
      }> = response.rulesets ?? response.info ?? [];

      return {
        rulesets: rulesets.map((item) => ({
          id: String(item.id ?? item.ruleset_id ?? item.template_id ?? ""),
          name: item.name ?? item.template_name ?? "",
          language: item.language?.toLowerCase(),
          is_system: item.is_system ?? item.creator_id === "system"
        })),
        total: response.total ?? response.total_count ?? rulesets.length
      };
    }
  };
}
