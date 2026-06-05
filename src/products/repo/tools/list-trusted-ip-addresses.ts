import type { RepoTenantTrustedIpAddress } from "../client.js";
import { repoListTrustedIpAddressesInput } from "../schemas.js";
import { mapTrustedIpAddressesList } from "./trusted-ip-result.js";

type RepoListTrustedIpAddressesClient = {
  listTrustedIpAddresses: (input: {
    repository_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    ip_addresses: RepoTenantTrustedIpAddress[];
    total?: number;
  }>;
};

export function createRepoListTrustedIpAddressesHandler(client: RepoListTrustedIpAddressesClient) {
  return async (input: unknown) => {
    const parsed = repoListTrustedIpAddressesInput.parse(input);
    const response = await client.listTrustedIpAddresses(parsed);
    const result = mapTrustedIpAddressesList(
      `${response.ip_addresses.length} repository trusted IP addresses found${response.total !== undefined ? ` (total: ${response.total})` : ""}`,
      response.ip_addresses,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
