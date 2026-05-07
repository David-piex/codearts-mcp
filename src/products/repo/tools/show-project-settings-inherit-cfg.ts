import type { RepoProjectSettingsInheritCfg } from "../client.js";
import { repoShowProjectSettingsInheritCfgInput } from "../schemas.js";
import { mapProjectSettingsInheritCfgList } from "./project-settings-result.js";

type RepoShowProjectSettingsInheritCfgClient = {
  showProjectSettingsInheritCfg: (input: {
    project_id: string;
  }) => Promise<{
    settings: RepoProjectSettingsInheritCfg[];
    total?: number;
  }>;
};

export function createRepoShowProjectSettingsInheritCfgHandler(
  client: RepoShowProjectSettingsInheritCfgClient
) {
  return async (input: unknown) => {
    const parsed = repoShowProjectSettingsInheritCfgInput.parse(input);
    const response = await client.showProjectSettingsInheritCfg(parsed);
    const result = mapProjectSettingsInheritCfgList(
      `${response.settings.length} project inheritance settings found`,
      response.settings,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
