import { buildListResourceSpecsInput } from "../schemas.js";
import { formatBuildRecordListText, mapBuildStringList } from "./generic-read-tools.js";

type Client = {
  listResourceSpecs: (input: { project_id: string; arch: string }) => Promise<{
    specs: string[];
  }>;
};

export function createBuildListResourceSpecsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = buildListResourceSpecsInput.parse(input);
    const response = await client.listResourceSpecs(parsed);
    const result = mapBuildStringList(response.specs, "resource specs", "spec");

    return {
      content: [{ type: "text" as const, text: formatBuildRecordListText(result) }],
      structuredContent: result
    };
  };
}
