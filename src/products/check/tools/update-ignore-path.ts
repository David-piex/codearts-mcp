import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateIgnorePathInput } from "../schemas.js";

type IgnorePathSetting = {
  file_path: string;
  checkbox_status: "unchecked" | "all" | "half";
};

function mapUpdatedIgnorePath(input: {
  project_id: string;
  task_id: string;
  ignore_path_settings: IgnorePathSetting[];
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Updated" : "Dry run: update"} Check ignore path ${input.task_id}`, {
    id: input.task_id,
    projectId: input.project_id,
    taskId: input.task_id,
    pathCount: input.ignore_path_settings.length,
    paths: input.ignore_path_settings.map((item) => item.file_path),
    requestBody: { ignore_path_settings: input.ignore_path_settings },
    status: input.status,
    result: input.result,
    raw: input.raw,
    executed: input.executed
  });
}

type Client = {
  updateIgnorePath: (input: {
    project_id: string;
    task_id: string;
    ignore_path_settings: IgnorePathSetting[];
  }) => Promise<{
    project_id: string;
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateIgnorePathHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateIgnorePathInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedIgnorePath({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateIgnorePath(parsed);
    const result = mapUpdatedIgnorePath({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
