import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetVariableGroupInput } from "../schemas.js";

type PipelineVariable = {
  name?: string;
  sequence?: number;
  type?: string;
  value?: string;
  is_secret?: boolean;
  description?: string;
};

type PipelineVariableGroup = {
  id?: string;
  project_id?: string;
  domain_id?: string;
  name?: string;
  description?: string;
  variables?: PipelineVariable[];
  related_pipelines?: Array<{
    pipeline_id?: string;
    pipeline_name?: string;
  }>;
  creator_id?: string;
  updater_id?: string;
  creator_name?: string;
  updater_name?: string;
  create_time?: number;
  update_time?: number;
};

function normalizeVariables(variables?: PipelineVariable[]) {
  return (variables ?? []).map((item) => ({
    name: item.name,
    sequence: item.sequence,
    type: item.type,
    value: item.value,
    isSecret: item.is_secret,
    description: item.description
  }));
}

function normalizeRelatedPipelines(
  relatedPipelines?: Array<{
    pipeline_id?: string;
    pipeline_name?: string;
  }>
) {
  return (relatedPipelines ?? []).map((item) => ({
    pipelineId: item.pipeline_id,
    pipelineName: item.pipeline_name
  }));
}

export function mapPipelineVariableGroupDetail(input: PipelineVariableGroup) {
  return asItemResult(`Loaded pipeline variable group ${input.name ?? input.id ?? ""}`, {
    id: input.id ?? "",
    projectId: input.project_id ?? "",
    domainId: input.domain_id,
    name: input.name ?? "",
    description: input.description,
    variables: normalizeVariables(input.variables),
    relatedPipelines: normalizeRelatedPipelines(input.related_pipelines),
    creatorId: input.creator_id,
    updaterId: input.updater_id,
    creatorName: input.creator_name,
    updaterName: input.updater_name,
    createTime: input.create_time,
    updateTime: input.update_time
  });
}

type PipelineGetVariableGroupClient = {
  getVariableGroup: (input: { project_id: string; id: string }) => Promise<PipelineVariableGroup>;
};

export function createPipelineGetVariableGroupHandler(client: PipelineGetVariableGroupClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetVariableGroupInput.parse(input);
    const response = await client.getVariableGroup(parsed);
    const result = mapPipelineVariableGroupDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
