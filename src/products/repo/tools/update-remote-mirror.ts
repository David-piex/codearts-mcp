import { asItemResult } from "../../../contracts/tool-result.js";
import { repoUpdateRemoteMirrorInput } from "../schemas.js";
import { mapRemoteMirror, type RemoteMirror } from "./remote-mirror-result.js";

export function previewUpdateRemoteMirror(input: {
  repository_id: string;
  url?: string;
  sync_branch_type?: "all" | "default";
  mirroring_enabled?: boolean;
  endpoint_uuid?: string;
  dry_run: boolean;
}) {
  return asItemResult("Dry run: update remote mirror", {
    repositoryId: input.repository_id,
    url: input.url,
    syncBranchType: input.sync_branch_type,
    mirroringEnabled: input.mirroring_enabled,
    endpointUuid: input.endpoint_uuid,
    executed: !input.dry_run
  });
}

type RepoUpdateRemoteMirrorClient = {
  updateRemoteMirror: (input: {
    repository_id: string;
    url?: string;
    sync_branch_type?: "all" | "default";
    mirroring_enabled?: boolean;
    endpoint_uuid?: string;
  }) => Promise<RemoteMirror>;
};

export function createRepoUpdateRemoteMirrorHandler(client: RepoUpdateRemoteMirrorClient) {
  return async (input: unknown) => {
    const parsed = repoUpdateRemoteMirrorInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateRemoteMirror(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateRemoteMirror(parsed);
    const result = mapRemoteMirror("Updated remote mirror", response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
