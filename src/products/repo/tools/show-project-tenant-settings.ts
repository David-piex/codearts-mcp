import type { RepoProjectTenantSettings } from "../client.js";
import { repoShowProjectTenantSettingsInput } from "../schemas.js";
import { mapProjectTenantSettings } from "./tenant-result.js";

type RepoShowProjectTenantSettingsClient = {
  showProjectTenantSettings: (input: {
    project_id?: string;
  }) => Promise<RepoProjectTenantSettings>;
};

export function createRepoShowProjectTenantSettingsHandler(client: RepoShowProjectTenantSettingsClient) {
  return async (input: unknown) => {
    const parsed = repoShowProjectTenantSettingsInput.parse(input);
    const response = await client.showProjectTenantSettings(parsed);
    const result = mapProjectTenantSettings("Fetched tenant settings", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
