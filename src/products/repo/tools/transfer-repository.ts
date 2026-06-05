import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositorySummary } from "../client.js";
import { repoTransferRepositoryInput } from "../schemas.js";

function mapRepositorySummary(summary: string, input: RepoRepositorySummary) {
  return asItemResult(summary, {
    id: input.id !== undefined ? String(input.id) : undefined,
    name: input.name,
    path: input.path,
    namespace: input.namespace,
    fullName: input.full_name,
    fullPath: input.full_path,
    description: input.description,
    visibility: input.visibility,
    visibilityLevel: input.visibility_level,
    projectId: input.project_id,
    projectName: input.project_name,
    httpUrl: input.http_url_to_repo ?? input.http_url,
    sshUrl: input.ssh_url_to_repo ?? input.ssh_url,
    archived: input.archived
  });
}

function previewTransferRepository(input: {
  repository_id: string;
  namespace: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: transfer repository", {
    repositoryId: input.repository_id,
    namespace: input.namespace,
    executed: !input.dry_run
  });
}

type Client = {
  transferRepository: (input: {
    repository_id: string;
    namespace: string;
  }) => Promise<RepoRepositorySummary>;
};

export function createRepoTransferRepositoryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoTransferRepositoryInput.parse(input);

    if (parsed.dry_run) {
      const result = previewTransferRepository(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.transferRepository(request);
    const result = mapRepositorySummary(`Transferred repository ${parsed.repository_id}`, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
