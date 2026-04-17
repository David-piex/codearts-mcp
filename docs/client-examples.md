# 客户端接入示例

这份文档提供的是通用 MCP 客户端接入思路，重点是：

- 本地个人使用时走 `stdio`
- 团队共享部署时走 `http`
- 共享模式下，每个人都用自己的 `AK/SK`

## 方案一：本地 `stdio` 接入

适合：

- 个人开发者
- 本机直接运行 MCP 服务
- 不想额外部署 HTTP 服务

核心思路：

- 客户端直接拉起 `node dist/src/server/index.js`
- 环境变量里写入自己的华为云凭证和各产品 base URL

示例模板：

```json
{
  "mcpServers": {
    "codearts": {
      "command": "node",
      "args": ["D:/Code/codearts-mcp/dist/src/server/index.js"],
      "env": {
        "MCP_TRANSPORT": "stdio",
        "HUAWEICLOUD_AK": "你的AK",
        "HUAWEICLOUD_SK": "你的SK",
        "HUAWEICLOUD_REGION": "cn-north-4",
        "HUAWEICLOUD_REQ_BASE_URL": "https://projectman-ext.cn-north-4.myhuaweicloud.com",
        "HUAWEICLOUD_REPO_BASE_URL": "https://codehub-ext.cn-north-4.myhuaweicloud.com",
        "HUAWEICLOUD_PIPELINE_BASE_URL": "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com",
        "MCP_SERVER_NAME": "codearts-mcp",
        "MCP_SERVER_VERSION": "0.1.0"
      }
    }
  }
}
```

如果你还没构建，先执行：

```bash
npm install
npm run build
```

## 方案二：共享 `http` 接入

适合：

- 团队统一部署一个 MCP 服务
- 多个人共同使用
- 不希望把每个人的凭证写在服务端环境变量里

核心思路：

- 服务端统一部署 `http` 模式
- 客户端只连 `/mcp`
- 每个用户首次连接后，先执行 `auth_configure_session`

服务端示例：

```bash
set MCP_TRANSPORT=http
set MCP_HTTP_PORT=3000
node dist/src/server/index.js
```

客户端连接模板：

```json
{
  "mcpServers": {
    "codearts-shared": {
      "transport": {
        "type": "http",
        "url": "https://your-domain.example.com/mcp"
      }
    }
  }
}
```

## 共享模式首次配置

连上共享服务后，先调用：

- `auth_configure_session`

输入示例：

```json
{
  "access_key": "你的AK",
  "secret_key": "你的SK",
  "region": "cn-north-4",
  "req_base_url": "https://projectman-ext.cn-north-4.myhuaweicloud.com",
  "repo_base_url": "https://codehub-ext.cn-north-4.myhuaweicloud.com",
  "pipeline_base_url": "https://cloudpipeline-ext.cn-north-4.myhuaweicloud.com"
}
```

结束使用时可调用：

- `auth_clear_session`

## 团队共享推荐方式

团队共享时，建议每个人都使用自己的：

- `HUAWEICLOUD_AK`
- `HUAWEICLOUD_SK`
- `HUAWEICLOUD_REGION`
- `HUAWEICLOUD_REQ_BASE_URL`
- `HUAWEICLOUD_REPO_BASE_URL`
- `HUAWEICLOUD_PIPELINE_BASE_URL`

不要把所有成员的凭证集中写入服务端。

## 什么时候选 `stdio`

优先选 `stdio`，如果你满足以下条件：

- 只自己使用
- 能在本机启动 Node 进程
- 不需要团队共享

## 什么时候选 `http`

优先选 `http`，如果你满足以下条件：

- 想统一部署
- 想通过 nginx / HTTPS 对外提供访问
- 团队里每个人都要独立凭证

## 故障排查

### 连接不上

检查：

- `stdio` 模式下路径是否指向 `dist/src/server/index.js`
- `http` 模式下 `/mcp` 地址是否正确
- 反向代理是否放行 `GET/POST/DELETE /mcp`

### 有服务但业务工具报认证错误

检查：

- `stdio` 模式下是否正确设置 `HUAWEICLOUD_AK` / `HUAWEICLOUD_SK`
- `http` 模式下是否先调用了 `auth_configure_session`
- 三个产品的 base URL 是否配置正确

### 只有某个产品报错

检查：

- `HUAWEICLOUD_REQ_BASE_URL`
- `HUAWEICLOUD_REPO_BASE_URL`
- `HUAWEICLOUD_PIPELINE_BASE_URL`

这三个地址可以分别独立配置，不要混用。
