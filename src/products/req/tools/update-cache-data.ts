import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateCacheDataInput } from "../schemas.js";

type ReqCacheUpdateField = {
  id?: string;
  field?: string;
  header?: string;
  type?: string;
  visible?: boolean;
  order?: number;
};

export function previewUpdateCacheData(input: {
  project_id: string;
  type?: string;
  region?: string;
  cache_id?: number;
  visible_fields?: string[];
  fields?: ReqCacheUpdateField[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update cache data for type ${input.type ?? "backlog"}`, {
    projectId: input.project_id,
    type: input.type ?? "backlog",
    region: input.region,
    cacheId: input.cache_id,
    visibleFieldIds: input.visible_fields ?? [],
    fields: input.fields ?? [],
    updatedCount: 0,
    executed: false
  });
}

export function mapUpdatedCacheData(input: {
  project_id: string;
  type?: string;
  region?: string;
  cache_id?: number;
  updated_count?: number;
  fields?: ReqCacheUpdateField[];
}) {
  return asItemResult(`Updated cache data for type ${input.type ?? "backlog"}`, {
    projectId: input.project_id,
    type: input.type ?? "backlog",
    region: input.region,
    cacheId: input.cache_id,
    updatedCount: input.updated_count ?? input.fields?.length ?? 0,
    fields: input.fields ?? [],
    executed: true
  });
}

type ReqUpdateCacheDataClient = {
  updateCacheData: (input: {
    project_id: string;
    type?: string;
    region?: string;
    cache_id?: number;
    visible_fields?: string[];
    fields?: ReqCacheUpdateField[];
  }) => Promise<{
    project_id: string;
    type?: string;
    region?: string;
    cache_id?: number;
    updated_count?: number;
    fields?: ReqCacheUpdateField[];
  }>;
};

export function createReqUpdateCacheDataHandler(client: ReqUpdateCacheDataClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateCacheDataInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateCacheData(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateCacheData(parsed);
    const result = mapUpdatedCacheData(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
