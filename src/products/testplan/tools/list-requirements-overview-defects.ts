import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListRequirementsOverviewDetailsInput } from "../schemas.js";

type Client = {
  listRequirementsOverviewDefects: (input: {
    project_id: string;
    version_uri: string;
    work_item_id: string;
    work_item_name?: string;
    page: number;
    page_size: number;
  }) => Promise<{
    defects: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

function mapRequirementOverviewDefects(
  items: Array<Record<string, unknown>>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} TestPlan requirement overview defects found`,
    items.map((item) => ({
      id: String(item.defect_no ?? item.uri ?? item.id ?? item.defect_uri ?? ""),
      name: typeof item.defect_name === "string" ? item.defect_name : undefined,
      defect: item
    })),
    toPageInfo(page, pageSize, total)
  );
}

export function createTestPlanListRequirementsOverviewDefectsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListRequirementsOverviewDetailsInput.parse(input);
    const response = await client.listRequirementsOverviewDefects(parsed);
    const result = mapRequirementOverviewDefects(
      response.defects,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: {
        ...result,
        overview: response.raw
      }
    };
  };
}
