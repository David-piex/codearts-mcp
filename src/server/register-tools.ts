import { artifactToolNames } from "../products/artifact/tools/index.js";
import { buildToolNames } from "../products/build/tools/index.js";
import { checkToolNames } from "../products/check/tools/index.js";
import type { AppConfig } from "../core/config/env.js";
import { deployToolNames } from "../products/deploy/tools/index.js";
import { governToolNames } from "../products/govern/tools/index.js";
import { inspectorToolNames } from "../products/inspector/tools/index.js";
import { perftestToolNames } from "../products/perftest/tools/index.js";
import { pipelineToolNames } from "../products/pipeline/tools/index.js";
import { repoToolNames } from "../products/repo/tools/index.js";
import { reqToolNames } from "../products/req/tools/index.js";
import { testPlanToolNames } from "../products/testplan/tools/index.js";

export function collectToolNames(): string[] {
  return [
    ...artifactToolNames,
    ...buildToolNames,
    ...checkToolNames,
    ...deployToolNames,
    ...governToolNames,
    ...inspectorToolNames,
    ...perftestToolNames,
    ...reqToolNames,
    ...repoToolNames,
    ...pipelineToolNames,
    ...testPlanToolNames
  ].sort();
}

export function createServerInfo(config: Pick<AppConfig, "serverName" | "serverVersion">) {
  return {
    name: config.serverName,
    version: config.serverVersion
  };
}
