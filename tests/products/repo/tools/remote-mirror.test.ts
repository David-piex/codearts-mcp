import { describe, expect, it, vi } from "vitest";
import {
  createRepoAssociateRemoteMirrorHandler,
  previewAssociateRemoteMirror
} from "../../../../src/products/repo/tools/associate-remote-mirror.js";
import { createRepoGetRemoteMirrorHandler } from "../../../../src/products/repo/tools/get-remote-mirror.js";
import {
  createRepoStartRemoteMirrorSynchronizationHandler,
  previewStartRemoteMirrorSynchronization
} from "../../../../src/products/repo/tools/start-remote-mirror-synchronization.js";
import {
  createRepoUpdateRemoteMirrorHandler,
  previewUpdateRemoteMirror
} from "../../../../src/products/repo/tools/update-remote-mirror.js";

describe("remote mirror previews", () => {
  it("does not expose credentials in synchronization previews", () => {
    const result = previewStartRemoteMirrorSynchronization({
      repository_id: "repo-1",
      username: "encoded-user",
      password: "encoded-password",
      endpoint_uuid: "endpoint-1",
      force_fetch: true,
      dry_run: true
    });

    expect(result.item).toEqual({
      repositoryId: "repo-1",
      tokenProvided: false,
      usernameProvided: true,
      passwordProvided: true,
      endpointUuid: "endpoint-1",
      forceFetch: true,
      executed: false
    });
  });

  it("returns dry-run summaries for mirror association and update", () => {
    expect(
      previewAssociateRemoteMirror({
        x_auth_token: "token-1",
        repository_id: "repo-1",
        url: "https://example.com/repo.git",
        dry_run: true
      }).item
    ).toMatchObject({
      repositoryId: "repo-1",
      tokenProvided: true,
      executed: false
    });

    expect(
      previewUpdateRemoteMirror({
        x_auth_token: "token-1",
        repository_id: "repo-1",
        mirroring_enabled: true,
        sync_branch_type: "all",
        dry_run: true
      }).item
    ).toMatchObject({
      repositoryId: "repo-1",
      tokenProvided: true,
      mirroringEnabled: true,
      syncBranchType: "all",
      executed: false
    });
  });
});

describe("remote mirror handlers", () => {
  it("skips client calls for dry-run write operations", async () => {
    const associate = vi.fn();
    const start = vi.fn();
    const update = vi.fn();

    await createRepoAssociateRemoteMirrorHandler({ associateRemoteMirror: associate })({
      x_auth_token: "token-1",
      repository_id: "repo-1",
      url: "https://example.com/repo.git"
    });
    await createRepoStartRemoteMirrorSynchronizationHandler({ startRemoteMirrorSynchronization: start })({
      x_auth_token: "token-1",
      repository_id: "repo-1"
    });
    await createRepoUpdateRemoteMirrorHandler({ updateRemoteMirror: update })({
      x_auth_token: "token-1",
      repository_id: "repo-1",
      mirroring_enabled: true
    });

    expect(associate).not.toHaveBeenCalled();
    expect(start).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  it("maps remote mirror reads", async () => {
    const handler = createRepoGetRemoteMirrorHandler({
      getRemoteMirror: async () => ({
        id: 1,
        repository_id: 2,
        url: "https://example.com/repo.git",
        mirroring_enabled: true
      })
    });

    const result = await handler({ repository_id: "repo-1" });

    expect(result.structuredContent.item).toMatchObject({
      id: "1",
      repositoryId: "2",
      url: "https://example.com/repo.git",
      mirroringEnabled: true
    });
  });

  it("executes synchronization when dry_run is false", async () => {
    const start = vi.fn(async () => ({ jid: "job-1" }));
    const handler = createRepoStartRemoteMirrorSynchronizationHandler({
      startRemoteMirrorSynchronization: start
    });

    const result = await handler({ x_auth_token: "token-1", repository_id: "repo-1", dry_run: false });

    expect(start).toHaveBeenCalledWith({
      x_auth_token: "token-1",
      repository_id: "repo-1",
      dry_run: false
    });
    expect(result.structuredContent.item).toEqual({
      id: "job-1",
      jid: "job-1",
      executed: true
    });
  });
});
