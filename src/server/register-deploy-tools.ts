import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { officialApiRequestInput } from "../products/official-api.js";
import type { SessionCredentialStore } from "./session-store.js";
import { createSessionAwareProductToolHandler } from "./session-aware-handler.js";
import { createDeployClient } from "../products/deploy/client.js";
import {
  deployCreateEnvironmentInput,
  deployGetApplicationEnvironmentInput,
  deployUpdateApplicationEnvironmentInput,
  deployDeleteApplicationEnvironmentInput,
  deployCreateApplicationInput,
  deployCheckApplicationCreatableInput,
  deployCheckApplicationExistsInput,
  deployModifyApplicationInput,
  deployCreateTaskByTemplateInput,
  deployGetAppInput,
  deployGetDeploySourceDetailInput,
  deployGetTemplateDetailInput,
  deployGetHostGroupInput,
  deployGetHostGroupV2Input,
  deployGetHostGroupHostInput,
  deployGetHostGroupHostV2Input,
  deployGetHostGroupPermissionsInput,
  deployGetApplicationMessagesInput,
  deployListApplicationGroupsInput,
  deployGetSuccessRateMetricsInput,
  deployGetTaskSuccessRateMetricsInput,
  deployGetEnvironmentPermissionsInput,
  deployUpdateApplicationPermissionLevelInput,
  deployGetTaskInput,
  deployImportHostsToEnvironmentInput,
  deployListSystemConfigsInput,
  deployListAppOperationsLogInput,
  deployListApplicationPermissionsInput,
  deployBatchDeleteApplicationsInput,
  deployListAppHostGroupsInput,
  deployListEnvironmentsInput,
  deployListEnvironmentHostsInput,
  deployListV4ApplicationsInput,
  deployListV4ClustersInput,
  deployGetV4ClusterInput,
  deployDeleteV4ClusterHostsInput,
  deployGetV4ClusterCountInput,
  deployGetV4ClusterHostInput,
  deployListV4ClusterHostsInput,
  deployGetV4EnvironmentInput,
  deployGetV4EnvironmentResourceDetailInput,
  deployListV4EnvironmentHostsInput,
  deployAddV4EnvironmentHostsInput,
  deployDeleteV4EnvironmentHostsInput,
  deployListV4EnvironmentApplicationsInput,
  deployListV4EnvironmentsInput,
  deployListDeploymentUnitsInput,
  deployListV4OrchestrationsInput,
  deployListV4DeployRecordsInput,
  deployGetAppLogInput,
  deployGetExecutionParamsInput,
  deployGetRuntimeVariablesInput,
  deployGetHistoryDetailInput,
  deployGetLastRecordDetailInput,
  deployGetV4DeployRecordInput,
  deployGetV4DeployRecordStepDetailInput,
  deployGetV4DeployRecordStepLogsInput,
  deployCancelV4DeployRecordInput,
  deployRerunV4DeployRecordInput,
  deployRetryV4DeployRecordInput,
  deployRollbackV4DeployRecordInput,
  deployPassV4ManualCheckInput,
  deployRefuseV4ManualCheckInput,
  deployListVariableHistoryInput,
  deployListVariablesInput,
  deployListHostGroupEnvironmentsInput,
  deployListHostGroupHostsInput,
  deployListHostGroupHostsV2Input,
  deployListHostGroupsInput,
  deployListHostGroupsV2Input,
  deployGetStatusInput,
  deployListAppsInput,
  deployListTasksInput,
  deployListHistoriesInput,
  deployQueryVariablesInput,
  deployRollbackAppInput,
  deployStartAppInput,
  deployStopAppInput
} from "../products/deploy/schemas.js";
import { createDeployCreateEnvironmentHandler } from "../products/deploy/tools/create-environment.js";
import { createDeployGetApplicationEnvironmentHandler } from "../products/deploy/tools/get-application-environment.js";
import { createDeployUpdateApplicationEnvironmentHandler } from "../products/deploy/tools/update-application-environment.js";
import { createDeployDeleteApplicationEnvironmentHandler } from "../products/deploy/tools/delete-application-environment.js";
import { createDeployCreateApplicationHandler } from "../products/deploy/tools/create-application.js";
import { createDeployCheckApplicationCreatableHandler } from "../products/deploy/tools/check-application-creatable.js";
import { createDeployCheckApplicationExistsHandler } from "../products/deploy/tools/check-application-exists.js";
import { createDeployModifyApplicationHandler } from "../products/deploy/tools/modify-application.js";
import { createDeployCreateTaskByTemplateHandler } from "../products/deploy/tools/create-task-by-template.js";
import { createDeployGetAppHandler } from "../products/deploy/tools/get-app.js";
import { createDeployGetDeploySourceDetailHandler } from "../products/deploy/tools/get-deploy-source-detail.js";
import { createDeployGetTemplateDetailHandler } from "../products/deploy/tools/get-template-detail.js";
import { createDeployGetHostGroupHandler } from "../products/deploy/tools/get-host-group.js";
import { createDeployGetHostGroupV2Handler } from "../products/deploy/tools/get-host-group-v2.js";
import { createDeployGetHostGroupHostHandler } from "../products/deploy/tools/get-host-group-host.js";
import { createDeployGetHostGroupHostV2Handler } from "../products/deploy/tools/get-host-group-host-v2.js";
import { createDeployGetHostGroupPermissionsHandler } from "../products/deploy/tools/get-host-group-permissions.js";
import { createDeployGetApplicationMessagesHandler } from "../products/deploy/tools/get-application-messages.js";
import { createDeployListApplicationGroupsHandler } from "../products/deploy/tools/list-application-groups.js";
import { createDeployGetSuccessRateMetricsHandler } from "../products/deploy/tools/get-success-rate-metrics.js";
import { createDeployGetTaskSuccessRateMetricsHandler } from "../products/deploy/tools/get-task-success-rate-metrics.js";
import { createDeployGetEnvironmentPermissionsHandler } from "../products/deploy/tools/get-environment-permissions.js";
import { createDeployUpdateApplicationPermissionLevelHandler } from "../products/deploy/tools/update-application-permission-level.js";
import { createDeployGetTaskHandler } from "../products/deploy/tools/get-task.js";
import { createDeployImportHostsToEnvironmentHandler } from "../products/deploy/tools/import-hosts-to-environment.js";
import { createDeployGetAppLogHandler } from "../products/deploy/tools/get-app-log.js";
import { createDeployGetExecutionParamsHandler } from "../products/deploy/tools/get-execution-params.js";
import { createDeployGetHistoryDetailHandler } from "../products/deploy/tools/get-history-detail.js";
import { createDeployGetStatusHandler } from "../products/deploy/tools/get-status.js";
import { createDeployGetRuntimeVariablesHandler } from "../products/deploy/tools/get-runtime-variables.js";
import { createDeployListSystemConfigsHandler } from "../products/deploy/tools/list-system-configs.js";
import { createDeployListApplicationPermissionsHandler } from "../products/deploy/tools/list-application-permissions.js";
import { createDeployBatchDeleteApplicationsHandler } from "../products/deploy/tools/batch-delete-applications.js";
import { createDeployListAppOperationsLogHandler } from "../products/deploy/tools/list-app-operations-log.js";
import { createDeployListAppHostGroupsHandler } from "../products/deploy/tools/list-app-host-groups.js";
import { createDeployListAppsHandler } from "../products/deploy/tools/list-apps.js";
import { createDeployListDeploymentUnitsHandler } from "../products/deploy/tools/list-deployment-units.js";
import { createDeployGetLastRecordDetailHandler } from "../products/deploy/tools/get-last-record-detail.js";
import { createDeployGetV4DeployRecordHandler } from "../products/deploy/tools/get-v4-deploy-record.js";
import { createDeployGetV4DeployRecordStepDetailHandler } from "../products/deploy/tools/get-v4-deploy-record-step-detail.js";
import { createDeployGetV4DeployRecordStepLogsHandler } from "../products/deploy/tools/get-v4-deploy-record-step-logs.js";
import { createDeployCancelV4DeployRecordHandler } from "../products/deploy/tools/cancel-v4-deploy-record.js";
import { createDeployListV4ApplicationsHandler } from "../products/deploy/tools/list-v4-applications.js";
import { createDeployListV4ClustersHandler } from "../products/deploy/tools/list-v4-clusters.js";
import { createDeployGetV4ClusterHandler } from "../products/deploy/tools/get-v4-cluster.js";
import { createDeployDeleteV4ClusterHostsHandler } from "../products/deploy/tools/delete-v4-cluster-hosts.js";
import { createDeployGetV4ClusterCountHandler } from "../products/deploy/tools/get-v4-cluster-count.js";
import { createDeployGetV4ClusterHostHandler } from "../products/deploy/tools/get-v4-cluster-host.js";
import { createDeployListV4ClusterHostsHandler } from "../products/deploy/tools/list-v4-cluster-hosts.js";
import { createDeployGetV4EnvironmentHandler } from "../products/deploy/tools/get-v4-environment.js";
import { createDeployGetV4EnvironmentResourceDetailHandler } from "../products/deploy/tools/get-v4-environment-resource-detail.js";
import { createDeployListV4EnvironmentHostsHandler } from "../products/deploy/tools/list-v4-environment-hosts.js";
import { createDeployAddV4EnvironmentHostsHandler } from "../products/deploy/tools/add-v4-environment-hosts.js";
import { createDeployDeleteV4EnvironmentHostsHandler } from "../products/deploy/tools/delete-v4-environment-hosts.js";
import { createDeployListV4DeployRecordsHandler } from "../products/deploy/tools/list-v4-deploy-records.js";
import { createDeployListV4EnvironmentApplicationsHandler } from "../products/deploy/tools/list-v4-environment-applications.js";
import { createDeployListV4EnvironmentsHandler } from "../products/deploy/tools/list-v4-environments.js";
import { createDeployListV4OrchestrationsHandler } from "../products/deploy/tools/list-v4-orchestrations.js";
import { createDeployListEnvironmentsHandler } from "../products/deploy/tools/list-environments.js";
import { createDeployListEnvironmentHostsHandler } from "../products/deploy/tools/list-environment-hosts.js";
import { createDeployListHostGroupEnvironmentsHandler } from "../products/deploy/tools/list-host-group-environments.js";
import { createDeployListHostGroupHostsHandler } from "../products/deploy/tools/list-host-group-hosts.js";
import { createDeployListHostGroupHostsV2Handler } from "../products/deploy/tools/list-host-group-hosts-v2.js";
import { createDeployListHostGroupsHandler } from "../products/deploy/tools/list-host-groups.js";
import { createDeployListHostGroupsV2Handler } from "../products/deploy/tools/list-host-groups-v2.js";
import { createDeployListTasksHandler } from "../products/deploy/tools/list-tasks.js";
import { createDeployListHistoriesHandler } from "../products/deploy/tools/list-histories.js";
import { createDeployListVariableHistoryHandler } from "../products/deploy/tools/list-variable-history.js";
import { createDeployListVariablesHandler } from "../products/deploy/tools/list-variables.js";
import { createDeployPassV4ManualCheckHandler } from "../products/deploy/tools/pass-v4-manual-check.js";
import { createDeployQueryVariablesHandler } from "../products/deploy/tools/query-variables.js";
import { createDeployRefuseV4ManualCheckHandler } from "../products/deploy/tools/refuse-v4-manual-check.js";
import { createDeployRollbackAppHandler } from "../products/deploy/tools/rollback-app.js";
import { createDeployRollbackV4DeployRecordHandler } from "../products/deploy/tools/rollback-v4-deploy-record.js";
import { createDeployRerunV4DeployRecordHandler } from "../products/deploy/tools/rerun-v4-deploy-record.js";
import { createDeployRetryV4DeployRecordHandler } from "../products/deploy/tools/retry-v4-deploy-record.js";
import { createDeployStartAppHandler } from "../products/deploy/tools/start-app.js";
import { createDeployStopAppHandler } from "../products/deploy/tools/stop-app.js";
import { createOfficialApiRequestHandler } from "../products/shared-tools/request-official-api.js";
import { defineProductTool, registerDefinedTool } from "./product-tool-registry.js";
import type { RateLimiter } from "./rate-limiter.js";

type RegisterableServer = Pick<McpServer, "registerTool">;

type DeployStdioClient = ReturnType<typeof createDeployClient>;

const deployToolDefinitions = {
  "deploy_request_official_api": defineProductTool({
    description: "Request a documented CodeArts Deploy API path that does not yet have a dedicated typed MCP tool",
    inputSchema: officialApiRequestInput,
    selectHttpClient: (clients: { deployClient: Parameters<typeof createOfficialApiRequestHandler>[0] }) => clients.deployClient,
    createProductHandler: createOfficialApiRequestHandler
  }),
  "deploy_list_apps": defineProductTool({ description: "List CodeArts Deploy applications", inputSchema: deployListAppsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListAppsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListAppsHandler }),
  "deploy_list_v4_applications": defineProductTool({ description: "List CodeArts Deploy v4 applications", inputSchema: deployListV4ApplicationsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListV4ApplicationsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListV4ApplicationsHandler }),
  "deploy_list_v4_clusters": defineProductTool({ description: "List CodeArts Deploy v4 clusters", inputSchema: deployListV4ClustersInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListV4ClustersHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListV4ClustersHandler }),
  "deploy_get_v4_cluster_count": defineProductTool({ description: "Get CodeArts Deploy v4 cluster counts", inputSchema: deployGetV4ClusterCountInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetV4ClusterCountHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetV4ClusterCountHandler }),
  "deploy_get_v4_cluster": defineProductTool({ description: "Get CodeArts Deploy v4 cluster detail", inputSchema: deployGetV4ClusterInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetV4ClusterHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetV4ClusterHandler }),
  "deploy_delete_v4_cluster_hosts": defineProductTool({ description: "Delete hosts from a CodeArts Deploy v4 cluster", inputSchema: deployDeleteV4ClusterHostsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployDeleteV4ClusterHostsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployDeleteV4ClusterHostsHandler, rateLimitAction: "deploy_delete_v4_cluster_hosts" }),
  "deploy_get_v4_cluster_host": defineProductTool({ description: "Get CodeArts Deploy v4 cluster host detail", inputSchema: deployGetV4ClusterHostInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetV4ClusterHostHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetV4ClusterHostHandler }),
  "deploy_list_v4_cluster_hosts": defineProductTool({ description: "List CodeArts Deploy v4 cluster hosts", inputSchema: deployListV4ClusterHostsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListV4ClusterHostsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListV4ClusterHostsHandler }),
  "deploy_get_v4_environment": defineProductTool({ description: "Get CodeArts Deploy v4 environment detail", inputSchema: deployGetV4EnvironmentInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetV4EnvironmentHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetV4EnvironmentHandler }),
  "deploy_get_v4_environment_resource_detail": defineProductTool({ description: "Get CodeArts Deploy v4 environment resource detail", inputSchema: deployGetV4EnvironmentResourceDetailInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetV4EnvironmentResourceDetailHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetV4EnvironmentResourceDetailHandler }),
  "deploy_list_v4_environment_hosts": defineProductTool({ description: "List CodeArts Deploy v4 environment hosts", inputSchema: deployListV4EnvironmentHostsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListV4EnvironmentHostsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListV4EnvironmentHostsHandler }),
  "deploy_add_v4_environment_hosts": defineProductTool({ description: "Add hosts into a CodeArts Deploy v4 environment", inputSchema: deployAddV4EnvironmentHostsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployAddV4EnvironmentHostsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployAddV4EnvironmentHostsHandler, rateLimitAction: "deploy_add_v4_environment_hosts" }),
  "deploy_delete_v4_environment_hosts": defineProductTool({ description: "Delete hosts from a CodeArts Deploy v4 environment", inputSchema: deployDeleteV4EnvironmentHostsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployDeleteV4EnvironmentHostsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployDeleteV4EnvironmentHostsHandler, rateLimitAction: "deploy_delete_v4_environment_hosts" }),
  "deploy_list_v4_environments": defineProductTool({ description: "List CodeArts Deploy v4 environments", inputSchema: deployListV4EnvironmentsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListV4EnvironmentsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListV4EnvironmentsHandler }),
  "deploy_list_v4_environment_applications": defineProductTool({ description: "List CodeArts Deploy v4 applications under an environment", inputSchema: deployListV4EnvironmentApplicationsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListV4EnvironmentApplicationsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListV4EnvironmentApplicationsHandler }),
  "deploy_list_deployment_units": defineProductTool({ description: "List CodeArts Deploy deployment units for an application", inputSchema: deployListDeploymentUnitsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListDeploymentUnitsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListDeploymentUnitsHandler }),
  "deploy_list_v4_orchestrations": defineProductTool({ description: "List CodeArts Deploy v4 orchestrations", inputSchema: deployListV4OrchestrationsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListV4OrchestrationsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListV4OrchestrationsHandler }),
  "deploy_list_v4_deploy_records": defineProductTool({ description: "List CodeArts Deploy v4 deploy records", inputSchema: deployListV4DeployRecordsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListV4DeployRecordsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListV4DeployRecordsHandler }),
  "deploy_list_app_host_groups": defineProductTool({ description: "List CodeArts Deploy host groups available to an application", inputSchema: deployListAppHostGroupsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListAppHostGroupsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListAppHostGroupsHandler }),
  "deploy_list_host_groups": defineProductTool({ description: "List CodeArts Deploy host groups", inputSchema: deployListHostGroupsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListHostGroupsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListHostGroupsHandler }),
  "deploy_list_host_groups_v2": defineProductTool({ description: "List CodeArts Deploy v2 host groups", inputSchema: deployListHostGroupsV2Input, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListHostGroupsV2Handler>[0] }) => clients.deployClient, createProductHandler: createDeployListHostGroupsV2Handler }),
  "deploy_get_host_group": defineProductTool({ description: "Get CodeArts Deploy host group detail", inputSchema: deployGetHostGroupInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetHostGroupHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetHostGroupHandler }),
  "deploy_get_host_group_v2": defineProductTool({ description: "Get CodeArts Deploy v2 host group detail", inputSchema: deployGetHostGroupV2Input, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetHostGroupV2Handler>[0] }) => clients.deployClient, createProductHandler: createDeployGetHostGroupV2Handler }),
  "deploy_list_host_group_hosts": defineProductTool({ description: "List CodeArts Deploy hosts in a host group", inputSchema: deployListHostGroupHostsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListHostGroupHostsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListHostGroupHostsHandler }),
  "deploy_list_host_group_hosts_v2": defineProductTool({ description: "List CodeArts Deploy v2 hosts in a host group", inputSchema: deployListHostGroupHostsV2Input, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListHostGroupHostsV2Handler>[0] }) => clients.deployClient, createProductHandler: createDeployListHostGroupHostsV2Handler }),
  "deploy_get_host_group_host": defineProductTool({ description: "Get CodeArts Deploy host group host detail", inputSchema: deployGetHostGroupHostInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetHostGroupHostHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetHostGroupHostHandler }),
  "deploy_get_host_group_host_v2": defineProductTool({ description: "Get CodeArts Deploy v2 host group host detail", inputSchema: deployGetHostGroupHostV2Input, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetHostGroupHostV2Handler>[0] }) => clients.deployClient, createProductHandler: createDeployGetHostGroupHostV2Handler }),
  "deploy_list_host_group_environments": defineProductTool({ description: "List CodeArts Deploy environments linked to a host group", inputSchema: deployListHostGroupEnvironmentsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListHostGroupEnvironmentsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListHostGroupEnvironmentsHandler }),
  "deploy_get_host_group_permissions": defineProductTool({ description: "Get CodeArts Deploy host group permissions", inputSchema: deployGetHostGroupPermissionsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetHostGroupPermissionsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetHostGroupPermissionsHandler }),
  "deploy_create_environment": defineProductTool({ description: "Create CodeArts Deploy environment", inputSchema: deployCreateEnvironmentInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployCreateEnvironmentHandler>[0] }) => clients.deployClient, createProductHandler: createDeployCreateEnvironmentHandler, rateLimitAction: "deploy_create_environment" }),
  "deploy_get_application_environment": defineProductTool({ description: "Get CodeArts Deploy application environment detail", inputSchema: deployGetApplicationEnvironmentInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetApplicationEnvironmentHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetApplicationEnvironmentHandler }),
  "deploy_update_application_environment": defineProductTool({ description: "Update CodeArts Deploy application environment", inputSchema: deployUpdateApplicationEnvironmentInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployUpdateApplicationEnvironmentHandler>[0] }) => clients.deployClient, createProductHandler: createDeployUpdateApplicationEnvironmentHandler, rateLimitAction: "deploy_update_application_environment" }),
  "deploy_delete_application_environment": defineProductTool({ description: "Delete CodeArts Deploy application environment", inputSchema: deployDeleteApplicationEnvironmentInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployDeleteApplicationEnvironmentHandler>[0] }) => clients.deployClient, createProductHandler: createDeployDeleteApplicationEnvironmentHandler, rateLimitAction: "deploy_delete_application_environment" }),
  "deploy_create_application": defineProductTool({ description: "Create CodeArts Deploy application", inputSchema: deployCreateApplicationInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployCreateApplicationHandler>[0] }) => clients.deployClient, createProductHandler: createDeployCreateApplicationHandler, rateLimitAction: "deploy_create_application" }),
  "deploy_check_application_exists": defineProductTool({ description: "Check whether a CodeArts Deploy application name exists", inputSchema: deployCheckApplicationExistsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployCheckApplicationExistsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployCheckApplicationExistsHandler }),
  "deploy_check_application_creatable": defineProductTool({ description: "Check whether CodeArts Deploy application creation is allowed", inputSchema: deployCheckApplicationCreatableInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployCheckApplicationCreatableHandler>[0] }) => clients.deployClient, createProductHandler: createDeployCheckApplicationCreatableHandler }),
  "deploy_list_application_permissions": defineProductTool({ description: "List CodeArts Deploy application permissions", inputSchema: deployListApplicationPermissionsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListApplicationPermissionsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListApplicationPermissionsHandler }),
  "deploy_batch_delete_applications": defineProductTool({ description: "Batch delete CodeArts Deploy applications", inputSchema: deployBatchDeleteApplicationsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployBatchDeleteApplicationsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployBatchDeleteApplicationsHandler, rateLimitAction: "deploy_batch_delete_applications" }),
  "deploy_get_application_messages": defineProductTool({ description: "Get CodeArts Deploy application messages", inputSchema: deployGetApplicationMessagesInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetApplicationMessagesHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetApplicationMessagesHandler }),
  "deploy_list_application_groups": defineProductTool({ description: "List CodeArts Deploy application groups", inputSchema: deployListApplicationGroupsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListApplicationGroupsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListApplicationGroupsHandler }),
  "deploy_get_success_rate_metrics": defineProductTool({ description: "Get CodeArts Deploy success rate metrics", inputSchema: deployGetSuccessRateMetricsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetSuccessRateMetricsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetSuccessRateMetricsHandler }),
  "deploy_get_task_success_rate_metrics": defineProductTool({ description: "Get CodeArts Deploy task success rate metrics", inputSchema: deployGetTaskSuccessRateMetricsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetTaskSuccessRateMetricsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetTaskSuccessRateMetricsHandler }),
  "deploy_get_environment_permissions": defineProductTool({ description: "Get CodeArts Deploy environment permissions", inputSchema: deployGetEnvironmentPermissionsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetEnvironmentPermissionsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetEnvironmentPermissionsHandler }),
  "deploy_update_application_permission_level": defineProductTool({ description: "Update CodeArts Deploy application permission level", inputSchema: deployUpdateApplicationPermissionLevelInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployUpdateApplicationPermissionLevelHandler>[0] }) => clients.deployClient, createProductHandler: createDeployUpdateApplicationPermissionLevelHandler, rateLimitAction: "deploy_update_application_permission_level" }),
  "deploy_modify_application": defineProductTool({ description: "Modify CodeArts Deploy application", inputSchema: deployModifyApplicationInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployModifyApplicationHandler>[0] }) => clients.deployClient, createProductHandler: createDeployModifyApplicationHandler, rateLimitAction: "deploy_modify_application" }),
  "deploy_create_task_by_template": defineProductTool({ description: "Create CodeArts Deploy task from template", inputSchema: deployCreateTaskByTemplateInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployCreateTaskByTemplateHandler>[0] }) => clients.deployClient, createProductHandler: createDeployCreateTaskByTemplateHandler, rateLimitAction: "deploy_create_task_by_template" }),
  "deploy_list_environment_hosts": defineProductTool({ description: "List CodeArts Deploy hosts in an environment", inputSchema: deployListEnvironmentHostsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListEnvironmentHostsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListEnvironmentHostsHandler }),
  "deploy_import_hosts_to_environment": defineProductTool({ description: "Import hosts into a CodeArts Deploy environment", inputSchema: deployImportHostsToEnvironmentInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployImportHostsToEnvironmentHandler>[0] }) => clients.deployClient, createProductHandler: createDeployImportHostsToEnvironmentHandler, rateLimitAction: "deploy_import_hosts_to_environment" }),
  "deploy_list_environments": defineProductTool({ description: "List CodeArts Deploy application environments", inputSchema: deployListEnvironmentsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListEnvironmentsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListEnvironmentsHandler }),
  "deploy_list_tasks": defineProductTool({ description: "List CodeArts Deploy tasks", inputSchema: deployListTasksInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListTasksHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListTasksHandler }),
  "deploy_get_app": defineProductTool({ description: "Get CodeArts Deploy application detail", inputSchema: deployGetAppInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetAppHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetAppHandler }),
  "deploy_get_task": defineProductTool({ description: "Get CodeArts Deploy task detail", inputSchema: deployGetTaskInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetTaskHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetTaskHandler }),
  "deploy_get_deploy_source_detail": defineProductTool({ description: "Get CodeArts Deploy task source detail", inputSchema: deployGetDeploySourceDetailInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetDeploySourceDetailHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetDeploySourceDetailHandler }),
  "deploy_get_template_detail": defineProductTool({ description: "Get CodeArts Deploy template detail", inputSchema: deployGetTemplateDetailInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetTemplateDetailHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetTemplateDetailHandler }),
  "deploy_get_last_record_detail": defineProductTool({ description: "Get CodeArts Deploy v4 orchestration last record detail", inputSchema: deployGetLastRecordDetailInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetLastRecordDetailHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetLastRecordDetailHandler }),
  "deploy_get_v4_deploy_record": defineProductTool({ description: "Get CodeArts Deploy v4 deploy record detail", inputSchema: deployGetV4DeployRecordInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetV4DeployRecordHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetV4DeployRecordHandler }),
  "deploy_get_v4_deploy_record_step_detail": defineProductTool({ description: "Get CodeArts Deploy v4 deploy record step detail", inputSchema: deployGetV4DeployRecordStepDetailInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetV4DeployRecordStepDetailHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetV4DeployRecordStepDetailHandler }),
  "deploy_get_v4_deploy_record_step_logs": defineProductTool({ description: "Get CodeArts Deploy v4 deploy record step logs", inputSchema: deployGetV4DeployRecordStepLogsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetV4DeployRecordStepLogsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetV4DeployRecordStepLogsHandler }),
  "deploy_cancel_v4_deploy_record": defineProductTool({ description: "Cancel CodeArts Deploy v4 deploy record", inputSchema: deployCancelV4DeployRecordInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployCancelV4DeployRecordHandler>[0] }) => clients.deployClient, createProductHandler: createDeployCancelV4DeployRecordHandler, rateLimitAction: "deploy_cancel_v4_deploy_record" }),
  "deploy_list_app_operations_log": defineProductTool({ description: "List CodeArts Deploy application operation logs", inputSchema: deployListAppOperationsLogInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListAppOperationsLogHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListAppOperationsLogHandler }),
  "deploy_get_app_log": defineProductTool({ description: "Get CodeArts Deploy application log", inputSchema: deployGetAppLogInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetAppLogHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetAppLogHandler }),
  "deploy_get_execution_params": defineProductTool({ description: "Get CodeArts Deploy execution params", inputSchema: deployGetExecutionParamsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetExecutionParamsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetExecutionParamsHandler }),
  "deploy_get_runtime_variables": defineProductTool({ description: "Get CodeArts Deploy runtime variables", inputSchema: deployGetRuntimeVariablesInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetRuntimeVariablesHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetRuntimeVariablesHandler }),
  "deploy_list_variables": defineProductTool({ description: "List CodeArts Deploy variables by scope", inputSchema: deployListVariablesInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListVariablesHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListVariablesHandler }),
  "deploy_list_variable_history": defineProductTool({ description: "List CodeArts Deploy variable history by scope", inputSchema: deployListVariableHistoryInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListVariableHistoryHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListVariableHistoryHandler }),
  "deploy_list_histories": defineProductTool({ description: "List CodeArts Deploy histories", inputSchema: deployListHistoriesInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListHistoriesHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListHistoriesHandler }),
  "deploy_get_status": defineProductTool({ description: "Get CodeArts Deploy task status", inputSchema: deployGetStatusInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetStatusHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetStatusHandler }),
  "deploy_query_variables": defineProductTool({ description: "Query CodeArts Deploy variables by scope", inputSchema: deployQueryVariablesInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployQueryVariablesHandler>[0] }) => clients.deployClient, createProductHandler: createDeployQueryVariablesHandler }),
  "deploy_pass_v4_manual_check": defineProductTool({ description: "Pass CodeArts Deploy v4 manual check step", inputSchema: deployPassV4ManualCheckInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployPassV4ManualCheckHandler>[0] }) => clients.deployClient, createProductHandler: createDeployPassV4ManualCheckHandler, rateLimitAction: "deploy_pass_v4_manual_check" }),
  "deploy_refuse_v4_manual_check": defineProductTool({ description: "Refuse CodeArts Deploy v4 manual check step", inputSchema: deployRefuseV4ManualCheckInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployRefuseV4ManualCheckHandler>[0] }) => clients.deployClient, createProductHandler: createDeployRefuseV4ManualCheckHandler, rateLimitAction: "deploy_refuse_v4_manual_check" }),
  "deploy_start_app": defineProductTool({ description: "Start CodeArts Deploy task", inputSchema: deployStartAppInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployStartAppHandler>[0] }) => clients.deployClient, createProductHandler: createDeployStartAppHandler, rateLimitAction: "deploy_start_app" }),
  "deploy_list_system_configs": defineProductTool({ description: "List CodeArts Deploy system config keys", inputSchema: deployListSystemConfigsInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployListSystemConfigsHandler>[0] }) => clients.deployClient, createProductHandler: createDeployListSystemConfigsHandler }),
  "deploy_stop_app": defineProductTool({ description: "Stop CodeArts Deploy task", inputSchema: deployStopAppInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployStopAppHandler>[0] }) => clients.deployClient, createProductHandler: createDeployStopAppHandler, rateLimitAction: "deploy_stop_app" }),
  "deploy_rollback_app": defineProductTool({ description: "Rollback CodeArts Deploy task", inputSchema: deployRollbackAppInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployRollbackAppHandler>[0] }) => clients.deployClient, createProductHandler: createDeployRollbackAppHandler, rateLimitAction: "deploy_rollback_app" }),
  "deploy_rollback_v4_deploy_record": defineProductTool({ description: "Rollback CodeArts Deploy v4 deploy record", inputSchema: deployRollbackV4DeployRecordInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployRollbackV4DeployRecordHandler>[0] }) => clients.deployClient, createProductHandler: createDeployRollbackV4DeployRecordHandler, rateLimitAction: "deploy_rollback_v4_deploy_record" }),
  "deploy_rerun_v4_deploy_record": defineProductTool({ description: "Rerun CodeArts Deploy v4 deploy record", inputSchema: deployRerunV4DeployRecordInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployRerunV4DeployRecordHandler>[0] }) => clients.deployClient, createProductHandler: createDeployRerunV4DeployRecordHandler, rateLimitAction: "deploy_rerun_v4_deploy_record" }),
  "deploy_retry_v4_deploy_record": defineProductTool({ description: "Retry CodeArts Deploy v4 deploy record", inputSchema: deployRetryV4DeployRecordInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployRetryV4DeployRecordHandler>[0] }) => clients.deployClient, createProductHandler: createDeployRetryV4DeployRecordHandler, rateLimitAction: "deploy_retry_v4_deploy_record" }),
  "deploy_get_history_detail": defineProductTool({ description: "Get CodeArts Deploy history detail", inputSchema: deployGetHistoryDetailInput, selectHttpClient: (clients: { deployClient: Parameters<typeof createDeployGetHistoryDetailHandler>[0] }) => clients.deployClient, createProductHandler: createDeployGetHistoryDetailHandler })
} as const;

export function registerDeployTool(options: {
  toolName: string;
  server: RegisterableServer;
  mode: "http" | "stdio";
  sessionStore?: SessionCredentialStore;
  stdioClient?: DeployStdioClient;
  rateLimiter?: RateLimiter;
}) {
  return registerDefinedTool({
    toolName: options.toolName,
    server: options.server,
    definitions: deployToolDefinitions,
    mode: options.mode,
    sessionStore: options.sessionStore,
    stdioClient: options.stdioClient,
    rateLimiter: options.rateLimiter
  });
}
