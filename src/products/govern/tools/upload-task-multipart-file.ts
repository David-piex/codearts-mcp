import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { asItemResult } from "../../../contracts/tool-result.js";
import { governUploadTaskMultipartFileInput } from "../schemas.js";

export function previewGovernUploadTaskMultipartFile(input: {
  project_id: string;
  file_path: string;
  file_name: string;
  upload_id: string;
  part_number: number;
  part_size: number;
  local_file: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: upload govern multipart chunk ${input.part_number}`, {
    projectId: input.project_id,
    filePath: input.file_path,
    fileName: input.file_name,
    uploadId: input.upload_id,
    partNumber: input.part_number,
    partSize: input.part_size,
    localFile: input.local_file,
    executed: !input.dry_run
  });
}

export function mapGovernUploadedTaskMultipartFile(input: {
  file_path: string;
  file_name: string;
  upload_id: string;
  part_number: number;
}) {
  return asItemResult(`Uploaded govern multipart chunk ${input.part_number}`, {
    filePath: input.file_path,
    fileName: input.file_name,
    uploadId: input.upload_id,
    partNumber: input.part_number,
    executed: true
  });
}

type GovernUploadTaskMultipartFileClient = {
  uploadMultipartTask: (input: {
    project_id: string;
    file_path: string;
    file_name: string;
    upload_id: string;
    part_number: number;
    part_size: number;
    file: File;
  }) => Promise<{
    file_path: string;
    file_name: string;
    upload_id: string;
    part_number: number;
  }>;
};

export function createGovernUploadTaskMultipartFileHandler(client: GovernUploadTaskMultipartFileClient) {
  return async (input: unknown) => {
    const parsed = governUploadTaskMultipartFileInput.parse(input);

    if (parsed.dry_run) {
      const result = previewGovernUploadTaskMultipartFile(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const fileBuffer = await readFile(parsed.local_file);
    const file = new File([fileBuffer], basename(parsed.local_file));
    const response = await client.uploadMultipartTask({
      project_id: parsed.project_id,
      file_path: parsed.file_path,
      file_name: parsed.file_name,
      upload_id: parsed.upload_id,
      part_number: parsed.part_number,
      part_size: parsed.part_size,
      file
    });
    const result = mapGovernUploadedTaskMultipartFile(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
