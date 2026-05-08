import { asItemResult } from "../../../contracts/tool-result.js";
import { artifactShowDomainReleaseRepoStorageInput } from "../schemas.js";

export function mapArtifactDomainReleaseRepoStorage(input: {
  used?: string;
  total?: string;
  raw?: unknown;
}) {
  return asItemResult(
    "Loaded artifact tenant release repo storage",
    {
      id: "domain-release-repo-storage",
      used: input.used,
      total: input.total
    },
    input.raw
  );
}

type ArtifactShowDomainReleaseRepoStorageClient = {
  showDomainReleaseRepoStorage: (input: {
    status?: string;
    package_type?: string;
  }) => Promise<{
    used?: string;
    total?: string;
    raw?: unknown;
  }>;
};

export function createArtifactShowDomainReleaseRepoStorageHandler(
  client: ArtifactShowDomainReleaseRepoStorageClient
) {
  return async (input: unknown) => {
    const parsed = artifactShowDomainReleaseRepoStorageInput.parse(input);
    const response = await client.showDomainReleaseRepoStorage(parsed);
    const result = mapArtifactDomainReleaseRepoStorage(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
