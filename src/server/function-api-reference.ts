import { readFileSync } from "node:fs";
import { createServer } from "./create-server.js";
import { createSessionCredentialStore } from "./session-store.js";
import {
  collectManifestToolNames,
  findToolManifestEntry
} from "./tool-manifest.js";

const FUNCTION_API_REFERENCE_PATH = "docs/wiki/Function-API-Reference.md";

type ToolDefinition = {
  name: string;
  description?: string;
  inputSchema?: unknown;
};

type ToolsListResult = {
  tools?: ToolDefinition[];
};

type JsonSchemaObject = {
  type?: string | string[];
  properties?: Record<string, JsonSchemaObject>;
  required?: string[];
  default?: unknown;
  description?: string;
  enum?: unknown[];
  items?: JsonSchemaObject;
  anyOf?: JsonSchemaObject[];
  oneOf?: JsonSchemaObject[];
  allOf?: JsonSchemaObject[];
  format?: string;
  $ref?: string;
};

function getModuleLabel(toolName: string) {
  return findToolManifestEntry(toolName)?.module ?? "Other";
}

function sortTools(tools: ToolDefinition[]) {
  return [...tools].sort((left, right) => left.name.localeCompare(right.name));
}

function renderJson(value: unknown) {
  return JSON.stringify(value ?? { type: "object", properties: {} }, null, 2);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function asJsonSchemaObject(value: unknown): JsonSchemaObject {
  return isRecord(value) ? (value as JsonSchemaObject) : { type: "object", properties: {} };
}

const moduleChineseNames: Record<string, string> = {
  Artifact: "制品仓",
  "Auth / Session": "鉴权会话",
  Build: "编译构建",
  Check: "代码检查",
  Deploy: "部署",
  Pipeline: "流水线",
  Repo: "代码仓库",
  Req: "需求管理",
  TestPlan: "测试计划"
};

const actionChineseNames: Record<string, string> = {
  add: "添加",
  append: "追加",
  approve: "审批通过",
  batch: "批量处理",
  bind: "绑定",
  cancel: "取消",
  change: "变更",
  check: "检查",
  clear: "清除",
  close: "关闭",
  compare: "对比",
  configure: "配置",
  copy: "复制",
  count: "统计",
  create: "创建",
  delete: "删除",
  disable: "停用",
  download: "下载",
  enable: "启用",
  get: "获取",
  group: "分组查询",
  import: "导入",
  leave: "退出",
  list: "查询",
  merge: "合并",
  modify: "修改",
  pass: "通过",
  prepare: "准备",
  query: "查询",
  refuse: "拒绝",
  reject: "驳回",
  retry: "重试",
  review: "评审",
  rollback: "回滚",
  run: "运行",
  search: "搜索",
  set: "设置",
  start: "启动",
  stop: "停止",
  switch: "切换",
  transfer: "流转",
  update: "更新",
  upload: "上传",
  validate: "校验"
};

const resourceChineseNames: Record<string, string> = {
  addable: "可添加",
  app: "应用",
  apps: "应用",
  artifact: "制品",
  artifacts: "制品",
  associated: "关联",
  attachment: "附件",
  attachments: "附件",
  audit: "审计日志",
  board: "看板",
  branch: "分支",
  branches: "分支",
  build: "构建",
  cache: "缓存",
  case: "用例",
  cases: "用例",
  check: "检查",
  child: "子级",
  cluster: "集群",
  clusters: "集群",
  comment: "评论",
  comments: "评论",
  commit: "提交",
  commits: "提交",
  config: "配置",
  configs: "配置",
  count: "数量",
  current: "当前",
  custom: "自定义",
  density: "密度",
  deploy: "部署",
  detail: "详情",
  details: "详情",
  discussion: "讨论",
  discussions: "讨论",
  domain: "领域",
  domains: "领域",
  download: "下载",
  environment: "环境",
  environments: "环境",
  error: "错误",
  execution: "执行",
  feature: "特性",
  features: "特性",
  field: "字段",
  fields: "字段",
  file: "文件",
  files: "文件",
  flow: "流程",
  graph: "图",
  group: "组",
  groups: "组",
  history: "历史",
  host: "主机",
  hosts: "主机",
  hour: "工时",
  hours: "工时",
  image: "图片",
  index: "索引",
  info: "信息",
  ipd: "IPD",
  ir: "IR",
  issue: "工作项",
  issues: "工作项",
  iteration: "迭代",
  iterations: "迭代",
  job: "任务",
  jobs: "任务",
  label: "标签",
  labels: "标签",
  latest: "最新",
  log: "日志",
  logs: "日志",
  manual: "人工",
  member: "成员",
  members: "成员",
  merge: "合并请求",
  metric: "指标",
  module: "模块",
  modules: "模块",
  node: "Node",
  operation: "操作",
  optional: "可选",
  orchestration: "编排",
  orchestrations: "编排",
  param: "参数",
  parameters: "参数",
  plan: "计划",
  plans: "计划",
  pipeline: "流水线",
  pipelines: "流水线",
  process: "流程实例",
  project: "项目",
  projects: "项目",
  protected: "保护",
  public: "公共",
  record: "记录",
  records: "记录",
  refs: "引用",
  related: "相关",
  release: "发布",
  repository: "仓库",
  repositories: "仓库",
  request: "请求",
  requests: "请求",
  requirement: "需求",
  resource: "资源",
  review: "评审",
  reviewer: "评审人",
  role: "角色",
  rr: "RR",
  rule: "规则",
  run: "运行",
  runs: "运行",
  script: "脚本",
  session: "会话",
  severities: "严重级别",
  severity: "严重级别",
  source: "来源",
  stage: "阶段",
  stages: "阶段",
  statistic: "统计",
  statistics: "统计",
  status: "状态",
  statuses: "状态",
  step: "步骤",
  summary: "摘要",
  tag: "标签",
  tags: "标签",
  task: "任务",
  tasks: "任务",
  template: "模板",
  templates: "模板",
  tenant: "租户",
  test: "测试",
  tree: "树",
  upload: "上传",
  user: "用户",
  users: "用户",
  variable: "变量",
  variables: "变量",
  version: "版本",
  versions: "版本",
  wiki: "Wiki",
  wikis: "Wiki",
  work: "工作",
  workflow: "工作流",
  workhour: "工时",
  working: "工作",
  item: "项",
  items: "项"
};

function getChineseModuleLabel(module: string) {
  return moduleChineseNames[module] ?? module;
}

function getChineseResourceLabel(parts: string[]) {
  const words = parts
    .filter((part) => !["a", "an", "the", "codearts"].includes(part))
    .map((part) => resourceChineseNames[part] ?? part)
    .join("");

  return words || "资源";
}

function describeToolInChinese(toolName: string) {
  const exactDescriptions: Record<string, string> = {
    repo_list_personal_repository_import_records: "查询当前用户的代码仓导入记录。",
    repo_associate_remote_mirror: "关联代码仓远程镜像地址。",
    repo_start_remote_mirror_synchronization: "启动代码仓远程镜像同步任务。",
    repo_get_remote_mirror: "获取代码仓远程镜像配置和同步状态。",
    repo_update_remote_mirror: "更新代码仓远程镜像配置。"
  };

  if (exactDescriptions[toolName]) {
    return exactDescriptions[toolName];
  }

  if (toolName === "auth_configure_session") {
    return "配置当前 MCP 会话使用的华为云 AK/SK、区域和可选服务地址。";
  }

  if (toolName === "auth_clear_session") {
    return "清除当前 MCP 会话中保存的华为云凭据。";
  }

  const [family = "", action = "", ...resourceParts] = toolName.split("_");
  const module = findToolManifestEntry(toolName)?.module ?? family;
  const moduleLabel = getChineseModuleLabel(module);
  const actionLabel = actionChineseNames[action] ?? "执行";
  const resourceLabel = getChineseResourceLabel(resourceParts);

  return `${actionLabel}${moduleLabel}的${resourceLabel}。`;
}

function describeParameter(name: string) {
  const exactDescriptions: Record<string, string> = {
    access_key: "华为云访问密钥 ID，用于当前 MCP 会话鉴权。",
    secret_key: "华为云访问密钥 Secret，仅用于签名鉴权，请勿写入日志或公开文档。",
    region: "华为云区域标识，例如 cn-north-4。",
    dry_run: "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。",
    project_id: "CodeArts 项目的唯一标识，用于确定本次操作所属项目。",
    project_uuid: "CodeArts 项目的 UUID，用于创建代码仓或定位项目资源。",
    repository_id: "代码仓库 ID 或 UUID，用于定位 CodeArts Repo 仓库。",
    repository_uuid: "代码仓库 UUID，用于定位 CodeArts Repo 仓库。",
    merge_request_iid: "合并请求在仓库内的 IID。",
    branch_name: "分支名称。",
    tag_name: "标签名称。",
    ref: "Git 引用，可以是分支、标签或提交 SHA。",
    file_path: "仓库内文件路径。",
    commit_sha: "提交 SHA。",
    page: "页码。用于 page/page_size 分页。",
    page_size: "每页数量。用于分页查询。",
    offset: "分页偏移量。",
    limit: "分页数量上限。",
    keyword: "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。",
    search: "搜索关键字。用于按名称、标题、编号等文本条件过滤列表。",
    sort: "排序方向。asc 表示升序，desc 表示降序。",
    sort_by: "排序字段。用于选择服务端排序字段。",
    sort_order: "排序方向。asc 表示升序，desc 表示降序。",
    order_by: "排序字段。用于选择服务端排序字段。",
    name: "资源名称。",
    description: "资源描述信息。",
    title: "标题。",
    state: "状态过滤条件或目标状态。",
    status: "状态过滤条件或目标状态。",
    status_id: "工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。",
    tracker_id: "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。",
    tracker_ids: "Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。",
    work_item_type: "工作项类型，会映射为 Scrum tracker_id：task/\"2\"=Task/任务，bug/\"3\"=Bug/缺陷，epic/\"5\"=Epic，feature/\"6\"=Feature，story/\"7\"=Story。",
    role_id: "项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。",
    priority_id: "工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。",
    severity_id: "严重程度 ID。通常用于缺陷或问题等级；可通过 req_list_issue_severities 查询当前可用严重程度。",
    created_after: "创建时间下界，通常使用 ISO 8601 时间字符串。",
    created_before: "创建时间上界，通常使用 ISO 8601 时间字符串。",
    finished_after: "完成时间下界，通常使用 ISO 8601 时间字符串。",
    finished_before: "完成时间上界，通常使用 ISO 8601 时间字符串。",
    source_type: "导入来源类型，例如 gitee、github、gitlab、git、svn 等。",
    source_branch: "源分支名称。",
    target_branch: "目标分支名称。",
    target_project_id: "目标项目 ID。",
    assignee_id: "负责人用户 ID。",
    reviewer_ids: "评审人用户 ID 列表。",
    remove_source_branch: "合并后是否删除源分支。",
    should_remove_source_branch: "合并后是否删除源分支。",
    squash: "是否压缩提交。",
    draft: "是否创建为草稿合并请求。",
    labels: "标签列表或逗号分隔的标签字符串。",
    milestone_id: "里程碑 ID。",
    action_type: "评审动作类型。",
    approver_comment: "评审意见。",
    force_merge: "是否强制合并。",
    force_fetch: "是否强制拉取远端镜像。",
    sha: "提交 SHA，用于校验合并请求头部提交。",
    merge_commit_message: "合并提交信息。",
    squash_commit_message: "压缩提交信息。",
    url: "远程仓库或镜像地址。",
    username: "远程镜像认证用户名。按官方接口要求需要传入 base64 后的值。",
    password: "远程镜像认证密码。按官方接口要求需要传入 base64 后的值。",
    endpoint_uuid: "服务端点 UUID，用于远程镜像认证或网络访问配置。",
    sync_branch_type: "远程镜像同步分支范围，all 表示全部分支，default 表示默认分支。",
    mirroring_enabled: "是否启用远程镜像。"
  };

  if (exactDescriptions[name]) {
    return exactDescriptions[name];
  }

  if (name.endsWith("_id")) {
    return "资源 ID，用于定位对应的 CodeArts 资源。";
  }

  if (name.endsWith("_ids")) {
    return "资源 ID 列表，用于批量定位对应的 CodeArts 资源。";
  }

  if (name.endsWith("_url")) {
    return "服务地址或资源 URL。";
  }

  if (name.endsWith("_name")) {
    return "资源名称。";
  }

  return "请参考字段名和上游 CodeArts API 语义填写。";
}

function hasKnownParameterDescription(name: string) {
  return [
    "status_id",
    "tracker_id",
    "tracker_ids",
    "work_item_type",
    "role_id",
    "priority_id",
    "severity_id"
  ].includes(name);
}

function getSchemaType(schema: JsonSchemaObject): string {
  if (schema.enum) {
    return schema.enum.map((item) => JSON.stringify(item)).join(" | ");
  }

  if (Array.isArray(schema.type)) {
    return schema.type.join(" | ");
  }

  if (schema.type === "array") {
    return schema.items ? `array<${getSchemaType(schema.items)}>` : "array";
  }

  const variants = schema.anyOf ?? schema.oneOf;
  if (variants?.length) {
    return variants.map(getSchemaType).join(" | ");
  }

  if (schema.allOf?.length) {
    return schema.allOf.map(getSchemaType).join(" & ");
  }

  return schema.type ?? "object";
}

function renderDefaultValue(value: unknown) {
  if (value === undefined) {
    return "";
  }

  return JSON.stringify(value);
}

function escapeMarkdownCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function renderEnumValues(schema: JsonSchemaObject): string | undefined {
  if (schema.enum?.length) {
    return schema.enum.map((item) => `\`${String(item)}\``).join("、");
  }

  const variants = schema.anyOf ?? schema.oneOf;
  const enumValues = variants?.flatMap((item) => item.enum ?? []) ?? [];
  if (enumValues.length > 0) {
    return enumValues.map((item) => `\`${String(item)}\``).join("、");
  }

  if (schema.items?.enum?.length) {
    return schema.items.enum.map((item) => `\`${String(item)}\``).join("、");
  }

  return undefined;
}

function describeSchemaParameter(name: string, schema: JsonSchemaObject, originalSchema: JsonSchemaObject) {
  const baseDescription = hasKnownParameterDescription(name)
    ? describeParameter(name)
    : schema.description ?? originalSchema.description ?? describeParameter(name);
  const enumValues = renderEnumValues(schema);

  if (!enumValues || baseDescription.includes("可选值")) {
    return baseDescription;
  }

  return `${baseDescription}可选值：${enumValues}。`;
}

function resolveLocalSchemaRef(schema: JsonSchemaObject, root: JsonSchemaObject) {
  if (!schema.$ref?.startsWith("#/properties/")) {
    return schema;
  }

  const propertyName = schema.$ref.slice("#/properties/".length);
  return root.properties?.[propertyName] ?? schema;
}

function renderParameterTable(inputSchema: unknown) {
  const schema = asJsonSchemaObject(inputSchema);
  const properties = schema.properties ?? {};
  const entries = Object.entries(properties);

  if (entries.length === 0) {
    return ["无参数。"];
  }

  const required = new Set(schema.required ?? []);
  const lines = [
    "| 参数 | 必填 | 类型 | 默认值 | 说明 |",
    "| --- | --- | --- | --- | --- |"
  ];

  for (const [name, propertySchema] of entries) {
    const resolvedSchema = resolveLocalSchemaRef(propertySchema, schema);
    const description = describeSchemaParameter(name, resolvedSchema, propertySchema);
    lines.push(
      `| \`${name}\` | ${required.has(name) ? "是" : "否"} | \`${escapeMarkdownCell(getSchemaType(resolvedSchema))}\` | ${escapeMarkdownCell(renderDefaultValue(resolvedSchema.default ?? propertySchema.default))} | ${escapeMarkdownCell(description)} |`
    );
  }

  return lines;
}

function buildExampleArguments(inputSchema: unknown) {
  const schema = asJsonSchemaObject(inputSchema);
  const required = schema.required ?? [];
  const properties = schema.properties ?? {};
  const args: Record<string, string> = {};

  for (const key of required) {
    if (properties[key]?.default !== undefined) {
      continue;
    }

    args[key] = `<${key}>`;
  }

  return args;
}

export async function collectHttpToolDefinitions(): Promise<ToolDefinition[]> {
  const server = createServer({
    mode: "http",
    config: {
      serverName: "codearts-mcp",
      serverVersion: "0.1.0",
      httpPort: 0
    },
    sessionStore: createSessionCredentialStore()
  });
  const requestHandlers = (
    server as unknown as {
      server?: {
        _requestHandlers?: Map<string, (request: unknown, extra: unknown) => Promise<unknown>>;
      };
    }
  ).server?._requestHandlers;
  const handler = requestHandlers?.get("tools/list");

  if (!handler) {
    throw new Error("Expected tools/list handler to be registered.");
  }

  const result = (await handler(
    {
      jsonrpc: "2.0",
      id: "function-api-reference",
      method: "tools/list",
      params: {}
    },
    {}
  )) as ToolsListResult;

  const tools = sortTools(result.tools ?? []);
  const expectedToolNames = collectManifestToolNames({ mode: "http" });
  const actualToolNames = tools.map((tool) => tool.name);

  if (actualToolNames.join("\n") !== expectedToolNames.join("\n")) {
    throw new Error("HTTP tools/list output does not match the ToolManifest.");
  }

  return tools;
}

export function renderFunctionApiReference(tools: ToolDefinition[]) {
  const sortedTools = sortTools(tools);
  const moduleCounts = new Map<string, number>();

  for (const tool of sortedTools) {
    moduleCounts.set(getModuleLabel(tool.name), (moduleCounts.get(getModuleLabel(tool.name)) ?? 0) + 1);
  }

  const lines = [
    "# CodeArts MCP 函数 API 参考",
    "",
    "本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。",
    "",
    "所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。",
    "",
    "## 通用调用结构",
    "",
    "```json",
    renderJson({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: "<tool-name>",
        arguments: {}
      }
    }),
    "```",
    "",
    "## 模块目录",
    "",
    "| 模块 | API 数量 |",
    "| --- | ---: |",
    ...Array.from(moduleCounts.entries()).map(
      ([module, count]) => `| ${getChineseModuleLabel(module)} | ${count} |`
    ),
    `| **总计** | **${sortedTools.length}** |`,
    "",
    "## API 清单",
    ""
  ];

  for (const tool of sortedTools) {
    const exampleArguments = buildExampleArguments(tool.inputSchema);

    lines.push(
      `### ${tool.name}`,
      "",
      `所属模块：\`${getChineseModuleLabel(getModuleLabel(tool.name))}\``,
      "",
      `说明：${describeToolInChinese(tool.name)}`,
      "",
      "调用示例：",
      "",
      "```json",
      renderJson({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: tool.name,
          arguments: exampleArguments
        }
      }),
      "```",
      "",
      "参数：",
      "",
      ...renderParameterTable(tool.inputSchema),
      "",
      "输入 JSON Schema：",
      "",
      "```json",
      renderJson(tool.inputSchema),
      "```",
      ""
    );
  }

  return `${lines.join("\n").replace(/\r\n/g, "\n")}\n`;
}

export async function renderCurrentFunctionApiReference() {
  return renderFunctionApiReference(await collectHttpToolDefinitions());
}

export function loadFunctionApiReference(path = FUNCTION_API_REFERENCE_PATH) {
  return readFileSync(path, "utf8");
}

export function normalizeMarkdownForComparison(markdown: string) {
  return markdown.replace(/\r\n/g, "\n");
}

export const functionApiReferencePath = FUNCTION_API_REFERENCE_PATH;
