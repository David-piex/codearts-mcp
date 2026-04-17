import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetExcelReportStatusInput } from "../schemas.js";

export function mapGovernExcelReportStatus(input: { id: string; status?: string }) {
  return asItemResult(`Loaded govern excel report status ${input.id}`, {
    id: input.id,
    status: input.status
  });
}

type GovernGetExcelReportStatusClient = {
  getExcelReportStatus: (input: { project_id: string; task_id: string }) => Promise<{ id: string; status?: string }>;
};

export function createGovernGetExcelReportStatusHandler(client: GovernGetExcelReportStatusClient) {
  return async (input: unknown) => {
    const parsed = governGetExcelReportStatusInput.parse(input);
    const result = mapGovernExcelReportStatus(await client.getExcelReportStatus(parsed));
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
