import type { RepoE2eSetting } from "../client.js";
import { repoShowRepositoryE2eSettingInput } from "../schemas.js";
import { mapE2eSetting } from "./e2e-setting-result.js";

type RepoShowRepositoryE2eSettingClient = {
  showRepositoryE2eSetting: (input: {
    repository_id: string;
    take_effect?: boolean;
  }) => Promise<RepoE2eSetting>;
};

export function createRepoShowRepositoryE2eSettingHandler(
  client: RepoShowRepositoryE2eSettingClient
) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryE2eSettingInput.parse(input);
    const response = await client.showRepositoryE2eSetting(parsed);
    const result = mapE2eSetting("Fetched repository E2E setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
