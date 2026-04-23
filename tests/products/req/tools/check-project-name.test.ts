import { describe, expect, it } from "vitest";
import { reqCheckProjectNameInput as reqCheckProjectNameInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqCheckProjectNameInput } from "../../../../src/products/req/schemas/project.js";
import { mapCheckedProjectName } from "../../../../src/products/req/tools/check-project-name.js";

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
