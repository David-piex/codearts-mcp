import type { RepoE2eSetting } from "../client.js";
import { repoShowProjectE2eSettingInput } from "../schemas.js";
import { mapE2eSetting } from "./e2e-setting-result.js";

type RepoShowProjectE2eSettingClient = {
  showProjectE2eSetting: (input: {
    project_id: string;
  }) => Promise<RepoE2eSetting>;
};

export function createRepoShowProjectE2eSettingHandler(
  client: RepoShowProjectE2eSettingClient
) {
  return async (input: unknown) => {
    const parsed = repoShowProjectE2eSettingInput.parse(input);
    const response = await client.showProjectE2eSetting(parsed);
    const result = mapE2eSetting("Fetched project E2E setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
