import { formatListToolText } from "../../../contracts/tool-result-text.js";
import type { RepoRepositoryFileTreeEntry } from "../client.js";
import { repoListFileUpperTreeEntriesInput } from "../schemas.js";
import { mapRepositoryUpperTreeEntries } from "./repository-browse-result.js";

type RepoListFileUpperTreeEntriesClient = {
  listFileUpperTreeEntries: (input: {
    repository_id: string;
    file_path?: string;
    ref_name?: string;
  }) => Promise<RepoRepositoryFileTreeEntry[]>;
};

export function createRepoListFileUpperTreeEntriesHandler(client: RepoListFileUpperTreeEntriesClient) {
  return async (input: unknown) => {
    const parsed = repoListFileUpperTreeEntriesInput.parse(input);
    const response = await client.listFileUpperTreeEntries(parsed);
    const result = mapRepositoryUpperTreeEntries(response);
    const text = formatListToolText(result, {
      fields: [
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "type", get: (item) => (item as { type?: string }).type },
        { label: "path", get: (item) => (item as { path?: string }).path },
        { label: "level", get: (item) => (item as { level?: number }).level }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
