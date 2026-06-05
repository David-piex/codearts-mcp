import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteGroupMergeRequestApproverSettingInput } from "../schemas.js";

type RepoDeleteGroupMergeRequestApproverSettingClient = {
  deleteGroupMergeRequestApproverSetting: (input: {
    group_id: string;
    setting_id: string;
  }) => Promise<{
    group_id: string;
    setting_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteGroupMergeRequestApproverSettingHandler(client: RepoDeleteGroupMergeRequestApproverSettingClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteGroupMergeRequestApproverSettingInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: delete group merge request approver setting", {
        groupId: parsed.group_id,
        settingId: parsed.setting_id,
        deleted: false,
        executed: false
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteGroupMergeRequestApproverSetting(parsed);
    const result = asItemResult("Deleted group merge request approver setting", {
      groupId: response.group_id,
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
