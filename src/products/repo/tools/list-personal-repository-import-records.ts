import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { repoListPersonalRepositoryImportRecordsInput } from "../schemas.js";

type RepositoryImportRecord = {
  id: number | string;
  state?: string;
  repository?: {
    id?: number | string;
    name?: string;
    ssh_url_to_repo?: string;
    http_url_to_repo?: string;
    web_url?: string;
  };
  origin_full_name?: string;
  source_url?: string;
  source_type?: string;
  created_at?: string;
  finished_at?: string;
  target_project_id?: string;
};

export function mapPersonalRepositoryImportRecords(
  items: RepositoryImportRecord[],
  page: number,
  pageSize: number,
  total?: number
) {
  const summary = total !== undefined
    ? `${items.length} repository import records found in this page (total: ${total})`
    : `${items.length} repository import records found`;

  return asListResult(
    summary,
    items.map((item) => ({
      id: String(item.id),
      state: item.state,
      repositoryId: item.repository?.id !== undefined ? String(item.repository.id) : undefined,
      repositoryName: item.repository?.name,
      originFullName: item.origin_full_name,
      sourceUrl: item.source_url,
      sourceType: item.source_type,
      createdAt: item.created_at,
      finishedAt: item.finished_at,
      targetProjectId: item.target_project_id
    })),
    toPageInfo(page, pageSize, total)
  );
}

type RepoListPersonalRepositoryImportRecordsClient = {
  listPersonalRepositoryImportRecords: (input: {
    page: number;
    page_size: number;
    state?: string;
    source_type?: string;
    created_after?: string;
    created_before?: string;
    finished_after?: string;
    finished_before?: string;
    search?: string;
    order_by?: string;
    sort?: string;
  }) => Promise<{
    records: RepositoryImportRecord[];
    total?: number;
  }>;
};

export function createRepoListPersonalRepositoryImportRecordsHandler(
  client: RepoListPersonalRepositoryImportRecordsClient
) {
  return async (input: unknown) => {
    const parsed = repoListPersonalRepositoryImportRecordsInput.parse(input);
    const response = await client.listPersonalRepositoryImportRecords(parsed);
    const result = mapPersonalRepositoryImportRecords(response.records, parsed.page, parsed.page_size, response.total);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => item.id },
        { label: "state", get: (item) => item.state },
        { label: "repository", get: (item) => item.repositoryName },
        { label: "sourceType", get: (item) => item.sourceType },
        { label: "createdAt", get: (item) => item.createdAt }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
