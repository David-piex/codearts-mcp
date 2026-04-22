import { expect } from "vitest";

export function expectDryRunPreview(
  result: {
    summary?: string;
    item?: unknown;
  },
  item: unknown
) {
  expect(result.summary).toContain("Dry run");
  expect(result.item).toEqual(item);
}

export function expectDryRunPreviewMatch(
  result: {
    summary?: string;
    item?: unknown;
  },
  item: Record<string, unknown>
) {
  expect(result.summary).toContain("Dry run");
  expect(result.item).toMatchObject(item);
}

export function expectMappedItem(
  result: {
    item?: unknown;
  },
  item: unknown
) {
  expect(result.item).toEqual(item);
}

export function expectMappedItems(
  result: {
    items?: unknown;
  },
  items: unknown[]
) {
  expect(result.items).toEqual(items);
}

export function expectMappedPage(
  result: {
    items?: unknown;
    page_info?: unknown;
  },
  options: {
    items: unknown[];
    pageInfo: {
      page: number;
      pageSize: number;
      total: number;
    };
  }
) {
  expectMappedItems(result, options.items);
  expect(result.page_info).toEqual(options.pageInfo);
}
