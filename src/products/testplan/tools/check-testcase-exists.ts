import { testPlanCheckTestcaseExistsInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type Client = {
  checkTestcaseExists: (input: {
    project_uuid: string;
    case_uris: string[];
    version_uri?: string;
  }) => Promise<{
    project_uuid: string;
    existing_case_uris: string[];
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanCheckTestcaseExistsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanCheckTestcaseExistsInput.parse(input);
    const response = await client.checkTestcaseExists(parsed);
    const result = mapTestPlanValueItem(
      `Loaded TestPlan testcase existence for ${response.existing_case_uris.length} URI(s)`,
      response.project_uuid,
      "testcaseExistence",
      response.existing_case_uris,
      response.raw,
      {
        total: response.total,
        requestedCaseUris: parsed.case_uris,
        versionUri: parsed.version_uri
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
