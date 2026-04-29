import { repoGetRemoteMirrorInput } from "../schemas.js";
import { mapRemoteMirror, type RemoteMirror } from "./remote-mirror-result.js";

type RepoGetRemoteMirrorClient = {
  getRemoteMirror: (input: { repository_id: string }) => Promise<RemoteMirror>;
};

export function createRepoGetRemoteMirrorHandler(client: RepoGetRemoteMirrorClient) {
  return async (input: unknown) => {
    const parsed = repoGetRemoteMirrorInput.parse(input);
    const response = await client.getRemoteMirror(parsed);
    const result = mapRemoteMirror("Fetched remote mirror", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
