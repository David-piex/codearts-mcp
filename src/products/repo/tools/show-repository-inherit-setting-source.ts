import type { RepoRepositoryInheritSettingSource } from "../client.js";
import { repoShowRepositoryInheritSettingSourceInput } from "../schemas.js";
import { mapRepositoryInheritSettingSource } from "./repository-settings-result.js";

type RepoShowRepositoryInheritSettingSourceClient = {
  showRepositoryInheritSettingSource: (input: {
    repository_id: string;
    name: "protected_branches" | "protected_tags" | "merge_requests";
  }) => Promise<RepoRepositoryInheritSettingSource>;
};

export function createRepoShowRepositoryInheritSettingSourceHandler(
  client: RepoShowRepositoryInheritSettingSourceClient
) {
  return async (input: unknown) => {
    const parsed = repoShowRepositoryInheritSettingSourceInput.parse(input);
    const response = await client.showRepositoryInheritSettingSource(parsed);
    const result = mapRepositoryInheritSettingSource(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
