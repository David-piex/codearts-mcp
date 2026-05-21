import { testPlanListTaskParameterTemplatesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listTaskParameterTemplates: (input: {
    project_id: string;
    serviceId: string;
    sort_by?: string;
    sort_direction?: string;
    name?: string;
  }) => Promise<{
    serviceId: string;
    templates: Array<Record<string, unknown>>;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListTaskParameterTemplatesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListTaskParameterTemplatesInput.parse(input);
    const response = await client.listTaskParameterTemplates(parsed);
    const result = mapTestPlanRecordList(
      response.templates,
      undefined,
      "TestPlan task parameter templates",
      "template"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        serviceId: response.serviceId,
        response: response.raw
      }
    };
  };
}
