import { asItemResult } from "../../../contracts/tool-result.js";
import { governCreateTaskInput } from "../schemas.js";

export function previewGovernCreateTask(input: {
  project_id: string;
  file_path: string;
  file_name: string;
  file_size: number;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: create govern task ${input.file_name}`, {
    projectId: input.project_id,
    filePath: input.file_path,
    fileName: input.file_name,
    fileSize: input.file_size,
    executed: !input.dry_run
  });
}

export function mapGovernCreatedTask(input: {
  id: string;
  file_path: string;
  file_name: string;
  file_size: number;
}) {
  return asItemResult(`Created govern task ${input.id}`, {
    id: input.id,
    filePath: input.file_path,
    fileName: input.file_name,
    fileSize: input.file_size,
    executed: true
  });
}

type GovernCreateTaskClient = {
  createTask: (input: {
    project_id: string;
    file_path: string;
    file_name: string;
    file_size: number;
  }) => Promise<{
    id: string;
    file_path: string;
    file_name: string;
    file_size: number;
  }>;
};

export function createGovernCreateTaskHandler(client: GovernCreateTaskClient) {
  return async (input: unknown) => {
    const parsed = governCreateTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = previewGovernCreateTask(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTask(parsed);
    const result = mapGovernCreatedTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
