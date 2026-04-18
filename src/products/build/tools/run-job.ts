import { asItemResult } from "../../../contracts/tool-result.js";
import { buildRunJobInput } from "../schemas.js";

export function previewRunJob(input: { job_id: string; branch?: string; dry_run: boolean }) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: run build job ${input.job_id}`, {
    id: input.job_id,
    branch: input.branch,
    executed: !input.dry_run
  });
}

export function mapRunJobResult(input: {
  job_id: string;
  record_id?: string;
  build_no?: number;
  daily_build_number?: string;
  status?: string;
}) {
  return asItemResult(`Executed build job ${input.job_id}`, {
    id: input.job_id,
    recordId: input.record_id,
    buildNo: input.build_no,
    dailyBuildNumber: input.daily_build_number,
    status: input.status,
    executed: true
  });
}

type BuildRunJobClient = {
  runJob: (input: { job_id: string; branch?: string }) => Promise<{
    job_id: string;
    record_id?: string;
    build_no?: number;
    daily_build_number?: string;
    status?: string;
  }>;
};

export function createBuildRunJobHandler(client: BuildRunJobClient) {
  return async (input: unknown) => {
    const parsed = buildRunJobInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRunJob(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.runJob(parsed);
    const result = mapRunJobResult(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
