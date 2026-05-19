import { buildListSystemParametersInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listSystemParameters: () => Promise<{
    parameters: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListSystemParametersHandler(client: Client) {
  return async (input: unknown) => {
    buildListSystemParametersInput.parse(input);
    const response = await client.listSystemParameters();
    const result = mapBuildRecordList(response.parameters, response.total, "system parameters", "parameter");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
