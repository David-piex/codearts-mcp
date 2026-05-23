import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateCacheSettingInput } from "../schemas.js";

type ReqCacheSettingField = {
  id?: string;
  field?: string;
  header?: string;
  name?: string;
  type?: string;
};

export function previewUpdateCacheSetting(input: {
  project_id: string;
  type?: string;
  fields: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update cache setting for type ${input.type ?? "backlog"}`, {
    projectId: input.project_id,
    type: input.type ?? "backlog",
    fieldIds: input.fields,
    fields: [],
    visibleFields: [],
    executed: false
  });
}

export function mapUpdatedCacheSetting(input: {
  project_id: string;
  type?: string;
  fields?: ReqCacheSettingField[];
  visible_fields?: ReqCacheSettingField[];
}) {
  return asItemResult(`Updated cache setting for type ${input.type ?? "backlog"}`, {
    projectId: input.project_id,
    type: input.type ?? "backlog",
    fields: input.fields ?? [],
    visibleFields: input.visible_fields ?? [],
    executed: true
  });
}

type ReqUpdateCacheSettingClient = {
  updateCacheSetting: (input: {
    project_id: string;
    type?: string;
    fields: string[];
  }) => Promise<{
    project_id: string;
    type?: string;
    fields?: ReqCacheSettingField[];
    visible_fields?: ReqCacheSettingField[];
  }>;
};

export function createReqUpdateCacheSettingHandler(client: ReqUpdateCacheSettingClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateCacheSettingInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateCacheSetting(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateCacheSetting(parsed);
    const result = mapUpdatedCacheSetting(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
