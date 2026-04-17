import { asListResult } from "../../../contracts/tool-result.js";
import { buildGetFullStagesInput } from "../schemas.js";

export function mapBuildFullStages(
  stages: Record<
    string,
    {
      id?: string;
      status?: string;
      display_name?: string;
      execution_id?: string;
      sequence?: number;
      duration?: number;
    }
  >
) {
  const items = Object.values(stages)
    .map((stage) => ({
      id: stage.id ?? "",
      name: stage.display_name,
      status: stage.status,
      executionId: stage.execution_id,
      sequence: stage.sequence,
      duration: stage.duration
    }))
    .sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));

  return asListResult(`${items.length} build stages found`, items);
}

type BuildGetFullStagesClient = {
  getFullStages: (input: { record_id: string; cascade: boolean }) => Promise<{
    record_id: string;
    build_stages: Record<
      string,
      {
        id?: string;
        status?: string;
        display_name?: string;
        execution_id?: string;
        sequence?: number;
        duration?: number;
      }
    >;
  }>;
};

export function createBuildGetFullStagesHandler(client: BuildGetFullStagesClient) {
  return async (input: unknown) => {
    const parsed = buildGetFullStagesInput.parse(input);
    const response = await client.getFullStages(parsed);
    const result = mapBuildFullStages(response.build_stages);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
