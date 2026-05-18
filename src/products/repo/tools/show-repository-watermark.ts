import type { RepoWatermarkSetting } from "../client.js";
import { repoShowRepositoryWatermarkInput } from "../schemas.js";
import { mapRepositoryWatermark } from "./repository-settings-result.js";

type RepoShowRepositoryWatermarkClient = {
  showRepositoryWatermark: (input: { repository_id: string }) => Promise<RepoWatermarkSetting>;
};

export function createRepoShowRepositoryWatermarkHandler(client: RepoShowRepositoryWatermarkClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryWatermarkInput.parse(input);
    const response = await client.showRepositoryWatermark(parsed);
    const result = mapRepositoryWatermark(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
