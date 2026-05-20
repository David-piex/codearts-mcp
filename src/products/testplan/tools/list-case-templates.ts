import { testPlanListCaseTemplatesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listCaseTemplates: (input: {
    project_id: string;
    name?: string;
    is_default?: boolean;
    is_recommended?: boolean;
    industry_type?: string | number;
  }) => Promise<{ templates: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListCaseTemplatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListCaseTemplatesInput.parse(input);
    const response = await client.listCaseTemplates(parsed);
    const result = mapTestPlanRecordList(
      response.templates,
      response.total,
      "case templates",
      "template"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
