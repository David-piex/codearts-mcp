import type { RepoReviewSetting } from "../client.js";
import { repoUpdateProjectReviewSettingsInput } from "../schemas.js";
import {
  mapReviewSettingResult,
  previewReviewSettingMutation
} from "./repository-browse-result.js";

type Client = {
  updateProjectReviewSettings: (input: {
    project_id: string;
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

export function createRepoUpdateProjectReviewSettingsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateProjectReviewSettingsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewReviewSettingMutation("Dry run: update project review settings", {
        projectId: parsed.project_id,
        ...parsed
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateProjectReviewSettings(request);
    const result = mapReviewSettingResult("Updated project review settings", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
