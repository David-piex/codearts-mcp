import { repoShowFileInput } from "../schemas.js";
import { mapRepositoryFileDetail } from "./repository-browse-result.js";

type RepoShowFileClient = {
  showFile: (input: {
    repository_id: string;
    file_path: string;
    ref?: string;
  }) => Promise<{
    name?: string;
    path?: string;
    size?: number;
    encoding?: string;
    ref?: string;
    blob_id?: string;
    file_type?: string;
    content?: string;
    is_limited?: boolean;
    content_sha256?: string;
    last_commit_id?: string;
    nick_name?: string;
    tenant_name?: string;
    user_name?: string;
    commit?: {
      id?: string;
      title?: string;
      message?: string;
      author_name?: string;
      authored_date?: string;
      committed_date?: string;
    };
  }>;
};

export function createRepoShowFileHandler(client: RepoShowFileClient) {
  return async (input: unknown) => {
    const parsed = repoShowFileInput.parse(input);
    const response = await client.showFile(parsed);
    const result = mapRepositoryFileDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
