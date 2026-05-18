import type { RepoProjectSettingsInheritCfg } from "../client.js";
import { repoShowRepositoryInheritSettingInput } from "../schemas.js";
import { mapProjectSettingsInheritCfgList } from "./project-settings-result.js";

type RepoShowRepositoryInheritSettingClient = {
  showRepositoryInheritSetting: (input: { repository_id: string }) => Promise<{
    settings: RepoProjectSettingsInheritCfg[];
    total?: number;
  }>;
};

export function createRepoShowRepositoryInheritSettingHandler(client: RepoShowRepositoryInheritSettingClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryInheritSettingInput.parse(input);
    const response = await client.showRepositoryInheritSetting(parsed);
    const result = mapProjectSettingsInheritCfgList(
      `${response.settings.length} repository inherit settings found`,
      response.settings,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
