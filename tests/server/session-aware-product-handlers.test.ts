import { describe, expect, it } from "vitest";
import * as sessionAwareHandlers from "../../src/server/session-aware-product-handlers.js";

function expectExportedHandlers(
  names: Array<keyof typeof sessionAwareHandlers>
) {
  for (const name of names) {
    expect(sessionAwareHandlers[name]).toBeTypeOf("function");
  }
}

const coreHandlerExports = [
  "createSessionAwareReqProjectsHandler",
  "createSessionAwarePipelineListHandler",
  "createSessionAwareTestPlanListPlansHandler"
] as const;

const pipelinePluginReadExports = [
  "createSessionAwarePipelineListPublishersHandler",
  "createSessionAwarePipelineListPluginsHandler",
  "createSessionAwarePipelineGetPluginMetricsHandler",
  "createSessionAwarePipelineCreatePluginDraftHandler",
  "createSessionAwarePipelineUpdatePluginDraftHandler",
  "createSessionAwarePipelinePublishPluginDraftHandler",
  "createSessionAwarePipelineDeletePluginDraftHandler",
  "createSessionAwarePipelinePublishPluginHandler",
  "createSessionAwarePipelinePublishPluginBindHandler",
  "createSessionAwarePipelineUpdatePluginBaseInfoHandler",
  "createSessionAwarePipelineUploadPluginIconHandler",
  "createSessionAwarePipelineGetPluginInputsHandler",
  "createSessionAwarePipelineGetPluginOutputsHandler",
  "createSessionAwarePipelineListPluginVersionsHandler",
  "createSessionAwarePipelineGetPluginVersionHandler"
] as const;

const pipelineManagementExports = [
  "createSessionAwarePipelineListGroupsHandler",
  "createSessionAwarePipelineCreateGroupHandler",
  "createSessionAwarePipelineUpdateGroupHandler",
  "createSessionAwarePipelineDeleteGroupHandler",
  "createSessionAwarePipelineMovePipelinesToGroupHandler",
  "createSessionAwarePipelineSwapPipelineGroupOrderHandler",
  "createSessionAwarePipelineListTagsHandler",
  "createSessionAwarePipelineCreateTagHandler",
  "createSessionAwarePipelineUpdateTagHandler",
  "createSessionAwarePipelineDeleteTagHandler",
  "createSessionAwarePipelineSetTagsForPipelinesHandler",
  "createSessionAwarePipelineCreateVariableGroupHandler",
  "createSessionAwarePipelineUpdateVariableGroupHandler",
  "createSessionAwarePipelineDeleteVariableGroupHandler",
  "createSessionAwarePipelineBindVariableGroupsToPipelineHandler",
  "createSessionAwarePipelineGetVariableGroupHandler",
  "createSessionAwarePipelineListPipelineVariableGroupsHandler",
  "createSessionAwarePipelineListVariableGroupsHandler",
  "createSessionAwarePipelineGetRuleHandler",
  "createSessionAwarePipelineListRulesHandler",
  "createSessionAwarePipelineCreateRuleHandler",
  "createSessionAwarePipelineUpdateRuleHandler",
  "createSessionAwarePipelineDeleteRuleHandler",
  "createSessionAwarePipelineGetRuleRelatedInfoHandler",
  "createSessionAwarePipelineListRuleTypesHandler",
  "createSessionAwarePipelineGetStrategyHandler",
  "createSessionAwarePipelineListStrategiesHandler",
  "createSessionAwarePipelineCreateStrategyHandler",
  "createSessionAwarePipelineUpdateStrategyHandler",
  "createSessionAwarePipelineDeleteStrategyHandler",
  "createSessionAwarePipelineSwitchStrategyHandler",
  "createSessionAwarePipelineGetStrategyRelatedInfoHandler",
  "createSessionAwarePipelineListStrategyChildrenHandler",
  "createSessionAwarePipelineListProjectStrategiesHandler",
  "createSessionAwarePipelineGetProjectStrategyHandler",
  "createSessionAwarePipelineGetProjectStrategyRelatedInfoHandler",
  "createSessionAwarePipelineInheritProjectStrategyHandler",
  "createSessionAwarePipelineSwitchProjectStrategyHandler",
  "createSessionAwarePipelineDeleteProjectStrategyHandler",
  "createSessionAwarePipelineGetProjectStrategyDetailHandler",
  "createSessionAwarePipelineUpdateProjectStrategyHandler",
  "createSessionAwarePipelineCreateProjectStrategyHandler",
  "createSessionAwarePipelineDeletePipelineHandler",
  "createSessionAwarePipelineDisablePipelineHandler",
  "createSessionAwarePipelineEnablePipelineHandler",
  "createSessionAwarePipelineListExtensionModulesHandler",
  "createSessionAwarePipelineGetExtensionModuleHandler",
  "createSessionAwarePipelineListExtensionEndpointsHandler",
  "createSessionAwarePipelineCreateExtensionEndpointHandler",
  "createSessionAwarePipelineUpdateExtensionEndpointHandler",
  "createSessionAwarePipelineGetExtensionEndpointHandler",
  "createSessionAwarePipelineDeleteExtensionEndpointHandler"
] as const;

const pipelineAdditionalQueryExports = [
  "createSessionAwarePipelineGetTenantPopupStatusHandler",
  "createSessionAwarePipelineGetAcceptFreeDeclarationHandler",
  "createSessionAwarePipelineShowTemplateTaskStatusHandler"
] as const;

const pipelineLegacyV3MutationExports = [
  "createSessionAwarePipelineCreateTemplateTaskV3Handler",
  "createSessionAwarePipelineStartNewPipelineV3Handler",
  "createSessionAwarePipelineStopPipelineV3Handler"
] as const;

const pipelineAliasExports = [
  "createSessionAwarePipelineListPipelinesHandler",
  "createSessionAwarePipelineListRunsHandler"
] as const;

describe("session-aware product handlers module", () => {
  it("exports req, pipeline, and testplan handler factories", () => {
    expectExportedHandlers([...coreHandlerExports]);
  });

  it("exports pipeline plugin-read handler factories", () => {
    expectExportedHandlers([...pipelinePluginReadExports]);
  });

  it("exports pipeline management handler factories", () => {
    expectExportedHandlers([...pipelineManagementExports]);
  });

  it("exports pipeline additional query handler factories", () => {
    expectExportedHandlers([...pipelineAdditionalQueryExports]);
  });

  it("exports pipeline legacy V3 mutation handler factories", () => {
    expectExportedHandlers([...pipelineLegacyV3MutationExports]);
  });

  it("exports tool-name aligned pipeline list handler aliases", () => {
    expectExportedHandlers([...pipelineAliasExports]);
  });
});
