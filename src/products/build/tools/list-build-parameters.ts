import { asListResult } from "../../../contracts/tool-result.js";
import { buildListBuildParametersInput } from "../schemas.js";

export function mapBuildParameters(items: Array<{ name: string; value?: string }>) {
  return asListResult(
    `${items.length} build parameters found`,
    items.map((item) => ({
      id: item.name,
      name: item.name,
      value: item.value
    }))
  );
}

type BuildListBuildParametersClient = {
  listBuildParameters: (input: { job_id: string; build_no: number }) => Promise<{
    job_id: string;
    build_no: number;
    parameters: Array<{ name: string; value?: string }>;
  }>;
};

export function createBuildListBuildParametersHandler(client: BuildListBuildParametersClient) {
  return async (input: unknown) => {
    const parsed = buildListBuildParametersInput.parse(input);
    const response = await client.listBuildParameters(parsed);
    const result = mapBuildParameters(response.parameters);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
