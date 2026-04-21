import { AppError } from "../core/errors/app-error.js";

function readRawErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function includesAny(text: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(text));
}

function buildHint(toolName: string, error: AppError) {
  const message = error.message;
  const isPermissionFailure = includesAny(message, [
    /insufficient permissions/i,
    /permission denied/i,
    /forbidden/i,
    /权限不足/,
    /授予权限/
  ]);
  const isServiceUnsupported = includesAny(message, [/暂不支持测试服务/, /test service/i]);
  const isProjectMissing = includesAny(message, [/项目不存在/, /project does not exist/i]);

  if (toolName.startsWith("testplan_") && isServiceUnsupported) {
    return "Hint: this project does not appear to have TestPlan service enabled. Switch to a project with TestPlan service enabled, or skip TestPlan tools for this project.";
  }

  if (toolName.startsWith("check_") && includesAny(message, [/操作权限不足/, /成员角色/])) {
    return "Hint: CodeArts Check access is tied to project membership and role assignment. Open the project's member-management settings, confirm this account has a role with Check permissions, then retry.";
  }

  if (toolName.startsWith("build_") && isPermissionFailure) {
    return "Hint: Build access is project-scoped. Confirm the current account has joined the target project and has Build permissions before retrying.";
  }

  if (toolName.startsWith("deploy_") && isProjectMissing) {
    return "Hint: Confirm `project_id` is correct for the current region and account before retrying Deploy tools. This often means the project id is wrong, deleted, or not visible to the current account.";
  }

  if (toolName.startsWith("artifact_") && includesAny(message, [/当前用户没有该项目权限/, /没有该项目权限/, /DEV\\.CR\\.4102/i])) {
    return "Hint: CodeArts Artifact access depends on project membership and repository visibility. Confirm the current account has project membership and retry with an artifact repository inside an accessible project.";
  }

  if (toolName.startsWith("repo_") && isPermissionFailure) {
    return "Hint: Check that `project_id` belongs to a project where the current account can access CodeArts Repo, then retry with a repository or project that this account can view.";
  }

  if (isPermissionFailure && (error.category === "auth_error" || error.status === 403 || error.status === 422)) {
    return "Hint: Confirm the current account is a member of the target project and has access to this CodeArts service before retrying.";
  }

  if (error.category === "not_found" || error.status === 404) {
    return "Hint: Confirm the target `project_id` and resource id are correct for the selected service.";
  }

  return undefined;
}

export function formatToolErrorMessage(toolName: string, error: unknown) {
  const baseMessage = readRawErrorMessage(error);

  if (!(error instanceof AppError)) {
    return baseMessage;
  }

  const hint = buildHint(toolName, error);

  if (!hint) {
    return baseMessage;
  }

  return `${baseMessage}\n\n${hint}`;
}
