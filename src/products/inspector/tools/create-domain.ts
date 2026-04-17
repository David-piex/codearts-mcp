import { asItemResult } from "../../../contracts/tool-result.js";
import { inspectorCreateDomainInput } from "../schemas.js";

export function mapCreatedInspectorDomain(input: {
  domain_id: string;
  domain_name?: string;
  alias?: string;
  auth_status?: string;
  create_time?: string;
}) {
  return asItemResult(`Created inspector domain ${input.domain_name ?? input.domain_id}`, {
    id: input.domain_id,
    name: input.domain_name,
    alias: input.alias,
    authStatus: input.auth_status,
    createdAt: input.create_time,
    executed: true
  });
}

type InspectorCreateDomainClient = {
  createDomain: (input: {
    project_id: string;
    domain_name: string;
    alias?: string;
  }) => Promise<{
    domain_id: string;
    domain_name?: string;
    alias?: string;
    auth_status?: string;
    create_time?: string;
  }>;
};

export function createInspectorCreateDomainHandler(client: InspectorCreateDomainClient) {
  return async (input: unknown) => {
    const parsed = inspectorCreateDomainInput.parse(input);
    const response = await client.createDomain(parsed);
    const result = mapCreatedInspectorDomain(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
