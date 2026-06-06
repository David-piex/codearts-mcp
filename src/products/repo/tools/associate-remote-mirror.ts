import { asItemResult } from "../../../contracts/tool-result.js";
import { repoAssociateRemoteMirrorInput } from "../schemas.js";
import { mapRemoteMirror, type RemoteMirror } from "./remote-mirror-result.js";

export function previewAssociateRemoteMirror(input: {
  x_auth_token?: string;
  repository_id: string;
  url: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: associate remote mirror", {
    repositoryId: input.repository_id,
    url: input.url,
    tokenProvided: Boolean(input.x_auth_token),
    executed: !input.dry_run
  });
}

type RepoAssociateRemoteMirrorClient = {
  associateRemoteMirror: (input: { x_auth_token: string; repository_id: string; url: string }) => Promise<RemoteMirror>;
};

export function createRepoAssociateRemoteMirrorHandler(client: RepoAssociateRemoteMirrorClient) {
  return async (input: unknown) => {
    const parsed = repoAssociateRemoteMirrorInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAssociateRemoteMirror(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.associateRemoteMirror(parsed);
    const result = mapRemoteMirror("Associated remote mirror", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
