export type PageInfo = {
  page: number;
  pageSize: number;
  total?: number;
};

export type ToolResult<T> = {
  summary: string;
  item?: T;
  items?: T[];
  page_info?: PageInfo;
  raw?: unknown;
};

export function asItemResult<T>(summary: string, item: T, raw?: unknown): ToolResult<T> {
  return { summary, item, raw };
}

export function asListResult<T>(
  summary: string,
  items: T[],
  pageInfo?: PageInfo,
  raw?: unknown
): ToolResult<T> {
  return { summary, items, page_info: pageInfo, raw };
}
