import type { RepoProjectGeneralPolicy } from "../client.js";
import { repoShowRepositoryGeneralPolicyInput } from "../schemas.js";
import { mapProjectGeneralPolicy } from "./project-settings-result.js";

type RepoShowRepositoryGeneralPolicyClient = {
  showRepositoryGeneralPolicy: (input: { repository_id: string }) => Promise<RepoProjectGeneralPolicy>;
};

export function createRepoShowRepositoryGeneralPolicyHandler(client: RepoShowRepositoryGeneralPolicyClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryGeneralPolicyInput.parse(input);
    const response = await client.showRepositoryGeneralPolicy(parsed);
    const result = mapProjectGeneralPolicy("Fetched repository general policy", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
