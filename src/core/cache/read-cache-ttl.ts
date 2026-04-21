export type ReadCacheTtls = {
  reqListProjectsMs: number;
  repoListRepositoriesMs: number;
  pipelineListPipelinesMs: number;
  buildListJobsMs: number;
};

export const DEFAULT_READ_CACHE_TTLS: ReadCacheTtls = {
  reqListProjectsMs: 60_000,
  repoListRepositoriesMs: 60_000,
  pipelineListPipelinesMs: 5_000,
  buildListJobsMs: 5_000
};

export function resolveReadCacheTtls(
  overrides: Partial<ReadCacheTtls> = {}
): ReadCacheTtls {
  const entries = Object.entries(overrides).filter(
    ([, value]) => value !== undefined
  ) as Array<[keyof ReadCacheTtls, number]>;

  return {
    ...DEFAULT_READ_CACHE_TTLS,
    ...Object.fromEntries(entries)
  };
}
