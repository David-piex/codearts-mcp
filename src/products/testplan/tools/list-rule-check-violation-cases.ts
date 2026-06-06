import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListRuleCheckViolationCasesInput } from "../schemas.js";

type TestPlanListRuleCheckViolationCasesClient = {
  listRuleCheckViolationCases: (input: {
    project_id: string;
    version_uri: string;
    task_uri: string;
    page: number;
    page_size: number;
    severity?: string | number;
    status?: string | number;
    body?: Record<string, unknown>;
  }) => Promise<{
    violations: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListRuleCheckViolationCasesHandler(
  client: TestPlanListRuleCheckViolationCasesClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListRuleCheckViolationCasesInput.parse(input);
    const response = await client.listRuleCheckViolationCases(parsed);
    const result = asListResult(
      `${response.violations.length} rule check violation cases found`,
      response.violations.map((violation) => ({
        id: String(violation.uri ?? violation.id ?? ""),
        caseName: typeof violation.case_name === "string" ? violation.case_name : undefined,
        caseNumber: typeof violation.case_number === "string" ? violation.case_number : undefined,
        severity: violation.severity,
        status: violation.status,
        violation
      })),
      toPageInfo(parsed.page, parsed.page_size, response.total)
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "caseNumber", get: (item) => (item as { caseNumber?: string }).caseNumber },
        { label: "caseName", get: (item) => (item as { caseName?: string }).caseName },
        { label: "severity", get: (item) => String((item as { severity?: unknown }).severity ?? "") },
        { label: "status", get: (item) => String((item as { status?: unknown }).status ?? "") }
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
