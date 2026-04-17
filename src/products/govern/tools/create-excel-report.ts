import { asItemResult } from "../../../contracts/tool-result.js";
import { governCreateExcelReportInput } from "../schemas.js";

export function previewGovernCreateExcelReport(input: { project_id: string; task_id: string; dry_run: boolean }) {
  const mode = input.dry_run ? "Dry run" : "Executed";
  return asItemResult(`${mode}: create govern excel report ${input.task_id}`, {
    id: input.task_id,
    projectId: input.project_id,
    executed: !input.dry_run
  });
}

export function mapGovernCreatedExcelReport(input: { id: string; result?: string }) {
  return asItemResult(`Created govern excel report ${input.id}`, {
    id: input.id,
    result: input.result,
    executed: true
  });
}

type GovernCreateExcelReportClient = {
  createExcelReport: (input: { project_id: string; task_id: string }) => Promise<{ id: string; result?: string }>;
};

export function createGovernCreateExcelReportHandler(client: GovernCreateExcelReportClient) {
  return async (input: unknown) => {
    const parsed = governCreateExcelReportInput.parse(input);
    if (parsed.dry_run) {
      const result = previewGovernCreateExcelReport(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const result = mapGovernCreatedExcelReport(await client.createExcelReport(parsed));
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
