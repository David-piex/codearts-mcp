import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoWatermarkSetting } from "../client.js";
import { repoUpdateProjectWatermarkInput } from "../schemas.js";
import {
  mapWatermarkSetting,
  previewProjectWatermarkMutation
} from "./project-settings-result.js";

type RepoUpdateProjectWatermarkClient = {
  updateProjectWatermark: (input: {
    project_id: string;
    watermark: boolean;
  }) => Promise<RepoWatermarkSetting>;
};

export function createRepoUpdateProjectWatermarkHandler(client: RepoUpdateProjectWatermarkClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateProjectWatermarkInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update project watermark setting",
        previewProjectWatermarkMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectWatermark(parsed);
    const result = mapWatermarkSetting("Updated project watermark setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
