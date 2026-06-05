import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoBatchValidateRepoNameItem } from "../client.js";
import { repoBatchValidateRepoNamesInput } from "../schemas.js";
import {
  mapBatchValidateRepoNamesResult,
  previewBatchValidateRepoNamesMutation
} from "./user-settings-result.js";

type Client = {
  batchValidateRepoNames: (input: {
    items: Array<{
      name: string;
      project_id: string;
      group_id?: string;
    }>;
  }) => Promise<RepoBatchValidateRepoNameItem[]>;
};

export function createRepoBatchValidateRepoNamesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoBatchValidateRepoNamesInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(
        "Dry run: batch validate repository names",
        previewBatchValidateRepoNamesMutation(parsed)
      );

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.batchValidateRepoNames(request);
    const result = mapBatchValidateRepoNamesResult(
      `${response.length} repository name validation result(s)`,
      response
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
