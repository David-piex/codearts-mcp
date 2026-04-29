import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createRepoClient } from "../products/repo/client.js";
import {
  repoAssociateRemoteMirrorInput,
  repoCompareRefsInput,
  repoCloseMergeRequestInput,
  repoCreateMergeRequestDiscussionInput,
  repoCreateMergeRequestInput,
  repoCreateRepositoryInput,
  repoGetBranchInput,
  repoGetCommitInput,
  repoGetFileInput,
  repoGetMergeRequestInput,
  repoGetRemoteMirrorInput,
  repoGetRepositoryInput,
  repoGetTagInput,
  repoCreateTagInput,
  repoDeleteTagInput,
  repoListEventsInput,
  repoListPersonalRepositoryImportRecordsInput,
  repoListTagsInput,
  repoListBranchesInput,
  repoListCommitsInput,
  repoListMergeRequestChangesInput,
  repoListMergeRequestDiscussionsInput,
  repoListProtectedBranchesInput,
  repoListRepositoryLabelsInput,
  repoListMergeRequestsInput,
  repoMergeMergeRequestInput,
  repoListRepositoriesInput,
  repoReviewMergeRequestInput,
  repoStartRemoteMirrorSynchronizationInput,
  repoUpdateRemoteMirrorInput
} from "../products/repo/schemas.js";
import { createRepoAssociateRemoteMirrorHandler } from "../products/repo/tools/associate-remote-mirror.js";
import { createRepoCloseMergeRequestHandler } from "../products/repo/tools/close-merge-request.js";
import { createRepoCompareRefsHandler } from "../products/repo/tools/compare-refs.js";
import { createRepoCreateMergeRequestDiscussionHandler } from "../products/repo/tools/create-merge-request-discussion.js";
import { createRepoCreateMergeRequestHandler } from "../products/repo/tools/create-merge-request.js";
import { createRepoCreateRepositoryHandler } from "../products/repo/tools/create-repository.js";
import { createRepoGetBranchHandler } from "../products/repo/tools/get-branch.js";
import { createRepoGetCommitHandler } from "../products/repo/tools/get-commit.js";
import { createRepoGetFileHandler } from "../products/repo/tools/get-file.js";
import { createRepoGetMergeRequestHandler } from "../products/repo/tools/get-merge-request.js";
import { createRepoGetRemoteMirrorHandler } from "../products/repo/tools/get-remote-mirror.js";
import { createRepoGetRepositoryHandler } from "../products/repo/tools/get-repository.js";
import { createRepoGetTagHandler } from "../products/repo/tools/get-tag.js";
import { createRepoListBranchesHandler } from "../products/repo/tools/list-branches.js";
import { createRepoListCommitsHandler } from "../products/repo/tools/list-commits.js";
import { createRepoListEventsHandler } from "../products/repo/tools/list-events.js";
import { createRepoListMergeRequestChangesHandler } from "../products/repo/tools/list-merge-request-changes.js";
import { createRepoListMergeRequestDiscussionsHandler } from "../products/repo/tools/list-merge-request-discussions.js";
import { createRepoListMergeRequestsHandler } from "../products/repo/tools/list-merge-requests.js";
import { createRepoListPersonalRepositoryImportRecordsHandler } from "../products/repo/tools/list-personal-repository-import-records.js";
import { createRepoListProtectedBranchesHandler } from "../products/repo/tools/list-protected-branches.js";
import { createRepoListRepositoriesHandler } from "../products/repo/tools/list-repositories.js";
import { createRepoListRepositoryLabelsHandler } from "../products/repo/tools/list-repository-labels.js";
import { createRepoListTagsHandler } from "../products/repo/tools/list-tags.js";
import { createRepoMergeMergeRequestHandler } from "../products/repo/tools/merge-merge-request.js";
import { createRepoCreateTagHandler } from "../products/repo/tools/create-tag.js";
import { createRepoDeleteTagHandler } from "../products/repo/tools/delete-tag.js";
import { createRepoReviewMergeRequestHandler } from "../products/repo/tools/review-merge-request.js";
import { createRepoStartRemoteMirrorSynchronizationHandler } from "../products/repo/tools/start-remote-mirror-synchronization.js";
import { createRepoUpdateRemoteMirrorHandler } from "../products/repo/tools/update-remote-mirror.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type RepoStdioClient = ReturnType<typeof createRepoClient>;

const repoToolDefinitions = {
  "repo_list_repositories": defineProductTool({ description: "List CodeArts Repo repositories", inputSchema: repoListRepositoriesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoriesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoriesHandler }),
  "repo_get_repository": defineProductTool({ description: "Get CodeArts Repo repository detail", inputSchema: repoGetRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRepositoryHandler }),
  "repo_create_repository": defineProductTool({ description: "Create CodeArts Repo repository", inputSchema: repoCreateRepositoryInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateRepositoryHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateRepositoryHandler }),
  "repo_list_personal_repository_import_records": defineProductTool({ description: "List personal CodeArts Repo repository import records", inputSchema: repoListPersonalRepositoryImportRecordsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListPersonalRepositoryImportRecordsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListPersonalRepositoryImportRecordsHandler }),
  "repo_associate_remote_mirror": defineProductTool({ description: "Associate CodeArts Repo remote mirror", inputSchema: repoAssociateRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoAssociateRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoAssociateRemoteMirrorHandler }),
  "repo_start_remote_mirror_synchronization": defineProductTool({ description: "Start CodeArts Repo remote mirror synchronization", inputSchema: repoStartRemoteMirrorSynchronizationInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoStartRemoteMirrorSynchronizationHandler>[0] }) => clients.repoClient, createProductHandler: createRepoStartRemoteMirrorSynchronizationHandler }),
  "repo_get_remote_mirror": defineProductTool({ description: "Get CodeArts Repo remote mirror detail", inputSchema: repoGetRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetRemoteMirrorHandler }),
  "repo_update_remote_mirror": defineProductTool({ description: "Update CodeArts Repo remote mirror", inputSchema: repoUpdateRemoteMirrorInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoUpdateRemoteMirrorHandler>[0] }) => clients.repoClient, createProductHandler: createRepoUpdateRemoteMirrorHandler }),
  "repo_create_merge_request": defineProductTool({ description: "Create CodeArts Repo merge request", inputSchema: repoCreateMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateMergeRequestHandler }),
  "repo_create_merge_request_discussion": defineProductTool({ description: "Create CodeArts Repo merge request discussion", inputSchema: repoCreateMergeRequestDiscussionInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateMergeRequestDiscussionHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateMergeRequestDiscussionHandler }),
  "repo_close_merge_request": defineProductTool({ description: "Close CodeArts Repo merge request", inputSchema: repoCloseMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCloseMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCloseMergeRequestHandler }),
  "repo_list_merge_request_changes": defineProductTool({ description: "List CodeArts Repo merge request changes", inputSchema: repoListMergeRequestChangesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestChangesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestChangesHandler }),
  "repo_list_merge_request_discussions": defineProductTool({ description: "List CodeArts Repo merge request discussions", inputSchema: repoListMergeRequestDiscussionsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestDiscussionsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestDiscussionsHandler }),
  "repo_list_protected_branches": defineProductTool({ description: "List CodeArts Repo protected branches", inputSchema: repoListProtectedBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListProtectedBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListProtectedBranchesHandler }),
  "repo_list_repository_labels": defineProductTool({ description: "List CodeArts Repo repository labels", inputSchema: repoListRepositoryLabelsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListRepositoryLabelsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListRepositoryLabelsHandler }),
  "repo_create_tag": defineProductTool({ description: "Create CodeArts Repo tag", inputSchema: repoCreateTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCreateTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCreateTagHandler }),
  "repo_delete_tag": defineProductTool({ description: "Delete CodeArts Repo tag", inputSchema: repoDeleteTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoDeleteTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoDeleteTagHandler }),
  "repo_list_tags": defineProductTool({ description: "List CodeArts Repo tags", inputSchema: repoListTagsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListTagsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListTagsHandler }),
  "repo_list_events": defineProductTool({ description: "List CodeArts Repo events", inputSchema: repoListEventsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListEventsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListEventsHandler }),
  "repo_list_merge_requests": defineProductTool({ description: "List CodeArts Repo merge requests", inputSchema: repoListMergeRequestsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListMergeRequestsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListMergeRequestsHandler }),
  "repo_get_branch": defineProductTool({ description: "Get CodeArts Repo branch detail", inputSchema: repoGetBranchInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetBranchHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetBranchHandler }),
  "repo_compare_refs": defineProductTool({ description: "Compare CodeArts Repo refs", inputSchema: repoCompareRefsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoCompareRefsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoCompareRefsHandler }),
  "repo_get_tag": defineProductTool({ description: "Get CodeArts Repo tag detail", inputSchema: repoGetTagInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetTagHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetTagHandler }),
  "repo_get_merge_request": defineProductTool({ description: "Get CodeArts Repo merge request detail", inputSchema: repoGetMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetMergeRequestHandler }),
  "repo_merge_merge_request": defineProductTool({ description: "Merge CodeArts Repo merge request", inputSchema: repoMergeMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoMergeMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoMergeMergeRequestHandler }),
  "repo_review_merge_request": defineProductTool({ description: "Review CodeArts Repo merge request", inputSchema: repoReviewMergeRequestInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoReviewMergeRequestHandler>[0] }) => clients.repoClient, createProductHandler: createRepoReviewMergeRequestHandler }),
  "repo_get_file": defineProductTool({ description: "Get CodeArts Repo file content", inputSchema: repoGetFileInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetFileHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetFileHandler }),
  "repo_list_commits": defineProductTool({ description: "List CodeArts Repo commits", inputSchema: repoListCommitsInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListCommitsHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListCommitsHandler }),
  "repo_get_commit": defineProductTool({ description: "Get CodeArts Repo commit detail", inputSchema: repoGetCommitInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoGetCommitHandler>[0] }) => clients.repoClient, createProductHandler: createRepoGetCommitHandler }),
  "repo_list_branches": defineProductTool({ description: "List CodeArts Repo branches", inputSchema: repoListBranchesInput, selectHttpClient: (clients: { repoClient: Parameters<typeof createRepoListBranchesHandler>[0] }) => clients.repoClient, createProductHandler: createRepoListBranchesHandler })
} as const;

export function registerRepoTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: RepoStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: repoToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
