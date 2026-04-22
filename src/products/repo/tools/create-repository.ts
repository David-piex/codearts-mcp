import { asItemResult } from "../../../contracts/tool-result.js";
import { repoCreateRepositoryInput } from "../schemas.js";

type PreviewCreateRepositoryInput = {
  project_uuid: string;
  name: string;
  import_members?: number;
  template_id?: string;
  visibility_level?: number;
  import_url?: string;
  description?: string;
  gitignore_id?: string;
  license_id?: number;
  enable_readme?: boolean | number;
  caller?: string;
  dry_run: boolean;
};

type CreatedRepositoryResponse = {
  repository_uuid: string;
  project_uuid?: string;
};

export function previewCreateRepository(input: PreviewCreateRepositoryInput) {
  return asItemResult(`Dry run: create repository ${input.name}`, {
    projectUuid: input.project_uuid,
    name: input.name,
    importMembers: input.import_members,
    templateId: input.template_id,
    visibilityLevel: input.visibility_level,
    importUrl: input.import_url,
    description: input.description,
    gitignoreId: input.gitignore_id,
    licenseId: input.license_id,
    enableReadme: input.enable_readme,
    caller: input.caller,
    executed: !input.dry_run
  });
}

export function mapCreatedRepository(
  input: CreatedRepositoryResponse,
  request: { project_uuid: string; name: string }
) {
  return asItemResult(`Created repository ${request.name}`, {
    id: input.repository_uuid,
    repositoryUuid: input.repository_uuid,
    projectUuid: input.project_uuid ?? request.project_uuid,
    name: request.name,
    executed: true
  });
}

type RepoCreateRepositoryClient = {
  createRepository: (input: {
    project_uuid: string;
    name: string;
    import_members?: number;
    template_id?: string;
    visibility_level?: number;
    import_url?: string;
    description?: string;
    gitignore_id?: string;
    license_id?: number;
    enable_readme?: boolean | number;
    caller?: string;
  }) => Promise<CreatedRepositoryResponse>;
};

export function createRepoCreateRepositoryHandler(client: RepoCreateRepositoryClient) {
  return async (input: unknown) => {
    const parsed = repoCreateRepositoryInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateRepository(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createRepository(parsed);
    const result = mapCreatedRepository(response, parsed);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
