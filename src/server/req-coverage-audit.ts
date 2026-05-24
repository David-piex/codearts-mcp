import {
  auditProductCoverage,
  productCoverageConfigs,
  renderProductCoverageAudit,
  type ProductCoverageEndpoint
} from "./product-coverage-audit.js";

export type ReqCoverageEndpoint = ProductCoverageEndpoint;

const reqCoverageConfig = productCoverageConfigs.find((config) => config.family === "req");

export function auditReqCoverage(input?: {
  docText?: string;
  clientText?: string;
  toolNames?: readonly string[];
}) {
  if (!reqCoverageConfig) {
    throw new Error("Req coverage config is not registered");
  }

  return auditProductCoverage({
    config: {
      ...reqCoverageConfig,
      ...(input?.toolNames ? { toolNames: input.toolNames } : {})
    },
    docText: input?.docText,
    clientText: input?.clientText
  });
}

export function renderReqCoverageAudit(input?: Parameters<typeof auditReqCoverage>[0]) {
  if (!reqCoverageConfig) {
    throw new Error("Req coverage config is not registered");
  }

  return renderProductCoverageAudit({
    config: {
      ...reqCoverageConfig,
      ...(input?.toolNames ? { toolNames: input.toolNames } : {})
    },
    docText: input?.docText,
    clientText: input?.clientText
  });
}
