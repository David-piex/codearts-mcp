import { asItemResult } from "../../../contracts/tool-result.js";
import { repoImportRepositoryInput } from "../schemas.js";

const sourceHostMatchers: Record<string, (host: string) => boolean> = {
  gitee: (host) => host === "gitee.com" || host.endsWith(".gitee.com"),
  gitlab: (host) => host === "gitlab.com" || host.endsWith(".gitlab.com"),
  github: (host) => host === "github.com" || host.endsWith(".github.com"),
  coding: (host) => host === "coding.net" || host.endsWith(".coding.net"),
  bitbucket: (host) => host === "bitbucket.org" || host.endsWith(".bitbucket.org"),
  codeup: (host) =>
    host === "codeup.aliyun.com" ||
    host.endsWith(".codeup.aliyun.com") ||
    host === "code.aliyun.com" ||
    host.endsWith(".code.aliyun.com")
};

type ImportRepositoryInput = {
  project_uuid: string;
  name: string;
  source_type: string;
  source_url: string;
  source_repo_id?: string;
  source_full_name?: string;
  source_visibility?: string;
  source_username?: string;
  source_token?: string;
  import_type: string;
  fetch_refs_type: "all" | "default";
  endpoint_uuid?: string;
  codecheck: number;
  group_id?: string | number | null;
  mirror_repository: number;
  security_level?: string;
  import_members?: number;
  visibility_level?: number;
  description?: string;
  caller?: string;
  dry_run: boolean;
};

type CreatedRepositoryResponse = {
  repository_uuid?: string;
  project_uuid?: string;
  status?: string;
};

export function encodeRepositoryImportUrl(sourceUrl: string) {
  return Buffer.from(sourceUrl, "utf8").toString("base64");
}

export function buildRepositoryImportSourceUrl(input: {
  source_url: string;
  source_username?: string;
  source_token?: string;
}) {
  const url = new URL(input.source_url);

  if (input.source_username) {
    url.username = input.source_username;
  }

  if (input.source_token) {
    url.password = input.source_token;
  }

  return url.toString();
}

export function redactRepositorySourceUrl(sourceUrl: string) {
  const url = new URL(sourceUrl);

  url.username = url.username ? "***" : "";
  url.password = url.password ? "***" : "";

  return url.toString();
}

export function validateRepositoryImportSource(input: {
  source_type: string;
  source_url: string;
}) {
  const host = new URL(input.source_url).hostname.toLowerCase();
  const matcher = sourceHostMatchers[input.source_type];

  if (matcher && !matcher(host)) {
    throw new Error(`source_url host ${host} does not match source_type ${input.source_type}`);
  }
}

export function previewImportRepository(input: ImportRepositoryInput) {
  return asItemResult(`Dry run: import ${input.source_type} repository into ${input.name}`, {
    projectUuid: input.project_uuid,
    name: input.name,
    sourceType: input.source_type,
    sourceUrl: redactRepositorySourceUrl(input.source_url),
    sourceRepoId: input.source_repo_id,
    sourceFullName: input.source_full_name,
    sourceVisibility: input.source_visibility,
    sourceUsername: input.source_username,
    hasSourceToken: Boolean(input.source_token),
    importType: input.import_type,
    fetchRefsType: input.fetch_refs_type,
    endpointUuid: input.endpoint_uuid,
    codecheck: input.codecheck,
    groupId: input.group_id,
    mirrorRepository: input.mirror_repository,
    securityLevel: input.security_level,
    importMembers: input.import_members,
    visibilityLevel: input.visibility_level,
    description: input.description,
    caller: input.caller,
    importUrlEncoding: "base64",
    executed: !input.dry_run
  });
}

export function mapImportedRepository(
  input: CreatedRepositoryResponse,
  request: {
    project_uuid: string;
    name: string;
    source_type: string;
    source_url: string;
    source_repo_id?: string;
    source_full_name?: string;
    source_visibility?: string;
    source_username?: string;
    source_token?: string;
    import_type: string;
    fetch_refs_type: "all" | "default";
    endpoint_uuid?: string;
    codecheck: number;
    group_id?: string | number | null;
    mirror_repository: number;
    security_level?: string;
  }
) {
  return asItemResult(`Started import for ${request.source_type} repository ${request.name}`, {
    id: input.repository_uuid,
    repositoryUuid: input.repository_uuid,
    projectUuid: input.project_uuid ?? request.project_uuid,
    status: input.status,
    name: request.name,
    sourceType: request.source_type,
    sourceUrl: redactRepositorySourceUrl(request.source_url),
    sourceRepoId: request.source_repo_id,
    sourceFullName: request.source_full_name,
    sourceVisibility: request.source_visibility,
    sourceUsername: request.source_username,
    hasSourceToken: Boolean(request.source_token),
    importType: request.import_type,
    fetchRefsType: request.fetch_refs_type,
    endpointUuid: request.endpoint_uuid,
    codecheck: request.codecheck,
    groupId: request.group_id,
    mirrorRepository: request.mirror_repository,
    securityLevel: request.security_level,
    executed: true
  });
}

type RepoImportRepositoryClient = {
  importRepository: (input: {
    project_uuid: string;
    import_type: string;
    codecheck: number;
    fetch_refs_type: "all" | "default";
    endpoint_uuid?: string;
    source_repo_id?: string;
    source_url: string;
    source_type: string;
    source_full_name?: string;
    target_repo_name: string;
    visibility_level?: number;
    security_level?: string;
    group_id?: string | number | null;
    mirror_repository: number;
    source_visibility?: string;
  }) => Promise<CreatedRepositoryResponse>;
};

export function createRepoImportRepositoryHandler(client: RepoImportRepositoryClient) {
  return async (input: unknown) => {
    const parsed = repoImportRepositoryInput.parse(input);

    validateRepositoryImportSource(parsed);

    if (parsed.dry_run) {
      const result = previewImportRepository(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.importRepository({
      project_uuid: parsed.project_uuid,
      import_type: parsed.import_type,
      codecheck: parsed.codecheck,
      fetch_refs_type: parsed.fetch_refs_type,
      endpoint_uuid: parsed.endpoint_uuid,
      source_repo_id: parsed.source_repo_id,
      source_url: buildRepositoryImportSourceUrl(parsed),
      source_type: parsed.source_type,
      source_full_name: parsed.source_full_name,
      target_repo_name: parsed.name,
      visibility_level: parsed.visibility_level,
      security_level: parsed.security_level,
      group_id: parsed.group_id,
      mirror_repository: parsed.mirror_repository,
      source_visibility: parsed.source_visibility
    });
    const result = mapImportedRepository(response, parsed);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
