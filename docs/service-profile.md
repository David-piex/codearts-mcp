# 服务画像

## 当前活跃模块

当前仓库只暴露这 `8` 个 CodeArts 模块：

- Req
- Repo
- Pipeline
- Check
- TestPlan
- Deploy
- Build
- Artifact

## 统一接入模型

- 个人本地使用：`stdio`
- 团队共享部署：`http + auth_configure_session`

## 共享前提与边界

- 默认区域是 `cn-north-4`
- 标准区域通常只需要 `AK/SK + region`
- 如果租户使用非标准路由，各模块仍可单独覆盖自己的 base URL
- 共享模式下，每个 session 使用自己的 `AK/SK`
- 写工具在支持时应优先走 `dry_run`

## 模块特征

- `Req / Repo / Pipeline`
  - 通常是最适合先验证的模块
- `Check / TestPlan / Deploy / Build / Artifact`
  - 更依赖租户里已有的真实业务数据
- `Artifact`
  - 除了 `project_id` 之外，通常还需要 `tenant_id`
- `Deploy`
  - 当前已不再主要受基础资源缺失阻塞，实际主要问题是健康模板路径的 runtime 老旧

## 推荐阅读顺序

1. `README.md`
2. `docs/quickstart.md`
3. `docs/client-examples.md`
4. `docs/tool-examples.md`
5. `docs/wiki/Home.md`
