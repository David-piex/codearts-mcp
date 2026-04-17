import { asListResult } from "../../../contracts/tool-result.js";
import { governListSbcVulnMapInput } from "../schemas.js";

export function mapGovernSbcVulnMapItem(input: {
  name?: string;
  version?: string;
  cve_id?: string;
  is_affected?: string;
  update_time?: string;
}) {
  return {
    id: input.cve_id ?? `${input.name ?? "vuln-map"}`,
    name: input.name,
    version: input.version,
    affected: input.is_affected,
    updateTime: input.update_time
  };
}

type GovernListSbcVulnMapClient = {
  listSbcVulnMap: (input: {
    project_id: string;
    start_time: string;
    end_time: string;
  }) => Promise<
    Array<{
      name?: string;
      version?: string;
      cve_id?: string;
      is_affected?: string;
      update_time?: string;
    }>
  >;
};

export function createGovernListSbcVulnMapHandler(client: GovernListSbcVulnMapClient) {
  return async (input: unknown) => {
    const parsed = governListSbcVulnMapInput.parse(input);
    const items = (await client.listSbcVulnMap(parsed)).map(mapGovernSbcVulnMapItem);
    const result = asListResult(`Loaded govern vuln map items (${items.length})`, items);
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
