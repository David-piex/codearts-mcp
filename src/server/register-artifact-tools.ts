import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import { createArtifactClient } from "../products/artifact/client.js";
import {
  artifactCreateAttentionInput,
  artifactDeleteFileInput,
  artifactDeleteCompletelyUpdateFileStateInput,
  artifactDeleteTrashRepositoriesInput,
  artifactCreateRepositoryInput,
  artifactGetFileTreeInput,
  artifactGetFileInput,
  artifactGetDownloadUrlInput,
  artifactGetRepositoryInput,
  artifactGetRepositoryDetailInput,
  artifactGetRepositoryUserInfoInput,
  artifactGetRepoFileInfoByIdInput,
  artifactGetRepoFileInfoByNameInput,
  artifactListBuildArchivesInput,
  artifactListAttentionsInput,
  artifactListChildProxyRepositoriesInput,
  artifactListDomainIpConfigsInput,
  artifactListFilesInput,
  artifactListLatestVersionFilesInput,
  artifactListMavenRepositoryListInput,
  artifactListMavenRepositoriesInput,
  artifactListMavenProjectRepositoriesInput,
  artifactListNetProxyInput,
  artifactListProjectRolePermissionsInput,
  artifactListProjectReleaseFilesInput,
  artifactListProjectUsersInput,
  artifactListRepositoriesInput,
  artifactListRepositoryUsersInput,
  artifactListReleaseFilesInput,
  artifactListSecGuardTasksInput,
  artifactListStorageStatisticsInput,
  artifactListVersionsInput,
  artifactRestoreTrashRepositoriesInput,
  artifactSearchArtifactsInput,
  artifactSearchByChecksumInput,
  artifactShowAuditInput,
  artifactShowAutoDeleteJobSettingsInput,
  artifactShowCapacityNoticeSettingsInput,
  artifactShowDomainReleaseRepoStorageInput,
  artifactShowLatestVersionFilesCountInput,
  artifactShowOpenSourceEnabledInput,
  artifactShowPackageDataDetailInput,
  artifactShowPackageInfoInput,
  artifactShowProjectStorageInfoInput,
  artifactShowProjectVersionsCountInput,
  artifactShowRepositoryPrivilegesInput,
  artifactShowUserTicketInput,
  artifactShowUserPermissionsInput,
  artifactShowUserPrivilegesInput,
  artifactShowUserPrivilegesV3Input,
  artifactUpdateRepositoryInput,
} from "../products/artifact/schemas.js";
import {
  createArtifactShowFileDetailByFullNameHandler,
  createArtifactGetRepoFileInfoByIdHandler,
  createArtifactGetRepoFileInfoByNameHandler,
  createArtifactGetRepositoryDetailHandler,
  createArtifactListDomainIpConfigsHandler,
  createArtifactListMavenRepositoryListHandler,
  createArtifactListMavenRepositoriesHandler,
  createArtifactListProjectReleaseFilesHandler,
  createArtifactListProjectUsersHandler,
  createArtifactListReleaseFilesHandler,
  createArtifactShowRepositoryPrivilegesHandler,
  createArtifactShowUserTicketHandler,
  createArtifactShowUserPrivilegesV3Handler,
} from "../products/artifact/tools/additional-read-tools.js";
import {
  createArtifactCreateAttentionHandler,
  createArtifactDeleteCompletelyUpdateFileStateHandler,
} from "../products/artifact/tools/additional-mutation-tools.js";
import { createArtifactDeleteFileHandler } from "../products/artifact/tools/delete-file.js";
import { createArtifactGetFileTreeHandler } from "../products/artifact/tools/get-file-tree.js";
import { createArtifactGetFileHandler } from "../products/artifact/tools/get-file.js";
import { createArtifactGetDownloadUrlHandler } from "../products/artifact/tools/get-download-url.js";
import { createArtifactGetRepositoryHandler } from "../products/artifact/tools/get-repository.js";
import { createArtifactGetRepositoryUserInfoHandler } from "../products/artifact/tools/get-repository-user-info.js";
import { createArtifactListAttentionsHandler } from "../products/artifact/tools/list-attentions.js";
import { createArtifactListBuildArchivesHandler } from "../products/artifact/tools/list-build-archives.js";
import { createArtifactListChildProxyRepositoriesHandler } from "../products/artifact/tools/list-child-proxy-repositories.js";
import { createArtifactListFilesHandler } from "../products/artifact/tools/list-files.js";
import { createArtifactListLatestVersionFilesHandler } from "../products/artifact/tools/list-latest-version-files.js";
import { createArtifactListMavenProjectRepositoriesHandler } from "../products/artifact/tools/list-maven-project-repositories.js";
import { createArtifactListNetProxyHandler } from "../products/artifact/tools/list-net-proxy.js";
import { createArtifactListProjectRolePermissionsHandler } from "../products/artifact/tools/list-project-role-permissions.js";
import { createArtifactListRepositoriesHandler } from "../products/artifact/tools/list-repositories.js";
import { createArtifactListRepositoryUsersHandler } from "../products/artifact/tools/list-repository-users.js";
import { createArtifactListSecGuardTasksHandler } from "../products/artifact/tools/list-sec-guard-tasks.js";
import { createArtifactListStorageStatisticsHandler } from "../products/artifact/tools/list-storage-statistics.js";
import { createArtifactListVersionsHandler } from "../products/artifact/tools/list-versions.js";
import {
  createArtifactCreateRepositoryHandler,
  createArtifactDeleteTrashRepositoriesHandler,
  createArtifactRestoreTrashRepositoriesHandler,
  createArtifactUpdateRepositoryHandler,
} from "../products/artifact/tools/repository-mutations.js";
import { createArtifactSearchArtifactsHandler } from "../products/artifact/tools/search-artifacts.js";
import { createArtifactSearchByChecksumHandler } from "../products/artifact/tools/search-by-checksum.js";
import { createArtifactShowAuditHandler } from "../products/artifact/tools/show-audit.js";
import { createArtifactShowAutoDeleteJobSettingsHandler } from "../products/artifact/tools/show-auto-delete-job-settings.js";
import { createArtifactShowCapacityNoticeSettingsHandler } from "../products/artifact/tools/show-capacity-notice-settings.js";
import { createArtifactShowDomainReleaseRepoStorageHandler } from "../products/artifact/tools/show-domain-release-repo-storage.js";
import { createArtifactShowLatestVersionFilesCountHandler } from "../products/artifact/tools/show-latest-version-files-count.js";
import { createArtifactShowOpenSourceEnabledHandler } from "../products/artifact/tools/show-open-source-enabled.js";
import { createArtifactShowPackageDataDetailHandler } from "../products/artifact/tools/show-package-data-detail.js";
import { createArtifactShowPackageInfoHandler } from "../products/artifact/tools/show-package-info.js";
import { createArtifactShowProjectStorageInfoHandler } from "../products/artifact/tools/show-project-storage-info.js";
import { createArtifactShowProjectVersionsCountHandler } from "../products/artifact/tools/show-project-versions-count.js";
import { createArtifactShowUserPermissionsHandler } from "../products/artifact/tools/show-user-permissions.js";
import { createArtifactShowUserPrivilegesHandler } from "../products/artifact/tools/show-user-privileges.js";
import { createOfficialApiRequestHandler } from "../products/shared-tools/request-official-api.js";
import {
  defineProductTool,
  registerDefinedTool,
} from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type ArtifactStdioClient = ReturnType<typeof createArtifactClient>;

const artifactToolDefinitions = {
  artifact_request_official_api: defineProductTool({
    description:
      "Request a documented CodeArts Artifact API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createOfficialApiRequestHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createOfficialApiRequestHandler,
  }),
  artifact_list_repositories: defineProductTool({
    description: "List CodeArts Artifact repositories",
    inputSchema: artifactListRepositoriesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListRepositoriesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListRepositoriesHandler,
  }),
  artifact_create_repository: defineProductTool({
    description: "Create a CodeArts Artifact repository",
    inputSchema: artifactCreateRepositoryInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactCreateRepositoryHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactCreateRepositoryHandler,
  }),
  artifact_update_repository: defineProductTool({
    description: "Update CodeArts Artifact repositories",
    inputSchema: artifactUpdateRepositoryInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactUpdateRepositoryHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactUpdateRepositoryHandler,
  }),
  artifact_restore_trash_repositories: defineProductTool({
    description: "Restore CodeArts Artifact repositories from the recycle bin",
    inputSchema: artifactRestoreTrashRepositoriesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactRestoreTrashRepositoriesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactRestoreTrashRepositoriesHandler,
  }),
  artifact_delete_trash_repositories: defineProductTool({
    description:
      "Permanently delete CodeArts Artifact repositories from the recycle bin",
    inputSchema: artifactDeleteTrashRepositoriesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactDeleteTrashRepositoriesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactDeleteTrashRepositoriesHandler,
  }),
  artifact_list_versions: defineProductTool({
    description: "List CodeArts Artifact versions",
    inputSchema: artifactListVersionsInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactListVersionsHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListVersionsHandler,
  }),
  artifact_get_file_tree: defineProductTool({
    description: "Get CodeArts Artifact file tree",
    inputSchema: artifactGetFileTreeInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactGetFileTreeHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactGetFileTreeHandler,
  }),
  artifact_list_latest_version_files: defineProductTool({
    description: "List CodeArts Artifact latest version files",
    inputSchema: artifactListLatestVersionFilesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListLatestVersionFilesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListLatestVersionFilesHandler,
  }),
  artifact_list_maven_project_repositories: defineProductTool({
    description: "List CodeArts Artifact Maven project repositories",
    inputSchema: artifactListMavenProjectRepositoriesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListMavenProjectRepositoriesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListMavenProjectRepositoriesHandler,
  }),
  artifact_list_maven_repositories: defineProductTool({
    description: "List CodeArts Artifact Maven repositories",
    inputSchema: artifactListMavenRepositoriesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListMavenRepositoriesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListMavenRepositoriesHandler,
  }),
  artifact_list_maven_repository_list: defineProductTool({
    description: "List CodeArts Artifact Maven repository list records",
    inputSchema: artifactListMavenRepositoryListInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListMavenRepositoryListHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListMavenRepositoryListHandler,
  }),
  artifact_get_repository_detail: defineProductTool({
    description: "Get CodeArts Artifact repository detail by project and repo",
    inputSchema: artifactGetRepositoryDetailInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactGetRepositoryDetailHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactGetRepositoryDetailHandler,
  }),
  artifact_list_project_release_files: defineProductTool({
    description: "List CodeArts Artifact project release files",
    inputSchema: artifactListProjectReleaseFilesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListProjectReleaseFilesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListProjectReleaseFilesHandler,
  }),
  artifact_list_release_files: defineProductTool({
    description: "List CodeArts Artifact release files",
    inputSchema: artifactListReleaseFilesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListReleaseFilesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListReleaseFilesHandler,
  }),
  artifact_show_latest_version_files_count: defineProductTool({
    description: "Show CodeArts Artifact latest version file count",
    inputSchema: artifactShowLatestVersionFilesCountInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowLatestVersionFilesCountHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowLatestVersionFilesCountHandler,
  }),
  artifact_show_project_versions_count: defineProductTool({
    description: "Show CodeArts Artifact project version count",
    inputSchema: artifactShowProjectVersionsCountInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowProjectVersionsCountHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowProjectVersionsCountHandler,
  }),
  artifact_show_package_data_detail: defineProductTool({
    description: "Show CodeArts Artifact package data detail",
    inputSchema: artifactShowPackageDataDetailInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowPackageDataDetailHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowPackageDataDetailHandler,
  }),
  artifact_show_package_info: defineProductTool({
    description: "Show CodeArts Artifact package info",
    inputSchema: artifactShowPackageInfoInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowPackageInfoHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowPackageInfoHandler,
  }),
  artifact_show_domain_release_repo_storage: defineProductTool({
    description: "Show CodeArts Artifact tenant release repository storage",
    inputSchema: artifactShowDomainReleaseRepoStorageInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowDomainReleaseRepoStorageHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowDomainReleaseRepoStorageHandler,
  }),
  artifact_show_project_storage_info: defineProductTool({
    description: "Show CodeArts Artifact project storage info",
    inputSchema: artifactShowProjectStorageInfoInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowProjectStorageInfoHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowProjectStorageInfoHandler,
  }),
  artifact_show_capacity_notice_settings: defineProductTool({
    description: "Show CodeArts Artifact capacity notice settings",
    inputSchema: artifactShowCapacityNoticeSettingsInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowCapacityNoticeSettingsHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowCapacityNoticeSettingsHandler,
  }),
  artifact_show_auto_delete_job_settings: defineProductTool({
    description: "Show CodeArts Artifact auto delete job settings",
    inputSchema: artifactShowAutoDeleteJobSettingsInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowAutoDeleteJobSettingsHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowAutoDeleteJobSettingsHandler,
  }),
  artifact_show_user_privileges: defineProductTool({
    description: "Show CodeArts Artifact user privileges",
    inputSchema: artifactShowUserPrivilegesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowUserPrivilegesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowUserPrivilegesHandler,
  }),
  artifact_show_user_permissions: defineProductTool({
    description: "Show CodeArts Artifact user permissions",
    inputSchema: artifactShowUserPermissionsInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowUserPermissionsHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowUserPermissionsHandler,
  }),
  artifact_get_repository_user_info: defineProductTool({
    description: "Get CodeArts Artifact repository user info",
    inputSchema: artifactGetRepositoryUserInfoInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactGetRepositoryUserInfoHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactGetRepositoryUserInfoHandler,
  }),
  artifact_list_repository_users: defineProductTool({
    description: "List CodeArts Artifact repository users",
    inputSchema: artifactListRepositoryUsersInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListRepositoryUsersHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListRepositoryUsersHandler,
  }),
  artifact_list_project_users: defineProductTool({
    description: "List CodeArts Artifact project users",
    inputSchema: artifactListProjectUsersInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListProjectUsersHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListProjectUsersHandler,
  }),
  artifact_list_project_role_permissions: defineProductTool({
    description: "List CodeArts Artifact project role permissions",
    inputSchema: artifactListProjectRolePermissionsInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListProjectRolePermissionsHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListProjectRolePermissionsHandler,
  }),
  artifact_list_child_proxy_repositories: defineProductTool({
    description: "List CodeArts Artifact child proxy repositories",
    inputSchema: artifactListChildProxyRepositoriesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListChildProxyRepositoriesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListChildProxyRepositoriesHandler,
  }),
  artifact_list_net_proxy: defineProductTool({
    description: "List CodeArts Artifact network proxies",
    inputSchema: artifactListNetProxyInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactListNetProxyHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListNetProxyHandler,
  }),
  artifact_list_domain_ip_configs: defineProductTool({
    description: "List CodeArts Artifact domain IP configs",
    inputSchema: artifactListDomainIpConfigsInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListDomainIpConfigsHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListDomainIpConfigsHandler,
  }),
  artifact_list_storage_statistics: defineProductTool({
    description: "List CodeArts Artifact storage statistics",
    inputSchema: artifactListStorageStatisticsInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListStorageStatisticsHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListStorageStatisticsHandler,
  }),
  artifact_list_attentions: defineProductTool({
    description: "List CodeArts Artifact attentions",
    inputSchema: artifactListAttentionsInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactListAttentionsHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListAttentionsHandler,
  }),
  artifact_list_sec_guard_tasks: defineProductTool({
    description: "List CodeArts Artifact security guard tasks",
    inputSchema: artifactListSecGuardTasksInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListSecGuardTasksHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListSecGuardTasksHandler,
  }),
  artifact_show_open_source_enabled: defineProductTool({
    description: "Show CodeArts Artifact open source enabled status",
    inputSchema: artifactShowOpenSourceEnabledInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowOpenSourceEnabledHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowOpenSourceEnabledHandler,
  }),
  artifact_get_repository: defineProductTool({
    description: "Get CodeArts Artifact repository detail",
    inputSchema: artifactGetRepositoryInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactGetRepositoryHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactGetRepositoryHandler,
  }),
  artifact_list_files: defineProductTool({
    description: "List CodeArts Artifact files",
    inputSchema: artifactListFilesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactListFilesHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListFilesHandler,
  }),
  artifact_get_file: defineProductTool({
    description: "Get CodeArts Artifact file detail",
    inputSchema: artifactGetFileInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactGetFileHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactGetFileHandler,
  }),
  artifact_get_download_url: defineProductTool({
    description: "Get CodeArts Artifact file download URL",
    inputSchema: artifactGetDownloadUrlInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactGetDownloadUrlHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactGetDownloadUrlHandler,
  }),
  artifact_delete_file: defineProductTool({
    description: "Delete CodeArts Artifact file",
    inputSchema: artifactDeleteFileInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactDeleteFileHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactDeleteFileHandler,
  }),
  artifact_list_build_archives: defineProductTool({
    description: "List CodeArts Artifact build archives",
    inputSchema: artifactListBuildArchivesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactListBuildArchivesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactListBuildArchivesHandler,
  }),
  artifact_search_artifacts: defineProductTool({
    description: "Search CodeArts Artifact artifacts",
    inputSchema: artifactSearchArtifactsInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactSearchArtifactsHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactSearchArtifactsHandler,
  }),
  artifact_search_by_checksum: defineProductTool({
    description: "Search CodeArts Artifact artifacts by checksum",
    inputSchema: artifactSearchByChecksumInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactSearchByChecksumHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactSearchByChecksumHandler,
  }),
  artifact_show_repository_privileges: defineProductTool({
    description: "Show CodeArts Artifact repository privileges",
    inputSchema: artifactShowRepositoryPrivilegesInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowRepositoryPrivilegesHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowRepositoryPrivilegesHandler,
  }),
  artifact_show_user_privileges_v3: defineProductTool({
    description: "Show CodeArts Artifact v3 user privileges",
    inputSchema: artifactShowUserPrivilegesV3Input,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowUserPrivilegesV3Handler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowUserPrivilegesV3Handler,
  }),
  artifact_get_repo_file_info_by_id: defineProductTool({
    description: "Get CodeArts Artifact repository file info by id",
    inputSchema: artifactGetRepoFileInfoByIdInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactGetRepoFileInfoByIdHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactGetRepoFileInfoByIdHandler,
  }),
  artifact_get_repo_file_info_by_name: defineProductTool({
    description: "Get CodeArts Artifact repository file info by name",
    inputSchema: artifactGetRepoFileInfoByNameInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactGetRepoFileInfoByNameHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactGetRepoFileInfoByNameHandler,
  }),
  artifact_show_file_detail_by_full_name: defineProductTool({
    description: "Show CodeArts Artifact file detail by full name",
    inputSchema: artifactGetRepoFileInfoByNameInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<
        typeof createArtifactShowFileDetailByFullNameHandler
      >[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowFileDetailByFullNameHandler,
  }),
  artifact_show_user_ticket: defineProductTool({
    description: "Show CodeArts Artifact user ticket",
    inputSchema: artifactShowUserTicketInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactShowUserTicketHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowUserTicketHandler,
  }),
  artifact_create_attention: defineProductTool({
    description: "Create or remove CodeArts Artifact attention items",
    inputSchema: artifactCreateAttentionInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactCreateAttentionHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactCreateAttentionHandler,
  }),
  artifact_delete_completely_update_file_state: defineProductTool({
    description: "Permanently delete CodeArts Artifact files by id through the official DeleteCompletelyUpdateFileState endpoint",
    inputSchema: artifactDeleteCompletelyUpdateFileStateInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactDeleteCompletelyUpdateFileStateHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactDeleteCompletelyUpdateFileStateHandler,
  }),
  artifact_show_audit: defineProductTool({
    description: "Show CodeArts Artifact audit logs",
    inputSchema: artifactShowAuditInput,
    selectHttpClient: (clients: {
      artifactClient: Parameters<typeof createArtifactShowAuditHandler>[0];
    }) => clients.artifactClient,
    createProductHandler: createArtifactShowAuditHandler,
  }),
} as const;

export function registerArtifactTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: ArtifactStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: artifactToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter,
  });
}
