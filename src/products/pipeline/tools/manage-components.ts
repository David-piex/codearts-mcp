import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineCreateComponentInput, pipelineUpdateComponentInput } from "../schemas.js";

export function previewCreatePipelineComponent(input: {
  cloud_project_id: string;
  name: string;
  type: string;
  parent_id?: string | null;
  desc?: string;
  repos: Array<Record<string, unknown>>;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline component ${input.name}`, {
    cloudProjectId: input.cloud_project_id,
    name: input.name,
    type: input.type,
    parentId: input.parent_id,
    description: input.desc,
    repoCount: input.repos.length,
    executed: !input.dry_run
  });
}

export function mapCreatedPipelineComponent(input: {
  cloud_project_id: string;
  item: Record<string, unknown>;
  raw: Record<string, unknown>;
}) {
  const componentId = typeof input.item.id === "string" ? input.item.id : undefined;
  const name = typeof input.item.name === "string" ? input.item.name : undefined;

  return asItemResult(`Created pipeline component ${name ?? componentId ?? ""}`.trim(), {
    id: componentId,
    cloudProjectId: input.cloud_project_id,
    componentId,
    name,
    type: input.item.type,
    description: input.item.description,
    status: input.item.status,
    executed: true
  }, input.raw);
}

export function previewUpdatePipelineComponent(input: {
  cloud_project_id: string;
  component_id: string;
  desc?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline component ${input.component_id}`, {
    cloudProjectId: input.cloud_project_id,
    componentId: input.component_id,
    description: input.desc,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineComponent(input: {
  cloud_project_id: string;
  component_id: string;
  item: Record<string, unknown>;
  raw: Record<string, unknown>;
}) {
  const componentId =
    typeof input.item.id === "string" ? input.item.id : input.component_id;
  const name = typeof input.item.name === "string" ? input.item.name : undefined;

  return asItemResult(`Updated pipeline component ${componentId}`, {
    id: componentId,
    cloudProjectId: input.cloud_project_id,
    componentId,
    name,
    type: input.item.type,
    description: input.item.description,
    status: input.item.status,
    executed: true
  }, input.raw);
}

type PipelineComponentWriteClient = {
  createComponent: (input: Omit<ReturnType<typeof pipelineCreateComponentInput.parse>, "dry_run">) => Promise<{
    item: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
  updateComponent: (input: Omit<ReturnType<typeof pipelineUpdateComponentInput.parse>, "dry_run">) => Promise<{
    item: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
};

export function createPipelineCreateComponentHandler(client: PipelineComponentWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateComponentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePipelineComponent(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.createComponent(parsed);
    const result = mapCreatedPipelineComponent({
      cloud_project_id: parsed.cloud_project_id,
      item: response.item,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineUpdateComponentHandler(client: PipelineComponentWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateComponentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineComponent(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.updateComponent(parsed);
    const result = mapUpdatedPipelineComponent({
      cloud_project_id: parsed.cloud_project_id,
      component_id: parsed.component_id,
      item: response.item,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
