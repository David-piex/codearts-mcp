import { asItemResult } from "../../../contracts/tool-result.js";
import { deployRetryV4DeployRecordInput } from "../schemas.js";
import { resolveV4RecordDryRunPreview } from "./v4-record-dry-run.js";

export function previewRetryV4DeployRecord(input: {
  project_id: string;
  record_id: string;
  dry_run: boolean;
  preview_source?: "record_detail" | "local_fallback";
  record_detail_available?: boolean;
  warning?: string;
}) {
  const fallbackSuffix =
    input.preview_source === "local_fallback" ? " (local preview only)" : "";
  return asItemResult(
    `${input.dry_run ? "Dry run" : "Executed"}: retry v4 deploy record ${input.record_id}${fallbackSuffix}`,
    {
      projectId: input.project_id,
      recordId: input.record_id,
      executed: !input.dry_run,
      previewSource: input.preview_source,
      recordDetailAvailable: input.record_detail_available,
      warning: input.warning
    }
  );
}

type DeployRetryV4DeployRecordClient = {
  getV4DeployRecord: (input: {
    project_id: string;
    record_id: string;
    step_id?: string;
  }) => Promise<{ project_id: string; record_id: string; step_id?: string; raw: unknown }>;
  retryV4DeployRecord: (input: {
    project_id: string;
    record_id: string;
    body?: Record<string, unknown>;
  }) => Promise<{ project_id: string; record_id: string; status?: string; raw: unknown }>;
};

export function createDeployRetryV4DeployRecordHandler(client: DeployRetryV4DeployRecordClient) {
  return async (input: unknown) => {
    const parsed = deployRetryV4DeployRecordInput.parse(input);

    if (parsed.dry_run) {
      const previewMeta = await resolveV4RecordDryRunPreview(() =>
        client.getV4DeployRecord({
          project_id: parsed.project_id,
          record_id: parsed.record_id
        })
      );
      const result = previewRetryV4DeployRecord({
        ...parsed,
        preview_source: previewMeta.previewSource,
        record_detail_available: previewMeta.recordDetailAvailable,
        warning: previewMeta.warning
      });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.retryV4DeployRecord(parsed);
    const result = asItemResult(
      `Retried v4 deploy record ${response.record_id}`,
      {
        projectId: response.project_id,
        recordId: response.record_id,
        status: response.status,
        executed: true
      },
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
