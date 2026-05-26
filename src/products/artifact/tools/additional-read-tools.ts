import {
  artifactGetRepoFileInfoByIdInput,
  artifactGetRepoFileInfoByNameInput,
  artifactListDomainIpConfigsInput,
  artifactListMavenRepositoriesInput,
  artifactListProjectReleaseFilesInput,
  artifactListProjectUsersInput,
  artifactListReleaseFilesInput,
  artifactShowRepositoryPrivilegesInput,
  artifactShowUserPrivilegesV3Input
} from "../schemas.js";
import { formatArtifactRecordListText, mapArtifactRecordItem, mapArtifactRecordList } from "./generic-record-tools.js";

type Client = {
  listMavenRepositories: (input: {
    project_id?: string;
    default?: boolean;
    policy?: string;
    repo_ids?: string[];
    access?: string;
  }) => Promise<{ repositories: Array<Record<string, unknown>>; total?: number }>;
  listProjectReleaseFiles: (input: {
    project_id: string;
    file_name: string;
    page: number;
    page_size: number;
  }) => Promise<{ files: Array<Record<string, unknown>>; total?: number }>;
  listReleaseFiles: (input: {
    project_id: string;
    file_name: string;
    page: number;
    page_size: number;
  }) => Promise<{ files: Array<Record<string, unknown>>; total?: number }>;
  listProjectUsers: (input: {
    project_id: string;
    repo_id: string;
    page: number;
    page_size: number;
    scene?: string;
  }) => Promise<{ users: Array<Record<string, unknown>>; total?: number }>;
  listDomainIpConfigs: (input: {
    page: number;
    page_size: number;
  }) => Promise<{ configs: Array<Record<string, unknown>>; total?: number }>;
  showRepositoryPrivileges: (input: {
    project_id: string;
    repo_id: string;
  }) => Promise<{ project_id: string; repo_id: string; raw: unknown }>;
  showUserPrivilegesV3: (input: {
    project_id: string;
  }) => Promise<{ project_id: string; raw: unknown }>;
  getRepoFileInfoById: (input: { id: string }) => Promise<Record<string, unknown>>;
  getRepoFileInfoByName: (input: { file_name: string }) => Promise<Record<string, unknown>>;
};

function listResponse(items: Array<Record<string, unknown>>, total: number | undefined, noun: string, key: string) {
  const result = mapArtifactRecordList(items, total, noun, key);

  return {
    content: [{ type: "text" as const, text: formatArtifactRecordListText(result) }],
    structuredContent: result
  };
}

export function createArtifactListMavenRepositoriesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListMavenRepositoriesInput.parse(input);
    const response = await client.listMavenRepositories(parsed);
    return listResponse(response.repositories, response.total, "Maven repositories", "repository");
  };
}

export function createArtifactListProjectReleaseFilesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListProjectReleaseFilesInput.parse(input);
    const response = await client.listProjectReleaseFiles(parsed);
    return listResponse(response.files, response.total, "project release files", "file");
  };
}

export function createArtifactListReleaseFilesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListReleaseFilesInput.parse(input);
    const response = await client.listReleaseFiles(parsed);
    return listResponse(response.files, response.total, "release files", "file");
  };
}

export function createArtifactListProjectUsersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListProjectUsersInput.parse(input);
    const response = await client.listProjectUsers(parsed);
    return listResponse(response.users, response.total, "project users", "user");
  };
}

export function createArtifactListDomainIpConfigsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactListDomainIpConfigsInput.parse(input);
    const response = await client.listDomainIpConfigs(parsed);
    return listResponse(response.configs, response.total, "domain IP configs", "ipConfig");
  };
}

export function createArtifactShowRepositoryPrivilegesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactShowRepositoryPrivilegesInput.parse(input);
    const response = await client.showRepositoryPrivileges(parsed);
    const result = mapArtifactRecordItem(
      `Loaded Artifact repository privileges for ${response.repo_id}`,
      response.repo_id,
      "privileges",
      response.raw,
      { projectId: response.project_id, repoId: response.repo_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createArtifactShowUserPrivilegesV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactShowUserPrivilegesV3Input.parse(input);
    const response = await client.showUserPrivilegesV3(parsed);
    const result = mapArtifactRecordItem(
      `Loaded Artifact v3 user privileges for project ${response.project_id}`,
      response.project_id,
      "privileges",
      response.raw,
      { projectId: response.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createArtifactGetRepoFileInfoByIdHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactGetRepoFileInfoByIdInput.parse(input);
    const file = await client.getRepoFileInfoById(parsed);
    const result = mapArtifactRecordItem(
      `Loaded Artifact repository file info for ${parsed.id}`,
      String(file.id ?? file.file_id ?? parsed.id),
      "file",
      file
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createArtifactGetRepoFileInfoByNameHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = artifactGetRepoFileInfoByNameInput.parse(input);
    const file = await client.getRepoFileInfoByName(parsed);
    const result = mapArtifactRecordItem(
      `Loaded Artifact repository file info for ${parsed.file_name}`,
      String(file.id ?? file.file_id ?? parsed.file_name),
      "file",
      file
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
