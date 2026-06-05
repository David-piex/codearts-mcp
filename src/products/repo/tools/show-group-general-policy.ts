import type { RepoProjectGeneralPolicy } from "../client.js";
import { repoShowGroupGeneralPolicyInput } from "../schemas.js";
import { mapProjectGeneralPolicy } from "./project-settings-result.js";

type RepoShowGroupGeneralPolicyClient = {
  showGroupGeneralPolicy: (input: {
    group_id: string;
  }) => Promise<RepoProjectGeneralPolicy>;
};

export function createRepoShowGroupGeneralPolicyHandler(
  client: RepoShowGroupGeneralPolicyClient
) {
  return async (input: unknown) => {
    const parsed = repoShowGroupGeneralPolicyInput.parse(input);
    const response = await client.showGroupGeneralPolicy(parsed);
    const result = mapProjectGeneralPolicy("Fetched group general policy", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
