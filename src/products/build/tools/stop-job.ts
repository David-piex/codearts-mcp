import { asItemResult } from "../../../contracts/tool-result.js";
import { buildStopJobInput } from "../schemas.js";

export function previewStopJob(input: { job_id: string; build_no: number; dry_run: boolean }) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: stop build job ${input.job_id}`, {
    id: input.job_id,
    buildNo: input.build_no,
    executed: !input.dry_run
  });
}

export function mapStopJobResult(input: { job_id: string; build_no: number; result?: boolean }) {
  return asItemResult(`Stopped build job ${input.job_id}`, {
    id: input.job_id,
    buildNo: input.build_no,
    stopped: input.result ?? false,
    executed: true
  });
}

type BuildStopJobClient = {
  stopJob: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    result?: boolean;
  }>;
};

export function createBuildStopJobHandler(client: BuildStopJobClient) {
  return async (input: unknown) => {
    const parsed = buildStopJobInput.parse(input);

    if (parsed.dry_run) {
      const result = previewStopJob(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.stopJob(parsed);
    const result = mapStopJobResult(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
