import { AppError } from "../errors/app-error.js";

export type RegionEndpointDefaults = {
  req_base_url: string;
  repo_base_url: string;
  pipeline_base_url: string;
  check_base_url: string;
  testplan_base_url: string;
  deploy_base_url: string;
  build_base_url: string;
  artifact_base_url: string;
};

const REGION_PATTERN = /^[a-z]{2}-[a-z0-9-]+-\d+$/;

function assertValidRegion(region: string): void {
  if (!REGION_PATTERN.test(region)) {
    throw new AppError("validation_error", `Invalid CodeArts region: ${region}`);
  }
}

export function resolveCodeArtsBaseUrl(region: string): string {
  assertValidRegion(region);
  return `https://codearts.${region}.myhuaweicloud.com`;
}

export function resolveRegionDefaults(region: string): RegionEndpointDefaults {
  assertValidRegion(region);

  return {
    req_base_url: `https://projectman-ext.${region}.myhuaweicloud.com`,
    repo_base_url: `https://codehub-ext.${region}.myhuaweicloud.com`,
    pipeline_base_url: `https://cloudpipeline-ext.${region}.myhuaweicloud.com`,
    check_base_url: `https://codecheck-ext.${region}.myhuaweicloud.com`,
    testplan_base_url: `https://cloudtest-ext.${region}.myhuaweicloud.com`,
    deploy_base_url: `https://codearts-deploy.${region}.myhuaweicloud.com`,
    build_base_url: `https://cloudbuild-ext.${region}.myhuaweicloud.com`,
    artifact_base_url: `https://artifact.${region}.myhuaweicloud.cn`
  };
}

export function mergeSessionEndpointOverrides(
  defaults: RegionEndpointDefaults,
  overrides: Partial<RegionEndpointDefaults>
): RegionEndpointDefaults {
  return {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, value]) => value !== undefined)
    )
  };
}
