import {
  formatTestPlanRecordListText,
  mapTestPlanRecordList
} from "./generic-read-tools.js";
import { testPlanListV4ProjectFieldConfigsInput } from "../schemas.js";

type Client = {
  listV4ProjectFieldConfigs: (input: { project_id: string }) => Promise<{
    fields: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListV4ProjectFieldConfigsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListV4ProjectFieldConfigsInput.parse(input);
    const response = await client.listV4ProjectFieldConfigs(parsed);
    const result = mapTestPlanRecordList(
      response.fields,
      response.total,
      "v4 project field configs",
      "field"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
