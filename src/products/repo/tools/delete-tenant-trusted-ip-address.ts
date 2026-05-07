import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteTenantTrustedIpAddressInput } from "../schemas.js";
import { previewTenantTrustedIpAddressMutation } from "./tenant-mutation-result.js";

type RepoDeleteTenantTrustedIpAddressClient = {
  deleteTenantTrustedIpAddress: (input: {
    ip_id: string;
  }) => Promise<{
    status?: string;
  }>;
};

export function createRepoDeleteTenantTrustedIpAddressHandler(
  client: RepoDeleteTenantTrustedIpAddressClient
) {
  return async (input: unknown) => {
    const parsed = repoDeleteTenantTrustedIpAddressInput.parse(input);

    if (parsed.dry_run) {
      const preview = previewTenantTrustedIpAddressMutation({
        ip_id: parsed.ip_id,
        dry_run: parsed.dry_run
      });
      const result = asItemResult("Prepared tenant trusted IP address deletion", preview);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.deleteTenantTrustedIpAddress(request);
    const result = asItemResult("Deleted tenant trusted IP address", {
      status: response.status ?? "success"
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
