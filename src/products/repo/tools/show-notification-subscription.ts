import type { RepoNotificationSubscription } from "../client.js";
import { repoShowNotificationSubscriptionInput } from "../schemas.js";
import { mapNotificationSubscription } from "./repository-settings-result.js";

type RepoShowNotificationSubscriptionClient = {
  showNotificationSubscription: (input: {
    repository_id: string;
    type: "internal_message" | "email" | "qyweixin" | "feishu" | "dingding";
  }) => Promise<RepoNotificationSubscription>;
};

export function createRepoShowNotificationSubscriptionHandler(client: RepoShowNotificationSubscriptionClient) {
  return async (input: unknown) => {
    const parsed = repoShowNotificationSubscriptionInput.parse(input);
    const response = await client.showNotificationSubscription(parsed);
    const result = mapNotificationSubscription(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
