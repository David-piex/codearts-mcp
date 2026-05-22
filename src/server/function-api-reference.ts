import { readFileSync } from "node:fs";
import { createServer } from "./create-server.js";
import { createSessionCredentialStore } from "./session-store.js";
import {
  collectManifestToolNames,
  findToolManifestEntry
} from "./tool-manifest.js";

const FUNCTION_API_REFERENCE_PATH = "docs/wiki/Function-API-Reference.md";
const FUNCTION_API_REFERENCE_DETAIL_DIR = "docs/wiki";
const FUNCTION_API_REFERENCE_DETAIL_PREFIX = "Function-API-Reference";

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

function getModuleSlug(module: string) {
  const moduleSlugs: Record<string, string> = {
    Artifact: "Artifact",
    "Auth / Session": "Auth-Session",
    Build: "Build",
    Check: "Check",
    Deploy: "Deploy",
    Pipeline: "Pipeline",
    Repo: "Repo",
    Req: "Req",
    TestPlan: "TestPlan",
    Other: "Other"
  };
  const slug = moduleSlugs[module] ?? module.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return slug || "Other";
}

function getModuleReferenceFilename(module: string) {
  return `${FUNCTION_API_REFERENCE_DETAIL_PREFIX}-${getModuleSlug(module)}.md`;
}

function getModuleReferencePath(module: string) {
  return `${FUNCTION_API_REFERENCE_DETAIL_DIR}/${getModuleReferenceFilename(module)}`;
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
    repo_list_impersonation_tokens: "查询当前用户的个人访问令牌元数据，不返回令牌明文。",
    repo_import_repository: "从 GitHub、GitLab、Gitee、Bitbucket、Coding、Codeup 或通用 Git/SVN HTTPS 地址导入仓库到 CodeArts Repo。",
    repo_associate_branch_work_items: "将 CodeArts Repo 分支关联到一个或多个工作项，用于让分支和 MR 页面显示关联工作项。",
    repo_associate_remote_mirror: "关联代码仓远程镜像地址。",
    repo_start_remote_mirror_synchronization: "启动代码仓远程镜像同步任务。",
    repo_get_remote_mirror: "获取代码仓远程镜像配置和同步状态。",
    repo_update_remote_mirror: "更新代码仓远程镜像配置。",
    req_get_work_item_issue_details:
      "获取需求管理的官方 V2 工作项详情。该工具只调用 `IssueDetailsV2 /v2/issues/show`，不会 fallback 到 `req_get_work_item` 或评论列表接口；工具会把 `journals` 映射为 `comments`，并保留 `assignee` / `assignedToName` 以便查看处理人。返回结果会显式映射基础信息、时间、状态类型、优先级/严重程度、人员、项目结构、自定义字段、附件、标签、锁版本、关注/私有/删除状态和评论字段；时间戳原值会保留，同时追加 `createdOnText`、`updatedOnText`、`startDateText`、`dueDateText` 这类 Asia/Shanghai 可读时间；并通过 `rawIssue` / `raw` 保留官方 V2 原始 issue 响应，避免上游新增字段丢失。"
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

function formatParameterDoc(sections: Array<[string, string]>) {
  return sections.map(([title, body]) => `${title}：<br>${body}`).join("<br>");
}

function describeToolFieldMapping(toolName: string, name: string) {
  const repoImportRepositoryMapping: Record<string, string> = {
    project_uuid: "MCP 字段 `project_uuid` ↔ 原始 CodeArts Repo API 请求体字段 `project_uuid`，表示目标 CodeArts 项目 UUID。",
    name: "MCP 字段 `name` ↔ 原始 CodeArts Repo 导入接口请求体字段 `target_repo_name`；当导入接口不可用并回退到创建仓库接口时，对应创建接口字段 `name`。",
    source_type: "MCP 字段 `source_type` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_type`，表示来源平台类型。",
    source_url: "MCP 字段 `source_url` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_url`；工具会在需要时把用户名/令牌拼入 HTTPS URL。回退到创建仓库接口时，会编码为 `import_url`。",
    source_repo_id: "MCP 字段 `source_repo_id` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_repo_id`。",
    source_full_name: "MCP 字段 `source_full_name` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_full_name`。",
    source_visibility: "MCP 字段 `source_visibility` ↔ 原始 CodeArts Repo 导入接口请求体字段 `source_visibility`。",
    source_username: "MCP 字段 `source_username` 用于生成带凭据的 `source_url`，原始导入接口无独立同名字段。",
    source_token: "MCP 字段 `source_token` 用于生成带凭据的 `source_url`，原始导入接口无独立同名字段；工具只传给上游，不在结果中回显明文。",
    import_type: "MCP 字段 `import_type` ↔ 原始 CodeArts Repo 导入接口请求体字段 `import_type`。",
    fetch_refs_type: "MCP 字段 `fetch_refs_type` ↔ 原始 CodeArts Repo 导入接口请求体字段 `fetch_refs_type`。",
    endpoint_uuid: "MCP 字段 `endpoint_uuid` ↔ 原始 CodeArts Repo 导入接口请求体字段 `endpoint_uuid`。",
    codecheck: "MCP 字段 `codecheck` ↔ 原始 CodeArts Repo 导入接口请求体字段 `codecheck`。",
    group_id: "MCP 字段 `group_id` ↔ 原始 CodeArts Repo 导入接口请求体字段 `group_id`。",
    mirror_repository: "MCP 字段 `mirror_repository` ↔ 原始 CodeArts Repo 导入接口请求体字段 `mirror_repository`。",
    security_level: "MCP 字段 `security_level` ↔ 原始 CodeArts Repo 导入接口请求体字段 `security_level`。",
    import_members: "MCP 字段 `import_members` ↔ 回退创建仓库接口请求体字段 `import_members`；导入接口本身不使用该字段。",
    visibility_level: "MCP 字段 `visibility_level` ↔ 原始 CodeArts Repo 导入接口或回退创建仓库接口请求体字段 `visibility_level`。",
    description: "MCP 字段 `description` ↔ 回退创建仓库接口请求体字段 `description`；导入接口本身不使用该字段。",
    caller: "MCP 字段 `caller` ↔ 回退创建仓库接口请求体字段 `caller`；导入接口本身不使用该字段。",
    dry_run: "MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts Repo API 无对应字段，不会提交给上游。"
  };

  const createWorkItemMapping: Record<string, string> = {
    project_id: "MCP 字段 `project_id` ↔ PDF/CodeArts 路径参数 `project_id`。",
    title: "MCP 字段 `title` ↔ PDF/CodeArts 请求体字段 `name`。",
    work_item_type: "MCP 字段 `work_item_type` ↔ PDF/CodeArts 请求体字段 `tracker_id`；工具会把 task/bug/epic/feature/story 转成 2/3/5/6/7。",
    parent_work_item_id: "MCP 字段 `parent_work_item_id` ↔ PDF/CodeArts 请求体字段 `parent_issue_id`。",
    description: "MCP 字段 `description` ↔ PDF/CodeArts 请求体字段 `description`。",
    priority_id: "MCP 字段 `priority_id` ↔ PDF/CodeArts 请求体字段 `priority_id`。",
    iteration_id: "MCP 字段 `iteration_id` ↔ PDF/CodeArts 请求体字段 `iteration_id`。",
    module_id: "MCP 字段 `module_id` ↔ PDF/CodeArts 请求体字段 `module_id`。",
    severity_id: "MCP 字段 `severity_id` ↔ PDF/CodeArts 请求体字段 `severity_id`。",
    assigned_id: "MCP 字段 `assigned_id` ↔ PDF/CodeArts 请求体字段 `assigned_id`。",
    developer_id: "MCP 字段 `developer_id` ↔ PDF/CodeArts 请求体字段 `developer_id`。",
    done_ratio: "MCP 字段 `done_ratio` ↔ PDF/CodeArts 请求体字段 `done_ratio`。",
    expected_work_hours: "MCP 字段 `expected_work_hours` ↔ PDF/CodeArts 请求体字段 `expected_work_hours`。",
    start_date: "MCP 字段 `start_date` ↔ PDF/CodeArts 请求体字段 `begin_time`；工具接收毫秒时间戳，并按北京时区日期转换为 `YYYY-MM-DD` 后提交。",
    due_date: "MCP 字段 `due_date` ↔ PDF/CodeArts 请求体字段 `end_time`；工具接收毫秒时间戳，并按北京时区日期转换为 `YYYY-MM-DD` 后提交。",
    dry_run: "MCP 字段 `dry_run` 是本工具安全开关，PDF/CodeArts 原 API 无对应字段，不会提交给上游。"
  };

  const createIterationWorkItemMapping: Record<string, string> = {
    ...createWorkItemMapping,
    iteration_id: "MCP 字段 `iteration_id` ↔ PDF/CodeArts 请求体字段 `iteration_id`；同时用于指定新工作项所属迭代。"
  };

  const createPlanWorkItemMapping: Record<string, string> = {
    project_id: "MCP 字段 `project_id` ↔ CodeArts 请求体字段 `projectUUId`。",
    plan_id: "MCP 字段 `plan_id` ↔ CodeArts 请求体字段 `plan_id`。",
    title: "MCP 字段 `title` ↔ CodeArts 请求体字段 `subject`。",
    work_item_type: createWorkItemMapping.work_item_type,
    parent_work_item_id: createWorkItemMapping.parent_work_item_id,
    description: createWorkItemMapping.description,
    iteration_id: createWorkItemMapping.iteration_id,
    module_id: createWorkItemMapping.module_id,
    priority_id: createWorkItemMapping.priority_id,
    severity_id: createWorkItemMapping.severity_id,
    status_id: "MCP 字段 `status_id` ↔ CodeArts 请求体字段 `status_id`。",
    assigned_id: createWorkItemMapping.assigned_id,
    developer_id: createWorkItemMapping.developer_id,
    done_ratio: createWorkItemMapping.done_ratio,
    expected_work_hours: createWorkItemMapping.expected_work_hours,
    start_date: "MCP 字段 `start_date` ↔ CodeArts 请求体字段 `start_date`。",
    due_date: "MCP 字段 `due_date` ↔ CodeArts 请求体字段 `due_date`。",
    dry_run: createWorkItemMapping.dry_run
  };

  const updateWorkItemMapping: Record<string, string> = {
    ...createWorkItemMapping,
    work_item_id: "MCP 字段 `work_item_id` ↔ PDF/CodeArts 路径参数 `issue_id`。",
    status_id: "MCP 字段 `status_id` ↔ PDF/CodeArts 请求体字段 `status_id`。"
  };

  const batchUpdateWorkItemsMapping: Record<string, string> = {
    project_id: "MCP 字段 `project_id` ↔ 原始 CodeArts Req API 路径参数 `project_id`。",
    work_item_ids: "MCP 字段 `work_item_ids` ↔ 原始 CodeArts Req API 请求体字段 `id`，批量提交时为工作项 ID 数组。",
    status_id: "MCP 字段 `status_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.status_id`。",
    priority_id: "MCP 字段 `priority_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.priority_id`。",
    severity_id: "MCP 字段 `severity_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.severity_id`。",
    assigned_id: "MCP 字段 `assigned_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.assigned_id`。",
    developer_id: "MCP 字段 `developer_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.developer_id`；工具会把可转数字的字符串转成数字 ID。",
    done_ratio: "MCP 字段 `done_ratio` ↔ 原始 CodeArts Req API 请求体字段 `attribute.done_ratio`。",
    iteration_id: "MCP 字段 `iteration_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.iteration_id`。",
    module_id: "MCP 字段 `module_id` ↔ 原始 CodeArts Req API 请求体字段 `attribute.module_id`。",
    dry_run: createWorkItemMapping.dry_run
  };

  const copyWorkItemsMapping: Record<string, string> = {
    from_project_id: "MCP 字段 `from_project_id` ↔ 原始 CodeArts Req API 请求体字段 `fromProjectUUId`。",
    to_project_id: "MCP 字段 `to_project_id` ↔ 原始 CodeArts Req API 请求体字段 `toProjectUUId`。",
    work_item_ids: "MCP 字段 `work_item_ids` ↔ 原始 CodeArts Req API 请求体字段 `issueIds`；工具会把数组按逗号拼接。",
    copy_comments: "MCP 字段 `copy_comments` ↔ 原始 CodeArts Req API 请求体字段 `copyComments`。",
    copy_work_hours: "MCP 字段 `copy_work_hours` ↔ 原始 CodeArts Req API 请求体字段 `copyWorkHours`。",
    dry_run: createWorkItemMapping.dry_run
  };

  const toolMappings: Record<string, Record<string, string>> = {
    repo_import_repository: repoImportRepositoryMapping,
    req_batch_update_work_items: batchUpdateWorkItemsMapping,
    req_copy_work_items: copyWorkItemsMapping,
    req_create_work_item: createWorkItemMapping,
    req_create_iteration_work_item: createIterationWorkItemMapping,
    req_create_plan_work_item: createPlanWorkItemMapping,
    req_update_work_item: updateWorkItemMapping
  };

  return toolMappings[toolName]?.[name];
}

function describeParameterFieldMapping(toolName: string, name: string) {
  const exactMapping = describeToolFieldMapping(toolName, name);

  if (exactMapping) {
    return exactMapping;
  }

  const moduleLabel = getChineseModuleLabel(getModuleLabel(toolName));

  const internalFields: Record<string, string> = {
    dry_run: "MCP 字段 `dry_run` 是本工具安全开关，原始 CodeArts API 无对应字段，不会提交给上游。",
    access_key: "MCP 字段 `access_key` 仅用于配置本地 MCP 会话鉴权，原始业务 API 无对应字段。",
    secret_key: "MCP 字段 `secret_key` 仅用于配置本地 MCP 会话签名密钥，原始业务 API 无对应字段。",
    region: "MCP 字段 `region` 用于选择华为云区域和服务端点，原始业务请求体通常无对应字段。"
  };

  if (internalFields[name]) {
    return internalFields[name];
  }

  const commonFieldMappings: Record<string, string> = {
    project_uuid: `MCP 字段 \`project_uuid\` ↔ 原始 CodeArts ${moduleLabel} API 中表示项目 UUID 的字段，常见原字段名为 \`project_uuid\`、\`projectUuid\` 或 \`projectUUId\`，以对应接口实际定义为准。`,
    project_id: `MCP 字段 \`project_id\` ↔ 原始 CodeArts ${moduleLabel} API 中的项目 ID/项目 UUID 字段，通常位于路径参数或请求 Body。`,
    repository_id: `MCP 字段 \`repository_id\` ↔ 原始 CodeArts ${moduleLabel} API 中的仓库 ID 字段，通常位于路径参数或 Query 参数。`,
    work_item_id: `MCP 字段 \`work_item_id\` ↔ 原始 CodeArts ${moduleLabel} API 中的工作项 ID 字段，常见原字段名为 \`issue_id\` 或路径参数中的 issue 标识。`,
    issue_id: `MCP 字段 \`issue_id\` ↔ 原始 CodeArts ${moduleLabel} API 同名字段 \`issue_id\`，表示工作项/议题 ID。`,
    work_item_ids: `MCP 字段 \`work_item_ids\` ↔ 原始 CodeArts ${moduleLabel} API 中的工作项 ID 集合字段，常见原字段名为 \`issue_ids\`、\`issueIds\`、\`id\`。`,
    tracker_id: `MCP 字段 \`tracker_id\` ↔ 原始 CodeArts ${moduleLabel} API 同名字段 \`tracker_id\`，表示工作项类型 ID。`,
    work_item_type: `MCP 字段 \`work_item_type\` ↔ 原始 CodeArts ${moduleLabel} API 中的工作项类型字段，常见原字段名为 \`tracker_id\`；工具会按接口需要转换。`,
    title: `MCP 字段 \`title\` ↔ 原始 CodeArts ${moduleLabel} API 中的标题字段，常见原字段名为 \`name\`、\`subject\` 或 \`title\`。`,
    page: `MCP 字段 \`page\` ↔ 原始 CodeArts ${moduleLabel} API 的分页页码或由 \`offset/limit\` 换算得到的页码。`,
    page_size: `MCP 字段 \`page_size\` ↔ 原始 CodeArts ${moduleLabel} API 的分页大小字段，常见原字段名为 \`page_size\`、\`limit\` 或 \`pageSize\`。`,
    keyword: `MCP 字段 \`keyword\` ↔ 原始 CodeArts ${moduleLabel} API 的搜索关键字字段，常见原字段名为 \`keyword\`、\`search\` 或 \`name\`。`
  };

  if (commonFieldMappings[name]) {
    return commonFieldMappings[name];
  }

  return `MCP 字段 \`${name}\` ↔ 原始 CodeArts ${moduleLabel} API 同名字段 \`${name}\`。字段所在位置（路径参数、Query 参数或请求 Body）以原始 API 定义为准。`;
}

function describeToolParameter(toolName: string, name: string) {
  const reqCreateWorkItemDescriptions: Record<string, string> = {
    project_id: formatParameterDoc([
      [
        "参数解释",
        "项目的 32 位 UUID，项目唯一标识。可通过查询项目列表接口获取，响应消息体中的 project_id 字段值就是项目 ID。"
      ],
      ["约束限制", "正则表达式：[A-Za-z0-9]{32}。"],
      ["取值范围", "不涉及。"],
      ["默认取值", "不涉及。"]
    ]),
    title: formatParameterDoc([
      ["参数解释", "工作项标题。MCP 字段 title 会映射到 CodeArts 创建工作项 API 的 name 字段。"],
      ["约束限制", "创建工作项时必填；工具侧要求不能为空。建议用一句话说明要处理的问题或需求。"],
      ["取值范围", "字符串。"],
      ["默认取值", "不涉及。"]
    ]),
    work_item_type: formatParameterDoc([
      [
        "参数解释",
        "工作项类型。MCP 字段 work_item_type 会映射到 CodeArts 创建工作项 API 的 tracker_id 字段；可填写类型名称或数字 ID，工具会自动转换为 tracker_id。"
      ],
      [
        "约束限制",
        "创建子工作项时父子类型需符合层级关系：Epic 只能作为 Feature 的父工作项类型；Feature 只能作为 Story 的父工作项类型；Story 只能作为任务/Task、缺陷/Bug 的父工作项类型。"
      ],
      [
        "取值范围",
        "2（任务/Task，可填 task 或 2）；<br>3（缺陷/Bug，可填 bug 或 3）；<br>5（Epic，可填 epic 或 5）；<br>6（Feature，可填 feature 或 6）；<br>7（Story，可填 story 或 7）。"
      ],
      ["默认取值", "不涉及。"]
    ]),
    parent_work_item_id: formatParameterDoc([
      [
        "参数解释",
        "父工作项 ID。MCP 字段 parent_work_item_id 会映射到 CodeArts 创建工作项 API 的 parent_issue_id 字段。"
      ],
      ["约束限制", "创建子工作项时必填；父工作项类型 tracker_id 不能为 2（任务/Task）或 3（缺陷/Bug）。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    description: formatParameterDoc([
      ["参数解释", "工作项描述，用于补充需求背景、问题现象、验收标准或处理说明。"],
      ["约束限制", "可以为空。"],
      ["取值范围", "最小长度 0。"],
      ["默认取值", "不涉及。"]
    ]),
    priority_id: formatParameterDoc([
      ["参数解释", "工作项优先级。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "1（低）；2（中）；3（高）。"],
      ["默认取值", "不涉及。"]
    ]),
    iteration_id: formatParameterDoc([
      ["参数解释", "迭代 ID，可通过获取指定项目的迭代列表接口获取。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    module_id: formatParameterDoc([
      ["参数解释", "模块 ID，可在“设置 - 工作项设置 - 模块设置”中创建或查看模块。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    severity_id: formatParameterDoc([
      ["参数解释", "重要程度。通常用于缺陷、问题等级等场景。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "10（关键）；<br>11（重要）；<br>12（一般）；<br>13（提示）。"],
      ["默认取值", "不涉及。"]
    ]),
    assigned_id: formatParameterDoc([
      ["参数解释", "处理人数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    developer_id: formatParameterDoc([
      ["参数解释", "开发人员数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    done_ratio: formatParameterDoc([
      ["参数解释", "工作项完成度。"],
      ["约束限制", "输入 0 表示完成度为 0%，输入 100 表示完成度为 100%。"],
      ["取值范围", "最小值 0，最大值 100。"],
      ["默认取值", "不涉及。"]
    ]),
    expected_work_hours: formatParameterDoc([
      ["参数解释", "预计工时。"],
      ["约束限制", "可以为空。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    start_date: formatParameterDoc([
      ["参数解释", "开始时间。对应 CodeArts 创建工作项文档中的开始时间语义。"],
      ["约束限制", "工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `begin_time` 字段（YYYY-MM-DD）提交。"],
      ["取值范围", "正整数毫秒时间戳。"],
      ["默认取值", "不涉及。"]
    ]),
    due_date: formatParameterDoc([
      ["参数解释", "结束时间。对应 CodeArts 创建工作项文档中的结束时间语义。"],
      ["约束限制", "工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `end_time` 字段（YYYY-MM-DD）提交。"],
      ["取值范围", "正整数毫秒时间戳。"],
      ["默认取值", "不涉及。"]
    ])
  };

  const reqCreateIterationWorkItemDescriptions: Record<string, string> = {
    ...reqCreateWorkItemDescriptions,
    iteration_id: formatParameterDoc([
      ["参数解释", "迭代 ID，用于指定本次创建的工作项归属到哪个迭代。可通过获取指定项目的迭代列表接口获取。"],
      ["约束限制", "创建迭代工作项时必填；正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ])
  };

  const reqCreatePlanWorkItemDescriptions: Record<string, string> = {
    ...reqCreateWorkItemDescriptions,
    plan_id: formatParameterDoc([
      ["参数解释", "计划 ID，用于指定本次创建的工作项归属到哪个计划。可通过计划列表接口获取。"],
      ["约束限制", "创建计划工作项时必填；正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    iteration_id: formatParameterDoc([
      ["参数解释", "迭代 ID，用于指定工作项关联的迭代。可通过获取指定项目的迭代列表接口获取。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    status_id: formatParameterDoc([
      ["参数解释", "工作项状态 ID。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "1（新建）；<br>2（进行中）；<br>3（已解决）；<br>4（测试中）；<br>5（已关闭）；<br>6（已拒绝）。"],
      ["默认取值", "不涉及。"]
    ]),
    start_date: formatParameterDoc([
      ["参数解释", "开始时间。对应 CodeArts 规划工作项创建接口中的 start_date 字段。"],
      ["约束限制", "工具侧接收毫秒时间戳整数，并按 CodeArts `start_date` 字段原样提交。"],
      ["取值范围", "正整数毫秒时间戳。"],
      ["默认取值", "不涉及。"]
    ]),
    due_date: formatParameterDoc([
      ["参数解释", "结束时间。对应 CodeArts 规划工作项创建接口中的 due_date 字段。"],
      ["约束限制", "工具侧接收毫秒时间戳整数，并按 CodeArts `due_date` 字段原样提交。"],
      ["取值范围", "正整数毫秒时间戳。"],
      ["默认取值", "不涉及。"]
    ])
  };

  const reqUpdateWorkItemDescriptions: Record<string, string> = {
    project_id: reqCreateWorkItemDescriptions.project_id,
    work_item_id: formatParameterDoc([
      ["参数解释", "工作项 ID。MCP 字段 work_item_id 会映射到 CodeArts 更新工作项 API 路径参数 issue_id。可通过高级查询工作项接口获取，响应消息体中的 id 字段值就是工作项 ID。"],
      ["约束限制", "长度在 1 位到 10 位之间的纯数字。"],
      ["取值范围", "最小长度：1，最大长度：10。"],
      ["默认取值", "不涉及。"]
    ]),
    title: formatParameterDoc([
      ["参数解释", "工作项标题。MCP 字段 title 会映射到 CodeArts 更新工作项 API 的 name 字段。"],
      ["约束限制", "更新时可选；不传则不修改标题。"],
      ["取值范围", "字符串。"],
      ["默认取值", "不涉及。"]
    ]),
    work_item_type: formatParameterDoc([
      [
        "参数解释",
        "工作项类型。MCP 字段 work_item_type 会映射到 CodeArts 更新工作项 API 的 tracker_id 字段；可填写类型名称或数字 ID，工具会自动转换为 tracker_id。"
      ],
      ["约束限制", "正则表达式：\\d+。更新时可选；不传则不修改工作项类型。"],
      ["取值范围", "2（任务/Task，可填 task 或 2）；<br>3（缺陷/Bug，可填 bug 或 3）；<br>5（Epic，可填 epic 或 5）；<br>6（Feature，可填 feature 或 6）；<br>7（Story，可填 story 或 7）。"],
      ["默认取值", "不涉及。"]
    ]),
    description: formatParameterDoc([
      ["参数解释", "工作项描述信息。"],
      ["约束限制", "更新时可选；不传则不修改描述。"],
      ["取值范围", "字符串。"],
      ["默认取值", "不涉及。"]
    ]),
    status_id: formatParameterDoc([
      ["参数解释", "工作项状态 ID。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "1（新建）；<br>2（进行中）；<br>3（已解决）；<br>4（测试中）；<br>5（已关闭）；<br>6（已拒绝）。"],
      ["默认取值", "不涉及。"]
    ]),
    priority_id: formatParameterDoc([
      ["参数解释", "工作项优先级。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "1（低）；<br>2（中）；<br>3（高）。"],
      ["默认取值", "不涉及。"]
    ]),
    iteration_id: formatParameterDoc([
      ["参数解释", "迭代 ID。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    module_id: formatParameterDoc([
      ["参数解释", "模块 ID。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    severity_id: formatParameterDoc([
      ["参数解释", "重要程度。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "10（关键）；<br>11（重要）；<br>12（一般）；<br>13（提示）。"],
      ["默认取值", "不涉及。"]
    ]),
    assigned_id: formatParameterDoc([
      ["参数解释", "处理人数字 ID，可通过获取指定项目的成员用户列表接口获取项目成员的用户数字 ID。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    developer_id: formatParameterDoc([
      ["参数解释", "开发者数字 ID。"],
      ["约束限制", "正则表达式：\\d+。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    done_ratio: formatParameterDoc([
      ["参数解释", "工作项完成度。例如输入 20，表示完成度为 20%。"],
      ["约束限制", "正则表达式：(100|[1-9]?\\d)。"],
      ["取值范围", "最小值 0，最大值 100。"],
      ["默认取值", "不涉及。"]
    ]),
    expected_work_hours: formatParameterDoc([
      ["参数解释", "预计工时。"],
      ["约束限制", "不涉及。"],
      ["取值范围", "最小值 0。"],
      ["默认取值", "不涉及。"]
    ]),
    start_date: formatParameterDoc([
      ["参数解释", "开始时间。对应 CodeArts 更新工作项文档中的开始时间语义。"],
      ["约束限制", "工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `begin_time` 字段（YYYY-MM-DD）提交；不传则不修改开始时间。"],
      ["取值范围", "正整数毫秒时间戳。"],
      ["默认取值", "不涉及。"]
    ]),
    due_date: formatParameterDoc([
      ["参数解释", "结束时间。对应 CodeArts 更新工作项文档中的结束时间语义。"],
      ["约束限制", "工具侧接收毫秒时间戳整数，按北京时区日期转换为 CodeArts `end_time` 字段（YYYY-MM-DD）提交；不传则不修改结束时间。"],
      ["取值范围", "正整数毫秒时间戳。"],
      ["默认取值", "不涉及。"]
    ])
  };
  const reqGetWorkItemIssueDetailsDescriptions: Record<string, string> = {
    include:
      "兼容旧调用参数；工具会将该值透传给官方原始 `IssueDetailsV2 /v2/issues/show`，默认值为 `children,parent`，不会用于其他详情或评论接口。"
  };

  const toolDescriptions: Record<string, Record<string, string>> = {
    req_create_work_item: reqCreateWorkItemDescriptions,
    req_create_iteration_work_item: reqCreateIterationWorkItemDescriptions,
    req_create_plan_work_item: reqCreatePlanWorkItemDescriptions,
    req_update_work_item: reqUpdateWorkItemDescriptions,
    req_get_work_item_issue_details: reqGetWorkItemIssueDetailsDescriptions
  };

  return toolDescriptions[toolName]?.[name];
}

function describeParameter(name: string) {
  const exactDescriptions: Record<string, string> = {
    access_key: "华为云访问密钥 ID，用于当前 MCP 会话鉴权。",
    secret_key: "华为云访问密钥 Secret，仅用于签名鉴权，请勿写入日志或公开文档。",
    region: "华为云区域标识，例如 cn-north-4。",
    dry_run: "为 true 时仅做参数校验和请求预览，不执行真实写入；需要真正创建、更新或删除时设为 false。",
    project_id: "CodeArts 项目的唯一标识，用于确定本次操作所属项目。不同服务可能使用项目 UUID、项目数字 ID 或租户下项目标识，请以对应查询接口返回值为准。",
    project_uuid: "CodeArts 项目 UUID，常用于 Repo 仓库创建、仓库查询和项目级资源定位。可通过项目列表或控制台项目详情获取。",
    tenant_id: "租户 ID 或 CodeArts 租户级项目标识，用于制品仓等服务定位当前租户/项目空间。",
    domain_id: "租户账号 ID，也称 domainId，用于按租户维度查询 CodeArts 资源。",
    repository_id: "CodeArts Repo 代码仓库 ID 或 UUID，用于定位具体仓库。仓库列表接口通常会同时返回数字 ID 和 UUID。",
    repository_uuid: "CodeArts Repo 代码仓库 UUID，用于定位具体仓库，适合跨接口传递。",
    merge_request_iid: "合并请求在当前仓库内的 IID；它不是全局 ID，只在同一个仓库内唯一。",
    branch_name: "Git 分支名称，例如 master、main、develop 或 feature/login。",
    tag_name: "Git 标签名称，例如 v1.0.0。",
    ref: "Git 引用，可以填写分支名、标签名或提交 SHA，用于指定读取文件、提交或比较的版本。",
    file_path: "仓库内文件路径，从仓库根目录开始填写，例如 src/index.ts；不要带仓库 URL。",
    commit_sha: "Git 提交 SHA，用于精确定位一次提交；可填写完整 SHA，部分接口也支持短 SHA。",
    page: "页码，从服务端约定的起始页开始，用于 page/page_size 分页。",
    page_index: "页码或页索引，用于分页查询；起始值以对应接口约定为准。",
    page_size: "每页数量，用于分页查询；建议按接口限制设置，避免一次返回过多数据。",
    offset: "分页偏移量，表示从结果集第几条开始返回，常与 limit 配合使用。",
    limit: "分页数量上限，表示本次最多返回多少条记录。",
    keyword: "搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。",
    key_word: "搜索关键字，用于按名称、标题、编号、路径等文本条件过滤列表。",
    search: "搜索关键字，用于按名称、标题、编号等文本条件过滤列表。",
    query: "查询条件或搜索表达式，用于过滤列表结果；具体支持的字段由对应接口决定。",
    qname: "制品仓仓库名称查询关键字，用于按仓库名模糊搜索。",
    sort: "排序方向。asc 表示升序，desc 表示降序。",
    sort_by: "排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。",
    sort_key: "排序字段，用于选择服务端排序依据，例如 created_at、updated_at、name。",
    sort_order: "排序方向。asc 表示升序，desc 表示降序。",
    sort_info: "排序配置，通常包含排序字段和排序方向。",
    order_by: "排序字段，用于选择服务端排序依据。",
    name: "名称字段，用于创建、更新或按名称查询资源。建议填写能区分业务含义的短名称。",
    repo_name: "仓库名称。制品仓场景表示制品仓仓库名；Repo 场景表示代码仓库名。",
    description: "描述信息，用于补充资源用途、背景或变更说明，便于后续维护和检索。",
    title: "标题，用于工作项、合并请求、计划等资源的主显示名称。建议简洁说明要做什么。",
    state: "状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。",
    status: "状态过滤条件或目标状态。用于列表查询时表示筛选状态，用于更新/流转时表示要变更到的目标状态；具体取值以对应资源的状态字典为准。",
    status_id: "工作项状态 ID：1=新建，2=进行中，3=已解决，4=测试中，5=已关闭，6=已拒绝。项目自定义状态以状态配置/工作流接口返回为准。",
    tracker_id: "Scrum 工作项类型 ID：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。",
    tracker_ids: "Scrum 工作项类型 ID 列表：2=Task/任务，3=Bug/缺陷，5=Epic，6=Feature，7=Story。",
    work_item_type: "参数解释：<br>工作项类型，用于指定创建或更新的 CodeArts Scrum 工作项类型。工具会把填写的类型名称或数字 ID 自动转换为 CodeArts 需要的 tracker_id。<br>约束限制：<br>创建子工作项时，父子类型需符合层级关系：Epic 只能作为 Feature 的父工作项类型；Feature 只能作为 Story 的父工作项类型；Story 只能作为 Task/任务、Bug/缺陷的父工作项类型。未创建子工作项时不涉及该限制。<br>取值范围：<br>2（任务/Task，可填 task 或 2）；<br>3（缺陷/Bug，可填 bug 或 3）；<br>5（Epic，可填 epic 或 5）；<br>6（Feature，可填 feature 或 6）；<br>7（Story，可填 story 或 7）。<br>默认取值：<br>不涉及。创建类接口必填；更新接口不传则不修改工作项类型。",
    role_id: "项目成员角色 ID：-1=项目创建者，3=项目经理，4=开发人员，5=测试经理，6=测试人员，7=参与者，8=浏览者，9=运维经理；部分接口还允许 10、11 等扩展角色，以租户配置为准。",
    priority_id: "工作项优先级 ID。创建工作项未传时默认使用 2；具体优先级名称和可选值以项目字段配置/优先级选项接口返回为准。",
    severity_id: "严重程度 ID。通常用于缺陷或问题等级；可通过 req_list_issue_severities 查询当前可用严重程度。",
    created_after: "创建时间下界，通常使用 ISO 8601 时间字符串。",
    created_before: "创建时间上界，通常使用 ISO 8601 时间字符串。",
    finished_after: "完成时间下界，通常使用 ISO 8601 时间字符串。",
    finished_before: "完成时间上界，通常使用 ISO 8601 时间字符串。",
    source_type: "导入来源类型，例如 gitee、github、gitlab、git、svn 等。",
    source_url: "待导入的源仓库 HTTPS URL；工具会按 CodeArts Repo 要求转换为 Base64 import_url。",
    source_repo_id: "第三方平台源仓库 ID；从 Gitee 等平台仓库列表选择导入时可传。",
    source_full_name: "第三方平台源仓库完整名称，例如 owner/repo。",
    source_visibility: "第三方平台源仓库可见性，例如 public 或 private。",
    source_username: "源仓库 HTTPS 认证用户名；私有仓库导入时可与 source_token 一起使用。",
    source_token: "源仓库 HTTPS 认证令牌或密码；工具只用于拼接并编码 import_url，不会在结果中明文回显。",
    import_type: "导入类型。页面从 Gitee 导入时通常为 git。",
    fetch_refs_type: "导入引用范围。default 表示默认分支，all 表示全部引用。",
    codecheck: "导入后是否启用代码检查，0 表示不启用，1 表示启用。",
    mirror_repository: "是否创建为镜像仓，0 表示普通导入，1 表示镜像仓。",
    security_level: "仓库安全级别配置。",
    importUrlEncoding: "导入 URL 的编码方式。",
    source_branch: "源分支名称。创建合并请求时表示要合入的分支，例如 feature/login。",
    target_branch: "目标分支名称。创建合并请求时表示被合入的分支，例如 master、main 或 develop。",
    target_project_id: "目标项目 ID，用于跨项目迁移、复制或创建目标资源。",
    source_project_id: "源项目 ID，用于跨项目复制、迁移或关联场景中定位来源项目。",
    src_project_id: "源项目 ID，用于跨项目复制、迁移或关联场景中定位来源项目。",
    from_project_id: "来源项目 ID，用于迁移、复制或移动资源时定位原项目。",
    to_project_id: "目标项目 ID，用于迁移、复制或移动资源时定位新项目。",
    assignee_id: "负责人用户 ID，用于指定工作项、任务或评审的当前处理人。",
    reviewer_ids: "评审人用户 ID 列表。",
    remove_source_branch: "合并后是否删除源分支。",
    should_remove_source_branch: "合并后是否删除源分支。",
    squash: "是否压缩提交。",
    draft: "是否创建为草稿合并请求。",
    labels: "标签列表或逗号分隔的标签字符串。",
    milestone_id: "里程碑 ID。",
    action_type: "评审动作类型，例如通过、拒绝、重新打开或提交评论；可选值以对应评审接口为准。",
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
    mirroring_enabled: "是否启用远程镜像。",
    path: "资源路径。制品仓场景表示制品或目录路径；代码仓场景表示仓库内文件路径。通常从仓库或制品仓根目录开始填写。",
    format: "制品仓仓库格式或制品格式，例如 maven、npm、pypi、generic、docker 等；实际可选值以制品仓配置为准。",
    format_list: "制品仓仓库格式列表，用于一次按多个仓库格式过滤。",
    type: "类型字段，用于区分资源类别、操作类别或查询类别；具体取值以该接口的业务对象为准。",
    category: "分类字段，用于按资源类别、工作项分类或制品分类过滤；具体字典以对应接口返回为准。",
    priority: "优先级。需求管理场景通常表示工作项优先级；具体名称和取值以项目字段配置为准。",
    severity: "严重级别。代码检查场景表示问题严重程度；需求管理场景表示缺陷严重程度。",
    defect_level: "缺陷等级或问题等级，用于代码检查问题过滤；常见值按服务端规则集返回为准。",
    checker: "检查规则或检查器名称，用于代码检查问题过滤。",
    language: "代码语言或技术栈，例如 Java、JavaScript、TypeScript、Python、Go；可选值以代码检查服务支持范围为准。",
    git_branch: "Git 分支名称，用于代码检查、构建或流水线运行时指定代码来源分支。",
    branch: "Git 分支名称，用于构建、流水线或代码仓操作时指定代码来源分支。",
    build_no: "构建编号，用于定位某一次构建执行记录。",
    build_number: "构建编号，用于定位某一次构建执行记录。",
    version: "版本号。制品仓场景表示制品版本；插件或模板场景表示对应资源版本。",
    package_version: "发布包或制品版本号，用于上传、查询或归档构建产物。",
    build_version: "构建产物版本号，用于发布上传步骤中标识本次产物版本。",
    content: "正文内容。评论、文件或请求体场景下表示要提交的文本内容。",
    body: "请求体或正文内容。复杂接口会把多个业务字段放在 body 中提交。",
    data: "业务数据对象，承载接口需要提交或返回的结构化内容。",
    params: "参数对象，承载接口需要透传给下游任务、部署步骤或流水线的键值配置。",
    rules: "规则配置列表或规则表达式，用于代码检查、流水线准入、字段校验等场景。",
    configs: "配置项列表或配置对象，用于创建部署任务、模板任务或执行参数。",
    variables: "变量列表或变量对象，用于构建、流水线、部署等执行时注入参数。",
    filter: "过滤条件对象或过滤表达式，用于缩小查询范围。",
    filter_mode: "过滤模式，用于指定多个过滤条件之间的匹配方式，例如全部匹配或任一匹配。",
    include: "包含项配置，用于指定接口额外返回哪些关联信息。",
    include_paths: "包含路径列表，代码检查或扫描时只分析这些路径下的文件。",
    exclude_dir: "排除目录列表，代码检查或扫描时跳过这些目录。",
    include_deleted: "是否包含已删除资源。true 表示把已删除记录也纳入查询结果。",
    include_weekend: "是否包含周末。用于工时、排期或日期范围计算。",
    include_tenant_rule_set: "是否包含租户级规则集。true 表示查询结果中包含租户公共规则集。",
    start_date: "开始日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。",
    end_date: "结束日期，通常使用 yyyy-MM-dd 或接口要求的日期格式。",
    due_date: "截止日期，表示工作项、计划或任务期望完成时间。",
    plan_start_date: "计划开始日期，用于工作项、迭代、计划或测试计划的排期。",
    plan_end_date: "计划结束日期，用于工作项、迭代、计划或测试计划的排期。",
    begin_time: "开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。",
    end_time: "结束时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。",
    start_time: "开始时间，通常使用时间戳或 ISO 8601 时间字符串，具体格式以接口要求为准。",
    created_time: "创建时间过滤条件或创建时间值，通常使用时间戳或 ISO 8601 时间字符串。",
    created_date: "创建日期过滤条件或创建日期值，通常使用 yyyy-MM-dd 或接口要求的日期格式。",
    modified_date: "修改日期过滤条件或修改日期值，通常使用 yyyy-MM-dd 或接口要求的日期格式。",
    closed_time: "关闭时间过滤条件或关闭时间值，通常使用时间戳或 ISO 8601 时间字符串。",
    updated_time_interval: "更新时间范围，用于按最近更新时间过滤列表。",
    created_time_interval: "创建时间范围，用于按创建时间过滤列表。",
    operated_time_interval: "操作时间范围，用于按操作发生时间过滤列表。",
    work_date_begin: "工时开始日期，用于按登记工时的日期范围查询。",
    work_date_end: "工时结束日期，用于按登记工时的日期范围查询。",
    work_hours_dates: "工时日期列表，用于批量登记或查询多个日期的工时。",
    done_ratio: "完成百分比，通常为 0 到 100 的整数，用于表示工作项或任务完成进度。",
    expected_work_hours: "预计工时，表示完成工作项或任务预计需要投入的小时数。",
    work_hours: "实际工时或工时明细，用于登记、更新或查询工作量。",
    workhour: "工时值，用于登记或统计工作量。",
    workload: "工作量，用于计划、迭代或成员维度的容量/投入统计。",
    workload_man_day: "人天工作量，用于计划或统计场景中的容量评估。",
    work_hour_type: "工时类型，用于区分开发、测试、评审等工时分类；具体字典以项目配置为准。",
    work_hours_types: "工时类型列表，用于按多个工时分类查询或统计。",
    work_hour_category: "工时分类，用于区分不同来源或用途的工时记录。",
    subject: "主题或摘要，用于工作项、评论、通知等内容的简短说明。",
    summary: "摘要信息，用于概括问题、需求或执行结果。",
    reason: "原因说明，用于取消、拒绝、关闭或回滚等操作的补充说明。",
    operator: "操作人标识，表示执行本次操作的用户。",
    owner: "拥有者或负责人标识，用于按资源归属过滤或设置归属人。",
    assignee: "处理人或负责人标识，用于指定当前责任人或按责任人过滤。",
    reviewer: "评审人标识，用于指定或过滤代码评审、需求评审等参与人。",
    approver: "审批人标识，用于指定或过滤审批节点处理人。",
    cc: "抄送人列表或抄送人标识，用于通知相关人员。",
    ccbs: "抄送人或关注人集合，用于工作项通知、评审通知等场景。",
    color: "颜色值，用于标签、状态或看板显示配置，通常为十六进制颜色。",
    display_value: "显示值，表示字段在界面上展示给用户看的文本。",
    code: "编码或编号，用于标识规则、字段、状态或业务对象。",
    uuid: "UUID，全局唯一标识，用于精确定位项目、仓库、流水线或其他资源。",
    id: "资源 ID，表示当前接口操作对象的唯一标识。具体含义由所在 API 决定，例如工作项 ID、记录 ID、任务 ID。",
    number: "编号，用于工作项、构建、执行记录等资源的人类可读序号。",
    field_code: "字段编码，用于定位自定义字段或系统字段。",
    field_type: "字段类型，用于描述自定义字段的数据类型，例如文本、数字、日期、枚举等。",
    status_attribute: "状态属性，用于描述状态的类别或流转属性。",
    issue_type: "问题类型或工作项类型，用于按需求、缺陷、任务等类型过滤。",
    issue_category: "问题分类，用于按缺陷、风险、代码问题等类别过滤。",
    test_case_type: "测试用例类型，用于区分手工用例、自动化用例等。",
    business_type: "业务类型，用于按服务或场景区分不同资源。",
    business_domain: "业务领域，用于按产品线、业务域或团队范围分类。",
    metric_type: "指标类型，用于选择要查询或统计的度量项。",
    date_range: "日期范围，用于统计或列表查询的时间窗口。",
    query_type: "查询类型，用于切换不同查询口径或筛选范围。",
    create_type: "创建类型，用于区分手工创建、模板创建、复制创建等来源。",
    deploy_type: "部署类型，用于区分主机部署、容器部署、函数部署等部署方式；具体取值以部署服务为准。",
    cluster_type: "集群类型，用于区分主机集群、Kubernetes 集群或代理集群等。",
    slave_resource_type: "从资源类型，用于部署应用关联从属资源时标识资源类别。",
    os: "操作系统类型，例如 Linux 或 Windows；用于部署环境、主机或运行时选择。",
    trigger: "触发方式，用于区分手动触发、定时触发、代码提交触发等执行来源。",
    timeout: "超时时间，通常以秒或分钟为单位，超过后任务会被服务端终止。",
    authorization: "授权信息，用于访问受保护资源；请勿在日志或公开文档中暴露敏感值。",
    agency_urn: "委托 URN，用于部署等服务通过云委托访问其他云资源。",
    arrange_infos: "编排信息列表，用于描述部署任务或应用下各步骤的执行顺序和参数。",
    execute_list: "执行列表，用于指定要运行的用例、任务、步骤或节点集合。",
    need_approval: "是否需要审批。true 表示执行前需要审批流程通过。",
    is_draft: "是否为草稿。true 表示创建为草稿状态，暂不正式生效或发布。",
    is_valid: "是否有效。true 表示启用或有效，false 表示停用或无效。",
    is_recycle_bin: "是否查询回收站。true 表示查询已删除或回收站中的制品仓资源。",
    is_project_group: "是否为项目群。true 表示按项目群维度处理。",
    is_src: "是否为源对象。true 表示该对象作为来源侧参与操作。",
    is_watched: "是否已关注。true 表示当前用户已关注该资源。",
    need_break: "是否中断后续流程。true 表示满足条件后停止继续执行。",
    replace_existing: "是否替换已存在文件或目录。true 表示存在同名内容时覆盖。",
    remain_origin_path: "是否保留原始路径。true 表示上传制品时保留本地目录结构。",
    continue_on_failure: "失败后是否继续。true 表示当前步骤失败后仍继续后续步骤。",
    local_attachment_names: "本地附件名称列表，用于上传或绑定附件时对应本地文件名。",
    attachWikis: "是否关联 Wiki 内容或关联的 Wiki 列表，具体结构以对应接口为准。",
    attachDocuments: "是否关联文档或关联的文档列表，具体结构以对应接口为准。",
    label_type: "标签类型，用于区分系统标签、自定义标签或业务标签。",
    old_status: "原状态，用于状态流转、历史记录或变更校验。",
    over_type: "完成或结束类型，用于区分正常结束、手动结束、超时结束等场景。",
    flow_code: "流程编码，用于定位工作流、审批流或状态流转流程。",
    process_context: "流程上下文，承载工作流或审批流执行所需的变量和状态。",
    opinions: "意见内容列表，用于审批、评审或评论场景。",
    cos: "坐标或制品定位信息，通常用于制品仓内定位组织、仓库、包名、版本等层级。",
    image: "镜像名称或镜像地址，用于构建、部署或运行环境选择。",
    image_uri: "镜像 URI，用于指定容器镜像完整地址。",
    command: "命令行内容，用于构建、部署或脚本步骤执行。",
    pre_condition: "前置条件表达式，满足条件时才执行对应步骤。",
    upload_tool: "上传工具类型，用于选择发布包或制品上传方式。",
    custom_upload_path: "自定义上传路径，用于指定制品上传到仓库中的目标目录。",
    output_file: "输出文件路径，用于保存生成的包、归档或运行时文件。",
    staging_dir: "临时目录路径，用于打包、构建或生成运行时文件。",
    file: "文件路径或文件内容。具体含义取决于所在接口：上传场景通常是文件路径，配置场景可能是文件名或配置内容。",
    module: "模块名称或模块标识，用于按功能模块过滤或定位资源。",
    repo: "仓库名称或仓库标识，用于定位代码仓或制品仓资源。",
    end_offset: "日志结束偏移量，用于增量读取部署或构建日志。",
    resource_id: "资源 ID，用于定位审计、附件、制品或业务资源。具体资源类型由所在 API 决定。",
    parent_id: "父级 ID，用于指定当前资源挂载到哪个父节点、父分组、父模块或父工作项下。",
    extra_fields: "扩展字段对象，用于填写项目自定义字段或当前接口未单独展开的业务字段。",
    plugin_attribution: "插件归属信息，用于标识插件来源、所属服务或扩展点。",
    plugin_version: "插件版本号，用于指定安装、查询或运行的插件版本。",
    plan: "计划信息对象，用于提交计划名称、周期、负责人、状态等计划相关字段。",
    plan_iteration: "计划迭代信息，用于指定计划关联的迭代或迭代范围。",
    plan_pi: "PI 计划信息，用于 IPD/敏捷场景中关联或过滤 Program Increment。",
    baseline: "基线信息或是否启用基线，用于需求、计划、测试等资源的版本基准管理。",
    dividend: "被除数，用于统计指标或计算公式。",
    divisor: "除数，用于统计指标或计算公式。",
    created_by: "创建人标识，用于按创建人过滤或展示资源来源。",
    copy_comments: "是否复制评论。true 表示复制资源时一并复制评论记录。",
    copy_work_hours: "是否复制工时。true 表示复制工作项时一并复制工时记录。",
    import_members: "是否导入成员。true 表示导入仓库或项目资源时同步导入成员关系。",
    enable_readme: "是否初始化 README 文件。true 表示创建仓库时自动生成 README。",
    visibility_level: "仓库可见性级别。常见取值与 CodeArts Repo/GitLab 风格一致，例如 private/internal/public 对应的数字级别；以接口返回为准。",
    with_stats: "是否返回统计信息。true 表示结果中附带数量、占比或汇总指标。",
    src_domain: "源租户或源账号标识，用于跨租户、跨账号迁移或复制场景。",
    operate: "操作名称或操作标识，用于指定要执行的业务动作。",
    operate_type: "操作类型，用于区分新增、更新、删除、移动、恢复等动作。",
    is_recover: "是否恢复资源。true 表示从删除、归档或回收状态恢复。",
    is_permanent_delete: "是否永久删除。true 表示绕过回收站直接彻底删除，请谨慎使用。",
    attribute: "属性信息对象，用于提交字段属性、状态属性或资源扩展属性。",
    members: "成员列表，用于批量添加、导入或过滤项目/仓库/团队成员。",
    issues: "工作项或问题列表，用于批量处理、关联或查询多个问题。",
    submitted_by: "提交人标识，用于按提交人过滤评审、审批或记录。",
    show_type: "展示类型，用于控制列表、看板或统计结果的展示口径。",
    user_type: "用户类型，用于区分项目成员、租户用户、外部用户等。",
    group_sort: "分组排序方式，用于控制分组列表或看板列的显示顺序。",
    position_float: "排序位置值，用于在列表、看板或模块树中调整节点位置。",
    new_position: "新的排序位置，用于移动工作项、模块、分组或节点。",
    journalized_type: "历史记录类型，用于过滤工作项变更、评论、状态流转等动态。",
    sort_dir: "排序方向。asc 表示升序，desc 表示降序。",
    order_by_date: "按日期排序或过滤的日期字段，用于选择创建时间、更新时间、结束时间等口径。",
    assigned_cc: "抄送处理人或协同处理人列表，用于工作项通知和协作。",
    expect_delivery_time: "期望交付时间，用于需求、特性或计划的目标交付日期。",
    recipient: "接收人标识或接收人列表，用于通知、消息或交付场景。",
    classification: "分类标识，用于按业务分类、测试分类或资源分类过滤。",
    layout_content: "布局内容配置，用于页面、看板或表单布局的结构化配置。",
    trigger_source: "触发来源，用于标识任务由手动、定时、代码提交、流水线等来源触发。",
    connection_status: "连接状态，用于过滤主机、服务端点、镜像或外部系统连接结果。",
    locations: "位置列表，用于描述资源部署位置、文件位置或组织层级位置。",
    maintainer: "维护人标识，用于指定资源维护负责人。",
    tags: "标签列表，用于给资源打标或按标签过滤。",
    product_line: "产品线，用于按业务产品线归类或过滤需求、计划、缺陷等资源。",
    ip: "IP 地址，用于主机、集群、代理或部署目标定位。",
    cascade: "是否级联查询或级联操作。true 表示包含下级资源或对子资源同步处理。",
    properties: "属性配置对象，用于构建步骤、部署步骤或插件步骤的键值参数。",
    enable: "是否启用。true 表示启用该配置、步骤、规则或能力。",
    resource_pool_type: "资源池类型，用于选择构建、检查或部署使用的执行资源池。",
    as_proxy: "是否作为代理使用。true 表示该主机、节点或连接用于代理访问。",
    key_field: "关键字段名，用于指定排序、分组、统计或去重时使用的字段。",
    task_type: "任务类型，用于区分构建任务、检查任务、部署任务或测试任务。",
    use_condition: "使用条件表达式，满足条件时才使用该配置、规则或步骤。",
    caller: "调用方标识，用于审计或区分请求来源。",
    until: "结束边界。常用于时间范围、提交范围或分页游标的截止位置。",
    since: "起始边界。常用于时间范围、提交范围或分页游标的开始位置。",
    message: "消息内容或提交说明。代码仓场景常用于提交信息，通知场景用于消息正文。",
    view: "视图类型或视图配置，用于控制列表、看板、树形等展示方式。",
    pipelines: "流水线列表，用于批量查询、批量运行或关联多条流水线。",
    is_system: "是否系统内置。true 表示系统预置资源，false 表示用户自定义资源。",
    comp_extend_type: "组件扩展类型，用于区分组件、插件或扩展配置类别。",
    from: "起始引用、来源分支或开始位置。比较代码时通常表示源分支、源标签或源提交。",
    to: "目标引用、目标分支或结束位置。比较代码时通常表示目标分支、目标标签或目标提交。",
    straight: "是否直线比较。代码比较场景下用于控制比较两个引用时的提交范围口径。",
    ignore_whitespace_change: "是否忽略空白字符变化。true 表示代码比较时忽略空格、缩进、换行等差异。"
  };

  if (exactDescriptions[name]) {
    return exactDescriptions[name];
  }

  if (name.endsWith("_id")) {
    const baseName = name.slice(0, -"_id".length);
    return `${describeIdentifierLabel(baseName)} ID，用于定位对应的 CodeArts 资源。`;
  }

  if (name.endsWith("_ids")) {
    const baseName = name.slice(0, -"_ids".length);
    return `${describeIdentifierLabel(baseName)} ID 列表，用于批量定位对应的 CodeArts 资源。`;
  }

  if (name.endsWith("_url")) {
    const baseName = name.slice(0, -"_url".length);
    return `${describeIdentifierLabel(baseName)} URL，用于指定服务地址、资源地址或回调地址。`;
  }

  if (name.endsWith("_name")) {
    const baseName = name.slice(0, -"_name".length);
    return `${describeIdentifierLabel(baseName)}名称。`;
  }

  return "透传字段，工具会按字段名原样提交到 CodeArts；请结合所在 API 的请求示例或控制台字段含义填写。";
}

function describeIdentifierLabel(rawName: string) {
  const exactLabels: Record<string, string> = {
    app: "应用",
    application: "应用",
    assigned: "处理人",
    assignee: "处理人",
    attachment: "附件",
    board: "看板",
    build_project: "构建工程",
    case: "测试用例",
    category: "分类",
    cloud_project: "云项目",
    cluster: "集群",
    comment: "评论",
    developer: "开发人员",
    endpoint: "服务端点",
    environment: "部署环境",
    feature_set: "特性集",
    field: "字段",
    from_project: "来源项目",
    gitignore: "Gitignore 模板",
    group: "分组",
    group_field: "分组字段",
    host: "主机",
    instance: "实例",
    ir: "IR",
    issue: "工作项",
    iteration: "迭代",
    job: "构建任务",
    label: "标签",
    license: "许可证",
    milestone: "里程碑",
    module: "模块",
    move_to_sprint: "目标迭代",
    organization: "组织",
    orchestration: "编排",
    owner: "拥有者",
    owner_user: "拥有者用户",
    parent: "父级资源",
    parent_module: "父模块",
    parent_work_item: "父工作项",
    pipeline: "流水线",
    plugin: "插件",
    plan: "计划",
    program: "项目集",
    proj: "项目",
    record: "执行记录",
    resource: "资源",
    resource_pool: "资源池",
    review: "评审",
    reviewer: "评审人",
    role: "角色",
    rr: "RR",
    rule: "规则",
    rule_set: "规则集",
    run: "运行记录",
    slave_cluster: "从集群",
    snapshot_version: "快照版本",
    source_project: "源项目",
    sprint: "迭代",
    status_config: "状态配置",
    step: "步骤",
    tag: "标签",
    task: "任务",
    template: "模板",
    tenant: "租户",
    to_project: "目标项目",
    user: "用户",
    version: "版本",
    work_hours: "工时",
    work_item: "工作项",
    workhour: "工时",
    workitem: "工作项"
  };

  if (exactLabels[rawName]) {
    return exactLabels[rawName];
  }

  const parts = rawName.split("_").filter(Boolean);
  const label = parts
    .map((part) => resourceChineseNames[part] ?? part)
    .join("");

  return label || "资源";
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

function describeSchemaParameter(
  toolName: string,
  name: string,
  schema: JsonSchemaObject,
  originalSchema: JsonSchemaObject
) {
  const toolDescription = describeToolParameter(toolName, name);
  const baseDescription = toolDescription ??
    (hasKnownParameterDescription(name)
      ? describeParameter(name)
      : schema.description ?? originalSchema.description ?? describeParameter(name));
  const fieldMapping = describeParameterFieldMapping(toolName, name);
  const enumValues = renderEnumValues(schema);
  const descriptionWithMapping = `${formatParameterDoc([["字段对应", fieldMapping]])}<br>${baseDescription}`;

  if (!enumValues || descriptionWithMapping.includes("可选值")) {
    return descriptionWithMapping;
  }

  return `${descriptionWithMapping}可选值：${enumValues}。`;
}

function resolveLocalSchemaRef(schema: JsonSchemaObject, root: JsonSchemaObject) {
  if (!schema.$ref?.startsWith("#/properties/")) {
    return schema;
  }

  const propertyName = schema.$ref.slice("#/properties/".length);
  return root.properties?.[propertyName] ?? schema;
}

function renderParameterTable(toolName: string, inputSchema: unknown) {
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
    const description = describeSchemaParameter(toolName, name, resolvedSchema, propertySchema);
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

function groupToolsByModule(tools: ToolDefinition[]) {
  const sortedTools = sortTools(tools);
  const moduleTools = new Map<string, ToolDefinition[]>();

  for (const tool of sortedTools) {
    const module = getModuleLabel(tool.name);

    moduleTools.set(module, [...(moduleTools.get(module) ?? []), tool]);
  }

  return moduleTools;
}

function renderToolReferenceSection(tool: ToolDefinition) {
  const exampleArguments = buildExampleArguments(tool.inputSchema);

  return [
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
    ...renderParameterTable(tool.name, tool.inputSchema),
    "",
    "输入 JSON Schema：",
    "",
    "```json",
    renderJson(tool.inputSchema),
    "```",
    ""
  ];
}

export function renderFunctionApiReferenceIndex(tools: ToolDefinition[]) {
  const sortedTools = sortTools(tools);
  const moduleTools = groupToolsByModule(sortedTools);
  const lines = [
    "# CodeArts MCP 函数 API 参考",
    "",
    "本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。",
    "",
    "为避免单页过大，完整参数表和 JSON Schema 已按模块拆分到子页面。本页只保留通用调用结构、模块目录和工具索引。",
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
    "| 模块 | API 数量 | 明细文档 |",
    "| --- | ---: | --- |",
    ...Array.from(moduleTools.entries()).map(
      ([module, moduleToolList]) =>
        `| ${getChineseModuleLabel(module)} | ${moduleToolList.length} | [${getModuleReferenceFilename(module)}](./${getModuleReferenceFilename(module)}) |`
    ),
    `| **总计** | **${sortedTools.length}** | |`,
    "",
    "## 字段对应",
    "",
    "各模块明细文档的参数表都包含“字段对应”说明，用来标明 MCP 字段和原始 CodeArts API 字段的关系。字段可能是同名透传，也可能是 MCP 为易用性做过改名或封装后的字段。",
    "",
    "## API 清单",
    "",
    "| 工具 | 模块 | 明细文档 |",
    "| --- | --- | --- |",
    ...sortedTools.map((tool) => {
      const module = getModuleLabel(tool.name);

      return `| \`${tool.name}\` | ${getChineseModuleLabel(module)} | [查看](./${getModuleReferenceFilename(module)}#${tool.name}) |`;
    }),
    ""
  ];

  return `${lines.join("\n").replace(/\r\n/g, "\n")}\n`;
}

export function renderFunctionApiReferenceModule(module: string, tools: ToolDefinition[]) {
  const sortedTools = sortTools(tools);
  const lines = [
    `# CodeArts MCP 函数 API 参考 - ${getChineseModuleLabel(module)}`,
    "",
    "本文档由通过 ToolManifest 校验的 HTTP MCP `tools/list` 注册表生成。不要手工编辑工具条目。",
    "",
    `[返回函数 API 总目录](./${FUNCTION_API_REFERENCE_PATH.split("/").at(-1)})`,
    "",
    `模块：\`${getChineseModuleLabel(module)}\``,
    "",
    `API 数量：\`${sortedTools.length}\``,
    "",
    "所有函数 API 使用同一个 HTTP 入口：`POST /mcp`。JSON-RPC 方法为 `tools/call`，通过 `params.name` 选择具体函数。",
    "",
    "## API 清单",
    "",
    ...sortedTools.flatMap(renderToolReferenceSection)
  ];

  return `${lines.join("\n").replace(/\r\n/g, "\n")}\n`;
}

export function renderFunctionApiReferenceFiles(tools: ToolDefinition[]) {
  const sortedTools = sortTools(tools);
  const moduleTools = groupToolsByModule(sortedTools);

  return [
    {
      path: FUNCTION_API_REFERENCE_PATH,
      content: renderFunctionApiReferenceIndex(sortedTools)
    },
    ...Array.from(moduleTools.entries()).map(([module, moduleToolList]) => ({
      path: getModuleReferencePath(module),
      content: renderFunctionApiReferenceModule(module, moduleToolList)
    }))
  ];
}

export function renderFunctionApiReference(tools: ToolDefinition[]) {
  return renderFunctionApiReferenceIndex(tools);
}

export async function renderCurrentFunctionApiReference() {
  return renderFunctionApiReference(await collectHttpToolDefinitions());
}

export async function renderCurrentFunctionApiReferenceFiles() {
  return renderFunctionApiReferenceFiles(await collectHttpToolDefinitions());
}

export function loadFunctionApiReference(path = FUNCTION_API_REFERENCE_PATH) {
  return readFileSync(path, "utf8");
}

export function normalizeMarkdownForComparison(markdown: string) {
  return markdown.replace(/\r\n/g, "\n");
}

export const functionApiReferencePath = FUNCTION_API_REFERENCE_PATH;
