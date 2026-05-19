import { testPlanGetGt3kIteratorInput } from "../schemas.js";
import { mapTestPlanIterator } from "./get-iterator.js";

type TestPlanGetGt3kIteratorClient = {
  getGt3kIterator: (input: {
    project_uuid: string;
    iterator_id: string;
  }) => Promise<{
    iterator_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetGt3kIteratorHandler(
  client: TestPlanGetGt3kIteratorClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetGt3kIteratorInput.parse(input);
    const response = await client.getGt3kIterator(parsed);
    const result = mapTestPlanIterator(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
