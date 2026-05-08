import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactShowPackageInfoInput } from "../schemas.js";

export function mapArtifactPackageInfo(input: { raw: unknown }) {
  return asItemResult("Loaded artifact package info", input.raw, input.raw);
}

type ArtifactShowPackageInfoClient = {
  showPackageInfo: (input: {
    project_id?: string;
    status?: string;
  }) => Promise<{
    raw: unknown;
  }>;
};

export function createArtifactShowPackageInfoHandler(client: ArtifactShowPackageInfoClient) {
  return async (input: unknown) => {
    const parsed = artifactShowPackageInfoInput.parse(input);
    const response = await client.showPackageInfo(parsed);
    const result = mapArtifactPackageInfo(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
