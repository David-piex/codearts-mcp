import { buildGetDomainPackageQuotaInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getDomainPackageQuota: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetDomainPackageQuotaHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetDomainPackageQuotaInput.parse(input);
    const response = await client.getDomainPackageQuota(parsed);
    const result = mapBuildRecordItem(
      `Loaded Build package quota for ${parsed.project_id}`,
      parsed.project_id,
      "quota",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
