import { describe, expect, it } from "vitest";
import { collectToolNames } from "../../src/server/register-tools.js";
import { collectProductToolManifest } from "../../src/server/tool-manifest.js";

describe("phase 1 contract", () => {
  it("keeps the published product tools aligned with the manifest", () => {
    expect(collectToolNames()).toHaveLength(collectProductToolManifest().length);
  });
});
