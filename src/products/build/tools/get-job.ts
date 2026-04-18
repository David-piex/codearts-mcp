import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetJobInput } from "../schemas.js";

function isReleasePublishingStep(step: {
  name?: string;
  module_id?: string;
  command?: string;
}) {
  const haystacks = [step.name, step.module_id, step.command]
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .map((value) => value.toLowerCase());

  return haystacks.some(
    (value) =>
      value.includes("codeci_action_20018") ||
      value.includes("upload_artifact") ||
      value.includes("release") ||
      value.includes("releaseman") ||
      value.includes("软件发布库") ||
      value.includes("上传软件包") ||
      value.includes("upload package")
  );
}

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
  }>;
}) {
  const releasePublishingSteps = input.steps.filter((step) => isReleasePublishingStep(step));
  const deployBlockers =
    releasePublishingSteps.length > 0 ? [] : ["missing_release_publishing_step"];

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
    steps: input.steps.map((step) => ({
      name: step.name,
      moduleId: step.module_id,
      enabled: step.enable,
      image: step.image,
      command: step.command,
      preCondition: step.pre_condition
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
