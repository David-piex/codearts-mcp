import { describe, expect, it } from "vitest";
import {
  collectHttpToolTotal,
  collectProductToolStats
} from "../../src/server/module-stats.js";
import {
  findDriftedModuleStatsDocuments,
  loadTrackedModuleStatsDocuments,
  replaceGeneratedSection,
  renderApiReferenceScaleMarkdown,
  renderReadWriteMatrixMarkdown,
  renderReqApiReferenceScaleMarkdown,
  renderReadmeExposureSummaryMarkdown,
  syncModuleStatsDocuments
} from "../../src/server/module-stats-docs.js";

function createGeneratedBlock(name: string, content: string) {
  return [
    `<!-- GENERATED:${name}:start -->`,
    content,
    `<!-- GENERATED:${name}:end -->`
  ];
}

function createDocWithGeneratedBlocks(title: string, blocks: Array<[string, string]>) {
  return [
    title,
    ...blocks.flatMap(([name, content]) => createGeneratedBlock(name, content))
  ].join("\n");
}

describe("replaceGeneratedSection", () => {
  it("replaces only the content inside a generated marker block", () => {
    const source = [
      "# Doc",
      ...createGeneratedBlock("test", "old content"),
      "tail"
    ].join("\n");

    expect(replaceGeneratedSection(source, "test", "new content")).toBe(
      [
        "# Doc",
        ...createGeneratedBlock("test", "new content"),
        "tail"
      ].join("\n")
    );
  });
});

describe("module stats doc rendering", () => {
  it("renders the README exposure summary from current tool totals", () => {
    expect(renderReadmeExposureSummaryMarkdown()).toContain(
      `- \`${collectProductToolStats().total}\` product tools`
    );
    expect(renderReadmeExposureSummaryMarkdown()).toContain(
      `- \`${collectHttpToolTotal()}\` total MCP tools in shared \`http\` mode`
    );
  });

  it("renders the read/write matrix from current module stats", () => {
    const markdown = renderReadWriteMatrixMarkdown();

    expect(markdown).toContain("| Module | Read | Write | Live | Key Gaps |");
    expect(markdown).toContain("| Deploy | 57 | 17 | Partial |");
    expect(markdown).toContain("| Build | 90 | 9 | Validated |");
    expect(markdown).toContain("| TestPlan | 249 | 35 | Partial |");
    expect(markdown).toContain("| Check | 82 | 10 | Partial |");
  });

  it("renders API reference scale tables from current module stats", () => {
    expect(renderApiReferenceScaleMarkdown()).toContain(
      `产品工具合计 \`${collectProductToolStats().total}\` 个`
    );
    expect(renderReqApiReferenceScaleMarkdown()).toContain("| Req MCP 工具 | 243 |");
    expect(renderReqApiReferenceScaleMarkdown()).toContain(
      `| 含鉴权的共享 HTTP 工具 | ${collectHttpToolTotal()} |`
    );
  });
});

describe("syncModuleStatsDocuments", () => {
  it("updates known generated sections across docs", () => {
    const docs = {
      "README.md": createDocWithGeneratedBlocks("# README", [
        ["readme-exposure-summary", "old"],
        ["readme-module-numbers", "old"]
      ]),
      "docs/wiki/API-Reference.md": createDocWithGeneratedBlocks("# API Reference", [
        ["api-reference-scale", "old"]
      ]),
      "docs/wiki/Capability-Matrix.md": createDocWithGeneratedBlocks("# Capability Matrix", [
        ["capability-matrix", "old"]
      ]),
      "docs/wiki/Module-Live-Readiness.md": createDocWithGeneratedBlocks(
        "# Module Live Readiness",
        [
          ["module-live-readiness-table", "old"],
          ["module-live-readiness-totals", "old"],
          ["module-live-readiness-summary", "old"]
        ]
      ),
      "docs/wiki/Req-API-Reference.md": createDocWithGeneratedBlocks(
        "# Req API Reference",
        [["req-api-reference-scale", "old"]]
      )
    };

    const synced = syncModuleStatsDocuments(docs);

    expect(synced["README.md"]).toContain(
      `- \`${collectProductToolStats().total}\` product tools`
    );
    expect(synced["README.md"]).toContain("| Pipeline | 109 | Partial |");
    expect(synced["README.md"]).toContain("| Req | 243 | Partial |");
    expect(synced["docs/wiki/Capability-Matrix.md"]).toContain(
      "| Req | 148 | 95 | Partial |"
    );
    expect(synced["docs/wiki/API-Reference.md"]).toContain(
      `产品工具合计 \`${collectProductToolStats().total}\` 个`
    );
    expect(synced["docs/wiki/Module-Live-Readiness.md"]).toContain(
      "| Req | 243 | 148 | 95 | Partial |"
    );
    expect(synced["docs/wiki/Module-Live-Readiness.md"]).toContain(
      `- Total MCP tools exposed: \`${collectHttpToolTotal()}\``
    );
    expect(synced["docs/wiki/Module-Live-Readiness.md"]).toContain("| Deploy | 74 |");
    expect(synced["docs/wiki/Req-API-Reference.md"]).toContain(
      `| 含鉴权的共享 HTTP 工具 | ${collectHttpToolTotal()} |`
    );
  });
});

describe("findDriftedModuleStatsDocuments", () => {
  it("returns only documents whose generated sections are out of sync", () => {
    const docs = {
      "README.md": createDocWithGeneratedBlocks("# README", [
        ["readme-exposure-summary", "old"],
        ["readme-module-numbers", "old"]
      ]),
      "docs/wiki/Capability-Matrix.md": createDocWithGeneratedBlocks("# Capability Matrix", [
        ["capability-matrix", renderReadWriteMatrixMarkdown()]
      ])
    };

    expect(findDriftedModuleStatsDocuments(docs)).toEqual(["README.md"]);
  });
});

describe("tracked module stats docs", () => {
  it("loads the tracked docs from the repository", () => {
    const docs = loadTrackedModuleStatsDocuments();

    expect(Object.keys(docs)).toEqual([
      "README.md",
      "docs/wiki/API-Reference.md",
      "docs/wiki/Capability-Matrix.md",
      "docs/wiki/Module-Live-Readiness.md",
      "docs/wiki/Req-API-Reference.md"
    ]);
    expect(findDriftedModuleStatsDocuments(docs)).toEqual(expect.any(Array));
  });
});
