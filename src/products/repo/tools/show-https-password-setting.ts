import type { RepoHttpsPasswordSetting } from "../client.js";
import { repoShowHttpsPasswordSettingInput } from "../schemas.js";
import { mapHttpsPasswordSetting } from "./user-settings-result.js";

type Client = {
  showHttpsPasswordSetting: () => Promise<RepoHttpsPasswordSetting>;
};

export function createRepoShowHttpsPasswordSettingHandler(client: Client) {
  return async (input: unknown) => {
    repoShowHttpsPasswordSettingInput.parse(input);
    const response = await client.showHttpsPasswordSetting();
    const result = mapHttpsPasswordSetting("Fetched HTTPS password setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
