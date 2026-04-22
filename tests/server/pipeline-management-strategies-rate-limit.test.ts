import { afterEach, describe, it, vi } from "vitest";
import { expectWritePathRateLimit } from "./http-test-helpers.js";

describe("write path rate limits", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits repeated pipeline_update_strategy executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_update_strategy",
      responsePayload: {
        status: true,
        rule_set_id: "strategy-1"
      },
      allowedInput: (index) => ({
        domain_id: "domain-1",
        rule_set_id: "strategy-1",
        name: `Tenant Strategy ${index}`,
        rules: [
          {
            id: "rule-1",
            is_valid: true
          }
        ],
        dry_run: false
      }),
      blockedInput: {
        domain_id: "domain-1",
        rule_set_id: "strategy-1",
        name: "Tenant Strategy blocked",
        rules: [
          {
            id: "rule-1",
            is_valid: true
          }
        ],
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_switch_strategy executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_switch_strategy",
      responsePayload: {
        status: true,
        rule_set_id: "strategy-1"
      },
      allowedInput: (index) => ({
        domain_id: "domain-1",
        rule_set_id: "strategy-1",
        is_valid: index % 2 === 0,
        dry_run: false
      }),
      blockedInput: {
        domain_id: "domain-1",
        rule_set_id: "strategy-1",
        is_valid: false,
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_create_strategy executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_create_strategy",
      responsePayload: {
        status: true,
        rule_set_id: "strategy-1"
      },
      allowedInput: (index) => ({
        domain_id: "domain-1",
        name: `Tenant Strategy ${index}`,
        rules: [
          {
            id: "rule-1",
            is_valid: true
          }
        ],
        dry_run: false
      }),
      blockedInput: {
        domain_id: "domain-1",
        name: "Tenant Strategy blocked",
        rules: [
          {
            id: "rule-1",
            is_valid: true
          }
        ],
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_delete_strategy executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_delete_strategy",
      responsePayload: {
        status: true,
        rule_set_id: "strategy-1"
      },
      allowedInput: (index) => ({
        domain_id: "domain-1",
        rule_set_id: `strategy-${index}`,
        dry_run: false
      }),
      blockedInput: {
        domain_id: "domain-1",
        rule_set_id: "strategy-blocked",
        dry_run: false
      }
    });
  });
});
