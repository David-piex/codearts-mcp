import {
  formatTestPlanRecordListText,
  mapTestPlanRecordList
} from "./generic-read-tools.js";
import { testPlanListProjectDefectsInput } from "../schemas.js";

type Client = {
  listProjectDefects: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    module_id?: string;
    iteration_ids?: string;
  }) => Promise<{
    defects: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListProjectDefectsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListProjectDefectsInput.parse(input);
    const response = await client.listProjectDefects(parsed);
    const result = mapTestPlanRecordList(
      response.defects,
      response.total,
      "project defects",
      "defect",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
