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
  import_members?: number;
  visibility_level?: number;
  description?: string;
  caller?: string;
  dry_run: boolean;
};

type CreatedRepositoryResponse = {
  repository_uuid: string;
  project_uuid?: string;
};

export function encodeRepositoryImportUrl(sourceUrl: string) {
  return Buffer.from(sourceUrl, "utf8").toString("base64");
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
  request: { project_uuid: string; name: string; source_type: string; source_url: string }
) {
  return asItemResult(`Started import for ${request.source_type} repository ${request.name}`, {
    id: input.repository_uuid,
    repositoryUuid: input.repository_uuid,
    projectUuid: input.project_uuid ?? request.project_uuid,
    name: request.name,
    sourceType: request.source_type,
    sourceUrl: redactRepositorySourceUrl(request.source_url),
    executed: true
  });
}

type RepoImportRepositoryClient = {
  createRepository: (input: {
    project_uuid: string;
    name: string;
    import_members?: number;
    visibility_level?: number;
    import_url?: string;
    description?: string;
    caller?: string;
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

    const response = await client.createRepository({
      project_uuid: parsed.project_uuid,
      name: parsed.name,
      import_members: parsed.import_members,
      visibility_level: parsed.visibility_level,
      import_url: encodeRepositoryImportUrl(parsed.source_url),
      description: parsed.description,
      caller: parsed.caller
    });
    const result = mapImportedRepository(response, parsed);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
