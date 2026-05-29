import { testPlanListResourceOperationRecordsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listResourceOperationRecords: (input: {
    project_id: string;
    page: number;
    page_size: number;
    resource_id?: string;
    resource_type?: string;
    operation_type?: string;
  }) => Promise<{
    records: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListResourceOperationRecordsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListResourceOperationRecordsInput.parse(input);
    const response = await client.listResourceOperationRecords(parsed);
    const result = mapTestPlanRecordList(
      response.records,
      response.total,
      "resource operation records",
      "record",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
