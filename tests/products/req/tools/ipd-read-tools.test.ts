import { describe, expect, it } from "vitest";
import {
  createReqDownloadIpdIssueAttachmentHandler,
  createReqDownloadIpdIssueImageHandler,
  createReqGetIpdE2EGraphHandler,
  createReqGetIpdIssueHandler,
  createReqGetIpdProcessInstanceHandler,
  createReqGetIpdProjectFieldOptionUsedHandler,
  createReqGetIpdReviewFormHandler,
  createReqGetIpdStatisticDashboardHandler,
  createReqGetIpdTenantFieldOptionUsedHandler,
  createReqGetIpdTenantFieldUsedHandler,
  createReqGetIpdWorkItemFlowDetailHandler,
  createReqGroupIpdIssuesHandler,
  createReqListIpdAttachedWikisHandler,
  createReqListIpdCategoryStatusesHandler,
  createReqListIpdChangeReviewIssueApproversHandler,
  createReqListIpdFeatureSetsHandler,
  createReqListIpdIssueAttachmentsHandler,
  createReqListIpdIssueTreeHandler,
  createReqListIpdProcessInstancesHandler,
  createReqListIpdReviewFormsHandler,
  createReqListIpdReviewRoleUsersHandler,
  createReqListIpdWorkHourCategoriesHandler,
  createReqListIpdWorkHoursHandler,
  createReqListIpdIssueFieldsHandler,
  createReqListIpdIssueRelationConfigHandler,
  createReqListIpdIssuesHandler,
  createReqListIpdLabelsHandler,
  createReqListIpdModulesHandler,
  createReqListIpdProjectFieldsHandler,
  createReqListIpdProjectUsersHandler,
  createReqListIpdProjectsHandler,
  createReqListIpdSnapshotFeaturesHandler,
  createReqListIpdSnapshotVersionsHandler,
  createReqListIpdStatusesHandler,
  createReqListIpdTenantFieldsHandler,
  createReqListIpdTenantIssuesHandler,
  createReqListIpdWorkflowFieldsHandler,
  createReqListIpdWorkflowTemplatesHandler
} from "../../../../src/products/req/tools/ipd-read-tools.js";

describe("Req IPD read tools", () => {
  it("maps IPD projects and users", async () => {
    const projects = await createReqListIpdProjectsHandler({
      listIpdProjects: async () => ({
        projects: [{ id: "ipd-1", name: "IPD Space", project_type: "ipd", model_id: "10003" }]
      })
    })({});
    const users = await createReqListIpdProjectUsersHandler({
      listIpdProjectUsers: async () => ({
        users: [{ user_id: "u-1", nick_name: "Alice", user_name: "alice" }]
      })
    })({ project_id: "ipd-1" });

    expect(projects.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "ipd-1", name: "IPD Space", modelId: "10003" })
    );
    expect(users.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "u-1", name: "Alice", userName: "alice" })
    );
  });

  it("maps IPD issue detail and list", async () => {
    const detail = await createReqGetIpdIssueHandler({
      getIpdIssue: async () => ({
        id: "issue-1",
        subject: "IPD requirement",
        status: { label: "进行中" }
      })
    })({ project_id: "ipd-1", issue_id: "issue-1" });
    const list = await createReqListIpdIssuesHandler({
      listIpdIssues: async () => ({
        issues: [{ id: "issue-1", subject: "IPD requirement", status: "新建" }],
        total: 1
      })
    })({ project_id: "ipd-1", issue_type: "RR", page: 1, page_size: 20 });

    expect(detail.structuredContent.item).toEqual(
      expect.objectContaining({ id: "issue-1", title: "IPD requirement", status: "进行中" })
    );
    expect(list.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "issue-1", title: "IPD requirement", status: "新建" })
    );
  });

  it("maps IPD review form and process instance reads", async () => {
    const approvers = await createReqListIpdChangeReviewIssueApproversHandler({
      listIpdChangeReviewIssueApprovers: async () => ({
        users: [{ id: "u-1", name: "alice", nick_name: "Alice" }],
        total: 1
      })
    })({ project_id: "ipd-1", issue_id: "issue-1" });
    const forms = await createReqListIpdReviewFormsHandler({
      listIpdReviewForms: async () => ({
        reviews: [{ id: "review-1", number: "CR-1", title: "Change review", category: "CR", status: { name: "Open" } }],
        total: 1
      })
    })({ project_id: "ipd-1", type: "CR", offset: 0, limit: 20 });
    const form = await createReqGetIpdReviewFormHandler({
      getIpdReviewForm: async () => ({
        id: "review-1",
        number: "CR-1",
        title: "Change review",
        category: "CR",
        created_by: { user_id: "u-1", nick_name: "Alice" }
      })
    })({ project_id: "ipd-1", id: "review-1", category: "CR" });
    const process = await createReqGetIpdProcessInstanceHandler({
      getIpdProcessInstance: async () => ({
        id: "process-1",
        number: "BR-1",
        title: "Baseline review",
        category: "BR",
        state: "working"
      })
    })({ project_id: "ipd-1", id: "process-1" });
    const processes = await createReqListIpdProcessInstancesHandler({
      listIpdProcessInstances: async () => ({
        process_instances: [{ id: "process-1", number: "BR-1", title: "Baseline review", category: "BR" }],
        total: 1
      })
    })({ project_id: "ipd-1", filter: [], page: { page_no: 1, page_size: 200 } });
    const roleUsers = await createReqListIpdReviewRoleUsersHandler({
      listIpdReviewRoleUsers: async () => ({
        users: [{ user_id: "u-2", user_name: "bob", nick_name: "Bob", domain_id: "d-1" }]
      })
    })({ project_id: "ipd-1", user_type: "reviewer" });

    expect(approvers.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "u-1", name: "Alice" }));
    expect(forms.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "review-1", number: "CR-1", title: "Change review", category: "CR", status: "Open" })
    );
    expect(form.structuredContent.item).toEqual(
      expect.objectContaining({ id: "review-1", title: "Change review", createdByName: "Alice" })
    );
    expect(process.structuredContent.item).toEqual(
      expect.objectContaining({ id: "process-1", title: "Baseline review", state: "working" })
    );
    expect(processes.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "process-1", number: "BR-1", category: "BR" })
    );
    expect(roleUsers.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "u-2", name: "Bob", userName: "bob", domainId: "d-1" })
    );
  });

  it("maps IPD tree, wiki, grouping, tenant list and dashboard reads", async () => {
    const tree = await createReqListIpdIssueTreeHandler({
      listIpdIssueTree: async () => ({
        issues: [
          {
            id: "issue-1",
            number: "IR-1",
            title: "IR A",
            category: "IR",
            children: [{ id: "issue-2", title: "Child A" }]
          }
        ],
        total: 1
      })
    })({ project_id: "ipd-1", category: "IR,US", page: 1, page_size: 20 });
    const wikis = await createReqListIpdAttachedWikisHandler({
      listIpdAttachedWikis: async () => ({
        wikis: [
          {
            wiki_id: "wiki-1",
            title: "Wiki A",
            issue_id: "issue-1",
            project: { project_id: "ipd-1", name: "IPD" },
            author: { id: "u-1", name: "Alice" }
          }
        ],
        total: 1
      })
    })({ project_id: "ipd-1", issue_id: "issue-1", category: "IR" });
    const grouped = await createReqGroupIpdIssuesHandler({
      groupIpdIssues: async () => ({
        field_info: { id: "field-1", display_name: "Status" },
        data: [{ id: "g-1", display_value: "Open" }]
      })
    })({ project_id: "ipd-1", issue_type: "IR", group_field_id: "field-1", page: 1, page_size: 20 });
    const tenantIssues = await createReqListIpdTenantIssuesHandler({
      listIpdTenantIssues: async () => ({
        issues: [{ id: "issue-3", title: "Bug A", category: "Bug" }],
        total: 1
      })
    })({ project_id: ["ipd-1", "ipd-2"], issue_type: "Bug", page: 1, page_size: 20 });
    const dashboard = await createReqGetIpdStatisticDashboardHandler({
      getIpdStatisticDashboard: async () => ({
        items: [{ category: "IR", category_name: "IR", total: 3, processing: 1, completed: 2, expired: 0 }]
      })
    })({ project_id: "ipd-1", classification: "requirement" });

    expect(tree.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "issue-1", number: "IR-1", title: "IR A", childrenCount: 1 })
    );
    expect(wikis.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "wiki-1", title: "Wiki A", projectId: "ipd-1", authorName: "Alice" })
    );
    expect(grouped.structuredContent.item).toEqual(
      expect.objectContaining({
        fieldInfo: expect.objectContaining({ id: "field-1", name: "Status" }),
        groups: [expect.objectContaining({ id: "g-1", name: "Open" })],
        count: 1
      })
    );
    expect(tenantIssues.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "issue-3", title: "Bug A", category: "Bug" })
    );
    expect(dashboard.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ category: "IR", categoryName: "IR", total: 3, processing: 1, completed: 2 })
    );
  });

  it("maps IPD metadata lists", async () => {
    const modules = await createReqListIpdModulesHandler({
      listIpdModules: async () => ({ modules: [{ id: "m-1", name: "Module" }], total: 1 })
    })({ project_id: "ipd-1", page: 1, page_size: 20 });
    const statuses = await createReqListIpdStatusesHandler({
      listIpdStatuses: async () => ({ statuses: [{ id: "s-1", name: "Open" }] })
    })({ project_id: "ipd-1", categories: "FE,IR" });
    const relations = await createReqListIpdIssueRelationConfigHandler({
      listIpdIssueRelationConfig: async () => ({ relations: [{ id: "r-1", name: "blocks" }] })
    })({ project_id: "ipd-1" });
    const labels = await createReqListIpdLabelsHandler({
      listIpdLabels: async () => ({ labels: [{ id: "l-1", name: "urgent" }], total: 1 })
    })({ project_id: "ipd-1", page: 1, page_size: 20 });

    expect(modules.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "m-1" }));
    expect(statuses.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "s-1" }));
    expect(relations.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "r-1" }));
    expect(labels.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "l-1" }));
  });

  it("maps IPD field and workflow lists", async () => {
    const projectFields = await createReqListIpdProjectFieldsHandler({
      listIpdProjectFields: async () => ({ fields: [{ id: "f-1", name: "Subject" }], total: 1 })
    })({ project_id: "ipd-1", page: 1, page_size: 20 });
    const issueFields = await createReqListIpdIssueFieldsHandler({
      listIpdIssueFields: async () => ({ fields: [{ id: "f-2", name: "Status" }] })
    })({ project_id: "ipd-1", category_id: "RR" });
    const workflows = await createReqListIpdWorkflowTemplatesHandler({
      listIpdWorkflowTemplates: async () => ({ workflows: [{ id: "w-1", name: "Default" }] })
    })({ project_id: "ipd-1" });
    const workflowFields = await createReqListIpdWorkflowFieldsHandler({
      listIpdWorkflowFields: async () => ({ fields: [{ id: "wf-1", name: "Handler" }] })
    })({ project_id: "ipd-1", category_id: "RR" });

    expect(projectFields.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "f-1" }));
    expect(issueFields.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "f-2" }));
    expect(workflows.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "w-1" }));
    expect(workflowFields.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "wf-1" }));
  });

  it("maps IPD tenant field config reads", async () => {
    const tenantFields = await createReqListIpdTenantFieldsHandler({
      listIpdTenantFields: async () => ({
        fields: [
          {
            id: "field-1",
            field_id: "field-1",
            code: "c_field",
            display_name: "Priority",
            field_type_name: "Picklist",
            option: [{ id: "opt-1", display_value: "High" }]
          }
        ],
        total: 1
      })
    })({ page: 1, page_size: 20, search: "Priority" });
    const used = await createReqGetIpdTenantFieldUsedHandler({
      getIpdTenantFieldUsed: async () => ({
        usage: [
          {
            project_id: "ipd-1",
            project_name: "IPD Project",
            model_id: "10003",
            category_codes: "RR,Bug",
            categories: [{ id: "10033", icon: "Bug", color: "#F56F6A" }]
          }
        ]
      })
    })({ field_id: "field-1" });
    const tenantOptionUsed = await createReqGetIpdTenantFieldOptionUsedHandler({
      getIpdTenantFieldOptionUsed: async () => ({ "opt-1": 2 })
    })({ code: "c_field" });
    const projectOptionUsed = await createReqGetIpdProjectFieldOptionUsedHandler({
      getIpdProjectFieldOptionUsed: async () => ({ "opt-2": "1" })
    })({ project_id: "ipd-1", code: "c_project_field" });

    expect(tenantFields.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "field-1", code: "c_field", name: "Priority", optionsCount: 1 })
    );
    expect(used.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ projectId: "ipd-1", projectName: "IPD Project", categoryCodes: "RR,Bug" })
    );
    expect(tenantOptionUsed.structuredContent.item).toEqual(
      expect.objectContaining({ code: "c_field", usage: { "opt-1": 2 } })
    );
    expect(projectOptionUsed.structuredContent.item).toEqual(
      expect.objectContaining({ projectId: "ipd-1", code: "c_project_field", usage: { "opt-2": "1" } })
    );
  });

  it("maps IPD feature set, graph and category status reads", async () => {
    const snapshots = await createReqListIpdSnapshotVersionsHandler({
      listIpdSnapshotVersions: async () => ({ snapshots: [{ id: "snap-1", title: "Baseline" }] })
    })({ project_id: "ipd-1" });
    const featureSets = await createReqListIpdFeatureSetsHandler({
      listIpdFeatureSets: async () => ({
        feature_sets: [{ id: "fs-1", title: "Feature Set", parent_id: "root", child_fs: [{ id: "fs-2" }] }]
      })
    })({ project_id: "ipd-1" });
    const features = await createReqListIpdSnapshotFeaturesHandler({
      listIpdSnapshotFeatures: async () => ({ issues: [{ id: "issue-1", title: "Feature" }], total: 1 })
    })({ project_id: "ipd-1", snapshot_version_id: "snap-1", feature_set_id: "fs-1", page: 1, page_size: 20 });
    const graph = await createReqGetIpdE2EGraphHandler({
      getIpdE2EGraph: async () => ({ id: "issue-1", title: "Feature", status: "Open" })
    })({ project_id: "ipd-1", issue_id: "issue-1", category: "SF" });
    const statuses = await createReqListIpdCategoryStatusesHandler({
      listIpdCategoryStatuses: async () => ({ statuses: [{ name: "分析", belonging: "IN_PROGRESS" }], total: 1 })
    })({ project_id: "ipd-1", category_id: "10065" });
    const flow = await createReqGetIpdWorkItemFlowDetailHandler({
      getIpdWorkItemFlowDetail: async () => ({ next_flow: [{ id: "flow-1", name: "Start" }] })
    })({ project_id: "ipd-1", issue_id: "issue-1", issue_category: "SF" });

    expect(snapshots.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "snap-1", title: "Baseline" }));
    expect(featureSets.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "fs-1", title: "Feature Set", parentId: "root", childrenCount: 1 })
    );
    expect(features.structuredContent.items?.[0]).toEqual(expect.objectContaining({ id: "issue-1", title: "Feature" }));
    expect(graph.structuredContent.item).toEqual(expect.objectContaining({ id: "issue-1", title: "Feature" }));
    expect(statuses.structuredContent.items?.[0]).toEqual(expect.objectContaining({ name: "分析", belonging: "IN_PROGRESS" }));
    expect(flow.structuredContent.item).toEqual(expect.objectContaining({ issueId: "issue-1", nextFlowCount: 1 }));
  });
  it("maps IPD attachment and image reads", async () => {
    const attachments = await createReqListIpdIssueAttachmentsHandler({
      listIpdIssueAttachments: async () => ({
        attachments: [{ id: "att-1", issue_id: "issue-1", file_name: "demo.txt", file_size: 4 }]
      })
    })({ project_id: "ipd-1", issue_id: "issue-1" });
    const downloadedAttachment = await createReqDownloadIpdIssueAttachmentHandler({
      downloadIpdIssueAttachment: async () => ({
        project_id: "ipd-1",
        attachment_id: "att-1",
        body: new Uint8Array([116, 101, 115, 116]),
        content_type: "text/plain",
        file_name: "demo.txt"
      })
    })({ project_id: "ipd-1", attachment_id: "att-1" });
    const downloadedImage = await createReqDownloadIpdIssueImageHandler({
      downloadIpdIssueImage: async () => ({
        project_id: "ipd-1",
        issue_id: "issue-1",
        file_name: "demo.png",
        body: new Uint8Array([1, 2, 3]),
        content_type: "image/png"
      })
    })({ project_id: "ipd-1", issue_id: "issue-1", file_name: "demo.png" });

    expect(attachments.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "att-1", issueId: "issue-1", fileName: "demo.txt", fileSize: 4 })
    );
    expect(downloadedAttachment.structuredContent.item).toEqual(
      expect.objectContaining({ attachmentId: "att-1", contentBase64: "dGVzdA==" })
    );
    expect(downloadedImage.structuredContent.item).toEqual(
      expect.objectContaining({ issueId: "issue-1", fileName: "demo.png", contentBase64: "AQID" })
    );
  });

  it("maps IPD work hour reads", async () => {
    const workHours = await createReqListIpdWorkHoursHandler({
      listIpdWorkHours: async () => ({
        work_hours: [
          {
            id: "wh-1",
            workitem_id: "issue-1",
            workitem: { id: "issue-1", subject: "Task A" },
            work_date: "1706803200000",
            work_hour_category: "dev",
            work_hours: 6
          }
        ],
        total: 1
      })
    })({ project_id: "ipd-1", workitem_id: ["issue-1"], page: 1, page_size: 20 });
    const categories = await createReqListIpdWorkHourCategoriesHandler({
      listIpdWorkHourCategories: async () => ({
        categories: [{ id: "cat-1", value: "dev", display_value: "Development" }]
      })
    })({ project_id: "ipd-1", display_value: "dev" });

    expect(workHours.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({
        id: "wh-1",
        issueId: "issue-1",
        workHourCategory: "dev",
        workHours: 6
      })
    );
    expect(categories.structuredContent.items?.[0]).toEqual(
      expect.objectContaining({ id: "cat-1", name: "Development", value: "dev" })
    );
  });
});
