import { artifactShowOpenSourceEnabledInput } from "../schemas.js";
import { mapArtifactRecordItem } from "./generic-record-tools.js";

type Client = {
  showOpenSourceEnabled: () => Promise<{ value?: unknown; raw: unknown }>;
};

export function createArtifactShowOpenSourceEnabledHandler(client: Client) {
  return async (input: unknown) => {
    artifactShowOpenSourceEnabledInput.parse(input);
    const response = await client.showOpenSourceEnabled();
    const result = mapArtifactRecordItem(
      "Loaded Artifact open source enabled status",
      "open-source-enabled",
      "status",
      response.raw,
      { value: response.value }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
