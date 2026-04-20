import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetJobInput } from "../schemas.js";
import {
  getArtifactMetadata,
  hasSuspiciousJavaArchivePackaging,
  isReleasePublishingStep
} from "./release-upload-diagnostics.js";

export function mapBuildJob(input: {
  job_id: string;
  name: string;
  project_id?: string;
  description?: string;
  primary_image?: string;
  step_count: number;
  scm_repositories: Array<{
    url?: string;
    branch?: string;
    repo_id?: string;
    repo_name?: string;
    scm_type?: string;
  }>;
  steps: Array<{
    name?: string;
    module_id?: string;
    enable?: boolean;
    image?: string;
    command?: string;
    pre_condition?: string;
    properties?: Record<string, unknown>;
  }>;
}) {
  const releasePublishingSteps = input.steps.filter((step) => isReleasePublishingStep(step));
  const deployWarnings: string[] = [];
  const deployBlockers: string[] = [];

  if (releasePublishingSteps.length === 0) {
    deployBlockers.push("missing_release_publishing_step");
  }

  if (input.steps.some((step) => hasSuspiciousJavaArchivePackaging(step))) {
    deployWarnings.push("javascript_bundle_renamed_as_java_archive");
    deployBlockers.push("suspicious_java_archive_packaging");
  }

  return asItemResult(`Loaded build job ${input.name}`, {
    id: input.job_id,
    name: input.name,
    projectId: input.project_id,
    description: input.description,
    primaryImage: input.primary_image,
    stepCount: input.step_count,
    repositories: input.scm_repositories.map((repository) => ({
      url: repository.url,
      branch: repository.branch,
      repoId: repository.repo_id,
      repoName: repository.repo_name,
      scmType: repository.scm_type
    })),
    releasePublishingDetected: releasePublishingSteps.length > 0,
    releasePublishingStepCount: releasePublishingSteps.length,
    releasePublishingStepNames: releasePublishingSteps
      .map((step) => step.name)
      .filter((value): value is string => Boolean(value)),
    deployReady: deployBlockers.length === 0,
    deployBlockers,
    deployWarnings,
    steps: input.steps.map((step) => ({
      name: step.name,
      moduleId: step.module_id,
      enabled: step.enable,
      image: step.image,
      command: step.command,
      preCondition: step.pre_condition,
      ...getArtifactMetadata(step.properties)
    }))
  });
}

type BuildGetJobClient = {
  getJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    name: string;
    project_id?: string;
    description?: string;
    primary_image?: string;
    step_count: number;
    scm_repositories: Array<{
      url?: string;
      branch?: string;
      repo_id?: string;
      repo_name?: string;
      scm_type?: string;
    }>;
    steps: Array<{
      name?: string;
      module_id?: string;
      enable?: boolean;
      image?: string;
      command?: string;
      pre_condition?: string;
      properties?: Record<string, unknown>;
    }>;
  }>;
};

export function createBuildGetJobHandler(client: BuildGetJobClient) {
  return async (input: unknown) => {
    const parsed = buildGetJobInput.parse(input);
    const response = await client.getJob(parsed);
    const result = mapBuildJob(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
