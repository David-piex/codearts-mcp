import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import {
  testPlanListTesthubTestcasesInput,
  testPlanListTesthubTestcasesV5Input
} from "../schemas.js";

type TesthubTestcase = {
  case_id: string;
  name?: string;
  number?: string;
  status?: string;
  result?: string;
  test_type?: string;
  case: Record<string, unknown>;
};

type Client = {
  listTesthubTestcases: (input: unknown) => Promise<{
    cases: TesthubTestcase[];
    total?: number;
    raw: Record<string, unknown>;
  }>;
  listTesthubTestcasesV5: (input: unknown) => Promise<{
    cases: TesthubTestcase[];
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

function mapTesthubTestcases(
  cases: TesthubTestcase[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${cases.length} TestPlan TestHub testcases found`,
    cases.map((item) => ({
      id: item.case_id,
      name: item.name,
      number: item.number,
      status: item.status,
      result: item.result,
      testType: item.test_type,
      case: item.case
    })),
    toPageInfo(page, pageSize, total)
  );
}

function formatTesthubTestcasesText(result: ReturnType<typeof mapTesthubTestcases>) {
  return formatListToolText(result, {
    fields: [
      { label: "id", get: (item) => (item as { id?: string }).id },
      { label: "number", get: (item) => (item as { number?: string }).number },
      { label: "name", get: (item) => (item as { name?: string }).name },
      { label: "status", get: (item) => (item as { status?: string }).status }
    ]
  });
}

export function createTestPlanListTesthubTestcasesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListTesthubTestcasesInput.parse(input);
    const response = await client.listTesthubTestcases(parsed);
    const result = mapTesthubTestcases(
      response.cases,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: formatTesthubTestcasesText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}

export function createTestPlanListTesthubTestcasesV5Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListTesthubTestcasesV5Input.parse(input);
    const response = await client.listTesthubTestcasesV5(parsed);
    const result = mapTesthubTestcases(
      response.cases,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: formatTesthubTestcasesText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
