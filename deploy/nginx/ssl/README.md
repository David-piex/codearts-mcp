# TLS 证书说明

当你使用 `deploy/nginx/codearts-mcp-ssl.conf` 时，需要把 TLS 证书文件放到这个目录对应的挂载位置。

默认文件名：

- `fullchain.pem`
- `privkey.pem`

nginx SSL 模板默认读取路径：

- `/etc/nginx/ssl/fullchain.pem`
- `/etc/nginx/ssl/privkey.pem`

## 你需要做什么

### 如果是 Docker 容器内 nginx

把当前目录挂载到容器内：

- 宿主机 `deploy/nginx/ssl`
- 容器 `/etc/nginx/ssl`

### 如果是宿主机 nginx

可以直接把证书放到 nginx 配置引用的位置，或按你的运维规范改成别的路径。

## 证书来源

你可以使用任意合法证书来源，例如：

- 公有 CA 签发证书
- 企业内部 CA
- 测试环境自签名证书

## 注意事项

- 生产环境不要把私钥提交到仓库
- `privkey.pem` 必须限制访问权限
- 更新证书后，执行 `nginx -t` 再 reload
