import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoProjectSettingsInheritCfg } from "../client.js";
import { repoUpdateProjectSettingsInheritCfgInput } from "../schemas.js";
import {
  mapProjectSettingsInheritCfgList,
  previewProjectSettingsInheritCfgMutation
} from "./project-settings-result.js";

type RepoUpdateProjectSettingsInheritCfgClient = {
  updateProjectSettingsInheritCfg: (input: {
    project_id: string;
    data: RepoProjectSettingsInheritCfg[];
  }) => Promise<{
    settings: RepoProjectSettingsInheritCfg[];
    total?: number;
  }>;
};

export function createRepoUpdateProjectSettingsInheritCfgHandler(
  client: RepoUpdateProjectSettingsInheritCfgClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateProjectSettingsInheritCfgInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update project inheritance settings",
        previewProjectSettingsInheritCfgMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectSettingsInheritCfg(parsed);
    const result = mapProjectSettingsInheritCfgList(
      `${response.settings.length} project inheritance settings updated`,
      response.settings,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
