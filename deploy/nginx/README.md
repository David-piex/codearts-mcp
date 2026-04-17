# Nginx 部署说明

这个目录提供了两份 nginx 配置模板：

- `codearts-mcp.conf`
- `codearts-mcp-ssl.conf`

## 普通反向代理

如果你已经在更上层网关、SLB、Ingress 或 CDN 上做了 HTTPS 终止，通常直接使用：

- `codearts-mcp.conf`

该配置会将以下路径转发到内部 `codearts-mcp:3000`：

- `/health`
- `/mcp`

适合场景：

- Docker Compose 内部署
- 已有统一 TLS 入口
- 公司内网或零信任网关后面部署

## 由 nginx 直接处理 HTTPS

如果希望 nginx 自己监听 `443` 并加载证书，则使用：

- `codearts-mcp-ssl.conf`

配套证书说明见：

- `deploy/nginx/ssl/README.md`

## 推荐做法

- 共享 MCP 服务建议只暴露 `https://your-domain/mcp`
- 同时保留 `https://your-domain/health` 供健康检查
- 如果是公网部署，建议在 nginx 前再加一层访问控制
- 即使服务是共享部署，也不要在服务端写死所有人的 `AK/SK`

## 常见部署路径

### Docker Compose

将 `codearts-mcp.conf` 挂载到 nginx 容器，例如：

- `/etc/nginx/conf.d/default.conf`

### 宿主机 nginx

将模板内容复制到站点配置后，重载 nginx：

```bash
nginx -t
nginx -s reload
```
