import { buildListBuildParameterTypesInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildRecordList } from "./generic-read-tools.js";

type Client = {
  listBuildParameterTypes: () => Promise<{
    parameterTypes: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createBuildListBuildParameterTypesHandler(client: Client) {
  return async (input: unknown) => {
    buildListBuildParameterTypesInput.parse(input);
    const response = await client.listBuildParameterTypes();
    const result = mapBuildRecordList(response.parameterTypes, response.total, "build parameter types", "parameterType");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
