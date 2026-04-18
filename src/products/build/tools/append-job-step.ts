import { asItemResult } from "../../../contracts/tool-result.js";
import { buildAppendJobStepInput } from "../schemas.js";

type AppendedJobStep = {
  job_id: string;
  name: string;
  appended_step_name: string;
  inserted_after_step_name?: string;
  module_id: string;
  step_count: number;
  image?: string;
  command?: string;
  pre_condition?: string;
  properties?: Record<string, unknown>;
};

export function previewAppendJobStep(input: AppendedJobStep) {
  return asItemResult(`Dry run: append build job step ${input.appended_step_name}`, {
    id: input.job_id,
    name: input.name,
    stepName: input.appended_step_name,
    insertedAfterStepName: input.inserted_after_step_name,
    moduleId: input.module_id,
    stepCount: input.step_count,
    image: input.image,
    command: input.command,
    preCondition: input.pre_condition,
    properties: input.properties,
    executed: false
  });
}

export function mapAppendedJobStep(input: AppendedJobStep) {
  return asItemResult(`Appended build job step ${input.appended_step_name}`, {
    id: input.job_id,
    name: input.name,
    stepName: input.appended_step_name,
    insertedAfterStepName: input.inserted_after_step_name,
    moduleId: input.module_id,
    stepCount: input.step_count,
    image: input.image,
    command: input.command,
    preCondition: input.pre_condition,
    properties: input.properties,
    executed: true
  });
}

type BuildAppendJobStepClient = {
  previewAppendJobStep: (input: {
    job_id: string;
    step_name: string;
    module_id: string;
    enable?: boolean;
    version?: string;
    image?: string;
    command?: string;
    pre_condition?: string;
    properties?: Record<string, unknown>;
    insert_after_step_name?: string;
  }) => Promise<AppendedJobStep>;
  appendJobStep: (input: {
    job_id: string;
    step_name: string;
    module_id: string;
    enable?: boolean;
    version?: string;
    image?: string;
    command?: string;
    pre_condition?: string;
    properties?: Record<string, unknown>;
    insert_after_step_name?: string;
  }) => Promise<AppendedJobStep>;
};

export function createBuildAppendJobStepHandler(client: BuildAppendJobStepClient) {
  return async (input: unknown) => {
    const parsed = buildAppendJobStepInput.parse(input);

    if (parsed.dry_run) {
      const response = await client.previewAppendJobStep(parsed);
      const result = previewAppendJobStep(response);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.appendJobStep(parsed);
    const result = mapAppendedJobStep(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
