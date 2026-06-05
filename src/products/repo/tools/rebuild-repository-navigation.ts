import { asItemResult } from "../../../contracts/tool-result.js";
import type { RepoRepositoryNavigationBuildResult } from "../client.js";
import { repoRebuildRepositoryNavigationInput } from "../schemas.js";

function mapBuildResult(summary: string, input: RepoRepositoryNavigationBuildResult) {
  return asItemResult(summary, {
    result: input.result,
    message: input.message,
    duration: input.duration,
    size: input.size,
    executed: true
  });
}

function previewBuild(input: { repository_id: string; dry_run: boolean }) {
  return asItemResult("Dry run: rebuild repository navigation", {
    repositoryId: input.repository_id,
    executed: !input.dry_run
  });
}

type Client = {
  rebuildRepositoryNavigation: (input: { repository_id: string }) => Promise<RepoRepositoryNavigationBuildResult>;
};

export function createRepoRebuildRepositoryNavigationHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoRebuildRepositoryNavigationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBuild(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.rebuildRepositoryNavigation({ repository_id: parsed.repository_id });
    const result = mapBuildResult("Rebuilt repository navigation", response);
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
