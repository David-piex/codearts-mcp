import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import {
  testPlanListFeatureChildrenInput,
  testPlanListFeatureChildrenV5Input,
  testPlanListGt3kFeatureChildrenV5Input
} from "../schemas.js";

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
  page_number?: number;
  page_size?: number;
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

function createFeatureChildrenHandler(
  methodName: string,
  label: string,
  schema:
    | typeof testPlanListFeatureChildrenInput
    | typeof testPlanListFeatureChildrenV5Input
    | typeof testPlanListGt3kFeatureChildrenV5Input = testPlanListFeatureChildrenInput
) {
  return (client: Record<string, ClientMethod>) => async (input: unknown) => {
    const parsed = schema.parse(input);
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

export const createTestPlanListFeatureChildrenV5Handler = createFeatureChildrenHandler(
  "listFeatureChildrenV5",
  "TestPlan v5 feature children",
  testPlanListFeatureChildrenV5Input
);

export const createTestPlanListGt3kFeatureChildrenV5Handler = createFeatureChildrenHandler(
  "listGt3kFeatureChildrenV5",
  "TestPlan GT3K v5 feature children",
  testPlanListGt3kFeatureChildrenV5Input
);
