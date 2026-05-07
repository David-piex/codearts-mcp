import type { RepoTenantDevelopMode } from "../client.js";
import { repoShowTenantDevelopModeInput } from "../schemas.js";
import { mapTenantDevelopMode } from "./tenant-result.js";

type RepoShowTenantDevelopModeClient = {
  showTenantDevelopMode: () => Promise<RepoTenantDevelopMode>;
};

export function createRepoShowTenantDevelopModeHandler(client: RepoShowTenantDevelopModeClient) {
  return async (input: unknown) => {
    repoShowTenantDevelopModeInput.parse(input);
    const response = await client.showTenantDevelopMode();
    const result = mapTenantDevelopMode("Fetched tenant develop mode", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
