import { asListResult } from "../../../contracts/tool-result.js";
import { deployListApplicationGroupsInput } from "../schemas.js";

type Client = {
  listApplicationGroups: (input: { project_id: string }) => Promise<{
    project_id: string;
    groups: Array<Record<string, unknown> & { id?: string; name?: string }>;
    status?: string;
    raw: unknown;
  }>;
};

export function createDeployListApplicationGroupsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = deployListApplicationGroupsInput.parse(input);
    const response = await client.listApplicationGroups(parsed);
    const result = asListResult(
      `${response.groups.length} deploy application groups found`,
      response.groups.map((item) => ({
        id: String(item.id ?? item.group_id ?? item.name ?? ""),
        name: item.name,
        group: item
      }))
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: {
        ...result,
        projectId: response.project_id,
        status: response.status,
        raw: response.raw
      }
    };
  };
}
