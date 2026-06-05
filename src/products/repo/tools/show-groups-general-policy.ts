import type { RepoProjectGeneralPolicy } from "../client.js";
import { repoShowGroupsGeneralPolicyInput } from "../schemas.js";
import { mapProjectGeneralPolicy } from "./project-settings-result.js";

type Client = {
  showGroupsGeneralPolicy: (input: {
    group_id: string;
  }) => Promise<RepoProjectGeneralPolicy>;
};

export function createRepoShowGroupsGeneralPolicyHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoShowGroupsGeneralPolicyInput.parse(input);
    const response = await client.showGroupsGeneralPolicy(parsed);
    const result = mapProjectGeneralPolicy("Fetched groups general policy", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
