import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateIgnoreFilesInput } from "../schemas.js";

type IgnoreFileNode = {
  name?: string;
  file_path?: string;
  is_leaf?: boolean;
  checkbox_status?: "unchecked" | "all";
};

export function mapUpdatedIgnoreFiles(input: {
  task_id: string;
  nodes?: IgnoreFileNode[];
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Updated" : "Dry run: update"} Check ignore files ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    nodeCount: input.nodes?.length,
    paths: input.nodes?.map((item) => item.file_path).filter(Boolean),
    result: input.result,
    raw: input.raw,
    executed: input.executed
  });
}

type Client = {
  updateIgnoreFiles: (input: {
    task_id: string;
    nodes: IgnoreFileNode[];
  }) => Promise<{
    task_id: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateIgnoreFilesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateIgnoreFilesInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedIgnoreFiles({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateIgnoreFiles(parsed);
    const result = mapUpdatedIgnoreFiles({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
