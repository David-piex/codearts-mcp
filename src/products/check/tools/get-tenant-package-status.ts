import { checkGetTenantPackageStatusInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTenantPackageStatus: (input: { project_id?: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTenantPackageStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTenantPackageStatusInput.parse(input);
    const response = await client.getTenantPackageStatus(parsed);
    const id = parsed.project_id ?? "tenant";
    const result = mapCheckRecordItem(
      `Loaded Check tenant package status ${id}`,
      id,
      "tenantPackageStatus",
      response.raw,
      parsed.project_id ? { projectId: parsed.project_id } : {}
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
