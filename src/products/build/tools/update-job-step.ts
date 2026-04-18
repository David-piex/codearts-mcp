import { AppError } from "../../../core/errors/app-error.js";
import { asItemResult } from "../../../contracts/tool-result.js";
import { buildUpdateJobStepInput } from "../schemas.js";

export function previewUpdateJobStep(input: {
  job_id: string;
  name?: string;
  step_name: string;
  image?: string;
  command?: string;
  pre_condition?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: update build job step ${input.step_name}`, {
    id: input.job_id,
    name: input.name,
    stepName: input.step_name,
    image: input.image,
    command: input.command,
    preCondition: input.pre_condition,
    executed: !input.dry_run
  });
}

export function mapUpdatedJobStep(input: {
  job_id: string;
  name: string;
  updated_step_name: string;
  image?: string;
  command?: string;
  pre_condition?: string;
}) {
  return asItemResult(`Updated build job ${input.name} step ${input.updated_step_name}`, {
    id: input.job_id,
    name: input.name,
    stepName: input.updated_step_name,
    image: input.image,
    command: input.command,
    preCondition: input.pre_condition,
    executed: true
  });
}

type BuildUpdateJobStepClient = {
  getJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    name: string;
    steps: Array<{
      name?: string;
      image?: string;
      command?: string;
      pre_condition?: string;
    }>;
  }>;
  updateJobStep: (input: {
    job_id: string;
    step_name: string;
    image?: string;
    command?: string;
    pre_condition?: string;
  }) => Promise<{
    job_id: string;
    name: string;
    updated_step_name: string;
    image?: string;
    command?: string;
    pre_condition?: string;
  }>;
};

function buildPreviewPlan(input: {
  job_id: string;
  step_name: string;
  image?: string;
  command?: string;
  pre_condition?: string;
}, job: {
  job_id: string;
  name: string;
  steps: Array<{
    name?: string;
    image?: string;
    command?: string;
    pre_condition?: string;
  }>;
}) {
  const targetStep = job.steps.find((step) => step.name === input.step_name);

  if (!targetStep?.name) {
    throw new AppError(
      "not_found",
      `Build step ${input.step_name} was not found in job ${input.job_id}`,
      undefined,
      undefined,
      404
    );
  }

  return {
    job_id: job.job_id,
    name: job.name,
    step_name: targetStep.name,
    image: input.image ?? targetStep.image,
    command: input.command ?? targetStep.command,
    pre_condition: input.pre_condition ?? targetStep.pre_condition,
    dry_run: true
  };
}

export function createBuildUpdateJobStepHandler(client: BuildUpdateJobStepClient) {
  return async (input: unknown) => {
    const parsed = buildUpdateJobStepInput.parse(input);

    if (parsed.dry_run) {
      const job = await client.getJob({ job_id: parsed.job_id });
      const result = previewUpdateJobStep(buildPreviewPlan(parsed, job));

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateJobStep(parsed);
    const result = mapUpdatedJobStep(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
