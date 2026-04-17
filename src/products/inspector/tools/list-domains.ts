import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { inspectorListDomainsInput } from "../schemas.js";

export function mapInspectorDomains(
  items: Array<{
    domain_id: string;
    domain_name?: string;
    alias?: string;
    auth_status?: string;
    create_time?: string;
    high?: number;
    middle?: number;
    low?: number;
    hint?: number;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} inspector domains found`,
    items.map((item) => ({
      id: item.domain_id,
      name: item.domain_name,
      alias: item.alias,
      authStatus: item.auth_status,
      createdAt: item.create_time,
      vulnerabilityStats: {
        high: item.high ?? 0,
        middle: item.middle ?? 0,
        low: item.low ?? 0,
        hint: item.hint ?? 0
      }
    })),
    toPageInfo(page, pageSize, total)
  );
}

type InspectorListDomainsClient = {
  listDomains: (input: {
    project_id: string;
    page: number;
    page_size: number;
    domain_id?: string;
    auth_status?: "unauth" | "auth" | "invalid" | "manual" | "skip";
  }) => Promise<{
    total?: number;
    domains: Array<{
      domain_id: string;
      domain_name?: string;
      alias?: string;
      auth_status?: string;
      create_time?: string;
      high?: number;
      middle?: number;
      low?: number;
      hint?: number;
    }>;
  }>;
};

export function createInspectorListDomainsHandler(client: InspectorListDomainsClient) {
  return async (input: unknown) => {
    const parsed = inspectorListDomainsInput.parse(input);
    const response = await client.listDomains(parsed);
    const result = mapInspectorDomains(response.domains, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
