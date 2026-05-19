import { buildListDefaultParametersInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listDefaultParameters: () => Promise<{
    parameters: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListDefaultParametersHandler(client: Client) {
  return async (input: unknown) => {
    buildListDefaultParametersInput.parse(input);
    const response = await client.listDefaultParameters();
    const result = mapBuildRecordList(response.parameters, response.total, "default parameters", "parameter");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
