import type { RepoWatermarkSetting } from "../client.js";
import { repoShowProjectWatermarkInput } from "../schemas.js";
import { mapWatermarkSetting } from "./project-settings-result.js";

type RepoShowProjectWatermarkClient = {
  showProjectWatermark: (input: {
    project_id: string;
  }) => Promise<RepoWatermarkSetting>;
};

export function createRepoShowProjectWatermarkHandler(client: RepoShowProjectWatermarkClient) {
  return async (input: unknown) => {
    const parsed = repoShowProjectWatermarkInput.parse(input);
    const response = await client.showProjectWatermark(parsed);
    const result = mapWatermarkSetting("Fetched project watermark setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
