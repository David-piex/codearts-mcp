import { testPlanListAlertTemplatesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListAlertTemplatesClient = {
  listAlertTemplates: (input: {
    service_id: string;
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListAlertTemplatesHandler(
  client: TestPlanListAlertTemplatesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListAlertTemplatesInput.parse(input);
    const response = await client.listAlertTemplates(parsed);
    const result = mapTestPlanRecordList(
      response.templates,
      response.total,
      "alert templates",
      "template",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
