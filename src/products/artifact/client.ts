import type { ReturnTypeCreateHttpClient } from "../types.js";

export type ArtifactClient = {
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
    repo_name: string;
    page: number;
    page_size: number;
    keyword?: string;
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

export function createArtifactClient(_http: ReturnTypeCreateHttpClient): ArtifactClient {
  return {
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
      const offset = (input.page - 1) * input.page_size;
      const response = unwrapArtifactPayload((await _http.post("/cloudartifact/v5/file-detail", {
        project_id: input.project_id,
        repo_name: input.repo_name,
        offset,
        limit: input.page_size,
        search: input.keyword
      })) as {
        files?: unknown;
        result?: unknown;
        total?: number;
        total_count?: number;
      });
      const payload = readEnvelope(response.result) ?? response;
      const files = readArray<{
        path?: string;
        name?: string;
        file_name?: string;
        type?: string;
        size?: string | number;
      }>(payload.files);

      return {
        files: files.map((item) => ({
          path: item.path ?? item.name ?? "",
          name: item.name ?? item.file_name ?? "",
          type: item.type,
          size: item.size === undefined ? undefined : String(item.size)
        })),
        total:
          readOptionalNumber(payload.total) ??
          readOptionalNumber(payload.total_count) ??
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

      const response = unwrapArtifactPayload((await _http.get(
        `/cloudartifact/v5/build-archives?${query.toString()}`
      )) as {
        archives?: unknown;
        result?: unknown;
        total?: number;
        total_count?: number;
      });
      const payload = readEnvelope(response.result) ?? response;
      const archives = readArray<{
        id?: string | number;
        archive_id?: string | number;
        name?: string;
        file_name?: string;
        size?: string | number;
        download_url?: string;
        md5?: string;
      }>(payload.archives);

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
