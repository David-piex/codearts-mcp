import { artifactShowUserPrivilegesInput } from "../schemas.js";
import { mapArtifactRecordItem } from "./generic-record-tools.js";

type Client = {
  showUserPrivileges: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: unknown;
  }>;
};

export function createArtifactShowUserPrivilegesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactShowUserPrivilegesInput.parse(input);
    const response = await client.showUserPrivileges(parsed);
    const result = mapArtifactRecordItem(
      `Loaded Artifact user privileges for project ${response.project_id}`,
      response.project_id,
      "privileges",
      response.raw,
      { project_id: response.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
