# 5 分钟快速开始

这份文档适合第一次接触 `codearts-mcp` 的同学。

目标：

- 先把服务跑起来
- 再确认能连上
- 最后完成一次真实查询

## 路线 A：个人本地使用

适合：

- 你自己一个人使用
- 你希望直接在本机接入编码工具

### 第 1 步：安装依赖并构建

```bash
npm install
npm run build
```

### 第 2 步：准备环境变量

至少准备这些值：

```env
HUAWEICLOUD_AK=你的AK
HUAWEICLOUD_SK=你的SK
HUAWEICLOUD_REGION=cn-north-4
HUAWEICLOUD_REQ_BASE_URL=https://projectman-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_REPO_BASE_URL=https://codehub-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_PIPELINE_BASE_URL=https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_CHECK_BASE_URL=https://codecheck-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_TESTPLAN_BASE_URL=https://cloudtest-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_DEPLOY_BASE_URL=https://codearts-deploy.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_BUILD_BASE_URL=https://cloudbuild-ext.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_ARTIFACT_BASE_URL=https://artifact.cn-north-4.myhuaweicloud.cn
HUAWEICLOUD_GOVERN_BASE_URL=https://devsecurity.cn-north-4.myhuaweicloud.com
HUAWEICLOUD_INSPECTOR_BASE_URL=https://vss.myhuaweicloud.com
HUAWEICLOUD_PERFTEST_BASE_URL=https://cpts.cn-north-4.myhuaweicloud.com
MCP_TRANSPORT=stdio
```

补充说明：

- `Inspector` 默认 endpoint 应写成 `https://vss.myhuaweicloud.com`。
- `TestPlan` 所在项目必须先开通测试服务，否则会返回 `CLOUDTEST.00012003`。
- `PerfTest` 需要账号先开通服务，并且工具里的 `project_id` 应传区域 IAM project id。

### 第 3 步：让客户端以 `stdio` 模式启动它

命令目标：

```bash
node D:/Code/codearts-mcp/dist/src/server/index.js
```

如果你的客户端支持 MCP 命令式配置，把上面的命令和环境变量写进去即可。

### 第 4 步：先做一个简单查询

建议先调用：

- `req_list_projects`

示例输入：

```json
{
  "page": 1,
  "page_size": 20
}
```

如果能返回项目列表，说明本地接入基本成功。

## 路线 B：团队共享部署

适合：

- 你们团队想共用一个 MCP 服务
- 每个人都使用自己的华为云权限

### 第 1 步：构建并启动 HTTP 服务

```bash
npm install
npm run build
set MCP_TRANSPORT=http
set MCP_HTTP_PORT=3000
node dist/src/server/index.js
```

### 第 2 步：确认健康检查可访问

打开：

- `http://127.0.0.1:3000/health`

如果有反向代理，则检查你的公网或内网地址，例如：

- `https://your-domain.example.com/health`

### 第 3 步：客户端连接 `/mcp`

客户端目标地址：

- `http://127.0.0.1:3000/mcp`

或者：

- `https://your-domain.example.com/mcp`

### 第 4 步：先配置当前会话凭证

共享模式下，第一步不是直接查业务，而是先调用：

- `auth_configure_session`

示例输入：

```json
{
  "access_key": "你的AK",
  "secret_key": "你的SK",
  "region": "cn-north-4",
  "req_base_url": "https://projectman-ext.cn-north-4.myhuaweicloud.com",
  "repo_base_url": "https://codehub-ext.cn-north-4.myhuaweicloud.com",
  "pipeline_base_url": "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
  "check_base_url": "https://codecheck-ext.cn-north-4.myhuaweicloud.com",
  "testplan_base_url": "https://cloudtest-ext.cn-north-4.myhuaweicloud.com",
  "deploy_base_url": "https://codearts-deploy.cn-north-4.myhuaweicloud.com",
  "build_base_url": "https://cloudbuild-ext.cn-north-4.myhuaweicloud.com",
  "artifact_base_url": "https://artifact.cn-north-4.myhuaweicloud.cn",
  "govern_base_url": "https://devsecurity.cn-north-4.myhuaweicloud.com",
  "inspector_base_url": "https://vss.myhuaweicloud.com",
  "perftest_base_url": "https://cpts.cn-north-4.myhuaweicloud.com"
}
```

### 第 5 步：做一次真实查询

配置完当前会话后，建议先调用：

- `repo_list_repositories`

示例输入：

```json
{
  "project_id": "你的项目ID",
  "page": 1,
  "page_size": 20
}
```

如果能看到仓库列表，说明共享模式接入成功。

## 推荐的首次验证顺序

为了更快定位问题，建议按这个顺序验证：

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`

这样能分别验证：

- Req base URL 是否正确
- Repo base URL 是否正确
- Pipeline base URL 是否正确

## 第一次最常见的问题

### 1. AK/SK 正确，但仍然报认证失败

优先检查：

- 区域是否为 `cn-north-4`
- 三个产品 base URL 是否写对
- 共享模式下是否确实先执行了 `auth_configure_session`

### 2. 某个产品能用，另一个产品不能用

这通常不是 MCP 本身的问题，而是某一个产品的 base URL 配错了。

重点检查：

- `HUAWEICLOUD_REQ_BASE_URL`
- `HUAWEICLOUD_REPO_BASE_URL`
- `HUAWEICLOUD_PIPELINE_BASE_URL`

### 3. 写操作不敢直接执行

先用支持 `dry_run` 的工具预演：

- `req_create_work_item`
- `req_update_work_item`
- `pipeline_run_pipeline`

把 `dry_run` 设为 `true`，先确认参数和意图是否正确。

### 4. `TestPlan / PerfTest / Inspector / Govern` 报错时怎么快速判断

先看错误码，不要先默认是 MCP 实现坏了：

- `CLOUDTEST.00012003`：通常是项目未开通 TestPlan。
- `SVCSTG.CPTS.4031009`：通常是账号未开通 PerfTest。
- `CodeArtsInspector.00009999`：通常表示 Inspector 已进入 ACL / 任务归属校验层，不是路由不存在。
- `APIGW.0106`：如果出现在 `govern_*` detail 接口上，通常表示已经命中官方 SBC 路径，只是参数不合法。

更完整的排障说明见：

- `docs/faq.md`

## 下一步建议

如果你已经完成第一次接入，下一步建议看：

- `README.md`：看全量能力和部署说明
- `docs/client-examples.md`：看通用客户端配置模板
