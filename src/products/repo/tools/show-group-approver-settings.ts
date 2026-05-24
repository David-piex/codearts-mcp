import type { RepoApproverSettings } from "../client.js";
import { repoShowGroupApproverSettingsInput } from "../schemas.js";
import { mapApproverSettings } from "./merge-request-settings-result.js";

type RepoShowGroupApproverSettingsClient = {
  showGroupApproverSettings: (input: { group_id: string }) => Promise<RepoApproverSettings>;
};

export function createRepoShowGroupApproverSettingsHandler(client: RepoShowGroupApproverSettingsClient) {
  return async (input: unknown) => {
    const parsed = repoShowGroupApproverSettingsInput.parse(input);
    const response = await client.showGroupApproverSettings(parsed);
    const result = mapApproverSettings("group", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
