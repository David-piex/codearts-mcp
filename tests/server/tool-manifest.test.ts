import { describe, expect, it } from "vitest";
import { expectedToolNames } from "./expected-tool-names.js";
import { checkToolManifestRegistration } from "../../src/server/check-tool-manifest.js";
import {
  collectManifestToolNames,
  collectProductToolManifest,
  collectToolManifest,
  findToolManifestEntry,
  toolManifest
} from "../../src/server/tool-manifest.js";

describe("ToolManifest", () => {
  it("is the product tool-name source of truth", () => {
    expect(collectManifestToolNames({ kind: "product" })).toEqual(expectedToolNames);
    expect(collectProductToolManifest()).toHaveLength(expectedToolNames.length);
  });

  it("adds HTTP-only auth tools to the HTTP manifest", () => {
    expect(collectManifestToolNames({ mode: "stdio" })).toEqual(expectedToolNames);
    expect(collectManifestToolNames({ mode: "http" })).toEqual(
      [...expectedToolNames, "auth_clear_session", "auth_configure_session"].sort()
    );
  });

  it("keeps tool names unique and mapped to modules", () => {
    const names = toolManifest.map((entry) => entry.name);

    expect(new Set(names).size).toBe(names.length);
    expect(findToolManifestEntry("auth_configure_session")?.module).toBe("Auth / Session");
    expect(findToolManifestEntry("req_list_projects")?.module).toBe("Req");
    expect(
      collectToolManifest({ kind: "product" }).every((entry) => entry.family !== undefined)
    ).toBe(true);
  });

  it("matches actual stdio and HTTP server registration", () => {
    expect(() => checkToolManifestRegistration()).not.toThrow();
  });
});
