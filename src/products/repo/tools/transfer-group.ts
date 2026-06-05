import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoTransferGroupResult } from "../client.js";
import { repoTransferGroupInput } from "../schemas.js";
import {
  mapTransferGroupResult,
  previewTransferGroupMutation
} from "./user-settings-result.js";

type Client = {
  transferGroup: (input: {
    group_id: string;
    owner_id: string;
  }) => Promise<RepoTransferGroupResult>;
};

export function createRepoTransferGroupHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoTransferGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: transfer group", previewTransferGroupMutation(parsed));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.transferGroup(request);
    const result = mapTransferGroupResult(`Transferred group ${parsed.group_id}`, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
