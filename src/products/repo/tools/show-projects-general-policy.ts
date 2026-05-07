import type { RepoProjectGeneralPolicy } from "../client.js";
import { repoShowProjectsGeneralPolicyInput } from "../schemas.js";
import { mapProjectGeneralPolicy } from "./project-settings-result.js";

type RepoShowProjectsGeneralPolicyClient = {
  showProjectsGeneralPolicy: (input: {
    project_id: string;
  }) => Promise<RepoProjectGeneralPolicy>;
};

export function createRepoShowProjectsGeneralPolicyHandler(
  client: RepoShowProjectsGeneralPolicyClient
) {
  return async (input: unknown) => {
    const parsed = repoShowProjectsGeneralPolicyInput.parse(input);
    const response = await client.showProjectsGeneralPolicy(parsed);
    const result = mapProjectGeneralPolicy("Fetched projects general policy", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
