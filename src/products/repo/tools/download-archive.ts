import type { RepoArchiveDownloadResult } from "../client.js";
import { repoDownloadArchiveInput } from "../schemas.js";
import { mapArchiveDownloadResult } from "./user-settings-result.js";

type Client = {
  downloadArchive: (input: {
    repository_id: string;
    sha?: string;
    path?: string;
    archive_format?: "zip" | "tar.gz" | "tar.bz2" | "tar";
  }) => Promise<RepoArchiveDownloadResult>;
};

export function createRepoDownloadArchiveHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = repoDownloadArchiveInput.parse(input);
    const response = await client.downloadArchive(parsed);
    const result = mapArchiveDownloadResult("Downloaded repository archive", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
