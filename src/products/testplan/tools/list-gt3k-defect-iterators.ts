import { testPlanListGt3kDefectIteratorsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListGt3kDefectIteratorsClient = {
  listGt3kDefectIterators: (input: {
    project_id: string;
    defect_id: string;
  }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListGt3kDefectIteratorsHandler(
  client: TestPlanListGt3kDefectIteratorsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListGt3kDefectIteratorsInput.parse(input);
    const response = await client.listGt3kDefectIterators(parsed);
    const result = mapTestPlanRecordList(
      response.iterators,
      response.total,
      "GT3K defect iterators",
      "iterator"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
