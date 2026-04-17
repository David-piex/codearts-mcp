import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { buildGetErrorLogInput } from "../schemas.js";

export function mapBuildErrorLog(
  items: Array<{
    node_id?: string;
    step?: string;
    analyzed_success?: boolean;
    error_info?: {
      error_code?: string;
      error_message?: string;
      faq?: string | null;
    };
  }>,
  page: number,
  pageSize: number
) {
  return asListResult(
    `${items.length} build error logs found`,
    items.map((item) => ({
      id: item.node_id,
      step: item.step,
      analyzedSuccess: item.analyzed_success,
      errorCode: item.error_info?.error_code,
      errorMessage: item.error_info?.error_message,
      faq: item.error_info?.faq ?? null
    })),
    toPageInfo(page, pageSize)
  );
}

type BuildGetErrorLogClient = {
  getErrorLog: (input: {
    job_id: string;
    build_no: number;
    page: number;
    page_size: number;
  }) => Promise<{
    job_name?: string;
    error_nodes: Array<{
      node_id?: string;
      step?: string;
      analyzed_success?: boolean;
      error_info?: {
        error_code?: string;
        error_message?: string;
        faq?: string | null;
      };
    }>;
  }>;
};

export function createBuildGetErrorLogHandler(client: BuildGetErrorLogClient) {
  return async (input: unknown) => {
    const parsed = buildGetErrorLogInput.parse(input);
    const response = await client.getErrorLog(parsed);
    const result = mapBuildErrorLog(response.error_nodes, parsed.page, parsed.page_size);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
