import { AppError } from "../../../core/errors/app-error.js";
import { asItemResult } from "../../../contracts/tool-result.js";
import { buildPrepareNodeRuntimeBundleInput } from "../schemas.js";

export const BUNDLE_MARKER_START = "# codex-node-runtime-bundle:start";
export const BUNDLE_MARKER_END = "# codex-node-runtime-bundle:end";

export function buildNodeRuntimeBundleCommandBlock(input: {
  output_file: string;
  staging_dir: string;
}) {
  return [
    BUNDLE_MARKER_START,
    "set -e",
    `rm -rf ${input.staging_dir}`,
    `mkdir -p ${input.staging_dir}`,
    `cp -r dist ${input.staging_dir}/dist`,
    `cp package.json ${input.staging_dir}/package.json`,
    "if [ -f package-lock.json ]; then cp package-lock.json " +
      `${input.staging_dir}/package-lock.json; fi`,
    `if [ -f README.md ]; then cp README.md ${input.staging_dir}/README.md; fi`,
    `if [ -f .env.example ]; then cp .env.example ${input.staging_dir}/.env.example; fi`,
    "if [ -f ecosystem.config.cjs ]; then cp ecosystem.config.cjs " +
      `${input.staging_dir}/ecosystem.config.cjs; fi`,
    `tar -czf ${input.output_file} -C ${input.staging_dir} .`,
    `ls -lh ${input.output_file}`,
    BUNDLE_MARKER_END
  ].join("\n");
}

function containsBundleMarker(command?: string) {
  return typeof command === "string" && command.includes(BUNDLE_MARKER_START);
}

function replaceBundleBlock(command: string, nextBlock: string) {
  const escapedStart = BUNDLE_MARKER_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = BUNDLE_MARKER_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const markerPattern = new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}`, "m");

  return command.replace(markerPattern, nextBlock);
}

type PrepareNodeRuntimeBundlePlan = {
  job_id: string;
  name: string;
  target_step_name: string;
  output_file: string;
  staging_dir: string;
  current_command?: string;
  updated_command: string;
  already_configured: boolean;
};

export function previewPrepareNodeRuntimeBundle(input: PrepareNodeRuntimeBundlePlan) {
  return asItemResult(
    `Dry run: prepare Node runtime bundle on build step ${input.target_step_name}`,
    {
      id: input.job_id,
      name: input.name,
      targetStepName: input.target_step_name,
      outputFile: input.output_file,
      stagingDir: input.staging_dir,
      currentCommand: input.current_command,
      updatedCommand: input.updated_command,
      alreadyConfigured: input.already_configured,
      executed: false
    }
  );
}

export function mapPreparedNodeRuntimeBundle(input: PrepareNodeRuntimeBundlePlan) {
  return asItemResult(
    `Prepared Node runtime bundle on build step ${input.target_step_name}`,
    {
      id: input.job_id,
      name: input.name,
      targetStepName: input.target_step_name,
      outputFile: input.output_file,
      stagingDir: input.staging_dir,
      currentCommand: input.current_command,
      updatedCommand: input.updated_command,
      alreadyConfigured: input.already_configured,
      executed: true
    }
  );
}

type BuildPrepareNodeRuntimeBundleClient = {
  getJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    name: string;
    steps: Array<{
      name?: string;
      command?: string;
      pre_condition?: string;
    }>;
  }>;
  updateJobStep: (input: {
    job_id: string;
    step_name: string;
    command?: string;
    pre_condition?: string;
  }) => Promise<unknown>;
};

function buildPlan(input: {
  job_id: string;
  step_name?: string;
  output_file: string;
  staging_dir: string;
  replace_existing: boolean;
}, job: {
  job_id: string;
  name: string;
  steps: Array<{
    name?: string;
    command?: string;
    pre_condition?: string;
  }>;
}): PrepareNodeRuntimeBundlePlan {
  const targetStep = input.step_name
    ? job.steps.find((step) => step.name === input.step_name)
    : job.steps[0];

  if (!targetStep?.name) {
    throw new AppError(
      "not_found",
      input.step_name
        ? `Build step ${input.step_name} was not found in job ${input.job_id}`
        : `Build job ${input.job_id} has no steps to prepare a runtime bundle`,
      undefined,
      undefined,
      404
    );
  }

  const bundleBlock = buildNodeRuntimeBundleCommandBlock({
    output_file: input.output_file,
    staging_dir: input.staging_dir
  });
  const alreadyConfigured = containsBundleMarker(targetStep.command);
  const currentCommand = targetStep.command;
  const updatedCommand = alreadyConfigured
    ? currentCommand
      ? replaceBundleBlock(currentCommand, bundleBlock)
      : bundleBlock
    : [currentCommand, bundleBlock].filter(Boolean).join("\n\n");

  return {
    job_id: job.job_id,
    name: job.name,
    target_step_name: targetStep.name,
    output_file: input.output_file,
    staging_dir: input.staging_dir,
    current_command: currentCommand,
    updated_command: updatedCommand,
    already_configured: alreadyConfigured
  };
}

export function createBuildPrepareNodeRuntimeBundleHandler(
  client: BuildPrepareNodeRuntimeBundleClient
) {
  return async (input: unknown) => {
    const parsed = buildPrepareNodeRuntimeBundleInput.parse(input);
    const job = await client.getJob({ job_id: parsed.job_id });
    const plan = buildPlan(parsed, job);

    if (parsed.dry_run) {
      const result = previewPrepareNodeRuntimeBundle(plan);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    if (plan.already_configured && !parsed.replace_existing) {
      throw new AppError(
        "provider_error",
        `Build step ${plan.target_step_name} already includes the Node runtime bundle block`,
        undefined,
        undefined,
        409
      );
    }

    await client.updateJobStep({
      job_id: parsed.job_id,
      step_name: plan.target_step_name,
      command: plan.updated_command,
      pre_condition: job.steps.find((step) => step.name === plan.target_step_name)?.pre_condition
    });

    const result = mapPreparedNodeRuntimeBundle(plan);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
