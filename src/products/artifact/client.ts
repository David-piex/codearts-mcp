import type { ReturnTypeCreateHttpClient } from "../types.js";
import { createOfficialApiRequester, type OfficialApiRequestInput, type OfficialApiRequestResult } from "../official-api.js";

export type ArtifactClient = {
  requestOfficialApi: (input: OfficialApiRequestInput) => Promise<OfficialApiRequestResult>;
  listVersions: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    versions: Array<{
      version?: string;
      build_version?: string;
      repo_name?: string;
      artifact_name?: string;
      created_at?: string;
      updated_at?: string;
      downloads?: number;
      files_count?: number;
      category?: string;
    }>;
    total?: number;
  }>;
  showProjectVersionsCount: (input: {
    project_id: string;
    name?: string;
    status?: string;
  }) => Promise<{
    count?: number;
    total?: number;
    raw?: unknown;
  }>;
  getFileTree: (input: {
    tenant_id: string;
    project_id: string;
    repo_name: string;
    path?: string;
  }) => Promise<{
    root_path: string;
    nodes: Array<{
      path?: string;
      name?: string;
      type?: string;
    }>;
  }>;
  listLatestVersionFiles: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    files: Array<{
      path?: string;
      name?: string;
      version?: string;
      repo_name?: string;
      size?: string;
      modified_at?: string;
    }>;
    total?: number;
  }>;
  showLatestVersionFilesCount: (input: {
    project_id: string;
    name?: string;
    status?: string;
  }) => Promise<{
    count?: number;
    total?: number;
    raw?: unknown;
  }>;
  showPackageDataDetail: (input: {
    project_id?: string;
    status?: string;
  }) => Promise<{
    raw: unknown;
  }>;
  showPackageInfo: (input: {
    project_id?: string;
    status?: string;
  }) => Promise<{
    raw: unknown;
  }>;
  showDomainReleaseRepoStorage: (input: {
    status?: string;
    package_type?: string;
  }) => Promise<{
    used?: string;
    total?: string;
    raw?: unknown;
  }>;
  showProjectStorageInfo: (input: {
    project_id: string;
    status?: string;
  }) => Promise<{
    used?: string;
    total?: string;
    file_count?: number;
    raw?: unknown;
  }>;
  showCapacityNoticeSettings: () => Promise<{
    raw: unknown;
  }>;
  showAutoDeleteJobSettings: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: unknown;
  }>;
  showUserPrivileges: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: unknown;
  }>;
  showUserPermissions: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: unknown;
  }>;
  getRepositoryUserInfo: () => Promise<{
    username?: string;
    raw: unknown;
  }>;
  listRepositoryUsers: (input: {
    page: number;
    page_size: number;
    user_name?: string;
  }) => Promise<{
    users: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listProjectRolePermissions: (input: { project_id: string }) => Promise<{
    permissions: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listChildProxyRepositories: (input: { repo_id: string; type?: string }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listStorageStatistics: (input: { tenant_id: string; project_id: string }) => Promise<{
    statistics: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listAttentions: (input: {
    project_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    attentions: Array<Record<string, unknown>>;
    total?: number;
  }>;
  createAttention: (input: {
    format: string;
    attention: string;
    ids: string[];
  }) => Promise<{
    status?: string;
    trace_id?: string;
    raw: unknown;
  }>;
  listSecGuardTasks: (input: {
    date?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    tasks: Array<Record<string, unknown>>;
    total?: number;
  }>;
  showOpenSourceEnabled: () => Promise<{
    value?: unknown;
    raw: unknown;
  }>;
  showAudit: (input: {
    tenant_id: string;
    project_id: string;
    module: string;
    repo: string;
    page: number;
    page_size: number;
    user_id?: string;
    instance_id?: string;
    format?: string;
    resource_id?: string;
  }) => Promise<{
    records: Array<{
      id?: string;
      operation?: string;
      user_id?: string;
      user_name?: string;
      op_time?: string;
      resource_path?: string;
    }>;
    total?: number;
  }>;
  searchArtifacts: (input: {
    artifact_name: string;
    page: number;
    page_size: number;
    repo_name?: string;
    project_id?: string;
  }) => Promise<{
    artifacts: Array<{
      name?: string;
      relative_path?: string;
      repo?: string;
      repo_name?: string;
      display_name?: string;
      repo_type?: string;
    }>;
    total?: number;
  }>;
  searchByChecksum: (input: {
    checksum: string;
    page: number;
    page_size: number;
    format?: string;
    in_project?: boolean;
    project_id?: string;
  }) => Promise<{
    artifacts: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listMavenProjectRepositories: (input: {
    page: number;
    page_size: number;
    search_name?: string;
    repo_id?: string;
  }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listMavenRepositories: (input: {
    project_id?: string;
    default?: boolean;
    policy?: string;
    repo_ids?: string[];
    access?: string;
  }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listMavenRepositoryList: (input: {
    project_id?: string;
    policy?: string;
    format?: string;
    type?: string;
    repo_id?: string;
    search_name?: string;
  }) => Promise<{
    repositories: Array<Record<string, unknown>>;
    total?: number;
  }>;
  getRepositoryDetail: (input: {
    tenant_id: string;
    project_id: string;
    repo_id: string;
    region?: string;
    path?: string;
  }) => Promise<{
    tenant_id: string;
    project_id: string;
    repo_id: string;
    raw: unknown;
  }>;
  listProjectReleaseFiles: (input: {
    project_id: string;
    file_name: string;
    page: number;
    page_size: number;
  }) => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listReleaseFiles: (input: {
    project_id: string;
    file_name: string;
    page: number;
    page_size: number;
  }) => Promise<{
    files: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listProjectUsers: (input: {
    project_id: string;
    repo_id: string;
    page: number;
    page_size: number;
    scene?: string;
  }) => Promise<{
    users: Array<Record<string, unknown>>;
    total?: number;
  }>;
  listDomainIpConfigs: (input: {
    page: number;
    page_size: number;
  }) => Promise<{
    configs: Array<Record<string, unknown>>;
    total?: number;
  }>;
  showRepositoryPrivileges: (input: {
    project_id: string;
    repo_id: string;
  }) => Promise<{
    project_id: string;
    repo_id: string;
    raw: unknown;
  }>;
  showUserPrivilegesV3: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: unknown;
  }>;
  getRepoFileInfoById: (input: { id: string }) => Promise<Record<string, unknown>>;
  getRepoFileInfoByName: (input: { file_name: string }) => Promise<Record<string, unknown>>;
  showUserTicket: () => Promise<{
    ticket?: string;
    raw: unknown;
  }>;
  deleteCompletelyUpdateFileState: (input: { ids: string[] }) => Promise<{
    status?: string;
    trace_id?: string;
    raw: unknown;
    success?: number;
    failed?: number;
    success_items?: string[];
    failed_items?: string[];
    reason?: unknown[];
  }>;
  deleteFile: (input: {
    tenant_id: string;
    project_id: string;
    repo_name: string;
    path: string;
    format: string;
  }) => Promise<{
    path: string;
    deleted: boolean;
  }>;
  createRepository: (input: {
    format: string;
    type: string;
    repository_name: string;
    includes_pattern: string;
    project_id?: string;
    description?: string;
    share_right?: string;
    params?: Record<string, unknown>;
  }) => Promise<{
    status?: string;
    trace_id?: string;
    raw: unknown;
  }>;
  updateRepository: (input: {
    repo_name: string;
    format: string;
    repository_ids: string[];
    includes_pattern: string;
    description?: string;
    deployment_policy?: string;
    auto_clean_snapshot?: boolean;
    snapshot_alive_days?: string;
    params?: Record<string, unknown>;
  }) => Promise<{
    status?: string;
    trace_id?: string;
    raw: unknown;
  }>;
  restoreTrashRepositories: (input: {
    items: Array<Record<string, unknown>>;
  }) => Promise<{
    status?: string;
    trace_id?: string;
    raw: unknown;
  }>;
  deleteTrashRepositories: (input: {
    items: Array<Record<string, unknown>>;
  }) => Promise<{
    status?: string;
    trace_id?: string;
    raw: unknown;
  }>;
  getDownloadUrl: (input: {
    tenant_id: string;
    project_id: string;
    repo_name: string;
    path: string;
    format: string;
  }) => Promise<{
    path: string;
    name: string;
    download_url?: string;
    expires_at?: string;
  }>;
  listRepositories: (input: {
    tenant_id: string;
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    qname?: string;
    type?: string;
    format?: string;
    format_list?: string[];
    is_recycle_bin?: boolean;
  }) => Promise<{
    repositories: Array<{
      id: string;
      name: string;
      project_id?: string;
      format?: string;
      description?: string;
    }>;
    total?: number;
  }>;
  getRepository: (input: { repository_id: string }) => Promise<{
    id: string;
    name: string;
    project_id?: string;
    format?: string;
    description?: string;
  }>;
  listFiles: (input: {
    project_id: string;
    repo_name?: string;
    page: number;
    page_size: number;
    keyword?: string;
    parent_id?: string;
    search_name?: string;
    search_type?: string;
    extension?: string;
    order_by?: string;
    sort?: string;
    status?: string;
    category?: string;
  }) => Promise<{
    files: Array<{
      path: string;
      name: string;
      type?: string;
      size?: string;
    }>;
    total?: number;
  }>;
  getFile: (input: {
    tenant_id: string;
    project_id: string;
    repo_name: string;
    path: string;
    format: string;
  }) => Promise<{
    path: string;
    name: string;
    download_uri?: string;
    size?: string;
    md5?: string;
  }>;
  listBuildArchives: (input: {
    page: number;
    page_size: number;
    keyword?: string;
    parent_id?: string;
    build_id?: string;
    build_no?: string;
    repo_branch?: string;
  }) => Promise<{
    archives: Array<{
      id: string;
      name: string;
      size?: string;
      download_url?: string;
      md5?: string;
    }>;
    total?: number;
  }>;
};

function readArray<T>(input: unknown): T[] {
  return Array.isArray(input) ? (input as T[]) : [];
}

function unwrapArtifactPayload<T>(input: T): T {
  if (typeof input === "string") {
    const trimmed = input.trim();

    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return unwrapArtifactPayload(JSON.parse(trimmed)) as T;
      } catch {
        return input;
      }
    }
  }

  return input;
}

function readEnvelope(input: unknown) {
  if (input && typeof input === "object" && !Array.isArray(input)) {
    return input as Record<string, unknown>;
  }

  return undefined;
}

function readOptionalNumber(input: unknown) {
  return typeof input === "number" ? input : undefined;
}

function readOptionalString(input: unknown) {
  if (typeof input === "string") {
    return input;
  }

  if (typeof input === "number") {
    return String(input);
  }

  return undefined;
}

function readTotal(payload: Record<string, unknown>, response: Record<string, unknown>, fallback: number) {
  return (
    readOptionalNumber(payload.total_records) ??
    readOptionalNumber(payload.totalRecords) ??
    readOptionalNumber(payload.total) ??
    readOptionalNumber(payload.total_count) ??
    readOptionalNumber(response.total_records) ??
    readOptionalNumber(response.totalRecords) ??
    readOptionalNumber(response.total) ??
    readOptionalNumber(response.total_count) ??
    fallback
  );
}

function readCount(payload: Record<string, unknown>, response: Record<string, unknown>) {
  return (
    readOptionalNumber(payload.count) ??
    readOptionalNumber(payload.total) ??
    readOptionalNumber(payload.total_count) ??
    readOptionalNumber(payload.file_count) ??
    readOptionalNumber(response.count) ??
    readOptionalNumber(response.total) ??
    readOptionalNumber(response.total_count)
  );
}

function readStoragePayload(input: unknown) {
  const response = unwrapArtifactPayload(input);
  const envelope = readEnvelope(response) ?? {};
  const payload = readEnvelope(envelope.result) ?? envelope;

  return { response: envelope, payload };
}

function readRecordList(
  payload: Record<string, unknown>,
  response: Record<string, unknown>,
  keys: string[]
) {
  for (const key of keys) {
    const value = payload[key] ?? response[key];
    const items = readArray<Record<string, unknown>>(value);
    if (items.length || Array.isArray(value)) {
      return items;
    }
  }

  return readArray<Record<string, unknown>>(response.result ?? payload);
}

function sanitizeArtifactRecord(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeArtifactRecord(item));
  }

  if (!input || typeof input !== "object") {
    return input;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (["password", "token", "ticket", "secret", "secret_key", "access_key"].includes(key.toLowerCase())) {
      result[key] = value === undefined || value === null || value === "" ? value : "***";
      continue;
    }

    result[key] = sanitizeArtifactRecord(value);
  }

  return result;
}

function sanitizeArtifactRecordArray(items: Array<Record<string, unknown>>) {
  return items.map((item) => sanitizeArtifactRecord(item) as Record<string, unknown>);
}

export function createArtifactClient(_http: ReturnTypeCreateHttpClient): ArtifactClient {
  return {
    ...createOfficialApiRequester({
      product: "Artifact",
      http: _http,
      allowedPrefixes: ["/cloudartifact/", "/devreposerver/", "/v5/", "/v2/release/", "/v3/release/"]
    }),
    async listVersions(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/versions?${query.toString()}`
      )) as {
        versions?: unknown;
        result?: {
          versions?: unknown;
          total?: number;
          total_count?: number;
        };
        total?: number;
        total_count?: number;
      };
      const payloadResponse = unwrapArtifactPayload(response);
      const payload = Array.isArray(payloadResponse.result)
        ? { versions: payloadResponse.result }
        : (payloadResponse.result ?? payloadResponse);
      const versions = readArray<{
        version?: string;
        build_version?: string;
        repo_name?: string;
        artifact_name?: string;
        created_at?: string;
        updated_at?: string;
        downloads?: number;
        files_count?: number;
        category?: string;
      }>(payload.versions);

      return {
        versions: versions.map((item) => ({
          version: item.version ?? item.build_version,
          repo_name: item.repo_name,
          artifact_name: item.artifact_name,
          created_at: item.created_at,
          updated_at: item.updated_at,
          downloads: item.downloads,
          files_count: item.files_count,
          category: item.category
        })),
        total: payload.total ?? payload.total_count
      };
    },
    async showProjectVersionsCount(input) {
      const query = new URLSearchParams();
      if (input.name) query.set("name", input.name);
      if (input.status) query.set("status", input.status);

      const suffix = query.size ? `?${query.toString()}` : "";
      const { response, payload } = readStoragePayload(
        await _http.get(`/v5/${encodeURIComponent(input.project_id)}/versions/count${suffix}`)
      );
      const count = readCount(payload, response);

      return {
        count,
        total: count,
        raw: payload
      };
    },
    async getFileTree(input) {
      const query = new URLSearchParams({
        path: input.path ?? "/"
      });

      const response = unwrapArtifactPayload((await _http.get(
        `/cloudartifact/v5/${encodeURIComponent(input.tenant_id)}/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.repo_name)}/file-tree?${query.toString()}`
      )) as {
        root_path?: string;
        rootPath?: string;
        nodes?: unknown;
        result?: {
          root_path?: string;
          rootPath?: string;
          nodes?: unknown;
        };
      });
      const payload = response.result ?? response;

      return {
        root_path: payload.root_path ?? payload.rootPath ?? "/",
        nodes: readArray<{
          path?: string;
          name?: string;
          type?: string;
        }>(payload.nodes)
      };
    },
    async listLatestVersionFiles(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      const response = unwrapArtifactPayload((await _http.get(
        `/devreposerver/v5/${encodeURIComponent(input.project_id)}/files/version?${query.toString()}`
      )) as {
        files?: unknown;
        result?: {
          files?: unknown;
          total?: number;
          total_count?: number;
        };
        total?: number;
        total_count?: number;
      });
      const payload = Array.isArray(response.result) ? { files: response.result } : (response.result ?? response);
      const files = readArray<{
        path?: string;
        name?: string;
        version?: string;
        repo_name?: string;
        size?: string | number;
        modified_at?: string;
      }>(payload.files);

      return {
        files: files.map((file) => ({
          path: file.path,
          name: file.name,
          version: file.version,
          repo_name: file.repo_name,
          size: file.size === undefined ? undefined : String(file.size),
          modified_at: file.modified_at
        })),
        total: payload.total ?? payload.total_count
      };
    },
    async showLatestVersionFilesCount(input) {
      const query = new URLSearchParams();
      if (input.name) query.set("name", input.name);
      if (input.status) query.set("status", input.status);

      const suffix = query.size ? `?${query.toString()}` : "";
      const { response, payload } = readStoragePayload(
        await _http.get(`/devreposerver/v5/${encodeURIComponent(input.project_id)}/files/version/count${suffix}`)
      );
      const count = readCount(payload, response);

      return {
        count,
        total: count,
        raw: payload
      };
    },
    async showPackageDataDetail(input) {
      const query = new URLSearchParams();
      if (input.project_id) query.set("project_id", input.project_id);
      if (input.status) query.set("status", input.status);

      const suffix = query.size ? `?${query.toString()}` : "";
      const { payload } = readStoragePayload(await _http.get(`/devreposerver/v5/data/package${suffix}`));

      return { raw: payload };
    },
    async showPackageInfo(input) {
      const query = new URLSearchParams();
      if (input.project_id) query.set("project_id", input.project_id);
      if (input.status) query.set("status", input.status);

      const suffix = query.size ? `?${query.toString()}` : "";
      const { payload } = readStoragePayload(await _http.get(`/devreposerver/v5/data/package/info${suffix}`));

      return { raw: payload };
    },
    async showDomainReleaseRepoStorage(input) {
      const query = new URLSearchParams();
      if (input.status) query.set("status", input.status);
      if (input.package_type) query.set("package_type", input.package_type);

      const suffix = query.size ? `?${query.toString()}` : "";
      const { payload } = readStoragePayload(await _http.get(`/devreposerver/v5/storage${suffix}`));

      return {
        used:
          readOptionalString(payload.used) ??
          readOptionalString(payload.used_storage) ??
          readOptionalString(payload.used_size),
        total:
          readOptionalString(payload.total) ??
          readOptionalString(payload.total_storage) ??
          readOptionalString(payload.capacity),
        raw: payload
      };
    },
    async showProjectStorageInfo(input) {
      const query = new URLSearchParams();
      if (input.status) query.set("status", input.status);

      const suffix = query.size ? `?${query.toString()}` : "";
      const { payload } = readStoragePayload(
        await _http.get(`/devreposerver/v5/${encodeURIComponent(input.project_id)}/storage${suffix}`)
      );

      return {
        used:
          readOptionalString(payload.used) ??
          readOptionalString(payload.used_storage) ??
          readOptionalString(payload.used_size),
        total:
          readOptionalString(payload.total) ??
          readOptionalString(payload.total_storage) ??
          readOptionalString(payload.capacity),
        file_count:
          readOptionalNumber(payload.file_count) ??
          readOptionalNumber(payload.files_count) ??
          readOptionalNumber(payload.count),
        raw: payload
      };
    },
    async showCapacityNoticeSettings() {
      const { payload } = readStoragePayload(await _http.get("/devreposerver/v5/capacity-notice/settings"));

      return { raw: payload };
    },
    async showAutoDeleteJobSettings(input) {
      const { payload } = readStoragePayload(
        await _http.get(`/devreposerver/v5/release/${encodeURIComponent(input.project_id)}/auto-deletion/settings`)
      );

      return {
        project_id: input.project_id,
        raw: payload
      };
    },
    async showUserPrivileges(input) {
      const { payload } = readStoragePayload(
        await _http.get(`/v5/user/${encodeURIComponent(input.project_id)}/privileges`)
      );

      return {
        project_id: input.project_id,
        raw: payload
      };
    },
    async showUserPermissions(input) {
      const query = new URLSearchParams({ project_id: input.project_id });
      const { payload } = readStoragePayload(
        await _http.get(`/devreposerver/v5/user/permissions?${query.toString()}`)
      );

      return {
        project_id: input.project_id,
        raw: payload
      };
    },
    async getRepositoryUserInfo() {
      const { payload } = readStoragePayload(await _http.get("/cloudartifact/v5/repositories/user/info"));

      return {
        username: readOptionalString(payload.username),
        raw: payload
      };
    },
    async listRepositoryUsers(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.user_name) query.set("user_name", input.user_name);

      const { response, payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/repositories/users?${query.toString()}`)
      );
      const users = readArray<Record<string, unknown>>(
        payload.data ??
          payload.users ??
          payload.user_list ??
          payload.value ??
          payload.items ??
          payload.list ??
          response.result ??
          (Array.isArray(payload) ? payload : [])
      );

      return {
        users,
        total:
          readOptionalNumber(payload.total_records) ??
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total_records) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count) ??
          users.length
      };
    },
    async listProjectRolePermissions(input) {
      const query = new URLSearchParams({ project_id: input.project_id });
      const { response, payload } = readStoragePayload(
        await _http.get(`/devreposerver/v5/project-role/permissions?${query.toString()}`)
      );
      const permissions = readArray<Record<string, unknown>>(
        payload.permissions ??
          payload.roles ??
          payload.role_permissions ??
          payload.value ??
          payload.items ??
          payload.list ??
          response.result ??
          (Array.isArray(payload) ? payload : [])
      );

      return {
        permissions,
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count) ??
          permissions.length
      };
    },
    async listChildProxyRepositories(input) {
      const query = new URLSearchParams({ repo_id: input.repo_id });
      if (input.type) query.set("type", input.type);
      const { response, payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/repositories/proxy?${query.toString()}`)
      );
      const repositories = readArray<Record<string, unknown>>(
        payload.repositories ??
          payload.value ??
          payload.items ??
          payload.list ??
          response.result ??
          (Array.isArray(payload) ? payload : [])
      );

      return {
        repositories,
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count) ??
          repositories.length
      };
    },
    async listStorageStatistics(input) {
      const { response, payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/${encodeURIComponent(input.tenant_id)}/${encodeURIComponent(input.project_id)}/storageinfo/statistic`)
      );
      const statistics = readArray<Record<string, unknown>>(
        payload.statistics ??
          payload.storage_statistics ??
          payload.statistic ??
          payload.value ??
          payload.items ??
          payload.list ??
          response.result ??
          (Array.isArray(payload) ? payload : [])
      );

      return {
        statistics,
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count) ??
          statistics.length
      };
    },
    async listAttentions(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.project_id) query.set("project_id", input.project_id);
      const { response, payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/attention/artifacts?${query.toString()}`)
      );
      const attentions = readArray<Record<string, unknown>>(
        payload.attentions ??
          payload.artifacts ??
          payload.value ??
          payload.items ??
          payload.list ??
          response.result ??
          (Array.isArray(payload) ? payload : [])
      );

      return {
        attentions,
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count) ??
          attentions.length
      };
    },
    async createAttention(input) {
      const response = unwrapArtifactPayload(await _http.post("/cloudartifact/v5/attention", {
        format: input.format,
        attention: input.attention,
        ids: input.ids
      })) as Record<string, unknown>;
      const payload = readEnvelope(response.result) ?? response;

      return {
        status: readOptionalString(response.status) ?? readOptionalString(payload.status),
        trace_id: readOptionalString(response.trace_id) ?? readOptionalString(payload.trace_id),
        raw: sanitizeArtifactRecord(payload)
      };
    },
    async listSecGuardTasks(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.date) query.set("date", input.date);
      const { response, payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/sec-guard/task/list?${query.toString()}`)
      );
      const tasks = readArray<Record<string, unknown>>(
        payload.tasks ??
          payload.task_list ??
          payload.sec_guard_tasks ??
          payload.value ??
          payload.items ??
          payload.list ??
          response.result ??
          (Array.isArray(payload) ? payload : [])
      );

      return {
        tasks,
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count) ??
          tasks.length
      };
    },
    async showOpenSourceEnabled() {
      const { payload } = readStoragePayload(await _http.get("/cloudartifact/v5/opensource/enabled"));
      const envelope = readEnvelope(payload);

      return {
        value: envelope ? envelope.value ?? envelope.enabled ?? envelope.result : payload,
        raw: payload
      };
    },
    async showAudit(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        tenant_id: input.tenant_id,
        project_id: input.project_id,
        module: input.module,
        repo: input.repo,
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.user_id) query.set("user_id", input.user_id);
      if (input.instance_id) query.set("instance_id", input.instance_id);
      if (input.format) query.set("format", input.format);
      if (input.resource_id) query.set("resource_id", input.resource_id);

      const response = unwrapArtifactPayload((await _http.get(`/cloudartifact/v5/audit?${query.toString()}`)) as {
        records?: unknown;
        total?: number;
        total_count?: number;
        result?: {
          records?: unknown;
          total?: number;
          total_count?: number;
        };
      });

      const payload = response.result ?? response;
      const records = readArray<{
        id?: string;
        operation?: string;
        user_id?: string;
        user_name?: string;
        op_time?: string;
        resource_path?: string;
      }>(payload.records);

      return {
        records,
        total: payload.total ?? payload.total_count
      };
    },
    async searchArtifacts(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = unwrapArtifactPayload((await _http.post("/cloudartifact/v5/artifacts", {
        artifact_name: input.artifact_name,
        offset,
        limit: input.page_size,
        repo_name: input.repo_name,
        project_id: input.project_id
      })) as {
        artifacts?: unknown;
        total?: number;
        total_count?: number;
        result?: {
          artifacts?: unknown;
          total?: number;
          total_count?: number;
        };
      });

      const payload = response.result ?? response;
      const artifacts = readArray<{
        name?: string;
        relative_path?: string;
        relativePath?: string;
        repo?: string;
        repo_name?: string;
        repoName?: string;
        display_name?: string;
        displayName?: string;
        repo_type?: string;
        repoType?: string;
      }>(payload.artifacts);

      return {
        artifacts: artifacts.map((item) => ({
          name: item.name,
          relative_path: item.relative_path ?? item.relativePath,
          repo: item.repo,
          repo_name: item.repo_name ?? item.repoName,
          display_name: item.display_name ?? item.displayName,
          repo_type: item.repo_type ?? item.repoType
        })),
        total: payload.total ?? payload.total_count
      };
    },
    async searchByChecksum(input) {
      const query = new URLSearchParams({
        checksum: input.checksum,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.format) query.set("format", input.format);
      if (input.in_project !== undefined) query.set("in_project", String(input.in_project));
      if (input.project_id) query.set("project_id", input.project_id);
      const { response, payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/search/checksum?${query.toString()}`)
      );
      const artifacts = readArray<Record<string, unknown>>(
        payload.artifacts ??
          payload.files ??
          payload.value ??
          payload.items ??
          payload.list ??
          response.result ??
          (Array.isArray(payload) ? payload : [])
      );

      return {
        artifacts,
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count) ??
          artifacts.length
      };
    },
    async listMavenProjectRepositories(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });
      if (input.search_name) query.set("search_name", input.search_name);
      if (input.repo_id) query.set("repo_id", input.repo_id);
      const { response, payload } = readStoragePayload(
        await _http.get(`/v5/maven/project/repository?${query.toString()}`)
      );
      const repositories = readArray<Record<string, unknown>>(
        payload.repositories ??
          payload.repos ??
          payload.value ??
          payload.items ??
          payload.list ??
          response.result ??
          (Array.isArray(payload) ? payload : [])
      );

      return {
        repositories,
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count) ??
          repositories.length
      };
    },
    async listMavenRepositories(input) {
      const query = new URLSearchParams();
      if (input.project_id) query.set("project_id", input.project_id);
      if (input.default !== undefined) query.set("default", String(input.default));
      if (input.policy) query.set("policy", input.policy);
      if (input.repo_ids?.length) query.set("repo_ids", input.repo_ids.join(","));
      if (input.access) query.set("access", input.access);

      const suffix = query.size ? `?${query.toString()}` : "";
      const { response, payload } = readStoragePayload(await _http.get(`/cloudartifact/v5/maven/list${suffix}`));
      const repositories = sanitizeArtifactRecordArray(readRecordList(payload, response, [
        "repositories",
        "repos",
        "data",
        "items",
        "list"
      ]));

      return {
        repositories,
        total: readTotal(payload, response, repositories.length)
      };
    },
    async listMavenRepositoryList(input) {
      const query = new URLSearchParams();
      if (input.project_id) query.set("project_id", input.project_id);
      if (input.policy) query.set("policy", input.policy);
      if (input.format) query.set("format", input.format);
      if (input.type) query.set("type", input.type);
      if (input.repo_id) query.set("repo_id", input.repo_id);
      if (input.search_name) query.set("search_name", input.search_name);

      const suffix = query.size ? `?${query.toString()}` : "";
      const { response, payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/maven/repository/list${suffix}`)
      );
      const repositories = sanitizeArtifactRecordArray(readRecordList(payload, response, [
        "repositories",
        "repos",
        "data",
        "items",
        "list"
      ]));

      return {
        repositories,
        total: readTotal(payload, response, repositories.length)
      };
    },
    async getRepositoryDetail(input) {
      const query = new URLSearchParams();
      if (input.region) query.set("region", input.region);
      if (input.path) query.set("path", input.path);
      const suffix = query.size ? `?${query.toString()}` : "";
      const { payload } = readStoragePayload(
        await _http.get(
          `/cloudartifact/v5/${encodeURIComponent(input.tenant_id)}/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.repo_id)}/repositories${suffix}`
        )
      );

      return {
        tenant_id: input.tenant_id,
        project_id: input.project_id,
        repo_id: input.repo_id,
        raw: sanitizeArtifactRecord(payload)
      };
    },
    async listProjectReleaseFiles(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        file_name: input.file_name,
        offset: String(offset),
        limit: String(input.page_size)
      });
      const { response, payload } = readStoragePayload(
        await _http.get(`/v2/${encodeURIComponent(input.project_id)}/release/files?${query.toString()}`)
      );
      const files = sanitizeArtifactRecordArray(readRecordList(payload, response, [
        "data",
        "files",
        "items",
        "list"
      ]));

      return {
        files,
        total: readTotal(payload, response, files.length)
      };
    },
    async listReleaseFiles(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        file_name: input.file_name,
        offset: String(offset),
        limit: String(input.page_size)
      });
      const { response, payload } = readStoragePayload(
        await _http.get(`/devreposerver/v2/release/${encodeURIComponent(input.project_id)}/files?${query.toString()}`)
      );
      const files = sanitizeArtifactRecordArray(readRecordList(payload, response, [
        "data",
        "files",
        "items",
        "list"
      ]));

      return {
        files,
        total: readTotal(payload, response, files.length)
      };
    },
    async listProjectUsers(input) {
      const query = new URLSearchParams({
        repo_id: input.repo_id,
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      if (input.scene) query.set("scene", input.scene);
      const { response, payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/projects/${encodeURIComponent(input.project_id)}/users?${query.toString()}`)
      );
      const users = sanitizeArtifactRecordArray(readRecordList(payload, response, [
        "users",
        "data",
        "items",
        "list"
      ]));

      return {
        users,
        total: readTotal(payload, response, users.length)
      };
    },
    async listDomainIpConfigs(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });
      const { response, payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/domain/ipconfig?${query.toString()}`)
      );
      const configs = sanitizeArtifactRecordArray(readRecordList(payload, response, [
        "data",
        "configs",
        "ip_configs",
        "items",
        "list"
      ]));

      return {
        configs,
        total: readTotal(payload, response, configs.length)
      };
    },
    async showRepositoryPrivileges(input) {
      const { payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v5/repositories/${encodeURIComponent(input.project_id)}/${encodeURIComponent(input.repo_id)}/privileges`)
      );

      return {
        project_id: input.project_id,
        repo_id: input.repo_id,
        raw: sanitizeArtifactRecord(payload)
      };
    },
    async showUserPrivilegesV3(input) {
      const { payload } = readStoragePayload(
        await _http.get(`/cloudartifact/v3/user/${encodeURIComponent(input.project_id)}/privileges`)
      );

      return {
        project_id: input.project_id,
        raw: sanitizeArtifactRecord(payload)
      };
    },
    async getRepoFileInfoById(input) {
      const { payload } = readStoragePayload(
        await _http.get(`/devreposerver/v5/files/${encodeURIComponent(input.id)}/info`)
      );

      return sanitizeArtifactRecord(payload) as Record<string, unknown>;
    },
    async getRepoFileInfoByName(input) {
      const query = new URLSearchParams({ file_name: input.file_name });
      const { payload } = readStoragePayload(
        await _http.get(`/devreposerver/v5/files/info?${query.toString()}`)
      );

      return sanitizeArtifactRecord(payload) as Record<string, unknown>;
    },
    async showUserTicket() {
      const { payload } = readStoragePayload(await _http.get("/cloudartifact/v5/ticket"));

      return {
        ticket: readOptionalString(payload.result) ?? readOptionalString(payload.ticket),
        raw: sanitizeArtifactRecord(payload)
      };
    },
    async deleteCompletelyUpdateFileState(input) {
      const response = unwrapArtifactPayload(
        await _http.delete("/devreposerver/v5/files/compeletion", input.ids)
      ) as Record<string, unknown>;
      const payload = readEnvelope(response.result) ?? response;

      return {
        status: readOptionalString(response.status) ?? readOptionalString(payload.status),
        trace_id: readOptionalString(response.trace_id) ?? readOptionalString(payload.trace_id),
        raw: sanitizeArtifactRecord(payload),
        success: readOptionalNumber(payload.success),
        failed: readOptionalNumber(payload.failed),
        success_items: readArray<string>(payload.success_items),
        failed_items: readArray<string>(payload.failed_items),
        reason: readArray<unknown>(payload.reason)
      };
    },
    async deleteFile(input) {
      const query = new URLSearchParams({
        tenant_id: input.tenant_id,
        project_id: input.project_id,
        repo_name: input.repo_name,
        path: input.path,
        format: input.format
      });

      await _http.delete(`/cloudartifact/v5/file-detail?${query.toString()}`);

      return {
        path: input.path,
        deleted: true
      };
    },
    async createRepository(input) {
      const response = unwrapArtifactPayload(await _http.post("/cloudartifact/v5/artifact/", {
        ...(input.params ?? {}),
        format: input.format,
        type: input.type,
        repository_name: input.repository_name,
        includes_pattern: input.includes_pattern,
        project_id: input.project_id,
        description: input.description,
        share_right: input.share_right
      })) as Record<string, unknown>;
      const payload = readEnvelope(response.result) ?? response;

      return {
        status: readOptionalString(response.status) ?? readOptionalString(payload.status),
        trace_id: readOptionalString(response.trace_id) ?? readOptionalString(payload.trace_id),
        raw: payload
      };
    },
    async updateRepository(input) {
      const response = unwrapArtifactPayload(await _http.put("/cloudartifact/v5/artifact/", {
        ...(input.params ?? {}),
        repo_name: input.repo_name,
        format: input.format,
        repository_ids: input.repository_ids,
        includes_pattern: input.includes_pattern,
        description: input.description,
        deployment_policy: input.deployment_policy,
        auto_clean_snapshot: input.auto_clean_snapshot,
        snapshot_alive_days: input.snapshot_alive_days
      })) as Record<string, unknown>;
      const payload = readEnvelope(response.result) ?? response;

      return {
        status: readOptionalString(response.status) ?? readOptionalString(payload.status),
        trace_id: readOptionalString(response.trace_id) ?? readOptionalString(payload.trace_id),
        raw: payload
      };
    },
    async restoreTrashRepositories(input) {
      const response = unwrapArtifactPayload(await _http.put("/cloudartifact/v5/trashes", input.items)) as Record<string, unknown>;
      const payload = readEnvelope(response.result) ?? response;

      return {
        status: readOptionalString(response.status) ?? readOptionalString(payload.status),
        trace_id: readOptionalString(response.trace_id) ?? readOptionalString(payload.trace_id),
        raw: payload
      };
    },
    async deleteTrashRepositories(input) {
      const response = unwrapArtifactPayload(await _http.delete("/cloudartifact/v5/trashes", input.items)) as Record<string, unknown>;
      const payload = readEnvelope(response.result) ?? response;

      return {
        status: readOptionalString(response.status) ?? readOptionalString(payload.status),
        trace_id: readOptionalString(response.trace_id) ?? readOptionalString(payload.trace_id),
        raw: payload
      };
    },
    async getDownloadUrl(input) {
      const query = new URLSearchParams({
        tenant_id: input.tenant_id,
        project_id: input.project_id,
        repo_name: input.repo_name,
        path: input.path,
        format: input.format
      });

      const response = unwrapArtifactPayload((await _http.get(`/cloudartifact/v5/file-detail?${query.toString()}`)) as {
        path?: string;
        name?: string;
        file_name?: string;
        download_url?: string;
        download_uri?: string;
        expires_at?: string;
        expired_at?: string;
        result?: {
          path?: string;
          name?: string;
          file_name?: string;
          download_url?: string;
          download_uri?: string;
          expires_at?: string;
          expired_at?: string;
        };
      });

      const item = response.result ?? response;

      return {
        path: item.path ?? input.path,
        name: item.name ?? item.file_name ?? "",
        download_url: item.download_url ?? item.download_uri,
        expires_at: item.expires_at ?? item.expired_at
      };
    },
    async listRepositories(input) {
      const query = new URLSearchParams({
        page_no: String(input.page),
        page_size: String(input.page_size)
      });

      const qname = input.qname ?? input.keyword;
      if (qname) {
        query.set("qname", qname);
      }
      if (input.type) {
        query.set("type", input.type);
      }
      if (input.format) {
        query.set("format", input.format);
      }
      if (input.format_list?.length) {
        query.set("format_list", input.format_list.join(","));
      }
      if (typeof input.is_recycle_bin !== "undefined") {
        query.set("is_recycle_bin", String(input.is_recycle_bin));
      }

      const response = unwrapArtifactPayload((await _http.get(
        `/cloudartifact/v5/${encodeURIComponent(input.tenant_id)}/${encodeURIComponent(input.project_id)}/repositories?${query.toString()}`
      )) as {
        repositories?: unknown;
        result?: unknown;
        total?: number;
        total_count?: number;
      });
      const payload = readEnvelope(response.result) ?? response;
      const repositories = readArray<{
        id?: string | number;
        repository_id?: string | number;
        name?: string;
        project_id?: string;
        package_type?: string;
        format?: string;
        description?: string;
      }>(payload.repositories);

      return {
        repositories: repositories.map((item) => ({
          id: String(item.id ?? item.repository_id ?? ""),
          name: item.name ?? "",
          project_id: item.project_id,
          format: item.format ?? item.package_type,
          description: item.description
        })),
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count)
      };
    },
    async getRepository(input) {
      const response = unwrapArtifactPayload((await _http.get(
        `/cloudartifact/v5/repositories/${encodeURIComponent(input.repository_id)}`
      )) as {
        id?: string | number;
        repository_id?: string | number;
        name?: string;
        project_id?: string;
        package_type?: string;
        format?: string;
        description?: string;
        result?: {
          id?: string | number;
          repository_id?: string | number;
          name?: string;
          project_id?: string;
          package_type?: string;
          format?: string;
          description?: string;
        };
      });

      const item = response.result ?? response;

      return {
        id: String(item.id ?? item.repository_id ?? input.repository_id),
        name: item.name ?? "",
        project_id: item.project_id,
        format: item.format ?? item.package_type,
        description: item.description
      };
    },
    async listFiles(input) {
      const body: Record<string, string | number> = {
        project_id: input.project_id,
        page_no: input.page,
        page_size: input.page_size
      };
      const searchName = input.search_name ?? input.keyword;
      if (input.parent_id) body.parent_id = input.parent_id;
      if (searchName) body.search_name = searchName;
      if (input.search_type) body.search_type = input.search_type;
      if (input.extension) body.extension = input.extension;
      if (input.order_by) body.order_by = input.order_by;
      if (input.sort) body.sort = input.sort;
      if (input.status) body.status = input.status;
      if (input.category) body.category = input.category;

      const response = unwrapArtifactPayload((await _http.post("/devreposerver/v5/files/list", body)) as {
        files?: unknown;
        result?: unknown;
        total?: number;
        total_count?: number;
        total_records?: number;
      }) as Record<string, unknown>;
      const payload = readEnvelope(response.result) ?? response;
      const files = readArray<{
        id?: string | number;
        file_id?: string | number;
        path?: string;
        full_path?: string;
        repo_file_path?: string;
        name?: string;
        file_name?: string;
        type?: string;
        size?: string | number;
      }>(payload.files ?? payload.data ?? payload.items ?? payload.list);

      return {
        files: files.map((item) => ({
          path:
            item.path ??
            item.full_path ??
            item.repo_file_path ??
            item.name ??
            item.file_name ??
            String(item.file_id ?? item.id ?? ""),
          name: item.name ?? item.file_name ?? "",
          type: item.type,
          size: item.size === undefined ? undefined : String(item.size)
        })),
        total:
          readOptionalNumber(payload.total_records) ??
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total_records) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count)
      };
    },
    async getFile(input) {
      const query = new URLSearchParams({
        tenant_id: input.tenant_id,
        project_id: input.project_id,
        repo_name: input.repo_name,
        path: input.path,
        format: input.format
      });

      const response = unwrapArtifactPayload((await _http.get(`/cloudartifact/v5/file-detail?${query.toString()}`)) as {
        path?: string;
        name?: string;
        file_name?: string;
        download_url?: string;
        download_uri?: string;
        size?: string | number;
        md5?: string;
        result?: {
          path?: string;
          name?: string;
          file_name?: string;
          download_url?: string;
          download_uri?: string;
          size?: string | number;
          md5?: string;
        };
      });

      const item = response.result ?? response;

      return {
        path: item.path ?? input.path,
        name: item.name ?? item.file_name ?? "",
        download_uri: item.download_uri ?? item.download_url,
        size: item.size === undefined ? undefined : String(item.size),
        md5: item.md5
      };
    },
    async listBuildArchives(input) {
      const offset = (input.page - 1) * input.page_size;
      const query = new URLSearchParams({
        offset: String(offset),
        limit: String(input.page_size)
      });

      if (input.keyword) {
        query.set("search", input.keyword);
      }
      if (input.parent_id) {
        query.set("parent_id", input.parent_id);
      }
      if (input.build_id) {
        query.set("build_id", input.build_id);
      }
      if (input.build_no) {
        query.set("build_no", input.build_no);
      }
      if (input.repo_branch) {
        query.set("repo_branch", input.repo_branch);
      }

      const response = unwrapArtifactPayload((await _http.get(
        `/devreposerver/v5/files/archives?${query.toString()}`
      )) as {
        archives?: unknown;
        result?: unknown;
        total?: number;
        total_count?: number;
      });
      const payload = readEnvelope(response.result) ?? response;
      const archives = readRecordList(readEnvelope(payload) ?? {}, readEnvelope(response) ?? {}, [
        "archives",
        "data",
        "files",
        "items",
        "list"
      ]) as Array<{
        id?: string | number;
        archive_id?: string | number;
        name?: string;
        file_name?: string;
        size?: string | number;
        download_url?: string;
        md5?: string;
      }>;

      return {
        archives: archives.map((item) => ({
          id: String(item.id ?? item.archive_id ?? ""),
          name: item.name ?? item.file_name ?? "",
          size: item.size === undefined ? undefined : String(item.size),
          download_url: item.download_url,
          md5: item.md5
        })),
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
          readOptionalNumber(response.total) ??
          readOptionalNumber(response.total_count)
      };
    }
  };
}
