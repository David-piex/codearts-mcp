import type { RepoProjectGeneralPolicy } from "../client.js";
import { repoShowProjectGeneralPolicyInput } from "../schemas.js";
import { mapProjectGeneralPolicy } from "./project-settings-result.js";

type RepoShowProjectGeneralPolicyClient = {
  showProjectGeneralPolicy: (input: {
    project_id: string;
  }) => Promise<RepoProjectGeneralPolicy>;
};

export function createRepoShowProjectGeneralPolicyHandler(
  client: RepoShowProjectGeneralPolicyClient
) {
  return async (input: unknown) => {
    const parsed = repoShowProjectGeneralPolicyInput.parse(input);
    const response = await client.showProjectGeneralPolicy(parsed);
    const result = mapProjectGeneralPolicy("Fetched project general policy", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
