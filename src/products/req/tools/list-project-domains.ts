import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListProjectDomainsInput } from "../schemas.js";

export function mapReqProjectDomains(
  items: Array<{
    domain_id?: string;
    domain_name?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} project domains found`,
    items.map((item) => ({
      id: item.domain_id,
      name: item.domain_name
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListProjectDomainsClient = {
  listProjectDomains: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    domains: Array<{
      domain_id?: string;
      domain_name?: string;
    }>;
    total?: number;
  }>;
};

export function createReqListProjectDomainsHandler(client: ReqListProjectDomainsClient) {
  return async (input: unknown) => {
    const parsed = reqListProjectDomainsInput.parse(input);
    const response = await client.listProjectDomains(parsed);
    const result = mapReqProjectDomains(response.domains, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "name", get: (item) => (item as { name?: string }).name }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "project domains",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
