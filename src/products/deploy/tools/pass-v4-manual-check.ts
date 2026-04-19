import { asItemResult } from "../../../contracts/tool-result.js";
import { deployPassV4ManualCheckInput } from "../schemas.js";
import { resolveV4RecordDryRunPreview } from "./v4-record-dry-run.js";

export function previewPassV4ManualCheck(input: {
  project_id: string;
  record_id: string;
  step_id: string;
  dry_run: boolean;
  preview_source?: "record_detail" | "local_fallback";
  record_detail_available?: boolean;
  warning?: string;
}) {
  const fallbackSuffix =
    input.preview_source === "local_fallback" ? " (local preview only)" : "";
  return asItemResult(
    `${input.dry_run ? "Dry run" : "Executed"}: pass manual check ${input.record_id}/${input.step_id}${fallbackSuffix}`,
    {
      projectId: input.project_id,
      recordId: input.record_id,
      stepId: input.step_id,
      executed: !input.dry_run,
      previewSource: input.preview_source,
      recordDetailAvailable: input.record_detail_available,
      warning: input.warning
    }
  );
}

type DeployPassV4ManualCheckClient = {
  getV4DeployRecord: (input: {
    project_id: string;
    record_id: string;
    step_id?: string;
  }) => Promise<{ project_id: string; record_id: string; step_id?: string; raw: unknown }>;
  passV4ManualCheck: (input: {
    project_id: string;
    record_id: string;
    step_id: string;
  }) => Promise<{ project_id: string; record_id: string; step_id: string; status?: string; raw: unknown }>;
};

export function createDeployPassV4ManualCheckHandler(client: DeployPassV4ManualCheckClient) {
  return async (input: unknown) => {
    const parsed = deployPassV4ManualCheckInput.parse(input);

    if (parsed.dry_run) {
      const previewMeta = await resolveV4RecordDryRunPreview(() =>
        client.getV4DeployRecord({
          project_id: parsed.project_id,
          record_id: parsed.record_id,
          step_id: parsed.step_id
        })
      );
      const result = previewPassV4ManualCheck({
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

    const response = await client.passV4ManualCheck(parsed);
    const result = asItemResult(
      `Passed manual check ${response.record_id}/${response.step_id}`,
      {
        projectId: response.project_id,
        recordId: response.record_id,
        stepId: response.step_id,
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
