import { pipelineGetProjectStrategyInput } from "../schemas.js";
import { mapPipelineStrategyDetail } from "./get-strategy.js";

type PipelineRuleProperty = {
  key?: string;
  type?: string;
  name?: string;
  operator?: string;
  value?: string;
  value_type?: string;
  is_valid?: boolean;
};

type PipelineRuleContent = {
  group_name?: string;
  can_modify_when_inherit?: boolean;
  editable?: boolean;
  properties?: PipelineRuleProperty[];
};

type PipelineRule = {
  id?: string;
  type?: string;
  name?: string;
  is_valid?: boolean;
  version?: string;
  plugin_id?: string;
  plugin_name?: string;
  plugin_version?: string;
  creator?: string;
  create_time?: string;
  updater?: string;
  update_time?: string;
  content?: PipelineRuleContent[];
};

type PipelineStrategy = {
  id?: string;
  name?: string;
  type?: string;
  version?: string;
  creator?: string;
  create_time?: string;
  updater?: string;
  update_time?: string;
  is_valid?: boolean;
  level?: string;
  is_public?: boolean;
  is_legacy?: boolean;
  rule_instances?: PipelineRule[];
};

export function mapProjectPipelineStrategyDetail(input: PipelineStrategy) {
  return mapPipelineStrategyDetail(input);
}

type PipelineGetProjectStrategyClient = {
  getProjectStrategy: (input: { project_id: string; rule_set_id: string }) => Promise<PipelineStrategy>;
};

export function createPipelineGetProjectStrategyHandler(
  client: PipelineGetProjectStrategyClient
) {
  return async (input: unknown) => {
    const parsed = pipelineGetProjectStrategyInput.parse(input);
    const response = await client.getProjectStrategy(parsed);
    const result = mapProjectPipelineStrategyDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
