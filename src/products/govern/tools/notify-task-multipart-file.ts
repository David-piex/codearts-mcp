import { asItemResult } from "../../../contracts/tool-result.js";
import { governNotifyTaskMultipartFileInput } from "../schemas.js";

export function previewGovernNotifyTaskMultipartFile(input: {
  project_id: string;
  file_path: string;
  file_name: string;
  upload_id: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: notify govern multipart task ${input.upload_id}`, {
    projectId: input.project_id,
    filePath: input.file_path,
    fileName: input.file_name,
    uploadId: input.upload_id,
    executed: !input.dry_run
  });
}

export function mapGovernNotifiedTaskMultipartFile(input: {
  file_path: string;
  file_name: string;
  upload_id: string;
}) {
  return asItemResult(`Notified govern multipart upload ${input.upload_id}`, {
    filePath: input.file_path,
    fileName: input.file_name,
    uploadId: input.upload_id,
    executed: true
  });
}

type GovernNotifyTaskMultipartFileClient = {
  notifyMultipartTask: (input: {
    project_id: string;
    file_path: string;
    file_name: string;
    upload_id: string;
  }) => Promise<{
    file_path: string;
    file_name: string;
    upload_id: string;
  }>;
};

export function createGovernNotifyTaskMultipartFileHandler(client: GovernNotifyTaskMultipartFileClient) {
  return async (input: unknown) => {
    const parsed = governNotifyTaskMultipartFileInput.parse(input);

    if (parsed.dry_run) {
      const result = previewGovernNotifyTaskMultipartFile(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.notifyMultipartTask(parsed);
    const result = mapGovernNotifiedTaskMultipartFile(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
