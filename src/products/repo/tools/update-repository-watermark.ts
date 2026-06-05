import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoWatermarkSetting } from "../client.js";
import { repoUpdateRepositoryWatermarkInput } from "../schemas.js";
import { mapRepositoryWatermark } from "./repository-settings-result.js";

type RepoUpdateRepositoryWatermarkClient = {
  updateRepositoryWatermark: (input: {
    repository_id: string;
    watermark: boolean;
  }) => Promise<RepoWatermarkSetting>;
};

export function createRepoUpdateRepositoryWatermarkHandler(client: RepoUpdateRepositoryWatermarkClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateRepositoryWatermarkInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: update repository watermark setting", {
        repositoryId: parsed.repository_id,
        watermark: parsed.watermark,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRepositoryWatermark(parsed);
    const result = mapRepositoryWatermark(response);

    return {
      content: [{ type: "text" as const, text: "Updated repository watermark setting" }],
      structuredContent: {
        ...result,
        summary: "Updated repository watermark setting"
      }
    };
  };
}
