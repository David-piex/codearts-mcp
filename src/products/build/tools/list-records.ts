import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { buildListRecordsInput } from "../schemas.js";

export function mapBuildRecords(
  items: Array<{
    record_id: string;
    job_id?: string;
    build_no?: number;
    daily_build_number?: string;
    status?: string;
    trigger_type?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} build records found`,
    items.map((item) => ({
      id: item.record_id,
      jobId: item.job_id,
      buildNo: item.build_no,
      dailyBuildNumber: item.daily_build_number,
      status: item.status,
      triggerType: item.trigger_type
    })),
    toPageInfo(page, pageSize, total)
  );
}

type BuildListRecordsClient = {
  listRecords: (input: {
    job_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<{
      record_id: string;
      job_id?: string;
      build_no?: number;
      daily_build_number?: string;
      status?: string;
      trigger_type?: string;
    }>;
    total?: number;
  }>;
};

export function createBuildListRecordsHandler(client: BuildListRecordsClient) {
  return async (input: unknown) => {
    const parsed = buildListRecordsInput.parse(input);
    const response = await client.listRecords(parsed);
    const result = mapBuildRecords(response.records, parsed.page, parsed.page_size, response.total);
    const text =
      result.items?.length || parsed.page > 1
        ? result.summary
        : [
            result.summary,
            "",
            `Hint: If you expected build records here, confirm job_id \`${parsed.job_id}\` points to a build job with visible execution records for the current account.`
          ].join("\n");

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
