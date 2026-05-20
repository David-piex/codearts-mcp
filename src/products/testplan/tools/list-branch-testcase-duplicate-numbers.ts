import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { testPlanListBranchTestcaseDuplicateNumbersInput } from "../schemas.js";

type Client = {
  listBranchTestcaseDuplicateNumbers: (input: {
    project_id: string;
    version_uri: string;
    numbers?: string[];
    uri_to_number_list?: Array<{
      uri?: string;
      number?: string;
    }>;
  }) => Promise<{
    numbers: string[];
    total?: number;
    has_more?: boolean;
    reason?: string;
    raw: Record<string, unknown>;
  }>;
};

function mapDuplicateNumbers(input: {
  numbers: string[];
  total?: number;
  has_more?: boolean;
  reason?: string;
}) {
  return asListResult(
    `${input.numbers.length} duplicate testcase numbers found`,
    input.numbers.map((number) => ({
      id: number,
      number
    })),
    toPageInfo(1, input.numbers.length, input.total)
  );
}

export function createTestPlanListBranchTestcaseDuplicateNumbersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListBranchTestcaseDuplicateNumbersInput.parse(input);
    const response = await client.listBranchTestcaseDuplicateNumbers(parsed);
    const result = mapDuplicateNumbers(response);
    const text = formatListToolText(result, {
      fields: [{ label: "number", get: (item) => (item as { number?: string }).number }]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: {
        ...result,
        hasMore: response.has_more,
        reason: response.reason,
        response: response.raw
      }
    };
  };
}
