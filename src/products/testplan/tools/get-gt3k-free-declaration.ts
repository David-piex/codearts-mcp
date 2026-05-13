import { testPlanGetGt3kFreeDeclarationInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanGetGt3kFreeDeclarationClient = {
  getGt3kFreeDeclaration: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetGt3kFreeDeclarationHandler(
  client: TestPlanGetGt3kFreeDeclarationClient
) {
  return async (input: unknown) => {
    testPlanGetGt3kFreeDeclarationInput.parse(input);
    const response = await client.getGt3kFreeDeclaration();
    const result = mapTestPlanValueItem(
      "Loaded GT3K free declaration status",
      "gt3k-free-declaration",
      "declaration",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
