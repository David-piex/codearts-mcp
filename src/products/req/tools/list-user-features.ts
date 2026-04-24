import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListUserFeaturesInput } from "../schemas.js";

export function mapReqUserFeatures(input: {
  project_id: string;
  features: Array<{
    key?: string;
    control?: string;
  }>;
}) {
  return asListResult(
    `${input.features.length} user features found`,
    input.features.map((item) => ({
      key: item.key,
      control: item.control
    }))
  );
}

type ReqListUserFeaturesClient = {
  listUserFeatures: (input: { project_id: string }) => Promise<{
    project_id: string;
    features: Array<{
      key?: string;
      control?: string;
    }>;
  }>;
};

export function createReqListUserFeaturesHandler(client: ReqListUserFeaturesClient) {
  return async (input: unknown) => {
    const parsed = reqListUserFeaturesInput.parse(input);
    const response = await client.listUserFeatures(parsed);
    const result = mapReqUserFeatures(response);
    const text = formatListToolText(result, {
      fields: [
        { label: "key", get: (item) => (item as { key?: string }).key },
        { label: "control", get: (item) => (item as { control?: string }).control }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
