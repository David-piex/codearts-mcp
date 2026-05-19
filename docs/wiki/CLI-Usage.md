# CLI Usage

这页只讲命令行怎么用。先记住一句话：

`codearts-mcp` 的 CLI 可以直接调用所有 MCP 工具，既能本地用 AK/SK 调 CodeArts，也能调用已经部署好的共享 `/mcp` 服务。

## 1. 先选模式

| 模式 | 适合谁 | 需要什么 |
| --- | --- | --- |
| 本地模式 | 个人电脑、CI、一次性脚本 | `HUAWEICLOUD_AK`、`HUAWEICLOUD_SK`、`HUAWEICLOUD_REGION` |
| 远程模式 | 团队共享服务、统一入口 | MCP 服务地址和 `auth_token` |

## 2. 本地模式

本地模式不需要启动 HTTP 服务。CLI 会直接加载项目里的工具。

```powershell
$env:HUAWEICLOUD_AK="your-ak"
$env:HUAWEICLOUD_SK="your-sk"
$env:HUAWEICLOUD_REGION="cn-north-4"
$env:MCP_SERVER_NAME="codearts-mcp"
$env:MCP_SERVER_VERSION="0.1.0"
```

查看工具：

```powershell
npm run cli -- tools --format table
```

调用工具：

```powershell
npm run cli -- call req_list_projects --input '{"page":1,"page_size":20}' --format table
```

## 3. 远程模式

远程模式会把请求发到共享 MCP 服务的 `/mcp`。

```powershell
npm run cli -- call req_list_projects `
  --transport http `
  --endpoint https://your-domain.example/mcp `
  --token replace-with-auth-token `
  --input '{"page":1}' `
  --format table
```

如果每次都访问同一个共享服务，可以用环境变量固定：

```powershell
$env:CODEARTS_CLI_TRANSPORT="http"
$env:CODEARTS_MCP_URL="https://your-domain.example/mcp"
$env:CODEARTS_MCP_AUTH_TOKEN="replace-with-auth-token"

npm run cli -- tools --format table
```

## 4. 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run cli -- tools --format table` | 查看所有工具 |
| `npm run cli -- schema <tool>` | 查看某个工具要传哪些参数 |
| `npm run cli -- call <tool> --input '<json>'` | 调用工具 |
| `npm run cli -- call <tool> --file params.json` | 从 JSON 文件读取参数 |
| `npm run cli -- completion powershell` | 生成 PowerShell 补全脚本 |

例子：

```powershell
npm run cli -- schema repo_list_repositories
npm run cli -- call repo_list_repositories --file params.json --pretty
```

`params.json` 示例：

```json
{
  "project_id": "your-project-id",
  "page": 1,
  "page_size": 20
}
```

## 5. 输出格式

| 格式 | 适合什么 |
| --- | --- |
| `table` | 人看列表，最直观 |
| `json` | 脚本处理，默认格式 |
| `text` | 只想看 MCP 返回的摘要文本 |

```powershell
npm run cli -- tools --format table
npm run cli -- call req_list_projects --input '{"page":1}' --format json --pretty
npm run cli -- call req_list_projects --input '{"page":1}' --format text
```

## 6. Profile 配置

如果不想每次都写 `--endpoint`、`--token`，可以创建 profile 文件。

默认路径：

```text
~/.codearts-mcp-cli.json
```

Windows PowerShell 可以这样写：

```powershell
@'
{
  "default_profile": "shared",
  "profiles": {
    "shared": {
      "transport": "http",
      "endpoint": "https://your-domain.example/mcp",
      "token": "replace-with-auth-token",
      "format": "table"
    },
    "local": {
      "transport": "local",
      "region": "cn-north-4",
      "access_key": "your-ak",
      "secret_key": "your-sk"
    }
  }
}
'@ | Set-Content -Encoding UTF8 "$env:USERPROFILE\.codearts-mcp-cli.json"
```

使用 profile：

```powershell
npm run cli -- --profile shared tools
npm run cli -- --profile shared call req_list_projects --input '{"page":1}'
npm run cli -- --profile local call req_list_projects --input '{"page":1}' --format table
```

也可以指定配置文件路径：

```powershell
npm run cli -- --config .\profiles.json --profile shared tools
```

## 7. 自动补全

生成 PowerShell 补全脚本：

```powershell
npm run cli -- completion powershell
```

临时启用：

```powershell
npm run cli -- completion powershell | Invoke-Expression
```

Bash 和 Zsh：

```bash
npm run cli -- completion bash
npm run cli -- completion zsh
```

## 8. 常见问题

| 问题 | 处理方式 |
| --- | --- |
| 提示缺少 `HUAWEICLOUD_AK` / `HUAWEICLOUD_SK` | 你在用本地模式，先设置本机 AK/SK，或者改用远程模式 |
| 远程模式提示需要 endpoint | 加 `--endpoint https://.../mcp`，或设置 `CODEARTS_MCP_URL` |
| JSON 参数报错 | 参数必须是合法 JSON；参数多时建议写到 `params.json` 后用 `--file` |
| 不知道工具需要哪些字段 | 先跑 `npm run cli -- schema <tool>` |

