import { createReadThroughCache } from "../../core/cache/read-through-cache.js";
import type { ReturnTypeCreateHttpClient } from "../types.js";
import { normalizeProviderError } from "../../core/errors/app-error.js";
import { recordRequestCacheHit } from "../../server/request-context.js";

export type PipelineClient = {
  getRunParameters: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    parameters: Array<{
      name?: string;
      value?: string;
      value_type?: string;
      is_runtime?: boolean;
    }>;
  }>;
  getRunLog: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    log: string;
    status?: string;
    truncated?: boolean;
  }>;
  getStepOutputs: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    step_run_ids: string[];
  }) => Promise<{
    step_outputs: Array<{
      step_run_id?: string;
      output_result?: Array<{ key?: string; value?: string }>;
    }>;
    current_system_time?: number;
  }>;
  listArtifacts: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    artifacts: Array<{
      name?: string;
      artifact_version?: string;
      upload_target?: string;
      artifact_package_type?: string;
      artifact_uri?: string;
      artifact_download_url_with_id?: string;
      artifact_type?: string;
      job_id?: string;
      build_no?: number;
    }>;
  }>;
  rejectRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    success?: boolean;
  }>;
  retryRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
  approveRun: (input: {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  }) => Promise<{
    pipeline_run_id?: string;
    job_id?: string;
    step_id?: string;
    status?: string;
  }>;
  stopRun: (input: { pipeline_id: string; run_id: string }) => Promise<{
    pipeline_id?: string;
    pipeline_name?: string;
  }>;
  getRunDetail: (input: { project_id: string; pipeline_id: string; run_id: string }) => Promise<{
    id: string;
    pipeline_id?: string;
    name?: string;
    status?: string;
    executor_name?: string;
    trigger_type?: string;
    run_number?: number;
    detail_url?: string;
    stages?: Array<{
      id?: string;
      name?: string;
      status?: string;
      jobs?: Array<{
        id?: string;
        job_run_id?: string;
        name?: string;
        status?: string;
        steps?: Array<{
          id?: string;
          step_run_id?: string;
          name?: string;
          status?: string;
          task_type?: string;
          type?: string;
        }>;
      }>;
    }>;
  }>;
  runPipeline: (input: {
    project_id: string;
    pipeline_id: string;
    branch?: string;
    description?: string;
  }) => Promise<{
    pipeline_run_id?: string;
  }>;
  listTemplates: (input: {
    tenant_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    language?: string;
    is_system?: boolean;
  }) => Promise<{
    templates: Array<{
      id?: string;
      name?: string;
      icon?: string;
      manifest_version?: string;
      language?: string;
      description?: string;
      is_system?: boolean;
      region?: string;
    }>;
    total?: number;
  }>;
  getPipeline: (input: { project_id: string; pipeline_id: string }) => Promise<{
    id: string;
    name: string;
    description?: string;
    manifest_version?: string;
    creator_name?: string;
    is_publish?: boolean;
    project_id?: string;
    project_name?: string;
    detail_url?: string;
    modify_url?: string;
  }>;
  listPipelines: (input: { project_id: string; page: number; page_size: number; keyword?: string }) => Promise<{
    records: Array<{
      pipeline_id: string;
      name: string;
      creator_name?: string;
      project_id?: string;
      project_name?: string;
      manifest_version?: string;
      latest_run?: {
        pipeline_run_id?: string;
        status?: string;
        run_number?: number;
        trigger_type?: string;
      };
    }>;
    total?: number;
  }>;
  getRun: (input: { project_id: string; pipeline_id: string; run_id: string }) => Promise<{
    pipeline_run_id: string;
    status?: string;
    executor_name?: string;
    trigger_type?: string;
  }>;
  listRuns: (input: { project_id: string; pipeline_id: string; page: number; page_size: number }) => Promise<{
    records: Array<{ pipeline_run_id: string; status?: string; executor_name?: string }>;
    total?: number;
  }>;
};

type PipelineClientOptions = {
  listCacheTtlMs?: number;
  now?: () => number;
};

function unwrapPipelinePayload<T>(input: T): T {
  if (
    input &&
    typeof input === "object" &&
    "error_msg" in input &&
    typeof (input as { error_msg?: unknown }).error_msg === "string"
  ) {
    throw normalizeProviderError({
      status: 400,
      message: String((input as { error_msg: string }).error_msg),
      code:
        "error_code" in input && typeof (input as { error_code?: unknown }).error_code === "string"
          ? String((input as { error_code: string }).error_code)
          : undefined
    });
  }

  return input;
}

export function createPipelineClient(
  _http: ReturnTypeCreateHttpClient,
  options: PipelineClientOptions = {}
): PipelineClient {
  const listCacheTtlMs = options.listCacheTtlMs ?? 15_000;
  const now = options.now ?? Date.now;
  const listCache = createReadThroughCache<
    string,
    {
      records: Array<{
        pipeline_id: string;
        name: string;
        creator_name?: string;
        project_id?: string;
        project_name?: string;
        manifest_version?: string;
        latest_run?: {
          pipeline_run_id?: string;
          status?: string;
          run_number?: number;
          trigger_type?: string;
        };
      }>;
      total?: number;
    }
  >({
    ttlMs: listCacheTtlMs,
    now
  });
  const listCacheKeys = new Set<string>();

  function buildListCacheKey(input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
  }) {
    return JSON.stringify([input.project_id, input.page, input.page_size, input.keyword ?? ""]);
  }

  function clearProjectListCache(projectId: string) {
    for (const key of listCacheKeys) {
      const [cachedProjectId] = JSON.parse(key) as [string, number, number, string];

      if (cachedProjectId === projectId) {
        listCache.clear(key);
        listCacheKeys.delete(key);
      }
    }
  }

  return {
    async getRunParameters(input) {
      try {
        const response = (await _http.get(
          `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/run-variables?mode=0`
        )) as
          | Array<{
              name?: string;
              value?: string;
              type?: string;
              is_runtime?: boolean | string;
              latest_value?: string;
            }>
          | {
              variables?: Array<{
                name?: string;
                value?: string;
                type?: string;
                is_runtime?: boolean | string;
                latest_value?: string;
              }>;
            };
        const items = Array.isArray(response) ? response : (response.variables ?? []);

        return {
          parameters: items.map((item) => ({
            name: item.name,
            value: item.value ?? item.latest_value,
            value_type: item.type,
            is_runtime:
              typeof item.is_runtime === "string" ? item.is_runtime === "true" : item.is_runtime
          }))
        };
      } catch {
        const query = new URLSearchParams({
          pipeline_run_id: input.run_id
        });

        const response = (await _http.get(
          `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/list-runtime-vars?${query.toString()}`
        )) as
          | Array<{
              name?: string;
              value?: string;
              value_type?: string;
              is_runtime?: boolean;
            }>
          | {
              variables?: Array<{
                name?: string;
                value?: string;
                value_type?: string;
                is_runtime?: boolean;
              }>;
              runtime_vars?: Array<{
                name?: string;
                value?: string;
                value_type?: string;
                is_runtime?: boolean;
              }>;
            };

        return {
          parameters: Array.isArray(response)
            ? response
            : (response.variables ?? response.runtime_vars ?? [])
        };
      }
    },
    async getRunLog(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/jobs/${encodeURIComponent(input.job_id)}/steps/${encodeURIComponent(input.step_id)}/logs`
      )) as {
        log?: string;
        status?: string;
        truncated?: boolean;
        result?: {
          log?: string;
          status?: string;
          truncated?: boolean;
        };
      };

      return {
        log: response.log ?? response.result?.log ?? "",
        status: response.status ?? response.result?.status,
        truncated: response.truncated ?? response.result?.truncated
      };
    },
    async getStepOutputs(input) {
      const query = new URLSearchParams({
        pipeline_run_id: input.run_id,
        step_run_ids: input.step_run_ids.join(",")
      });

      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/step-outputs?${query.toString()}`
      )) as {
        step_outputs?: Array<{
          step_run_id?: string;
          output_result?: Array<{ key?: string; value?: string }>;
        }>;
        current_system_time?: number;
      };

      return {
        step_outputs: response.step_outputs ?? [],
        current_system_time: response.current_system_time
      };
    },
    async listArtifacts(input) {
      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/artifacts`
      )) as {
        artifacts?: Array<{
          name?: string;
          artifact_version?: string;
          upload_target?: string;
          artifact_package_type?: string;
          artifact_uri?: string;
          artifact_download_url_with_id?: string;
          artifact_type?: string;
          job_id?: string;
          build_no?: number;
        }>;
        result?: {
          artifacts?: Array<{
            name?: string;
            artifact_version?: string;
            upload_target?: string;
            artifact_package_type?: string;
            artifact_uri?: string;
            artifact_download_url_with_id?: string;
            artifact_type?: string;
            job_id?: string;
            build_no?: number;
          }>;
        };
      };

      return {
        artifacts: response.artifacts ?? response.result?.artifacts ?? []
      };
    },
    async rejectRun(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/reject`,
        {
          job_run_id: input.job_id,
          step_run_id: input.step_id
        }
      )) as {
        success?: boolean;
      };

      return {
        success: response.success ?? true
      };
    },
    async retryRun(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/retry`
      )) as {
        pipeline_run_id?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id
      };
    },
    async approveRun(input) {
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/pass`,
        {
          job_run_id: input.job_id,
          step_run_id: input.step_id
        }
      )) as {
        pipeline_run_id?: string;
        job_run_id?: string;
        step_run_id?: string;
        status?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id ?? input.run_id,
        job_id: response.job_run_id ?? input.job_id,
        step_id: response.step_run_id ?? input.step_id,
        status: response.status
      };
    },
    async stopRun(input) {
      const response = (await _http.post(
        `/v5/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/${encodeURIComponent(input.run_id)}/stop`
      )) as {
        pipeline_id?: string;
        pipeline_name?: string;
      };

      return {
        pipeline_id: response.pipeline_id ?? input.pipeline_id,
        pipeline_name: response.pipeline_name
      };
    },
    async getRunDetail(input) {
      const query = new URLSearchParams({
        pipeline_run_id: input.run_id
      });

      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/detail?${query.toString()}`
      )) as {
        id?: string;
        pipeline_run_id?: string;
        pipeline_id?: string;
        name?: string;
        status?: string;
        executor_name?: string;
        trigger_type?: string;
        run_number?: number;
        detail_url?: string;
        stages?: Array<{
          id?: string;
          name?: string;
          status?: string;
          jobs?: Array<{
            id?: string;
            job_run_id?: string;
            name?: string;
            status?: string;
            steps?: Array<{
              id?: string;
              step_run_id?: string;
              name?: string;
              status?: string;
              task_type?: string;
              type?: string;
            }>;
          }>;
        }>;
      };

      return {
        id: response.id ?? response.pipeline_run_id ?? input.run_id,
        pipeline_id: response.pipeline_id ?? input.pipeline_id,
        name: response.name,
        status: response.status,
        executor_name: response.executor_name,
        trigger_type: response.trigger_type,
        run_number: response.run_number,
        detail_url: response.detail_url,
        stages: response.stages
      };
    },
    async runPipeline(input) {
      clearProjectListCache(input.project_id);
      const body =
        input.branch || input.description
          ? {
              description: input.description,
              ...(input.branch
                ? {
                    sources: [
                      {
                        type: "code",
                        params: {
                          build_params: {
                            build_type: "branch",
                            event_type: "Manual",
                            target_branch: input.branch
                          }
                        }
                      }
                    ]
                  }
                : {})
            }
          : {};

      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/run`,
        body
      )) as {
        pipeline_run_id?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id
      };
    },
    async listTemplates(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.tenant_id)}/api/pipeline-templates/list`,
        {
          offset,
          limit: input.page_size,
          name: input.keyword,
          language: input.language,
          is_system: input.is_system
        }
      )) as {
        templates?: Array<{
          id?: string;
          name?: string;
          icon?: string;
          manifest_version?: string;
          language?: string;
          description?: string;
          is_system?: boolean;
          region?: string;
        }>;
        total?: number;
      };

      return {
        templates: response.templates ?? [],
        total: response.total
      };
    },
    async getPipeline(input) {
      const response = unwrapPipelinePayload((await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}`
      )) as {
        id?: string;
        pipeline_id?: string;
        name?: string;
        description?: string;
        manifest_version?: string;
        creator_name?: string;
        is_publish?: boolean;
        project_id?: string;
        project_name?: string;
        detail_url?: string;
        modify_url?: string;
      });

      return {
        id: response.id ?? response.pipeline_id ?? input.pipeline_id,
        name: response.name ?? "",
        description: response.description,
        manifest_version: response.manifest_version,
        creator_name: response.creator_name,
        is_publish: response.is_publish,
        project_id: response.project_id,
        project_name: response.project_name,
        detail_url: response.detail_url,
        modify_url: response.modify_url
      };
    },
    async listPipelines(input) {
      const cacheKey = buildListCacheKey(input);
      listCacheKeys.add(cacheKey);
      const cached = await listCache.getOrLoad(cacheKey, async () => {
        const offset = (input.page - 1) * input.page_size;
        const response = unwrapPipelinePayload((await _http.post(
          `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/list`,
          {
            offset,
            limit: input.page_size,
            name: input.keyword
          }
        )) as {
          pipelines?: Array<{
            pipeline_id: string;
            name: string;
            creator_name?: string;
            project_id?: string;
            project_name?: string;
            manifest_version?: string;
            latest_run?: {
              pipeline_run_id?: string;
              status?: string;
              run_number?: number;
              trigger_type?: string;
            };
          }>;
          records?: Array<{
            pipeline_id: string;
            name: string;
            creator_name?: string;
            project_id?: string;
            project_name?: string;
            manifest_version?: string;
            latest_run?: {
              pipeline_run_id?: string;
              status?: string;
              run_number?: number;
              trigger_type?: string;
            };
          }>;
          total?: number;
        });
        const records = (response.records ?? response.pipelines ?? []).filter(
          (item) => !item.project_id || item.project_id === input.project_id
        );
        const filtered = records.length !== (response.records ?? response.pipelines ?? []).length;

        return {
          records,
          total: filtered ? records.length : response.total
        };
      });

      if (cached.cacheHit) {
        recordRequestCacheHit("pipeline_list_pipelines");
      }

      return cached.value;
    },
    async listRuns(input) {
      const offset = (input.page - 1) * input.page_size;
      const response = (await _http.post(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/list`,
        {
          offset,
          limit: input.page_size
        }
      )) as {
        records?: Array<{ pipeline_run_id: string; status?: string; executor_name?: string }>;
        pipeline_runs?: Array<{ pipeline_run_id: string; status?: string; executor_name?: string }>;
        total?: number;
        total_count?: number;
      };

      return {
        records: response.records ?? response.pipeline_runs ?? [],
        total: response.total ?? response.total_count
      };
    },
    async getRun(input) {
      const response = (await _http.get(
        `/v5/${encodeURIComponent(input.project_id)}/api/pipelines/${encodeURIComponent(input.pipeline_id)}/pipeline-runs/detail?pipeline_run_id=${encodeURIComponent(input.run_id)}`
      )) as {
        id?: string;
        pipeline_run_id?: string;
        status?: string;
        executor_name?: string;
        trigger_type?: string;
      };

      return {
        pipeline_run_id: response.pipeline_run_id ?? response.id ?? input.run_id,
        status: response.status,
        executor_name: response.executor_name,
        trigger_type: response.trigger_type
      };
    }
  };
}
