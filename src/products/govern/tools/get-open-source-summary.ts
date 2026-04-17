import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetOpenSourceSummaryInput } from "../schemas.js";

export function mapGovernOpenSourceSummary(input: {
  software: {
    component?: number;
    vuln?: number;
    no_version?: number;
  };
  vuln?: {
    critical?: number;
    high?: number;
    medium?: number;
    low?: number;
  };
  license?: {
    list?: Array<{ name?: string; num?: number }>;
  };
  report_url?: string;
  start_time?: string;
  end_time?: string;
}) {
  return asItemResult("Loaded govern open source summary", {
    id: input.report_url ?? "summary",
    componentCount: input.software.component ?? 0,
    vulnerabilityCount: input.software.vuln ?? 0,
    noVersionCount: input.software.no_version ?? 0,
    severity: input.vuln,
    licenses: input.license?.list ?? [],
    reportUrl: input.report_url,
    startTime: input.start_time,
    endTime: input.end_time
  });
}

type GovernGetOpenSourceSummaryClient = {
  getOpenSourceSummary: (input: { project_id: string; task_id: string }) => Promise<{
    software: {
      component?: number;
      vuln?: number;
      no_version?: number;
    };
    vuln?: {
      critical?: number;
      high?: number;
      medium?: number;
      low?: number;
    };
    license?: {
      list?: Array<{ name?: string; num?: number }>;
    };
    report_url?: string;
    start_time?: string;
    end_time?: string;
  }>;
};

export function createGovernGetOpenSourceSummaryHandler(client: GovernGetOpenSourceSummaryClient) {
  return async (input: unknown) => {
    const parsed = governGetOpenSourceSummaryInput.parse(input);
    const response = await client.getOpenSourceSummary(parsed);
    const result = mapGovernOpenSourceSummary(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
