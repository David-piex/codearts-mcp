import { asItemResult } from "../../../contracts/tool-result.js";
import {
  testPlanBatchAddIteratorTestcasesInput,
  testPlanBatchUpdateTaskAttributesInput,
  testPlanCreateTesthubIteratorInput,
  testPlanCreateTesthubServiceInput,
  testPlanDeleteTesthubServiceInput,
  testPlanUpdateTesthubServiceInput
} from "../schemas.js";

export function createTestPlanBatchUpdateTaskAttributesHandler(client: {
  batchUpdateTaskAttributes: (input: Omit<
    ReturnType<typeof testPlanBatchUpdateTaskAttributesInput.parse>,
    "dry_run"
  >) => Promise<{
    project_id: string;
    task_uris: string[];
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchUpdateTaskAttributesInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult("Dry run: batch update test plan task attributes", {
        projectId: parsed.project_id,
        taskUris: parsed.task_uris,
        tagNames: parsed.tag_names,
        versionUri: parsed.version_uri,
        isAsync: parsed.is_async,
        isDelete: parsed.is_delete,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchUpdateTaskAttributes(parsed);
    const result = asItemResult("Batch updated test plan task attributes", {
      id: parsed.project_id,
      projectId: parsed.project_id,
      taskUris: response.task_uris,
      value: response.value,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanCreateTesthubIteratorHandler(client: {
  createTesthubIterator: (input: Omit<
    ReturnType<typeof testPlanCreateTesthubIteratorInput.parse>,
    "dry_run"
  >) => Promise<{
    iterator_id: string;
    name?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateTesthubIteratorInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: create TestHub iterator ${parsed.name}`, {
        projectId: parsed.project_id,
        name: parsed.name,
        assignedId: parsed.assigned_id,
        serviceIdList: parsed.service_id_list,
        planCycle: parsed.plan_cycle,
        branchUri: parsed.branch_uri,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTesthubIterator(parsed);
    const result = asItemResult(`Created TestHub iterator ${response.name ?? response.iterator_id}`, {
      id: response.iterator_id,
      iteratorId: response.iterator_id,
      name: response.name,
      status: response.status,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanBatchAddIteratorTestcasesHandler(client: {
  batchAddIteratorTestcases: (input: Omit<
    ReturnType<typeof testPlanBatchAddIteratorTestcasesInput.parse>,
    "dry_run"
  >) => Promise<{
    iterator_uri: string;
    testcase_count: number;
    added: boolean;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanBatchAddIteratorTestcasesInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: batch add testcases to iterator ${parsed.iterator_uri}`, {
        projectId: parsed.project_id,
        iteratorUri: parsed.iterator_uri,
        serviceId: parsed.service_id,
        testcaseIds: parsed.testcase_id_list,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchAddIteratorTestcases(parsed);
    const result = asItemResult(`Added ${response.testcase_count} testcases to iterator ${response.iterator_uri}`, {
      id: response.iterator_uri,
      iteratorUri: response.iterator_uri,
      testcaseCount: response.testcase_count,
      added: response.added,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanCreateTesthubServiceHandler(client: {
  createTesthubService: (input: Omit<
    ReturnType<typeof testPlanCreateTesthubServiceInput.parse>,
    "dry_run"
  >) => Promise<{
    service_id: string;
    service_name?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanCreateTesthubServiceInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: create TestHub service ${parsed.service_name}`, {
        serviceName: parsed.service_name,
        serverHost: parsed.server_host,
        serverType: parsed.server_type,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTesthubService(parsed);
    const result = asItemResult(`Created TestHub service ${response.service_name ?? response.service_id}`, {
      id: response.service_id,
      serviceId: response.service_id,
      serviceName: response.service_name,
      status: response.status,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanUpdateTesthubServiceHandler(client: {
  updateTesthubService: (input: Omit<
    ReturnType<typeof testPlanUpdateTesthubServiceInput.parse>,
    "dry_run"
  >) => Promise<{
    service_id: string;
    service_name?: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateTesthubServiceInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: update TestHub service ${parsed.service_id}`, {
        serviceId: String(parsed.service_id),
        serviceName: parsed.service_name,
        serverHost: parsed.server_host,
        serverType: parsed.server_type,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTesthubService(parsed);
    const result = asItemResult(`Updated TestHub service ${response.service_name ?? response.service_id}`, {
      id: response.service_id,
      serviceId: response.service_id,
      serviceName: response.service_name,
      status: response.status,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}

export function createTestPlanDeleteTesthubServiceHandler(client: {
  deleteTesthubService: (input: Omit<
    ReturnType<typeof testPlanDeleteTesthubServiceInput.parse>,
    "dry_run"
  >) => Promise<{
    service_id: string;
    deleted: boolean;
    raw: Record<string, unknown>;
  }>;
}) {
  return async (input: unknown) => {
    const parsed = testPlanDeleteTesthubServiceInput.parse(input);

    if (parsed.dry_run) {
      const result = asItemResult(`Dry run: delete TestHub service ${parsed.service_id}`, {
        serviceId: String(parsed.service_id),
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteTesthubService(parsed);
    const result = asItemResult(`Deleted TestHub service ${response.service_id}`, {
      id: response.service_id,
      serviceId: response.service_id,
      deleted: response.deleted,
      executed: true
    }, response.raw);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
