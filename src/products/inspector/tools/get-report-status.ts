import { asItemResult } from "../../../contracts/tool-result.js";
import { inspectorGetReportStatusInput } from "../schemas.js";

export function mapInspectorReportStatus(input: {
  task_id: string;
  report_status?: string;
}) {
  return asItemResult(`Loaded inspector report status for ${input.task_id}`, {
    id: input.task_id,
    reportStatus: input.report_status
  });
}

type InspectorGetReportStatusClient = {
  getReportStatus: (input: { project_id: string; task_id: string }) => Promise<{
    task_id: string;
    report_status?: string;
  }>;
};

export function createInspectorGetReportStatusHandler(client: InspectorGetReportStatusClient) {
  return async (input: unknown) => {
    const parsed = inspectorGetReportStatusInput.parse(input);
    const response = await client.getReportStatus(parsed);
    const result = mapInspectorReportStatus(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
