import type { RepoTenantTrustedIpAddress } from "../client.js";
import { repoUpdateTrustedIpAddressInput } from "../schemas.js";
import { mapTrustedIpAddress, previewTrustedIpAddressMutation } from "./trusted-ip-result.js";

type RepoUpdateTrustedIpAddressClient = {
  updateTrustedIpAddress: (input: {
    repository_id: string;
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

export function createRepoUpdateTrustedIpAddressHandler(client: RepoUpdateTrustedIpAddressClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateTrustedIpAddressInput.parse(input);

    if (parsed.dry_run) {
      const result = previewTrustedIpAddressMutation(parsed);
      result.summary = "Prepared repository trusted IP address update";
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateTrustedIpAddress(request);
    const result = {
      summary: "Updated repository trusted IP address",
      item: mapTrustedIpAddress(response)
    };

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
