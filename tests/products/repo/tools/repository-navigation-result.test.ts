import { describe, expect, it } from "vitest";
import {
  mapBlobs,
  mapDiffLines,
  mapNavigationLanguage,
  mapNavigationOutline,
  mapNavigationReferences,
  mapNavigationSchema,
  mapRefs
} from "../../../../src/products/repo/tools/repository-navigation-result.js";

describe("repository navigation result mappers", () => {
  it("maps blob content as encoded data", () => {
    const result = mapBlobs([{ blob_id: "blob-1", size: 13, encoding: "base64", content: "MTIz" }], 1);

    expect(result.items?.[0]).toEqual({
      id: "blob-1",
      size: 13,
      encoding: "base64",
      content: "MTIz"
    });
    expect(result.page_info).toEqual({ page: 1, pageSize: 1, total: 1 });
  });

  it("maps diff lines and refs", () => {
    expect(mapDiffLines({ text: "line 1\nline 2" }).item).toEqual({ text: "line 1\nline 2" });

    const refs = mapRefs(["master", "release"], 1, 20, 2);
    expect(refs.items).toEqual([
      { id: "master", name: "master" },
      { id: "release", name: "release" }
    ]);
  });

  it("maps navigation references and outline trees", () => {
    const references = mapNavigationReferences({
      result: "0",
      message: "",
      defs: [{ tag_name: "Demo", file_path: "Demo.java", line_number: 10 }],
      refs: [{ tag_name: "Demo", file_path: "UseDemo.java", line_number: 20 }]
    });
    expect(references.item).toMatchObject({
      result: "0",
      defs: [{ tagName: "Demo", filePath: "Demo.java", lineNumber: 10 }],
      refs: [{ tagName: "Demo", filePath: "UseDemo.java", lineNumber: 20 }]
    });

    const outline = mapNavigationOutline({
      result: "0",
      file_path: "Demo.java",
      revision: "abc123",
      symbols: [
        {
          def: { tag_name: "Demo", syntax_type: "class" },
          children: [{ def: { tag_name: "run", syntax_type: "method" }, children: null }]
        }
      ]
    });
    expect(outline.item).toMatchObject({
      filePath: "Demo.java",
      revision: "abc123",
      symbols: [
        {
          def: { tagName: "Demo", syntaxType: "class" },
          children: [{ def: { tagName: "run", syntaxType: "method" }, children: [] }]
        }
      ]
    });
  });

  it("maps navigation schema and languages", () => {
    expect(
      mapNavigationSchema({
        version: "VERSION 1.5",
        maximum_file_size: 358400,
        build_times: 2
      }).item
    ).toMatchObject({
      version: "VERSION 1.5",
      maximumFileSize: 358400,
      buildTimes: 2
    });

    const languages = mapNavigationLanguage({
      result: "0",
      language_list: [{ name: "typescript", extension_list: [".ts"] }]
    });
    expect(languages.items).toEqual([{ id: "typescript", name: "typescript", extensions: [".ts"] }]);
  });
});
