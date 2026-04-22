import { afterEach, describe, it, vi } from "vitest";
import { expectWritePathRateLimit } from "./http-test-helpers.js";

describe("write path rate limits", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits repeated pipeline_create_rule executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_create_rule",
      responsePayload: {
        status: true,
        rule_id: "rule-1"
      },
      allowedInput: (index) => ({
        domain_id: "domain-1",
        name: `Build Gate ${index}`,
        type: "Build",
        layout_content: "{\"layout\":\"coverage\"}",
        content: [
          {
            group_name: "Coverage",
            properties: [
              {
                key: "coverage",
                type: "judge",
                name: "Coverage",
                operator: ">=",
                value: "0.8",
                value_type: "float",
                is_valid: true
              }
            ]
          }
        ],
        dry_run: false
      }),
      blockedInput: {
        domain_id: "domain-1",
        name: "Build Gate blocked",
        type: "Build",
        layout_content: "{\"layout\":\"coverage\"}",
        content: [
          {
            group_name: "Coverage",
            properties: [
              {
                key: "coverage",
                type: "judge",
                name: "Coverage",
                operator: ">=",
                value: "0.8",
                value_type: "float",
                is_valid: true
              }
            ]
          }
        ],
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_update_rule executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_update_rule",
      responsePayload: {
        status: true,
        rule_id: "rule-1"
      },
      allowedInput: (index) => ({
        domain_id: "domain-1",
        rule_id: "rule-1",
        name: `Build Gate ${index}`,
        type: "Build",
        content: [
          {
            group_name: "Coverage",
            properties: [
              {
                key: "coverage",
                type: "judge",
                name: "Coverage",
                operator: ">=",
                value: "0.9",
                value_type: "float",
                is_valid: true
              }
            ]
          }
        ],
        dry_run: false
      }),
      blockedInput: {
        domain_id: "domain-1",
        rule_id: "rule-1",
        name: "Build Gate blocked",
        type: "Build",
        content: [
          {
            group_name: "Coverage",
            properties: [
              {
                key: "coverage",
                type: "judge",
                name: "Coverage",
                operator: ">=",
                value: "0.9",
                value_type: "float",
                is_valid: true
              }
            ]
          }
        ],
        dry_run: false
      }
    });
  });

  it("limits repeated pipeline_delete_rule executions in http mode", async () => {
    await expectWritePathRateLimit({
      toolName: "pipeline_delete_rule",
      responsePayload: {
        status: true,
        rule_id: "rule-1"
      },
      allowedInput: (index) => ({
        domain_id: "domain-1",
        rule_id: `rule-${index}`,
        dry_run: false
      }),
      blockedInput: {
        domain_id: "domain-1",
        rule_id: "rule-blocked",
        dry_run: false
      }
    });
  });
});
