import { asItemResult } from "../../../contracts/tool-result.js";
import { buildConfigureReleaseUploadStepInput } from "../schemas.js";
import {
  collectReleaseUploadWarnings,
  withReleaseUploadWarningSummary
} from "./release-upload-diagnostics.js";

type ConfiguredReleaseUploadStep = {
  job_id: string;
  name: string;
  configured_step_name: string;
  module_id: string;
  file: string;
  package_name?: string;
  build_version?: string;
  custom_upload_path?: string;
  upload_tool?: string;
  remain_origin_path?: string;
  pre_condition?: string;
};

export function previewConfigureReleaseUploadStep(input: ConfiguredReleaseUploadStep) {
  const warnings = collectReleaseUploadWarnings(input.file);

  return asItemResult(
    `Dry run: configure release upload step ${input.configured_step_name}`,
    {
      id: input.job_id,
      name: input.name,
      stepName: input.configured_step_name,
      moduleId: input.module_id,
      file: input.file,
      packageName: input.package_name,
      buildVersion: input.build_version,
      customUploadPath: input.custom_upload_path,
      uploadTool: input.upload_tool,
      remainOriginPath: input.remain_origin_path,
      preCondition: input.pre_condition,
      warnings,
      executed: false
    }
  );
}

export function mapConfiguredReleaseUploadStep(input: ConfiguredReleaseUploadStep) {
  const warnings = collectReleaseUploadWarnings(input.file);

  return asItemResult(
    `Configured release upload step ${input.configured_step_name}`,
    {
      id: input.job_id,
      name: input.name,
      stepName: input.configured_step_name,
      moduleId: input.module_id,
      file: input.file,
      packageName: input.package_name,
      buildVersion: input.build_version,
      customUploadPath: input.custom_upload_path,
      uploadTool: input.upload_tool,
      remainOriginPath: input.remain_origin_path,
      preCondition: input.pre_condition,
      warnings,
      executed: true
    }
  );
}

type BuildConfigureReleaseUploadStepClient = {
  previewConfigureReleaseUploadStep: (input: {
    job_id: string;
    step_name: string;
    file: string;
    package_name?: string;
    build_version?: string;
    custom_upload_path?: string;
    upload_tool?: string;
    remain_origin_path?: string;
    pre_condition?: string;
  }) => Promise<ConfiguredReleaseUploadStep>;
  configureReleaseUploadStep: (input: {
    job_id: string;
    step_name: string;
    file: string;
    package_name?: string;
    build_version?: string;
    custom_upload_path?: string;
    upload_tool?: string;
    remain_origin_path?: string;
    pre_condition?: string;
  }) => Promise<ConfiguredReleaseUploadStep>;
};

export function createBuildConfigureReleaseUploadStepHandler(
  client: BuildConfigureReleaseUploadStepClient
) {
  return async (input: unknown) => {
    const parsed = buildConfigureReleaseUploadStepInput.parse(input);

    if (parsed.dry_run) {
      const response = await client.previewConfigureReleaseUploadStep(parsed);
      const result = previewConfigureReleaseUploadStep(response);

      return {
        content: [{
          type: "text" as const,
          text: withReleaseUploadWarningSummary(result.summary, result.item?.warnings ?? [])
        }],
        structuredContent: result
      };
    }

    const response = await client.configureReleaseUploadStep(parsed);
    const result = mapConfiguredReleaseUploadStep(response);

    return {
      content: [{
        type: "text" as const,
        text: withReleaseUploadWarningSummary(result.summary, result.item?.warnings ?? [])
      }],
      structuredContent: result
    };
  };
}
