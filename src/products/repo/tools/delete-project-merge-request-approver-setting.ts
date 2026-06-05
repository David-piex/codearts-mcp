import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteProjectMergeRequestApproverSettingInput } from "../schemas.js";

type RepoDeleteProjectMergeRequestApproverSettingClient = {
  deleteProjectMergeRequestApproverSetting: (input: {
    project_id: string;
    setting_id: string;
  }) => Promise<{
    project_id: string;
    setting_id: string;
    deleted: boolean;
  }>;
};

export function createRepoDeleteProjectMergeRequestApproverSettingHandler(client: RepoDeleteProjectMergeRequestApproverSettingClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteProjectMergeRequestApproverSettingInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: delete project merge request approver setting", {
        projectId: parsed.project_id,
        settingId: parsed.setting_id,
        deleted: false,
        executed: false
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProjectMergeRequestApproverSetting(parsed);
    const result = asItemResult("Deleted project merge request approver setting", {
      projectId: response.project_id,
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
