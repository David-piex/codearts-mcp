import type { RepoRepositorySummary } from "../client.js";
import { repoShowGroupInput } from "../schemas.js";
import { mapGroupSummary } from "./group-result.js";

type Client = {
  showGroup: (input: {
    project_id: string;
    group_id: string;
  }) => Promise<RepoRepositorySummary>;
};

export function createRepoShowGroupHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoShowGroupInput.parse(input);
    const response = await client.showGroup(parsed);
    const result = mapGroupSummary(`Fetched group ${response.name ?? parsed.group_id}`, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
