import type { RepoReviewSetting } from "../client.js";
import { repoShowGroupReviewSettingsInput } from "../schemas.js";
import { mapReviewSetting } from "./repository-browse-result.js";

type RepoShowGroupReviewSettingsClient = {
  showGroupReviewSettings: (input: { group_id: string }) => Promise<RepoReviewSetting>;
};

export function createRepoShowGroupReviewSettingsHandler(client: RepoShowGroupReviewSettingsClient) {
  return async (input: unknown) => {
    const parsed = repoShowGroupReviewSettingsInput.parse(input);
    const response = await client.showGroupReviewSettings(parsed);
    const result = mapReviewSetting(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
