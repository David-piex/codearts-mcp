import type { RepoE2eSetting } from "../client.js";
import { repoShowGroupE2eSettingInput } from "../schemas.js";
import { mapE2eSetting } from "./e2e-setting-result.js";

type RepoShowGroupE2eSettingClient = {
  showGroupE2eSetting: (input: {
    group_id: string;
  }) => Promise<RepoE2eSetting>;
};

export function createRepoShowGroupE2eSettingHandler(client: RepoShowGroupE2eSettingClient) {
  return async (input: unknown) => {
    const parsed = repoShowGroupE2eSettingInput.parse(input);
    const response = await client.showGroupE2eSetting(parsed);
    const result = mapE2eSetting("Fetched group E2E setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
