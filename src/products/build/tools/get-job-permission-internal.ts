import { buildGetJobPermissionInternalInput } from "../schemas.js";
import { mapBuildValueItem } from "./generic-read-tools.js";

type Client = {
  getJobPermissionInternal: () => Promise<{ value?: unknown; raw: Record<string, unknown> }>;
};

export function createBuildGetJobPermissionInternalHandler(client: Client) {
  return async (input: unknown) => {
    buildGetJobPermissionInternalInput.parse(input);
    const response = await client.getJobPermissionInternal();
    const result = mapBuildValueItem(
      "Loaded Build internal permission status",
      "job-permission-internal",
      "permission",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
