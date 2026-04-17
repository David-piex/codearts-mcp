import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { asItemResult } from "../../../contracts/tool-result.js";
import { governDownloadPdfReportInput } from "../schemas.js";

export function previewGovernDownloadPdfReport(input: {
  project_id: string;
  task_id: string;
  local_output: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";
  return asItemResult(`${mode}: download govern pdf report ${input.task_id}`, {
    id: input.task_id,
    projectId: input.project_id,
    localOutput: input.local_output,
    executed: !input.dry_run
  });
}

export function mapGovernDownloadedPdfReport(input: {
  task_id: string;
  local_output: string;
  content_type?: string;
  file_name?: string;
}) {
  return asItemResult(`Downloaded govern pdf report ${input.task_id}`, {
    id: input.task_id,
    localOutput: input.local_output,
    contentType: input.content_type,
    fileName: input.file_name,
    executed: true
  });
}

type GovernDownloadPdfReportClient = {
  downloadPdfReport: (input: { project_id: string; task_id: string }) => Promise<{
    body: Uint8Array;
    content_type?: string;
    file_name?: string;
  }>;
};

export function createGovernDownloadPdfReportHandler(client: GovernDownloadPdfReportClient) {
  return async (input: unknown) => {
    const parsed = governDownloadPdfReportInput.parse(input);
    if (parsed.dry_run) {
      const result = previewGovernDownloadPdfReport(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const response = await client.downloadPdfReport(parsed);
    await mkdir(dirname(parsed.local_output), { recursive: true });
    await writeFile(parsed.local_output, response.body);
    const result = mapGovernDownloadedPdfReport({
      task_id: parsed.task_id,
      local_output: parsed.local_output,
      content_type: response.content_type,
      file_name: response.file_name
    });
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
