import type { RepoProjectMemberSetting } from "../client.js";
import { repoShowProjectMemberSettingInput } from "../schemas.js";
import { mapProjectMemberSetting } from "./project-settings-result.js";

type RepoShowProjectMemberSettingClient = {
  showProjectMemberSetting: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<RepoProjectMemberSetting>;
};

export function createRepoShowProjectMemberSettingHandler(
  client: RepoShowProjectMemberSettingClient
) {
  return async (input: unknown) => {
    const parsed = repoShowProjectMemberSettingInput.parse(input);
    const response = await client.showProjectMemberSetting(parsed);
    const result = mapProjectMemberSetting("Fetched project member setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
