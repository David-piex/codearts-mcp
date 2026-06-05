import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDeleteTrustedIpAddressInput } from "../schemas.js";
import { previewTrustedIpAddressMutation } from "./trusted-ip-result.js";

type RepoDeleteTrustedIpAddressClient = {
  deleteTrustedIpAddress: (input: {
    repository_id: string;
    ip_id: string;
  }) => Promise<{
    status?: string;
  }>;
};

export function createRepoDeleteTrustedIpAddressHandler(client: RepoDeleteTrustedIpAddressClient) {
  return async (input: unknown) => {
    const parsed = repoDeleteTrustedIpAddressInput.parse(input);

    if (parsed.dry_run) {
      const result = previewTrustedIpAddressMutation(parsed);
      result.summary = "Prepared repository trusted IP address deletion";
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.deleteTrustedIpAddress(request);
    const result = asItemResult("Deleted repository trusted IP address", {
      repositoryId: parsed.repository_id,
      ipId: parsed.ip_id,
      status: response.status ?? "success"
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
