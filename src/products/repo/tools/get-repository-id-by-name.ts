import { asItemResult } from "../../../contracts/tool-result.js";
import { repoGetRepositoryIdByNameInput } from "../schemas.js";

export function mapRepositoryIdByNameResult(input: {
  repository_id?: number | string;
  status?: string;
  error?: unknown;
  group_name: string;
  repository_name: string;
}) {
  return asItemResult(`Resolved repository id for ${input.group_name}/${input.repository_name}`, {
    groupName: input.group_name,
    repositoryName: input.repository_name,
    repositoryId: input.repository_id !== undefined ? String(input.repository_id) : undefined,
    status: input.status,
    error: input.error
  });
}

type RepoGetRepositoryIdByNameClient = {
  getRepositoryIdByName: (input: {
    group_name: string;
    repository_name: string;
  }) => Promise<{
    repository_id?: number | string;
    status?: string;
    error?: unknown;
  }>;
};

export function createRepoGetRepositoryIdByNameHandler(client: RepoGetRepositoryIdByNameClient) {
  return async (input: unknown) => {
    const parsed = repoGetRepositoryIdByNameInput.parse(input);
    const response = await client.getRepositoryIdByName(parsed);
    const result = mapRepositoryIdByNameResult({
      ...response,
      group_name: parsed.group_name,
      repository_name: parsed.repository_name
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
