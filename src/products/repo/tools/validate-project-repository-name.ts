import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoValidateProjectRepositoryNameResult } from "../client.js";
import { repoValidateProjectRepositoryNameInput } from "../schemas.js";

export function mapValidatedProjectRepositoryName(input: RepoValidateProjectRepositoryNameResult) {
  return asItemResult("Validated project repository name", {
    projectUuid: input.project_uuid,
    repositoryName: input.repository_name,
    available: input.result,
    status: input.status,
    executed: true
  });
}

type RepoValidateProjectRepositoryNameClient = {
  validateProjectRepositoryName: (input: {
    x_auth_token: string;
    project_uuid: string;
    repository_name: string;
  }) => Promise<RepoValidateProjectRepositoryNameResult>;
};

export function createRepoValidateProjectRepositoryNameHandler(
  client: RepoValidateProjectRepositoryNameClient
) {
  return async (input: unknown) => {
    const parsed = repoValidateProjectRepositoryNameInput.parse(input);
    const response = await client.validateProjectRepositoryName(parsed);
    const result = mapValidatedProjectRepositoryName(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
