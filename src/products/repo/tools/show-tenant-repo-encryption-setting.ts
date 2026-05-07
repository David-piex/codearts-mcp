import type { RepoTenantRepoEncryptionSetting } from "../client.js";
import { repoShowTenantRepoEncryptionSettingInput } from "../schemas.js";
import { mapTenantRepoEncryptionSetting } from "./tenant-result.js";

type RepoShowTenantRepoEncryptionSettingClient = {
  showTenantRepoEncryptionSetting: (input: {
    tenant_id: string;
  }) => Promise<RepoTenantRepoEncryptionSetting>;
};

export function createRepoShowTenantRepoEncryptionSettingHandler(
  client: RepoShowTenantRepoEncryptionSettingClient
) {
  return async (input: unknown) => {
    const parsed = repoShowTenantRepoEncryptionSettingInput.parse(input);
    const response = await client.showTenantRepoEncryptionSetting(parsed);
    const result = mapTenantRepoEncryptionSetting("Fetched tenant repo encryption setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
