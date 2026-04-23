import { describe, expect, it, vi } from "vitest";
import { reqCheckProjectNameInput as reqCheckProjectNameInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCheckProjectNameInput } from "../../../../src/products/req/schemas/project.js";
import {
  createReqCheckProjectNameHandler,
  mapCheckedProjectName
} from "../../../../src/products/req/tools/check-project-name.js";

describe("mapCheckedProjectName", () => {
  it("returns normalized project name availability data", () => {
    const result = mapCheckedProjectName({
      name: "Alpha",
      exist: true
    });

    expect(result.item).toEqual({
      name: "Alpha",
      exists: true,
      available: false
    });
  });
});

describe("reqCheckProjectNameInput exports", () => {
  it("keeps the barrel export compatible with the project schema module", () => {
    const input = {
      name: "Alpha"
    };

    expect(reqCheckProjectNameInput.parse(input)).toEqual(input);
    expect(reqCheckProjectNameInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqCheckProjectNameHandler", () => {
  it("returns normalized content and structured output", async () => {
    const client = {
      checkProjectName: vi.fn(async () => ({
        exist: false
      }))
    };
    const handler = createReqCheckProjectNameHandler(client);

    const result = await handler({
      name: "Alpha"
    });

    expect(client.checkProjectName).toHaveBeenCalledWith({
      name: "Alpha"
    });
    expect(result).toEqual({
      content: [{ type: "text", text: "Project name Alpha is available" }],
      structuredContent: {
        summary: "Project name Alpha is available",
        item: {
          name: "Alpha",
          exists: false,
          available: true
        },
        raw: undefined
      }
    });
  });
});
