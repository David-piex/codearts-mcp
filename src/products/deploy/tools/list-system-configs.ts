import { asListResult } from "../../../contracts/tool-result.js";
import { deployListSystemConfigsInput } from "../schemas.js";

export function mapDeploySystemConfigs(
  items: Array<{
    name: string;
    type?: string;
    description?: string;
    static_status?: boolean;
    pipeline_source?: string;
    pipeline_source_type?: string;
  }>
) {
  return asListResult(
    `${items.length} deploy system configs found`,
    items.map((item) => ({
      id: item.name,
      name: item.name,
      type: item.type,
      description: item.description,
      staticStatus: item.static_status,
      pipelineSource: item.pipeline_source,
      pipelineSourceType: item.pipeline_source_type
    }))
  );
}

type DeployListSystemConfigsClient = {
  listSystemConfigs: () => Promise<{
    configs: Array<{
      name: string;
      type?: string;
      description?: string;
      static_status?: boolean;
      pipeline_source?: string;
      pipeline_source_type?: string;
    }>;
  }>;
};

export function createDeployListSystemConfigsHandler(client: DeployListSystemConfigsClient) {
  return async (input: unknown) => {
    deployListSystemConfigsInput.parse(input);
    const response = await client.listSystemConfigs();
    const result = mapDeploySystemConfigs(response.configs);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
