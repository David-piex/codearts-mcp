import { testPlanListApiTestGlobalParamNamesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listApiTestGlobalParamNames: (input: {
    project_id: string;
  }) => Promise<{ params: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListApiTestGlobalParamNamesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListApiTestGlobalParamNamesInput.parse(input);
    const response = await client.listApiTestGlobalParamNames(parsed);
    const result = mapTestPlanRecordList(
      response.params,
      response.total,
      "API test global parameter names",
      "param"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
