import { describe, expect, it, vi } from "vitest";
import { createPipelineClient } from "../../../src/products/pipeline/client.js";
import {
  pipelineCreateChangeRequestInput,
  pipelineCreateComponentInput,
  pipelineCreateTemplateInput,
  pipelineDeleteTemplateInput,
  pipelineFavoriteTemplateInput,
  pipelineGetTenantVersionDetailInput,
  pipelineListChangeRequestOperationLogsInput,
  pipelineListChangeRequestCreatorsInput,
  pipelineListRelatedProjectsInput,
  pipelineCheckVariableGroupRightsInput,
  pipelineUpdateComponentInput,
  pipelineUpdateChangeRequestStatusInput,
  pipelineUpdateTemplateInput,
  pipelineUpdateChangeRequestWorkItemsInput,
  pipelineUploadPublisherIconInput
} from "../../../src/products/pipeline/schemas.js";

function createClient(
  transport: Record<string, unknown>,
  options?: Parameters<typeof createPipelineClient>[1]
) {
  return createPipelineClient(transport as never, options);
}

function createListPipelinesInput(overrides: Record<string, unknown> = {}) {
  return {
    project_id: "requested-project",
    page: 1,
    page_size: 20,
    ...overrides
  };
}

function createPipelineRecord(overrides: Record<string, unknown> = {}) {
  return {
    pipeline_id: "pipe-1",
    name: "deploy-main",
    creator_name: "yao",
    ...overrides
  };
}

function createListPipelinesResponse(
  records: Array<Record<string, unknown>>,
  total = records.length
) {
  return {
    records,
    total
  };
}

function createNowController(initialNow = 1_000) {
  let now = initialNow;

  return {
    now: () => now,
    advance: (ms: number) => {
      now += ms;
    }
  };
}

function createProjectPipelineInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  pipeline_id: string;
} & T {
  return {
    project_id: "project-1",
    pipeline_id: "pipe-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
  } & T;
}

function createProjectInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
} & T {
  return {
    project_id: "project-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
  } & T;
}

function createProjectPageInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    project_id: "project-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    project_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createProjectPipelinePageInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  pipeline_id: string;
  page: number;
  page_size: number;
} & T {
  return {
    project_id: "project-1",
    pipeline_id: "pipe-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
    page: number;
    page_size: number;
  } & T;
}

function createProjectPipelineRunInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  pipeline_id: string;
  run_id: string;
} & T {
  return {
    project_id: "project-1",
    pipeline_id: "pipe-1",
    run_id: "run-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
    run_id: string;
  } & T;
}

function createProjectPipelineReviewInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  pipeline_id: string;
  run_id: string;
  job_id: string;
  step_id: string;
} & T {
  return {
    project_id: "project-1",
    pipeline_id: "pipe-1",
    run_id: "run-1",
    job_id: "job-1",
    step_id: "step-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    pipeline_id: string;
    run_id: string;
    job_id: string;
    step_id: string;
  } & T;
}

function createUuidInput<T extends Record<string, unknown>>(overrides?: T): {
  uuid: string;
} & T {
  return {
    uuid: "endpoint-1",
    ...(overrides ?? {})
  } as {
    uuid: string;
  } & T;
}

function createProjectRegionModuleInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  region_name: string;
  module_id: string;
} & T {
  return {
    project_id: "project-1",
    region_name: "cn-north-4",
    module_id: "module-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    region_name: string;
    module_id: string;
  } & T;
}

function createProjectRegionModuleLimitInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  region_name: string;
  module_id: string;
  offset: number;
  limit: number;
} & T {
  return {
    project_id: "project-1",
    region_name: "cn-north-4",
    module_id: "module-1",
    offset: 0,
    limit: 20,
    ...(overrides ?? {})
  } as {
    project_id: string;
    region_name: string;
    module_id: string;
    offset: number;
    limit: number;
  } & T;
}

function createExtensionEndpointInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  region_name: string;
  module_id: string;
  name: string;
  url: string;
  authorization: {
    scheme: string;
    parameters: {
      username: string;
    };
  };
  data: {
    repo: string;
  };
} & T {
  return {
    project_id: "project-1",
    region_name: "cn-north-4",
    module_id: "module-1",
    name: "Maven Central",
    url: "https://repo.example.com",
    authorization: {
      scheme: "endpoint-auth-scheme-basic",
      parameters: {
        username: "yao"
      }
    },
    data: {
      repo: "central"
    },
    ...(overrides ?? {})
  } as {
    project_id: string;
    region_name: string;
    module_id: string;
    name: string;
    url: string;
    authorization: {
      scheme: string;
      parameters: {
        username: string;
      };
    };
    data: {
      repo: string;
    };
  } & T;
}

function createDomainInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
} & T {
  return {
    domain_id: "domain-1",
    ...(overrides ?? {})
  } as {
    domain_id: string;
  } & T;
}

function createDomainOffsetLimitInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
  offset: number;
  limit: number;
} & T {
  return {
    domain_id: "domain-1",
    offset: 0,
    limit: 20,
    ...(overrides ?? {})
  } as {
    domain_id: string;
    offset: number;
    limit: number;
  } & T;
}

function createDomainPluginInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
  plugin_name: string;
  display_name: string;
  version: string;
  plugin_attribution: string;
} & T {
  return {
    domain_id: "domain-1",
    plugin_name: "custom-plugin",
    display_name: "Custom Plugin",
    version: "1.0.0",
    plugin_attribution: "custom",
    ...(overrides ?? {})
  } as {
    domain_id: string;
    plugin_name: string;
    display_name: string;
    version: string;
    plugin_attribution: string;
  } & T;
}

function createDomainPluginPageInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
  plugin_name: string;
  offset: number;
  limit: number;
} & T {
  return {
    domain_id: "domain-1",
    plugin_name: "custom-plugin",
    offset: 0,
    limit: 20,
    ...(overrides ?? {})
  } as {
    domain_id: string;
    plugin_name: string;
    offset: number;
    limit: number;
  } & T;
}

function createDomainPluginVersionInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
  plugin_name: string;
  version: string;
} & T {
  return {
    domain_id: "domain-1",
    plugin_name: "custom-plugin",
    version: "1.0.0",
    ...(overrides ?? {})
  } as {
    domain_id: string;
    plugin_name: string;
    version: string;
  } & T;
}

function createDomainRuleSetInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
  rule_set_id: string;
} & T {
  return {
    domain_id: "domain-1",
    rule_set_id: "strategy-1",
    ...(overrides ?? {})
  } as {
    domain_id: string;
    rule_set_id: string;
  } & T;
}

function createDomainRuleSetOffsetLimitInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
  rule_set_id: string;
  offset: number;
  limit: number;
} & T {
  return {
    domain_id: "domain-1",
    rule_set_id: "strategy-1",
    offset: 0,
    limit: 20,
    ...(overrides ?? {})
  } as {
    domain_id: string;
    rule_set_id: string;
    offset: number;
    limit: number;
  } & T;
}

function createDomainCloudProjectInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
  cloud_project_id: string;
} & T {
  return {
    domain_id: "domain-1",
    cloud_project_id: "project-1",
    ...(overrides ?? {})
  } as {
    domain_id: string;
    cloud_project_id: string;
  } & T;
}

function createDomainOffsetLimitCloudProjectInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
  cloud_project_id: string;
  offset: number;
  limit: number;
} & T {
  return {
    domain_id: "domain-1",
    cloud_project_id: "project-1",
    offset: 0,
    limit: 20,
    ...(overrides ?? {})
  } as {
    domain_id: string;
    cloud_project_id: string;
    offset: number;
    limit: number;
  } & T;
}

function createProjectRuleSetInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  rule_set_id: string;
} & T {
  return {
    project_id: "project-1",
    rule_set_id: "project-strategy-1",
    ...(overrides ?? {})
  } as {
    project_id: string;
    rule_set_id: string;
  } & T;
}

function createProjectOffsetLimitInput<T extends Record<string, unknown>>(overrides?: T): {
  project_id: string;
  offset: number;
  limit: number;
} & T {
  return {
    project_id: "project-1",
    offset: 0,
    limit: 20,
    ...(overrides ?? {})
  } as {
    project_id: string;
    offset: number;
    limit: number;
  } & T;
}

function createDomainRuleInput<T extends Record<string, unknown>>(overrides?: T): {
  domain_id: string;
  rule_id: string;
} & T {
  return {
    domain_id: "domain-1",
    rule_id: "rule-1",
    ...(overrides ?? {})
  } as {
    domain_id: string;
    rule_id: string;
  } & T;
}

function createOrganizationInput<T extends Record<string, unknown>>(overrides?: T): {
  organization_id: string;
} & T {
  return {
    organization_id: "org-1",
    ...(overrides ?? {})
  } as {
    organization_id: string;
  } & T;
}

function createPipelineReference<T extends Record<string, unknown>>(overrides?: T): {
  pipeline_id: string;
  pipeline_name: string;
} & T {
  return {
    pipeline_id: "pipe-1",
    pipeline_name: "release-main",
    ...(overrides ?? {})
  } as {
    pipeline_id: string;
    pipeline_name: string;
  } & T;
}

function createPipelineGroupRecord<T extends Record<string, unknown>>(overrides?: T): {
  id: string;
  project_id: string;
  name: string;
} & T {
  return {
    id: "group-1",
    project_id: "project-1",
    name: "Release",
    ...(overrides ?? {})
  } as {
    id: string;
    project_id: string;
    name: string;
  } & T;
}

function createVariableGroupVariable<T extends Record<string, unknown>>(overrides?: T): {
  name: string;
  value: string;
  type: string;
  is_secret: boolean;
} & T {
  return {
    name: "ENV",
    value: "prod",
    type: "string",
    is_secret: false,
    ...(overrides ?? {})
  } as {
    name: string;
    value: string;
    type: string;
    is_secret: boolean;
  } & T;
}

function createPipelineVariableGroupRecord<T extends Record<string, unknown>>(overrides?: T): {
  id: string;
  project_id: string;
  name: string;
  description: string;
  variables: Array<{
    name: string;
    value: string;
    type: string;
    is_secret: boolean;
  }>;
} & T {
  return {
    id: "vg-1",
    project_id: "project-1",
    name: "Release Vars",
    description: "shared release variables",
    variables: [createVariableGroupVariable()],
    ...(overrides ?? {})
  } as {
    id: string;
    project_id: string;
    name: string;
    description: string;
    variables: Array<{
      name: string;
      value: string;
      type: string;
      is_secret: boolean;
    }>;
  } & T;
}

function createPipelineTagRecord<T extends Record<string, unknown>>(overrides?: T): {
  tag_id: string;
  name: string;
  color: string;
  project_id: string;
  project_name: string;
} & T {
  return {
    tag_id: "tag-1",
    name: "release",
    color: "#0b81f6",
    project_id: "project-1",
    project_name: "Codearts-mcp",
    ...(overrides ?? {})
  } as {
    tag_id: string;
    name: string;
    color: string;
    project_id: string;
    project_name: string;
  } & T;
}

function createRuleConditionProperty<T extends Record<string, unknown>>(overrides?: T): {
  key: string;
  type: string;
  name: string;
  operator: string;
  value: string;
  value_type: string;
} & T {
  return {
    key: "coverage",
    type: "judge",
    name: "Coverage",
    operator: ">=",
    value: "0.8",
    value_type: "float",
    ...(overrides ?? {})
  } as {
    key: string;
    type: string;
    name: string;
    operator: string;
    value: string;
    value_type: string;
  } & T;
}

function createRuleContentGroup<T extends Record<string, unknown>>(overrides?: T): {
  group_name: string;
  properties: Array<{
    key: string;
    type: string;
    name: string;
    operator: string;
    value: string;
    value_type: string;
  }>;
} & T {
  return {
    group_name: "Group A",
    properties: [createRuleConditionProperty()],
    ...(overrides ?? {})
  } as {
    group_name: string;
    properties: Array<{
      key: string;
      type: string;
      name: string;
      operator: string;
      value: string;
      value_type: string;
    }>;
  } & T;
}

describe("createPipelineClient", () => {
  it("defaults publisher icon uploads to dry-run", () => {
    const parsed = pipelineUploadPublisherIconInput.parse({
      domain_id: "domain-1",
      publisher_en_name: "demoPublisher",
      file_name: "icon.png",
      file_content: "png-bytes"
    });

    expect(parsed).toMatchObject({
      content_type: "application/octet-stream",
      dry_run: true
    });
  });

  it("defaults pipeline change request write inputs to dry-run", () => {
    expect(
      pipelineCreateChangeRequestInput.parse({
        cloud_project_id: "project-1",
        component_id: "component-1",
        title: "Release CR",
        workitem_ids: ["70844211"],
        repos: [
          {
            repo_id: "repo-1",
            http_url: "https://example.com/repo.git",
            git_url: "git@example.com:repo.git",
            feature_branch: "feature/release",
            main_branch: "main"
          }
        ]
      }).dry_run
    ).toBe(true);

    expect(
      pipelineUpdateChangeRequestStatusInput.parse({
        cloud_project_id: "project-1",
        change_request_id: "cr-1",
        status: "released"
      }).dry_run
    ).toBe(true);

    expect(
      pipelineUpdateChangeRequestWorkItemsInput.parse({
        cloud_project_id: "project-1",
        change_request_id: "cr-1",
        work_item_ids: ["70844211"]
      }).dry_run
    ).toBe(true);

    expect(
      pipelineListChangeRequestOperationLogsInput.parse({
        cloud_project_id: "project-1",
        change_request_id: "cr-1"
      })
    ).toEqual({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      offset: 0,
      limit: 20
    });
  });

  it("defaults pipeline template and component write inputs to dry-run", () => {
    expect(
      pipelineCreateTemplateInput.parse({
        tenant_id: "tenant-1",
        name: "Node.js",
        language: "nodejs",
        definition: "{\"stages\":[]}"
      }).dry_run
    ).toBe(true);

    expect(
      pipelineUpdateTemplateInput.parse({
        tenant_id: "tenant-1",
        template_id: "tpl-1",
        name: "Node.js v2",
        language: "nodejs",
        definition: "{\"stages\":[]}"
      }).dry_run
    ).toBe(true);

    expect(
      pipelineDeleteTemplateInput.parse({
        tenant_id: "tenant-1",
        template_id: "tpl-1"
      }).dry_run
    ).toBe(true);

    expect(
      pipelineFavoriteTemplateInput.parse({
        tenant_id: "tenant-1",
        template_id: "tpl-1",
        flag: true
      }).dry_run
    ).toBe(true);

    expect(
      pipelineCreateComponentInput.parse({
        cloud_project_id: "project-1",
        name: "mall-order",
        type: "microservice",
        repos: [
          {
            type: "codehub",
            repo_id: "repo-1",
            http_url: "https://example.com/repo.git",
            git_url: "git@example.com:repo.git",
            branch: "master",
            language: "java"
          }
        ]
      }).dry_run
    ).toBe(true);

    expect(
      pipelineUpdateComponentInput.parse({
        cloud_project_id: "project-1",
        component_id: "component-1",
        desc: "updated service"
      }).dry_run
    ).toBe(true);
  });

  it("defaults new pipeline read helper inputs", () => {
    expect(
      pipelineListRelatedProjectsInput.parse({
        tenant_id: "tenant-1"
      })
    ).toEqual({
      tenant_id: "tenant-1",
      page_index: 1,
      page_size: 20
    });

    expect(
      pipelineListChangeRequestCreatorsInput.parse({
        cloud_project_id: "project-1",
        component_id: "component-1"
      })
    ).toEqual({
      cloud_project_id: "project-1",
      component_id: "component-1"
    });

    expect(
      pipelineGetTenantVersionDetailInput.parse({
        tenant_id: "tenant-1"
      })
    ).toEqual({
      tenant_id: "tenant-1"
    });

    expect(
      pipelineCheckVariableGroupRightsInput.parse({
        project_id: "project-1"
      })
    ).toEqual({
      project_id: "project-1"
    });
  });

  it("supports pipelines field when listing pipelines", async () => {
    const client = createClient({
      post: async () => ({
        pipelines: [
          createPipelineRecord({
            name: "release-main"
          })
        ],
        total: 1
      })
    });

    const result = await client.listPipelines(
      createListPipelinesInput({
        project_id: "owner-project"
      })
    );

    expect(result.records).toEqual([
      { pipeline_id: "pipe-1", name: "release-main", creator_name: "yao" }
    ]);
    expect(result.total).toBe(1);
  });

  it("preserves owner project fields and latest run summary when listing pipelines", async () => {
    const client = createClient({
      post: async () =>
        createListPipelinesResponse([
          createPipelineRecord({
            name: "release-main",
            project_id: "owner-project",
            project_name: "owner-name",
            manifest_version: "3.0",
            latest_run: {
              pipeline_run_id: "run-1",
              status: "COMPLETED",
              run_number: 8,
              trigger_type: "Manual"
            }
          })
        ])
    });

    const result = await client.listPipelines(
      createListPipelinesInput({
        project_id: "owner-project"
      })
    );

    expect(result.records).toEqual([
      {
        pipeline_id: "pipe-1",
        name: "release-main",
        creator_name: "yao",
        project_id: "owner-project",
        project_name: "owner-name",
        manifest_version: "3.0",
        latest_run: {
          pipeline_run_id: "run-1",
          status: "COMPLETED",
          run_number: 8,
          trigger_type: "Manual"
        }
      }
    ]);
    expect(result.total).toBe(1);
  });

  it("filters out pipelines that belong to a different project than the requested scope", async () => {
    const client = createClient({
      post: async () =>
        createListPipelinesResponse([
          createPipelineRecord({
            pipeline_id: "pipe-foreign",
            name: "release-main",
            project_id: "owner-project",
            project_name: "housekeeper"
          }),
          createPipelineRecord({
            pipeline_id: "pipe-local",
            creator_name: "alice",
            project_id: "requested-project",
            project_name: "codearts-mcp"
          }),
          createPipelineRecord({
            pipeline_id: "pipe-legacy",
            name: "legacy-pipeline",
            creator_name: "legacy",
            project_id: undefined,
            project_name: undefined
          })
        ])
    });

    const result = await client.listPipelines(createListPipelinesInput());

    expect(result.records).toEqual([
      {
        pipeline_id: "pipe-local",
        name: "deploy-main",
        creator_name: "alice",
        project_id: "requested-project",
        project_name: "codearts-mcp"
      },
      {
        pipeline_id: "pipe-legacy",
        name: "legacy-pipeline",
        creator_name: "legacy"
      }
    ]);
    expect(result.total).toBe(2);
  });

  it("reuses a short-lived cache for repeated identical pipeline list calls", async () => {
    const clock = createNowController();
    const post = vi.fn(async () =>
      createListPipelinesResponse([
        createPipelineRecord({
          pipeline_id: "pipe-local",
          project_id: "requested-project"
        })
      ])
    );
    const client = createClient(
      {
        post
      },
      {
        listCacheTtlMs: 30_000,
        now: clock.now
      }
    );

    const first = await client.listPipelines(createListPipelinesInput());
    clock.advance(1_000);
    const second = await client.listPipelines(createListPipelinesInput());

    expect(second).toEqual(first);
    expect(post).toHaveBeenCalledTimes(1);
  });

  it("refreshes the pipeline list cache after the short cache window expires", async () => {
    const clock = createNowController();
    const post = vi
      .fn()
      .mockResolvedValueOnce(
        createListPipelinesResponse([
          createPipelineRecord({
            pipeline_id: "pipe-1"
          })
        ])
      )
      .mockResolvedValueOnce(
        createListPipelinesResponse([
          createPipelineRecord({
            pipeline_id: "pipe-2",
            name: "deploy-next"
          })
        ])
      );
    const client = createClient(
      {
        post
      },
      {
        listCacheTtlMs: 30_000,
        now: clock.now
      }
    );

    const first = await client.listPipelines(createListPipelinesInput());
    clock.advance(30_001);
    const second = await client.listPipelines(createListPipelinesInput());

    expect(first.records[0]?.pipeline_id).toBe("pipe-1");
    expect(second.records[0]?.pipeline_id).toBe("pipe-2");
    expect(post).toHaveBeenCalledTimes(2);
  });

  it("deduplicates concurrent listPipelines calls for the same key", async () => {
    const post = vi.fn(async () =>
      createListPipelinesResponse([
        createPipelineRecord({
          pipeline_id: "pipe-local",
          project_id: "requested-project"
        })
      ])
    );
    const client = createClient(
      {
        post
      },
      {
        listCacheTtlMs: 30_000,
        now: () => 1_000
      }
    );

    const [left, right] = await Promise.all([
      client.listPipelines(createListPipelinesInput()),
      client.listPipelines(createListPipelinesInput())
    ]);

    expect(left.total).toBe(1);
    expect(right.total).toBe(1);
    expect(post).toHaveBeenCalledTimes(1);
  });

  it("refreshes the default pipeline list cache before the legacy 15 second window", async () => {
    const clock = createNowController();
    const post = vi
      .fn()
      .mockResolvedValueOnce(
        createListPipelinesResponse([
          createPipelineRecord({
            pipeline_id: "pipe-1"
          })
        ])
      )
      .mockResolvedValueOnce(
        createListPipelinesResponse([
          createPipelineRecord({
            pipeline_id: "pipe-2",
            name: "deploy-next"
          })
        ])
      );
    const client = createClient(
      {
        post
      },
      {
        now: clock.now
      }
    );

    await client.listPipelines(createListPipelinesInput());
    clock.advance(6_000);
    await client.listPipelines(createListPipelinesInput());

    expect(post).toHaveBeenCalledTimes(2);
  });

  it("maps pipeline artifacts responses", async () => {
    const client = createClient({
      get: async () => ({
        artifacts: [
          {
            name: "gateway.jar",
            artifact_uri: "/com/demo/gateway.jar",
            artifact_download_url_with_id: "https://download.example.com/gateway.jar"
          }
        ]
      })
    });

    const result = await client.listArtifacts(createProjectPipelineRunInput());

    expect(result.artifacts).toEqual([
      {
        name: "gateway.jar",
        artifact_uri: "/com/demo/gateway.jar",
        artifact_download_url_with_id: "https://download.example.com/gateway.jar"
      }
    ]);
  });

  it("gets pipeline notices and permissions", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        return {
          result: {
            id: "notice-1",
            name: path.includes("permission") ? "permission" : "notice",
            enabled: true
          }
        };
      }
    });

    await expect(client.getOfficialNotice(createProjectPipelineInput())).resolves.toEqual({
      notice: { id: "notice-1", name: "notice", enabled: true }
    });
    await expect(client.getNoticeStatus(createProjectPipelineInput())).resolves.toEqual({
      status: { id: "notice-1", name: "notice", enabled: true }
    });
    await expect(
      client.getNoticeDetail(createProjectPipelineInput({ type: "system" }))
    ).resolves.toEqual({
      detail: { id: "notice-1", name: "notice", enabled: true }
    });
    await expect(client.getPermissionSwitch(createProjectPipelineInput())).resolves.toEqual({
      permission_switch: { id: "notice-1", name: "permission", enabled: true }
    });
    await expect(client.getRolePermission(createProjectPipelineInput())).resolves.toEqual({
      role_permission: { id: "notice-1", name: "permission", enabled: true }
    });
    await expect(client.getUserPermission(createProjectPipelineInput())).resolves.toEqual({
      user_permission: { id: "notice-1", name: "permission", enabled: true }
    });

    expect(requests).toEqual([
      "/v5/project-1/api/pipeline-notices/pipe-1/notice",
      "/v5/project-1/api/pipeline-notices/pipe-1/notice/status",
      "/v5/project-1/api/pipeline-notices/pipe-1/notice/detail?type=system",
      "/v5/project-1/api/pipeline-permissions/pipe-1/permission-switch",
      "/v5/project-1/api/pipeline-permissions/pipe-1/role-permission",
      "/v5/project-1/api/pipeline-permissions/pipe-1/user-permission"
    ]);
  });

  it("updates pipeline notices and permissions", async () => {
    const post = vi.fn(async () => ({ status: "success" }));
    const put = vi
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce({ status: "success" });
    const client = createClient({ post, put });

    await expect(client.updateOfficialNotice({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      event_type: "pipeline.deleted",
      notice_data: { notice_types: ["MESSAGE"], notice_roles: ["CREATOR"] }
    })).resolves.toEqual({ status: "success" });
    await expect(client.switchNotice({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      notice_type: "officialNotice",
      notice_switch: false
    })).resolves.toEqual({ status: "success" });
    await expect(client.updateThirdPartyNotice({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      notice_id: "notice-1",
      notice_type: "feishu",
      notice_status: true,
      send_url: "https://example.com/hook"
    })).resolves.toEqual({ status: "success" });
    await expect(client.updateNoticeStatus({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      type: 3,
      enable: true
    })).resolves.toEqual({ enabled: true });
    await expect(client.updateRolePermission({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      operation_query: true,
      operation_execute: true,
      operation_update: true,
      operation_delete: false,
      operation_authorize: false,
      role_id: 4
    })).resolves.toEqual({ status: "success" });
    await expect(client.updateUserPermission({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      operation_query: true,
      operation_execute: true,
      operation_update: true,
      operation_delete: false,
      operation_authorize: false,
      user_id: "user-1"
    })).resolves.toEqual({ status: "success" });
    await expect(client.switchPermission({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      flag: true
    })).resolves.toEqual({ status: "success" });

    expect(post).toHaveBeenNthCalledWith(1, "/v5/project-1/api/pipeline-notices/pipe-1/notice", {
      event_type: "pipeline.deleted",
      notice_data: { notice_types: ["MESSAGE"], notice_roles: ["CREATOR"] }
    });
    expect(post).toHaveBeenNthCalledWith(2, "/v5/project-1/api/pipeline-notices/pipe-1/notice/all", {
      notice_type: "officialNotice",
      notice_switch: false
    });
    expect(post).toHaveBeenNthCalledWith(3, "/v5/project-1/api/pipeline-notices/pipe-1/notice/message", {
      notice_id: "notice-1",
      notice_type: "feishu",
      notice_status: true,
      send_url: "https://example.com/hook"
    });
    expect(put).toHaveBeenNthCalledWith(1, "/v5/project-1/api/pipeline-notices/pipe-1/notice/status", {
      type: 3,
      enable: true
    });
    expect(post).toHaveBeenNthCalledWith(4, "/v5/project-1/api/pipeline-permissions/pipe-1/update-role-permission", {
      pipeline_id: "pipe-1",
      operation_query: true,
      operation_execute: true,
      operation_update: true,
      operation_delete: false,
      operation_authorize: false,
      role_id: 4
    });
    expect(post).toHaveBeenNthCalledWith(5, "/v5/project-1/api/pipeline-permissions/pipe-1/update-user-permission", {
      pipeline_id: "pipe-1",
      operation_query: true,
      operation_execute: true,
      operation_update: true,
      operation_delete: false,
      operation_authorize: false,
      user_id: "user-1"
    });
    expect(put).toHaveBeenNthCalledWith(2, "/v5/project-1/api/pipeline-permissions/pipe-1/update-permission-switch?flag=true");
  });

  it("lists pipeline queue, system variables, trigger failures, and modify history", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("list-system-vars")) {
          return {
            result: {
              variables: [{ name: "PROJECT_ID", value: "project-1" }],
              total: 1
            }
          };
        }

        return {
          result: {
            records: [{ id: "record-1", name: "queued" }],
            total: 1
          }
        };
      }
    });

    await expect(client.listQueue(createProjectPipelineInput())).resolves.toEqual({
      records: [{ id: "record-1", name: "queued" }],
      total: 1,
      raw: {
        records: [{ id: "record-1", name: "queued" }],
        total: 1
      }
    });
    await expect(client.listSystemVars(createProjectPipelineInput())).resolves.toEqual({
      variables: [{ name: "PROJECT_ID", value: "project-1" }],
      total: 1,
      raw: {
        variables: [{ name: "PROJECT_ID", value: "project-1" }],
        total: 1
      }
    });
    await expect(
      client.listTriggerFailedRecords(createProjectPipelinePageInput({ page: 2, page_size: 10 }))
    ).resolves.toEqual({
      records: [{ id: "record-1", name: "queued" }],
      total: 1,
      raw: {
        records: [{ id: "record-1", name: "queued" }],
        total: 1
      }
    });
    await expect(client.listModifyHistory(createProjectPipelineInput())).resolves.toEqual({
      records: [{ id: "record-1", name: "queued" }],
      total: 1,
      raw: {
        records: [{ id: "record-1", name: "queued" }],
        total: 1
      }
    });

    expect(requests).toEqual([
      "/v5/project-1/api/pipelines/pipe-1/queued-pipeline",
      "/v5/project-1/api/pipelines/pipe-1/list-system-vars",
      "/v5/project-1/api/pipelines/pipe-1/trigger-failed-record?offset=10&limit=10",
      "/v5/project-1/api/pipelines/pipe-1/pipelines-modify-historys"
    ]);
  });

  it("reads pipeline webhook info and pipeline variables", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/webhook")) {
          return {
            result: {
              id: "webhook-1",
              name: "default webhook",
              url: "https://example.invalid/hook"
            }
          };
        }

        return {
          result: {
            variables: [{ name: "APP_ENV", value: "prod" }],
            total: 1
          }
        };
      }
    });

    await expect(client.getWebhookInfo(createProjectPipelineInput())).resolves.toEqual({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      webhook: {
        id: "webhook-1",
        name: "default webhook",
        url: "https://example.invalid/hook"
      }
    });
    await expect(client.listPipelineVars(createProjectPipelineInput())).resolves.toEqual({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      variables: [{ name: "APP_ENV", value: "prod" }],
      total: 1,
      raw: {
        variables: [{ name: "APP_ENV", value: "prod" }],
        total: 1
      }
    });

    expect(requests).toEqual([
      "/v5/project-1/api/pipelines/pipe-1/webhook",
      "/v5/project-1/api/pipelines/pipe-1/list-pipeline-vars"
    ]);
  });

  it("gets pipeline template detail", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            id: "tpl-1",
            name: "Node.js",
            icon: "node",
            manifest_version: "3.0",
            language: "nodejs",
            description: "Node template",
            is_system: true,
            region: "cn-north-4"
          }
        };
      }
    });

    await expect(client.getTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1"
    })).resolves.toEqual({
      id: "tpl-1",
      name: "Node.js",
      icon: "node",
      manifest_version: "3.0",
      language: "nodejs",
      description: "Node template",
      is_system: true,
      region: "cn-north-4",
      template: {
        id: "tpl-1",
        name: "Node.js",
        icon: "node",
        manifest_version: "3.0",
        language: "nodejs",
        description: "Node template",
        is_system: true,
        region: "cn-north-4"
      }
    });
    expect(requestedPath).toBe("/v5/tenant-1/api/pipeline-templates/tpl-1");
  });

  it("calls pipeline template write endpoints", async () => {
    const calls: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        calls.push({ method: "POST", path, body });
        return { templateId: "tpl-1" };
      },
      put: async (path: string, body?: unknown) => {
        calls.push({ method: "PUT", path, body });
        return { templateId: "tpl-1" };
      },
      delete: async (path: string) => {
        calls.push({ method: "DELETE", path });
        return { templateId: "tpl-1" };
      }
    });

    await client.createTemplate({
      tenant_id: "tenant-1",
      name: "Node.js",
      language: "nodejs",
      definition: "{\"stages\":[]}",
      is_show_source: true
    });
    await client.updateTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      name: "Node.js v2",
      language: "nodejs",
      definition: "{\"stages\":[1]}",
      is_system: false
    });
    await client.deleteTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1"
    });
    await client.favoriteTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      flag: true
    });

    expect(calls).toEqual([
      {
        method: "POST",
        path: "/v5/tenant-1/api/pipeline-templates",
        body: {
          name: "Node.js",
          language: "nodejs",
          definition: "{\"stages\":[]}",
          is_show_source: true
        }
      },
      {
        method: "PUT",
        path: "/v5/tenant-1/api/pipeline-templates/tpl-1",
        body: {
          name: "Node.js v2",
          language: "nodejs",
          definition: "{\"stages\":[1]}",
          is_system: false
        }
      },
      {
        method: "DELETE",
        path: "/v5/tenant-1/api/pipeline-templates/tpl-1"
      },
      {
        method: "POST",
        path: "/v5/tenant-1/api/pipeline-templates/tpl-1/favorite?flag=true",
        body: undefined
      }
    ]);
  });

  it("maps reject manual review responses", async () => {
    const client = createClient({
      post: async () => ({
        success: true
      })
    });

    const result = await client.rejectRun(createProjectPipelineReviewInput());

    expect(result).toEqual({ success: true });
  });

  it("maps exec log responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          log: "line1\nline2",
          has_more: true,
          start_offset: "0",
          end_offset: "42",
          step_run_id: "step-1"
        };
      }
    });

    const result = await client.getExecLog({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1",
      start_offset: 0,
      end_offset: 0,
      limit: 500,
      sort: "asc",
      offset: 0
    });

    expect(requestedPath).toBe(
      "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/jobs/job-1/steps/step-1/exec-log"
    );
    expect(requestedBody).toEqual({
      start_offset: 0,
      end_offset: 0,
      limit: 500,
      sort: "asc",
      offset: 0
    });
    expect(result).toEqual({
      log: "line1\nline2",
      has_more: true,
      start_offset: "0",
      end_offset: "42",
      step_run_id: "step-1"
    });
  });

  it("maps delay and checkpoint control responses", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body: body ?? null });
        return { success: true };
      }
    });

    await expect(client.acceptDelayJob(createProjectPipelineReviewInput())).resolves.toEqual({
      success: true
    });
    await expect(client.rejectDelayJob(createProjectPipelineReviewInput())).resolves.toEqual({
      success: true
    });
    await expect(client.continueDelayJob(createProjectPipelineReviewInput())).resolves.toEqual({
      success: true
    });
    await expect(
      client.acceptCheckpoint(
        createProjectPipelineRunInput({
          step_id: "step-1"
        })
      )
    ).resolves.toEqual({ success: true });
    await expect(
      client.rejectCheckpoint(
        createProjectPipelineRunInput({
          step_id: "step-1"
        })
      )
    ).resolves.toEqual({ success: true });
    await expect(client.resumePipeline(createProjectPipelineReviewInput())).resolves.toEqual({
      success: true
    });

    expect(requests).toEqual([
      {
        path: "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/jobs/job-1/steps/step-1/delay-pass",
        body: null
      },
      {
        path: "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/jobs/job-1/steps/step-1/delay-refuse",
        body: null
      },
      {
        path: "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/jobs/job-1/steps/step-1/delay",
        body: null
      },
      {
        path: "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/steps/step-1/manual/pass",
        body: null
      },
      {
        path: "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/steps/step-1/manual/refuse",
        body: null
      },
      {
        path: "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/jobs/job-1/steps/step-1/resume",
        body: null
      }
    ]);
  });

  it("maps pipeline tenant strategy detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          id: "strategy-1",
          name: "Default Strategy",
          type: "tenant",
          version: "1.0",
          creator: "yao",
          create_time: "2026-04-21T08:00:00Z",
          updater: "yao",
          update_time: "2026-04-21T09:00:00Z",
          is_valid: true,
          level: "tenant",
          is_public: true,
          rule_instances: [
            {
              id: "rule-1",
              name: "Build Gate",
              type: "build",
              is_valid: true
            }
          ]
        };
      }
    });

    const result = await client.getStrategy(createDomainCloudProjectInput({
      rule_set_id: "strategy-1"
    }));

    expect(requestedPath).toContain("/v2/domain-1/tenant/rule-sets/strategy-1/detail");
    expect(requestedPath).toContain("cloud_project_id=project-1");
    expect(result).toEqual({
      id: "strategy-1",
      name: "Default Strategy",
      type: "tenant",
      version: "1.0",
      creator: "yao",
      create_time: "2026-04-21T08:00:00Z",
      updater: "yao",
      update_time: "2026-04-21T09:00:00Z",
      is_valid: true,
      level: "tenant",
      is_public: true,
      rule_instances: [
        {
          id: "rule-1",
          name: "Build Gate",
          type: "build",
          is_valid: true
        }
      ]
    });
  });

  it("maps pipeline tenant strategy list responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: [
            {
              id: "strategy-1",
              name: "Default Strategy",
              type: "tenant",
              version: "1.0",
              operator: "yao",
              operate_time: 1_713_685_200_000,
              is_valid: true,
              level: "tenant",
              is_public: true,
              is_legacy: false
            }
          ],
          total: 1
        };
      }
    });

    const result = await client.listStrategies(
      createDomainOffsetLimitInput({
        include_tenant_rule_set: true,
        name: "Default",
        is_valid: true,
        type: "tenant"
      })
    );

    expect(requestedPath).toContain("/v2/domain-1/tenant/rule-sets/query?");
    expect(requestedPath).toContain("offset=0");
    expect(requestedPath).toContain("limit=20");
    expect(requestedPath).toContain("include_tenant_rule_set=true");
    expect(requestedPath).toContain("name=Default");
    expect(requestedPath).toContain("is_valid=true");
    expect(requestedPath).toContain("type=tenant");
    expect(result).toEqual({
      data: [
        {
          id: "strategy-1",
          name: "Default Strategy",
          type: "tenant",
          version: "1.0",
          operator: "yao",
          operate_time: 1_713_685_200_000,
          is_valid: true,
          level: "tenant",
          is_public: true,
          is_legacy: false
        }
      ],
      total: 1
    });
  });

  it("maps create pipeline tenant strategy responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          status: true,
          rule_set_id: "strategy-1"
        };
      }
    });

    const result = await client.createStrategy(
      createDomainInput({
        name: "Default Strategy",
        rules: [{ id: "rule-1", is_valid: true }]
      })
    );

    expect(requestedPath).toBe("/v2/domain-1/tenant/rule-sets/create");
    expect(requestedBody).toEqual({
      name: "Default Strategy",
      rules: [{ id: "rule-1", is_valid: true }]
    });
    expect(result).toEqual({
      status: true,
      rule_set_id: "strategy-1"
    });
  });

  it("maps update pipeline tenant strategy responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      put: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          status: true
        };
      }
    });

    const result = await client.updateStrategy(
      createDomainRuleSetInput({
        name: "Default Strategy v2",
        rules: [{ id: "rule-2", is_valid: false }]
      })
    );

    expect(requestedPath).toBe("/v2/domain-1/tenant/rule-sets/strategy-1/update");
    expect(requestedBody).toEqual({
      name: "Default Strategy v2",
      rules: [{ id: "rule-2", is_valid: false }]
    });
    expect(result).toEqual({
      status: true,
      rule_set_id: "strategy-1"
    });
  });

  it("maps delete pipeline tenant strategy responses", async () => {
    let requestedPath = "";
    const client = createClient({
      delete: async (path: string) => {
        requestedPath = path;
        return {
          status: true
        };
      }
    });

    const result = await client.deleteStrategy(createDomainRuleSetInput());

    expect(requestedPath).toBe("/v2/domain-1/tenant/rule-sets/strategy-1/delete");
    expect(result).toEqual({
      status: true,
      rule_set_id: "strategy-1"
    });
  });

  it("maps switch pipeline tenant strategy responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      put: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          status: true,
          rule_set_id: "strategy-1"
        };
      }
    });

    const result = await client.switchStrategy(
      createDomainRuleSetInput({
        is_valid: false
      })
    );

    expect(requestedPath).toBe("/v2/domain-1/tenant/rule-sets/strategy-1/switch");
    expect(requestedBody).toEqual({
      is_valid: false
    });
    expect(result).toEqual({
      status: true,
      rule_set_id: "strategy-1"
    });
  });

  it("maps pipeline tenant strategy related info responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          project_count: 2,
          pipeline_count: 5
        };
      }
    });

    const result = await client.getStrategyRelatedInfo(createDomainRuleSetInput());

    expect(requestedPath).toBe("/v2/domain-1/tenant/rule-sets/strategy-1/related/query");
    expect(result).toEqual({
      project_count: 2,
      pipeline_count: 5
    });
  });

  it("maps pipeline tenant strategy children responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: [
            {
              id: "strategy-2",
              name: "Project Strategy",
              type: "project",
              version: "1.1",
              operator: "alice",
              operate_time: 1_713_685_200_001,
              is_valid: true,
              level: "project",
              is_public: false,
              is_legacy: false
            }
          ],
          total: 1
        };
      }
    });

    const result = await client.listStrategyChildren(
      createDomainRuleSetOffsetLimitInput({
        limit: 10
      })
    );

    expect(requestedPath).toContain("/v2/domain-1/tenant/rule-sets/strategy-1/children?");
    expect(requestedPath).toContain("offset=0");
    expect(requestedPath).toContain("limit=10");
    expect(result).toEqual({
      data: [
        {
          id: "strategy-2",
          name: "Project Strategy",
          type: "project",
          version: "1.1",
          operator: "alice",
          operate_time: 1_713_685_200_001,
          is_valid: true,
          level: "project",
          is_public: false,
          is_legacy: false
        }
      ],
      total: 1
    });
  });

  it("maps pipeline project strategy list responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          data: [
            {
              id: "project-strategy-1",
              name: "Project Strategy",
              type: "project",
              version: "1.0",
              operator: "yao",
              operate_time: 1_713_685_200_100,
              is_valid: true,
              level: "project",
              is_public: false,
              is_legacy: false
            }
          ],
          total: 1
        };
      }
    });

    const result = await client.listProjectStrategies(
      createProjectOffsetLimitInput({
        include_tenant_rule_set: false,
        name: "Project",
        is_valid: true,
        type: "project"
      })
    );

    expect(requestedPath).toContain("/v2/project-1/rule-sets/query?");
    expect(requestedPath).toContain("offset=0");
    expect(requestedPath).toContain("limit=20");
    expect(requestedPath).toContain("include_tenant_rule_set=false");
    expect(requestedPath).toContain("name=Project");
    expect(requestedPath).toContain("is_valid=true");
    expect(requestedPath).toContain("type=project");
    expect(result).toEqual({
      data: [
        {
          id: "project-strategy-1",
          name: "Project Strategy",
          type: "project",
          version: "1.0",
          operator: "yao",
          operate_time: 1_713_685_200_100,
          is_valid: true,
          level: "project",
          is_public: false,
          is_legacy: false
        }
      ],
      total: 1
    });
  });

  it("maps pipeline project strategy gray detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          id: "project-strategy-1",
          name: "Project Strategy",
          type: "project",
          version: "1.0",
          creator: "yao",
          create_time: "2026-04-21T10:00:00Z",
          updater: "alice",
          update_time: "2026-04-21T11:00:00Z",
          is_valid: true,
          level: "project",
          is_public: false,
          is_legacy: false,
          rule_instances: [
            {
              id: "rule-1",
              name: "Build Gate",
              type: "build",
              is_valid: true
            }
          ]
        };
      }
    });

    const result = await client.getProjectStrategy(createProjectRuleSetInput());

    expect(requestedPath).toBe("/v2/project-1/rule-sets/project-strategy-1/gray/detail");
    expect(result).toEqual({
      id: "project-strategy-1",
      name: "Project Strategy",
      type: "project",
      version: "1.0",
      creator: "yao",
      create_time: "2026-04-21T10:00:00Z",
      updater: "alice",
      update_time: "2026-04-21T11:00:00Z",
      is_valid: true,
      level: "project",
      is_public: false,
      is_legacy: false,
      rule_instances: [
        {
          id: "rule-1",
          name: "Build Gate",
          type: "build",
          is_valid: true
        }
      ]
    });
  });

  it("maps pipeline project strategy related info responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          project_count: 1,
          pipeline_count: 6
        };
      }
    });

    const result = await client.getProjectStrategyRelatedInfo(createProjectRuleSetInput());

    expect(requestedPath).toBe("/v2/project-1/rule-sets/project-strategy-1/related/query");
    expect(result).toEqual({
      project_count: 1,
      pipeline_count: 6
    });
  });

  it("maps inherit project strategy responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          status: true,
          rule_set_id: "project-strategy-2"
        };
      }
    });

    const result = await client.inheritProjectStrategy(
      createProjectInput({
        name: "Inherited Strategy",
        parent_id: "parent-strategy-1",
        rules: ["rule-1", "rule-2"],
        is_valid: true
      })
    );

    expect(requestedPath).toBe("/v2/project-1/rule-sets/inherit");
    expect(requestedBody).toEqual({
      name: "Inherited Strategy",
      parent_id: "parent-strategy-1",
      cloud_project_id: "project-1",
      rules: ["rule-1", "rule-2"],
      is_valid: true
    });
    expect(result).toEqual({
      status: true,
      rule_set_id: "project-strategy-2"
    });
  });

  it("maps switch project strategy responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      put: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          status: true,
          rule_set_id: "project-strategy-1"
        };
      }
    });

    const result = await client.switchProjectStrategy(
      createProjectRuleSetInput({
        is_valid: false
      })
    );

    expect(requestedPath).toBe("/v2/project-1/rule-sets/project-strategy-1/switch");
    expect(requestedBody).toEqual({
      is_valid: false
    });
    expect(result).toEqual({
      status: true,
      rule_set_id: "project-strategy-1"
    });
  });

  it("maps delete project strategy responses", async () => {
    let requestedPath = "";
    const client = createClient({
      delete: async (path: string) => {
        requestedPath = path;
        return {
          status: true
        };
      }
    });

    const result = await client.deleteProjectStrategy(createProjectRuleSetInput());

    expect(requestedPath).toBe("/v2/project-1/rule-sets/project-strategy-1/delete");
    expect(result).toEqual({
      status: true,
      rule_set_id: "project-strategy-1"
    });
  });

  it("maps project strategy detail responses", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          id: "project-strategy-1",
          name: "Project Strategy",
          type: "project",
          version: "1.0",
          operator: "yao",
          operate_time: 1_713_685_200_100,
          is_valid: true,
          level: "project",
          is_public: false,
          is_legacy: false
        };
      }
    });

    const result = await client.getProjectStrategyDetail(createProjectRuleSetInput());

    expect(requestedPath).toBe("/v2/project-1/rule-sets/project-strategy-1/detail");
    expect(result).toEqual({
      id: "project-strategy-1",
      name: "Project Strategy",
      type: "project",
      version: "1.0",
      operator: "yao",
      operate_time: 1_713_685_200_100,
      is_valid: true,
      level: "project",
      is_public: false,
      is_legacy: false
    });
  });

  it("maps update project strategy responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      put: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          status: true
        };
      }
    });

    const result = await client.updateProjectStrategy(
      createProjectRuleSetInput({
        name: "Project Strategy v2",
        rules: [{ id: "rule-2", is_valid: false }]
      })
    );

    expect(requestedPath).toBe("/v2/project-1/rule-sets/project-strategy-1/update");
    expect(requestedBody).toEqual({
      name: "Project Strategy v2",
      rules: [{ id: "rule-2", is_valid: false }]
    });
    expect(result).toEqual({
      status: true,
      rule_set_id: "project-strategy-1"
    });
  });

  it("maps create project strategy responses", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          status: true,
          rule_set_id: "project-strategy-3"
        };
      }
    });

    const result = await client.createProjectStrategy(
      createProjectInput({
        name: "Fresh Project Strategy",
        rules: [{ id: "rule-3", is_valid: true }]
      })
    );

    expect(requestedPath).toBe("/v2/project-1/rule-sets/create");
    expect(requestedBody).toEqual({
      name: "Fresh Project Strategy",
      cloud_project_id: "project-1",
      rules: [{ id: "rule-3", is_valid: true }]
    });
    expect(result).toEqual({
      status: true,
      rule_set_id: "project-strategy-3"
    });
  });

  it("supports pipeline_runs field when listing runs", async () => {
    const client = createClient({
      post: async () => ({
        pipeline_runs: [{ pipeline_run_id: "run-1", status: "COMPLETED", executor_name: "yao" }],
        total: 1
      })
    });

    const result = await client.listRuns(
      createProjectPipelinePageInput({
        project_id: "p-1"
      })
    );

    expect(result.records).toEqual([
      { pipeline_run_id: "run-1", status: "COMPLETED", executor_name: "yao" }
    ]);
    expect(result.total).toBe(1);
  });

  it("loads pipeline run summary from run detail endpoint", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          id: "run-1",
          status: "COMPLETED",
          executor_name: "yao",
          trigger_type: "Manual"
        };
      }
    });

    const result = await client.getRun(
      createProjectPipelineRunInput({
        project_id: "p-1"
      })
    );

    expect(requestedPath).toContain("/pipeline-runs/detail?pipeline_run_id=run-1");
    expect(result).toEqual({
      pipeline_run_id: "run-1",
      status: "COMPLETED",
      executor_name: "yao",
      trigger_type: "Manual"
    });
  });

  it("surfaces provider errors from getPipeline instead of returning an empty pipeline", async () => {
    const client = createClient({
      get: async () => ({
        error_code: "DEVPIPE.00011136",
        error_msg: "项目ID和流水线不匹配",
      })
    });

    await expect(
      client.getPipeline({ project_id: "wrong-project", pipeline_id: "pipe-1" })
    ).rejects.toMatchObject({
      code: "DEVPIPE.00011136",
      status: 400
    });
  });

  it("maps richer pipeline detail fields", async () => {
    const client = createClient({
      get: async () => ({
        id: "pipe-1",
        name: "release-main",
        description: "Release flow",
        manifest_version: "3.0",
        creator_name: "Bob",
        is_publish: true,
        project_id: "owner-project",
        project_name: "owner-name",
        detail_url: "https://example.com/detail",
        modify_url: "https://example.com/modify"
      })
    });

    const result = await client.getPipeline({ project_id: "p-1", pipeline_id: "pipe-1" });

    expect(result).toEqual({
      id: "pipe-1",
      name: "release-main",
      description: "Release flow",
      manifest_version: "3.0",
      creator_name: "Bob",
      is_publish: true,
      project_id: "owner-project",
      project_name: "owner-name",
      detail_url: "https://example.com/detail",
      modify_url: "https://example.com/modify"
    });
  });

  it("deletes a pipeline and clears the cached pipeline list", async () => {
    const post = vi.fn(async () => ({
      records: [{ pipeline_id: "pipe-1", name: "release-main" }],
      total: 1
    }));
    const del = vi.fn(async () => ({
      pipeline_id: "pipe-1"
    }));
    const client = createClient(
      {
        post,
        delete: del
      },
      {
        listCacheTtlMs: 30_000,
        now: () => 1_000
      }
    );

    await client.listPipelines(
      createListPipelinesInput({
        project_id: "project-1"
      })
    );
    const deleted = await client.deletePipeline(createProjectPipelineInput());
    await client.listPipelines(
      createListPipelinesInput({
        project_id: "project-1"
      })
    );

    expect(del).toHaveBeenCalledWith("/v5/project-1/api/pipelines/pipe-1");
    expect(post).toHaveBeenCalledTimes(2);
    expect(deleted).toEqual({
      pipeline_id: "pipe-1",
      deleted: true
    });
  });

  it("creates and updates pipelines, and supports batch delete and batch run", async () => {
    const post = vi
      .fn()
      .mockResolvedValueOnce({
        pipeline_id: "pipe-template-1",
        name: "Created From Template"
      })
      .mockResolvedValueOnce({
        pipeline_id: "pipe-new-1",
        name: "Created Directly"
      })
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({});
    const put = vi.fn(async () => ({ success: true }));
    const del = vi.fn(async () => ({}));
    const client = createClient({ post, put, delete: del });

    const createdFromTemplate = await client.createPipelineByTemplate({
      project_id: "project-1",
      template_id: "template-1",
      name: "Created From Template",
      description: "desc",
      group_id: "group-1"
    });
    const created = await client.createPipeline({
      project_id: "project-1",
      name: "Created Directly",
      description: "desc",
      manifest_version: "3.0"
    });
    const updated = await client.updatePipelineInfo({
      project_id: "project-1",
      pipeline_id: "pipe-new-1",
      name: "Updated Name",
      description: "updated",
      is_publish: true,
      manifest_version: "3.1"
    });
    const batchDeleted = await client.batchDeletePipelines({
      project_id: "project-1",
      pipeline_ids: ["pipe-a", "pipe-b"]
    });
    const batchRun = await client.batchRunPipelines({
      project_id: "project-1",
      pipeline_ids: ["pipe-a", "pipe-b"],
      branch: "main",
      description: "release"
    });

    expect(post).toHaveBeenNthCalledWith(1, "/v5/project-1/api/pipelines/template/template-1", {
      name: "Created From Template",
      description: "desc",
      group_id: "group-1"
    });
    expect(post).toHaveBeenNthCalledWith(2, "/v5/project-1/api/pipelines", {
      name: "Created Directly",
      description: "desc",
      manifest_version: "3.0"
    });
    expect(put).toHaveBeenCalledWith("/v5/project-1/api/pipelines/pipe-new-1", {
      name: "Updated Name",
      description: "updated",
      is_publish: true,
      manifest_version: "3.1"
    });
    expect(del).toHaveBeenCalledWith("/v5/project-1/api/pipelines/batch", {
      pipeline_ids: ["pipe-a", "pipe-b"]
    });
    expect(post).toHaveBeenNthCalledWith(3, "/v5/project-1/api/pipelines/batch-run", {
      pipeline_ids: ["pipe-a", "pipe-b"],
      description: "release",
      sources: [
        {
          type: "code",
          params: {
            build_params: {
              build_type: "branch",
              event_type: "Manual",
              target_branch: "main"
            }
          }
        }
      ]
    });
    expect(createdFromTemplate).toEqual({
      pipeline_id: "pipe-template-1",
      name: "Created From Template"
    });
    expect(created).toEqual({
      pipeline_id: "pipe-new-1",
      name: "Created Directly"
    });
    expect(updated).toEqual({
      pipeline_id: "pipe-new-1",
      success: true
    });
    expect(batchDeleted).toEqual({
      pipeline_ids: ["pipe-a", "pipe-b"],
      deleted: true
    });
    expect(batchRun).toEqual({
      pipeline_ids: ["pipe-a", "pipe-b"],
      success: true
    });
  });

  it("disables and enables a pipeline via ban and unban endpoints", async () => {
    const put = vi
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce({ success: true });
    const client = createClient({
      put
    });

    const disabled = await client.disablePipeline(createProjectPipelineInput());
    const enabled = await client.enablePipeline(createProjectPipelineInput());

    expect(put).toHaveBeenNthCalledWith(1, "/v5/project-1/api/pipelines/pipe-1/ban");
    expect(put).toHaveBeenNthCalledWith(2, "/v5/project-1/api/pipelines/pipe-1/unban");
    expect(disabled).toEqual({
      pipeline_id: "pipe-1",
      success: true
    });
    expect(enabled).toEqual({
      pipeline_id: "pipe-1",
      success: true
    });
  });

  it("lists pipeline groups as a tree", async () => {
    const client = createClient({
      get: async () => [
        createPipelineGroupRecord({
          id: "group-root",
          name: "Root",
          path_id: "group-root",
          children: [
            createPipelineGroupRecord({
              id: "group-child",
              name: "Child",
              parent_id: "group-root",
              path_id: "group-root.group-child"
            })
          ]
        })
      ]
    });

    const result = await client.listGroups(createProjectInput());

    expect(result.groups).toEqual([
      createPipelineGroupRecord({
        id: "group-root",
        name: "Root",
        path_id: "group-root",
        children: [
          createPipelineGroupRecord({
            id: "group-child",
            name: "Child",
            parent_id: "group-root",
            path_id: "group-root.group-child"
          })
        ]
      })
    ]);
  });

  it("creates, updates, deletes, and moves pipeline groups", async () => {
    const post = vi
      .fn()
      .mockResolvedValueOnce(
        createPipelineGroupRecord({
          parent_id: "root"
        })
      )
      .mockResolvedValueOnce({
        success: true
      })
      .mockResolvedValueOnce([
        {
          code: "success",
          ...createPipelineReference()
        }
      ]);
    const del = vi.fn(async () => ({
      success: true
    }));
    const client = createClient({
      post,
      delete: del
    });

    const created = await client.createGroup(createProjectInput({
      name: "Release",
      parent_id: "root"
    }));
    const updated = await client.updateGroup(createProjectInput({
      id: "group-1",
      name: "Release v2"
    }));
    const moved = await client.movePipelinesToGroup(createProjectInput({
      group_id: "group-1",
      pipelines: [createPipelineReference()]
    }));
    const deleted = await client.deleteGroup(createProjectInput({
      id: "group-1"
    }));

    expect(post).toHaveBeenNthCalledWith(1, "/v5/project-1/api/pipeline-group/create", {
      project_id: "project-1",
      name: "Release",
      parent_id: "root"
    });
    expect(post).toHaveBeenNthCalledWith(2, "/v5/project-1/api/pipeline-group/update", {
      id: "group-1",
      name: "Release v2"
    });
    expect(post).toHaveBeenNthCalledWith(
      3,
      "/v5/project-1/api/pipeline-group/pipeline/move",
      {
        group_id: "group-1",
        pipelines: [createPipelineReference()]
      }
    );
    expect(del).toHaveBeenCalledWith("/v5/project-1/api/pipeline-group/delete?id=group-1");
    expect(created).toEqual(
      createPipelineGroupRecord({
        parent_id: "root"
      })
    );
    expect(updated).toEqual({
      id: "group-1",
      success: true
    });
    expect(moved.results).toEqual([
      {
        code: "success",
        ...createPipelineReference()
      }
    ]);
    expect(deleted).toEqual({
      id: "group-1",
      success: true
    });
  });

  it("creates, updates, deletes, and binds pipeline variable groups", async () => {
    const post = vi
      .fn()
      .mockResolvedValueOnce(createPipelineVariableGroupRecord())
      .mockResolvedValueOnce({
        success: true
      });
    const put = vi.fn(async () => ({
      success: true
    }));
    const del = vi.fn(async () => ({
      success: true
    }));
    const client = createClient({
      post,
      put,
      delete: del
    });

    const created = await client.createVariableGroup(createProjectInput({
      name: "Release Vars",
      description: "shared release variables",
      variables: [createVariableGroupVariable()]
    }));
    const updated = await client.updateVariableGroup(createProjectInput({
      id: "vg-1",
      name: "Release Vars v2",
      description: "updated release variables",
      variables: [
        createVariableGroupVariable({
          value: "staging"
        })
      ]
    }));
    const bound = await client.bindVariableGroupsToPipeline(createProjectInput({
      pipeline_id: "pipe-1",
      pipeline_group_ids: ["vg-1", "vg-2"]
    }));
    const deleted = await client.deleteVariableGroup(createProjectInput({
      id: "vg-1"
    }));

    expect(post).toHaveBeenNthCalledWith(
      1,
      "/v5/project-1/api/pipeline/variable/group/create",
      {
        projectId: "project-1",
        name: "Release Vars",
        description: "shared release variables",
        variables: [createVariableGroupVariable()]
      }
    );
    expect(put).toHaveBeenCalledWith(
      "/v5/project-1/api/pipeline/variable/group/update",
      {
        projectId: "project-1",
        id: "vg-1",
        name: "Release Vars v2",
        description: "updated release variables",
        variables: [
          createVariableGroupVariable({
            value: "staging"
          })
        ]
      }
    );
    expect(post).toHaveBeenNthCalledWith(
      2,
      "/v5/project-1/api/pipeline/variable/group/relation",
      {
        pipeline_id: "pipe-1",
        pipeline_group_ids: ["vg-1", "vg-2"]
      }
    );
    expect(del).toHaveBeenCalledWith("/v5/project-1/api/pipeline/variable/group/delete?id=vg-1");
    expect(created).toEqual(createPipelineVariableGroupRecord());
    expect(updated).toEqual({
      id: "vg-1",
      success: true
    });
    expect(bound).toEqual({
      pipeline_id: "pipe-1",
      pipeline_group_ids: ["vg-1", "vg-2"],
      success: true
    });
    expect(deleted).toEqual({
      id: "vg-1",
      success: true
    });
  });

  it("gets and lists pipeline variable groups", async () => {
    const get = vi
      .fn()
      .mockResolvedValueOnce(
        createPipelineVariableGroupRecord({
          related_pipelines: [createPipelineReference()],
          creator_name: "yao"
        })
      )
      .mockResolvedValueOnce({
        pipeline_variable_groups: [
          {
            id: "vg-1",
            project_id: "project-1",
            name: "Release Vars"
          }
        ]
      });
    const post = vi.fn(async () => ({
      pipeline_variable_groups: [
        {
          id: "vg-1",
          project_id: "project-1",
          name: "Release Vars"
        }
      ],
      offset: 0,
      limit: 20,
      total: 1
    }));
    const client = createClient({
      get,
      post
    });

    const detail = await client.getVariableGroup(createProjectInput({ id: "vg-1" }));
    const byPipeline = await client.listPipelineVariableGroups(createProjectPipelineInput());
    const listed = await client.listVariableGroups(
      createProjectPageInput({
        name: "Release"
      })
    );

    expect(get).toHaveBeenNthCalledWith(1, "/v5/project-1/api/pipeline/variable/group/vg-1");
    expect(get).toHaveBeenNthCalledWith(
      2,
      "/v5/project-1/api/pipeline/variable/group/pipeline?pipelineId=pipe-1"
    );
    expect(post).toHaveBeenCalledWith("/v5/project-1/api/pipeline/variable/group/list", {
      offset: 0,
      limit: 20,
      name: "Release"
    });
    expect(detail).toEqual(
      createPipelineVariableGroupRecord({
        related_pipelines: [createPipelineReference()],
        creator_name: "yao"
      })
    );
    expect(byPipeline.groups).toEqual([
      {
        id: "vg-1",
        project_id: "project-1",
        name: "Release Vars"
      }
    ]);
    expect(listed).toEqual({
      groups: [
        {
          id: "vg-1",
          project_id: "project-1",
          name: "Release Vars"
        }
      ],
      offset: 0,
      limit: 20,
      total: 1
    });
  });

  it("lists and manages pipeline tags", async () => {
    const get = vi.fn().mockResolvedValueOnce([
      createPipelineTagRecord()
    ]);
    const post = vi
      .fn()
      .mockResolvedValueOnce({ success: true })
      .mockResolvedValueOnce({ success: true })
      .mockResolvedValueOnce({ success: true });
    const del = vi.fn().mockResolvedValueOnce({ success: true });
    const client = createClient({
      get,
      post,
      delete: del
    });

    const listed = await client.listTags(createProjectInput({ proj_id: "project-1" }));
    const created = await client.createTag(
      createProjectInput({
        name: "release",
        color: "#0b81f6"
      })
    );
    const updated = await client.updateTag(
      createProjectInput({
        tag_id: "tag-1",
        name: "release-v2",
        color: "#123456"
      })
    );
    const assigned = await client.setTagsForPipelines(
      createProjectInput({
        pipeline_ids: ["pipe-1", "pipe-2"],
        tag_ids: ["tag-1"]
      })
    );
    const deleted = await client.deleteTag(
      createProjectInput({
        tag_id: "tag-1"
      })
    );

    expect(get).toHaveBeenNthCalledWith(
      1,
      "/v5/project-1/api/pipeline-tag/list?proj_id=project-1"
    );
    expect(post).toHaveBeenNthCalledWith(1, "/v5/project-1/api/pipeline-tag/create", {
      name: "release",
      color: "#0b81f6"
    });
    expect(post).toHaveBeenNthCalledWith(2, "/v5/project-1/api/pipeline-tag/update", {
      name: "release-v2",
      color: "#123456",
      tagId: "tag-1"
    });
    expect(post).toHaveBeenNthCalledWith(3, "/v5/project-1/api/pipeline-tag/set-tags", {
      pipelineList: ["pipe-1", "pipe-2"],
      tagList: ["tag-1"]
    });
    expect(del).toHaveBeenNthCalledWith(
      1,
      "/v5/project-1/api/pipeline-tag/delete?tagId=tag-1"
    );
    expect(listed).toEqual({
      tags: [createPipelineTagRecord()],
      total: 1
    });
    expect(created).toEqual({
      success: true,
      project_id: "project-1",
      name: "release",
      color: "#0b81f6"
    });
    expect(updated).toEqual({
      success: true,
      project_id: "project-1",
      tag_id: "tag-1",
      name: "release-v2",
      color: "#123456"
    });
    expect(assigned).toEqual({
      success: true,
      project_id: "project-1",
      pipeline_ids: ["pipe-1", "pipe-2"],
      tag_ids: ["tag-1"]
    });
    expect(deleted).toEqual({
      success: true,
      project_id: "project-1",
      tag_id: "tag-1"
    });
  });

  it("gets and lists pipeline rules", async () => {
    const get = vi
      .fn()
      .mockResolvedValueOnce({
        id: "rule-1",
        name: "Build Gate",
        type: "Build",
        is_valid: true,
        version: "1.0",
        plugin_id: "plugin-1",
        plugin_name: "official_devcloud_cloudBuild",
        plugin_version: "0.0.15",
        creator: "yao",
        create_time: "2026-01-01T00:00:00Z",
        updater: "yao",
        update_time: "2026-01-02T00:00:00Z",
        content: [
          {
            group_name: "Group A",
            properties: [
              {
                key: "coverage",
                type: "judge",
                name: "Coverage",
                value: "0.8",
                value_type: "float"
              }
            ]
          }
        ]
      })
      .mockResolvedValueOnce({
        data: [
          {
            id: "rule-1",
            name: "Build Gate",
            type: "Build",
            version: "1.0",
            operator: "yao",
            operate_time: 1_700_000_000_000
          }
        ],
        total: 1
      })
      .mockResolvedValueOnce({
        rule_set_count: 2,
        project_count: 3,
        pipeline_count: 4
      })
      .mockResolvedValueOnce([{ typeKey: "Build", typeName: "Build" }]);
    const client = createClient({
      get
    });

    const detail = await client.getRule(createDomainRuleInput());
    const listed = await client.listRules(
      createDomainOffsetLimitCloudProjectInput({
        type: "Build",
        name: "Gate"
      })
    );
    const related = await client.getRuleRelatedInfo(createDomainRuleInput());
    const types = await client.listRuleTypes(createOrganizationInput());

    expect(get).toHaveBeenNthCalledWith(1, "/v2/domain-1/rules/rule-1/detail");
    expect(get).toHaveBeenNthCalledWith(
      2,
      "/v2/domain-1/rules/query?cloud_project_id=project-1&offset=0&limit=20&type=Build&name=Gate"
    );
    expect(get).toHaveBeenNthCalledWith(3, "/v2/domain-1/rules/rule-1/related/query");
    expect(get).toHaveBeenNthCalledWith(4, "/v2/org-1/types/query");
    expect(detail).toEqual({
      id: "rule-1",
      name: "Build Gate",
      type: "Build",
      is_valid: true,
      version: "1.0",
      plugin_id: "plugin-1",
      plugin_name: "official_devcloud_cloudBuild",
      plugin_version: "0.0.15",
      creator: "yao",
      create_time: "2026-01-01T00:00:00Z",
      updater: "yao",
      update_time: "2026-01-02T00:00:00Z",
      content: [
        {
          group_name: "Group A",
          properties: [
            {
              key: "coverage",
              type: "judge",
              name: "Coverage",
              value: "0.8",
              value_type: "float"
            }
          ]
        }
      ]
    });
    expect(listed).toEqual({
      data: [
        {
          id: "rule-1",
          name: "Build Gate",
          type: "Build",
          version: "1.0",
          operator: "yao",
          operate_time: 1_700_000_000_000
        }
      ],
      total: 1
    });
    expect(related).toEqual({
      rule_set_count: 2,
      project_count: 3,
      pipeline_count: 4
    });
    expect(types).toEqual({
      items: [{ typeKey: "Build", typeName: "Build" }]
    });
  });

  it("normalizes wrapped rule-type payloads", async () => {
    const get = vi
      .fn()
      .mockResolvedValueOnce({
        data: [{ typeKey: "Build", typeName: "Build" }]
      })
      .mockResolvedValueOnce({
        result: { typeKey: "Deploy", typeName: "Deploy" }
      });
    const client = createClient({
      get
    });

    const listedFromData = await client.listRuleTypes(createOrganizationInput());
    const listedFromResult = await client.listRuleTypes(createOrganizationInput());

    expect(get).toHaveBeenNthCalledWith(1, "/v2/org-1/types/query");
    expect(get).toHaveBeenNthCalledWith(2, "/v2/org-1/types/query");
    expect(listedFromData).toEqual({
      items: [{ typeKey: "Build", typeName: "Build" }]
    });
    expect(listedFromResult).toEqual({
      items: [{ typeKey: "Deploy", typeName: "Deploy" }]
    });
  });

  it("creates, updates, and deletes pipeline rules", async () => {
    const post = vi.fn(async () => ({
      status: true,
      rule_id: "rule-1"
    }));
    const put = vi.fn(async () => ({
      status: true,
      rule_id: "rule-1"
    }));
    const del = vi.fn(async () => ({
      status: true
    }));
    const client = createClient({
      post,
      put,
      delete: del
    });

    const created = await client.createRule(
      createDomainInput({
        name: "Build Gate",
        type: "Build",
        layout_content: "layout",
        plugin_id: "plugin-1",
        plugin_name: "official_devcloud_cloudBuild",
        plugin_version: "0.0.15",
        content: [createRuleContentGroup()]
      })
    );
    const updated = await client.updateRule(
      createDomainRuleInput({
        name: "Build Gate v2",
        type: "Build",
        plugin_id: "plugin-1",
        plugin_name: "official_devcloud_cloudBuild",
        plugin_version: "0.0.16",
        content: [
          createRuleContentGroup({
            properties: [
              createRuleConditionProperty({
                value: "0.9"
              })
            ]
          })
        ]
      })
    );
    const deleted = await client.deleteRule(createDomainRuleInput());

    expect(post).toHaveBeenCalledWith("/v2/domain-1/rules/create", {
      name: "Build Gate",
      type: "Build",
      layout_content: "layout",
      plugin_id: "plugin-1",
      plugin_name: "official_devcloud_cloudBuild",
      plugin_version: "0.0.15",
      content: [createRuleContentGroup()]
    });
    expect(put).toHaveBeenCalledWith("/v2/domain-1/rules/rule-1/update", {
      name: "Build Gate v2",
      type: "Build",
      plugin_id: "plugin-1",
      plugin_name: "official_devcloud_cloudBuild",
      plugin_version: "0.0.16",
      content: [
        createRuleContentGroup({
          properties: [
            createRuleConditionProperty({
              value: "0.9"
            })
          ]
        })
      ]
    });
    expect(del).toHaveBeenCalledWith("/v2/domain-1/rules/rule-1/delete");
    expect(created).toEqual({
      status: true,
      rule_id: "rule-1"
    });
    expect(updated).toEqual({
      status: true,
      rule_id: "rule-1"
    });
    expect(deleted).toEqual({
      status: true,
      rule_id: "rule-1"
    });
  });

  it("lists pipeline extension modules", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          status: "success",
          result: {
            "devcloud.open.endpoint": {
              data: [
                {
                  id: 1,
                  module_id: "module-1",
                  name: "Maven Repo",
                  description: "Maven repository connector",
                  location: "devcloud.open.endpoint",
                  type: "InnerEndpoint",
                  version: "1.0.0",
                  publisher: "Huawei",
                  base_url: "https://plugins.example.com",
                  tags: ["maven"],
                  url_relative: "plugins/maven/1.0.0",
                  manifest_version: "1"
                }
              ],
              total: 1
            }
          }
        };
      }
    });

    const result = await client.listExtensionModules(
      createProjectRegionModuleLimitInput({
        locations: ["devcloud.open.endpoint"],
        name: "Maven",
        product_line: "Pipeline",
        tags: ["maven"]
      })
    );

    expect(requestedPath).toContain("/v2/extensions/modules?");
    expect(requestedPath).toContain("locations=devcloud.open.endpoint");
    expect(requestedPath).toContain("project_uuid=project-1");
    expect(requestedPath).toContain("region_name=cn-north-4");
    expect(requestedPath).toContain("name=Maven");
    expect(requestedPath).toContain("productLine=Pipeline");
    expect(requestedPath).toContain("tags=maven");
    expect(requestedPath).toContain("offset=0");
    expect(requestedPath).toContain("limit=20");
    expect(result).toEqual({
      modules: [
        {
          id: 1,
          module_id: "module-1",
          name: "Maven Repo",
          description: "Maven repository connector",
          location: "devcloud.open.endpoint",
          type: "InnerEndpoint",
          version: "1.0.0",
          publisher: "Huawei",
          base_url: "https://plugins.example.com",
          tags: ["maven"],
          url_relative: "plugins/maven/1.0.0",
          manifest_version: "1"
        }
      ],
      total: 1
    });
  });

  it("gets pipeline extension module detail", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          status: "success",
          result: [
            {
              id: 1,
              module_id: "module-1",
              name: "Maven Repo",
              description: "Maven repository connector",
              location: "devcloud.open.endpoint",
              type: "InnerEndpoint",
              version: "1.0.0",
              publisher: "Huawei",
              base_url: "https://plugins.example.com",
              tags: ["maven"],
              url_relative: "plugins/maven/1.0.0",
              manifest_version: "1"
            }
          ]
        };
      }
    });

    const result = await client.getExtensionModule({
      module_id: "module-1"
    });

    expect(requestedPath).toBe("/v1/extensions/modules/module-1");
    expect(result).toEqual({
      modules: [
        {
          id: 1,
          module_id: "module-1",
          name: "Maven Repo",
          description: "Maven repository connector",
          location: "devcloud.open.endpoint",
          type: "InnerEndpoint",
          version: "1.0.0",
          publisher: "Huawei",
          base_url: "https://plugins.example.com",
          tags: ["maven"],
          url_relative: "plugins/maven/1.0.0",
          manifest_version: "1"
        }
      ]
    });
  });

  it("lists pipeline extension endpoints", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          status: "success",
          result: {
            endpoints: [
              {
                uuid: "endpoint-1",
                url: "https://repo.example.com",
                name: "Maven Central",
                project_uuid: "project-1",
                region_name: "cn-north-4",
                module_id: "module-1",
                data: {
                  repo: "central"
                },
                created_by: {
                  username: "yao",
                  user_id: "user-1"
                }
              }
            ],
            total: 1
          }
        };
      }
    });

    const result = await client.listExtensionEndpoints(createProjectRegionModuleLimitInput());

    expect(requestedPath).toContain("/v1/serviceconnection/endpoints?");
    expect(requestedPath).toContain("project_uuid=project-1");
    expect(requestedPath).toContain("region_name=cn-north-4");
    expect(requestedPath).toContain("module_id=module-1");
    expect(requestedPath).toContain("offset=0");
    expect(requestedPath).toContain("limit=20");
    expect(result).toEqual({
      endpoints: [
        {
          uuid: "endpoint-1",
          url: "https://repo.example.com",
          name: "Maven Central",
          project_uuid: "project-1",
          region_name: "cn-north-4",
          module_id: "module-1",
          data: {
            repo: "central"
          },
          created_by: {
            username: "yao",
            user_id: "user-1"
          }
        }
      ],
      total: 1
    });
  });

  it("creates pipeline extension endpoints", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          status: "success",
          result: {
            uuid: "endpoint-1",
            url: "https://repo.example.com",
            name: "Maven Central",
            projectUuid: "project-1",
            regionName: "cn-north-4",
            moduleId: "module-1",
            authorization: {
              scheme: "endpoint-auth-scheme-basic",
              parameters: {
                username: "yao"
              }
            },
            data: {
              repo: "central"
            },
            created_by: {
              username: "yao",
              user_id: "user-1"
            }
          }
        };
      }
    });

    const result = await client.createExtensionEndpoint(createExtensionEndpointInput());

    expect(requestedPath).toBe("/v1/serviceconnection/endpoints");
    expect(requestedBody).toEqual({
      project_uuid: "project-1",
      region_name: "cn-north-4",
      module_id: "module-1",
      name: "Maven Central",
      url: "https://repo.example.com",
      authorization: {
        scheme: "endpoint-auth-scheme-basic",
        parameters: {
          username: "yao"
        }
      },
      data: {
        repo: "central"
      }
    });
    expect(result).toEqual({
      uuid: "endpoint-1",
      url: "https://repo.example.com",
      name: "Maven Central",
      project_uuid: "project-1",
      region_name: "cn-north-4",
      module_id: "module-1",
      authorization: {
        scheme: "endpoint-auth-scheme-basic",
        parameters: {
          username: "yao"
        }
      },
      data: {
        repo: "central"
      },
      created_by: {
        username: "yao",
        user_id: "user-1"
      }
    });
  });

  it("updates pipeline extension endpoints", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      put: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          status: "success",
          result: {
            uuid: "endpoint-1",
            url: "https://repo.example.com/v2",
            name: "Maven Central v2",
            project_uuid: "project-1",
            region_name: "cn-north-4",
            module_id: "module-1",
            authorization: {
              scheme: "endpoint-auth-scheme-basic",
              parameters: {
                username: "alice"
              }
            },
            data: {
              repo: "central"
            },
            created_by: {
              username: "yao",
              user_id: "user-1"
            }
          }
        };
      }
    });

    const result = await client.updateExtensionEndpoint(
      createExtensionEndpointInput({
        uuid: "endpoint-1",
        name: "Maven Central v2",
        url: "https://repo.example.com/v2",
        authorization: {
          scheme: "endpoint-auth-scheme-basic",
          parameters: {
            username: "alice"
          }
        }
      })
    );

    expect(requestedPath).toBe("/v1/serviceconnection/endpoints/endpoint-1");
    expect(requestedBody).toEqual({
      project_uuid: "project-1",
      region_name: "cn-north-4",
      module_id: "module-1",
      name: "Maven Central v2",
      url: "https://repo.example.com/v2",
      authorization: {
        scheme: "endpoint-auth-scheme-basic",
        parameters: {
          username: "alice"
        }
      },
      data: {
        repo: "central"
      }
    });
    expect(result).toEqual({
      uuid: "endpoint-1",
      url: "https://repo.example.com/v2",
      name: "Maven Central v2",
      project_uuid: "project-1",
      region_name: "cn-north-4",
      module_id: "module-1",
      authorization: {
        scheme: "endpoint-auth-scheme-basic",
        parameters: {
          username: "alice"
        }
      },
      data: {
        repo: "central"
      },
      created_by: {
        username: "yao",
        user_id: "user-1"
      }
    });
  });

  it("gets pipeline extension endpoints", async () => {
    let requestedPath = "";
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          status: "success",
          result: {
            uuid: "endpoint-1",
            url: "https://repo.example.com",
            name: "Maven Central",
            project_uuid: "project-1",
            region_name: "cn-north-4",
            module_id: "module-1",
            authorization: {
              scheme: "endpoint-auth-scheme-basic",
              parameters: {
                username: "yao"
              }
            },
            data: {
              repo: "central"
            },
            created_by: {
              username: "yao",
              user_id: "user-1"
            }
          }
        };
      }
    });

    const result = await client.getExtensionEndpoint(createUuidInput());

    expect(requestedPath).toBe("/v1/serviceconnection/endpoints/endpoint-1");
    expect(result).toEqual({
      uuid: "endpoint-1",
      url: "https://repo.example.com",
      name: "Maven Central",
      project_uuid: "project-1",
      region_name: "cn-north-4",
      module_id: "module-1",
      authorization: {
        scheme: "endpoint-auth-scheme-basic",
        parameters: {
          username: "yao"
        }
      },
      data: {
        repo: "central"
      },
      created_by: {
        username: "yao",
        user_id: "user-1"
      }
    });
  });

  it("calls Pipeline product query endpoints", async () => {
    const calls: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createClient({
      get: async (path: string) => {
        calls.push({ method: "GET", path });
        if (path.includes("/oplog/query")) {
          return { result: { total: 1, data: [{ id: "log-1", operate: "create" }] } };
        }
        if (path.includes("/workitems/query")) {
          return [{ work_item_id: "70844211", title: "运营" }];
        }
        return { result: { records: [{ id: "item-1", name: "Item 1" }], total: 1 } };
      },
      post: async (path: string, body: unknown) => {
        calls.push({ method: "POST", path, body });
        if (path.endsWith("/change-request/create")) {
          return { result: { id: "cr-created", title: "Release CR", status: "developing" } };
        }
        return { records: [{ id: "item-1", name: "Item 1" }], total: 1 };
      },
      put: async (path: string, body?: unknown) => {
        calls.push({ method: "PUT", path, body });
        if (path.includes("/status/update")) {
          return { result: { id: "cr-1", title: "Release CR", status: "released" } };
        }
        if (path.endsWith("/workitem/update")) {
          return "success";
        }
        return { result: { status: "success" } };
      },
      delete: async (path: string) => {
        calls.push({ method: "DELETE", path });
        return "component-1";
      }
    });

    await client.batchGetPipelineStatus({
      project_id: "project-1",
      pipeline_ids: ["pipe-1"]
    });
    await client.getNoticeMessages({ project_id: "project-1", pipeline_id: "pipe-1" });
    await client.checkProject({ project_id: "project-1", type: "pipeline" });
    await client.checkComponent({
      project_id: "project-1",
      component_id: "component-1",
      query: { branch: "main" }
    });
    await client.listExecutionPlans({ project_id: "project-1", pipeline_id: "pipe-1" });
    await client.listReusableJobs({
      project_id: "project-1",
      offset: 0,
      limit: 20,
      keyword: "build"
    });
    await client.listDashboardPipelineCounts({
      tenant_id: "tenant-1",
      start_time: "2026-01-01",
      end_time: "2026-01-31"
    });
    await client.getDashboardExecutionsOverview({ tenant_id: "tenant-1" });
    await client.getDashboardConcurrency({ tenant_id: "tenant-1" });
    await client.listRelatedProjects({
      tenant_id: "tenant-1",
      page_index: 2,
      page_size: 10,
      search: "mall"
    });
    await client.getTenantVersionDetail({ tenant_id: "tenant-1" });
    await client.createChangeRequest({
      cloud_project_id: "project-1",
      component_id: "component-1",
      title: "Release CR",
      workitem_ids: ["70844211"],
      repos: [
        {
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          feature_branch: "feature/release",
          main_branch: "main",
          delete_branch_after_released: true
        }
      ]
    });
    await client.updateChangeRequestStatus({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      status: "released"
    });
    await client.listChangeRequests({
      cloud_project_id: "project-1",
      offset: 0,
      limit: 20,
      body: { status: "open" }
    });
    await client.listChangeRequestCreators({
      cloud_project_id: "project-1",
      component_id: "component-1",
      name: "yao"
    });
    await client.getChangeRequest({
      cloud_project_id: "project-1",
      change_request_id: "cr-1"
    });
    await client.listChangeRequestOperationLogs({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      offset: 0,
      limit: 20
    });
    await client.listChangeRequestWorkItems({
      cloud_project_id: "project-1",
      change_request_id: "cr-1"
    });
    await client.updateChangeRequestWorkItems({
      cloud_project_id: "project-1",
      change_request_id: "cr-1",
      work_item_ids: ["70844211", "70844212"]
    });
    await client.createComponent({
      cloud_project_id: "project-1",
      name: "mall-order",
      type: "microservice",
      desc: "order service",
      repos: [
        {
          type: "codehub",
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          branch: "master",
          language: "java"
        }
      ]
    });
    await client.listComponents({ cloud_project_id: "project-1", offset: 0, limit: 20 });
    await client.getComponent({ cloud_project_id: "project-1", component_id: "component-1" });
    await client.getComponentFollowStatus({ cloud_project_id: "project-1", component_id: "component-1" });
    await client.checkVariableGroupRights({ project_id: "project-1" });
    await client.followComponent({ cloud_project_id: "project-1", component_id: "component-1" });
    await client.unfollowComponent({ cloud_project_id: "project-1", component_id: "component-1" });
    await client.updateComponent({
      cloud_project_id: "project-1",
      component_id: "component-1",
      desc: "updated service"
    });
    await client.updateComponentRepos({
      cloud_project_id: "project-1",
      component_id: "component-1",
      repos: [
        {
          type: "codehub",
          repo_id: "repo-1",
          http_url: "https://example.com/repo.git",
          git_url: "git@example.com:repo.git",
          branch: "master",
          language: "java"
        }
      ]
    });
    await client.deleteComponent({ cloud_project_id: "project-1", component_id: "component-1" });
    await client.listPacActions({ domain_id: "domain-1", offset: 0, limit: 20 });
    await client.getPacAction({
      domain_id: "domain-1",
      pipeline_id: "pipe-1",
      pipeline_run_id: "run-1"
    });
    await client.getOauthAuthorizationUrl({ query: { redirect_uri: "https://example.com/cb" } });
    await client.getDevucAuth({ cloud_project_id: "project-1", query: { service: "pipeline" } });

    expect(calls).toEqual([
      {
        method: "POST",
        path: "/v5/project-1/api/pipelines/status",
        body: { pipeline_ids: ["pipe-1"] }
      },
      {
        method: "GET",
        path: "/v5/project-1/api/pipeline-notices/pipe-1/notice/message"
      },
      {
        method: "GET",
        path: "/v5/project-1/api/check-project/pipeline"
      },
      {
        method: "GET",
        path: "/v5/project-1/api/pipelines/component/check?branch=main&component_id=component-1"
      },
      {
        method: "GET",
        path: "/v5/project-1/api/pipelines/pipe-1/execution-plan/list"
      },
      {
        method: "POST",
        path: "/v5/project-1/api/reusable-jobs/list",
        body: { offset: 0, limit: 20, keyword: "build", name: "build" }
      },
      {
        method: "GET",
        path: "/v5/tenant-1/api/dashboard/pipeline-count?start_time=2026-01-01&end_time=2026-01-31"
      },
      {
        method: "GET",
        path: "/v5/tenant-1/api/dashboard/executions-overview"
      },
      {
        method: "GET",
        path: "/v5/tenant-1/api/dashboard/concurrency"
      },
      {
        method: "GET",
        path: "/v5/tenant-1/api/project/query-related-project?page_index=2&page_size=10&search=mall"
      },
      {
        method: "GET",
        path: "/v5/tenant-1/api/tenant-version/detail"
      },
      {
        method: "POST",
        path: "/v2/project-1/change-request/create",
        body: {
          component_id: "component-1",
          title: "Release CR",
          workitem_ids: ["70844211"],
          repos: [
            {
              repo_id: "repo-1",
              http_url: "https://example.com/repo.git",
              git_url: "git@example.com:repo.git",
              feature_branch: "feature/release",
              main_branch: "main",
              delete_branch_after_released: true
            }
          ]
        }
      },
      {
        method: "PUT",
        path: "/v2/project-1/change-request/cr-1/status/update?status=released",
        body: undefined
      },
      {
        method: "POST",
        path: "/v2/project-1/change-requests/search",
        body: { status: "open", offset: 0, limit: 20 }
      },
      {
        method: "GET",
        path: "/v2/project-1/change-request/creator/list/search?component_id=component-1&name=yao"
      },
      {
        method: "GET",
        path: "/v2/project-1/change-request/cr-1/query"
      },
      {
        method: "GET",
        path: "/v2/project-1/change-request/cr-1/oplog/query?offset=0&limit=20"
      },
      {
        method: "GET",
        path: "/v2/project-1/change-request/cr-1/workitems/query"
      },
      {
        method: "PUT",
        path: "/v2/project-1/change-request/cr-1/workitem/update",
        body: { work_item_ids: ["70844211", "70844212"] }
      },
      {
        method: "POST",
        path: "/v2/project-1/component/create",
        body: {
          name: "mall-order",
          type: "microservice",
          desc: "order service",
          repos: [
            {
              type: "codehub",
              repo_id: "repo-1",
              http_url: "https://example.com/repo.git",
              git_url: "git@example.com:repo.git",
              branch: "master",
              language: "java"
            }
          ]
        }
      },
      {
        method: "POST",
        path: "/v2/project-1/component/list/query",
        body: { offset: 0, limit: 20 }
      },
      {
        method: "GET",
        path: "/v2/project-1/component/component-1/query"
      },
      {
        method: "GET",
        path: "/v2/project-1/component/component-1/follow/query"
      },
      {
        method: "GET",
        path: "/v5/project-1/api/variable/group/check-rights"
      },
      {
        method: "PUT",
        path: "/v2/project-1/component/component-1/follow",
        body: undefined
      },
      {
        method: "PUT",
        path: "/v2/project-1/component/component-1/unfollow",
        body: undefined
      },
      {
        method: "PUT",
        path: "/v2/project-1/component/component-1/update",
        body: { desc: "updated service" }
      },
      {
        method: "PUT",
        path: "/v2/project-1/component/component-1/repo/update",
        body: [
          {
            type: "codehub",
            repo_id: "repo-1",
            http_url: "https://example.com/repo.git",
            git_url: "git@example.com:repo.git",
            branch: "master",
            language: "java"
          }
        ]
      },
      {
        method: "DELETE",
        path: "/v2/project-1/component/component-1/delete"
      },
      {
        method: "POST",
        path: "/v6/domain-1/api/pac/pipelines/actions/list",
        body: { offset: 0, limit: 20 }
      },
      {
        method: "GET",
        path: "/v6/domain-1/api/pac/pipelines/actions/pipe-1/run-1"
      },
      {
        method: "GET",
        path: "/v1/serviceconnection/oauth/authorization_url?redirect_uri=https%3A%2F%2Fexample.com%2Fcb"
      },
      {
        method: "GET",
        path: "/v2/project-1/cicd/devuc-auth/query?service=pipeline"
      }
    ]);
  });

  it("calls advanced Pipeline run endpoints", async () => {
    const calls: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createClient({
      get: async (path: string) => {
        calls.push({ method: "GET", path });
        if (path.endsWith("/jump-link")) {
          return { jumpLink: "https://example.com/jump" };
        }
        return {
          result: [{ id: "change-1", name: "CR-1" }]
        };
      },
      post: async (path: string, body?: unknown) => {
        calls.push({ method: "POST", path, body });
        if (path.endsWith("/rollback-run")) {
          return { pipeline_run_id: "rollback-run-1" };
        }
        if (path.endsWith("/batch-runs/result")) {
          return {
            result: [{ pipeline_id: "pipe-1", pipeline_run_id: "run-1", status: "success" }]
          };
        }
        return { pipeline_run_id: "run-1" };
      }
    });

    await client.cancelQueue({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      queue_id: 12
    });
    await client.getStepJumpLink({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      job_id: "job-1",
      step_id: "step-1"
    });
    await client.getRunChangeRequests({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      component_id: "component-1"
    });
    await client.rollbackRun({
      project_id: "project-1",
      pipeline_id: "pipe-1",
      run_id: "run-1",
      description: "rollback to last good",
      choose_jobs: ["job-1"]
    });
    await client.getBatchRunResult({
      project_id: "project-1",
      query: [{ pipeline_id: "pipe-1", pipeline_run_id: "run-1" }]
    });

    expect(calls).toEqual([
      {
        method: "POST",
        path: "/v5/project-1/api/pipelines/pipe-1/run-1/cancel-queuing/12",
        body: undefined
      },
      {
        method: "GET",
        path: "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/jobs/job-1/steps/step-1/jump-link"
      },
      {
        method: "GET",
        path: "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/query-change-requests?component_id=component-1"
      },
      {
        method: "POST",
        path: "/v5/project-1/api/pipelines/pipe-1/pipeline-runs/run-1/rollback-run",
        body: {
          description: "rollback to last good",
          choose_jobs: ["job-1"]
        }
      },
      {
        method: "POST",
        path: "/v5/project-1/api/pipelines/batch-runs/result",
        body: {
          query: [{ pipeline_id: "pipe-1", pipeline_run_id: "run-1" }]
        }
      }
    ]);
  });

  it("deletes pipeline extension endpoints", async () => {
    let requestedPath = "";
    const client = createClient({
      delete: async (path: string) => {
        requestedPath = path;
        return {
          status: "success"
        };
      }
    });

    const result = await client.deleteExtensionEndpoint(
      createProjectInput({
        uuid: "endpoint-1"
      })
    );

    expect(requestedPath).toBe("/v1/serviceconnection/endpoints/endpoint-1?project_uuid=project-1");
    expect(result).toEqual({
      uuid: "endpoint-1",
      success: true
    });
  });

  it("lists pipeline publishers with offset and limit", async () => {
    const get = vi.fn(async () => ({
      data: [
        {
          publisher_unique_id: "pub-1",
          name: "Huawei",
          en_name: "huawei",
          auth_status: "accept"
        }
      ],
      total: 1
    }));
    const client = createClient({
      get
    });

    const result = await client.listPublishers(createDomainOffsetLimitInput());

    expect(get).toHaveBeenCalledWith("/v1/domain-1/publisher/query-all?offset=0&limit=20");
    expect(result).toEqual({
      items: [
        {
          publisher_unique_id: "pub-1",
          name: "Huawei",
          en_name: "huawei",
          auth_status: "accept"
        }
      ],
      total: 1
    });
  });

  it("lists available pipeline publishers", async () => {
    const get = vi.fn(async () => ({
      data: [
        {
          publisher_unique_id: "pub-2",
          name: "Partner",
          auth_status: "pending"
        }
      ]
    }));
    const client = createClient({
      get
    });

    const result = await client.listAvailablePublishers(createDomainInput());

    expect(get).toHaveBeenCalledWith("/v1/domain-1/publisher/optional-publisher");
    expect(result).toEqual({
      items: [
        {
          publisher_unique_id: "pub-2",
          name: "Partner",
          auth_status: "pending"
        }
      ]
    });
  });

  it("lists stage plugins with post body filters", async () => {
    const post = vi.fn(async () => ({
      full_stage_plugins_item_list: [
        {
          stage_name: "Build",
          plugins_list: [
            {
              plugin_name: "build-plugin",
              display_name: "Build Plugin"
            }
          ]
        }
      ]
    }));
    const client = createClient({
      post
    });

    const result = await client.listStagePlugins({
      domain_id: "domain-1",
      use_condition: "pipeline",
      business_type: ["Build"],
      deploy_type: "image",
      comp_extend_type: "official"
    });

    expect(post).toHaveBeenCalledWith("/v1/domain-1/relation/stage-plugins", {
      use_condition: "pipeline",
      business_type: ["Build"],
      deploy_type: "image",
      comp_extend_type: "official"
    });
    expect(result).toEqual({
      items: [
        {
          stage_name: "Build",
          plugins_list: [
            {
              plugin_name: "build-plugin",
              display_name: "Build Plugin"
            }
          ]
        }
      ]
    });
  });

  it("lists base plugins from single endpoint", async () => {
    const get = vi.fn(async () => ({
      data: [
        {
          plugin_name: "base-plugin",
          display_name: "Base Plugin"
        }
      ]
    }));
    const client = createClient({
      get
    });

    const result = await client.listBasePlugins({
      domain_id: "domain-1"
    });

    expect(get).toHaveBeenCalledWith("/v1/domain-1/relation/plugin/single");
    expect(result).toEqual({
      items: [
        {
          plugin_name: "base-plugin",
          display_name: "Base Plugin"
        }
      ]
    });
  });

  it("lists base plugins from paged endpoint", async () => {
    const post = vi.fn(async () => ({
      data: [
        {
          plugin_name: "base-plugin",
          display_name: "Base Plugin"
        }
      ],
      total: 1
    }));
    const client = createClient({
      post
    });

    const result = await client.listBasePluginsPaged(createDomainOffsetLimitInput());

    expect(post).toHaveBeenCalledWith("/v1/domain-1/relation/plugins?offset=0&limit=20", {});
    expect(result).toEqual({
      items: [
        {
          plugin_name: "base-plugin",
          display_name: "Base Plugin"
        }
      ],
      total: 1
    });
  });

  it("lists agent plugins with filter body", async () => {
    const post = vi.fn(async () => ({
      data: [
        {
          unique_id: "plugin-1",
          plugin_name: "custom-plugin",
          display_name: "Custom Plugin"
        }
      ],
      total: 1
    }));
    const client = createClient({
      post
    });

    const result = await client.listPlugins(
      createDomainOffsetLimitInput({
        plugin_attribution: "custom",
        business_type: ["Build"],
        maintainer: "yao",
        plugin_name: "custom-plugin"
      })
    );

    expect(post).toHaveBeenCalledWith("/v1/domain-1/agent-plugin/query-all?offset=0&limit=20", {
      plugin_attribution: "custom",
      business_type: ["Build"],
      maintainer: "yao",
      plugin_name: "custom-plugin"
    });
    expect(result).toEqual({
      items: [
        {
          unique_id: "plugin-1",
          plugin_name: "custom-plugin",
          display_name: "Custom Plugin"
        }
      ],
      total: 1
    });
  });

  it("gets pipeline plugin inputs", async () => {
    const post = vi.fn(async () => ({
      data: [
        {
          name: "image",
          type: "string"
        }
      ]
    }));
    const client = createClient({
      post
    });

    const result = await client.getPluginInputs(createDomainPluginInput());

    expect(post).toHaveBeenCalledWith("/v1/domain-1/agent-plugin/plugin-input", {
      plugin_name: "custom-plugin",
      display_name: "Custom Plugin",
      version: "1.0.0",
      plugin_attribution: "custom"
    });
    expect(result).toEqual({
      items: [
        {
          name: "image",
          type: "string"
        }
      ]
    });
  });

  it("gets pipeline plugin outputs", async () => {
    const post = vi.fn(async () => ({
      data: [
        {
          name: "digest",
          type: "string"
        }
      ]
    }));
    const client = createClient({
      post
    });

    const result = await client.getPluginOutputs(createDomainPluginInput());

    expect(post).toHaveBeenCalledWith("/v1/domain-1/agent-plugin/plugin-output", {
      plugin_name: "custom-plugin",
      display_name: "Custom Plugin",
      version: "1.0.0",
      plugin_attribution: "custom"
    });
    expect(result).toEqual({
      items: [
        {
          name: "digest",
          type: "string"
        }
      ]
    });
  });

  it("lists plugin versions with query pagination", async () => {
    const get = vi.fn(async () => ({
      data: [
        {
          plugin_name: "custom-plugin",
          version: "1.0.0"
        }
      ],
      total: 1
    }));
    const client = createClient({
      get
    });

    const result = await client.listPluginVersions(createDomainPluginPageInput());

    expect(get).toHaveBeenCalledWith(
      "/v1/domain-1/agent-plugin/query?plugin_name=custom-plugin&offset=0&limit=20"
    );
    expect(result).toEqual({
      items: [
        {
          plugin_name: "custom-plugin",
          version: "1.0.0"
        }
      ],
      total: 1
    });
  });

  it("gets plugin version detail", async () => {
    const get = vi.fn(async () => ({
      plugin_name: "custom-plugin",
      display_name: "Custom Plugin",
      version: "1.0.0"
    }));
    const client = createClient({
      get
    });

    const result = await client.getPluginVersion(createDomainPluginVersionInput());

    expect(get).toHaveBeenCalledWith(
      "/v1/domain-1/agent-plugin/detail?plugin_name=custom-plugin&version=1.0.0"
    );
    expect(result).toEqual({
      item: {
        plugin_name: "custom-plugin",
        display_name: "Custom Plugin",
        version: "1.0.0"
      }
    });
  });

  it("uploads publisher icons to the documented multipart endpoint", async () => {
    let requestedPath = "";
    let uploadedFileName = "";
    let uploadedFileText = "";
    let uploadedContentType = "";
    const client = createClient({
      postMultipart: async (path: string, body: FormData) => {
        requestedPath = path;
        const file = body.get("upload_file");
        if (!(file instanceof File)) {
          throw new Error("expected multipart publisher icon");
        }

        uploadedFileName = file.name;
        uploadedFileText = await file.text();
        uploadedContentType = file.type;

        return "https://devops.example/icon.png";
      }
    });

    await expect(client.uploadPublisherIcon({
      domain_id: "domain-1",
      publisher_en_name: "demoPublisher",
      file_name: "icon.png",
      file_content: "png-bytes",
      content_type: "image/png"
    })).resolves.toEqual({
      url: "https://devops.example/icon.png",
      raw: "https://devops.example/icon.png"
    });

    expect(requestedPath).toBe(
      "/v1/domain-1/common/upload-publisher-icon?publisher_en_name=demoPublisher"
    );
    expect(uploadedFileName).toBe("icon.png");
    expect(uploadedFileText).toBe("png-bytes");
    expect(uploadedContentType).toBe("image/png");
  });

  it("unwraps wrapped plugin version detail payloads", async () => {
    const get = vi.fn(async () => ({
      data: {
        plugin_name: "custom-plugin",
        display_name: "Custom Plugin",
        version: "1.0.1"
      }
    }));
    const client = createClient({
      get
    });

    const result = await client.getPluginVersion(
      createDomainPluginVersionInput({
        version: "1.0.1"
      })
    );

    expect(get).toHaveBeenCalledWith(
      "/v1/domain-1/agent-plugin/detail?plugin_name=custom-plugin&version=1.0.1"
    );
    expect(result).toEqual({
      item: {
        plugin_name: "custom-plugin",
        display_name: "Custom Plugin",
        version: "1.0.1"
      }
    });
  });

  it("prefers run-variables endpoint for executed run parameters", async () => {
    const client = createClient({
      get: async () => [
        {
          name: "branch",
          value: "main",
          type: "string",
          is_runtime: "true"
        }
      ]
    });

    const result = await client.getRunParameters(
      createProjectPipelineRunInput({
        project_id: "p-1"
      })
    );

    expect(result.parameters).toEqual([
      {
        name: "branch",
        value: "main",
        value_type: "string",
        is_runtime: true
      }
    ]);
  });

  it("falls back to list-runtime-vars when run-variables is unavailable", async () => {
    const client = createClient({
      get: async (path: string) => {
        if (path.includes("/run-variables?mode=0")) {
          throw new Error("not supported");
        }

        return {
          variables: [{ name: "branch", value: "main", value_type: "string", is_runtime: true }]
        };
      }
    });

    const result = await client.getRunParameters(
      createProjectPipelineRunInput({
        project_id: "p-1"
      })
    );

    expect(result.parameters).toEqual([
      {
        name: "branch",
        value: "main",
        value_type: "string",
        is_runtime: true
      }
    ]);
  });
});
