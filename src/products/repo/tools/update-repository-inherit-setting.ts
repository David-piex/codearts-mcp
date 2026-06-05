import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProjectSettingsInheritCfg } from "../client.js";
import { repoUpdateRepositoryInheritSettingInput } from "../schemas.js";
import {
  mapProjectSettingsInheritCfgList,
  previewProjectSettingsInheritCfgMutation
} from "./project-settings-result.js";

type RepoUpdateRepositoryInheritSettingClient = {
  updateRepositoryInheritSetting: (input: {
    repository_id: string;
    data: RepoProjectSettingsInheritCfg[];
  }) => Promise<{
    settings: RepoProjectSettingsInheritCfg[];
    total?: number;
  }>;
};

export function createRepoUpdateRepositoryInheritSettingHandler(
  client: RepoUpdateRepositoryInheritSettingClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryInheritSettingInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: update repository inheritance settings", {
        ...previewProjectSettingsInheritCfgMutation({
          project_id: parsed.repository_id,
          data: parsed.data,
          dry_run: parsed.dry_run
        }),
        repositoryId: parsed.repository_id
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRepositoryInheritSetting(parsed);
    const result = mapProjectSettingsInheritCfgList(
      `${response.settings.length} repository inheritance settings updated`,
      response.settings,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
