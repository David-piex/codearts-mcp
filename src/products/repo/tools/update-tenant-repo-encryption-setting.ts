import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoTenantRepoEncryptionSetting } from "../client.js";
import { repoUpdateTenantRepoEncryptionSettingInput } from "../schemas.js";
import { mapTenantRepoEncryptionSetting } from "./tenant-result.js";
import { previewTenantRepoEncryptionSettingMutation } from "./tenant-mutation-result.js";

type RepoUpdateTenantRepoEncryptionSettingClient = {
  updateTenantRepoEncryptionSetting: (input: {
    tenant_id: string;
    encryption_type?: string;
    default_encryption_enabled?: boolean;
    cmk_key_name?: string;
    cmk_key_id?: string;
  }) => Promise<RepoTenantRepoEncryptionSetting>;
};

export function createRepoUpdateTenantRepoEncryptionSettingHandler(
  client: RepoUpdateTenantRepoEncryptionSettingClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateTenantRepoEncryptionSettingInput.parse(input);

    if (parsed.dry_run) {
      const preview = previewTenantRepoEncryptionSettingMutation(parsed);
      const result = asItemResult("Prepared tenant repo encryption setting update", preview);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateTenantRepoEncryptionSetting(request);
    const result = mapTenantRepoEncryptionSetting("Updated tenant repo encryption setting", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
