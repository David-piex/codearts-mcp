import { describe, expect, it, vi } from "vitest";
import { reqValidateModuleNameInput as reqValidateModuleNameInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqValidateModuleNameInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqValidateModuleNameHandler,
  mapValidatedModuleName
} from "../../../../src/products/req/tools/validate-module-name.js";

describe("mapValidatedModuleName", () => {
  it("returns normalized module name availability data", () => {
    const result = mapValidatedModuleName({
      project_id: "project-1",
      module_name: "Backend",
      exist: true
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      moduleName: "Backend",
      exists: true,
      available: false
    });
  });
});

describe("reqValidateModuleNameInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      project_id: "project-1",
      module_name: "Backend",
      x_auth_token: "token-123456"
    };

    expect(reqValidateModuleNameInput.parse(input)).toEqual(input);
    expect(reqValidateModuleNameInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqValidateModuleNameHandler", () => {
  it("returns normalized content and structured output", async () => {
    const client = {
      validateModuleName: vi.fn(async () => ({
        exist: false
      }))
    };
    const handler = createReqValidateModuleNameHandler(client);

    const result = await handler({
      project_id: "project-1",
      module_name: "Backend",
      x_auth_token: "token-123456"
    });

    expect(client.validateModuleName).toHaveBeenCalledWith({
      project_id: "project-1",
      module_name: "Backend",
      x_auth_token: "token-123456"
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Module name Backend is available in project project-1" }],
      structuredContent: {
        summary: "Module name Backend is available in project project-1",
        item: {
          projectId: "project-1",
          moduleName: "Backend",
          exists: false,
          available: true
        },
        raw: undefined
      }
    });
  });
});
