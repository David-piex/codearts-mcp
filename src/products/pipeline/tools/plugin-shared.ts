type UnknownRecord = Record<string, unknown>;

export type PipelinePluginPublisher = {
  publisher_unique_id?: string;
  name?: string;
  en_name?: string;
  auth_status?: string;
  description?: string;
  logo_url?: string;
  [key: string]: unknown;
};

export type PipelineStagePlugin = UnknownRecord;
export type PipelineBasePlugin = UnknownRecord;
export type PipelinePlugin = UnknownRecord;
export type PipelinePluginPart = UnknownRecord;
export type PipelinePluginVersion = UnknownRecord;

function asRecord(input: unknown): UnknownRecord {
  if (input && typeof input === "object") {
    return input as UnknownRecord;
  }

  return {};
}

export function normalizePipelinePluginPublisher(input: unknown): PipelinePluginPublisher {
  const item = asRecord(input);

  return {
    ...item,
    ...(typeof item.publisher_unique_id === "string"
      ? { publisher_unique_id: item.publisher_unique_id }
      : {}),
    ...(typeof item.name === "string" ? { name: item.name } : {}),
    ...(typeof item.en_name === "string" ? { en_name: item.en_name } : {}),
    ...(typeof item.auth_status === "string" ? { auth_status: item.auth_status } : {}),
    ...(typeof item.description === "string" ? { description: item.description } : {}),
    ...(typeof item.logo_url === "string" ? { logo_url: item.logo_url } : {})
  };
}

export function normalizePipelineStagePlugin(input: unknown): PipelineStagePlugin {
  const item = asRecord(input);

  return {
    ...item,
    ...(typeof item.unique_id === "string" ? { id: item.unique_id, uniqueId: item.unique_id } : {}),
    ...(typeof item.plugin_name === "string" ? { pluginName: item.plugin_name } : {}),
    ...(typeof item.display_name === "string" ? { displayName: item.display_name } : {}),
    ...(typeof item.plugin_attribution === "string"
      ? { pluginAttribution: item.plugin_attribution }
      : {}),
    ...(item.business_type !== undefined ? { businessType: item.business_type } : {})
  };
}

export function normalizePipelineBasePlugin(input: unknown): PipelineBasePlugin {
  const item = asRecord(input);

  return {
    ...item,
    id:
      typeof item.unique_id === "string"
        ? item.unique_id
        : typeof item.plugin_name === "string"
          ? item.plugin_name
          : "",
    ...(typeof item.unique_id === "string" ? { uniqueId: item.unique_id } : {}),
    ...(typeof item.plugin_name === "string" ? { pluginName: item.plugin_name } : {}),
    ...(typeof item.display_name === "string" ? { displayName: item.display_name } : {}),
    ...(typeof item.plugin_attribution === "string"
      ? { pluginAttribution: item.plugin_attribution }
      : {}),
    ...(item.business_type !== undefined ? { businessType: item.business_type } : {})
  };
}

export function normalizePipelinePlugin(input: unknown): PipelinePlugin {
  return normalizePipelineBasePlugin(input);
}

export function normalizePipelinePluginPart(input: unknown): PipelinePluginPart {
  const item = asRecord(input);

  return {
    ...item,
    ...(typeof item.name === "string" ? { name: item.name } : {}),
    ...(typeof item.type === "string" ? { type: item.type } : {}),
    ...(typeof item.description === "string" ? { description: item.description } : {}),
    ...(item.required !== undefined ? { required: item.required } : {}),
    ...(item.default !== undefined ? { default: item.default } : {})
  };
}

export function normalizePipelinePluginVersion(input: unknown): PipelinePluginVersion {
  const item = asRecord(input);

  return {
    ...item,
    id:
      typeof item.unique_id === "string"
        ? item.unique_id
        : `${typeof item.plugin_name === "string" ? item.plugin_name : ""}@${typeof item.version === "string" ? item.version : ""}`,
    ...(typeof item.unique_id === "string" ? { uniqueId: item.unique_id } : {}),
    ...(typeof item.plugin_name === "string" ? { pluginName: item.plugin_name } : {}),
    ...(typeof item.display_name === "string" ? { displayName: item.display_name } : {}),
    ...(typeof item.plugin_attribution === "string"
      ? { pluginAttribution: item.plugin_attribution }
      : {}),
    ...(item.business_type !== undefined ? { businessType: item.business_type } : {})
  };
}
