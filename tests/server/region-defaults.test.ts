import { describe, expect, it } from "vitest";
import {
  mergeSessionEndpointOverrides,
  resolveRegionDefaults
} from "../../src/server/region-defaults.js";

describe("resolveRegionDefaults", () => {
  it("returns the standard Beijing 4 CodeArts endpoints", () => {
    expect(resolveRegionDefaults("cn-north-4")).toEqual({
      req_base_url: "https://projectman-ext.cn-north-4.myhuaweicloud.com",
      repo_base_url: "https://codehub-ext.cn-north-4.myhuaweicloud.com",
      pipeline_base_url: "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
      check_base_url: "https://codearts-check.cn-north-4.myhuaweicloud.com",
      testplan_base_url: "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
      deploy_base_url: "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
      build_base_url: "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
      artifact_base_url: "https://artifact.cn-north-4.myhuaweicloud.cn"
    });
  });

  it("throws for malformed regions", () => {
    expect(() => resolveRegionDefaults("bad region")).toThrowError(
      /Invalid CodeArts region/
    );
  });
});

describe("mergeSessionEndpointOverrides", () => {
  it("keeps defaults when no overrides are provided", () => {
    const defaults = resolveRegionDefaults("cn-north-4");

    expect(mergeSessionEndpointOverrides(defaults, {})).toEqual(defaults);
  });

  it("overrides only the provided endpoint fields", () => {
    const defaults = resolveRegionDefaults("cn-north-4");

    expect(
      mergeSessionEndpointOverrides(defaults, {
        deploy_base_url: "https://custom-deploy.example.com"
      })
    ).toEqual({
      ...defaults,
      deploy_base_url: "https://custom-deploy.example.com"
    });
  });
});
