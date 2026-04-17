import { asItemResult } from "../../../contracts/tool-result.js";
import { governCreateTaskMultipartFileInput } from "../schemas.js";

export function previewGovernCreateTaskMultipartFile(input: {
  project_id: string;
  file_path: string;
  file_name: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: create govern multipart task ${input.file_name}`, {
    projectId: input.project_id,
    filePath: input.file_path,
    fileName: input.file_name,
    executed: !input.dry_run
  });
}

export function mapGovernCreatedTaskMultipartFile(input: {
  file_path: string;
  file_name: string;
  upload_id: string;
}) {
  return asItemResult(`Prepared govern multipart upload ${input.upload_id}`, {
    filePath: input.file_path,
    fileName: input.file_name,
    uploadId: input.upload_id,
    executed: true
  });
}

type GovernCreateTaskMultipartFileClient = {
  createMultipartTask: (input: {
    project_id: string;
    file_path: string;
    file_name: string;
  }) => Promise<{
    file_path: string;
    file_name: string;
    upload_id: string;
  }>;
};

export function createGovernCreateTaskMultipartFileHandler(client: GovernCreateTaskMultipartFileClient) {
  return async (input: unknown) => {
    const parsed = governCreateTaskMultipartFileInput.parse(input);

    if (parsed.dry_run) {
      const result = previewGovernCreateTaskMultipartFile(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createMultipartTask(parsed);
    const result = mapGovernCreatedTaskMultipartFile(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
