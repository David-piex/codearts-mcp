import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListFeatureChildrenInput } from "../schemas.js";

type FeatureChildrenInput = {
  feature_uri: string;
  project_uuid: string;
  owner?: string;
  stage?: string;
  activity?: string;
  version_uri?: string;
  task_uri?: string;
  service_type?: string;
  contain_total?: boolean;
  sort_type?: string;
};

type ClientMethod = (input: FeatureChildrenInput) => Promise<{
  children: Array<Record<string, unknown>>;
  total?: number;
  raw: Record<string, unknown>;
}>;

function mapFeatureChildren(
  children: Array<Record<string, unknown>>,
  total: number | undefined,
  label: string
) {
  return asListResult(
    `${children.length} ${label} found`,
    children.map((child) => ({
      id: String(child.uri ?? child.id ?? ""),
      name: typeof child.name === "string" ? child.name : undefined,
      type: typeof child.type === "string" ? child.type : undefined,
      caseTotal: typeof child.case_total === "number" ? child.case_total : undefined,
      hasChild: typeof child.has_child === "boolean" ? child.has_child : undefined,
      child
    })),
    toPageInfo(1, children.length || total || 1, total)
  );
}

function createFeatureChildrenHandler(methodName: string, label: string) {
  return (client: Record<string, ClientMethod>) => async (input: unknown) => {
    const parsed = testPlanListFeatureChildrenInput.parse(input);
    const response = await client[methodName](parsed);
    const result = mapFeatureChildren(response.children, response.total, label);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "type", get: (item) => (item as { type?: string }).type },
        { label: "caseTotal", get: (item) => (item as { caseTotal?: number }).caseTotal },
        { label: "hasChild", get: (item) => (item as { hasChild?: boolean }).hasChild }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}

export const createTestPlanListFeatureChildrenHandler = createFeatureChildrenHandler(
  "listFeatureChildren",
  "TestPlan feature children"
);

export const createTestPlanListGt3kFeatureChildrenHandler = createFeatureChildrenHandler(
  "listGt3kFeatureChildren",
  "TestPlan GT3K feature children"
);
