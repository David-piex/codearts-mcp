# Pipeline Plugin Read Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 10 read-only Pipeline plugin MCP tools that align with official `4.7 扩展插件管理` APIs and keep tests, registration, and docs in sync.

**Architecture:** Extend the existing Pipeline product module in place. Implement the slice as four focused vertical groups: publisher queries, stage/base plugin discovery, plugin detail queries, and registration/docs sync. Reuse the current `client.ts + schemas.ts + tools/*.ts + register-pipeline-tools.ts` structure and keep all changes isolated from unrelated dirty files in the workspace.

**Tech Stack:** TypeScript, Zod, Vitest, MCP server product registration, Markdown docs, existing Pipeline tool mapping helpers

---

## File Structure

- Create: `D:\Code\codearts-mcp\docs\superpowers\plans\2026-04-21-pipeline-plugin-read-slice.md`
  This implementation plan.
- Modify: `D:\Code\codearts-mcp\docs\superpowers\specs\2026-04-21-pipeline-plugin-read-slice-design.md`
  Only if execution finds a real spec mismatch.
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
  Add 10 new client methods and response normalizers for plugin read APIs.
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\schemas.ts`
  Add new Zod input schemas for `domain_id`-based plugin read tools.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\plugin-shared.ts`
  Shared item normalizers for publisher, plugin, input/output, and version payloads.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-publishers.ts`
  MCP handler for `pipeline_list_publishers`.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-available-publishers.ts`
  MCP handler for `pipeline_list_available_publishers`.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-stage-plugins.ts`
  MCP handler for `pipeline_list_stage_plugins`.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-base-plugins.ts`
  MCP handler for `pipeline_list_base_plugins`.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-base-plugins-paged.ts`
  MCP handler for `pipeline_list_base_plugins_paged`.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-plugins.ts`
  MCP handler for `pipeline_list_plugins`.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-plugin-inputs.ts`
  MCP handler for `pipeline_get_plugin_inputs`.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-plugin-outputs.ts`
  MCP handler for `pipeline_get_plugin_outputs`.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-plugin-versions.ts`
  MCP handler for `pipeline_list_plugin_versions`.
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-plugin-version.ts`
  MCP handler for `pipeline_get_plugin_version`.
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\tools\index.ts`
  Export the 10 new tool names.
- Modify: `D:\Code\codearts-mcp\src\server\register-pipeline-tools.ts`
  Import handlers/schemas and register the new Pipeline tools.
- Modify: `D:\Code\codearts-mcp\src\server\module-stats-docs.ts`
  Ensure the generated stats surface picks up the higher Pipeline totals after sync.
- Modify: `D:\Code\codearts-mcp\tests\products\pipeline\client.test.ts`
  Add client tests for official URIs, query/body shaping, and response normalization.
- Create: `D:\Code\codearts-mcp\tests\products\pipeline\tools\query-plugin-read-slice.test.ts`
  Add handler mapping tests for the 10 new tools.
- Modify: `D:\Code\codearts-mcp\tests\server\register-pipeline-tools.test.ts`
  Verify new Pipeline tools register in HTTP and/or stdio mode.
- Modify: `D:\Code\codearts-mcp\tests\server\register-tools.test.ts`
  Keep the global server registration list aligned.
- Modify: `D:\Code\codearts-mcp\tests\server\create-server-tools.test.ts`
  Verify the overall tool registry contains the new names.
- Modify: `D:\Code\codearts-mcp\tests\server\module-stats.test.ts`
  Update expected Pipeline and product totals.
- Modify: `D:\Code\codearts-mcp\tests\server\module-stats-docs.test.ts`
  Keep the generated stats docs assertions aligned.
- Modify: `D:\Code\codearts-mcp\tests\e2e\tool-contracts.test.ts`
  Update the contract tool count from `207` to `217`.
- Modify: `D:\Code\codearts-mcp\docs\wiki\Official-Endpoint-Mapping-Req-Repo-Pipeline.md`
  Mark the 10 official `4.7` read APIs as implemented.
- Modify: `D:\Code\codearts-mcp\docs\wiki\Official-Category-Coverage-Matrix.md`
  Mark Pipeline plugin-read coverage as complete for this slice.
- Modify generated docs as needed: `D:\Code\codearts-mcp\README.md`, `D:\Code\codearts-mcp\docs\wiki\Capability-Matrix.md`, `D:\Code\codearts-mcp\docs\wiki\Current-Implementation-Status-2026-04-17.md`, `D:\Code\codearts-mcp\docs\wiki\Tool-Status-Matrix.md`
  Only through `npm run stats:sync-docs`.

### Task 1: Add Publisher Query Coverage First

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\schemas.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\plugin-shared.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-publishers.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-available-publishers.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\pipeline\client.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\pipeline\tools\query-plugin-read-slice.test.ts`

- [ ] **Step 1: Write the failing publisher tests**

Add these test blocks to the client and tool tests:

```ts
it("lists pipeline publishers with offset and limit", async () => {
  const get = vi.fn().mockResolvedValue({
    data: [
      {
        publisher_unique_id: "pub-1",
        name: "Huawei",
        en_name: "huawei",
        auth_status: "accept"
      }
    ],
    total: 1
  });
  const client = createPipelineClient({ get, post: vi.fn(), put: vi.fn(), delete: vi.fn() } as never);

  const result = await client.listPublishers({
    domain_id: "domain-1",
    offset: 0,
    limit: 20
  });

  expect(get).toHaveBeenCalledWith(
    "/v1/domain-1/publisher/query-all?offset=0&limit=20"
  );
  expect(result.items[0]).toMatchObject({
    publisher_unique_id: "pub-1",
    name: "Huawei"
  });
});

it("maps pipeline publisher list output", async () => {
  const handler = createPipelineListPublishersHandler({
    listPublishers: vi.fn().mockResolvedValue({
      items: [{ publisher_unique_id: "pub-1", name: "Huawei" }],
      total: 1
    })
  });

  const result = await handler({
    domain_id: "domain-1",
    offset: 0,
    limit: 20
  });

  expect(result.structuredContent.page_info).toEqual({
    page: 1,
    pageSize: 20,
    total: 1
  });
});
```

- [ ] **Step 2: Run the publisher-focused tests to verify they fail**

Run:

```powershell
npx vitest run tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts -t publisher
```

Expected: FAIL because `listPublishers`, `listAvailablePublishers`, and their handlers do not exist yet.

- [ ] **Step 3: Add the minimal schemas, client methods, and shared normalizer**

Implement the publisher input schemas and client surface:

```ts
export const pipelineListPublishersInput = z.object({
  domain_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20)
});

export const pipelineListAvailablePublishersInput = z.object({
  domain_id: idSchema
});

type PipelinePluginPublisher = {
  publisher_unique_id?: string;
  name?: string;
  en_name?: string;
  auth_status?: string;
  description?: string;
  logo_url?: string;
};

async listPublishers(input) {
  const query = new URLSearchParams({
    offset: String(input.offset),
    limit: String(input.limit)
  });
  const response = unwrapPipelinePayload((await _http.get(
    `/v1/${encodeURIComponent(input.domain_id)}/publisher/query-all?${query.toString()}`
  )) as { data?: PipelinePluginPublisher[]; total?: number });

  return {
    items: response.data ?? [],
    total: response.total ?? response.data?.length ?? 0
  };
}

async listAvailablePublishers(input) {
  const response = unwrapPipelinePayload((await _http.get(
    `/v1/${encodeURIComponent(input.domain_id)}/publisher/optional-publisher`
  )) as { data?: PipelinePluginPublisher[] });

  return {
    items: response.data ?? []
  };
}
```

- [ ] **Step 4: Add the minimal publisher handlers**

Create the two handler files with `asListResult` output:

```ts
export function createPipelineListPublishersHandler(client: {
  listPublishers: (input: { domain_id: string; offset: number; limit: number }) => Promise<{
    items: PipelinePluginPublisher[];
    total: number;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineListPublishersInput.parse(input);
    const response = await client.listPublishers(parsed);
    const result = asListResult(
      `Loaded ${response.items.length} pipeline publishers`,
      response.items.map(normalizePipelinePluginPublisher),
      {
        page: Math.floor(parsed.offset / parsed.limit) + 1,
        pageSize: parsed.limit,
        total: response.total
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
```

- [ ] **Step 5: Run the publisher-focused tests again**

Run:

```powershell
npx vitest run tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts -t publisher
```

Expected: PASS for publisher list and available-publisher coverage.

- [ ] **Step 6: Commit only the publisher slice**

Run:

```powershell
git add src/products/pipeline/client.ts src/products/pipeline/schemas.ts src/products/pipeline/tools/plugin-shared.ts src/products/pipeline/tools/list-publishers.ts src/products/pipeline/tools/list-available-publishers.ts tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts
git commit -m "feat(pipeline): add plugin publisher read tools"
```

### Task 2: Add Stage And Base Plugin Discovery

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\schemas.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\tools\plugin-shared.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-stage-plugins.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-base-plugins.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-base-plugins-paged.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\pipeline\client.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\pipeline\tools\query-plugin-read-slice.test.ts`

- [ ] **Step 1: Write the failing discovery tests**

Add explicit tests for the two official base-plugin APIs and the stage-plugin API:

```ts
it("lists stage plugins with a post body", async () => {
  const post = vi.fn().mockResolvedValue({
    full_stage_plugins_item_list: [
      {
        plugins_list: [{ plugin_name: "deploy-plugin", display_name: "Deploy Plugin" }]
      }
    ]
  });
  const client = createPipelineClient({ get: vi.fn(), post, put: vi.fn(), delete: vi.fn() } as never);

  const result = await client.listStagePlugins({
    domain_id: "domain-1",
    use_condition: "pipeline"
  });

  expect(post).toHaveBeenCalledWith("/v1/domain-1/relation/stage-plugins", {
    use_condition: "pipeline"
  });
  expect(result.items).toHaveLength(1);
});

it("lists base plugins through the paged post endpoint", async () => {
  const post = vi.fn().mockResolvedValue({
    data: [{ plugin_name: "base-plugin", display_name: "Base Plugin" }],
    total: 1
  });
  const client = createPipelineClient({ get: vi.fn(), post, put: vi.fn(), delete: vi.fn() } as never);

  const result = await client.listBasePluginsPaged({
    domain_id: "domain-1",
    offset: 0,
    limit: 20
  });

  expect(post).toHaveBeenCalledWith("/v1/domain-1/relation/plugins?offset=0&limit=20", {});
  expect(result.total).toBe(1);
});
```

- [ ] **Step 2: Run discovery tests to verify they fail**

Run:

```powershell
npx vitest run tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts -t "stage|base plugin"
```

Expected: FAIL because the stage/base plugin client methods and handlers do not exist yet.

- [ ] **Step 3: Implement the discovery schemas and client methods**

Add the input schemas and HTTP calls:

```ts
export const pipelineListStagePluginsInput = z.object({
  domain_id: idSchema,
  use_condition: z.string().min(1),
  business_type: z.array(z.enum(["Build", "Gate", "Deploy", "Test", "Normal"])).optional(),
  deploy_type: z.string().min(1).optional(),
  comp_extend_type: z.string().min(1).optional()
});

export const pipelineListBasePluginsInput = z.object({
  domain_id: idSchema
});

export const pipelineListBasePluginsPagedInput = z.object({
  domain_id: idSchema,
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20)
});

async listStagePlugins(input) {
  const response = unwrapPipelinePayload((await _http.post(
    `/v1/${encodeURIComponent(input.domain_id)}/relation/stage-plugins`,
    {
      use_condition: input.use_condition,
      ...(input.business_type ? { business_type: input.business_type } : {}),
      ...(input.deploy_type ? { deploy_type: input.deploy_type } : {}),
      ...(input.comp_extend_type ? { comp_extend_type: input.comp_extend_type } : {})
    }
  )) as { full_stage_plugins_item_list?: unknown[] });

  return {
    items: response.full_stage_plugins_item_list ?? []
  };
}

async listBasePlugins(input) {
  const response = unwrapPipelinePayload((await _http.get(
    `/v1/${encodeURIComponent(input.domain_id)}/relation/plugin/single`
  )) as { data?: unknown[] });

  return {
    items: response.data ?? []
  };
}
```

- [ ] **Step 4: Implement the three discovery handlers**

Add list handlers that keep GET and POST base-plugin queries separate:

```ts
export function createPipelineListBasePluginsPagedHandler(client: {
  listBasePluginsPaged: (input: { domain_id: string; offset: number; limit: number }) => Promise<{
    items: PipelineBasePlugin[];
    total: number;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineListBasePluginsPagedInput.parse(input);
    const response = await client.listBasePluginsPaged(parsed);
    const result = asListResult(
      `Loaded ${response.items.length} pipeline base plugins`,
      response.items.map(normalizePipelineBasePlugin),
      {
        page: Math.floor(parsed.offset / parsed.limit) + 1,
        pageSize: parsed.limit,
        total: response.total
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
```

- [ ] **Step 5: Run the discovery tests again**

Run:

```powershell
npx vitest run tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts -t "stage|base plugin"
```

Expected: PASS, with separate coverage for `ListStagePlugins`, `ListBasePlugins`, and `ListBasePluginsNewPost`.

- [ ] **Step 6: Commit only the discovery slice**

Run:

```powershell
git add src/products/pipeline/client.ts src/products/pipeline/schemas.ts src/products/pipeline/tools/plugin-shared.ts src/products/pipeline/tools/list-stage-plugins.ts src/products/pipeline/tools/list-base-plugins.ts src/products/pipeline/tools/list-base-plugins-paged.ts tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts
git commit -m "feat(pipeline): add plugin discovery read tools"
```

### Task 3: Add Custom Plugin Query And Input/Output Detail Tools

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\schemas.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\tools\plugin-shared.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-plugins.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-plugin-inputs.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-plugin-outputs.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\pipeline\client.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\pipeline\tools\query-plugin-read-slice.test.ts`

- [ ] **Step 1: Write the failing custom-plugin tests**

Add explicit coverage for `ListPlugins`, `ShowPluginInputs`, and `ShowPluginOutputs`:

```ts
it("lists custom plugins with attribution and business types", async () => {
  const post = vi.fn().mockResolvedValue({
    data: [{ plugin_name: "custom-plugin", display_name: "Custom Plugin", unique_id: "plugin-1" }]
  });
  const client = createPipelineClient({ get: vi.fn(), post, put: vi.fn(), delete: vi.fn() } as never);

  const result = await client.listPlugins({
    domain_id: "domain-1",
    plugin_attribution: "custom",
    business_type: ["Build"]
  });

  expect(post).toHaveBeenCalledWith("/v1/domain-1/agent-plugin/query-all", {
    plugin_attribution: "custom",
    business_type: ["Build"]
  });
  expect(result.items[0]).toMatchObject({ unique_id: "plugin-1" });
});

it("gets plugin inputs and outputs", async () => {
  const post = vi.fn()
    .mockResolvedValueOnce({ data: [{ name: "image", type: "string" }] })
    .mockResolvedValueOnce({ data: [{ name: "digest", type: "string" }] });
  const client = createPipelineClient({ get: vi.fn(), post, put: vi.fn(), delete: vi.fn() } as never);

  const inputs = await client.getPluginInputs({
    domain_id: "domain-1",
    plugin_name: "custom-plugin",
    display_name: "Custom Plugin",
    version: "1.0.0",
    plugin_attribution: "custom"
  });
  const outputs = await client.getPluginOutputs({
    domain_id: "domain-1",
    plugin_name: "custom-plugin",
    display_name: "Custom Plugin",
    version: "1.0.0",
    plugin_attribution: "custom"
  });

  expect(inputs.items[0]).toMatchObject({ name: "image" });
  expect(outputs.items[0]).toMatchObject({ name: "digest" });
});
```

- [ ] **Step 2: Run the custom-plugin tests to verify they fail**

Run:

```powershell
npx vitest run tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts -t "custom plugin|inputs and outputs"
```

Expected: FAIL because the client methods, schemas, and handlers do not exist yet.

- [ ] **Step 3: Implement the custom-plugin schemas and client methods**

Add the inputs for list/detail calls:

```ts
const pipelinePluginAttributionSchema = z.enum(["custom", "official"]);
const pipelinePluginBusinessTypeSchema = z.enum(["Build", "Gate", "Deploy", "Test", "Normal"]);

export const pipelineListPluginsInput = z.object({
  domain_id: idSchema,
  plugin_attribution: pipelinePluginAttributionSchema.optional(),
  business_type: z.array(pipelinePluginBusinessTypeSchema).optional(),
  maintainer: z.string().optional(),
  plugin_name: z.string().optional()
});

export const pipelineGetPluginPartsInput = z.object({
  domain_id: idSchema,
  plugin_name: z.string().min(1),
  display_name: z.string().min(1),
  version: z.string().min(1),
  plugin_attribution: pipelinePluginAttributionSchema
});

async getPluginInputs(input) {
  const response = unwrapPipelinePayload((await _http.post(
    `/v1/${encodeURIComponent(input.domain_id)}/agent-plugin/plugin-input`,
    input
  )) as { data?: unknown[] });

  return { items: response.data ?? [] };
}
```

- [ ] **Step 4: Implement the three handlers**

Create list/detail handlers using the shared normalizers:

```ts
export function createPipelineGetPluginInputsHandler(client: {
  getPluginInputs: (input: PipelinePluginPartQueryInput) => Promise<{ items: PipelinePluginPart[] }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineGetPluginPartsInput.parse(input);
    const response = await client.getPluginInputs(parsed);
    const item = {
      pluginName: parsed.plugin_name,
      displayName: parsed.display_name,
      version: parsed.version,
      pluginAttribution: parsed.plugin_attribution,
      items: response.items.map(normalizePipelinePluginPart)
    };

    return {
      content: [{ type: "text" as const, text: `Loaded ${item.items.length} plugin input fields` }],
      structuredContent: { item }
    };
  };
}
```

- [ ] **Step 5: Run the custom-plugin tests again**

Run:

```powershell
npx vitest run tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts -t "custom plugin|inputs and outputs"
```

Expected: PASS for custom plugin listing and plugin input/output detail mapping.

- [ ] **Step 6: Commit only the custom-plugin slice**

Run:

```powershell
git add src/products/pipeline/client.ts src/products/pipeline/schemas.ts src/products/pipeline/tools/plugin-shared.ts src/products/pipeline/tools/list-plugins.ts src/products/pipeline/tools/get-plugin-inputs.ts src/products/pipeline/tools/get-plugin-outputs.ts tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts
git commit -m "feat(pipeline): add plugin detail read tools"
```

### Task 4: Add Plugin Version List And Version Detail

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\schemas.ts`
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\tools\plugin-shared.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\list-plugin-versions.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\get-plugin-version.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\pipeline\client.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\products\pipeline\tools\query-plugin-read-slice.test.ts`

- [ ] **Step 1: Write the failing version tests**

Add explicit tests for `ListPLuginVersion` and `ShowPluginVersion`:

```ts
it("lists plugin versions with query pagination", async () => {
  const get = vi.fn().mockResolvedValue({
    data: [{ version: "1.0.0", plugin_name: "custom-plugin" }],
    total: 1
  });
  const client = createPipelineClient({ get, post: vi.fn(), put: vi.fn(), delete: vi.fn() } as never);

  const result = await client.listPluginVersions({
    domain_id: "domain-1",
    plugin_name: "custom-plugin",
    offset: 0,
    limit: 20
  });

  expect(get).toHaveBeenCalledWith(
    "/v1/domain-1/agent-plugin/query?plugin_name=custom-plugin&offset=0&limit=20"
  );
  expect(result.total).toBe(1);
});

it("gets a plugin version detail", async () => {
  const get = vi.fn().mockResolvedValue({
    plugin_name: "custom-plugin",
    display_name: "Custom Plugin",
    version: "1.0.0"
  });
  const client = createPipelineClient({ get, post: vi.fn(), put: vi.fn(), delete: vi.fn() } as never);

  const result = await client.getPluginVersion({
    domain_id: "domain-1",
    plugin_name: "custom-plugin",
    version: "1.0.0"
  });

  expect(get).toHaveBeenCalledWith(
    "/v1/domain-1/agent-plugin/detail?plugin_name=custom-plugin&version=1.0.0"
  );
  expect(result.item).toMatchObject({ version: "1.0.0" });
});
```

- [ ] **Step 2: Run the version tests to verify they fail**

Run:

```powershell
npx vitest run tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts -t version
```

Expected: FAIL because the version query client methods and handlers do not exist yet.

- [ ] **Step 3: Implement the version schemas and client methods**

Add the version schemas and GET query methods:

```ts
export const pipelineListPluginVersionsInput = z.object({
  domain_id: idSchema,
  plugin_name: z.string().min(1),
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(100).default(20)
});

export const pipelineGetPluginVersionInput = z.object({
  domain_id: idSchema,
  plugin_name: z.string().min(1),
  version: z.string().min(1)
});

async listPluginVersions(input) {
  const query = new URLSearchParams({
    plugin_name: input.plugin_name,
    offset: String(input.offset),
    limit: String(input.limit)
  });
  const response = unwrapPipelinePayload((await _http.get(
    `/v1/${encodeURIComponent(input.domain_id)}/agent-plugin/query?${query.toString()}`
  )) as { data?: unknown[]; total?: number });

  return {
    items: response.data ?? [],
    total: response.total ?? response.data?.length ?? 0
  };
}
```

- [ ] **Step 4: Implement the version handlers**

Create the two handlers:

```ts
export function createPipelineGetPluginVersionHandler(client: {
  getPluginVersion: (input: { domain_id: string; plugin_name: string; version: string }) => Promise<{
    item: PipelinePluginVersionDetail;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = pipelineGetPluginVersionInput.parse(input);
    const response = await client.getPluginVersion(parsed);

    return {
      content: [{ type: "text" as const, text: `Loaded plugin version ${parsed.version}` }],
      structuredContent: {
        item: normalizePipelinePluginVersionDetail(response.item)
      }
    };
  };
}
```

- [ ] **Step 5: Run the version tests again**

Run:

```powershell
npx vitest run tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts -t version
```

Expected: PASS for version-list and version-detail coverage.

- [ ] **Step 6: Commit only the version slice**

Run:

```powershell
git add src/products/pipeline/client.ts src/products/pipeline/schemas.ts src/products/pipeline/tools/plugin-shared.ts src/products/pipeline/tools/list-plugin-versions.ts src/products/pipeline/tools/get-plugin-version.ts tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts
git commit -m "feat(pipeline): add plugin version read tools"
```

### Task 5: Register The New Tools And Update Server Contracts

**Files:**
- Modify: `D:\Code\codearts-mcp\src\products\pipeline\tools\index.ts`
- Modify: `D:\Code\codearts-mcp\src\server\register-pipeline-tools.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\register-pipeline-tools.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\register-tools.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\create-server-tools.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\module-stats.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\module-stats-docs.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\e2e\tool-contracts.test.ts`

- [ ] **Step 1: Write the failing registration and totals tests**

Add the new names and updated totals:

```ts
it("registers a pipeline plugin read tool in http mode", () => {
  const registerTool = vi.fn();

  const handled = registerPipelineTool({
    toolName: "pipeline_list_publishers",
    server: { registerTool },
    mode: "http",
    sessionStore: createSessionCredentialStore()
  });

  expect(handled).toBe(true);
  expect(registerTool).toHaveBeenCalledWith(
    "pipeline_list_publishers",
    expect.objectContaining({
      title: "pipeline_list_publishers",
      description: "List CodeArts Pipeline publishers"
    }),
    expect.any(Function)
  );
});

expect(collectModuleStats()).toEqual([
  { module: "Pipeline", total: 77, read: 42, write: 35 }
]);

expect(collectToolNames()).toHaveLength(217);
```

- [ ] **Step 2: Run the server tests to verify they fail**

Run:

```powershell
npx vitest run tests/server/register-pipeline-tools.test.ts tests/server/register-tools.test.ts tests/server/create-server-tools.test.ts tests/server/module-stats.test.ts tests/server/module-stats-docs.test.ts tests/e2e/tool-contracts.test.ts
```

Expected: FAIL because the new tools are not exported or registered yet and the counts are still `207`.

- [ ] **Step 3: Export and register the new tool definitions**

Update the Pipeline tool registry:

```ts
export const pipelineToolNames = [
  "pipeline_list_publishers",
  "pipeline_list_available_publishers",
  "pipeline_list_stage_plugins",
  "pipeline_list_base_plugins",
  "pipeline_list_base_plugins_paged",
  "pipeline_list_plugins",
  "pipeline_get_plugin_inputs",
  "pipeline_get_plugin_outputs",
  "pipeline_list_plugin_versions",
  "pipeline_get_plugin_version",
  // existing names continue here
] as const;

const pipelineToolDefinitions = {
  "pipeline_list_publishers": defineProductTool({
    description: "List CodeArts Pipeline publishers",
    inputSchema: pipelineListPublishersInput,
    selectHttpClient: (clients) => clients.pipelineClient,
    createProductHandler: createPipelineListPublishersHandler
  }),
  "pipeline_get_plugin_version": defineProductTool({
    description: "Get CodeArts Pipeline plugin version detail",
    inputSchema: pipelineGetPluginVersionInput,
    selectHttpClient: (clients) => clients.pipelineClient,
    createProductHandler: createPipelineGetPluginVersionHandler
  })
} as const;
```

- [ ] **Step 4: Update the global server tests and expected totals**

Edit the assertions to match the new tool surface:

```ts
expect(collectModuleStats()).toEqual([
  { module: "Req", total: 8, read: 6, write: 2 },
  { module: "Repo", total: 24, read: 17, write: 7 },
  { module: "Pipeline", total: 77, read: 42, write: 35 },
  { module: "Check", total: 8, read: 5, write: 3 },
  { module: "TestPlan", total: 7, read: 6, write: 1 },
  { module: "Deploy", total: 59, read: 44, write: 15 },
  { module: "Build", total: 22, read: 14, write: 8 },
  { module: "Artifact", total: 12, read: 11, write: 1 }
]);

expect(collectProductToolStats()).toEqual({
  modules: 8,
  total: 217,
  read: 145,
  write: 72
});

expect(renderModuleStatsMarkdown()).toContain("- Product tools: `217`");
expect(renderModuleStatsMarkdown()).toContain("- Shared HTTP total with auth tools: `219`");

expect(JSON.parse(renderModuleStatsReportJson())).toEqual(
  expect.objectContaining({
    totals: expect.objectContaining({
      total: 217,
      read: 145,
      write: 72,
      httpTotalWithAuth: 219
    })
  })
);
```

- [ ] **Step 5: Run the server tests again**

Run:

```powershell
npx vitest run tests/server/register-pipeline-tools.test.ts tests/server/register-tools.test.ts tests/server/create-server-tools.test.ts tests/server/module-stats.test.ts tests/server/module-stats-docs.test.ts tests/e2e/tool-contracts.test.ts
```

Expected: PASS, proving the 10 new tools are exported, registered, and counted.

- [ ] **Step 6: Commit only the registry and contract updates**

Run:

```powershell
git add src/products/pipeline/tools/index.ts src/server/register-pipeline-tools.ts tests/server/register-pipeline-tools.test.ts tests/server/register-tools.test.ts tests/server/create-server-tools.test.ts tests/server/module-stats.test.ts tests/server/module-stats-docs.test.ts tests/e2e/tool-contracts.test.ts
git commit -m "feat(pipeline): register plugin read tools"
```

### Task 6: Sync Official Docs And Run Full Verification

**Files:**
- Modify: `D:\Code\codearts-mcp\docs\wiki\Official-Endpoint-Mapping-Req-Repo-Pipeline.md`
- Modify: `D:\Code\codearts-mcp\docs\wiki\Official-Category-Coverage-Matrix.md`
- Modify generated docs from `npm run stats:sync-docs`

- [ ] **Step 1: Update the hand-written official mapping docs**

Add these mapping rows before running generated-doc sync:

```md
| `pipeline_list_publishers` | `ListPublisher` | Direct | `GET /v1/{domain_id}/publisher/query-all` | 发布商列表 |
| `pipeline_list_available_publishers` | `ListAvailablePublisher` | Direct | `GET /v1/{domain_id}/publisher/optional-publisher` | 可用发布商列表 |
| `pipeline_list_stage_plugins` | `ListStagePlugins` | Direct | `POST /v1/{domain_id}/relation/stage-plugins` | 阶段插件列表 |
| `pipeline_list_base_plugins` | `ListBasePlugins` | Direct | `GET /v1/{domain_id}/relation/plugin/single` | 基础插件列表 |
| `pipeline_list_base_plugins_paged` | `ListBasePluginsNewPost` | Direct | `POST /v1/{domain_id}/relation/plugins` | 分页基础插件列表 |
| `pipeline_list_plugins` | `ListPlugins` | Direct | `POST /v1/{domain_id}/agent-plugin/query-all` | 插件列表 |
| `pipeline_get_plugin_inputs` | `ShowPluginInputs` | Direct | `POST /v1/{domain_id}/agent-plugin/plugin-input` | 插件输入配置 |
| `pipeline_get_plugin_outputs` | `ShowPluginOutputs` | Direct | `POST /v1/{domain_id}/agent-plugin/plugin-output` | 插件输出配置 |
| `pipeline_list_plugin_versions` | `ListPLuginVersion` | Direct | `GET /v1/{domain_id}/agent-plugin/query` | 插件版本列表 |
| `pipeline_get_plugin_version` | `ShowPluginVersion` | Direct | `GET /v1/{domain_id}/agent-plugin/detail` | 插件版本详情 |
```

- [ ] **Step 2: Run the doc sync and doc checks**

Run:

```powershell
npm run stats:sync-docs
npm run stats:check-docs
```

Expected: PASS, with generated docs updated to the new Pipeline totals and tool names.

- [ ] **Step 3: Run the focused Pipeline suite before full verification**

Run:

```powershell
npx vitest run tests/products/pipeline/client.test.ts tests/products/pipeline/tools/query-plugin-read-slice.test.ts tests/server/register-pipeline-tools.test.ts tests/e2e/tool-contracts.test.ts
```

Expected: PASS for the new slice end-to-end.

- [ ] **Step 4: Run the full repository verification**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all three commands PASS with no failing tests, lint violations, or TypeScript build errors.

- [ ] **Step 5: Commit only the doc alignment and generated stats**

Run:

```powershell
git add docs/wiki/Official-Endpoint-Mapping-Req-Repo-Pipeline.md docs/wiki/Official-Category-Coverage-Matrix.md README.md docs/wiki/Capability-Matrix.md docs/wiki/Current-Implementation-Status-2026-04-17.md docs/wiki/Tool-Status-Matrix.md src/server/module-stats-docs.ts
git commit -m "docs: sync pipeline plugin read coverage"
```

- [ ] **Step 6: Sanity-check the final diff before reporting completion**

Run:

```powershell
git diff --stat HEAD~1..HEAD
git status --short
```

Expected: only files from this slice remain touched or committed; no unrelated dirty files are reverted or staged by accident.

## Self-Review

### Spec coverage

- The official `4.7` publisher read APIs are covered by Task 1.
- The official `4.7` stage/base plugin discovery APIs are covered by Task 2.
- The official `4.7` custom plugin list and input/output APIs are covered by Task 3.
- The official `4.7` version list/detail APIs are covered by Task 4.
- MCP export, server registration, stats, and contract alignment are covered by Task 5.
- Official mapping docs and generated stats docs are covered by Task 6.

No spec requirement from `docs/superpowers/specs/2026-04-21-pipeline-plugin-read-slice-design.md` is left without a task.

### Placeholder scan

- Removed vague placeholder wording and deferred follow-up phrasing.
- Every task includes explicit files, commands, and expected outcomes.
- The tool split between `ListBasePlugins` and `ListBasePluginsNewPost` is spelled out, not deferred.
- The stats/count updates are concrete: Pipeline `77`, product total `217`, read total `145`, shared HTTP total `219`.

### Type consistency

- All new MCP names match the spec exactly.
- All new inputs consistently use `domain_id`.
- All paged list tools consistently use `offset` and `limit`.
- The version-detail steps consistently use `plugin_name` and `version`.
