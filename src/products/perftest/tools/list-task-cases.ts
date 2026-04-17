import { asListResult } from "../../../contracts/tool-result.js";
import { perftestListTaskCasesInput } from "../schemas.js";

export function mapPerfTestTaskCases(
  items: Array<{
    case_id?: number;
    case_name?: string;
    case_uri?: string;
    temp_id?: number;
  }>
) {
  return asListResult(
    `${items.length} perftest task cases found`,
    items.map((item) => ({
      id: String(item.case_id ?? item.temp_id ?? 0),
      name: item.case_name,
      caseUri: item.case_uri,
      tempId: item.temp_id
    }))
  );
}

type PerfTestListTaskCasesClient = {
  getTask: (input: { project_id: string; task_id: number }) => Promise<{
    case_list?: Array<{
      case_id?: number;
      case_name?: string;
      case_uri?: string;
      temp_id?: number;
    }>;
  }>;
};

export function createPerfTestListTaskCasesHandler(client: PerfTestListTaskCasesClient) {
  return async (input: unknown) => {
    const parsed = perftestListTaskCasesInput.parse(input);
    const response = await client.getTask(parsed);
    const result = mapPerfTestTaskCases(response.case_list ?? []);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
