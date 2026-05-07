import type { RepoTenantTrustedIpAddress } from "../client.js";
import { repoListTenantTrustedIpAddressesInput } from "../schemas.js";
import { mapTenantTrustedIpAddressesList } from "./tenant-result.js";

type RepoListTenantTrustedIpAddressesClient = {
  listTenantTrustedIpAddresses: (input: {
    offset: number;
    limit: number;
  }) => Promise<{
    ip_addresses: RepoTenantTrustedIpAddress[];
    total?: number;
  }>;
};

export function createRepoListTenantTrustedIpAddressesHandler(
  client: RepoListTenantTrustedIpAddressesClient
) {
  return async (input: unknown) => {
    const parsed = repoListTenantTrustedIpAddressesInput.parse(input);
    const response = await client.listTenantTrustedIpAddresses(parsed);
    const result = mapTenantTrustedIpAddressesList(
      `${response.ip_addresses.length} tenant trusted IP addresses found${response.total !== undefined ? ` (total: ${response.total})` : ""}`,
      response.ip_addresses,
      parsed.offset,
      parsed.limit,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
