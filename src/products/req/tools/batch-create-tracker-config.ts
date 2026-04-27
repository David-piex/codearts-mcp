import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchCreateTrackerConfigInput } from "../schemas.js";
import { mapStatusMutationResult, type ReqStatusConfig } from "./status-config-mappers.js";

export function previewBatchCreateTrackerConfig(input: {
  project_id: string;
  tracker_id: number;
  status_config_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: bind ${input.status_config_ids.length} status configs to tracker ${input.tracker_id}`, {
    projectId: input.project_id,
    trackerId: input.tracker_id,
    statusConfigIds: input.status_config_ids,
    executed: false
  });
}

type ReqBatchCreateTrackerConfigClient = {
  batchCreateTrackerConfig: (input: {
    project_id: string;
    tracker_id: number;
    status_config_ids: string[];
  }) => Promise<{
    status?: string;
    result?: {
      issueStatusConfigs?: ReqStatusConfig[];
    };
  }>;
};

export function createReqBatchCreateTrackerConfigHandler(
  client: ReqBatchCreateTrackerConfigClient
) {
  return async (input: unknown) => {
    const parsed = reqBatchCreateTrackerConfigInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchCreateTrackerConfig(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchCreateTrackerConfig(parsed);
    const result = mapStatusMutationResult(
      `Bound ${parsed.status_config_ids.length} status configs to tracker ${parsed.tracker_id}`,
      {
        project_id: parsed.project_id,
        tracker_id: parsed.tracker_id,
        status: response.status,
        statuses: response.result?.issueStatusConfigs
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
