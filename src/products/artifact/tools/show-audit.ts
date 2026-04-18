import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { artifactShowAuditInput } from "../schemas.js";

export function mapArtifactAuditRecords(
  tenantId: string,
  projectId: string,
  module: string,
  repo: string,
  items: Array<{
    id?: string;
    operation?: string;
    user_id?: string;
    user_name?: string;
    op_time?: string;
    resource_path?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} artifact audit logs found`,
    items.map((item) => ({
      id: item.id ?? `${item.user_id ?? ""}:${item.op_time ?? ""}:${item.operation ?? ""}`,
      tenantId,
      projectId,
      module,
      repo,
      operation: item.operation,
      userId: item.user_id,
      userName: item.user_name,
      operatedAt: item.op_time,
      resourcePath: item.resource_path
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ArtifactShowAuditClient = {
  showAudit: (input: {
    tenant_id: string;
    project_id: string;
    module: string;
    repo: string;
    page: number;
    page_size: number;
    user_id?: string;
    instance_id?: string;
    format?: string;
    resource_id?: string;
  }) => Promise<{
    records: Array<{
      id?: string;
      operation?: string;
      user_id?: string;
      user_name?: string;
      op_time?: string;
      resource_path?: string;
    }>;
    total?: number;
  }>;
};

export function createArtifactShowAuditHandler(client: ArtifactShowAuditClient) {
  return async (input: unknown) => {
    const parsed = artifactShowAuditInput.parse(input);
    const response = await client.showAudit(parsed);
    const result = mapArtifactAuditRecords(
      parsed.tenant_id,
      parsed.project_id,
      parsed.module,
      parsed.repo,
      response.records,
      parsed.page,
      parsed.page_size,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
