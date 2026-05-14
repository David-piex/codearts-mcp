import { testPlanCheckAlertTemplateNameInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type Client = {
  checkAlertTemplateName: (input: {
    service_id: string;
    name: string;
    id?: string;
  }) => Promise<{ value?: unknown; raw: Record<string, unknown> }>;
};

export function createTestPlanCheckAlertTemplateNameHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanCheckAlertTemplateNameInput.parse(input);
    const response = await client.checkAlertTemplateName(parsed);
    const result = mapTestPlanValueItem(
      `Checked alert template name ${parsed.name}`,
      parsed.name,
      "check",
      response.value,
      response.raw,
      { serviceId: parsed.service_id, templateId: parsed.id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
