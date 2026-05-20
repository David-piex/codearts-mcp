import { testPlanListSolutionTemplatesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listSolutionTemplates: (input: {
    project_id: string;
    name?: string;
    is_recommended?: boolean;
    industry_type?: string | number;
  }) => Promise<{ templates: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListSolutionTemplatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListSolutionTemplatesInput.parse(input);
    const response = await client.listSolutionTemplates(parsed);
    const result = mapTestPlanRecordList(
      response.templates,
      response.total,
      "solution templates",
      "template"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
