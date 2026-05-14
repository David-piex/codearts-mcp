import { buildGetDomainUserPermissionInput } from "../schemas.js";
import { mapBuildRecordItem } from "./generic-read-tools.js";

type Client = {
  getDomainUserPermission: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createBuildGetDomainUserPermissionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildGetDomainUserPermissionInput.parse(input);
    const response = await client.getDomainUserPermission(parsed);
    const result = mapBuildRecordItem(
      `Loaded Build user permission for ${parsed.project_id}`,
      parsed.project_id,
      "permission",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
