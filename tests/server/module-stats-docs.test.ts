import { describe, expect, it } from "vitest";
import {
  findDriftedModuleStatsDocuments,
  loadTrackedModuleStatsDocuments,
  replaceGeneratedSection,
  renderReadWriteMatrixMarkdown,
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
    expect(renderReadmeExposureSummaryMarkdown()).toContain("- `384` product tools");
    expect(renderReadmeExposureSummaryMarkdown()).toContain(
      "- `386` total MCP tools in shared `http` mode"
    );
  });

  it("renders the read/write matrix from current module stats", () => {
    const markdown = renderReadWriteMatrixMarkdown();

    expect(markdown).toContain("| Module | Read | Write | Live | Key Gaps |");
    expect(markdown).toContain("| Deploy | 44 | 15 | Partial |");
    expect(markdown).toContain("| Build | 14 | 8 | Validated |");
  });
});

describe("syncModuleStatsDocuments", () => {
  it("updates known generated sections across docs", () => {
    const docs = {
      "README.md": createDocWithGeneratedBlocks("# README", [
        ["readme-exposure-summary", "old"],
        ["readme-module-numbers", "old"]
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
      )
    };

    const synced = syncModuleStatsDocuments(docs);

    expect(synced["README.md"]).toContain("- `384` product tools");
    expect(synced["README.md"]).toContain("| Pipeline | 77 | Partial |");
    expect(synced["README.md"]).toContain("| Req | 174 | Partial |");
    expect(synced["docs/wiki/Capability-Matrix.md"]).toContain(
      "| Req | 110 | 64 | Partial |"
    );
    expect(synced["docs/wiki/Module-Live-Readiness.md"]).toContain(
      "| Req | 174 | 110 | 64 | Partial |"
    );
    expect(synced["docs/wiki/Module-Live-Readiness.md"]).toContain(
      "- Total MCP tools exposed: `386`"
    );
    expect(synced["docs/wiki/Module-Live-Readiness.md"]).toContain("| Deploy | 59 |");
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
      "docs/wiki/Capability-Matrix.md",
      "docs/wiki/Module-Live-Readiness.md"
    ]);
    expect(findDriftedModuleStatsDocuments(docs)).toEqual(expect.any(Array));
  });
});
