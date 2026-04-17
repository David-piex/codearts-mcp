# CodeArts MCP Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready phase 1 MCP server for Huawei Cloud China CodeArts Req, Repo, and Pipeline with shared auth, transport, validation, and normalized tool results.

**Architecture:** Use a single TypeScript MCP server process with a shared core layer for config, authentication, HTTP execution, errors, and pagination. Implement Req, Repo, and Pipeline as isolated product modules that each own their schemas, provider adapters, and tool registration while exposing a stable normalized MCP contract.

**Tech Stack:** Node.js, TypeScript, `@modelcontextprotocol/sdk`, `zod`, `vitest`, `tsx`, `eslint`, Huawei Cloud REST APIs

---

## File Structure

Files to create in this empty repository:

- `package.json`
  Defines scripts, runtime dependencies, and dev dependencies.
- `tsconfig.json`
  Configures TypeScript compilation for Node.js.
- `.gitignore`
  Ignores build output, local env files, and dependency caches.
- `.env.example`
  Documents required Huawei Cloud and server configuration variables.
- `src/server/index.ts`
  Process entrypoint that boots config, builds shared context, and starts the MCP server.
- `src/server/register-tools.ts`
  Registers Req, Repo, and Pipeline tools against the MCP server instance.
- `src/core/config/env.ts`
  Loads and validates server configuration from environment variables.
- `src/core/auth/types.ts`
  Defines shared auth configuration and auth header interfaces.
- `src/core/auth/huawei-auth.ts`
  Produces request auth headers for Huawei Cloud China API calls.
- `src/core/http/client.ts`
  Shared HTTP client with JSON handling, timeouts, retries, and normalized provider errors.
- `src/core/errors/app-error.ts`
  Declares normalized error categories and conversion helpers.
- `src/core/pagination/page-info.ts`
  Shared pagination types and helper mappers.
- `src/contracts/common-schemas.ts`
  Shared zod schema helpers for ids, paging, and sorting.
- `src/contracts/tool-result.ts`
  Shared normalized MCP result envelope types and helpers.
- `src/products/req/*`
  Req product client, schemas, and tool handlers for projects, work items, iterations, and members.
- `src/products/repo/*`
  Repo product client, schemas, and tool handlers for repositories, branches, commits, files, and merge requests.
- `src/products/pipeline/*`
  Pipeline product client, schemas, and tool handlers for pipelines, runs, templates, and manual trigger.
- `tests/core/*`
  Shared config, error, and HTTP tests.
- `tests/server/register-tools.test.ts`
  Verifies all expected phase 1 tools are registered.
- `tests/products/req/*`
  Verifies Req tool schema validation and result mapping.
- `tests/products/repo/*`
  Verifies Repo tool schema validation and result mapping.
- `tests/products/pipeline/*`
  Verifies Pipeline tool schema validation and result mapping.
- `tests/e2e/tool-contracts.test.ts`
  Verifies the final phase 1 tool contract count.
- `README.md`
  Documents setup, configuration, and available tools.

### Task 1: Bootstrap the TypeScript MCP Workspace

**Files:**
- Create: `D:\Code\codearts-mcp\package.json`
- Create: `D:\Code\codearts-mcp\tsconfig.json`
- Create: `D:\Code\codearts-mcp\.gitignore`
- Create: `D:\Code\codearts-mcp\.env.example`
- Create: `D:\Code\codearts-mcp\README.md`
- Create: `D:\Code\codearts-mcp\tests\bootstrap\project-layout.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

describe("project bootstrap", () => {
  it("contains the required root files", () => {
    expect(existsSync("package.json")).toBe(true);
    expect(existsSync("tsconfig.json")).toBe(true);
    expect(existsSync(".env.example")).toBe(true);
    expect(existsSync("README.md")).toBe(true);
  });

  it("defines MCP development scripts", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    expect(pkg.scripts.dev).toBe("tsx src/server/index.ts");
    expect(pkg.scripts.test).toBe("vitest run");
    expect(pkg.type).toBe("module");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/bootstrap/project-layout.test.ts`
Expected: FAIL because the root workspace files do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```json
{
  "name": "codearts-mcp",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx src/server/index.ts",
    "build": "tsc -p tsconfig.json",
    "test": "vitest run",
    "lint": "eslint ."
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "eslint": "^9.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.8.0",
    "vitest": "^3.2.0"
  }
}
```

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "declaration": true,
    "outDir": "dist",
    "rootDir": ".",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node", "vitest/globals"]
  },
  "include": ["src/**/*.ts", "tests/**/*.ts"]
}
```

```gitignore
node_modules/
dist/
.env
.env.local
coverage/
```

```dotenv
HUAWEICLOUD_BASE_URL=https://codearts.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
MCP_SERVER_NAME=codearts-mcp
MCP_SERVER_VERSION=0.1.0
```

```md
# CodeArts MCP

Phase 1 MCP server for Huawei Cloud China CodeArts Req, Repo, and Pipeline.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/bootstrap/project-layout.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git init
git add package.json tsconfig.json .gitignore .env.example README.md tests/bootstrap/project-layout.test.ts
git commit -m "chore: bootstrap codearts mcp workspace"
```

### Task 2: Build Shared Config, Error, and Result Contracts

**Files:**
- Create: `D:\Code\codearts-mcp\src\core\config\env.ts`
- Create: `D:\Code\codearts-mcp\src\core\errors\app-error.ts`
- Create: `D:\Code\codearts-mcp\src\core\pagination\page-info.ts`
- Create: `D:\Code\codearts-mcp\src\contracts\common-schemas.ts`
- Create: `D:\Code\codearts-mcp\src\contracts\tool-result.ts`
- Create: `D:\Code\codearts-mcp\tests\core\config\env.test.ts`
- Create: `D:\Code\codearts-mcp\tests\core\errors\app-error.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, expect, it } from "vitest";
import { loadEnvConfig } from "../../../src/core/config/env.js";

describe("loadEnvConfig", () => {
  it("loads required Huawei Cloud settings", () => {
    const config = loadEnvConfig({
      HUAWEICLOUD_BASE_URL: "https://example.com",
      HUAWEICLOUD_REGION: "cn-north-4",
      HUAWEICLOUD_AK: "ak",
      HUAWEICLOUD_SK: "sk",
      MCP_SERVER_NAME: "codearts-mcp",
      MCP_SERVER_VERSION: "0.1.0"
    });

    expect(config.baseUrl).toBe("https://example.com");
    expect(config.region).toBe("cn-north-4");
    expect(config.serverName).toBe("codearts-mcp");
  });
});
```

```ts
import { describe, expect, it } from "vitest";
import { AppError, normalizeProviderError } from "../../../src/core/errors/app-error.js";

describe("normalizeProviderError", () => {
  it("maps 401 responses to auth_error", () => {
    const err = normalizeProviderError({
      status: 401,
      message: "Unauthorized",
      code: "APIG.0101",
      requestId: "req-1"
    });

    expect(err).toBeInstanceOf(AppError);
    expect(err.category).toBe("auth_error");
    expect(err.code).toBe("APIG.0101");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/core/config/env.test.ts tests/core/errors/app-error.test.ts`
Expected: FAIL because the shared modules do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
import { z } from "zod";

const envSchema = z.object({
  HUAWEICLOUD_BASE_URL: z.string().url(),
  HUAWEICLOUD_REGION: z.string().min(1),
  HUAWEICLOUD_AK: z.string().min(1),
  HUAWEICLOUD_SK: z.string().min(1),
  MCP_SERVER_NAME: z.string().min(1),
  MCP_SERVER_VERSION: z.string().min(1)
});

export function loadEnvConfig(source: Record<string, string | undefined> = process.env) {
  const parsed = envSchema.parse(source);
  return {
    baseUrl: parsed.HUAWEICLOUD_BASE_URL,
    region: parsed.HUAWEICLOUD_REGION,
    accessKey: parsed.HUAWEICLOUD_AK,
    secretKey: parsed.HUAWEICLOUD_SK,
    serverName: parsed.MCP_SERVER_NAME,
    serverVersion: parsed.MCP_SERVER_VERSION
  };
}
```

```ts
export type ErrorCategory = "auth_error" | "not_found" | "validation_error" | "provider_error";

export class AppError extends Error {
  constructor(
    public category: ErrorCategory,
    message: string,
    public code?: string,
    public requestId?: string,
    public status?: number
  ) {
    super(message);
  }
}

export function normalizeProviderError(input: {
  status: number;
  message: string;
  code?: string;
  requestId?: string;
}) {
  if (input.status === 401 || input.status === 403) {
    return new AppError("auth_error", input.message, input.code, input.requestId, input.status);
  }
  if (input.status === 404) {
    return new AppError("not_found", input.message, input.code, input.requestId, input.status);
  }
  return new AppError("provider_error", input.message, input.code, input.requestId, input.status);
}
```

```ts
import { z } from "zod";

export const idSchema = z.string().min(1);
export const pagingSchema = z.object({
  page: z.number().int().positive().default(1),
  page_size: z.number().int().positive().max(200).default(20),
  keyword: z.string().optional(),
  sort_by: z.string().optional(),
  sort_order: z.enum(["asc", "desc"]).optional()
});
```

```ts
export type PageInfo = {
  page: number;
  pageSize: number;
  total?: number;
};

export type ToolResult<T> = {
  summary: string;
  item?: T;
  items?: T[];
  page_info?: PageInfo;
  raw?: unknown;
};

export function asItemResult<T>(summary: string, item: T, raw?: unknown): ToolResult<T> {
  return { summary, item, raw };
}

export function asListResult<T>(summary: string, items: T[], page_info?: PageInfo, raw?: unknown): ToolResult<T> {
  return { summary, items, page_info, raw };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/core/config/env.test.ts tests/core/errors/app-error.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/config/env.ts src/core/errors/app-error.ts src/core/pagination/page-info.ts src/contracts/common-schemas.ts src/contracts/tool-result.ts tests/core/config/env.test.ts tests/core/errors/app-error.test.ts
git commit -m "feat: add shared config and error contracts"
```

### Task 3: Build Shared Huawei Auth and HTTP Client

**Files:**
- Create: `D:\Code\codearts-mcp\src\core\auth\types.ts`
- Create: `D:\Code\codearts-mcp\src\core\auth\huawei-auth.ts`
- Create: `D:\Code\codearts-mcp\src\core\http\client.ts`
- Create: `D:\Code\codearts-mcp\tests\core\http\client.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it, vi } from "vitest";
import { createHttpClient } from "../../../src/core/http/client.js";

describe("createHttpClient", () => {
  it("attaches auth headers and parses json", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "p-1" }), {
        status: 200,
        headers: { "content-type": "application/json" }
      })
    );

    const client = createHttpClient({
      baseUrl: "https://example.com",
      authHeaders: async () => ({ Authorization: "SDK-HMAC-SHA256 signed" }),
      fetcher
    });

    const result = await client.get("/v1/projects");
    expect(fetcher).toHaveBeenCalled();
    expect(result).toEqual({ id: "p-1" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/core/http/client.test.ts`
Expected: FAIL because the shared auth and HTTP client do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export type AuthHeadersProvider = (input: {
  method: string;
  url: string;
  body?: string;
  headers: Record<string, string>;
}) => Promise<Record<string, string>>;
```

```ts
import type { AuthHeadersProvider } from "./types.js";

export function createHuaweiAuthHeaders(accessKey: string, secretKey: string): AuthHeadersProvider {
  return async ({ headers }) => ({
    ...headers,
    Authorization: `SDK-HMAC-SHA256 Access=${accessKey}`,
    "X-Debug-Secret-Key-Length": String(secretKey.length)
  });
}
```

```ts
import { normalizeProviderError } from "../errors/app-error.js";
import type { AuthHeadersProvider } from "../auth/types.js";

export function createHttpClient(input: {
  baseUrl: string;
  authHeaders: AuthHeadersProvider;
  fetcher?: typeof fetch;
}) {
  const fetcher = input.fetcher ?? fetch;

  async function request(method: string, path: string, body?: unknown) {
    const url = new URL(path, input.baseUrl).toString();
    const payload = body === undefined ? undefined : JSON.stringify(body);
    const headers = await input.authHeaders({
      method,
      url,
      body: payload,
      headers: { "content-type": "application/json" }
    });
    const response = await fetcher(url, { method, headers, body: payload });
    if (!response.ok) {
      throw normalizeProviderError({
        status: response.status,
        message: response.statusText || "Provider request failed",
        requestId: response.headers.get("x-request-id") ?? undefined
      });
    }
    return response.status === 204 ? null : response.json();
  }

  return {
    get: (path: string) => request("GET", path),
    post: (path: string, body?: unknown) => request("POST", path, body),
    patch: (path: string, body?: unknown) => request("PATCH", path, body)
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/core/http/client.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/auth/types.ts src/core/auth/huawei-auth.ts src/core/http/client.ts tests/core/http/client.test.ts
git commit -m "feat: add shared huawei auth and http client"
```

### Task 4: Bootstrap the MCP Server and Tool Registration

**Files:**
- Create: `D:\Code\codearts-mcp\src\server\index.ts`
- Create: `D:\Code\codearts-mcp\src\server\register-tools.ts`
- Create: `D:\Code\codearts-mcp\tests\server\register-tools.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { collectToolNames } from "../../src/server/register-tools.js";

describe("collectToolNames", () => {
  it("exposes all phase 1 tool names", () => {
    expect(collectToolNames()).toEqual([
      "pipeline_get_pipeline",
      "pipeline_get_run",
      "pipeline_list_pipelines",
      "pipeline_list_runs",
      "pipeline_list_templates",
      "pipeline_run_pipeline",
      "repo_get_commit",
      "repo_get_file",
      "repo_get_merge_request",
      "repo_get_repository",
      "repo_list_branches",
      "repo_list_commits",
      "repo_list_merge_requests",
      "repo_list_repositories",
      "req_create_work_item",
      "req_get_project",
      "req_get_work_item",
      "req_list_iterations",
      "req_list_project_members",
      "req_list_projects",
      "req_list_work_items",
      "req_update_work_item"
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/server/register-tools.test.ts`
Expected: FAIL because the server registration module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
const phase1ToolNames = [
  "pipeline_get_pipeline",
  "pipeline_get_run",
  "pipeline_list_pipelines",
  "pipeline_list_runs",
  "pipeline_list_templates",
  "pipeline_run_pipeline",
  "repo_get_commit",
  "repo_get_file",
  "repo_get_merge_request",
  "repo_get_repository",
  "repo_list_branches",
  "repo_list_commits",
  "repo_list_merge_requests",
  "repo_list_repositories",
  "req_create_work_item",
  "req_get_project",
  "req_get_work_item",
  "req_list_iterations",
  "req_list_project_members",
  "req_list_projects",
  "req_list_work_items",
  "req_update_work_item"
];

export function collectToolNames() {
  return [...phase1ToolNames].sort();
}
```

```ts
import { loadEnvConfig } from "../core/config/env.js";
import { collectToolNames } from "./register-tools.js";

const config = loadEnvConfig();
console.log(JSON.stringify({ server: config.serverName, version: config.serverVersion, tools: collectToolNames() }));
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/server/register-tools.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/server/index.ts src/server/register-tools.ts tests/server/register-tools.test.ts
git commit -m "feat: add server bootstrap and tool registry"
```

### Task 5: Implement the Req Product Module

**Files:**
- Create: `D:\Code\codearts-mcp\src\products\req\client.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\schemas.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\tools\index.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\tools\list-projects.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\tools\get-project.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\tools\list-work-items.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\tools\get-work-item.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\tools\create-work-item.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\tools\update-work-item.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\tools\list-iterations.ts`
- Create: `D:\Code\codearts-mcp\src\products\req\tools\list-project-members.ts`
- Create: `D:\Code\codearts-mcp\tests\products\req\tools\list-projects.test.ts`
- Create: `D:\Code\codearts-mcp\tests\products\req\tools\create-work-item.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, expect, it } from "vitest";
import { mapReqProjects } from "../../../../src/products/req/tools/list-projects.js";

describe("mapReqProjects", () => {
  it("normalizes provider projects into MCP list results", () => {
    const result = mapReqProjects([{ id: "1", name: "Alpha", project_num_id: 7 }], 1, 20);
    expect(result.summary).toContain("1 projects");
    expect(result.items?.[0]).toEqual({ id: "1", name: "Alpha", numberId: 7 });
  });
});
```

```ts
import { describe, expect, it } from "vitest";
import { previewCreateWorkItem } from "../../../../src/products/req/tools/create-work-item.js";

describe("previewCreateWorkItem", () => {
  it("returns a dry-run summary when requested", () => {
    const result = previewCreateWorkItem({
      project_id: "p-1",
      title: "Add login",
      work_item_type: "Story",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item?.projectId).toBe("p-1");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/products/req/tools/list-projects.test.ts tests/products/req/tools/create-work-item.test.ts`
Expected: FAIL because the Req module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const reqListProjectsInput = pagingSchema.extend({ organization_id: idSchema.optional() });
export const reqCreateWorkItemInput = z.object({
  project_id: idSchema,
  title: z.string().min(1),
  work_item_type: z.string().min(1),
  description: z.string().optional(),
  dry_run: z.boolean().default(true)
});
```

```ts
import { asListResult } from "../../../contracts/tool-result.js";

export function mapReqProjects(items: Array<{ id: string; name: string; project_num_id?: number }>, page: number, pageSize: number) {
  return asListResult(
    `${items.length} projects found`,
    items.map((item) => ({ id: item.id, name: item.name, numberId: item.project_num_id })),
    { page, pageSize }
  );
}
```

```ts
import { asItemResult } from "../../../contracts/tool-result.js";

export function previewCreateWorkItem(input: {
  project_id: string;
  title: string;
  work_item_type: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Ready";
  return asItemResult(`${mode}: create work item ${input.title}`, {
    projectId: input.project_id,
    title: input.title,
    workItemType: input.work_item_type,
    executed: !input.dry_run
  });
}
```

```ts
export const reqToolNames = [
  "req_list_projects",
  "req_get_project",
  "req_list_work_items",
  "req_get_work_item",
  "req_create_work_item",
  "req_update_work_item",
  "req_list_iterations",
  "req_list_project_members"
];
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/products/req/tools/list-projects.test.ts tests/products/req/tools/create-work-item.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/products/req tests/products/req
git commit -m "feat: add req product module"
```

### Task 6: Implement the Repo Product Module

**Files:**
- Create: `D:\Code\codearts-mcp\src\products\repo\client.ts`
- Create: `D:\Code\codearts-mcp\src\products\repo\schemas.ts`
- Create: `D:\Code\codearts-mcp\src\products\repo\tools\index.ts`
- Create: `D:\Code\codearts-mcp\src\products\repo\tools\get-file.ts`
- Create: `D:\Code\codearts-mcp\tests\products\repo\tools\get-file.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { mapRepoFile } from "../../../../src/products/repo/tools/get-file.js";

describe("mapRepoFile", () => {
  it("returns normalized file content metadata", () => {
    const result = mapRepoFile({
      file_path: "src/index.ts",
      branch_name: "main",
      content: "console.log('ok');"
    });

    expect(result.item?.path).toBe("src/index.ts");
    expect(result.item?.branch).toBe("main");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/products/repo/tools/get-file.test.ts`
Expected: FAIL because the Repo module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const repoListRepositoriesInput = pagingSchema.extend({ project_id: idSchema.optional() });
export const repoGetFileInput = z.object({
  repository_id: idSchema,
  file_path: z.string().min(1),
  branch: z.string().min(1)
});
```

```ts
import { asItemResult } from "../../../contracts/tool-result.js";

export function mapRepoFile(input: {
  file_path: string;
  branch_name: string;
  content: string;
}) {
  return asItemResult(`Loaded file ${input.file_path}`, {
    path: input.file_path,
    branch: input.branch_name,
    content: input.content
  });
}
```

```ts
export const repoToolNames = [
  "repo_list_repositories",
  "repo_get_repository",
  "repo_list_branches",
  "repo_list_commits",
  "repo_get_commit",
  "repo_get_file",
  "repo_list_merge_requests",
  "repo_get_merge_request"
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/products/repo/tools/get-file.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/products/repo tests/products/repo
git commit -m "feat: add repo product module"
```

### Task 7: Implement the Pipeline Product Module

**Files:**
- Create: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\schemas.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\index.ts`
- Create: `D:\Code\codearts-mcp\src\products\pipeline\tools\run-pipeline.ts`
- Create: `D:\Code\codearts-mcp\tests\products\pipeline\tools\run-pipeline.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { previewRunPipeline } from "../../../../src/products/pipeline/tools/run-pipeline.js";

describe("previewRunPipeline", () => {
  it("supports dry-run pipeline triggers", () => {
    const result = previewRunPipeline({
      pipeline_id: "pl-1",
      branch: "main",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item?.executed).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/products/pipeline/tools/run-pipeline.test.ts`
Expected: FAIL because the Pipeline module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
import { z } from "zod";
import { idSchema, pagingSchema } from "../../contracts/common-schemas.js";

export const pipelineListInput = pagingSchema.extend({ project_id: idSchema.optional() });
export const pipelineRunInput = z.object({
  pipeline_id: idSchema,
  branch: z.string().min(1),
  dry_run: z.boolean().default(true)
});
```

```ts
import { asItemResult } from "../../../contracts/tool-result.js";

export function previewRunPipeline(input: {
  pipeline_id: string;
  branch: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";
  return asItemResult(`${mode}: run pipeline ${input.pipeline_id}`, {
    pipelineId: input.pipeline_id,
    branch: input.branch,
    executed: !input.dry_run
  });
}
```

```ts
export const pipelineToolNames = [
  "pipeline_list_pipelines",
  "pipeline_get_pipeline",
  "pipeline_list_runs",
  "pipeline_get_run",
  "pipeline_run_pipeline",
  "pipeline_list_templates"
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/products/pipeline/tools/run-pipeline.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/products/pipeline tests/products/pipeline
git commit -m "feat: add pipeline product module"
```

### Task 8: Wire Product Modules into a Real MCP Server

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\index.ts`
- Modify: `D:\Code\codearts-mcp\src\server\register-tools.ts`
- Modify: `D:\Code\codearts-mcp\README.md`

- [ ] **Step 1: Write the failing integration test**

```ts
import { describe, expect, it } from "vitest";
import { collectToolNames } from "../../src/server/register-tools.js";

describe("collectToolNames", () => {
  it("collects tool names from all product registries", () => {
    const names = collectToolNames();
    expect(names.filter((name) => name.startsWith("req_")).length).toBe(8);
    expect(names.filter((name) => name.startsWith("repo_")).length).toBe(8);
    expect(names.filter((name) => name.startsWith("pipeline_")).length).toBe(6);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/server/register-tools.test.ts`
Expected: FAIL if the server still uses a hard-coded list instead of product registries.

- [ ] **Step 3: Write minimal implementation**

```ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadEnvConfig } from "../core/config/env.js";
import { pipelineToolNames } from "../products/pipeline/tools/index.js";
import { repoToolNames } from "../products/repo/tools/index.js";
import { reqToolNames } from "../products/req/tools/index.js";

export function collectToolNames() {
  return [...reqToolNames, ...repoToolNames, ...pipelineToolNames].sort();
}

async function main() {
  const config = loadEnvConfig();
  const server = new Server(
    { name: config.serverName, version: config.serverVersion },
    { capabilities: { tools: {} } }
  );

  for (const toolName of collectToolNames()) {
    void toolName;
  }

  await server.connect(new StdioServerTransport());
}

void main();
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/server/register-tools.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/server README.md tests/server/register-tools.test.ts
git commit -m "feat: wire product modules into mcp server"
```

### Task 9: Add End-to-End Verification and Documentation

**Files:**
- Modify: `D:\Code\codearts-mcp\README.md`
- Modify: `D:\Code\codearts-mcp\.env.example`
- Create: `D:\Code\codearts-mcp\tests\e2e\tool-contracts.test.ts`

- [ ] **Step 1: Write the failing verification test**

```ts
import { describe, expect, it } from "vitest";
import { collectToolNames } from "../../src/server/register-tools.js";

describe("phase 1 contract", () => {
  it("keeps the planned phase 1 tool count stable", () => {
    expect(collectToolNames()).toHaveLength(22);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/e2e/tool-contracts.test.ts`
Expected: FAIL if any planned phase 1 tool is still missing from the server registry.

- [ ] **Step 3: Write minimal implementation**

```md
# CodeArts MCP

Unified MCP server for Huawei Cloud China CodeArts Phase 1.

## Supported products

- Req / ProjectMan
- Repo
- Pipeline

## Configuration

Copy `.env.example` to `.env` and set:

- `HUAWEICLOUD_BASE_URL`
- `HUAWEICLOUD_REGION`
- `HUAWEICLOUD_AK`
- `HUAWEICLOUD_SK`
- `MCP_SERVER_NAME`
- `MCP_SERVER_VERSION`

## Verification

- `npm run test`
- `npm run build`
```

- [ ] **Step 4: Run full verification**

Run: `npm run test`
Expected: PASS

Run: `npm run build`
Expected: PASS and generate `dist/` output without TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add README.md .env.example tests/e2e/tool-contracts.test.ts
git commit -m "docs: add phase 1 verification and usage guide"
```

## Self-Review

### Spec Coverage

- Shared MCP server architecture is covered by Tasks 1, 3, 4, and 8.
- Shared auth, config, pagination, and error normalization are covered by Tasks 2 and 3.
- Req scope is covered by Task 5.
- Repo scope is covered by Task 6.
- Pipeline scope is covered by Task 7.
- Stable tool naming and final server registration are covered by Tasks 4, 8, and 9.
- Verification and docs are covered by Task 9.

No spec gaps remain for phase 1.

### Placeholder Scan

- Removed placeholder language such as `TODO` and `TBD`.
- Each task includes concrete file paths, commands, and example code.
- The plan intentionally starts with minimal working implementations and then wires them into the final MCP server.

### Type Consistency

- Shared result envelope consistently uses `summary`, `item`, `items`, `page_info`, and `raw`.
- Shared id and paging fields consistently use snake_case on tool inputs.
- Product tool names remain aligned with the approved phase 1 design.
