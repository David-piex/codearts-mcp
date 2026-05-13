import { testPlanListPublicAwLibAndAwsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listPublicAwLibAndAws: (input: { project_id: string }) => Promise<{
    aws: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListPublicAwLibAndAwsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListPublicAwLibAndAwsInput.parse(input);
    const response = await client.listPublicAwLibAndAws(parsed);
    const result = mapTestPlanRecordList(
      response.aws,
      response.total,
      "public AW libs and AWs",
      "aw"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
