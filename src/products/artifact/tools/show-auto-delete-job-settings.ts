import { artifactShowAutoDeleteJobSettingsInput } from "../schemas.js";
import { mapArtifactRecordItem } from "./generic-record-tools.js";

type Client = {
  showAutoDeleteJobSettings: (input: { project_id: string }) => Promise<{ project_id: string; raw: unknown }>;
};

export function createArtifactShowAutoDeleteJobSettingsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactShowAutoDeleteJobSettingsInput.parse(input);
    const response = await client.showAutoDeleteJobSettings(parsed);
    const result = mapArtifactRecordItem(
      "Loaded Artifact auto delete job settings",
      response.project_id,
      "settings",
      response.raw,
      { project_id: response.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
