import type { RepoMergeRequestSetting } from "../client.js";
import { repoShowGroupMergeRequestSettingInput } from "../schemas.js";
import { mapMergeRequestSetting } from "./merge-request-settings-result.js";

type RepoShowGroupMergeRequestSettingClient = {
  showGroupMergeRequestSetting: (input: { group_id: string }) => Promise<RepoMergeRequestSetting>;
};

export function createRepoShowGroupMergeRequestSettingHandler(client: RepoShowGroupMergeRequestSettingClient) {
  return async (input: unknown) => {
    const parsed = repoShowGroupMergeRequestSettingInput.parse(input);
    const response = await client.showGroupMergeRequestSetting(parsed);
    const result = mapMergeRequestSetting("group", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
