import { asItemResult } from "../../../contracts/tool-result.js";
import { repoShowFileRawInput } from "../schemas.js";

type RepoShowFileRawClient = {
  showFileRaw: (input: {
    repository_id: string;
    file_path: string;
    ref?: string;
  }) => Promise<{
    repository_id: string;
    file_path: string;
    ref?: string;
    content: string;
  }>;
};

export function createRepoShowFileRawHandler(client: RepoShowFileRawClient) {
  return async (input: unknown) => {
    const parsed = repoShowFileRawInput.parse(input);
    const response = await client.showFileRaw(parsed);
    const result = asItemResult(`Loaded raw file ${response.file_path}`, {
      repositoryId: response.repository_id,
      filePath: response.file_path,
      ref: response.ref,
      content: response.content
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
