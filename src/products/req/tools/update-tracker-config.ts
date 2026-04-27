import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateTrackerConfigInput } from "../schemas.js";
import { mapStatusMutationResult } from "./status-config-mappers.js";

export function previewUpdateTrackerConfig(input: {
  project_id: string;
  tracker_id: number;
  status_config_id: string;
  new_position: number;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update tracker ${input.tracker_id} status config ${input.status_config_id}`, {
    projectId: input.project_id,
    trackerId: input.tracker_id,
    statusConfigId: input.status_config_id,
    newPosition: input.new_position,
    executed: false
  });
}

type ReqUpdateTrackerConfigClient = {
  updateTrackerConfig: (input: {
    project_id: string;
    tracker_id: number;
    status_config_id: string;
    new_position: number;
  }) => Promise<{
    status?: string;
  }>;
};

export function createReqUpdateTrackerConfigHandler(client: ReqUpdateTrackerConfigClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateTrackerConfigInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateTrackerConfig(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTrackerConfig(parsed);
    const result = mapStatusMutationResult(
      `Updated tracker ${parsed.tracker_id} status config ${parsed.status_config_id}`,
      {
        project_id: parsed.project_id,
        tracker_id: parsed.tracker_id,
        status: response.status
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
