import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetJobInput } from "../schemas.js";

export function mapBuildJob(input: {
  job_id: string;
  name: string;
  project_id?: string;
  description?: string;
}) {
  return asItemResult(`Loaded build job ${input.name}`, {
    id: input.job_id,
    name: input.name,
    projectId: input.project_id,
    description: input.description
  });
}

type BuildGetJobClient = {
  getJob: (input: { job_id: string }) => Promise<{
    job_id: string;
    name: string;
    project_id?: string;
    description?: string;
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
