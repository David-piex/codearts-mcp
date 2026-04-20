import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createArtifactClient } from "../products/artifact/client.js";
import {
  artifactDeleteFileInput,
  artifactGetFileTreeInput,
  artifactGetFileInput,
  artifactGetDownloadUrlInput,
  artifactGetRepositoryInput,
  artifactListBuildArchivesInput,
  artifactListFilesInput,
  artifactListLatestVersionFilesInput,
  artifactListRepositoriesInput,
  artifactListVersionsInput,
  artifactSearchArtifactsInput,
  artifactShowAuditInput
} from "../products/artifact/schemas.js";
import { createArtifactDeleteFileHandler } from "../products/artifact/tools/delete-file.js";
import { createArtifactGetFileTreeHandler } from "../products/artifact/tools/get-file-tree.js";
import { createArtifactGetFileHandler } from "../products/artifact/tools/get-file.js";
import { createArtifactGetDownloadUrlHandler } from "../products/artifact/tools/get-download-url.js";
import { createArtifactGetRepositoryHandler } from "../products/artifact/tools/get-repository.js";
import { createArtifactListBuildArchivesHandler } from "../products/artifact/tools/list-build-archives.js";
import { createArtifactListFilesHandler } from "../products/artifact/tools/list-files.js";
import { createArtifactListLatestVersionFilesHandler } from "../products/artifact/tools/list-latest-version-files.js";
import { createArtifactListRepositoriesHandler } from "../products/artifact/tools/list-repositories.js";
import { createArtifactListVersionsHandler } from "../products/artifact/tools/list-versions.js";
import { createArtifactSearchArtifactsHandler } from "../products/artifact/tools/search-artifacts.js";
import { createArtifactShowAuditHandler } from "../products/artifact/tools/show-audit.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { SessionCredentialStore } from "./session-store.js";

type RegisterableServer = Pick<McpServer, "registerTool">;
type ArtifactStdioClient = ReturnType<typeof createArtifactClient>;

const artifactToolDefinitions = {
  "artifact_list_repositories": defineProductTool({
    description: "List CodeArts Artifact repositories",
    inputSchema: artifactListRepositoriesInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactListRepositoriesHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactListRepositoriesHandler
  }),
  "artifact_list_versions": defineProductTool({
    description: "List CodeArts Artifact versions",
    inputSchema: artifactListVersionsInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactListVersionsHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactListVersionsHandler
  }),
  "artifact_get_file_tree": defineProductTool({
    description: "Get CodeArts Artifact file tree",
    inputSchema: artifactGetFileTreeInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactGetFileTreeHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactGetFileTreeHandler
  }),
  "artifact_list_latest_version_files": defineProductTool({
    description: "List CodeArts Artifact latest version files",
    inputSchema: artifactListLatestVersionFilesInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactListLatestVersionFilesHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactListLatestVersionFilesHandler
  }),
  "artifact_get_repository": defineProductTool({
    description: "Get CodeArts Artifact repository detail",
    inputSchema: artifactGetRepositoryInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactGetRepositoryHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactGetRepositoryHandler
  }),
  "artifact_list_files": defineProductTool({
    description: "List CodeArts Artifact files",
    inputSchema: artifactListFilesInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactListFilesHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactListFilesHandler
  }),
  "artifact_get_file": defineProductTool({
    description: "Get CodeArts Artifact file detail",
    inputSchema: artifactGetFileInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactGetFileHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactGetFileHandler
  }),
  "artifact_get_download_url": defineProductTool({
    description: "Get CodeArts Artifact file download URL",
    inputSchema: artifactGetDownloadUrlInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactGetDownloadUrlHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactGetDownloadUrlHandler
  }),
  "artifact_delete_file": defineProductTool({
    description: "Delete CodeArts Artifact file",
    inputSchema: artifactDeleteFileInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactDeleteFileHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactDeleteFileHandler
  }),
  "artifact_list_build_archives": defineProductTool({
    description: "List CodeArts Artifact build archives",
    inputSchema: artifactListBuildArchivesInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactListBuildArchivesHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactListBuildArchivesHandler
  }),
  "artifact_search_artifacts": defineProductTool({
    description: "Search CodeArts Artifact artifacts",
    inputSchema: artifactSearchArtifactsInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactSearchArtifactsHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactSearchArtifactsHandler
  }),
  "artifact_show_audit": defineProductTool({
    description: "Show CodeArts Artifact audit logs",
    inputSchema: artifactShowAuditInput,
    selectHttpClient: (clients: { artifactClient: Parameters<typeof createArtifactShowAuditHandler>[0] }) => clients.artifactClient,
    createProductHandler: createArtifactShowAuditHandler
  })
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
    rateLimiter: options.rateLimiter
  });
}
