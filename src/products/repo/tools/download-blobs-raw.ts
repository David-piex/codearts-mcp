import { asItemResult } from "../../../contracts/tool-result.js";
import { repoDownloadBlobsRawInput } from "../schemas.js";

type RepoDownloadBlobsRawClient = {
  downloadBlobsRaw: (input: {
    repository_id: string;
    blob_id: string;
    file_path: string;
    file_name?: string;
  }) => Promise<{
    repository_id: string;
    blob_id: string;
    file_path: string;
    file_name?: string;
    content: string;
  }>;
};

export function createRepoDownloadBlobsRawHandler(client: RepoDownloadBlobsRawClient) {
  return async (input: unknown) => {
    const parsed = repoDownloadBlobsRawInput.parse(input);
    const response = await client.downloadBlobsRaw(parsed);
    const result = asItemResult(`Downloaded blob ${response.blob_id}`, {
      repositoryId: response.repository_id,
      blobId: response.blob_id,
      filePath: response.file_path,
      fileName: response.file_name,
      content: response.content
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
