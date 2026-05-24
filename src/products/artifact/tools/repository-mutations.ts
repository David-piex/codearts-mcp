import { asItemResult } from "../../../contracts/tool-result.js";
import {
  artifactCreateRepositoryInput,
  artifactDeleteTrashRepositoriesInput,
  artifactRestoreTrashRepositoriesInput,
  artifactUpdateRepositoryInput
} from "../schemas.js";

type MutationResponse = {
  status?: string;
  trace_id?: string;
  raw: unknown;
};

type Client = {
  createRepository: (input: {
    format: string;
    type: string;
    repository_name: string;
    includes_pattern: string;
    project_id?: string;
    description?: string;
    share_right?: string;
    params?: Record<string, unknown>;
  }) => Promise<MutationResponse>;
  updateRepository: (input: {
    repo_name: string;
    format: string;
    repository_ids: string[];
    includes_pattern: string;
    description?: string;
    deployment_policy?: string;
    auto_clean_snapshot?: boolean;
    snapshot_alive_days?: string;
    params?: Record<string, unknown>;
  }) => Promise<MutationResponse>;
  restoreTrashRepositories: (input: { items: Array<Record<string, unknown>> }) => Promise<MutationResponse>;
  deleteTrashRepositories: (input: { items: Array<Record<string, unknown>> }) => Promise<MutationResponse>;
};

function mutationResult(summary: string, item: Record<string, unknown>) {
  return {
    content: [{ type: "text" as const, text: summary }],
    structuredContent: asItemResult(summary, item)
  };
}

function mapMutation(summary: string, response: MutationResponse, extra: Record<string, unknown>) {
  return mutationResult(summary, {
    ...extra,
    status: response.status,
    traceId: response.trace_id,
    raw: response.raw,
    executed: true
  });
}

export function createArtifactCreateRepositoryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactCreateRepositoryInput.parse(input);
    const preview = {
      repositoryName: parsed.repository_name,
      format: parsed.format,
      type: parsed.type,
      projectId: parsed.project_id,
      includesPattern: parsed.includes_pattern,
      executed: !parsed.dry_run
    };

    if (parsed.dry_run) {
      return mutationResult(`Dry run: create Artifact repository ${parsed.repository_name}`, preview);
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.createRepository(request);
    return mapMutation(`Created Artifact repository ${parsed.repository_name}`, response, preview);
  };
}

export function createArtifactUpdateRepositoryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactUpdateRepositoryInput.parse(input);
    const preview = {
      repositoryName: parsed.repo_name,
      format: parsed.format,
      repositoryIds: parsed.repository_ids,
      includesPattern: parsed.includes_pattern,
      executed: !parsed.dry_run
    };

    if (parsed.dry_run) {
      return mutationResult(`Dry run: update Artifact repository ${parsed.repo_name}`, preview);
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const response = await client.updateRepository(request);
    return mapMutation(`Updated Artifact repository ${parsed.repo_name}`, response, preview);
  };
}

export function createArtifactRestoreTrashRepositoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactRestoreTrashRepositoriesInput.parse(input);
    const preview = {
      count: parsed.items.length,
      repositoryIds: parsed.items.map((item) => item.id),
      executed: !parsed.dry_run
    };

    if (parsed.dry_run) {
      return mutationResult(`Dry run: restore ${parsed.items.length} Artifact trash repositories`, preview);
    }

    const response = await client.restoreTrashRepositories({ items: parsed.items });
    return mapMutation(`Restored ${parsed.items.length} Artifact trash repositories`, response, preview);
  };
}

export function createArtifactDeleteTrashRepositoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactDeleteTrashRepositoriesInput.parse(input);
    const preview = {
      count: parsed.items.length,
      repositoryIds: parsed.items.map((item) => item.id),
      executed: !parsed.dry_run
    };

    if (parsed.dry_run) {
      return mutationResult(`Dry run: permanently delete ${parsed.items.length} Artifact trash repositories`, preview);
    }

    const response = await client.deleteTrashRepositories({ items: parsed.items });
    return mapMutation(`Deleted ${parsed.items.length} Artifact trash repositories permanently`, response, preview);
  };
}
