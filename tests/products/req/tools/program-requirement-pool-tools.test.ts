import { describe, expect, it } from "vitest";
import { createReqGetIrHandler } from "../../../../src/products/req/tools/get-ir.js";
import { createReqListIrChildrenHandler } from "../../../../src/products/req/tools/list-ir-children.js";
import { createReqListIrHistoriesHandler } from "../../../../src/products/req/tools/list-ir-histories.js";
import { createReqListIssueSeveritiesHandler } from "../../../../src/products/req/tools/list-issue-severities.js";
import { createReqListProgramFieldsHandler } from "../../../../src/products/req/tools/list-program-fields.js";
import { createReqListProgramsHandler } from "../../../../src/products/req/tools/list-programs.js";
import { createReqListRrHistoriesHandler } from "../../../../src/products/req/tools/list-rr-histories.js";
import { createReqListRrStatusesHandler } from "../../../../src/products/req/tools/list-rr-statuses.js";
import { createReqListRrsHandler } from "../../../../src/products/req/tools/list-rrs.js";

describe("Req program and requirement-pool tools", () => {
  it("maps project-space programs", async () => {
    const handler = createReqListProgramsHandler({
      listPrograms: async () => ({
        programs: [{ program_id: "program-1", name: "Platform Space", project_count: 2 }],
        total: 1
      })
    });

    const result = await handler({ page: 1, page_size: 20 });

    expect(result.structuredContent.items).toEqual([
      expect.objectContaining({
        id: "program-1",
        name: "Platform Space",
        projectCount: 2
      })
    ]);
  });

  it("maps program IR/RR fields", async () => {
    const handler = createReqListProgramFieldsHandler({
      listProgramFields: async () => ({
        fields: [{ id: "field-1", name: "subject", label: "标题", option_source: "Text" }]
      })
    });

    const result = await handler({ program_id: "program-1", field_type: "RR" });

    expect(result.structuredContent.items).toEqual([
      expect.objectContaining({
        id: "field-1",
        name: "subject",
        label: "标题",
        optionSource: "Text"
      })
    ]);
  });

  it("maps IR detail", async () => {
    const handler = createReqGetIrHandler({
      getIr: async () => ({
        ir_id: "ir-1",
        subject: "Unify auth",
        status: "新建"
      })
    });

    const result = await handler({ program_id: "program-1", ir_id: "ir-1" });

    expect(result.structuredContent.item).toEqual(
      expect.objectContaining({
        id: "ir-1",
        title: "Unify auth",
        status: "新建"
      })
    );
  });

  it("maps IR children with pagination", async () => {
    const handler = createReqListIrChildrenHandler({
      listIrChildren: async () => ({
        items: [{ ir_id: "ir-child-1", subject: "Child demand", status: "开发中" }],
        total: 1
      })
    });

    const result = await handler({
      program_id: "program-1",
      ir_id: "ir-1",
      query_type: "RR",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({
        id: "ir-child-1",
        title: "Child demand",
        status: "开发中"
      })
    );
    expect(result.structuredContent.page_info?.total).toBe(1);
  });

  it("maps IR and RR history records", async () => {
    const history = {
      created_time: 1710000000000,
      field: { field_id: "status", field_label: "状态", old_value: "新建", new_value: "开发中" },
      operator: { user_id: "u-1", nick_name: "Alice" }
    };

    const irHandler = createReqListIrHistoriesHandler({
      listIrHistories: async () => ({ histories: [history], total: 1 })
    });
    const rrHandler = createReqListRrHistoriesHandler({
      listRrHistories: async () => ({ histories: [{ ...history, rr_id: "rr-1" }], total: 1 })
    });

    const irResult = await irHandler({ ir_id: "ir-1", page: 1, page_size: 20 });
    const rrResult = await rrHandler({ rr_id: "rr-1", page: 1, page_size: 20 });

    expect(irResult.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ fieldLabel: "状态", oldValue: "新建", newValue: "开发中" })
    );
    expect(rrResult.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ rrId: "rr-1", fieldLabel: "状态" })
    );
  });

  it("maps RR list and statuses", async () => {
    const listHandler = createReqListRrsHandler({
      listRrs: async () => ({
        rrs: [{ id: "rr-1", fields_map: { subject: { value: "Payment RR" } }, status: { value: { name: "进行中" } } }],
        total: 1
      })
    });
    const statusHandler = createReqListRrStatusesHandler({
      listRrStatuses: async () => ({
        rr_status_list: [{ rr_id: "rr-1", status: { id: "22", label: "进行中" } }]
      })
    });

    const listResult = await listHandler({ program_id: "program-1", query_type: "ALL", page: 1, page_size: 20 });
    const statusResult = await statusHandler({ program_id: "program-1", rr_ids: ["rr-1"] });

    expect(listResult.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "rr-1", title: "Payment RR", status: "进行中" })
    );
    expect(statusResult.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "rr-1", statusId: "22", statusLabel: "进行中" })
    );
  });

  it("maps issue severities", async () => {
    const handler = createReqListIssueSeveritiesHandler({
      listIssueSeverities: async () => ({
        severities: [{ id: 10, name: "关键" }]
      })
    });

    const result = await handler({});

    expect(result.structuredContent.items).toEqual([{ id: 10, name: "关键" }]);
  });
});
