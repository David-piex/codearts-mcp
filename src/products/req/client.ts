import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import { DEFAULT_READ_CACHE_TTLS } from "../../core/cache/read-cache-ttl.js";
import { recordRequestCacheHit } from "../../server/request-context.js";
import type { ReturnTypeCreateHttpClient } from "../types.js";

export type ReqClient = {
  createProject: (input: {
    name: string;
    description?: string;
  }) => Promise<{
    project_id: string;
    project_name: string;
    description?: string;
    project_num_id?: number;
    project_type?: string;
  }>;
  createWorkItem: (input: {
    project_id: string;
    title: string;
    work_item_type: string;
    description?: string;
    priority_id?: number;
  }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    status?: { id?: number; name?: string };
    tracker?: { id?: number; name?: string };
  }>;
  getProject: (input: { project_id: string }) => Promise<{
    project_id: string;
    name: string;
    project_num_id?: number;
    description?: string;
  }>;
  updateProject: (input: {
    project_id: string;
    name: string;
    description?: string;
  }) => Promise<{
    project_id: string;
    project_name: string;
    description?: string;
  }>;
  deleteProject: (input: { project_id: string }) => Promise<{
    project_id: string;
    deleted: true;
  }>;
  addProjectMember: (input: {
    project_id: string;
    user_id: string;
    domain_id: string;
    domain_name?: string;
    role_id?: number;
  }) => Promise<{
    project_id: string;
    user_id: string;
    domain_id: string;
    domain_name?: string;
    role_id?: number;
    added: true;
  }>;
  batchAddProjectMembers: (input: {
    project_id: string;
    members: Array<{ user_id: string; role_id?: number }>;
  }) => Promise<{
    project_id: string;
    members: Array<{ user_id: string; role_id?: number }>;
    addedCount: number;
  }>;
  batchDeleteProjectMembers: (input: {
    project_id: string;
    user_ids: string[];
  }) => Promise<{
    project_id: string;
    user_ids: string[];
    removedCount: number;
  }>;
  updateProjectMemberRole: (input: {
    project_id: string;
    user_id: string;
    role_id: number;
  }) => Promise<{
    project_id: string;
    user_id: string;
    role_id: number;
    updated: true;
  }>;
  leaveProject: (input: { project_id: string }) => Promise<{
    project_id: string;
    left: true;
  }>;
  checkProjectName: (input: { name: string }) => Promise<{
    exist: boolean;
  }>;
  listNotAddedProjects: (input: { page: number; page_size: number }) => Promise<{
    projects: Array<{
      project_id: string;
      project_name: string;
      project_num_id?: number;
      description?: string;
      project_type?: string;
    }>;
    total?: number;
  }>;
  updateWorkItem: (input: {
    project_id: string;
    work_item_id: string;
    title?: string;
    work_item_type?: string;
    description?: string;
    status_id?: number;
    priority_id?: number;
  }) => Promise<{
    id: number | string;
    name: string;
    description?: string;
    status?: { id?: number; name?: string };
    tracker?: { id?: number; name?: string };
  }>;
  deleteWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<{
    project_id: string;
    work_item_id: string;
    deleted: true;
  }>;
  batchUpdateWorkItems: (input: {
    project_id: string;
    work_item_ids: string[];
    status_id?: number;
    priority_id?: number;
  }) => Promise<{
    project_id: string;
    work_item_ids: string[];
    status_id?: number;
    priority_id?: number;
    updatedCount: number;
  }>;
  listIterations: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    iterations: Array<{
      id: number | string;
      name: string;
      status?: string;
      begin_time?: string;
      end_time?: string;
      description?: string;
      updated_time?: number;
      deleted?: boolean;
    }>;
    total?: number;
  }>;
  getIteration: (input: { iteration_id: string }) => Promise<{
    iteration_id: number | string;
    name: string;
    status?: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    progress?: string;
    total?: number;
    opened_total?: number;
    closed_total?: number;
    have_task?: boolean;
    charts?: Record<string, unknown>;
    created_time?: number;
    updated_time?: number;
  }>;
  createIteration: (input: {
    project_id: string;
    name: string;
    begin_time: string;
    end_time: string;
    description?: string;
  }) => Promise<{
    id: number | string;
    project_id: string;
    name: string;
    begin_time: string;
    end_time: string;
    description?: string;
  }>;
  updateIteration: (input: {
    project_id: string;
    iteration_id: string;
    name: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    status?: string;
    over_type?: string;
  }) => Promise<{
    project_id: string;
    iteration_id: string;
    name: string;
    begin_time?: string;
    end_time?: string;
    description?: string;
    status?: string;
    over_type?: string;
  }>;
  deleteIteration: (input: { project_id: string; iteration_id: string }) => Promise<{
    project_id: string;
    iteration_id: string;
    deleted: true;
  }>;
  batchDeleteIterations: (input: {
    project_id: string;
    iteration_ids: string[];
  }) => Promise<{
    project_id: string;
    iteration_ids: string[];
    deletedCount: number;
  }>;
  updateIterationState: (input: {
    project_id: string;
    iteration_id: string;
    name: string;
    status: string;
    due_date?: string;
    start_date?: string;
  }) => Promise<{
    project_id: string;
    iteration_id: string;
    name: string;
    status: string;
    due_date?: string;
    start_date?: string;
    result?: string;
    update_status?: string;
  }>;
  queryIterationImmovableIssues: (input: {
    project_id: string;
    version_id: string;
  }) => Promise<{
    items: Array<{
      number?: string;
      id: number | string;
      status_id?: number;
      status_name?: string;
    }>;
  }>;
  listProjectMembers: (input: { project_id: string; page: number; page_size: number }) => Promise<{
    members: Array<{
      domain_id?: string;
      domain_name?: string;
      user_id: string;
      user_name?: string;
      user_num_id?: number;
      role_id?: number;
      nick_name?: string;
      role_name?: string;
      user_type?: string;
      forbidden?: number;
    }>;
    total?: number;
  }>;
  listProjects: (input: { page: number; page_size: number; keyword?: string }) => Promise<{
    projects: Array<{ project_id: string; name: string; project_num_id?: number }>;
    total?: number;
  }>;
  listWorkItems: (input: { project_id: string; page: number; page_size: number; keyword?: string }) => Promise<{
    work_items: Array<{
      id: number | string;
      subject: string;
      status?: { name?: string };
      tracker_name?: string;
    }>;
    total?: number;
  }>;
  getWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<{
    id: number | string;
    subject: string;
    status?: { name?: string };
    tracker_name?: string;
    description?: string;
  }>;
  listWorkItemRecords: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
    journalized_type?: string;
  }) => Promise<{
    records: Array<{
      id: number | string;
      created_time?: string;
      user?: {
        user_id?: string;
        user_name?: string;
        user_num_id?: number;
        nick_name?: string;
      };
      details?: Array<{
        id: number | string;
        name?: string;
        new_value?: string;
        old_value?: string;
        operation?: string;
        property?: string;
      }>;
    }>;
    total?: number;
  }>;
};

function toTrackerId(workItemType?: string): number | undefined {
  if (!workItemType) {
    return undefined;
  }

  const normalized = workItemType.trim().toLowerCase();

  if (/^\d+$/.test(normalized)) {
    return Number(normalized);
  }

  const mapping: Record<string, number> = {
    task: 2,
    bug: 3,
    epic: 5,
    feature: 6,
    story: 7
  };

  return mapping[normalized];
}

function toPriorityId(priorityId?: number): number {
  return priorityId ?? 2;
}

function unwrapReqPayload<T>(input: T): T {
  if (typeof input === "string") {
    const trimmed = input.trim();

    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return unwrapReqPayload(JSON.parse(trimmed)) as T;
      } catch {
        return input;
      }
    }
  }

  return input;
}

type ReqIssueListItem = {
  id: number | string;
  subject?: string;
  name?: string;
  status?: { name?: string };
  tracker?: { name?: string };
  tracker_name?: string;
};

type ReqClientOptions = {
  listCacheTtlMs?: number;
  now?: () => number;
};

export function createReqClient(
  _http: ReturnTypeCreateHttpClient,
  options: ReqClientOptions = {}
): ReqClient {
  const listCacheTtlMs =
    options.listCacheTtlMs ?? DEFAULT_READ_CACHE_TTLS.reqListProjectsMs;
  const now = options.now ?? Date.now;
  const listProjectsCache = createReadThroughCache<
    string,
    {
      projects: Array<{ project_id: string; name: string; project_num_id?: number }>;
      total?: number;
    }
  >({
    ttlMs: listCacheTtlMs,
    now
  });

  function buildListProjectsCacheKey(input: {
    page: number;
    page_size: number;
    keyword?: string;
  }) {
    return JSON.stringify([input.page, input.page_size, input.keyword ?? ""]);
  }

  return {
    async createProject(input) {
      const response = (await _http.post("/v4/project", {
        project_name: input.name,
        description: input.description,
        project_type: "scrum"
      })) as {
        project_id?: string;
        project_name?: string;
        description?: string;
        project_num_id?: number;
        project_type?: string;
      };

      return {
        project_id: response.project_id ?? "",
        project_name: response.project_name ?? input.name,
        description: response.description ?? input.description,
        project_num_id: response.project_num_id,
        project_type: response.project_type ?? "scrum"
      };
    },
    async createWorkItem(input) {
      const response = (await _http.post(`/v4/projects/${encodeURIComponent(input.project_id)}/issue`, {
        name: input.title,
        description: input.description,
        tracker_id: toTrackerId(input.work_item_type),
        priority_id: toPriorityId(input.priority_id)
      })) as {
        id?: number | string;
        name?: string;
        description?: string;
        status?: { id?: number; name?: string };
        tracker?: { id?: number; name?: string };
      };

      return {
        id: response.id ?? "",
        name: response.name ?? input.title,
        description: response.description,
        status: response.status,
        tracker: response.tracker
      };
    },
    async getProject(input) {
      const response = (await _http.get(`/v4/projects/${encodeURIComponent(input.project_id)}`)) as {
        project?: {
          project_id?: string;
          name?: string;
          project_num_id?: number;
          description?: string;
        };
        project_id?: string;
        name?: string;
        project_num_id?: number;
        description?: string;
      };
      const project = response.project ?? response;

      return {
        project_id: project.project_id ?? input.project_id,
        name: project.name ?? "",
        project_num_id: project.project_num_id,
        description: project.description
      };
    },
    async updateProject(input) {
      await _http.put(`/v4/projects/${encodeURIComponent(input.project_id)}`, {
        project_name: input.name,
        description: input.description
      });

      return {
        project_id: input.project_id,
        project_name: input.name,
        description: input.description
      };
    },
    async deleteProject(input) {
      await _http.delete(`/v4/projects/${encodeURIComponent(input.project_id)}`);

      return {
        project_id: input.project_id,
        deleted: true as const
      };
    },
    async addProjectMember(input) {
      await _http.post(`/v4/projects/${encodeURIComponent(input.project_id)}/member`, {
        user_id: input.user_id,
        domain_id: input.domain_id,
        domain_name: input.domain_name,
        role_id: input.role_id
      });

      return {
        project_id: input.project_id,
        user_id: input.user_id,
        domain_id: input.domain_id,
        domain_name: input.domain_name,
        role_id: input.role_id,
        added: true as const
      };
    },
    async batchAddProjectMembers(input) {
      await _http.post(`/v4/projects/${encodeURIComponent(input.project_id)}/members`, {
        users: input.members
      });

      return {
        project_id: input.project_id,
        members: input.members,
        addedCount: input.members.length
      };
    },
    async batchDeleteProjectMembers(input) {
      await _http.delete(`/v4/projects/${encodeURIComponent(input.project_id)}/members`, {
        user_ids: input.user_ids
      });

      return {
        project_id: input.project_id,
        user_ids: input.user_ids,
        removedCount: input.user_ids.length
      };
    },
    async updateProjectMemberRole(input) {
      await _http.post(`/v4/projects/${encodeURIComponent(input.project_id)}/members/role`, {
        role_id: input.role_id,
        user_ids: [input.user_id]
      });

      return {
        project_id: input.project_id,
        user_id: input.user_id,
        role_id: input.role_id,
        updated: true as const
      };
    },
    async leaveProject(input) {
      await _http.delete(`/v4/projects/${encodeURIComponent(input.project_id)}/quit`);

      return {
        project_id: input.project_id,
        left: true as const
      };
    },
    async checkProjectName(input) {
      const response = (await _http.post("/v4/projects/check-name", {
        project_name: input.name
      })) as {
        exist?: boolean;
      };

      return {
        exist: response.exist ?? false
      };
    },
    async listNotAddedProjects(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(`/v4/projects/domain/not-added?${query.toString()}`)) as {
        projects?: Array<{
          project_id: string;
          project_name?: string;
          name?: string;
          project_num_id?: number;
          description?: string;
          project_type?: string;
        }>;
        total?: number;
      };

      return {
        projects: (response.projects ?? []).map((project) => ({
          project_id: project.project_id,
          project_name: project.project_name ?? project.name ?? "",
          project_num_id: project.project_num_id,
          description: project.description,
          project_type: project.project_type
        })),
        total: response.total
      };
    },
    async listIterations(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iterations`
      )) as {
        iterations?: Array<{
          id: number | string;
          name: string;
          status?: string;
          begin_time?: string;
          end_time?: string;
          description?: string;
          updated_time?: number;
          deleted?: boolean;
        }>;
        total?: number;
        total_count?: number;
      };

      return {
        iterations: response.iterations ?? [],
        total: response.total ?? response.total_count
      };
    },
    async getIteration(input) {
      const response = (await _http.get(
        `/v4/iterations/${encodeURIComponent(input.iteration_id)}`
      )) as {
        iteration_id?: number | string;
        name?: string;
        status?: string;
        begin_time?: string;
        end_time?: string;
        description?: string;
        progress?: string;
        total?: number;
        opened_total?: number;
        closed_total?: number;
        have_task?: boolean;
        charts?: Record<string, unknown>;
        created_time?: number;
        updated_time?: number;
      };

      return {
        iteration_id: response.iteration_id ?? input.iteration_id,
        name: response.name ?? "",
        status: response.status,
        begin_time: response.begin_time,
        end_time: response.end_time,
        description: response.description,
        progress: response.progress,
        total: response.total,
        opened_total: response.opened_total,
        closed_total: response.closed_total,
        have_task: response.have_task,
        charts: response.charts,
        created_time: response.created_time,
        updated_time: response.updated_time
      };
    },
    async createIteration(input) {
      const response = (await _http.post(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iteration`,
        {
          name: input.name,
          begin_time: input.begin_time,
          end_time: input.end_time,
          description: input.description
        }
      )) as {
        id?: number | string;
      };

      return {
        id: response.id ?? "",
        project_id: input.project_id,
        name: input.name,
        begin_time: input.begin_time,
        end_time: input.end_time,
        description: input.description
      };
    },
    async updateIteration(input) {
      await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iterations/${encodeURIComponent(input.iteration_id)}`,
        {
          name: input.name,
          begin_time: input.begin_time,
          end_time: input.end_time,
          description: input.description,
          status: input.status,
          over_type: input.over_type
        }
      );

      return {
        project_id: input.project_id,
        iteration_id: input.iteration_id,
        name: input.name,
        begin_time: input.begin_time,
        end_time: input.end_time,
        description: input.description,
        status: input.status,
        over_type: input.over_type
      };
    },
    async deleteIteration(input) {
      await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/iterations/${encodeURIComponent(input.iteration_id)}`
      );

      return {
        project_id: input.project_id,
        iteration_id: input.iteration_id,
        deleted: true as const
      };
    },
    async batchDeleteIterations(input) {
      await _http.delete(`/v4/projects/${encodeURIComponent(input.project_id)}/iterations`, {
        iteration_ids: input.iteration_ids
      });

      return {
        project_id: input.project_id,
        iteration_ids: input.iteration_ids,
        deletedCount: input.iteration_ids.length
      };
    },
    async updateIterationState(input) {
      const response = (await _http.post("/v2/version/state/update", {
        project_id: input.project_id,
        id: input.iteration_id,
        name: input.name,
        status: input.status,
        due_date: input.due_date,
        start_date: input.start_date
      })) as {
        result?: string;
        status?: string;
      };

      return {
        project_id: input.project_id,
        iteration_id: input.iteration_id,
        name: input.name,
        status: input.status,
        due_date: input.due_date,
        start_date: input.start_date,
        result: response.result,
        update_status: response.status
      };
    },
    async queryIterationImmovableIssues(input) {
      const query = new URLSearchParams({
        project_id: input.project_id,
        version_id: input.version_id
      });
      const response = (await _http.get(
        `/v2/version/query-immovable-issues?${query.toString()}`
      )) as {
        number?: string;
        id?: number | string;
        status_id?: number;
        status_name?: string;
      };

      return {
        items: response.id
          ? [
              {
                number: response.number,
                id: response.id,
                status_id: response.status_id,
                status_name: response.status_name
              }
            ]
          : []
      };
    },
    async updateWorkItem(input) {
      const response = (await _http.put(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}`,
        {
          name: input.title,
          description: input.description,
          status_id: input.status_id,
          tracker_id: toTrackerId(input.work_item_type),
          priority_id: toPriorityId(input.priority_id)
        }
      )) as {
        id?: number | string;
        name?: string;
        description?: string;
        status?: { id?: number; name?: string };
        tracker?: { id?: number; name?: string };
      };

      return {
        id: response.id ?? input.work_item_id,
        name: response.name ?? input.title ?? "",
        description: response.description,
        status: response.status,
        tracker: response.tracker
      };
    },
    async deleteWorkItem(input) {
      await _http.delete(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}`
      );

      return {
        project_id: input.project_id,
        work_item_id: input.work_item_id,
        deleted: true as const
      };
    },
    async batchUpdateWorkItems(input) {
      const attribute: {
        status_id?: number;
        priority_id?: number;
      } = {};

      if (typeof input.status_id !== "undefined") {
        attribute.status_id = input.status_id;
      }

      if (typeof input.priority_id !== "undefined") {
        attribute.priority_id = input.priority_id;
      }

      await _http.put(`/v2/projects/${encodeURIComponent(input.project_id)}/issues/batch-update`, {
        id: input.work_item_ids,
        attribute
      });

      return {
        project_id: input.project_id,
        work_item_ids: input.work_item_ids,
        status_id: input.status_id,
        priority_id: input.priority_id,
        updatedCount: input.work_item_ids.length
      };
    },
    async listProjects(input) {
      const cacheKey = buildListProjectsCacheKey(input);
      const cached = await listProjectsCache.getOrLoad(cacheKey, async () => {
        const offset = (input.page - 1) * input.page_size;
        const query = new URLSearchParams({
          offset: String(offset),
          limit: String(input.page_size)
        });

        if (input.keyword) {
          query.set("search", input.keyword);
        }

        const response = (await _http.get(`/v4/projects?${query.toString()}`)) as {
          projects?: Array<{
            project_id: string;
            name?: string;
            project_name?: string;
            project_num_id?: number;
          }>;
          total?: number;
        };

        return {
          projects: (response.projects ?? []).map((project) => ({
            project_id: project.project_id,
            name: project.name ?? project.project_name ?? "",
            project_num_id: project.project_num_id
          })),
          total: response.total
        };
      });

      if (cached.cacheHit) {
        recordRequestCacheHit("req_list_projects");
      }

      return cached.value;
    },
    async listProjectMembers(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/members?${query.toString()}`
      )) as {
        members?: Array<{
          domain_id?: string;
          domain_name?: string;
          user_id: string;
          user_name?: string;
          user_num_id?: number;
          role_id?: number;
          nick_name?: string;
          role_name?: string;
          user_type?: string;
          forbidden?: number;
        }>;
        total?: number;
      };

      return {
        members: response.members ?? [],
        total: response.total
      };
    },
    async listWorkItems(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }

      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues?${query.toString()}`
      )) as {
        issues?: ReqIssueListItem[];
        work_items?: ReqIssueListItem[];
        total?: number;
      };
      const payload = unwrapReqPayload(response);
      const items: ReqIssueListItem[] = payload.issues ?? payload.work_items ?? [];

      return {
        work_items: items.map((item) => ({
          id: item.id,
          subject: item.subject ?? item.name ?? "",
          status: item.status,
          tracker_name: item.tracker_name ?? item.tracker?.name
        })),
        total: payload.total
      };
    },
    async getWorkItem(input) {
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issues/${encodeURIComponent(input.work_item_id)}`
      )) as {
        id?: number | string;
        subject?: string;
        name?: string;
        status?: { name?: string };
        tracker?: { name?: string };
        tracker_name?: string;
        description?: string;
      };

      return {
        id: response.id ?? input.work_item_id,
        subject: response.subject ?? response.name ?? "",
        status: response.status,
        tracker_name: response.tracker_name ?? response.tracker?.name,
        description: response.description
      };
    },
    async listWorkItemRecords(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size),
        journalizedType: input.journalized_type ?? "Issue"
      });
      const response = (await _http.get(
        `/v4/projects/${encodeURIComponent(input.project_id)}/issue/${encodeURIComponent(input.work_item_id)}/records?${query.toString()}`
      )) as {
        records?: Array<{
          id: number | string;
          created_time?: string;
          user?: {
            user_id?: string;
            user_name?: string;
            user_num_id?: number;
            nick_name?: string;
          };
          details?: Array<{
            id: number | string;
            name?: string;
            new_value?: string;
            old_value?: string;
            operation?: string;
            property?: string;
          }>;
        }>;
        total?: number;
      };

      return {
        records: response.records ?? [],
        total: response.total
      };
    }
  };
}
