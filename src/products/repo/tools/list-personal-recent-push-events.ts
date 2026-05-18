import type { RepoPersonalRecentPushEvent } from "../client.js";
import { repoListPersonalRecentPushEventsInput } from "../schemas.js";
import { mapPersonalRecentPushEventsList } from "./repository-settings-result.js";

type RepoListPersonalRecentPushEventsClient = {
  listPersonalRecentPushEvents: (input: {
    project_id?: string;
    size?: number;
  }) => Promise<{
    events: RepoPersonalRecentPushEvent[];
    total?: number;
  }>;
};

export function createRepoListPersonalRecentPushEventsHandler(client: RepoListPersonalRecentPushEventsClient) {
  return async (input: unknown) => {
    const parsed = repoListPersonalRecentPushEventsInput.parse(input);
    const response = await client.listPersonalRecentPushEvents(parsed);
    const result = mapPersonalRecentPushEventsList(response.events, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
