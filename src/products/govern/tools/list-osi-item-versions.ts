import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { governListOsiItemVersionsInput } from "../schemas.js";

export function mapGovernOsiItemVersions(
  items: Array<{
    software_code?: string;
    software_name?: string;
    software_version?: string;
    language?: string;
    release_time?: string;
    license_list?: string[];
    level?: string;
    provider?: string;
    scorecard?: number;
    criticality?: number;
    vuln_amount?: number;
    scm?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} govern osi item versions found`,
    items.map((item) => ({
      id: item.software_code ?? `${item.software_name ?? ""}:${item.software_version ?? ""}`,
      name: item.software_name,
      version: item.software_version,
      language: item.language,
      releaseTime: item.release_time,
      licenses: item.license_list ?? [],
      level: item.level,
      provider: item.provider,
      scorecard: item.scorecard,
      criticality: item.criticality,
      vulnAmount: item.vuln_amount,
      scm: item.scm
    })),
    toPageInfo(page, pageSize, total)
  );
}

type GovernListOsiItemVersionsClient = {
  listOsiItemVersions: (input: {
    project_id: string;
    page: number;
    page_size: number;
    software_name?: string;
    artifact_id?: string;
  }) => Promise<{
    items: Array<{
      software_code?: string;
      software_name?: string;
      software_version?: string;
      language?: string;
      release_time?: string;
      license_list?: string[];
      level?: string;
      provider?: string;
      scorecard?: number;
      criticality?: number;
      vuln_amount?: number;
      scm?: string;
    }>;
    total?: number;
  }>;
};

export function createGovernListOsiItemVersionsHandler(client: GovernListOsiItemVersionsClient) {
  return async (input: unknown) => {
    const parsed = governListOsiItemVersionsInput.parse(input);
    const response = await client.listOsiItemVersions(parsed);
    const result = mapGovernOsiItemVersions(response.items, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
