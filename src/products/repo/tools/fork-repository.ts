import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoForkRepository } from "../client.js";
import { repoForkRepositoryInput } from "../schemas.js";

export function previewForkRepository(input: {
  project_uuid?: string;
  project_name: string;
  repo_name: string;
  template_id: string;
  import_members?: number;
  type?: string;
  visibility_level?: number;
  external_project_info?: {
    external_key_message?: string;
    external_service?: string;
  };
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: fork repository ${input.repo_name}`, {
    projectUuid: input.project_uuid,
    projectName: input.project_name,
    repoName: input.repo_name,
    templateId: input.template_id,
    importMembers: input.import_members,
    type: input.type,
    visibilityLevel: input.visibility_level,
    externalProjectInfo: input.external_project_info,
    executed: !input.dry_run
  });
}

export function mapForkedRepository(
  input: RepoForkRepository & {
    repository_uuid?: string;
    project_uuid?: string;
  },
  request: {
    project_uuid?: string;
    project_name: string;
    repo_name: string;
  }
) {
  const repositoryUuid = input.repository_uuid;

  return asItemResult(`Forked repository ${request.repo_name}`, {
    id:
      repositoryUuid
      ?? (input.id !== undefined ? String(input.id) : undefined),
    repositoryUuid,
    projectUuid: input.project_uuid ?? request.project_uuid,
    projectName: input.product_name ?? request.project_name,
    name: input.name ?? request.repo_name,
    path: input.path,
    namespace: input.namespace,
    pathWithNamespace: input.path_with_namespace,
    visibility: input.visibility,
    archived: input.archived,
    createdAt: input.created_at,
    updatedAt: input.updated_at,
    executed: true
  });
}

type RepoForkRepositoryClient = {
  forkRepository: (input: {
    project_uuid?: string;
    project_name: string;
    repo_name: string;
    template_id: string;
    import_members?: number;
    type?: string;
    visibility_level?: number;
    external_project_info?: {
      external_key_message?: string;
      external_service?: string;
    };
  }) => Promise<RepoForkRepository & {
    repository_uuid?: string;
    project_uuid?: string;
  }>;
};

export function createRepoForkRepositoryHandler(client: RepoForkRepositoryClient) {
  return async (input: unknown) => {
    const parsed = repoForkRepositoryInput.parse(input);

    if (parsed.dry_run) {
      const result = previewForkRepository(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.forkRepository(request);
    const result = mapForkedRepository(response, parsed);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
