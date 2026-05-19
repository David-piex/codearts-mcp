import type { RepoWatermarkSetting } from "../client.js";
import { repoShowGroupWatermarkInput } from "../schemas.js";
import { mapWatermarkSetting } from "./project-settings-result.js";

type Client = {
  showGroupWatermark: (input: {
    group_id: string;
  }) => Promise<RepoWatermarkSetting>;
};

export function createRepoShowGroupWatermarkHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoShowGroupWatermarkInput.parse(input);
    const response = await client.showGroupWatermark(parsed);
    const result = mapWatermarkSetting("Fetched group watermark setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
