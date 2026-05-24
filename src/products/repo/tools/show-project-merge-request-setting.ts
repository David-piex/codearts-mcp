import type { RepoMergeRequestSetting } from "../client.js";
import { repoShowProjectMergeRequestSettingInput } from "../schemas.js";
import { mapMergeRequestSetting } from "./merge-request-settings-result.js";

type RepoShowProjectMergeRequestSettingClient = {
  showProjectMergeRequestSetting: (input: { project_id: string }) => Promise<RepoMergeRequestSetting>;
};

export function createRepoShowProjectMergeRequestSettingHandler(client: RepoShowProjectMergeRequestSettingClient) {
  return async (input: unknown) => {
    const parsed = repoShowProjectMergeRequestSettingInput.parse(input);
    const response = await client.showProjectMergeRequestSetting(parsed);
    const result = mapMergeRequestSetting("project", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
