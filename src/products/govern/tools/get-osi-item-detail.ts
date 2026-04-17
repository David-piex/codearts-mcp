import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetOsiItemDetailInput } from "../schemas.js";

export function mapGovernOsiItemDetail(input: {
  software_code?: string;
  software_name?: string;
  software_version?: string;
  language?: string;
  release_time?: string;
  scm?: string;
  homepage?: string;
  description?: string;
  provider?: string;
  level?: string;
  vuln_amount?: number;
  scorecard?: number;
  criticality?: number;
}) {
  return asItemResult(`Loaded govern osi item detail ${input.software_name ?? "component"}`, {
    id: input.software_code ?? `${input.software_name ?? "component"}:${input.software_version ?? "unknown"}`,
    name: input.software_name,
    version: input.software_version,
    language: input.language,
    releaseTime: input.release_time,
    scm: input.scm,
    homepage: input.homepage,
    description: input.description,
    provider: input.provider,
    level: input.level,
    vulnAmount: input.vuln_amount,
    scorecard: input.scorecard,
    criticality: input.criticality
  });
}

type GovernGetOsiItemDetailClient = {
  getOsiItemDetail: (input: {
    project_id: string;
    software_name?: string;
    software_version?: string;
    artifact_id?: string;
  }) => Promise<{
    software_code?: string;
    software_name?: string;
    software_version?: string;
    language?: string;
    release_time?: string;
    scm?: string;
    homepage?: string;
    description?: string;
    provider?: string;
    level?: string;
    vuln_amount?: number;
    scorecard?: number;
    criticality?: number;
  }>;
};

export function createGovernGetOsiItemDetailHandler(client: GovernGetOsiItemDetailClient) {
  return async (input: unknown) => {
    const parsed = governGetOsiItemDetailInput.parse(input);
    const result = mapGovernOsiItemDetail(await client.getOsiItemDetail(parsed));

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
