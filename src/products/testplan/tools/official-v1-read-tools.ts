import { type ToolResult } from "../../../contracts/tool-result.js";
import {
  testPlanGetProjectDnsMappingV1Input,
  testPlanListProjectAssetsV1Input,
  testPlanListProjectBranchesV1Input
} from "../schemas.js";
import {
  formatTestPlanRecordListText,
  mapTestPlanRecordItem,
  mapTestPlanRecordList
} from "./generic-read-tools.js";

type RawRecord = Record<string, unknown>;

type Client = {
  listAssets: (input: { project_id: string }) => Promise<{
    assets: RawRecord[];
    total?: number;
  }>;
  listV1Branches: (input: {
    project_id: string;
    page: number;
    page_size: number;
    sort_field?: string;
    sort_type?: string;
  }) => Promise<{
    branches: RawRecord[];
    total?: number;
  }>;
  getApiTestDnsMapping: (input: { project_id: string }) => Promise<{
    raw: RawRecord;
  }>;
};

function listResponse<T extends { id?: string; name?: string }>(result: ToolResult<T>) {
  return {
    content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
    structuredContent: result
  };
}

export function createTestPlanListProjectAssetsV1Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListProjectAssetsV1Input.parse(input);
    const response = await client.listAssets(parsed);

    return listResponse(mapTestPlanRecordList(response.assets, response.total, "project assets v1", "asset"));
  };
}

export function createTestPlanListProjectBranchesV1Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListProjectBranchesV1Input.parse(input);
    const response = await client.listV1Branches(parsed);

    return listResponse(
      mapTestPlanRecordList(
        response.branches,
        response.total,
        "project branches v1",
        "branch",
        parsed.page,
        parsed.page_size
      )
    );
  };
}

export function createTestPlanGetProjectDnsMappingV1Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectDnsMappingV1Input.parse(input);
    const response = await client.getApiTestDnsMapping(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded TestPlan project DNS mapping v1 for project ${parsed.project_id}`,
      parsed.project_id,
      "dnsMapping",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
