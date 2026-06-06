import { testPlanListSystemConfigsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listSystemConfigs: (input: {
    project_id: string;
    params?: Record<string, unknown>;
    id?: string;
    key?: unknown;
    value?: string;
    remark?: string;
    region_id?: string;
    update_time?: string;
    update_name?: string;
    update_num?: string;
  }) => Promise<{
    configs: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListSystemConfigsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListSystemConfigsInput.parse(input);
    const response = await client.listSystemConfigs(parsed);
    const result = mapTestPlanRecordList(
      response.configs,
      response.total,
      "TestPlan system configs",
      "config"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
