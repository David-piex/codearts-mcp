import type { RepoReviewSetting } from "../client.js";
import { repoUpdateGroupReviewSettingsInput } from "../schemas.js";
import {
  mapReviewSettingResult,
  previewReviewSettingMutation
} from "./repository-browse-result.js";

type Client = {
  updateGroupReviewSettings: (input: {
    group_id: string;
    categories_and_modules_enabled?: boolean;
    review_modules?: string[];
    secondary_category_enabled?: boolean;
    review_default_categories?: string[];
    review_customized_categories?: string[];
    is_assignee_id_required?: boolean;
    is_review_categories_required?: boolean;
    is_review_modules_required?: boolean;
  }) => Promise<RepoReviewSetting>;
};

export function createRepoUpdateGroupReviewSettingsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateGroupReviewSettingsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewReviewSettingMutation("Dry run: update group review settings", {
        groupId: parsed.group_id,
        ...parsed
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateGroupReviewSettings(request);
    const result = mapReviewSettingResult("Updated group review settings", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
