import { asItemResult, asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import type {
  RepoBlob,
  RepoDiffLines,
  RepoNavigationEntry,
  RepoNavigationLanguageInfo,
  RepoNavigationOutline,
  RepoNavigationReferences,
  RepoNavigationSchema
} from "../client.js";

function mapNavigationEntry(input: RepoNavigationEntry) {
  return {
    tagName: input.tag_name,
    filePath: input.file_path,
    blob: input.blob,
    lineImage: input.line_image,
    lineNumber: input.line_number,
    range: input.range,
    syntaxType: input.syntax_type,
    revision: input.revision,
    extend: input.extend
  };
}

function mapNavigationSymbol(input: NonNullable<RepoNavigationOutline["symbols"]>[number]): unknown {
  return {
    def: input.def ? mapNavigationEntry(input.def) : undefined,
    children: input.children?.map(mapNavigationSymbol) ?? []
  };
}

export function mapBlobs(items: RepoBlob[], total?: number) {
  return asListResult(
    `${items.length} blobs found`,
    items.map((item) => ({
      id: item.blob_id,
      size: item.size,
      encoding: item.encoding,
      content: item.content
    })),
    toPageInfo(1, items.length || total || 0, total)
  );
}

export function mapDiffLines(input: RepoDiffLines) {
  return asItemResult("Fetched repository diff lines", {
    text: input.text
  });
}

export function mapRefs(items: string[], page: number, pageSize: number, total?: number) {
  return asListResult(
    `${items.length} refs found`,
    items.map((item) => ({ id: item, name: item })),
    toPageInfo(page, pageSize, total)
  );
}

export function mapNavigationReferences(input: RepoNavigationReferences) {
  return asItemResult("Fetched repository navigation references", {
    result: input.result,
    message: input.message,
    defs: (input.defs ?? []).map(mapNavigationEntry),
    refs: (input.refs ?? []).map(mapNavigationEntry)
  });
}

export function mapNavigationOutline(input: RepoNavigationOutline) {
  return asItemResult("Fetched repository navigation outline", {
    result: input.result,
    message: input.message,
    filePath: input.file_path,
    revision: input.revision,
    symbols: (input.symbols ?? []).map(mapNavigationSymbol)
  });
}

export function mapNavigationSchema(input: RepoNavigationSchema) {
  return asItemResult("Fetched repository navigation schema", {
    version: input.version,
    maximumFileSize: input.maximum_file_size,
    maximumLineLength: input.maximum_line_length,
    maximumTruncateLine: input.maximum_truncate_line,
    createAt: input.create_at,
    updateAt: input.update_at,
    rebuildAt: input.rebuild_at,
    lastBuildAt: input.last_build_at,
    buildTimes: input.build_times,
    queryTimes: input.query_times,
    outlineTimes: input.outline_times
  });
}

export function mapNavigationLanguage(input: RepoNavigationLanguageInfo) {
  const languages = input.language_list ?? [];
  return asListResult(
    `${languages.length} repository navigation languages found`,
    languages.map((item) => ({
      id: item.name,
      name: item.name,
      extensions: item.extension_list ?? []
    })),
    toPageInfo(1, languages.length, languages.length)
  );
}
