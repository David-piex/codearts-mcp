import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoHttpsPasswordSettingUpdateResult } from "../client.js";
import { repoUpdateHttpsPasswordSettingInput } from "../schemas.js";
import {
  mapHttpsPasswordSettingUpdateResult,
  previewHttpsPasswordSettingMutation
} from "./user-settings-result.js";

type Client = {
  updateHttpsPasswordSetting: (input: {
    https_clone_iam_auth: boolean | string;
  }) => Promise<RepoHttpsPasswordSettingUpdateResult>;
};

export function createRepoUpdateHttpsPasswordSettingHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoUpdateHttpsPasswordSettingInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: update HTTPS password setting",
        previewHttpsPasswordSettingMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateHttpsPasswordSetting(request);
    const result = mapHttpsPasswordSettingUpdateResult("Updated HTTPS password setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
