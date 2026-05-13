import { testPlanCheckResourceExistsInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanCheckResourceExistsClient = {
  checkResourceExists: (input: {
    project_id: string;
    resource_uri: string;
    version_uri: string;
    type: number;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanCheckResourceExistsHandler(
  client: TestPlanCheckResourceExistsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanCheckResourceExistsInput.parse(input);
    const response = await client.checkResourceExists(parsed);
    const result = mapTestPlanValueItem(
      `Checked resource ${parsed.resource_uri}`,
      parsed.resource_uri,
      "existence",
      response.value,
      response.raw,
      { projectId: parsed.project_id, versionUri: parsed.version_uri, type: parsed.type }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
