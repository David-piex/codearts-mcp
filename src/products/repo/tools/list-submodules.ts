import type { RepoSubmodule } from "../client.js";
import { repoListSubmodulesInput } from "../schemas.js";
import { mapRepoSubmodules } from "./repository-content-result.js";

type RepoListSubmodulesClient = {
  listSubmodules: (input: {
    repository_id: string;
    sha: string;
    page: number;
    page_size: number;
  }) => Promise<{
    submodules: RepoSubmodule[];
    total?: number;
  }>;
};

export function createRepoListSubmodulesHandler(client: RepoListSubmodulesClient) {
  return async (input: unknown) => {
    const parsed = repoListSubmodulesInput.parse(input);
    const response = await client.listSubmodules(parsed);
    const result = mapRepoSubmodules(response.submodules, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
