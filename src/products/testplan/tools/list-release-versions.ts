import { testPlanListReleaseVersionsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListReleaseVersionsClient = {
  listReleaseVersions: (input: {
    project_id: string;
    resource_type: string;
    version_uri?: string;
    limit?: number;
  }) => Promise<{
    versions: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListReleaseVersionsHandler(
  client: TestPlanListReleaseVersionsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListReleaseVersionsInput.parse(input);
    const response = await client.listReleaseVersions(parsed);
    const result = mapTestPlanRecordList(
      response.versions,
      response.total,
      "release versions",
      "version"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
