import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetStrategyInput } from "../schemas.js";

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

function normalizeRuleInstances(ruleInstances?: PipelineRule[]) {
  return (ruleInstances ?? []).map((rule) => {
    const normalizedContent = normalizeContent(rule.content);

    return {
      id: rule.id ?? "",
      name: rule.name ?? "",
      ...(rule.type ? { type: rule.type } : {}),
      ...(typeof rule.is_valid === "boolean" ? { isValid: rule.is_valid } : {}),
      ...(rule.version ? { version: rule.version } : {}),
      ...(rule.plugin_id ? { pluginId: rule.plugin_id } : {}),
      ...(rule.plugin_name ? { pluginName: rule.plugin_name } : {}),
      ...(rule.plugin_version ? { pluginVersion: rule.plugin_version } : {}),
      ...(rule.creator ? { creator: rule.creator } : {}),
      ...(rule.create_time ? { createTime: rule.create_time } : {}),
      ...(rule.updater ? { updater: rule.updater } : {}),
      ...(rule.update_time ? { updateTime: rule.update_time } : {}),
      ...(normalizedContent.length > 0 ? { content: normalizedContent } : {})
    };
  });
}

export function mapPipelineStrategyDetail(input: PipelineStrategy) {
  return asItemResult(`Loaded pipeline strategy ${input.name ?? input.id ?? ""}`, {
    id: input.id ?? "",
    name: input.name ?? "",
    type: input.type,
    version: input.version,
    creator: input.creator,
    createTime: input.create_time,
    updater: input.updater,
    updateTime: input.update_time,
    isValid: input.is_valid,
    level: input.level,
    isPublic: input.is_public,
    ...(typeof input.is_legacy === "boolean" ? { isLegacy: input.is_legacy } : {}),
    ruleInstances: normalizeRuleInstances(input.rule_instances)
  });
}

type PipelineGetStrategyClient = {
  getStrategy: (input: {
    domain_id: string;
    rule_set_id: string;
    cloud_project_id?: string;
  }) => Promise<PipelineStrategy>;
};

export function createPipelineGetStrategyHandler(client: PipelineGetStrategyClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetStrategyInput.parse(input);
    const response = await client.getStrategy(parsed);
    const result = mapPipelineStrategyDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
