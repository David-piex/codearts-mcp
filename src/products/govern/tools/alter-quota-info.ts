import { asItemResult } from "../../../contracts/tool-result.js";
import { governAlterQuotaInfoInput } from "../schemas.js";

type GovernAlterQuotaInput = {
  project_id: string;
  resource_id?: string;
  change_mode?: number;
  cloud_service_type?: string;
  period_type?: number;
  period_num?: number;
  product_info?: Array<{
    order_id?: string;
    job_id?: string;
    region_id?: string;
    charging_mode?: number;
    period_num?: number;
    period_type?: number;
    subscription_num?: number;
    product_id?: string;
    cloud_service_type?: string;
    resource_type?: string;
    resource_spec_code?: string;
    resource_size?: number;
    resource_size_measure_id?: number;
  }>;
  dry_run: boolean;
};

export function previewGovernAlterQuotaInfo(input: GovernAlterQuotaInput) {
  const mode = input.dry_run ? "Dry run" : "Executed";
  return asItemResult(`${mode}: alter govern quota info ${input.resource_id ?? "quota"}`, {
    id: input.resource_id ?? "quota",
    projectId: input.project_id,
    resourceId: input.resource_id,
    changeMode: input.change_mode,
    productInfoCount: input.product_info?.length ?? 0,
    executed: !input.dry_run
  });
}

export function mapGovernAlteredQuotaInfo(input: { order_id?: string }) {
  return asItemResult(`Altered govern quota info ${input.order_id ?? "order"}`, {
    id: input.order_id ?? "order",
    orderId: input.order_id,
    executed: true
  });
}

type GovernAlterQuotaInfoClient = {
  alterQuotaInfo: (input: Omit<GovernAlterQuotaInput, "dry_run">) => Promise<{ order_id?: string }>;
};

export function createGovernAlterQuotaInfoHandler(client: GovernAlterQuotaInfoClient) {
  return async (input: unknown) => {
    const parsed = governAlterQuotaInfoInput.parse(input);
    if (parsed.dry_run) {
      const result = previewGovernAlterQuotaInfo(parsed);
      return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
    }

    const { dry_run: _dryRun, ...request } = parsed;
    const result = mapGovernAlteredQuotaInfo(await client.alterQuotaInfo(request));
    return { content: [{ type: "text" as const, text: result.summary }], structuredContent: result };
  };
}
