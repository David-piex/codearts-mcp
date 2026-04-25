import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import { DEFAULT_READ_CACHE_TTLS } from "../../core/cache/read-cache-ttl.js";
import { normalizeProviderError } from "../../core/errors/app-error.js";
import { recordRequestCacheHit } from "../../server/request-context.js";
import type { ReturnTypeCreateHttpClient } from "../types.js";

export type RepoClient = {
  getBranch: (input: { repository_id: string; branch_name: string }) => Promise<{
    name: string;
    protected?: boolean;
    default?: boolean;
    can_push?: boolean;
    web_url?: string;
    commit?: {
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    };
  }>;
  compareRefs: (input: {
    repository_id: string;
    from: string;
    to: string;
    straight?: boolean;
    ignore_whitespace_change?: boolean;
    view?: string;
  }) => Promise<{
    from?: string;
    to?: string;
    compare_type?: string;
    compare_timeout?: boolean;
    compare_same_ref?: boolean;
    commits?: Array<{
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    }>;
    diffs?: Array<{
      old_path?: string;
      new_path?: string;
      diff?: string;
      new_file?: boolean;
      deleted_file?: boolean;
      renamed_file?: boolean;
    }>;
  }>;
  getTag: (input: { repository_id: string; tag_name: string }) => Promise<{
    name: string;
    message?: string;
    target?: string;
    commit?: {
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    };
  }>;
  listEvents: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    events: Array<{
      id: string;
      action_name?: string;
      ref_name?: string;
      author_name?: string;
      created_at?: string;
    }>;
    total?: number;
  }>;
  listTags: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    tags: Array<{
      name: string;
      is_double_name?: boolean;
    }>;
    total?: number;
  }>;
  deleteTag: (input: {
    repository_id: string;
    tag_name: string;
  }) => Promise<{
    tag_name: string;
    deleted: boolean;
  }>;
  createTag: (input: {
    repository_id: string;
    tag_name: string;
    ref: string;
    message?: string;
  }) => Promise<{
    tag_name: string;
    ref?: string;
    message?: string;
  }>;
  createRepository: (input: {
    project_uuid: string;
    name: string;
    import_members?: number;
    template_id?: string;
    visibility_level?: number;
    import_url?: string;
    description?: string;
    gitignore_id?: string;
    license_id?: number;
    enable_readme?: boolean | number;
    caller?: string;
  }) => Promise<{
    repository_uuid: string;
    project_uuid?: string;
  }>;
  listRepositoryLabels: (input: {
    repository_id: string;
  }) => Promise<{
    labels: Array<{
      id: number | string;
      name?: string;
      color?: string;
      description?: string;
      text_color?: string;
      is_expired?: boolean;
      open_merge_requests_count?: number;
      priority?: number;
      is_repository_label?: boolean;
    }>;
    total?: number;
  }>;
  listProtectedBranches: (input: {
    repository_id: string;
  }) => Promise<{
    branches: Array<{
      id: number | string;
      name?: string;
      actions?: Array<{
        action?: string;
        enable?: boolean;
        users?: Array<{ id?: number | string }>;
        roles?: Array<{ id?: number | string }>;
      }>;
    }>;
    total?: number;
  }>;
  listMergeRequestDiscussions: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    discussions: Array<{
      discussion_id: string;
      body?: string;
      created_at?: string;
      author?: { name?: string; nick_name?: string };
    }>;
    total?: number;
  }>;
  listMergeRequestChanges: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    changes: Array<{
      old_path?: string;
      new_path?: string;
      new_file?: boolean;
      deleted_file?: boolean;
      renamed_file?: boolean;
      diff?: string;
    }>;
    total?: number;
  }>;
  createMergeRequestDiscussion: (input: {
    repository_id: string;
    merge_request_iid: string;
    body: string;
  }) => Promise<{
    discussion_id: string;
    body?: string;
    created_at?: string;
    author?: { name?: string; nick_name?: string };
  }>;
  mergeMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
    squash?: boolean;
    force_merge?: boolean;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
  closeMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
  createMergeRequest: (input: {
    repository_id: string;
    source_branch: string;
    target_branch: string;
    title: string;
    description?: string;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    description?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    web_url?: string;
  }>;
  reviewMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
    action_type: "approve" | "reject" | "reset";
    approver_comment?: string;
  }) => Promise<{
    reviewers: Array<{
      id: number | string;
      name?: string;
      nick_name?: string;
      state?: string;
      updated_at?: string;
      approver_comment?: string;
    }>;
  }>;
  getMergeRequest: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    id: number | string;
    iid?: number;
    repository_id?: number | string;
    title?: string;
    description?: string;
    state?: string;
    source_branch?: string;
    target_branch?: string;
    created_at?: string;
    updated_at?: string;
    author?: { name?: string; nick_name?: string };
    web_url?: string;
  }>;
  getRepository: (input: { repository_id: string }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    default_branch?: string;
    ssh_url_to_repo?: string;
    http_url_to_repo?: string;
    project_id?: string;
    project_name?: string;
  }>;
  getCommit: (input: { repository_id: string; commit_sha: string }) => Promise<{
    id: string;
    short_id?: string;
    title?: string;
    author_name?: string;
    message?: string;
  }>;
  getFile: (input: { repository_id: string; file_path: string; branch: string }) => Promise<{
    file_path: string;
    branch_name: string;
    content: string;
  }>;
  listCommits: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    ref_name?: string;
    since?: string;
    until?: string;
    order_by_date?: boolean;
    with_stats?: boolean;
  }) => Promise<{
    commits: Array<{ id: string; short_id?: string; title?: string; author_name?: string }>;
    total?: number;
  }>;
  listBranches: (input: { repository_id: string; page: number; page_size: number; keyword?: string }) => Promise<{
    branches: Array<{ name: string; commit?: { id?: string }; protected?: boolean }>;
    total?: number;
  }>;
  listRepositories: (input: { project_id: string; page: number; page_size: number; keyword?: string }) => Promise<{
    repositories: Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>;
    total?: number;
  }>;
  listMergeRequests: (input: {
    repository_id: string;
    page: number;
    page_size: number;
    state?: string;
  }) => Promise<{
    merge_requests: Array<{
      id: number | string;
      iid?: number;
      title?: string;
      state?: string;
      source_branch?: string;
      target_branch?: string;
      created_at?: string;
      updated_at?: string;
      author?: { name?: string; nick_name?: string };
      web_url?: string;
    }>;
    total?: number;
  }>;
};

function unwrapRepoPayload<T>(input: T): T {
  if (typeof input === "string") {
    const trimmed = input.trim();

    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return unwrapRepoPayload(JSON.parse(trimmed)) as T;
      } catch {
        return input;
      }
    }
  }

  if (
    input &&
    typeof input === "object" &&
    "error_msg" in input &&
    typeof (input as { error_msg?: unknown }).error_msg === "string"
  ) {
    throw normalizeProviderError({
      status: 400,
      message: String((input as { error_msg: string }).error_msg),
      code:
        "error_code" in input && typeof (input as { error_code?: unknown }).error_code === "string"
          ? String((input as { error_code: string }).error_code)
          : undefined
    });
  }

  if (
    input &&
    typeof input === "object" &&
    "error" in input &&
    (input as { error?: unknown }).error &&
    typeof (input as { error?: unknown }).error === "object"
  ) {
    const error = (input as { error: { code?: unknown; message?: unknown; reason?: unknown } }).error;
    const message =
      typeof error.message === "string"
        ? error.message
        : typeof error.reason === "string"
          ? error.reason
          : undefined;
    const code = typeof error.code === "string" ? error.code : undefined;

    if (message || code) {
      throw normalizeProviderError({
        status: 400,
        message: message ?? "Provider request failed",
        code
      });
    }
  }

  return input;
}

function omitUndefinedFields(
  input: Record<string, unknown>
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  );
}

type RepoClientOptions = {
  listCacheTtlMs?: number;
  now?: () => number;
};

export function createRepoClient(
  _http: ReturnTypeCreateHttpClient,
  options: RepoClientOptions = {}
): RepoClient {
  const listCacheTtlMs =
    options.listCacheTtlMs ?? DEFAULT_READ_CACHE_TTLS.repoListRepositoriesMs;
  const now = options.now ?? Date.now;
  const listRepositoriesCache = createReadThroughCache<
    string,
    {
      repositories: Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>;
      total?: number;
    }
  >({
    ttlMs: listCacheTtlMs,
    now
  });

  function buildListRepositoriesCacheKey(input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) {
    return JSON.stringify([input.project_id, input.page, input.page_size, input.keyword ?? ""]);
  }

  return {
    async getBranch(input) {
      const query = new URLSearchParams({
        branch_name: input.branch_name
      });
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/branch?${query.toString()}`
      )) as {
        name?: string;
        protected?: boolean;
        default?: boolean;
        can_push?: boolean;
        web_url?: string;
        commit?: {
          id?: string;
          short_id?: string;
          title?: string;
          author_name?: string;
          created_at?: string;
        };
      };

      return {
        name: response.name ?? input.branch_name,
        protected: response.protected,
        default: response.default,
        can_push: response.can_push,
        web_url: response.web_url,
        commit: response.commit
      };
    },
    async compareRefs(input) {
      const query = new URLSearchParams({
        from: input.from,
        to: input.to
      });

      if (input.straight !== undefined) {
        query.set("straight", String(input.straight));
      }

      if (input.ignore_whitespace_change !== undefined) {
        query.set("ignore_whitespace_change", String(input.ignore_whitespace_change));
      }

      if (input.view) {
        query.set("view", input.view);
      }

      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/compare?${query.toString()}`
      )) as {
        from?: string;
        to?: string;
        compare_type?: string;
        compare_timeout?: boolean;
        compare_same_ref?: boolean;
        commits?: Array<{
          id?: string;
          short_id?: string;
          title?: string;
          author_name?: string;
          created_at?: string;
        }>;
        diffs?: Array<{
          old_path?: string;
          new_path?: string;
          diff?: string;
          new_file?: boolean;
          deleted_file?: boolean;
          renamed_file?: boolean;
        }>;
      };

      return {
        from: response.from ?? input.from,
        to: response.to ?? input.to,
        compare_type: response.compare_type,
        compare_timeout: response.compare_timeout,
        compare_same_ref: response.compare_same_ref,
        commits: response.commits ?? [],
        diffs: response.diffs ?? []
      };
    },
    async getTag(input) {
      const query = new URLSearchParams({
        tag_name: input.tag_name
      });
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/tag?${query.toString()}`
      )) as {
        name?: string;
        message?: string;
        target?: string;
        commit?: {
          id?: string;
          short_id?: string;
          title?: string;
          author_name?: string;
          created_at?: string;
        };
      };

      return {
        name: response.name ?? input.tag_name,
        message: response.message,
        target: response.target,
        commit: response.commit
      };
    },
    async listEvents(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/events?${query.toString()}`
      )) as {
        events?: Array<{
          id?: string | number;
          action_name?: string;
          ref_name?: string;
          author_name?: string;
          created_at?: string;
        }>;
        total?: number;
      };

      return {
        events: (response.events ?? []).map((item) => ({
          id: String(item.id ?? ""),
          action_name: item.action_name,
          ref_name: item.ref_name,
          author_name: item.author_name,
          created_at: item.created_at
        })),
        total: response.total
      };
    },
    async listTags(input) {
      const query = new URLSearchParams({
        page: String(input.page),
        per_page: String(input.page_size)
      });

      const rawResponse = (await _http.get(
        `/v2/repositories/${encodeURIComponent(input.repository_id)}/tags?${query.toString()}`
      )) as
        | Array<{
          name?: string;
          is_double_name?: boolean;
        }>
        | {
          total?: number;
          tags?: Array<{
            name?: string;
            is_double_name?: boolean;
          }>;
          result?: {
            total?: number;
            tags?: Array<{
              name?: string;
              is_double_name?: boolean;
            }>;
          };
        };
      const response = unwrapRepoPayload(rawResponse);

      const rawTags = Array.isArray(response) ? response : response.result?.tags ?? response.tags ?? [];

      const tags = rawTags.map((item) => ({
        name: item.name ?? "",
        is_double_name: item.is_double_name
      }));

      return {
        tags,
        total: Array.isArray(response) ? tags.length : response.result?.total ?? response.total ?? tags.length
      };
    },
    async deleteTag(input) {
      await _http.delete?.(
        `/v2/repositories/${encodeURIComponent(input.repository_id)}/tags/${encodeURIComponent(input.tag_name)}`
      );

      return {
        tag_name: input.tag_name,
        deleted: true
      };
    },
    async createTag(input) {
      const response = (await _http.post(
        `/v2/repositories/${encodeURIComponent(input.repository_id)}/tags`,
        {
          tag_name: input.tag_name,
          ref: input.ref,
          message: input.message
        }
      )) as {
        tag_name?: string;
        name?: string;
        ref?: string;
        target?: string;
        message?: string;
      };

      return {
        tag_name: response.tag_name ?? response.name ?? input.tag_name,
        ref: response.ref ?? response.target ?? input.ref,
        message: response.message ?? input.message
      };
    },
    async createRepository(input) {
      const normalizedEnableReadme =
        typeof input.enable_readme === "boolean"
          ? input.enable_readme
            ? 1
            : 0
          : input.enable_readme;
      const rawResponse = (await _http.post(
        `/v1/repositories`,
        omitUndefinedFields({
          project_uuid: input.project_uuid,
          name: input.name,
          import_members: input.import_members,
          template_id: input.template_id,
          visibility_level: input.visibility_level,
          import_url: input.import_url,
          description: input.description,
          gitignore_id: input.gitignore_id,
          license_id: input.license_id,
          enable_readme: normalizedEnableReadme,
          caller: input.caller
        })
      )) as
        | {
          repository_uuid?: string;
          project_uuid?: string;
        }
        | {
          result?: {
            repository_uuid?: string;
            project_uuid?: string;
          };
        };
      const response = unwrapRepoPayload(rawResponse);
      let result: {
        repository_uuid?: string;
        project_uuid?: string;
      };

      if ("result" in response && response.result) {
        result = response.result;
      } else {
        result = response as {
          repository_uuid?: string;
          project_uuid?: string;
        };
      }

      if (!result.repository_uuid) {
        throw normalizeProviderError({
          status: 400,
          message: "CreateRepository response did not include repository_uuid"
        });
      }

      return {
        repository_uuid: result.repository_uuid,
        project_uuid: result.project_uuid ?? input.project_uuid
      };
    },
    async listRepositoryLabels(input) {
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/labels`
      )) as Array<{
        id?: number | string;
        name?: string;
        color?: string;
        description?: string;
        text_color?: string;
        is_expired?: boolean;
        open_merge_requests_count?: number;
        priority?: number;
        is_repository_label?: boolean;
      }>;

      const labels = (response ?? []).map((item) => ({
        id: item.id ?? "",
        name: item.name,
        color: item.color,
        description: item.description,
        text_color: item.text_color,
        is_expired: item.is_expired,
        open_merge_requests_count: item.open_merge_requests_count,
        priority: item.priority,
        is_repository_label: item.is_repository_label
      }));

      return {
        labels,
        total: labels.length
      };
    },
    async listProtectedBranches(input) {
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/protected-branches`
      )) as Array<{
        id?: number | string;
        name?: string;
        actions?: Array<{
          action?: string;
          enable?: boolean;
          users?: Array<{ id?: number | string }>;
          roles?: Array<{ id?: number | string }>;
        }>;
      }>;

      const branches = (response ?? []).map((item) => ({
        id: item.id ?? "",
        name: item.name,
        actions: item.actions
      }));

      return {
        branches,
        total: branches.length
      };
    },
    async listMergeRequestDiscussions(input) {
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/discussions`
      )) as Array<{
        id?: string;
        discussion_id?: string;
        created_at?: string;
        notes?: Array<{
          body?: string;
          created_at?: string;
          author?: { name?: string; nick_name?: string };
        }>;
      }>;

      const discussions = (response ?? []).map((item) => {
        const note = item.notes?.[0];

        return {
          discussion_id: item.discussion_id ?? item.id ?? "",
          body: note?.body,
          created_at: note?.created_at ?? item.created_at,
          author: note?.author
        };
      });

      return {
        discussions,
        total: discussions.length
      };
    },
    async listMergeRequestChanges(input) {
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/changes`
      )) as {
        changes?: Array<{
          old_path?: string;
          new_path?: string;
          new_file?: boolean;
          deleted_file?: boolean;
          renamed_file?: boolean;
          diff?: string;
        }>;
      };

      return {
        changes: response.changes ?? [],
        total: response.changes?.length ?? 0
      };
    },
    async createMergeRequestDiscussion(input) {
      const response = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/discussions`,
        {
          body: input.body
        }
      )) as {
        id?: string;
        discussion_id?: string;
        created_at?: string;
        notes?: Array<{
          body?: string;
          created_at?: string;
          author?: { name?: string; nick_name?: string };
        }>;
      };

      const note = response.notes?.[0];

      return {
        discussion_id: response.discussion_id ?? response.id ?? "",
        body: note?.body ?? input.body,
        created_at: note?.created_at ?? response.created_at,
        author: note?.author
      };
    },
    async mergeMergeRequest(input) {
      const response = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/merge`,
        {
          squash: input.squash,
          force_merge: input.force_merge
        }
      )) as {
        id?: number | string;
        iid?: number;
        repository_id?: number | string;
        title?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        web_url?: string;
      };

      return {
        id: response.id ?? input.merge_request_iid,
        iid: response.iid,
        repository_id: response.repository_id,
        title: response.title,
        state: response.state,
        source_branch: response.source_branch,
        target_branch: response.target_branch,
        web_url: response.web_url
      };
    },
    async closeMergeRequest(input) {
      const response = (await _http.put(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}`,
        {
          state_event: "close"
        }
      )) as {
        id?: number | string;
        iid?: number;
        repository_id?: number | string;
        title?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        web_url?: string;
      };

      return {
        id: response.id ?? input.merge_request_iid,
        iid: response.iid,
        repository_id: response.repository_id,
        title: response.title,
        state: response.state,
        source_branch: response.source_branch,
        target_branch: response.target_branch,
        web_url: response.web_url
      };
    },
    async createMergeRequest(input) {
      const response = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests`,
        {
          source_branch: input.source_branch,
          target_branch: input.target_branch,
          title: input.title,
          description: input.description
        }
      )) as {
        id?: number | string;
        iid?: number;
        repository_id?: number | string;
        title?: string;
        description?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        web_url?: string;
      };

      return {
        id: response.id ?? "",
        iid: response.iid,
        repository_id: response.repository_id,
        title: response.title,
        description: response.description,
        state: response.state,
        source_branch: response.source_branch,
        target_branch: response.target_branch,
        web_url: response.web_url
      };
    },
    async reviewMergeRequest(input) {
      const response = (await _http.post(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}/approval`,
        {
          action_type: input.action_type,
          approver_comment: input.approver_comment
        }
      )) as Array<{
        id?: number | string;
        name?: string;
        nick_name?: string;
        state?: string;
        updated_at?: string;
        approver_comment?: string;
      }>;

      return {
        reviewers: (response ?? []).map((item) => ({
          id: item.id ?? "",
          name: item.name,
          nick_name: item.nick_name,
          state: item.state,
          updated_at: item.updated_at,
          approver_comment: item.approver_comment
        }))
      };
    },
    async getRepository(input) {
      const response = (await _http.get(`/v4/repositories/${encodeURIComponent(input.repository_id)}`)) as {
        id?: number | string;
        name?: string;
        description?: string;
        default_branch?: string;
        ssh_url_to_repo?: string;
        http_url_to_repo?: string;
        project_id?: string;
        project_name?: string;
      };

      return {
        id: response.id ?? input.repository_id,
        name: response.name ?? "",
        description: response.description,
        default_branch: response.default_branch,
        ssh_url_to_repo: response.ssh_url_to_repo,
        http_url_to_repo: response.http_url_to_repo,
        project_id: response.project_id,
        project_name: response.project_name
      };
    },
    async getMergeRequest(input) {
      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests/${encodeURIComponent(input.merge_request_iid)}`
      )) as {
        id?: number | string;
        iid?: number;
        repository_id?: number | string;
        title?: string;
        description?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        created_at?: string;
        updated_at?: string;
        author?: { name?: string; nick_name?: string };
        web_url?: string;
      };

      return {
        id: response.id ?? input.merge_request_iid,
        iid: response.iid,
        repository_id: response.repository_id,
        title: response.title,
        description: response.description,
        state: response.state,
        source_branch: response.source_branch,
        target_branch: response.target_branch,
        created_at: response.created_at,
        updated_at: response.updated_at,
        author: response.author,
        web_url: response.web_url
      };
    },
    async getCommit(input) {
      const response = (await _http.get(
        `/v2/projects/${encodeURIComponent(input.repository_id)}/repository/commits/${encodeURIComponent(input.commit_sha)}`
      )) as {
        id?: string;
        short_id?: string;
        title?: string;
        author_name?: string;
        message?: string;
      };

      return {
        id: response.id ?? input.commit_sha,
        short_id: response.short_id,
        title: response.title,
        author_name: response.author_name,
        message: response.message
      };
    },
    async getFile(input) {
      const query = new URLSearchParams({
        file_path: input.file_path,
        ref: input.branch
      });
      const response = (await _http.get(
        `/v2/projects/${encodeURIComponent(input.repository_id)}/repository/files?${query.toString()}`
      )) as {
        file_path?: string;
        branch_name?: string;
        content?: string;
      };

      return {
        file_path: response.file_path ?? input.file_path,
        branch_name: response.branch_name ?? input.branch,
        content: response.content ?? ""
      };
    },
    async listCommits(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      if (input.ref_name) {
        query.set("ref_name", input.ref_name);
      }
      if (input.since) {
        query.set("since", input.since);
      }
      if (input.until) {
        query.set("until", input.until);
      }
      if (typeof input.order_by_date !== "undefined") {
        query.set("order_by_date", String(input.order_by_date));
      }
      if (typeof input.with_stats !== "undefined") {
        query.set("with_stats", String(input.with_stats));
      }

      const response = (await _http.get(
        `/v2/projects/${encodeURIComponent(input.repository_id)}/repository/commits?${query.toString()}`
      )) as {
        commits?: Array<{ id: string; short_id?: string; title?: string; author_name?: string }>;
        total?: number;
      };

      return {
        commits: response.commits ?? [],
        total: response.total
      };
    },
    async listRepositories(input) {
      const cacheKey = buildListRepositoriesCacheKey(input);
      const cached = await listRepositoriesCache.getOrLoad(cacheKey, async () => {
        const offset = (input.page - 1) * input.page_size;
        const query = new URLSearchParams({
          offset: String(offset),
          limit: String(input.page_size)
        });

        if (input.keyword) {
          query.set("search", input.keyword);
        }

        const response = (await _http.get(
          `/v4/projects/${encodeURIComponent(input.project_id)}/repositories?${query.toString()}`
        )) as
          | Array<{ id: number | string; name: string; ssh_url?: string; http_url?: string }>
          | {
              repositories?: Array<{
                id: number | string;
                name: string;
                ssh_url?: string;
                http_url?: string;
              }>;
              total?: number;
            };

        const repositories = Array.isArray(response) ? response : (response.repositories ?? []);

        return {
          repositories,
          total: Array.isArray(response) ? response.length : response.total
        };
      });

      if (cached.cacheHit) {
        recordRequestCacheHit("repo_list_repositories");
      }

      return cached.value;
    },
    async listMergeRequests(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.state) {
        query.set("state", input.state);
      }

      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/merge-requests?${query.toString()}`
      )) as Array<{
        id: number | string;
        iid?: number;
        title?: string;
        state?: string;
        source_branch?: string;
        target_branch?: string;
        created_at?: string;
        updated_at?: string;
        author?: { name?: string; nick_name?: string };
        web_url?: string;
      }>;

      return {
        merge_requests: response ?? [],
        total: undefined
      };
    },
    async listBranches(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      const response = (await _http.get(
        `/v4/repositories/${encodeURIComponent(input.repository_id)}/repository/branches?${query.toString()}`
      )) as
        | Array<{ name: string; commit?: { id?: string }; protected?: boolean }>
        | {
            branches?: Array<{ name: string; commit?: { id?: string }; protected?: boolean }>;
            total?: number;
            result?: {
              branches?: Array<{ name: string; commit?: { id?: string }; protected?: boolean }>;
              total?: number;
            };
          };
      const payload = Array.isArray(response) ? response : (response.result?.branches ?? response.branches ?? []);
      const total = Array.isArray(response) ? response.length : (response.result?.total ?? response.total);

      return {
        branches: payload,
        total
      };
    }
  };
}
