import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetUserPackagePermissionInput } from "../schemas.js";

export function mapTestPlanUserPackagePermission(input: {
  user_id: string;
  package_type: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(
    `Loaded user package permission for ${input.user_id}`,
    {
      id: `${input.user_id}:${input.package_type}`,
      userId: input.user_id,
      packageType: input.package_type,
      permission: input.raw
    }
  );
}

type TestPlanGetUserPackagePermissionClient = {
  getUserPackagePermission: (input: {
    project_id: string;
    user_id: string;
    package_type: string;
  }) => Promise<{
    user_id: string;
    package_type: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetUserPackagePermissionHandler(
  client: TestPlanGetUserPackagePermissionClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetUserPackagePermissionInput.parse(input);
    const response = await client.getUserPackagePermission(parsed);
    const result = mapTestPlanUserPackagePermission(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
