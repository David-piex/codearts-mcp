import type { z } from "zod";
import { formatPipelineRawItemText, formatPipelineRawListText, mapPipelineRawItem, mapPipelineRawList } from "./pipeline-raw-result.js";

type RawRecord = Record<string, unknown>;

type RawListResponse = {
  records: RawRecord[];
  total?: number;
  raw: RawRecord;
};

type RawItemResponse = {
  item: RawRecord;
  raw: RawRecord;
};
type RawListStructuredContent = ReturnType<typeof mapPipelineRawList> & Record<string, unknown>;

type RawListClient<TInput> = (input: TInput) => Promise<RawListResponse>;
type RawItemClient<TInput> = (input: TInput) => Promise<RawItemResponse>;

export function createPipelineRawListHandler<TSchema extends z.ZodTypeAny>(options: {
  inputSchema: TSchema;
  call: RawListClient<z.infer<TSchema>>;
  noun: string;
  itemKey: string;
  rawKey: string;
}) {
  return async (input: unknown) => {
    const parsed = options.inputSchema.parse(input);
    const response = await options.call(parsed);
    const page =
      "page" in parsed && typeof parsed.page === "number"
        ? parsed.page
        : "page_index" in parsed && typeof parsed.page_index === "number"
          ? parsed.page_index
          : 1;
    const pageSize =
      "page_size" in parsed && typeof parsed.page_size === "number"
        ? parsed.page_size
        : "limit" in parsed && typeof parsed.limit === "number"
          ? parsed.limit
          : response.records.length || response.total || 1;
    const result = mapPipelineRawList(
      response.records,
      response.total,
      options.noun,
      options.itemKey,
      page,
      pageSize
    );

    const structuredContent: RawListStructuredContent = {
      ...result,
      [options.rawKey]: response.raw
    };

    return {
      content: [{ type: "text" as const, text: formatPipelineRawListText(result) }],
      structuredContent
    };
  };
}

export function createPipelineRawItemHandler<TSchema extends z.ZodTypeAny>(options: {
  inputSchema: TSchema;
  call: RawItemClient<z.infer<TSchema>>;
  summary: string;
  itemKey: string;
  id: (input: z.infer<TSchema>, response: RawItemResponse) => string;
}) {
  return async (input: unknown) => {
    const parsed = options.inputSchema.parse(input);
    const response = await options.call(parsed);
    const result = mapPipelineRawItem(
      options.summary,
      options.id(parsed, response),
      options.itemKey,
      response.item
    );

    return {
      content: [{ type: "text" as const, text: formatPipelineRawItemText(result) }],
      structuredContent: result
    };
  };
}
