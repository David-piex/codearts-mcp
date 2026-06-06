import { describe, expect, it, vi } from "vitest";
import { reqValidateProjectTemplateNameInput as reqValidateProjectTemplateNameInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqValidateProjectTemplateNameInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqValidateProjectTemplateNameHandler,
  mapValidatedProjectTemplateName
} from "../../../../src/products/req/tools/validate-project-template-name.js";

describe("mapValidatedProjectTemplateName", () => {
  it("returns normalized project template name availability data", () => {
    const result = mapValidatedProjectTemplateName({
      name: "Scrum Template",
      exist: true
    });

    expect(result.item).toEqual({
      name: "Scrum Template",
      exists: true,
      available: false
    });
  });
});

describe("reqValidateProjectTemplateNameInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      name: "Scrum Template",
      x_auth_token: "token-123456"
    };

    expect(reqValidateProjectTemplateNameInput.parse(input)).toEqual(input);
    expect(reqValidateProjectTemplateNameInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqValidateProjectTemplateNameHandler", () => {
  it("returns normalized content and structured output", async () => {
    const client = {
      validateProjectTemplateName: vi.fn(async () => ({
        exist: false
      }))
    };
    const handler = createReqValidateProjectTemplateNameHandler(client);

    const result = await handler({
      name: "Scrum Template",
      x_auth_token: "token-123456"
    });

    expect(client.validateProjectTemplateName).toHaveBeenCalledWith({
      name: "Scrum Template",
      x_auth_token: "token-123456"
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Project template name Scrum Template is available" }],
      structuredContent: {
        summary: "Project template name Scrum Template is available",
        item: {
          name: "Scrum Template",
          exists: false,
          available: true
        },
        raw: undefined
      }
    });
  });
});
