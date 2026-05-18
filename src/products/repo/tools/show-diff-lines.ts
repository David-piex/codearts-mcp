import type { RepoDiffLines } from "../client.js";
import { repoShowDiffLinesInput } from "../schemas.js";
import { mapDiffLines } from "./repository-navigation-result.js";

type RepoShowDiffLinesClient = {
  showDiffLines: (input: {
    repository_id: string;
    file_path: string;
    commit_id: string;
    start: number;
    end: number;
  }) => Promise<RepoDiffLines>;
};

export function createRepoShowDiffLinesHandler(client: RepoShowDiffLinesClient) {
  return async (input: unknown) => {
    const parsed = repoShowDiffLinesInput.parse(input);
    const response = await client.showDiffLines(parsed);
    const result = mapDiffLines(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
