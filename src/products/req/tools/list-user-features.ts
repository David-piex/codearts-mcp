import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListUserFeaturesInput } from "../schemas.js";

export function mapReqUserFeatures(input: {
  project_id: string;
  features?: Array<{
    key?: string;
    control?: string;
  } & Record<string, unknown>>;
  result?: unknown;
  data?: unknown;
  raw?: unknown;
} & Record<string, unknown>) {
  const features = normalizeReqUserFeatures(input);

  return asListResult(
    `${features.length} user features found`,
    features.map((item) => ({
      ...item,
      key: item.key,
      control: item.control
    })),
    undefined,
    input
  );
}

type ReqListUserFeaturesClient = {
  listUserFeatures: (input: { project_id: string }) => Promise<{
    project_id: string;
    features?: Array<{
      key?: string;
      control?: string;
    } & Record<string, unknown>>;
  } & Record<string, unknown>>;
};

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

function normalizeReqUserFeatures(input: unknown): Array<{ key?: string; control?: string } & Record<string, unknown>> {
  const candidate = Array.isArray(input)
    ? input
    : isRecord(input) && Array.isArray(input.features)
      ? input.features
      : isRecord(input) && Array.isArray(input.result)
        ? input.result
        : isRecord(input) && Array.isArray(input.data)
          ? input.data
          : isRecord(input)
            ? Object.values(input).filter(isRecord)
            : [];

  return candidate.filter(isRecord).map((item) => ({
    ...item,
    key: typeof item.key === "undefined" ? undefined : String(item.key),
    control: typeof item.control === "undefined" ? undefined : String(item.control)
  }));
}

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
