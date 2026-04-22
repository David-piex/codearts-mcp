import { describe, expect, it } from "vitest";
import { pipelineToolNames } from "../../../../src/products/pipeline/tools/index.js";
import { mapPipelinePublishers } from "../../../../src/products/pipeline/tools/list-publishers.js";
import { mapPipelineAvailablePublishers } from "../../../../src/products/pipeline/tools/list-available-publishers.js";
import { mapPipelineStagePlugins } from "../../../../src/products/pipeline/tools/list-stage-plugins.js";
import { mapPipelineBasePlugins } from "../../../../src/products/pipeline/tools/list-base-plugins.js";
import { mapPipelineBasePluginsPaged } from "../../../../src/products/pipeline/tools/list-base-plugins-paged.js";
import { mapPipelinePlugins } from "../../../../src/products/pipeline/tools/list-plugins.js";
import { mapPipelinePluginInputs } from "../../../../src/products/pipeline/tools/get-plugin-inputs.js";
import { mapPipelinePluginOutputs } from "../../../../src/products/pipeline/tools/get-plugin-outputs.js";
import { mapPipelinePluginVersions } from "../../../../src/products/pipeline/tools/list-plugin-versions.js";
import { mapPipelinePluginVersion } from "../../../../src/products/pipeline/tools/get-plugin-version.js";

describe("pipelineToolNames plugin read slice", () => {
  it("includes all Pipeline plugin read tool names", () => {
    expect(pipelineToolNames).toEqual(
      expect.arrayContaining([
        "pipeline_list_publishers",
        "pipeline_list_available_publishers",
        "pipeline_list_stage_plugins",
        "pipeline_list_base_plugins",
        "pipeline_list_base_plugins_paged",
        "pipeline_list_plugins",
        "pipeline_get_plugin_inputs",
        "pipeline_get_plugin_outputs",
        "pipeline_list_plugin_versions",
        "pipeline_get_plugin_version"
      ])
    );
  });
});

describe("plugin read list mappers", () => {
  it("maps publisher list with offset/limit pagination", () => {
    const result = mapPipelinePublishers(
      [{ publisher_unique_id: "pub-1", name: "Huawei", en_name: "huawei" }],
      0,
      20,
      1
    );

    expect(result.items).toEqual([
      expect.objectContaining({ id: "pub-1", publisherUniqueId: "pub-1", name: "Huawei" })
    ]);
    expect(result.page_info).toEqual({ page: 1, pageSize: 20, total: 1 });
  });

  it("maps available publishers without offset pagination", () => {
    const result = mapPipelineAvailablePublishers([
      { publisher_unique_id: "pub-2", name: "Partner" }
    ]);

    expect(result.items).toEqual([
      expect.objectContaining({ id: "pub-2", publisherUniqueId: "pub-2", name: "Partner" })
    ]);
    expect(result.page_info).toEqual({ page: 1, pageSize: 1, total: 1 });
  });

  it("maps stage plugins", () => {
    const result = mapPipelineStagePlugins([{ unique_id: "stage-1", plugin_name: "deploy" }]);

    expect(result.items).toEqual([
      expect.objectContaining({ id: "stage-1", uniqueId: "stage-1", pluginName: "deploy" })
    ]);
  });

  it("maps base plugins", () => {
    const result = mapPipelineBasePlugins([{ unique_id: "base-1", plugin_name: "maven" }]);

    expect(result.items).toEqual([
      expect.objectContaining({ id: "base-1", uniqueId: "base-1", pluginName: "maven" })
    ]);
  });

  it("maps paged base plugins", () => {
    const result = mapPipelineBasePluginsPaged(
      [{ unique_id: "base-2", plugin_name: "npm" }],
      0,
      20,
      1
    );

    expect(result.items).toEqual([
      expect.objectContaining({ id: "base-2", uniqueId: "base-2", pluginName: "npm" })
    ]);
    expect(result.page_info).toEqual({ page: 1, pageSize: 20, total: 1 });
  });

  it("maps plugins with offset/limit pagination", () => {
    const result = mapPipelinePlugins(
      [{ unique_id: "plugin-1", plugin_name: "custom" }],
      0,
      20,
      1
    );

    expect(result.items).toEqual([
      expect.objectContaining({ id: "plugin-1", uniqueId: "plugin-1", pluginName: "custom" })
    ]);
    expect(result.page_info).toEqual({ page: 1, pageSize: 20, total: 1 });
  });

  it("maps plugin versions with offset/limit pagination", () => {
    const result = mapPipelinePluginVersions(
      [{ unique_id: "plugin-1@1.0.0", plugin_name: "custom", version: "1.0.0" }],
      0,
      20,
      1
    );

    expect(result.items).toEqual([
      expect.objectContaining({
        id: "plugin-1@1.0.0",
        pluginName: "custom",
        version: "1.0.0"
      })
    ]);
    expect(result.page_info).toEqual({ page: 1, pageSize: 20, total: 1 });
  });
});

describe("plugin read detail mappers", () => {
  it("maps plugin inputs as a stable item", () => {
    const result = mapPipelinePluginInputs(
      {
        plugin_name: "custom",
        display_name: "Custom Plugin",
        version: "1.0.0",
        plugin_attribution: "custom"
      },
      [{ name: "image", type: "string" }]
    );

    expect(result.item).toEqual(
      expect.objectContaining({
        id: "custom@1.0.0:inputs",
        pluginName: "custom",
        version: "1.0.0",
        items: [expect.objectContaining({ name: "image", type: "string" })]
      })
    );
  });

  it("maps plugin outputs as a stable item", () => {
    const result = mapPipelinePluginOutputs(
      {
        plugin_name: "custom",
        display_name: "Custom Plugin",
        version: "1.0.0",
        plugin_attribution: "custom"
      },
      [{ name: "digest", type: "string" }]
    );

    expect(result.item).toEqual(
      expect.objectContaining({
        id: "custom@1.0.0:outputs",
        pluginName: "custom",
        version: "1.0.0",
        items: [expect.objectContaining({ name: "digest", type: "string" })]
      })
    );
  });

  it("maps plugin version detail as a stable item", () => {
    const result = mapPipelinePluginVersion({
      unique_id: "plugin-1@1.0.0",
      plugin_name: "custom",
      version: "1.0.0"
    });

    expect(result.item).toEqual(
      expect.objectContaining({
        id: "plugin-1@1.0.0",
        pluginName: "custom",
        version: "1.0.0"
      })
    );
  });
});
