import { describe, expect, it } from "vitest";
import { formatProjectScopedEmptyText } from "../../src/contracts/project-scoped-empty-text.js";

describe("formatProjectScopedEmptyText", () => {
  it("adds a hint for first-page empty project-scoped results", () => {
    const text = formatProjectScopedEmptyText({
      summary: "0 pipelines found",
      page: 1,
      projectId: "project-1",
      resourceLabel: "pipelines",
      serviceLabel: "Pipeline"
    });

    expect(text).toContain("0 pipelines found");
    expect(text).toContain("If you expected pipelines here");
    expect(text).toContain("project-1");
  });

  it("does not add a hint when a keyword filter is present", () => {
    const text = formatProjectScopedEmptyText({
      summary: "0 pipelines found",
      page: 1,
      keyword: "demo",
      projectId: "project-1",
      resourceLabel: "pipelines",
      serviceLabel: "Pipeline"
    });

    expect(text).toBe("0 pipelines found");
  });

  it("does not add a hint on later pages", () => {
    const text = formatProjectScopedEmptyText({
      summary: "0 pipelines found",
      page: 2,
      projectId: "project-1",
      resourceLabel: "pipelines",
      serviceLabel: "Pipeline"
    });

    expect(text).toBe("0 pipelines found");
  });
});
