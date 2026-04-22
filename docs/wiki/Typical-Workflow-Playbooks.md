# Typical Workflow Playbooks

这页把项目当前最适合落地的几条调用链，整理成可以直接照着跑的剧本。

和前面的两页分工是这样的：

- [Module-Functions-Overview](./Module-Functions-Overview.md)：讲每个模块分别能做什么
- [Role-Based-Entry-Paths](./Role-Based-Entry-Paths.md)：讲不同角色该先看什么
- 这页：讲一条完整工作流里，工具大致该按什么顺序调用

## 使用原则

先记住 3 条：

1. 永远先跑低风险读工具，再进入写工具
2. `Pipeline / Deploy` 写路径先在受控样本上联调，不要直接放到生产任务上
3. 如果你是共享 `http` 模式，先确认 `auth_configure_session` 已成功

## 剧本 1：开发者查看代码状态并定位构建失败

适合场景：

- 看仓库最近状态
- 看当前 MR 和分支差异
- 看代码检查结果
- 看构建日志和失败原因

推荐调用顺序：

1. `repo_list_repositories`
2. `repo_list_merge_requests`
3. `repo_get_merge_request`
4. `repo_list_merge_request_changes`
5. `check_list_tasks`
6. `check_list_task_issues`
7. `build_list_jobs`
8. `build_list_records`
9. `build_get_real_time_log`
10. `build_get_error_log`

这条链最适合的结果是：

- 先知道代码在哪个仓库、哪个 MR、改了什么
- 再知道质量检查有没有报问题
- 最后定位构建失败发生在哪个步骤和哪段日志

如果你要进一步自动化：

- 可以补 `build_run_job`
- 或者结合 `repo_create_merge_request_discussion` 把分析结果回写到 MR

## 剧本 2：测试 / QA 跟踪需求、用例和流水线执行

适合场景：

- 从需求或缺陷出发看项目状态
- 查测试计划和测试用例
- 看对应流水线最近有没有跑成功

推荐调用顺序：

1. `req_list_projects`
2. `req_list_work_items`
3. `req_get_work_item`
4. `testplan_list_plans`
5. `testplan_list_cases`
6. `testplan_list_issues`
7. `pipeline_list_pipelines`
8. `pipeline_list_runs`
9. `pipeline_get_run_detail`
10. `pipeline_get_run_log`

这条链适合回答的问题：

- 某个项目当前有哪些需求 / 缺陷在推进
- 对应测试计划是否已有用例
- 最近一次流水线运行是否真的成功

如果你要继续往执行推进：

- 在租户和区域允许时再尝试 `testplan_run_cases`
- 如果只是验证发布结果，优先先看 `pipeline_list_runs`，不要一上来就重跑流水线

## 剧本 3：发布 / 交付工程师推动一次受控发布

适合场景：

- 先确认构建结果
- 再触发流水线
- 再创建或查看部署任务

推荐调用顺序：

1. `build_list_jobs`
2. `build_get_job`
3. `build_list_records`
4. `build_get_record`
5. `artifact_list_versions`
6. `artifact_list_latest_version_files`
7. `pipeline_list_pipelines`
8. `pipeline_run_pipeline`
9. `pipeline_list_runs`
10. `deploy_list_apps`
11. `deploy_list_tasks`
12. `deploy_create_task_by_template`

这条链的关键思路是：

- 构建和制品先确认
- 流水线触发后先观察运行结果
- 部署任务最后再创建，而不是一开始就直接执行 Deploy 写路径

如果你要继续到更深的 Deploy 联调：

- 先跑 `deploy_get_execution_params`
- 再看 `deploy_get_status`
- 最后再进入 `deploy_start_app`

## 剧本 4：运维排查部署异常

适合场景：

- 应用存在，但发布记录异常
- 需要看部署历史、状态、日志和运行参数

推荐调用顺序：

1. `deploy_list_apps`
2. `deploy_get_app`
3. `deploy_list_tasks`
4. `deploy_get_task`
5. `deploy_list_histories`
6. `deploy_get_history_detail`
7. `deploy_get_status`
8. `deploy_get_app_log`
9. `deploy_get_execution_params`
10. `deploy_get_deploy_source_detail`

如果你是在 v4 环境排查，还可以继续：

- `deploy_list_v4_environments`
- `deploy_list_v4_deploy_records`
- `deploy_get_v4_deploy_record_step_logs`

这条剧本的重点不是立即执行回滚，而是先把上下文查全。

## 剧本 5：制品追踪与下载核对

适合场景：

- 确认构建产物是否已经入库
- 查某个版本下具体有哪些文件
- 生成下载地址给后续发布或排障使用

推荐调用顺序：

1. `artifact_list_repositories`
2. `artifact_get_repository`
3. `artifact_list_versions`
4. `artifact_list_files`
5. `artifact_get_file_tree`
6. `artifact_get_download_url`
7. `artifact_show_audit`

如果是从构建出发做追踪：

1. `build_list_records`
2. `artifact_list_build_archives`
3. 再进入上面的 Artifact 查询链

## 哪些剧本现在最稳

如果你只想先用最稳妥的几条：

- 开发协作排障：剧本 1
- 测试联动查看：剧本 2
- 制品追踪：剧本 5

如果你要碰发布写路径：

- 先走剧本 3
- 再看 [Testing-and-Live-Ops](./Testing-and-Live-Ops.md)
- 再确认 [Module-Live-Readiness](./Module-Live-Readiness.md)

## 下一步看什么

- 想按人来选路径：看 [Role-Based-Entry-Paths](./Role-Based-Entry-Paths.md)
- 想先理解模块能力：看 [Module-Functions-Overview](./Module-Functions-Overview.md)
- 想知道哪些模块已经完成真实联调：看 [Module-Live-Readiness](./Module-Live-Readiness.md)
