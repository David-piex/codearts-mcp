import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoTenantTrustedIpAddress } from "../client.js";
import { repoAddTenantTrustedIpAddressInput } from "../schemas.js";
import { mapTenantTrustedIpAddress } from "./tenant-result.js";
import { previewTenantTrustedIpAddressMutation } from "./tenant-mutation-result.js";

type RepoAddTenantTrustedIpAddressClient = {
  addTenantTrustedIpAddress: (input: {
    ip_type?: 0 | 1 | 2;
    ip_start?: string;
    ip_end?: string;
    view_flag?: 0 | 1;
    download_flag?: 0 | 1;
    upload_flag?: 0 | 1;
    remark?: string;
  }) => Promise<RepoTenantTrustedIpAddress>;
};

export function createRepoAddTenantTrustedIpAddressHandler(client: RepoAddTenantTrustedIpAddressClient) {
  return async (input: unknown) => {
    const parsed = repoAddTenantTrustedIpAddressInput.parse(input);

    if (parsed.dry_run) {
      const preview = previewTenantTrustedIpAddressMutation(parsed);
      const result = asItemResult("Prepared tenant trusted IP address creation", preview);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.addTenantTrustedIpAddress(request);
    const result = asItemResult("Created tenant trusted IP address", mapTenantTrustedIpAddress(response));

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
