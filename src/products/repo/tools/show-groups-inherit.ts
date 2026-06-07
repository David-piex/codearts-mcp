import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoGroupInheritSetting } from "../client.js";
import { repoShowGroupsInheritInput } from "../schemas.js";

type Client = {
  showGroupsInherit: (input: {
    group_id: string;
    setting_type: string;
  }) => Promise<RepoGroupInheritSetting>;
};

export function createRepoShowGroupsInheritHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoShowGroupsInheritInput.parse(input);
    const response = await client.showGroupsInherit(parsed);
    const result = asItemResult("Fetched groups inherit", {
      groupId: response.group_id !== undefined ? String(response.group_id) : parsed.group_id,
      sourceSetting: response.source_setting,
      projectId: response.project_id,
      upwardInheritEditable: response.upward_inherit_editable,
      settingType: parsed.setting_type
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
