import { describe, expect, it } from "vitest";
import { createBuildListBuildParameterTypesHandler } from "../../../../src/products/build/tools/list-build-parameter-types.js";

describe("createBuildListBuildParameterTypesHandler", () => {
  it("maps build parameter types into MCP output", async () => {
    const handler = createBuildListBuildParameterTypesHandler({
      listBuildParameterTypes: async () => ({
        parameterTypes: [
          {
            name: "hudson.model.StringParameterDefinition",
            title: "String Parameters"
          }
        ],
        total: 1
      })
    });

    const result = await handler({});

    expect(result.content[0]?.text).toContain("build parameter types");
    expect(result.structuredContent.items).toEqual([
      {
        id: "hudson.model.StringParameterDefinition",
        name: "hudson.model.StringParameterDefinition",
        parameterType: {
          name: "hudson.model.StringParameterDefinition",
          title: "String Parameters"
        }
      }
    ]);
  });
});
