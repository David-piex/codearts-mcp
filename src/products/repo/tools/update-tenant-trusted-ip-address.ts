import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoTenantTrustedIpAddress } from "../client.js";
import { repoUpdateTenantTrustedIpAddressInput } from "../schemas.js";
import { mapTenantTrustedIpAddress } from "./tenant-result.js";
import { previewTenantTrustedIpAddressMutation } from "./tenant-mutation-result.js";

type RepoUpdateTenantTrustedIpAddressClient = {
  updateTenantTrustedIpAddress: (input: {
    ip_id: string;
    ip_type?: 0 | 1 | 2;
    ip_start?: string;
    ip_end?: string;
    view_flag?: 0 | 1;
    download_flag?: 0 | 1;
    upload_flag?: 0 | 1;
    remark?: string;
  }) => Promise<RepoTenantTrustedIpAddress>;
};

export function createRepoUpdateTenantTrustedIpAddressHandler(
  client: RepoUpdateTenantTrustedIpAddressClient
) {
  return async (input: unknown) => {
    const parsed = repoUpdateTenantTrustedIpAddressInput.parse(input);

    if (parsed.dry_run) {
      const preview = previewTenantTrustedIpAddressMutation(parsed);
      const result = asItemResult("Prepared tenant trusted IP address update", preview);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateTenantTrustedIpAddress(request);
    const result = asItemResult("Updated tenant trusted IP address", mapTenantTrustedIpAddress(response));

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
