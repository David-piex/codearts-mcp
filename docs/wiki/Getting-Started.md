# Getting Started

## 1. 安装与构建

```bash
npm install
npm run build
```

## 2. 最小环境变量

```env
HUAWEICLOUD_AK=your-ak
HUAWEICLOUD_SK=your-sk
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

## 3. 启动

```bash
node dist/src/server/index.js
```

## 4. 首次验证顺序

1. `req_list_projects`
2. `repo_list_repositories`
3. `pipeline_list_pipelines`
4. `check_list_rulesets`

这样可以最快区分：

- 凭证/区域是否正常
- 常用 CodeArts endpoint 是否正确
- Check 模块是否走到真实 project-scoped 路径

## 5. 共享 HTTP 模式

如果使用 `http` 模式，每个会话先执行：

- `auth_configure_session`

建议传入完整的产品 base URL，而不是只依赖默认值。

## 6. 最容易踩坑的地方

- `Inspector` endpoint 用 `https://vss.myhuaweicloud.com`
- `PerfTest` 的 `project_id` 是区域 IAM project id
- `TestPlan` 项目没开通时会直接返回 `CLOUDTEST.00012003`
- `PerfTest` 没开通时会返回 `SVCSTG.CPTS.4031009`
