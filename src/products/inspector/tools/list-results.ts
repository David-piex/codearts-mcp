import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { inspectorListResultsInput } from "../schemas.js";

export function mapInspectorResults(
  items: Array<{
    vuln_id: string;
    domain_id?: string;
    url?: string;
    severity?: string;
    vuln_status?: string;
    vuln_class?: string;
    vuln_type?: string;
    description?: string;
    advice?: string;
    find_time?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number,
  statistics?: {
    high?: number;
    middle?: number;
    low?: number;
    hint?: number;
  }
) {
  return asListResult(
    `${items.length} inspector vulnerabilities found`,
    items.map((item) => ({
      id: item.vuln_id,
      domainId: item.domain_id,
      url: item.url,
      severity: item.severity,
      status: item.vuln_status,
      category: item.vuln_class,
      name: item.vuln_type,
      description: item.description,
      advice: item.advice,
      foundAt: item.find_time
    })),
    toPageInfo(page, pageSize, total),
    { statistics }
  );
}

type InspectorListResultsClient = {
  listResults: (input: {
    project_id: string;
    task_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    total?: number;
    statistics?: {
      high?: number;
      middle?: number;
      low?: number;
      hint?: number;
    };
    data: Array<{
      vuln_id: string;
      domain_id?: string;
      url?: string;
      severity?: string;
      vuln_status?: string;
      vuln_class?: string;
      vuln_type?: string;
      description?: string;
      advice?: string;
      find_time?: string;
    }>;
  }>;
};

export function createInspectorListResultsHandler(client: InspectorListResultsClient) {
  return async (input: unknown) => {
    const parsed = inspectorListResultsInput.parse(input);
    const response = await client.listResults(parsed);
    const result = mapInspectorResults(
      response.data,
      parsed.page,
      parsed.page_size,
      response.total,
      response.statistics
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
