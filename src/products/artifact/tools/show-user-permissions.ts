import { artifactShowUserPermissionsInput } from "../schemas.js";
import { mapArtifactRecordItem } from "./generic-record-tools.js";

type Client = {
  showUserPermissions: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: unknown;
  }>;
};

export function createArtifactShowUserPermissionsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactShowUserPermissionsInput.parse(input);
    const response = await client.showUserPermissions(parsed);
    const result = mapArtifactRecordItem(
      `Loaded Artifact user permissions for project ${response.project_id}`,
      response.project_id,
      "permissions",
      response.raw,
      { project_id: response.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
