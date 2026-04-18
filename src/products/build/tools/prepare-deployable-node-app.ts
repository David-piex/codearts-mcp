import { AppError } from "../../../core/errors/app-error.js";
import { asItemResult } from "../../../contracts/tool-result.js";
import { buildPrepareDeployableNodeAppInput } from "../schemas.js";

export const DEPLOYABLE_APP_MARKER_START = "# codex-deployable-node-app:start";
export const DEPLOYABLE_APP_MARKER_END = "# codex-deployable-node-app:end";
export const DEFAULT_BOOTSTRAP_ENTRY_FILE = ".codex-deploy-entry.ts";

export function buildDeployableNodeAppCommandBlock(input: {
  entry_file: string;
  output_file: string;
  target_runtime: string;
  bootstrap_entry_file?: string;
  bootstrap_entry_source?: string;
}) {
  const bundleEntryFile = input.bootstrap_entry_source
    ? input.bootstrap_entry_file ?? DEFAULT_BOOTSTRAP_ENTRY_FILE
    : input.entry_file;

  return [
    DEPLOYABLE_APP_MARKER_START,
    "set -e",
    ...(input.bootstrap_entry_source
      ? [
          `cat > ${bundleEntryFile} <<'EOF'`,
          input.bootstrap_entry_source,
          "EOF"
        ]
      : []),
    `npx esbuild ${bundleEntryFile} --bundle --platform=node --format=cjs --target=${input.target_runtime} --outfile=${input.output_file}`,
    `test -f ${input.output_file}`,
    `ls -lh ${input.output_file}`,
    DEPLOYABLE_APP_MARKER_END
  ].join("\n");
}

function containsDeployableAppMarker(command?: string) {
  return typeof command === "string" && command.includes(DEPLOYABLE_APP_MARKER_START);
}

function replaceDeployableAppBlock(command: string, nextBlock: string) {
  const escapedStart = DEPLOYABLE_APP_MARKER_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = DEPLOYABLE_APP_MARKER_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const markerPattern = new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}`, "m");

  return command.replace(markerPattern, nextBlock);
}

type PrepareDeployableNodeAppPlan = {
  job_id: string;
  name: string;
  target_step_name: string;
  entry_file: string;
  bundle_entry_file: string;
  output_file: string;
  target_runtime: string;
  bootstrap_entry_file?: string;
  uses_bootstrap_entry: boolean;
  current_command?: string;
  updated_command: string;
  already_configured: boolean;
};

export function previewPrepareDeployableNodeApp(input: PrepareDeployableNodeAppPlan) {
  return asItemResult(
    `Dry run: prepare deployable Node app on build step ${input.target_step_name}`,
    {
      id: input.job_id,
      name: input.name,
      targetStepName: input.target_step_name,
      entryFile: input.entry_file,
      bundleEntryFile: input.bundle_entry_file,
      outputFile: input.output_file,
      targetRuntime: input.target_runtime,
      bootstrapEntryFile: input.bootstrap_entry_file,
      usesBootstrapEntry: input.uses_bootstrap_entry,
      currentCommand: input.current_command,
      updatedCommand: input.updated_command,
      alreadyConfigured: input.already_configured,
      executed: false
    }
  );
}

export function mapPreparedDeployableNodeApp(input: PrepareDeployableNodeAppPlan) {
  return asItemResult(
    `Prepared deployable Node app on build step ${input.target_step_name}`,
    {
      id: input.job_id,
      name: input.name,
      targetStepName: input.target_step_name,
      entryFile: input.entry_file,
      bundleEntryFile: input.bundle_entry_file,
      outputFile: input.output_file,
      targetRuntime: input.target_runtime,
      bootstrapEntryFile: input.bootstrap_entry_file,
      usesBootstrapEntry: input.uses_bootstrap_entry,
      currentCommand: input.current_command,
      updatedCommand: input.updated_command,
      alreadyConfigured: input.already_configured,
      executed: true
    }
  );
}

type BuildPrepareDeployableNodeAppClient = {
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

function buildPlan(
  input: {
    job_id: string;
    step_name?: string;
    entry_file: string;
    bootstrap_entry_file?: string;
    bootstrap_entry_source?: string;
    output_file: string;
    target_runtime: string;
    replace_existing: boolean;
  },
  job: {
    job_id: string;
    name: string;
    steps: Array<{
      name?: string;
      command?: string;
      pre_condition?: string;
    }>;
  }
): PrepareDeployableNodeAppPlan {
  const targetStep = input.step_name
    ? job.steps.find((step) => step.name === input.step_name)
    : job.steps[0];

  if (!targetStep?.name) {
    throw new AppError(
      "not_found",
      input.step_name
        ? `Build step ${input.step_name} was not found in job ${input.job_id}`
        : `Build job ${input.job_id} has no steps to prepare a deployable Node app`,
      undefined,
      undefined,
      404
    );
  }

  const bundleEntryFile = input.bootstrap_entry_source
    ? input.bootstrap_entry_file ?? DEFAULT_BOOTSTRAP_ENTRY_FILE
    : input.entry_file;
  const commandBlock = buildDeployableNodeAppCommandBlock({
    entry_file: input.entry_file,
    bootstrap_entry_file: input.bootstrap_entry_file,
    bootstrap_entry_source: input.bootstrap_entry_source,
    output_file: input.output_file,
    target_runtime: input.target_runtime
  });
  const alreadyConfigured = containsDeployableAppMarker(targetStep.command);
  const currentCommand = targetStep.command;
  const updatedCommand = alreadyConfigured
    ? currentCommand
      ? replaceDeployableAppBlock(currentCommand, commandBlock)
      : commandBlock
    : [currentCommand, commandBlock].filter(Boolean).join("\n\n");

  return {
    job_id: job.job_id,
    name: job.name,
    target_step_name: targetStep.name,
    entry_file: input.entry_file,
    bundle_entry_file: bundleEntryFile,
    output_file: input.output_file,
    target_runtime: input.target_runtime,
    bootstrap_entry_file: input.bootstrap_entry_source ? bundleEntryFile : undefined,
    uses_bootstrap_entry: Boolean(input.bootstrap_entry_source),
    current_command: currentCommand,
    updated_command: updatedCommand,
    already_configured: alreadyConfigured
  };
}

export function createBuildPrepareDeployableNodeAppHandler(
  client: BuildPrepareDeployableNodeAppClient
) {
  return async (input: unknown) => {
    const parsed = buildPrepareDeployableNodeAppInput.parse(input);
    const job = await client.getJob({ job_id: parsed.job_id });
    const plan = buildPlan(parsed, job);

    if (parsed.dry_run) {
      const result = previewPrepareDeployableNodeApp(plan);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    if (plan.already_configured && !parsed.replace_existing) {
      throw new AppError(
        "provider_error",
        `Build step ${plan.target_step_name} already includes the deployable Node app block`,
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

    const result = mapPreparedDeployableNodeApp(plan);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
