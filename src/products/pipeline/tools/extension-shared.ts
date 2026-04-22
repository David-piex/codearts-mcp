export type PipelineExtensionModule = {
  id?: number;
  base_url?: string;
  description?: string;
  location?: string;
  module_id?: string;
  name?: string;
  properties?: Record<string, unknown>;
  publisher?: string;
  type?: string;
  version?: string;
  tags?: string[];
  url_relative?: string;
  properties_list?: unknown[];
  manifest_version?: string;
};

export type PipelineExtensionEndpointAuthorization = {
  parameters?: Record<string, unknown>;
  scheme?: string;
};

export type PipelineExtensionEndpoint = {
  authorization?: PipelineExtensionEndpointAuthorization;
  uuid?: string;
  url?: string;
  name?: string;
  project_uuid?: string;
  region_name?: string;
  data?: Record<string, unknown>;
  module_id?: string;
  created_by?: {
    user_id?: string;
    username?: string;
  };
};

export function normalizePipelineExtensionModule(module: PipelineExtensionModule) {
  return {
    id: module.id ?? 0,
    moduleId: module.module_id ?? "",
    name: module.name ?? "",
    ...(typeof module.description === "string" ? { description: module.description } : {}),
    ...(typeof module.location === "string" ? { location: module.location } : {}),
    ...(typeof module.type === "string" ? { type: module.type } : {}),
    ...(typeof module.version === "string" ? { version: module.version } : {}),
    ...(typeof module.publisher === "string" ? { publisher: module.publisher } : {}),
    ...(typeof module.base_url === "string" ? { baseUrl: module.base_url } : {}),
    tags: module.tags ?? [],
    ...(typeof module.url_relative === "string"
      ? { urlRelative: module.url_relative }
      : {}),
    ...(typeof module.manifest_version === "string"
      ? { manifestVersion: module.manifest_version }
      : {}),
    ...(module.properties ? { properties: module.properties } : {}),
    ...(module.properties_list ? { propertiesList: module.properties_list } : {})
  };
}

export function normalizePipelineExtensionEndpoint(endpoint: PipelineExtensionEndpoint) {
  return {
    id: endpoint.uuid ?? "",
    uuid: endpoint.uuid ?? "",
    projectId: endpoint.project_uuid ?? "",
    name: endpoint.name ?? "",
    ...(typeof endpoint.url === "string" ? { url: endpoint.url } : {}),
    ...(typeof endpoint.region_name === "string"
      ? { regionName: endpoint.region_name }
      : {}),
    ...(typeof endpoint.module_id === "string" ? { moduleId: endpoint.module_id } : {}),
    ...(endpoint.authorization ? { authorization: endpoint.authorization } : {}),
    ...(endpoint.data ? { data: endpoint.data } : {}),
    ...(endpoint.created_by
      ? {
          createdBy: {
            username: endpoint.created_by.username,
            userId: endpoint.created_by.user_id
          }
        }
      : {})
  };
}
