import type { RepoMergeRequestSetting } from "../client.js";
import { repoShowRepositoryMergeRequestSettingInput } from "../schemas.js";
import { mapMergeRequestSetting } from "./merge-request-settings-result.js";

type RepoShowRepositoryMergeRequestSettingClient = {
  showRepositoryMergeRequestSetting: (input: { repository_id: string }) => Promise<RepoMergeRequestSetting>;
};

export function createRepoShowRepositoryMergeRequestSettingHandler(
  client: RepoShowRepositoryMergeRequestSettingClient
) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryMergeRequestSettingInput.parse(input);
    const response = await client.showRepositoryMergeRequestSetting(parsed);
    const result = mapMergeRequestSetting("repository", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
