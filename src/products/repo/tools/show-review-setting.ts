import type { RepoReviewSetting } from "../client.js";
import { repoShowReviewSettingInput } from "../schemas.js";
import { mapReviewSetting } from "./repository-browse-result.js";

type RepoShowReviewSettingClient = {
  showReviewSetting: (input: {
    repository_id: string;
    with_default_review_categories?: boolean;
  }) => Promise<RepoReviewSetting>;
};

export function createRepoShowReviewSettingHandler(client: RepoShowReviewSettingClient) {
  return async (input: unknown) => {
    const parsed = repoShowReviewSettingInput.parse(input);
    const response = await client.showReviewSetting(parsed);
    const result = mapReviewSetting(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
