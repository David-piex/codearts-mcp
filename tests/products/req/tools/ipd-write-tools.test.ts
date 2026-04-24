import { describe, expect, it, vi } from "vitest";
import {
  createReqBatchCreateIpdIssuesHandler,
  createReqBatchDeleteIpdIssuesHandler,
  createReqBatchTransferIpdWorkItemFlowHandler,
  createReqBatchUpdateIpdIssuesHandler,
  createReqCreateIpdIssueHandler,
  createReqCreateIpdFeatureSetHandler,
  createReqCreateIpdLabelHandler,
  createReqCreateIpdModuleHandler,
  createReqCreateIpdWorkHourHandler,
  createReqDeleteIpdFeatureSetHandler,
  createReqDeleteIpdIssueImageHandler,
  createReqDeleteIpdLabelHandler,
  createReqDeleteIpdModuleHandler,
  createReqDeleteIpdWorkHourHandler,
  createReqTransferIpdWorkItemFlowHandler,
  createReqUpdateIpdFeatureSetHandler,
  createReqUpdateIpdLabelHandler,
  createReqUpdateIpdModuleHandler,
  createReqUpdateIpdProjectFieldHandler,
  createReqUpdateIpdTenantFieldHandler,
  createReqUpdateIpdWorkHourHandler,
  createReqUploadIpdIssueAttachmentHandler,
  createReqUploadIpdIssueImageHandler
} from "../../../../src/products/req/tools/ipd-write-tools.js";

describe("Req IPD write tools", () => {
  it("previews and executes IPD issue mutations", async () => {
    const createIpdIssue = vi.fn();
    const batchDeleteIpdIssues = vi.fn();

    const previewedCreate = await createReqCreateIpdIssueHandler({ createIpdIssue })({
      project_id: "ipd-1",
      title: "IPD task",
      description: "desc",
      category: "Task",
      assignee: "user-1"
    });
    const created = await createReqCreateIpdIssueHandler({
      createIpdIssue: async () => [{ id: "issue-1", title: "IPD task", category: "Task" }]
    })({
      project_id: "ipd-1",
      title: "IPD task",
      description: "desc",
      category: "Task",
      assignee: "user-1",
      dry_run: false
    });
    const batchCreated = await createReqBatchCreateIpdIssuesHandler({
      batchCreateIpdIssues: async () => [{ id: "issue-2", title: "Bug A", category: "Bug" }]
    })({
      project_id: "ipd-1",
      issues: [
        {
          title: "Bug A",
          description: "desc",
          category: "Bug",
          status: "Start",
          assignee: { id: "user-1" }
        }
      ],
      dry_run: false
    });
    const batchUpdated = await createReqBatchUpdateIpdIssuesHandler({
      batchUpdateIpdIssues: async () => ({ success: [{ id: "issue-1" }] })
    })({
      project_id: "ipd-1",
      issue_ids: ["issue-1"],
      attribute: {
        category: "Task",
        priority: "中",
        custom_fields: [{ code: "module", value: "module-1" }]
      },
      dry_run: false
    });
    const previewedDelete = await createReqBatchDeleteIpdIssuesHandler({ batchDeleteIpdIssues })({
      project_id: "ipd-1",
      issue_ids: ["issue-1"],
      is_permanent_delete: false
    });

    expect(createIpdIssue).not.toHaveBeenCalled();
    expect(batchDeleteIpdIssues).not.toHaveBeenCalled();
    expect(previewedCreate.structuredContent.item).toEqual(expect.objectContaining({ executed: false, title: "IPD task" }));
    expect(created.structuredContent.item).toEqual(expect.objectContaining({ executed: true, count: 1 }));
    expect(batchCreated.structuredContent.item).toEqual(expect.objectContaining({ executed: true, count: 1 }));
    expect(batchUpdated.structuredContent.item).toEqual(
      expect.objectContaining({ executed: true, issueIds: ["issue-1"], category: "Task" })
    );
    expect(previewedDelete.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, issueIds: ["issue-1"], isPermanentDelete: false })
    );
  });

  it("previews IPD attachment and image mutations by default", async () => {
    const uploadIpdIssueAttachment = vi.fn();
    const uploadIpdIssueImage = vi.fn();
    const deleteIpdIssueImage = vi.fn();

    const attachment = await createReqUploadIpdIssueAttachmentHandler({ uploadIpdIssueAttachment })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      file_path: "C:/tmp/demo.txt"
    });
    const image = await createReqUploadIpdIssueImageHandler({ uploadIpdIssueImage })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      file_path: "C:/tmp/demo.png"
    });
    const deletedImage = await createReqDeleteIpdIssueImageHandler({ deleteIpdIssueImage })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      file_name: "demo.png"
    });

    expect(uploadIpdIssueAttachment).not.toHaveBeenCalled();
    expect(uploadIpdIssueImage).not.toHaveBeenCalled();
    expect(deleteIpdIssueImage).not.toHaveBeenCalled();
    expect(attachment.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, issueId: "issue-1", fileName: "demo.txt" })
    );
    expect(image.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, issueId: "issue-1", fileName: "demo.png" })
    );
    expect(deletedImage.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, issueId: "issue-1", fileName: "demo.png" })
    );
  });

  it("previews module mutations by default", async () => {
    const createIpdModule = vi.fn();
    const updateIpdModule = vi.fn();
    const deleteIpdModule = vi.fn();

    const created = await createReqCreateIpdModuleHandler({ createIpdModule })({
      project_id: "ipd-1",
      display_value: "Module A",
      parent_id: "root"
    });
    const updated = await createReqUpdateIpdModuleHandler({ updateIpdModule })({
      project_id: "ipd-1",
      module_id: "m-1",
      display_value: "Module B",
      parent_id: "root"
    });
    const deleted = await createReqDeleteIpdModuleHandler({ deleteIpdModule })({
      project_id: "ipd-1",
      module_id: "m-1"
    });

    expect(createIpdModule).not.toHaveBeenCalled();
    expect(updateIpdModule).not.toHaveBeenCalled();
    expect(deleteIpdModule).not.toHaveBeenCalled();
    expect(created.structuredContent.item).toEqual(expect.objectContaining({ executed: false, displayValue: "Module A" }));
    expect(updated.structuredContent.item).toEqual(expect.objectContaining({ executed: false, moduleId: "m-1" }));
    expect(deleted.structuredContent.item).toEqual(expect.objectContaining({ executed: false, moduleId: "m-1" }));
  });

  it("executes module mutations when dry_run is false", async () => {
    const created = await createReqCreateIpdModuleHandler({
      createIpdModule: async () => ({ id: "m-1", display_value: "Module A" })
    })({
      project_id: "ipd-1",
      display_value: "Module A",
      parent_id: "root",
      dry_run: false
    });
    const updated = await createReqUpdateIpdModuleHandler({
      updateIpdModule: async () => ({ id: "m-1", display_value: "Module B" })
    })({
      project_id: "ipd-1",
      module_id: "m-1",
      display_value: "Module B",
      parent_id: "root",
      dry_run: false
    });

    expect(created.structuredContent.item).toEqual(expect.objectContaining({ id: "m-1", displayValue: "Module A" }));
    expect(updated.structuredContent.item).toEqual(expect.objectContaining({ id: "m-1", displayValue: "Module B" }));
  });

  it("previews and executes label mutations", async () => {
    const createIpdLabel = vi.fn();
    const previewed = await createReqCreateIpdLabelHandler({ createIpdLabel })({
      project_id: "ipd-1",
      label_type: "requirement",
      color: "#86CAFF",
      title: "urgent"
    });
    const updated = await createReqUpdateIpdLabelHandler({
      updateIpdLabel: async () => ({ id: "label-1", title: "normal", color: "#6DDEBB", label_type: "requirement" })
    })({
      project_id: "ipd-1",
      label_id: "label-1",
      label_type: "requirement",
      title: "normal",
      dry_run: false
    });
    const deleted = await createReqDeleteIpdLabelHandler({
      deleteIpdLabel: async () => ({ id: "label-1", title: "normal", label_type: "requirement" })
    })({
      project_id: "ipd-1",
      label_id: "label-1",
      dry_run: false
    });

    expect(createIpdLabel).not.toHaveBeenCalled();
    expect(previewed.structuredContent.item).toEqual(expect.objectContaining({ executed: false, title: "urgent" }));
    expect(updated.structuredContent.item).toEqual(expect.objectContaining({ id: "label-1", title: "normal" }));
    expect(deleted.structuredContent.item).toEqual(expect.objectContaining({ id: "label-1", title: "normal" }));
  });

  it("previews and executes feature set mutations", async () => {
    const createIpdFeatureSet = vi.fn();
    const previewed = await createReqCreateIpdFeatureSetHandler({ createIpdFeatureSet })({
      project_id: "ipd-1",
      title: "Feature Set A",
      parent_id: "root"
    });
    const updated = await createReqUpdateIpdFeatureSetHandler({
      updateIpdFeatureSet: async () => ({
        id: "fs-1",
        title: "Feature Set B",
        parent_id: "root",
        position_float: 1
      })
    })({
      project_id: "ipd-1",
      feature_set_id: "fs-1",
      title: "Feature Set B",
      parent_id: "root",
      position_float: 1,
      dry_run: false
    });
    const deleted = await createReqDeleteIpdFeatureSetHandler({
      deleteIpdFeatureSet: async () => ({ id: "fs-1", title: "Feature Set B" })
    })({
      project_id: "ipd-1",
      feature_set_id: "fs-1",
      dry_run: false
    });

    expect(createIpdFeatureSet).not.toHaveBeenCalled();
    expect(previewed.structuredContent.item).toEqual(expect.objectContaining({ executed: false, title: "Feature Set A" }));
    expect(updated.structuredContent.item).toEqual(
      expect.objectContaining({ id: "fs-1", title: "Feature Set B", parentId: "root", positionFloat: 1 })
    );
    expect(deleted.structuredContent.item).toEqual(expect.objectContaining({ id: "fs-1", title: "Feature Set B" }));
  });

  it("previews and executes IPD work item flow transfers", async () => {
    const transferIpdWorkItemFlow = vi.fn();
    const previewed = await createReqTransferIpdWorkItemFlowHandler({ transferIpdWorkItemFlow })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      issue_category: "Bug",
      flow_code: "to_done"
    });
    const transferred = await createReqTransferIpdWorkItemFlowHandler({
      transferIpdWorkItemFlow: async () => ({ process_instance: { id: "pi-1" } })
    })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      issue_category: "Bug",
      flow_code: "to_done",
      dry_run: false
    });
    const batchTransferred = await createReqBatchTransferIpdWorkItemFlowHandler({
      batchTransferIpdWorkItemFlow: async () => ({ success_count: 2 })
    })({
      project_id: "ipd-1",
      issue_ids: ["issue-1", "issue-2"],
      issue_category: "Bug",
      flow_code: "to_done",
      is_recover: true,
      dry_run: false
    });

    expect(transferIpdWorkItemFlow).not.toHaveBeenCalled();
    expect(previewed.structuredContent.item).toEqual(expect.objectContaining({ executed: false, issueId: "issue-1" }));
    expect(transferred.structuredContent.item).toEqual(expect.objectContaining({ executed: true, issueId: "issue-1" }));
    expect(batchTransferred.structuredContent.item).toEqual(
      expect.objectContaining({ executed: true, issueIds: ["issue-1", "issue-2"], isRecover: true })
    );
  });

  it("previews and executes IPD work hour mutations", async () => {
    const createIpdWorkHour = vi.fn();
    const updateIpdWorkHour = vi.fn();
    const deleteIpdWorkHour = vi.fn();

    const previewedCreate = await createReqCreateIpdWorkHourHandler({ createIpdWorkHour })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      work_date_begin: "2025-07-25",
      work_date_end: "2025-07-25",
      work_hours: 2,
      work_hour_type: 1,
      include_weekend: false,
      work_hour_category: "dev"
    });
    const created = await createReqCreateIpdWorkHourHandler({
      createIpdWorkHour: async () => ({
        data: [{ id: "wh-1", workitem_id: "issue-1", work_hours: "2" }],
        work_hours_total: "2"
      })
    })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      work_date_begin: "2025-07-25",
      work_date_end: "2025-07-25",
      work_hours: 2,
      work_hour_type: 1,
      include_weekend: false,
      work_hour_category: "dev",
      dry_run: false
    });
    const previewedUpdate = await createReqUpdateIpdWorkHourHandler({ updateIpdWorkHour })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      workhour_id: "wh-1",
      work_hours: 3
    });
    const updated = await createReqUpdateIpdWorkHourHandler({
      updateIpdWorkHour: async () => ({
        data: [{ id: "wh-1", workitem_id: "issue-1", work_hours: 3 }],
        work_hours_total: 3
      })
    })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      workhour_id: "wh-1",
      work_hours: 3,
      dry_run: false
    });
    const previewedDelete = await createReqDeleteIpdWorkHourHandler({ deleteIpdWorkHour })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      workhour_id: "wh-1"
    });
    const deleted = await createReqDeleteIpdWorkHourHandler({
      deleteIpdWorkHour: async () => ({ data: [], work_hours_total: 0 })
    })({
      project_id: "ipd-1",
      issue_id: "issue-1",
      workhour_id: "wh-1",
      dry_run: false
    });

    expect(createIpdWorkHour).not.toHaveBeenCalled();
    expect(updateIpdWorkHour).not.toHaveBeenCalled();
    expect(deleteIpdWorkHour).not.toHaveBeenCalled();
    expect(previewedCreate.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, issueId: "issue-1", workHours: 2 })
    );
    expect(created.structuredContent.item).toEqual(
      expect.objectContaining({ executed: true, count: 1, workHoursTotal: "2" })
    );
    expect(previewedUpdate.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, workhourId: "wh-1", workHours: 3 })
    );
    expect(updated.structuredContent.item).toEqual(
      expect.objectContaining({ executed: true, count: 1, workHoursTotal: 3 })
    );
    expect(previewedDelete.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, workhourId: "wh-1" })
    );
    expect(deleted.structuredContent.item).toEqual(expect.objectContaining({ executed: true, count: 0 }));
  });

  it("previews and executes IPD field config updates", async () => {
    const updateIpdTenantField = vi.fn();
    const updateIpdProjectField = vi.fn();

    const previewedTenant = await createReqUpdateIpdTenantFieldHandler({ updateIpdTenantField })({
      field_id: "field-1",
      field_type_id: "10001",
      display_name: "Priority",
      option: [{ id: "opt-1", display_value: "High", value: "opt-1" }]
    });
    const updatedTenant = await createReqUpdateIpdTenantFieldHandler({
      updateIpdTenantField: async () => ({
        id: "field-1",
        code: "c_field",
        display_name: "Priority",
        field_type_id: "10001"
      })
    })({
      field_id: "field-1",
      display_name: "Priority",
      dry_run: false
    });
    const previewedProject = await createReqUpdateIpdProjectFieldHandler({ updateIpdProjectField })({
      project_id: "ipd-1",
      field_id: "field-2",
      display_name: "Component"
    });
    const updatedProject = await createReqUpdateIpdProjectFieldHandler({
      updateIpdProjectField: async () => ({
        id: "field-2",
        code: "c_project_field",
        display_name: "Component",
        field_type_id: "10001"
      })
    })({
      project_id: "ipd-1",
      field_id: "field-2",
      display_name: "Component",
      dry_run: false
    });

    expect(updateIpdTenantField).not.toHaveBeenCalled();
    expect(updateIpdProjectField).not.toHaveBeenCalled();
    expect(previewedTenant.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, field_id: "field-1", display_name: "Priority" })
    );
    expect(updatedTenant.structuredContent.item).toEqual(
      expect.objectContaining({ id: "field-1", code: "c_field", name: "Priority" })
    );
    expect(previewedProject.structuredContent.item).toEqual(
      expect.objectContaining({ executed: false, project_id: "ipd-1", field_id: "field-2" })
    );
    expect(updatedProject.structuredContent.item).toEqual(
      expect.objectContaining({ id: "field-2", code: "c_project_field", name: "Component" })
    );
  });
});
