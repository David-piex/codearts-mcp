import type { RepoApproverSettings } from "../client.js";
import { repoShowProjectApproverSettingsInput } from "../schemas.js";
import { mapApproverSettings } from "./merge-request-settings-result.js";

type RepoShowProjectApproverSettingsClient = {
  showProjectApproverSettings: (input: { project_id: string }) => Promise<RepoApproverSettings>;
};

export function createRepoShowProjectApproverSettingsHandler(client: RepoShowProjectApproverSettingsClient) {
  return async (input: unknown) => {
    const parsed = repoShowProjectApproverSettingsInput.parse(input);
    const response = await client.showProjectApproverSettings(parsed);
    const result = mapApproverSettings("project", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
