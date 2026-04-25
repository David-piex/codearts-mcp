import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListCasesInput } from "../schemas.js";

export function mapTestPlanCases(
  items: Array<{
    case_id: string;
    name: string;
    result?: string;
    status?: string;
    test_type?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} test cases found`,
    items.map((item) => ({
      id: item.case_id,
      name: item.name,
      result: item.result,
      status: item.status,
      testType: item.test_type
    })),
    toPageInfo(page, pageSize, total)
  );
}

type TestPlanListCasesClient = {
  listCases: (input: {
    project_id: string;
    plan_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    owner_id?: string;
    status?: string;
    priority?: string;
    module_id?: string;
    label_id?: string;
    test_case_type?: string;
    query?: Record<string, string | number | boolean | string[]>;
  }) => Promise<{
    cases: Array<{
      case_id: string;
      name: string;
      result?: string;
      status?: string;
      test_type?: string;
    }>;
    total?: number;
  }>;
};

export function createTestPlanListCasesHandler(client: TestPlanListCasesClient) {
  return async (input: unknown) => {
    const parsed = testPlanListCasesInput.parse(input);
    const response = await client.listCases(parsed);
    const result = mapTestPlanCases(response.cases, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
