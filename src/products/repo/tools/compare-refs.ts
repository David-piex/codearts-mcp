import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCompareRefsInput } from "../schemas.js";

export function mapRepoRefComparison(input: {
  from?: string;
  to?: string;
  compare_type?: string;
  compare_timeout?: boolean;
  compare_same_ref?: boolean;
  commits?: Array<{
    id?: string;
    short_id?: string;
    title?: string;
    author_name?: string;
    created_at?: string;
  }>;
  diffs?: Array<{
    old_path?: string;
    new_path?: string;
    diff?: string;
    new_file?: boolean;
    deleted_file?: boolean;
    renamed_file?: boolean;
  }>;
}) {
  const from = input.from ?? "";
  const to = input.to ?? "";
  const commits = input.commits ?? [];
  const diffs = input.diffs ?? [];

  return asItemResult(`Compared ${from} to ${to}`, {
    id: `${from}...${to}`,
    from,
    to,
    compareType: input.compare_type,
    commitCount: commits.length,
    fileCount: diffs.length,
    diffTooLarge: input.compare_timeout,
    sameRef: input.compare_same_ref,
    commits: commits.map((commit) => ({
      id: commit.id,
      shortId: commit.short_id,
      title: commit.title,
      authorName: commit.author_name,
      createdAt: commit.created_at
    })),
    diffs: diffs.map((diff) => ({
      oldPath: diff.old_path,
      newPath: diff.new_path,
      diff: diff.diff,
      newFile: diff.new_file,
      deletedFile: diff.deleted_file,
      renamedFile: diff.renamed_file
    }))
  });
}

type RepoCompareRefsClient = {
  compareRefs: (input: {
    repository_id: string;
    from: string;
    to: string;
    straight?: boolean;
    ignore_whitespace_change?: boolean;
    view?: string;
  }) => Promise<{
    from?: string;
    to?: string;
    compare_type?: string;
    compare_timeout?: boolean;
    compare_same_ref?: boolean;
    commits?: Array<{
      id?: string;
      short_id?: string;
      title?: string;
      author_name?: string;
      created_at?: string;
    }>;
    diffs?: Array<{
      old_path?: string;
      new_path?: string;
      diff?: string;
      new_file?: boolean;
      deleted_file?: boolean;
      renamed_file?: boolean;
    }>;
  }>;
};

export function createRepoCompareRefsHandler(client: RepoCompareRefsClient) {
  return async (input: unknown) => {
    const parsed = repoCompareRefsInput.parse(input);
    const response = await client.compareRefs(parsed);
    const result = mapRepoRefComparison(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
