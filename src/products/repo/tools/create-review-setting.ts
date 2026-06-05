import type { RepoReviewSetting } from "../client.js";
import { repoCreateReviewSettingInput } from "../schemas.js";
import {
  mapReviewSettingResult,
  previewReviewSettingMutation
} from "./repository-browse-result.js";

type Client = {
  createReviewSetting: (input: {
    repository_id: string;
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

export function createRepoCreateReviewSettingHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoCreateReviewSettingInput.parse(input);

    if (parsed.dry_run) {
      const result = previewReviewSettingMutation("Dry run: create repository review setting", {
        repositoryId: parsed.repository_id,
        ...parsed
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.createReviewSetting(request);
    const result = mapReviewSettingResult("Created repository review setting", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
