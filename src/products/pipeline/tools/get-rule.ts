import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetRuleInput } from "../schemas.js";

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

function normalizeContent(content?: PipelineRuleContent[]) {
  return (content ?? []).map((group) => ({
    groupName: group.group_name,
    canModifyWhenInherit: group.can_modify_when_inherit,
    editable: group.editable,
    properties: (group.properties ?? []).map((property) => ({
      key: property.key,
      type: property.type,
      name: property.name,
      operator: property.operator,
      value: property.value,
      valueType: property.value_type,
      isValid: property.is_valid
    }))
  }));
}

export function mapPipelineRuleDetail(input: PipelineRule) {
  return asItemResult(`Loaded pipeline rule ${input.name ?? input.id ?? ""}`, {
    id: input.id ?? "",
    name: input.name ?? "",
    type: input.type,
    isValid: input.is_valid,
    version: input.version,
    pluginId: input.plugin_id,
    pluginName: input.plugin_name,
    pluginVersion: input.plugin_version,
    creator: input.creator,
    createTime: input.create_time,
    updater: input.updater,
    updateTime: input.update_time,
    content: normalizeContent(input.content)
  });
}

type PipelineGetRuleClient = {
  getRule: (input: { domain_id: string; rule_id: string }) => Promise<PipelineRule>;
};

export function createPipelineGetRuleHandler(client: PipelineGetRuleClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetRuleInput.parse(input);
    const response = await client.getRule(parsed);
    const result = mapPipelineRuleDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
