import { testPlanListDefaultTemplatesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listDefaultTemplates: (input: {
    project_id: string;
    page: number;
    page_size: number;
    offset?: number;
    name?: string;
  }) => Promise<{
    templates: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListDefaultTemplatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListDefaultTemplatesInput.parse(input);
    const response = await client.listDefaultTemplates(parsed);
    const result = mapTestPlanRecordList(
      response.templates,
      response.total,
      "TestPlan default templates",
      "template",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
