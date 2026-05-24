import type { RepoApproverSettings } from "../client.js";
import { repoShowRepositoryApproverSettingsInput } from "../schemas.js";
import { mapApproverSettings } from "./merge-request-settings-result.js";

type RepoShowRepositoryApproverSettingsClient = {
  showRepositoryApproverSettings: (input: { repository_id: string }) => Promise<RepoApproverSettings>;
};

export function createRepoShowRepositoryApproverSettingsHandler(client: RepoShowRepositoryApproverSettingsClient) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryApproverSettingsInput.parse(input);
    const response = await client.showRepositoryApproverSettings(parsed);
    const result = mapApproverSettings("repository", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
