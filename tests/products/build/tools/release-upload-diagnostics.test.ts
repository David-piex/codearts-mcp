import { describe, expect, it } from "vitest";
import {
  collectReleaseUploadWarnings,
  getArtifactMetadata,
  hasSuspiciousJavaArchivePackaging,
  isReleasePublishingStep,
  withReleaseUploadWarningSummary
} from "../../../../src/products/build/tools/release-upload-diagnostics.js";

describe("release upload diagnostics", () => {
  it("detects release publishing steps from release upload identifiers", () => {
    expect(
      isReleasePublishingStep({
        name: "Upload package to release repository",
        module_id: "devcloud2018.codeci_action_20018.action"
      })
    ).toBe(true);
  });

  it("detects suspicious javascript bundles renamed as java archives", () => {
    expect(
      hasSuspiciousJavaArchivePackaging({
        command: "npx esbuild app.ts --outfile=app.js\ncp app.js codeartsmcpdemo.jar"
      })
    ).toBe(true);
  });

  it("extracts artifact metadata from release upload step properties", () => {
    expect(
      getArtifactMetadata({
        file: "codeartsmcpdemo.jar",
        name: "codeartsmcpdemo",
        buildVersion: "1.0.2",
        customUploadPath: "/codeartsmcpdemo/1.0.2"
      })
    ).toEqual({
      artifactFile: "codeartsmcpdemo.jar",
      artifactPackageName: "codeartsmcpdemo",
      artifactBuildVersion: "1.0.2",
      artifactCustomUploadPath: "/codeartsmcpdemo/1.0.2"
    });
  });

  it("builds java archive warnings and warning summary text", () => {
    const warnings = collectReleaseUploadWarnings("codeartsmcpdemo.jar");

    expect(warnings).toEqual(["java_archive_upload_requires_real_archive"]);
    expect(
      withReleaseUploadWarningSummary("Configured release upload step", warnings)
    ).toContain("Warning: .jar/.war/.ear uploads should be real Java archive artifacts.");
  });
});
