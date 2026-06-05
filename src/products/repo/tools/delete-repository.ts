import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteRepositoryInput } from "../schemas.js";

function normalizeDeleteResult(result?: boolean | string) {
  return result === true || result === "true";
}

export function previewDeleteRepository(input: {
  repository_uuid: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: delete repository", {
    repositoryUuid: input.repository_uuid,
    executed: !input.dry_run
  });
}

export function mapDeletedRepository(input: {
  repository_uuid: string;
  result?: boolean | string;
  status?: string;
}) {
  return asItemResult(`Deleted repository ${input.repository_uuid}`, {
    repositoryUuid: input.repository_uuid,
    result: input.result,
    status: input.status,
    deleted: normalizeDeleteResult(input.result),
    executed: true
  });
}

type RepoDeleteRepositoryClient = {
  deleteRepository: (input: {
    repository_uuid: string;
  }) => Promise<{
    result?: boolean | string;
    status?: string;
  }>;
};

export function createRepoDeleteRepositoryHandler(client: RepoDeleteRepositoryClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteRepositoryInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteRepository(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.deleteRepository(request);
    const result = mapDeletedRepository({
      repository_uuid: parsed.repository_uuid,
      result: response.result,
      status: response.status
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
