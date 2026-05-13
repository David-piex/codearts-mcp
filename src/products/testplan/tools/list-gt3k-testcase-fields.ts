import { testPlanListGt3kTestcaseFieldsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListGt3kTestcaseFieldsClient = {
  listGt3kTestcaseFields: (input: { project_id: string }) => Promise<{
    fields: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListGt3kTestcaseFieldsHandler(
  client: TestPlanListGt3kTestcaseFieldsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListGt3kTestcaseFieldsInput.parse(input);
    const response = await client.listGt3kTestcaseFields(parsed);
    const result = mapTestPlanRecordList(
      response.fields,
      response.total,
      "GT3K testcase fields",
      "field"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
