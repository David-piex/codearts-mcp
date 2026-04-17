import { asItemResult } from "../../../contracts/tool-result.js";
import { perftestGetProjectInput } from "../schemas.js";

export function mapPerfTestProject(input: {
  id: number;
  name?: string;
  description?: string;
  group?: string;
  source?: number;
  create_time?: string;
  update_time?: string;
}) {
  return asItemResult(`Loaded perftest project ${input.id}`, {
    id: String(input.id),
    name: input.name,
    description: input.description,
    group: input.group,
    source: input.source,
    createdAt: input.create_time,
    updatedAt: input.update_time
  });
}

type PerfTestGetProjectClient = {
  getProject: (input: { project_id: string; test_suite_id: number }) => Promise<{
    id: number;
    name?: string;
    description?: string;
    group?: string;
    source?: number;
    create_time?: string;
    update_time?: string;
  }>;
};

export function createPerfTestGetProjectHandler(client: PerfTestGetProjectClient) {
  return async (input: unknown) => {
    const parsed = perftestGetProjectInput.parse(input);
    const response = await client.getProject(parsed);
    const result = mapPerfTestProject(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
