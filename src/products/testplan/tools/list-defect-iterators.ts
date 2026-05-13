import { testPlanListDefectIteratorsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListDefectIteratorsClient = {
  listDefectIterators: (input: {
    project_id: string;
    defect_id: string;
  }) => Promise<{
    iterators: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListDefectIteratorsHandler(
  client: TestPlanListDefectIteratorsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListDefectIteratorsInput.parse(input);
    const response = await client.listDefectIterators(parsed);
    const result = mapTestPlanRecordList(
      response.iterators,
      response.total,
      "defect iterators",
      "iterator"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
