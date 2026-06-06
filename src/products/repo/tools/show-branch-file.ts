import { repoShowBranchFileInput } from "../schemas.js";
import { mapRepositoryFileDetail } from "./repository-browse-result.js";

type RepoShowBranchFileClient = {
  showBranchFile: (input: {
    x_auth_token: string;
    repository_uuid: string;
    branch_name: string;
    file_path: string;
  }) => Promise<{
    name?: string;
    path?: string;
    size?: number;
    encoding?: string;
    ref?: string;
    blob_id?: string;
    file_type?: string;
    content?: string;
  }>;
};

export function createRepoShowBranchFileHandler(client: RepoShowBranchFileClient) {
  return async (input: unknown) => {
    const parsed = repoShowBranchFileInput.parse(input);
    const response = await client.showBranchFile(parsed);
    const result = mapRepositoryFileDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
