# Troubleshooting

这页按最常见的实际问题来排，不按代码目录来排。

## 1. `/health` 不通

优先检查：

1. 服务进程是否启动
2. `MCP_HTTP_PORT` 是否映射正确
3. 反向代理是否把 `/mcp` 和 `/health` 都转发到了正确端口

常用动作：

```bash
docker compose ps
docker compose logs
```

## 2. `auth_configure_session` 失败

最常见原因：

- `AK/SK` 填错
- `region` 不对
- 当前区域的产品地址被错误覆盖

先确认：

- `HUAWEICLOUD_REGION`
- 是否误填了某个 `HUAWEICLOUD_*_BASE_URL`

## 3. 共享模式下每次重连都要重新鉴权

优先检查：

- `MCP_AUTH_MASTER_KEY` 是否变化
- `MCP_AUTH_DATA_PATH` 指向的文件是否被删掉
- 客户端是否真的保留了 Cookie

如果客户端不保留 Cookie，改用 `Authorization: Bearer <auth_token>`。不要把 token 固定到 URL query，除非已显式启用 `MCP_AUTH_ALLOW_QUERY_TOKEN=true` 并确认代理日志会脱敏。

## 4. `tools/list` 正常，但产品工具调用报错

这通常说明 MCP Server 本身启动了，但业务配置或上游可达性有问题。

排查顺序：

1. 先跑 `req_list_projects`
2. 再跑 `repo_list_repositories`
3. 看是不是只有某个产品不通
4. 检查对应产品的 `HUAWEICLOUD_*_BASE_URL`

## 5. 写工具报 `429`

这是共享 `http` 模式里的会话级限流，不一定是 bug。

处理方式：

- 降低短时间内连续写调用数量
- 避免自动化脚本并发压同一个会话
- 稍等限流窗口过去再试

## 6. Pipeline / Deploy 调用很慢

优先看：

- 是否是第一次冷请求
- 是否没有命中读缓存
- 是否调用了需要多次上游分页或级联查询的接口
- 是否在共享模式下重复创建会话

## 7. TestPlan / Artifact 某些接口总是失败

这里最容易误判。

先区分：

- 是仓库里没实现
- 还是北京四上游路由未发布

当前这两个模块的一部分缺口来自上游服务发布状态，不是纯代码问题。

## 8. Deploy execute-class 用例一直跳过

这不是测试框架坏了，而是缺少专门的执行型样本变量，例如：

- `HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_TASK_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_ROLLBACK_RECORD_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_START_EXECUTE_TASK_ID`
- `HUAWEICLOUD_DEPLOY_LIVE_STOP_EXECUTE_TASK_ID`

这类变量不建议默认常驻在普通 CI 或共享环境里。

## 9. 文档数字和代码不一致

先跑：

```bash
npm run stats:check-docs
```

如果提示漂移，再执行：

```bash
npm run stats:sync-docs
```

## 10. 推荐排查顺序

无论是本地还是共享部署，建议都按这个顺序排：

1. `npm run build`
2. `npm run tool-manifest:check`
3. `npm test`
4. `/health`
5. `auth_configure_session`
6. `req_list_projects`
7. `repo_list_repositories`
8. 再进入具体模块
