import { asItemResult } from "../../../contracts/tool-result.js";

export type RemoteMirror = {
  id?: number | string;
  repository_id?: number | string;
  update_status?: string;
  last_update_at?: string;
  url?: string;
  last_successful_update_at?: string;
  number_of_failures?: number;
  mirroring_enabled?: boolean;
  is_private?: boolean;
  endpoint_uuid?: string;
  last_error?: string;
  sync_branch_type?: string;
};

export function mapRemoteMirror(summary: string, input: RemoteMirror) {
  return asItemResult(summary, {
    id: input.id !== undefined ? String(input.id) : undefined,
    repositoryId: input.repository_id !== undefined ? String(input.repository_id) : undefined,
    updateStatus: input.update_status,
    lastUpdateAt: input.last_update_at,
    url: input.url,
    lastSuccessfulUpdateAt: input.last_successful_update_at,
    numberOfFailures: input.number_of_failures,
    mirroringEnabled: input.mirroring_enabled,
    isPrivate: input.is_private,
    endpointUuid: input.endpoint_uuid,
    lastError: input.last_error,
    syncBranchType: input.sync_branch_type
  });
}
