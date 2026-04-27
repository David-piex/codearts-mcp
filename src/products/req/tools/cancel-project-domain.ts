import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCancelProjectDomainInput } from "../schemas.js";

export function previewCancelProjectDomain(input: {
  project_id: string;
  domain_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: cancel project domain ${input.domain_id}`, {
    id: input.domain_id,
    projectId: input.project_id,
    cancelled: false,
    executed: false
  });
}

type ReqCancelProjectDomainClient = {
  cancelProjectDomain: (input: {
    project_id: string;
    domain_id: string;
  }) => Promise<{
    project_id: string;
    domain_id: string;
    cancelled: true;
  }>;
};

export function createReqCancelProjectDomainHandler(client: ReqCancelProjectDomainClient) {
  return async (input: unknown) => {
    const parsed = reqCancelProjectDomainInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCancelProjectDomain(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.cancelProjectDomain(parsed);
    const result = asItemResult(`Cancelled project domain ${response.domain_id}`, {
      id: response.domain_id,
      projectId: response.project_id,
      cancelled: response.cancelled,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
