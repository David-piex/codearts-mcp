import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListMergeRequestChangesInput } from "../schemas.js";

export function mapMergeRequestChanges(
  items: Array<{
    old_path?: string;
    new_path?: string;
    new_file?: boolean;
    deleted_file?: boolean;
    renamed_file?: boolean;
    diff?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} merge request changes found`,
    items.map((item) => ({
      id: item.new_path ?? item.old_path ?? "",
      oldPath: item.old_path,
      newPath: item.new_path,
      newFile: item.new_file,
      deletedFile: item.deleted_file,
      renamedFile: item.renamed_file,
      diff: item.diff
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListMergeRequestChangesClient = {
  listMergeRequestChanges: (input: {
    repository_id: string;
    merge_request_iid: string;
  }) => Promise<{
    changes: Array<{
      old_path?: string;
      new_path?: string;
      new_file?: boolean;
      deleted_file?: boolean;
      renamed_file?: boolean;
      diff?: string;
    }>;
    total?: number;
  }>;
};

export function createRepoListMergeRequestChangesHandler(client: RepoListMergeRequestChangesClient) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestChangesInput.parse(input);
    const response = await client.listMergeRequestChanges(parsed);
    const offset = (parsed.page - 1) * parsed.page_size;
    const pageItems = response.changes.slice(offset, offset + parsed.page_size);
    const result = mapMergeRequestChanges(
      pageItems,
      parsed.page,
      parsed.page_size,
      response.total ?? response.changes.length
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
