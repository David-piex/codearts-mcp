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

function getModuleLabel(toolName: string) {
  return findToolManifestEntry(toolName)?.module ?? "Other";
}

function sortTools(tools: ToolDefinition[]) {
  return [...tools].sort((left, right) => left.name.localeCompare(right.name));
}

function renderJson(value: unknown) {
  return JSON.stringify(value ?? { type: "object", properties: {} }, null, 2);
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
          arguments: {}
        }
      }),
      "```",
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
