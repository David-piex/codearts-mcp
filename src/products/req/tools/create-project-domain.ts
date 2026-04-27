import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateProjectDomainInput } from "../schemas.js";
import type { ReqProjectDomain } from "./project-domain-mappers.js";

export function previewCreateProjectDomain(input: {
  project_id: string;
  domain_name: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Ready";

  return asItemResult(`${mode}: create project domain ${input.domain_name}`, {
    projectId: input.project_id,
    name: input.domain_name,
    executed: !input.dry_run
  });
}

export function mapCreatedProjectDomain(input: ReqProjectDomain) {
  return asItemResult(`Created project domain ${input.domain_name}`, {
    id: input.domain_id,
    name: input.domain_name,
    executed: true
  });
}

type ReqCreateProjectDomainClient = {
  createProjectDomain: (input: {
    project_id: string;
    domain_name: string;
  }) => Promise<ReqProjectDomain>;
};

export function createReqCreateProjectDomainHandler(client: ReqCreateProjectDomainClient) {
  return async (input: unknown) => {
    const parsed = reqCreateProjectDomainInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateProjectDomain(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createProjectDomain(parsed);
    const result = mapCreatedProjectDomain(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
