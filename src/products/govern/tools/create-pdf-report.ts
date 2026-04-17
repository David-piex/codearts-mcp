import { asItemResult } from "../../../contracts/tool-result.js";
import { governCreatePdfReportInput } from "../schemas.js";

export function previewGovernCreatePdfReport(input: { project_id: string; task_id: string; dry_run: boolean }) {
  const mode = input.dry_run ? "Dry run" : "Executed";
  return asItemResult(`${mode}: create govern pdf report ${input.task_id}`, {
    id: input.task_id,
    projectId: input.project_id,
    executed: !input.dry_run
  });
}

export function mapGovernCreatedPdfReport(input: { id: string; result?: string }) {
  return asItemResult(`Created govern pdf report ${input.id}`, {
    id: input.id,
    result: input.result,
    executed: true
  });
}

type GovernCreatePdfReportClient = {
  createPdfReport: (input: { project_id: string; task_id: string }) => Promise<{ id: string; result?: string }>;
};

export function createGovernCreatePdfReportHandler(client: GovernCreatePdfReportClient) {
  return async (input: unknown) => {
    const parsed = governCreatePdfReportInput.parse(input);
    if (parsed.dry_run) {
      const result = previewGovernCreatePdfReport(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const result = mapGovernCreatedPdfReport(await client.createPdfReport(parsed));
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
