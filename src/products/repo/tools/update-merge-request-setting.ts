import { repoUpdateMergeRequestSettingInput } from "../schemas.js";
import {
  mapMergeRequestSetting,
  previewApproverSettingsMutation
} from "./merge-request-settings-result.js";

type RepoUpdateMergeRequestSettingClient = {
  updateMergeRequestSetting: (input: {
    repository_id: string;
    settings: Record<string, unknown>;
  }) => Promise<Record<string, unknown>>;
};

export function createRepoUpdateMergeRequestSettingHandler(client: RepoUpdateMergeRequestSettingClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateMergeRequestSettingInput.parse(input);

    if (parsed.dry_run) {
      const result = previewApproverSettingsMutation("Dry run: update merge request setting", {
        repositoryId: parsed.repository_id,
        settings: parsed.settings
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateMergeRequestSetting(parsed);
    const result = mapMergeRequestSetting("repository", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
