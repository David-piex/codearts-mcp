import { buildListPackageSpecStatusesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listPackageSpecStatuses: (input: { project_id: string; status: string }) => Promise<{
    statuses: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListPackageSpecStatusesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListPackageSpecStatusesInput.parse(input);
    const response = await client.listPackageSpecStatuses(parsed);
    const result = mapBuildRecordList(response.statuses, response.total, "package spec statuses", "package_spec_status");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
