import { testPlanListIteratorInfosInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListIteratorInfosClient = {
  listIteratorInfos: (input: { project_id: string }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListIteratorInfosHandler(
  client: TestPlanListIteratorInfosClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListIteratorInfosInput.parse(input);
    const response = await client.listIteratorInfos(parsed);
    const result = mapTestPlanRecordList(response.iterators, response.total, "iterator infos", "iterator");

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
