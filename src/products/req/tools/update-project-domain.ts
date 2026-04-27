import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateProjectDomainInput } from "../schemas.js";
import type { ReqProjectDomain } from "./project-domain-mappers.js";

export function previewUpdateProjectDomain(input: {
  project_id: string;
  domain_id: string;
  domain_name: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Ready";

  return asItemResult(`${mode}: update project domain ${input.domain_id}`, {
    projectId: input.project_id,
    id: input.domain_id,
    name: input.domain_name,
    executed: !input.dry_run
  });
}

export function mapUpdatedProjectDomain(input: ReqProjectDomain) {
  return asItemResult(`Updated project domain ${input.domain_name}`, {
    id: input.domain_id,
    name: input.domain_name,
    executed: true
  });
}

type ReqUpdateProjectDomainClient = {
  updateProjectDomain: (input: {
    project_id: string;
    domain_id: string;
    domain_name: string;
  }) => Promise<ReqProjectDomain>;
};

export function createReqUpdateProjectDomainHandler(client: ReqUpdateProjectDomainClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateProjectDomainInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateProjectDomain(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateProjectDomain(parsed);
    const result = mapUpdatedProjectDomain(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
