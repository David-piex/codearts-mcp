import type { RepoNotificationSubscriptionsStatus } from "../client.js";
import { repoShowNotificationSubscriptionsStatusInput } from "../schemas.js";
import { mapNotificationSubscriptionsStatus } from "./repository-settings-result.js";

type RepoShowNotificationSubscriptionsStatusClient = {
  showNotificationSubscriptionsStatus: (input: { repository_id: string }) => Promise<RepoNotificationSubscriptionsStatus>;
};

export function createRepoShowNotificationSubscriptionsStatusHandler(
  client: RepoShowNotificationSubscriptionsStatusClient
) {
  return async (input: unknown) => {
    const parsed = repoShowNotificationSubscriptionsStatusInput.parse(input);
    const response = await client.showNotificationSubscriptionsStatus(parsed);
    const result = mapNotificationSubscriptionsStatus(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
