import { testPlanCheckResourceExistsInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanCheckResourceExistsClient = {
  checkResourceExists: (input: {
    project_id: string;
    version_uri: string;
    type: number;
    resource_uri?: string;
    resource_uris?: string[];
    body?: string[];
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
    const resourceId =
      parsed.resource_uri ??
      parsed.resource_uris?.join(",") ??
      parsed.body?.join(",") ??
      parsed.project_id;
    const result = mapTestPlanValueItem(
      `Checked resource existence for ${resourceId}`,
      resourceId,
      "existence",
      response.value,
      response.raw,
      {
        projectId: parsed.project_id,
        versionUri: parsed.version_uri,
        type: parsed.type,
        resourceUris: parsed.resource_uris ?? parsed.body
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
