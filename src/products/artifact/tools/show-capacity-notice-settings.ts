import { artifactShowCapacityNoticeSettingsInput } from "../schemas.js";
import { mapArtifactRecordItem } from "./generic-record-tools.js";

type Client = {
  showCapacityNoticeSettings: () => Promise<{ raw: unknown }>;
};

export function createArtifactShowCapacityNoticeSettingsHandler(client: Client) {
  return async (input: unknown) => {
    artifactShowCapacityNoticeSettingsInput.parse(input);
    const response = await client.showCapacityNoticeSettings();
    const result = mapArtifactRecordItem(
      "Loaded Artifact capacity notice settings",
      "capacity-notice-settings",
      "settings",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
