import { describe, expect, it } from "vitest";
import {
  findDriftedModuleStatsDocuments,
  loadTrackedModuleStatsDocuments,
  replaceGeneratedSection,
  renderReadWriteMatrixMarkdown,
  renderReadmeExposureSummaryMarkdown,
  syncModuleStatsDocuments
} from "../../src/server/module-stats-docs.js";

describe("replaceGeneratedSection", () => {
  it("replaces only the content inside a generated marker block", () => {
    const source = [
      "# Doc",
      "<!-- GENERATED:test:start -->",
      "old content",
      "<!-- GENERATED:test:end -->",
      "tail"
    ].join("\n");

    expect(replaceGeneratedSection(source, "test", "new content")).toBe(
      [
        "# Doc",
        "<!-- GENERATED:test:start -->",
        "new content",
        "<!-- GENERATED:test:end -->",
        "tail"
      ].join("\n")
    );
  });
});

describe("module stats doc rendering", () => {
  it("renders the README exposure summary from current tool totals", () => {
    expect(renderReadmeExposureSummaryMarkdown()).toContain("- `156` product tools");
    expect(renderReadmeExposureSummaryMarkdown()).toContain(
      "- `158` total MCP tools in shared `http` mode"
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
      "README.md": [
        "# README",
        "<!-- GENERATED:readme-exposure-summary:start -->",
        "old",
        "<!-- GENERATED:readme-exposure-summary:end -->",
        "<!-- GENERATED:readme-module-numbers:start -->",
        "old",
        "<!-- GENERATED:readme-module-numbers:end -->"
      ].join("\n"),
      "docs/wiki/Capability-Matrix.md": [
        "# Capability Matrix",
        "<!-- GENERATED:capability-matrix:start -->",
        "old",
        "<!-- GENERATED:capability-matrix:end -->"
      ].join("\n"),
      "docs/wiki/Current-Implementation-Status-2026-04-17.md": [
        "# Current Status",
        "<!-- GENERATED:implementation-status-table:start -->",
        "old",
        "<!-- GENERATED:implementation-status-table:end -->",
        "<!-- GENERATED:implementation-status-totals:start -->",
        "old",
        "<!-- GENERATED:implementation-status-totals:end -->"
      ].join("\n"),
      "docs/wiki/Tool-Status-Matrix.md": [
        "# Tool Status Matrix",
        "<!-- GENERATED:tool-status-module-summary:start -->",
        "old",
        "<!-- GENERATED:tool-status-module-summary:end -->"
      ].join("\n")
    };

    const synced = syncModuleStatsDocuments(docs);

    expect(synced["README.md"]).toContain("- `156` product tools");
    expect(synced["README.md"]).toContain("| Build | 22 | Validated |");
    expect(synced["docs/wiki/Capability-Matrix.md"]).toContain(
      "| Pipeline | 11 | 5 | Validated |"
    );
    expect(synced["docs/wiki/Current-Implementation-Status-2026-04-17.md"]).toContain(
      "| Build | 22 | 14 | 8 | Validated |"
    );
    expect(synced["docs/wiki/Current-Implementation-Status-2026-04-17.md"]).toContain(
      "- Total MCP tools exposed: `158`"
    );
    expect(synced["docs/wiki/Tool-Status-Matrix.md"]).toContain("| Deploy | 59 |");
  });
});

describe("findDriftedModuleStatsDocuments", () => {
  it("returns only documents whose generated sections are out of sync", () => {
    const docs = {
      "README.md": [
        "# README",
        "<!-- GENERATED:readme-exposure-summary:start -->",
        "old",
        "<!-- GENERATED:readme-exposure-summary:end -->",
        "<!-- GENERATED:readme-module-numbers:start -->",
        "old",
        "<!-- GENERATED:readme-module-numbers:end -->"
      ].join("\n"),
      "docs/wiki/Capability-Matrix.md": [
        "# Capability Matrix",
        "<!-- GENERATED:capability-matrix:start -->",
        renderReadWriteMatrixMarkdown(),
        "<!-- GENERATED:capability-matrix:end -->"
      ].join("\n")
    };

    expect(findDriftedModuleStatsDocuments(docs)).toEqual(["README.md"]);
  });
});

describe("tracked module stats docs", () => {
  it("loads the tracked docs from the repository and keeps them in sync", () => {
    const docs = loadTrackedModuleStatsDocuments();

    expect(Object.keys(docs)).toEqual([
      "README.md",
      "docs/wiki/Capability-Matrix.md",
      "docs/wiki/Current-Implementation-Status-2026-04-17.md",
      "docs/wiki/Tool-Status-Matrix.md"
    ]);
    expect(findDriftedModuleStatsDocuments(docs)).toEqual([]);
  });
});
