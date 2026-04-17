import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetPdfReportStatusInput } from "../schemas.js";

export function mapGovernPdfReportStatus(input: { id: string; status?: string }) {
  return asItemResult(`Loaded govern pdf report status ${input.id}`, {
    id: input.id,
    status: input.status
  });
}

type GovernGetPdfReportStatusClient = {
  getPdfReportStatus: (input: { project_id: string; task_id: string }) => Promise<{ id: string; status?: string }>;
};

export function createGovernGetPdfReportStatusHandler(client: GovernGetPdfReportStatusClient) {
  return async (input: unknown) => {
    const parsed = governGetPdfReportStatusInput.parse(input);
    const result = mapGovernPdfReportStatus(await client.getPdfReportStatus(parsed));
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
