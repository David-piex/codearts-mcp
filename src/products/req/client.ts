import type { ReturnTypeCreateHttpClient } from "../types.js";

export type ReqClient = {
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
  const listCacheTtlMs = options.listCacheTtlMs ?? 15_000;
  const now = options.now ?? Date.now;
  const listProjectsCache = new Map<
    string,
    {
      expiresAt: number;
      value: {
        projects: Array<{ project_id: string; name: string; project_num_id?: number }>;
        total?: number;
      };
    }
  >();

  function buildListProjectsCacheKey(input: {
    page: number;
    page_size: number;
    keyword?: string;
  }) {
    return JSON.stringify([input.page, input.page_size, input.keyword ?? ""]);
  }

  return {
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
    async listProjects(input) {
      const cacheKey = buildListProjectsCacheKey(input);
      const cached = listProjectsCache.get(cacheKey);

      if (cached && cached.expiresAt > now()) {
        return cached.value;
      }

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

      const value = {
        projects: (response.projects ?? []).map((project) => ({
          project_id: project.project_id,
          name: project.name ?? project.project_name ?? "",
          project_num_id: project.project_num_id
        })),
        total: response.total
      };

      listProjectsCache.set(cacheKey, {
        expiresAt: now() + listCacheTtlMs,
        value
      });

      return value;
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
    }
  };
}
