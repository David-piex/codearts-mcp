import type { RepoReviewSetting } from "../client.js";
import { repoShowProjectReviewSettingsInput } from "../schemas.js";
import { mapReviewSetting } from "./repository-browse-result.js";

type RepoShowProjectReviewSettingsClient = {
  showProjectReviewSettings: (input: { project_id: string }) => Promise<RepoReviewSetting>;
};

export function createRepoShowProjectReviewSettingsHandler(client: RepoShowProjectReviewSettingsClient) {
  return async (input: unknown) => {
    const parsed = repoShowProjectReviewSettingsInput.parse(input);
    const response = await client.showProjectReviewSettings(parsed);
    const result = mapReviewSetting(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
