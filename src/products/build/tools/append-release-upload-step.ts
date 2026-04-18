import { asItemResult } from "../../../contracts/tool-result.js";
import { buildAppendReleaseUploadStepInput } from "../schemas.js";

type AppendReleaseUploadStepInput = {
  job_id: string;
  path: string;
  package_name?: string;
  package_version?: string;
  custom_upload_path?: string;
  upload_tool: string;
  continue_on_failure: boolean;
  step_name: string;
  pre_condition: string;
  insert_after_step_name?: string;
  dry_run: boolean;
};

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

export function toBuildAppendReleaseUploadStepInput(input: AppendReleaseUploadStepInput) {
  return {
    job_id: input.job_id,
    step_name: input.step_name,
    module_id: "devcloud2018.codeci_action_20018.action",
    pre_condition: input.pre_condition,
    insert_after_step_name: input.insert_after_step_name,
    properties: {
      file: input.path,
      ...(input.package_name === undefined ? {} : { name: input.package_name }),
      ...(input.package_version === undefined ? {} : { buildVersion: input.package_version }),
      ...(input.custom_upload_path === undefined
        ? {}
        : { customUploadPath: input.custom_upload_path }),
      uploadTool: input.upload_tool,
      remainOriginPath: "FLAT",
      ...(input.continue_on_failure ? { ignore_fail: "true" } : {})
    }
  };
}

export function previewAppendReleaseUploadStep(input: AppendedJobStep) {
  return asItemResult(`Dry run: append release upload step ${input.appended_step_name}`, {
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

export function mapAppendedReleaseUploadStep(input: AppendedJobStep) {
  return asItemResult(`Appended release upload step ${input.appended_step_name}`, {
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

type BuildAppendReleaseUploadStepClient = {
  previewAppendJobStep: (input: ReturnType<typeof toBuildAppendReleaseUploadStepInput>) => Promise<AppendedJobStep>;
  appendJobStep: (input: ReturnType<typeof toBuildAppendReleaseUploadStepInput>) => Promise<AppendedJobStep>;
};

export function createBuildAppendReleaseUploadStepHandler(
  client: BuildAppendReleaseUploadStepClient
) {
  return async (input: unknown) => {
    const parsed = buildAppendReleaseUploadStepInput.parse(input);
    const mapped = toBuildAppendReleaseUploadStepInput(parsed);

    if (parsed.dry_run) {
      const response = await client.previewAppendJobStep(mapped);
      const result = previewAppendReleaseUploadStep(response);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.appendJobStep(mapped);
    const result = mapAppendedReleaseUploadStep(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
