import { asListResult } from "../../../contracts/tool-result.js";
import { perftestGetReportInput } from "../schemas.js";

export function mapPerfTestReport(input: {
  detail?: {
    performance?: {
      caseUri?: string;
      alias?: string;
      avgTps?: number;
      averageRespTime?: number;
      successRate?: number;
      maxConcurrentUsers?: number;
      totalCount?: number;
    };
    customTransactions?: Array<{
      awId?: string;
      alias?: string;
      avgTps?: number;
      averageRespTime?: number;
      successRate?: number;
    }>;
    detailDatas?: Array<{
      awId?: string;
      alias?: string;
      avgTps?: number;
      averageRespTime?: number;
      successRate?: number;
    }>;
  };
  err_message?: string;
}) {
  return asListResult(
    `${input.detail?.detailDatas?.length ?? 0} perftest report detail rows found`,
    (input.detail?.detailDatas ?? []).map((item) => ({
      id: item.awId ?? item.alias ?? "detail",
      alias: item.alias,
      avgTps: item.avgTps,
      averageRespTime: item.averageRespTime,
      successRate: item.successRate
    })),
    undefined,
    {
      performance: input.detail?.performance,
      customTransactions: input.detail?.customTransactions ?? [],
      errorMessage: input.err_message
    }
  );
}

type PerfTestGetReportClient = {
  getReport: (input: {
    project_id: string;
    task_run_id: number;
    case_run_id: number;
    brokens_limit_count: number;
  }) => Promise<{
    detail?: {
      performance?: {
        caseUri?: string;
        alias?: string;
        avgTps?: number;
        averageRespTime?: number;
        successRate?: number;
        maxConcurrentUsers?: number;
        totalCount?: number;
      };
      customTransactions?: Array<{
        awId?: string;
        alias?: string;
        avgTps?: number;
        averageRespTime?: number;
        successRate?: number;
      }>;
      detailDatas?: Array<{
        awId?: string;
        alias?: string;
        avgTps?: number;
        averageRespTime?: number;
        successRate?: number;
      }>;
    };
    err_message?: string;
  }>;
};

export function createPerfTestGetReportHandler(client: PerfTestGetReportClient) {
  return async (input: unknown) => {
    const parsed = perftestGetReportInput.parse(input);
    const response = await client.getReport(parsed);
    const listResult = mapPerfTestReport(response);

    return {
      content: [{ type: "text" as const, text: listResult.summary }],
      structuredContent: {
        ...listResult,
        item: {
          id: response.detail?.performance?.caseUri ?? "report",
          performance: response.detail?.performance,
          customTransactionCount: response.detail?.customTransactions?.length ?? 0,
          detailRowCount: response.detail?.detailDatas?.length ?? 0,
          errorMessage: response.err_message
        }
      }
    };
  };
}
