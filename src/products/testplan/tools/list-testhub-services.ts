import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListTesthubServicesInput } from "../schemas.js";

export function mapTestPlanTesthubServices(items: Array<Record<string, unknown>>, total?: number) {
  return asListResult(
    `${items.length} testhub services found`,
    items.map((item) => ({
      id: String(item.id ?? item.service_id ?? item.uri ?? ""),
      name: typeof item.name === "string" ? item.name : undefined,
      service: item
    })),
    toPageInfo(1, items.length || total || 1, total)
  );
}

type TestPlanListTesthubServicesClient = {
  listTesthubServices: () => Promise<{
    services: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListTesthubServicesHandler(
  client: TestPlanListTesthubServicesClient
) {
  return async (input: unknown) => {
    testPlanListTesthubServicesInput.parse(input);
    const response = await client.listTesthubServices();
    const result = mapTestPlanTesthubServices(response.services, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
