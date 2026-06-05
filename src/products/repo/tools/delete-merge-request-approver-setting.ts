import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteMergeRequestApproverSettingInput } from "../schemas.js";

type RepoDeleteMergeRequestApproverSettingClient = {
  deleteMergeRequestApproverSetting: (input: {
    repository_id: string;
    setting_id: string;
  }) => Promise<{
    repository_id: string;
    setting_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteMergeRequestApproverSettingHandler(client: RepoDeleteMergeRequestApproverSettingClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteMergeRequestApproverSettingInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: delete merge request approver setting", {
        repositoryId: parsed.repository_id,
        settingId: parsed.setting_id,
        deleted: false,
        executed: false
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteMergeRequestApproverSetting(parsed);
    const result = asItemResult("Deleted merge request approver setting", {
      repositoryId: response.repository_id,
      settingId: response.setting_id,
      deleted: response.deleted,
      executed: true
    });
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
