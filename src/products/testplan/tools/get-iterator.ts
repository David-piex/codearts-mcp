import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetIteratorInput } from "../schemas.js";

export function mapTestPlanIterator(input: {
  iterator_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded iterator ${input.name ?? input.iterator_id}`, {
    id: input.iterator_id,
    iteratorId: input.iterator_id,
    name: input.name,
    iterator: input.raw
  });
}

type TestPlanGetIteratorClient = {
  getIterator: (input: {
    project_uuid: string;
    iterator_uri: string;
  }) => Promise<{
    iterator_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetIteratorHandler(client: TestPlanGetIteratorClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetIteratorInput.parse(input);
    const response = await client.getIterator(parsed);
    const result = mapTestPlanIterator(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
