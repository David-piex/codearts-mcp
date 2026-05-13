import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetCurrentUserPackagePermissionInput } from "../schemas.js";

export function mapTestPlanCurrentUserPackagePermission(input: {
  project_id: string;
  package_type: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(
    `Loaded current user package permission for ${input.package_type}`,
    {
      id: `${input.project_id}:${input.package_type}`,
      projectId: input.project_id,
      packageType: input.package_type,
      permission: input.raw
    }
  );
}

type TestPlanGetCurrentUserPackagePermissionClient = {
  getCurrentUserPackagePermission: (input: {
    project_id: string;
    package_type: string;
  }) => Promise<{
    project_id: string;
    package_type: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetCurrentUserPackagePermissionHandler(
  client: TestPlanGetCurrentUserPackagePermissionClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetCurrentUserPackagePermissionInput.parse(input);
    const response = await client.getCurrentUserPackagePermission(parsed);
    const result = mapTestPlanCurrentUserPackagePermission(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
