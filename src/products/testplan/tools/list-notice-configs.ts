import { testPlanListNoticeConfigsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listNoticeConfigs: (input: {
    project_id: string;
  }) => Promise<{ notices: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListNoticeConfigsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListNoticeConfigsInput.parse(input);
    const response = await client.listNoticeConfigs(parsed);
    const result = mapTestPlanRecordList(
      response.notices,
      response.total,
      "notice configs",
      "notice"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
