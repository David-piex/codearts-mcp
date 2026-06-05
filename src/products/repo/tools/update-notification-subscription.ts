import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoNotificationSubscription } from "../client.js";
import { repoUpdateNotificationSubscriptionInput } from "../schemas.js";
import {
  mapNotificationSubscription,
  previewNotificationSubscriptionMutation
} from "./repository-settings-result.js";

type RepoUpdateNotificationSubscriptionClient = {
  updateNotificationSubscription: (input: {
    repository_id: string;
    enabled?: boolean;
    config_source?: string;
    waring_repo_usage_rate?: number;
    webhook_config?: {
      url?: string;
      token?: string;
      mention_users?: string;
      mention_phone?: string;
    };
    subscript_events?: Array<{
      resource_type: string;
      action: string;
      enabled: boolean;
      role_ids?: string[];
      role_names?: string[];
    }>;
  }) => Promise<RepoNotificationSubscription>;
};

export function createRepoUpdateNotificationSubscriptionHandler(
  client: RepoUpdateNotificationSubscriptionClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateNotificationSubscriptionInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update repository notification subscription",
        previewNotificationSubscriptionMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateNotificationSubscription(parsed);
    const mapped = mapNotificationSubscription(response);
    const result = {
      ...mapped,
      summary: "Updated repository notification subscription"
    };

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
