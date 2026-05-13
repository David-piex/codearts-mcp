import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetProjectIssueUpdateNotificationInput } from "../schemas.js";

export function mapTestPlanProjectIssueUpdateNotification(input: {
  project_id: string;
  owner_id: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded issue update notification for ${input.owner_id}`, {
    id: `${input.project_id}:${input.owner_id}`,
    projectId: input.project_id,
    ownerId: input.owner_id,
    notification: input.raw
  });
}

type TestPlanGetProjectIssueUpdateNotificationClient = {
  getProjectIssueUpdateNotification: (input: {
    project_id: string;
    owner_id: string;
  }) => Promise<{
    project_id: string;
    owner_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectIssueUpdateNotificationHandler(
  client: TestPlanGetProjectIssueUpdateNotificationClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectIssueUpdateNotificationInput.parse(input);
    const response = await client.getProjectIssueUpdateNotification(parsed);
    const result = mapTestPlanProjectIssueUpdateNotification(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
