import { describe, expect, it, vi } from "vitest";
import {
  createPipelineCreateTemplateHandler,
  createPipelineDeleteTemplateHandler,
  createPipelineFavoriteTemplateHandler,
  createPipelineUpdateTemplateHandler,
  mapCreatedPipelineTemplate,
  mapDeletedPipelineTemplate,
  mapFavoritedPipelineTemplate,
  mapUpdatedPipelineTemplate,
  previewCreatePipelineTemplate,
  previewDeletePipelineTemplate,
  previewFavoritePipelineTemplate,
  previewUpdatePipelineTemplate
} from "../../../../src/products/pipeline/tools/manage-templates.js";
import { expectDryRunPreview, expectMappedItem } from "./tool-test-helpers.js";

describe("pipeline template previews and mappings", () => {
  it("returns a dry-run preview for creating a template", () => {
    const result = previewCreatePipelineTemplate({
      tenant_id: "tenant-1",
      name: "Node.js",
      language: "nodejs",
      is_system: false,
      dry_run: true
    });

    expectDryRunPreview(result, {
      tenantId: "tenant-1",
      name: "Node.js",
      language: "nodejs",
      isSystem: false,
      executed: false
    });
  });

  it("returns normalized created template data", () => {
    const result = mapCreatedPipelineTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      name: "Node.js",
      raw: { templateId: "tpl-1" }
    });

    expectMappedItem(result, {
      id: "tpl-1",
      tenantId: "tenant-1",
      templateId: "tpl-1",
      name: "Node.js",
      executed: true
    });
  });

  it("returns a dry-run preview for updating a template", () => {
    const result = previewUpdatePipelineTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      name: "Node.js v2",
      language: "nodejs",
      is_system: false,
      dry_run: true
    });

    expectDryRunPreview(result, {
      tenantId: "tenant-1",
      templateId: "tpl-1",
      name: "Node.js v2",
      language: "nodejs",
      isSystem: false,
      executed: false
    });
  });

  it("returns normalized updated template data", () => {
    const result = mapUpdatedPipelineTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      name: "Node.js v2",
      raw: { templateId: "tpl-1" }
    });

    expectMappedItem(result, {
      id: "tpl-1",
      tenantId: "tenant-1",
      templateId: "tpl-1",
      name: "Node.js v2",
      executed: true
    });
  });

  it("returns a dry-run preview for deleting a template", () => {
    const result = previewDeletePipelineTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      dry_run: true
    });

    expectDryRunPreview(result, {
      tenantId: "tenant-1",
      templateId: "tpl-1",
      executed: false
    });
  });

  it("returns normalized deleted template data", () => {
    const result = mapDeletedPipelineTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      raw: { templateId: "tpl-1" }
    });

    expectMappedItem(result, {
      id: "tpl-1",
      tenantId: "tenant-1",
      templateId: "tpl-1",
      deleted: true,
      executed: true
    });
  });

  it("returns a dry-run preview for favoriting a template", () => {
    const result = previewFavoritePipelineTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      flag: true,
      dry_run: true
    });

    expectDryRunPreview(result, {
      tenantId: "tenant-1",
      templateId: "tpl-1",
      flag: true,
      executed: false
    });
  });

  it("returns normalized favorite template data", () => {
    const result = mapFavoritedPipelineTemplate({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      flag: true,
      raw: { templateId: "tpl-1" }
    });

    expectMappedItem(result, {
      id: "tpl-1",
      tenantId: "tenant-1",
      templateId: "tpl-1",
      flag: true,
      executed: true
    });
  });
});

describe("pipeline template handlers", () => {
  it("keeps template write handlers in dry-run mode by default", async () => {
    const createTemplate = vi.fn();
    const updateTemplate = vi.fn();
    const deleteTemplate = vi.fn();
    const favoriteTemplate = vi.fn();
    const client = { createTemplate, updateTemplate, deleteTemplate, favoriteTemplate };

    const createResult = await createPipelineCreateTemplateHandler(client)({
      tenant_id: "tenant-1",
      name: "Node.js",
      language: "nodejs",
      definition: "{\"stages\":[]}"
    });
    const updateResult = await createPipelineUpdateTemplateHandler(client)({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      name: "Node.js v2",
      language: "nodejs",
      definition: "{\"stages\":[]}"
    });
    const deleteResult = await createPipelineDeleteTemplateHandler(client)({
      tenant_id: "tenant-1",
      template_id: "tpl-1"
    });
    const favoriteResult = await createPipelineFavoriteTemplateHandler(client)({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      flag: true
    });

    expect(createResult.structuredContent.item?.executed).toBe(false);
    expect(updateResult.structuredContent.item?.executed).toBe(false);
    expect(deleteResult.structuredContent.item?.executed).toBe(false);
    expect(favoriteResult.structuredContent.item?.executed).toBe(false);
    expect(createTemplate).not.toHaveBeenCalled();
    expect(updateTemplate).not.toHaveBeenCalled();
    expect(deleteTemplate).not.toHaveBeenCalled();
    expect(favoriteTemplate).not.toHaveBeenCalled();
  });

  it("executes template write handlers when dry_run is false", async () => {
    const createTemplate = vi.fn().mockResolvedValue({ template_id: "tpl-1", raw: { templateId: "tpl-1" } });
    const updateTemplate = vi.fn().mockResolvedValue({ template_id: "tpl-1", raw: { templateId: "tpl-1" } });
    const deleteTemplate = vi.fn().mockResolvedValue({ template_id: "tpl-1", deleted: true, raw: { templateId: "tpl-1" } });
    const favoriteTemplate = vi.fn().mockResolvedValue({ template_id: "tpl-1", favorited: true, raw: { templateId: "tpl-1" } });
    const client = { createTemplate, updateTemplate, deleteTemplate, favoriteTemplate };

    const createResult = await createPipelineCreateTemplateHandler(client)({
      tenant_id: "tenant-1",
      name: "Node.js",
      language: "nodejs",
      definition: "{\"stages\":[]}",
      dry_run: false
    });
    const updateResult = await createPipelineUpdateTemplateHandler(client)({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      name: "Node.js v2",
      language: "nodejs",
      definition: "{\"stages\":[]}",
      dry_run: false
    });
    const deleteResult = await createPipelineDeleteTemplateHandler(client)({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      dry_run: false
    });
    const favoriteResult = await createPipelineFavoriteTemplateHandler(client)({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      flag: true,
      dry_run: false
    });

    expect(createTemplate).toHaveBeenCalledWith({
      tenant_id: "tenant-1",
      name: "Node.js",
      language: "nodejs",
      definition: "{\"stages\":[]}",
      dry_run: false
    });
    expect(updateTemplate).toHaveBeenCalledWith({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      name: "Node.js v2",
      language: "nodejs",
      definition: "{\"stages\":[]}",
      dry_run: false
    });
    expect(deleteTemplate).toHaveBeenCalledWith({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      dry_run: false
    });
    expect(favoriteTemplate).toHaveBeenCalledWith({
      tenant_id: "tenant-1",
      template_id: "tpl-1",
      flag: true,
      dry_run: false
    });
    expect(createResult.structuredContent.item?.executed).toBe(true);
    expect(updateResult.structuredContent.item?.executed).toBe(true);
    expect(deleteResult.structuredContent.item?.executed).toBe(true);
    expect(favoriteResult.structuredContent.item?.executed).toBe(true);
  });
});
