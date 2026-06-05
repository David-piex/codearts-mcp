import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateTaskSettingsInput } from "../schemas.js";

function mapUpdatedTaskSettings(input: {
  project_id: string;
  task_id: string;
  task_advanced_settings: Array<{ key: string; value: string }>;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Updated" : "Dry run: update"} Check task settings ${input.task_id}`,
    {
      id: input.task_id,
      projectId: input.project_id,
      taskId: input.task_id,
      taskAdvancedSettings: input.task_advanced_settings,
      status: input.status,
      result: input.result,
      raw: input.raw,
      authMode: "x_auth_token",
      executed: input.executed
    }
  );
}

type Client = {
  updateTaskSettings: (input: {
    project_id: string;
    task_id: string;
    x_auth_token: string;
    task_advanced_settings: Array<{ key: string; value: string }>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateTaskSettingsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateTaskSettingsInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedTaskSettings({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTaskSettings(parsed);
    const result = mapUpdatedTaskSettings({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
