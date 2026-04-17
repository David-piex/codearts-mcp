import { describe, expect, it } from "vitest";
import { mapPipelineTemplates } from "../../../../src/products/pipeline/tools/list-templates.js";

describe("mapPipelineTemplates", () => {
  it("returns normalized pipeline templates with pagination", () => {
    const result = mapPipelineTemplates(
      [
        {
          id: "tpl-1",
          name: "Java CI",
          icon: "java",
          manifest_version: "3.0",
          language: "java",
          description: "Java build template",
          is_system: true,
          region: "cn-north-4"
        }
      ],
      2,
      10,
      12
    );

    expect(result.items).toEqual([
      {
        id: "tpl-1",
        name: "Java CI",
        icon: "java",
        manifestVersion: "3.0",
        language: "java",
        description: "Java build template",
        isSystem: true,
        region: "cn-north-4"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 2,
      pageSize: 10,
      total: 12
    });
  });
});
