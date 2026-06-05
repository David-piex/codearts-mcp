import { asItemResult } from "../../../contracts/tool-result.js";
import {
  pipelineCreateComponentInput,
  pipelineDeleteComponentInput,
  pipelineFollowComponentInput,
  pipelineUnfollowComponentInput,
  pipelineUpdateComponentInput,
  pipelineUpdateComponentReposInput
} from "../schemas.js";

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

export function previewUpdatePipelineComponentRepos(input: {
  cloud_project_id: string;
  component_id: string;
  repos: Array<Record<string, unknown>>;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline component repos ${input.component_id}`, {
    cloudProjectId: input.cloud_project_id,
    componentId: input.component_id,
    repoCount: input.repos.length,
    executed: !input.dry_run
  });
}

export function previewFollowPipelineComponent(input: {
  cloud_project_id: string;
  component_id: string;
  favorite: boolean;
  dry_run: boolean;
}) {
  return asItemResult(
    `Dry run: ${input.favorite ? "follow" : "unfollow"} pipeline component ${input.component_id}`,
    {
      cloudProjectId: input.cloud_project_id,
      componentId: input.component_id,
      favorite: input.favorite,
      executed: !input.dry_run
    }
  );
}

export function previewDeletePipelineComponent(input: {
  cloud_project_id: string;
  component_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete pipeline component ${input.component_id}`, {
    cloudProjectId: input.cloud_project_id,
    componentId: input.component_id,
    deleted: false,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineComponentFavorite(input: {
  cloud_project_id: string;
  component_id: string;
  favorite: boolean;
  raw: Record<string, unknown>;
}) {
  return asItemResult(
    `${input.favorite ? "Followed" : "Unfollowed"} pipeline component ${input.component_id}`,
    {
      id: input.component_id,
      cloudProjectId: input.cloud_project_id,
      componentId: input.component_id,
      favorite: input.favorite,
      executed: true
    },
    input.raw
  );
}

export function mapDeletedPipelineComponent(input: {
  cloud_project_id: string;
  component_id: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Deleted pipeline component ${input.component_id}`, {
    id: input.component_id,
    cloudProjectId: input.cloud_project_id,
    componentId: input.component_id,
    deleted: true,
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
  updateComponentRepos: (input: Omit<ReturnType<typeof pipelineUpdateComponentReposInput.parse>, "dry_run">) => Promise<{
    item: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
  followComponent: (input: Omit<ReturnType<typeof pipelineFollowComponentInput.parse>, "dry_run">) => Promise<{
    component_id: string;
    favorite: boolean;
    raw: Record<string, unknown>;
  }>;
  unfollowComponent: (input: Omit<ReturnType<typeof pipelineUnfollowComponentInput.parse>, "dry_run">) => Promise<{
    component_id: string;
    favorite: boolean;
    raw: Record<string, unknown>;
  }>;
  deleteComponent: (input: Omit<ReturnType<typeof pipelineDeleteComponentInput.parse>, "dry_run">) => Promise<{
    component_id: string;
    deleted: boolean;
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

export function createPipelineUpdateComponentReposHandler(client: PipelineComponentWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateComponentReposInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineComponentRepos(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.updateComponentRepos(parsed);
    const result = mapUpdatedPipelineComponent({
      cloud_project_id: parsed.cloud_project_id,
      component_id: parsed.component_id,
      item: response.item,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineFollowComponentHandler(client: PipelineComponentWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineFollowComponentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewFollowPipelineComponent({ ...parsed, favorite: true });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.followComponent(parsed);
    const result = mapUpdatedPipelineComponentFavorite({
      cloud_project_id: parsed.cloud_project_id,
      component_id: response.component_id ?? parsed.component_id,
      favorite: response.favorite,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineUnfollowComponentHandler(client: PipelineComponentWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineUnfollowComponentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewFollowPipelineComponent({ ...parsed, favorite: false });
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.unfollowComponent(parsed);
    const result = mapUpdatedPipelineComponentFavorite({
      cloud_project_id: parsed.cloud_project_id,
      component_id: response.component_id ?? parsed.component_id,
      favorite: response.favorite,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}

export function createPipelineDeleteComponentHandler(client: PipelineComponentWriteClient) {
  return async (input: unknown) => {
    const parsed = pipelineDeleteComponentInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePipelineComponent(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.deleteComponent(parsed);
    const result = mapDeletedPipelineComponent({
      cloud_project_id: parsed.cloud_project_id,
      component_id: response.component_id ?? parsed.component_id,
      raw: response.raw
    });

    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
