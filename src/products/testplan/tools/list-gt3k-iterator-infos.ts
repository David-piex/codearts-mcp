import { testPlanListGt3kIteratorInfosInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListGt3kIteratorInfosClient = {
  listGt3kIteratorInfos: (input: { project_id: string }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListGt3kIteratorInfosHandler(
  client: TestPlanListGt3kIteratorInfosClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListGt3kIteratorInfosInput.parse(input);
    const response = await client.listGt3kIteratorInfos(parsed);
    const result = mapTestPlanRecordList(
      response.iterators,
      response.total,
      "GT3K iterator infos",
      "iterator"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
