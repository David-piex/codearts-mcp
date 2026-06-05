import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoWatermarkSetting } from "../client.js";
import { repoUpdateGroupWatermarkInput } from "../schemas.js";
import { mapWatermarkSetting } from "./project-settings-result.js";

type Client = {
  updateGroupWatermark: (input: {
    group_id: string;
    watermark: boolean;
  }) => Promise<RepoWatermarkSetting>;
};

export function createRepoUpdateGroupWatermarkHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateGroupWatermarkInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: update group watermark setting", {
        groupId: parsed.group_id,
        watermark: parsed.watermark,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateGroupWatermark(parsed);
    const result = mapWatermarkSetting("Updated group watermark setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
