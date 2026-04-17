import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetQuotaInfoInput } from "../schemas.js";

export function mapGovernQuotaInfo(input: {
  package_quota?: number;
  concurrent_task?: number;
  valid?: boolean;
  resource_id?: string;
}) {
  return asItemResult("Loaded govern quota info", {
    id: input.resource_id ?? "quota",
    packageQuota: input.package_quota,
    concurrentTask: input.concurrent_task,
    valid: input.valid
  });
}

type GovernGetQuotaInfoClient = {
  getQuotaInfo: (input: { project_id: string }) => Promise<{
    package_quota?: number;
    concurrent_task?: number;
    valid?: boolean;
    resource_id?: string;
  }>;
};

export function createGovernGetQuotaInfoHandler(client: GovernGetQuotaInfoClient) {
  return async (input: unknown) => {
    const parsed = governGetQuotaInfoInput.parse(input);
    const response = await client.getQuotaInfo(parsed);
    const result = mapGovernQuotaInfo(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
