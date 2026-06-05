import type { RepoGroupSettingsInheritCfg } from "../client.js";
import { repoShowGroupSettingsInheritCfgInput } from "../schemas.js";
import { mapGroupSettingsInheritCfg } from "./group-result.js";

type Client = {
  showGroupSettingsInheritCfg: (input: {
    group_id: string;
  }) => Promise<RepoGroupSettingsInheritCfg>;
};

export function createRepoShowGroupSettingsInheritCfgHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoShowGroupSettingsInheritCfgInput.parse(input);
    const response = await client.showGroupSettingsInheritCfg(parsed);
    const result = mapGroupSettingsInheritCfg("Fetched group settings inherit config", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
