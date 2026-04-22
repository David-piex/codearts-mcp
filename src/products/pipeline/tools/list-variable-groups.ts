import { asListResult } from "../../../contracts/tool-result.js";
import {
  pipelineListPipelineVariableGroupsInput,
  pipelineListVariableGroupsInput
} from "../schemas.js";

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

function normalizePipelineVariableGroup(projectId: string, input: PipelineVariableGroup) {
  return {
    id: input.id ?? "",
    projectId: input.project_id ?? projectId,
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
  };
}

export function mapPipelineVariableGroupsForPipeline(
  projectId: string,
  pipelineId: string,
  groups: PipelineVariableGroup[]
) {
  return asListResult(
    `Loaded ${groups.length} pipeline variable groups for ${pipelineId}`,
    groups.map((group) => ({
      ...normalizePipelineVariableGroup(projectId, group),
      pipelineId
    })),
    {
      page: 1,
      pageSize: groups.length,
      total: groups.length
    }
  );
}

export function mapPipelineVariableGroupList(
  projectId: string,
  groups: PipelineVariableGroup[],
  page: {
    page: number;
    page_size: number;
    total?: number;
  }
) {
  return asListResult(
    `Loaded ${groups.length} pipeline variable groups`,
    groups.map((group) => normalizePipelineVariableGroup(projectId, group)),
    {
      page: page.page,
      pageSize: page.page_size,
      total: page.total
    }
  );
}

type PipelineListPipelineVariableGroupsClient = {
  listPipelineVariableGroups: (input: { project_id: string; pipeline_id: string }) => Promise<{
    groups: PipelineVariableGroup[];
  }>;
};

type PipelineListVariableGroupsClient = {
  listVariableGroups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
  }) => Promise<{
    groups: PipelineVariableGroup[];
    offset: number;
    limit: number;
    total?: number;
  }>;
};

export function createPipelineListPipelineVariableGroupsHandler(
  client: PipelineListPipelineVariableGroupsClient
) {
  return async (input: unknown) => {
    const parsed = pipelineListPipelineVariableGroupsInput.parse(input);
    const response = await client.listPipelineVariableGroups(parsed);
    const result = mapPipelineVariableGroupsForPipeline(
      parsed.project_id,
      parsed.pipeline_id,
      response.groups
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createPipelineListVariableGroupsHandler(client: PipelineListVariableGroupsClient) {
  return async (input: unknown) => {
    const parsed = pipelineListVariableGroupsInput.parse(input);
    const response = await client.listVariableGroups(parsed);
    const result = mapPipelineVariableGroupList(parsed.project_id, response.groups, {
      page: parsed.page,
      page_size: parsed.page_size,
      total: response.total
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
