import { describe, expect, it, vi } from "vitest";
import { reqGetWorkItemStatusRuleFlagInput as reqGetWorkItemStatusRuleFlagInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqGetWorkItemStatusRuleFlagInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqGetWorkItemStatusRuleFlagHandler,
  mapReqWorkItemStatusRuleFlag
} from "../../../../src/products/req/tools/get-work-item-status-rule-flag.js";

describe("mapReqWorkItemStatusRuleFlag", () => {
  it("returns normalized work item status rule flag", () => {
    const result = mapReqWorkItemStatusRuleFlag({
      project_id: "project-1",
      tracker_id: 7,
      status_rule_flag: {
        tracker_config_id: "tracker-config-1",
        issue_field_config: true,
        code_commit: false
      }
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      statusRuleFlag: {
        trackerConfigId: "tracker-config-1",
        issueFieldConfig: true,
        codeCommit: false
      }
    });
  });
});

describe("reqGetWorkItemStatusRuleFlagInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1",
      tracker_id: 7
    };

    expect(reqGetWorkItemStatusRuleFlagInput.parse(input)).toEqual(input);
    expect(reqGetWorkItemStatusRuleFlagInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqGetWorkItemStatusRuleFlagHandler", () => {
  it("returns normalized work item status rule flag", async () => {
    const client = {
      getWorkItemStatusRuleFlag: vi.fn(async () => ({
        project_id: "project-1",
        tracker_id: 7 as const,
        status_rule_flag: {
          tracker_config_id: "tracker-config-1",
          issue_field_config: true,
          code_commit: false
        }
      }))
    };
    const handler = createReqGetWorkItemStatusRuleFlagHandler(client);

    const result = await handler({
      project_id: "project-1",
      tracker_id: 7
    });

    expect(client.getWorkItemStatusRuleFlag).toHaveBeenCalledWith({
      project_id: "project-1",
      tracker_id: 7
    });
    expect(result.content[0]?.text).toContain("Loaded work item status rule flag for tracker 7");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      trackerId: 7,
      statusRuleFlag: {
        trackerConfigId: "tracker-config-1",
        issueFieldConfig: true,
        codeCommit: false
      }
    });
  });
});
