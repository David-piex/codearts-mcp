import { mapMergeRequestConflictFiles } from "./merge-request-read-result.js";
import { repoListMergeRequestConflictFilesInput } from "../schemas.js";

type RepoListMergeRequestConflictFilesClient = {
  listMergeRequestConflictFiles: (input: {
    repository_id: string;
    merge_request_iid: string;
    page: number;
    page_size: number;
    hide_content?: boolean;
  }) => Promise<{
    files: Array<{
      old_path?: string;
      new_path?: string;
      blob_icon?: string;
      blob_path?: string;
      conflict_type?: string;
      content?: string;
      content_path?: string;
      sections?: Array<{
        conflict?: boolean;
        lines?: Array<{
          line_code?: string;
          type?: string;
          old_line?: number;
          new_line?: number;
          text?: string;
          meta_data?: {
            old_pos?: number;
            new_pos?: number;
          };
          rich_text?: string;
          can_receive_suggestion?: boolean;
        }>;
        id?: string;
      }>;
      type?: string;
      error_message?: string;
    }>;
    total?: number;
  }>;
};

export function createRepoListMergeRequestConflictFilesHandler(
  client: RepoListMergeRequestConflictFilesClient
) {
  return async (input: unknown) => {
    const parsed = repoListMergeRequestConflictFilesInput.parse(input);
    const response = await client.listMergeRequestConflictFiles(parsed);
    const offset = (parsed.page - 1) * parsed.page_size;
    const pageItems = response.files.slice(offset, offset + parsed.page_size);
    const result = mapMergeRequestConflictFiles(
      pageItems,
      parsed.page,
      parsed.page_size,
      response.total ?? response.files.length
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
