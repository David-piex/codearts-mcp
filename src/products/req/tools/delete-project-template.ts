import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDeleteProjectTemplateInput } from "../schemas.js";

export function previewDeleteProjectTemplate(input: {
  template_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete project template ${input.template_id}`, {
    id: input.template_id,
    deleted: false,
    executed: false
  });
}

export function mapDeletedProjectTemplate(input: {
  id?: number | string;
  name?: string;
  sourceId?: string;
  sourceName?: string;
  description?: string | null;
  identifier?: string;
  authorId?: number | string;
  domainId?: string;
  type?: string;
  isPublic?: number | boolean;
}) {
  return asItemResult(`Deleted project template ${input.id}`, {
    id: typeof input.id !== "undefined" ? String(input.id) : "",
    name: input.name,
    sourceId: input.sourceId,
    sourceName: input.sourceName,
    description: input.description,
    identifier: input.identifier,
    authorId: input.authorId,
    domainId: input.domainId,
    type: input.type,
    isPublic: input.isPublic,
    deleted: true,
    executed: true
  });
}

type ReqDeleteProjectTemplateClient = {
  deleteProjectTemplate: (input: { template_id: string }) => Promise<{
    id?: number | string;
    name?: string;
    sourceId?: string;
    sourceName?: string;
    description?: string | null;
    identifier?: string;
    authorId?: number | string;
    domainId?: string;
    type?: string;
    isPublic?: number | boolean;
  }>;
};

export function createReqDeleteProjectTemplateHandler(client: ReqDeleteProjectTemplateClient) {
  return async (input: unknown) => {
    const parsed = reqDeleteProjectTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteProjectTemplate(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteProjectTemplate(parsed);
    const result = mapDeletedProjectTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
