import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateProjectTemplateInput } from "../schemas.js";

export function previewUpdateProjectTemplate(input: {
  template_id: string;
  name?: string;
  description?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update project template ${input.template_id}`, {
    id: input.template_id,
    name: input.name,
    description: input.description,
    executed: false
  });
}

export function mapUpdatedProjectTemplate(input: {
  id?: number | string;
  name?: string;
  type?: string | null;
}) {
  return asItemResult(`Updated project template ${input.id}`, {
    id: typeof input.id !== "undefined" ? String(input.id) : "",
    name: input.name,
    type: input.type,
    executed: true
  });
}

type ReqUpdateProjectTemplateClient = {
  updateProjectTemplate: (input: {
    template_id: string;
    name?: string;
    description?: string;
  }) => Promise<{
    id?: number | string;
    name?: string;
    type?: string | null;
  }>;
};

export function createReqUpdateProjectTemplateHandler(client: ReqUpdateProjectTemplateClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateProjectTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateProjectTemplate(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectTemplate(parsed);
    const result = mapUpdatedProjectTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
