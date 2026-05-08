import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactShowPackageDataDetailInput } from "../schemas.js";

export function mapArtifactPackageDataDetail(input: { raw: unknown }) {
  return asItemResult("Loaded artifact package data detail", input.raw, input.raw);
}

type ArtifactShowPackageDataDetailClient = {
  showPackageDataDetail: (input: {
    project_id?: string;
    status?: string;
  }) => Promise<{
    raw: unknown;
  }>;
};

export function createArtifactShowPackageDataDetailHandler(
  client: ArtifactShowPackageDataDetailClient
) {
  return async (input: unknown) => {
    const parsed = artifactShowPackageDataDetailInput.parse(input);
    const response = await client.showPackageDataDetail(parsed);
    const result = mapArtifactPackageDataDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
