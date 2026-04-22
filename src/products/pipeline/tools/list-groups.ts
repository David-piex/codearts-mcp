import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListGroupsInput } from "../schemas.js";

type PipelineGroup = {
  id?: string;
  project_id?: string;
  name?: string;
  parent_id?: string;
  path_id?: string;
  children?: PipelineGroup[];
};

type NormalizedPipelineGroup = {
  id: string;
  projectId: string;
  name: string;
  parentId?: string;
  pathId?: string;
  childCount: number;
  children: NormalizedPipelineGroup[];
};

function normalizeGroup(projectId: string, input: PipelineGroup): NormalizedPipelineGroup {
  const children = (input.children ?? []).map((child) => normalizeGroup(projectId, child));

  return {
    id: input.id ?? "",
    projectId,
    name: input.name ?? "",
    parentId: input.parent_id,
    pathId: input.path_id,
    childCount: children.length,
    children
  };
}

export function mapPipelineGroupList(projectId: string, groups: PipelineGroup[]) {
  const items = groups.map((group) => normalizeGroup(projectId, group));

  return asListResult(`Loaded ${items.length} pipeline groups`, items, {
    page: 1,
    pageSize: items.length,
    total: items.length
  });
}

type PipelineListGroupsClient = {
  listGroups: (input: { project_id: string }) => Promise<{
    groups: PipelineGroup[];
  }>;
};

export function createPipelineListGroupsHandler(client: PipelineListGroupsClient) {
  return async (input: unknown) => {
    const parsed = pipelineListGroupsInput.parse(input);
    const response = await client.listGroups(parsed);
    const result = mapPipelineGroupList(parsed.project_id, response.groups);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
