import { asListResult } from "../../../contracts/tool-result.js";
import { governGetOpenSourceReportInput } from "../schemas.js";

export function mapGovernOpenSourceReport(input: {
  id: string;
  status?: string;
  filename?: string;
  report?: string;
  summary?: {
    vuln_detail?: {
      critical?: number;
      major?: number;
      minor?: number;
    };
    comp_detail?: {
      no_known_vuln_comp?: number;
      vulnerable_comp?: number;
    };
  };
  components?: Array<{
    name?: string;
    version?: string;
    vuln_num?: number;
    licenses?: string[];
  }>;
}) {
  return asListResult(
    `${input.components?.length ?? 0} govern open source components found`,
    (input.components ?? []).map((item) => ({
      id: `${item.name ?? "component"}@${item.version ?? "unknown"}`,
      name: item.name,
      version: item.version,
      vulnerabilityCount: item.vuln_num ?? 0,
      licenses: item.licenses ?? []
    })),
    undefined,
    {
      id: input.id,
      status: input.status,
      filename: input.filename,
      reportUrl: input.report,
      summary: input.summary
    }
  );
}

type GovernGetOpenSourceReportClient = {
  getOpenSourceReport: (input: { project_id: string; task_id: string }) => Promise<{
    id: string;
    status?: string;
    filename?: string;
    report?: string;
    summary?: {
      vuln_detail?: {
        critical?: number;
        major?: number;
        minor?: number;
      };
      comp_detail?: {
        no_known_vuln_comp?: number;
        vulnerable_comp?: number;
      };
    };
    components?: Array<{
      name?: string;
      version?: string;
      vuln_num?: number;
      licenses?: string[];
    }>;
  }>;
};

export function createGovernGetOpenSourceReportHandler(client: GovernGetOpenSourceReportClient) {
  return async (input: unknown) => {
    const parsed = governGetOpenSourceReportInput.parse(input);
    const response = await client.getOpenSourceReport(parsed);
    const listResult = mapGovernOpenSourceReport(response);

    return {
      content: [{ type: "text" as const, text: listResult.summary }],
      structuredContent: {
        ...listResult,
        item: {
          id: response.id,
          status: response.status,
          filename: response.filename,
          componentCount: response.components?.length ?? 0,
          reportUrl: response.report,
          summary: response.summary
        }
      }
    };
  };
}
