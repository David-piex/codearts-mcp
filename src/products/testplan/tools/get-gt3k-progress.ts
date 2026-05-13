import { testPlanGetGt3kProgressInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetGt3kProgressClient = {
  getGt3kProgress: (input: {
    operation_uri: string;
    project_uuid: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetGt3kProgressHandler(client: TestPlanGetGt3kProgressClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetGt3kProgressInput.parse(input);
    const response = await client.getGt3kProgress(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded GT3K progress ${parsed.operation_uri}`,
      parsed.operation_uri,
      "progress",
      response.raw,
      { projectUuid: parsed.project_uuid }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
