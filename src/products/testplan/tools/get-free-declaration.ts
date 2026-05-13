import { testPlanGetFreeDeclarationInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanGetFreeDeclarationClient = {
  getFreeDeclaration: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetFreeDeclarationHandler(
  client: TestPlanGetFreeDeclarationClient
) {
  return async (input: unknown) => {
    testPlanGetFreeDeclarationInput.parse(input);
    const response = await client.getFreeDeclaration();
    const result = mapTestPlanValueItem(
      "Loaded free declaration status",
      "free-declaration",
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
