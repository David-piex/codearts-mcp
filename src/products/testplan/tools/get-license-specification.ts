import { testPlanGetLicenseSpecificationInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanGetLicenseSpecificationClient = {
  getLicenseSpecification: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetLicenseSpecificationHandler(
  client: TestPlanGetLicenseSpecificationClient
) {
  return async (input: unknown) => {
    testPlanGetLicenseSpecificationInput.parse(input);
    const response = await client.getLicenseSpecification();
    const result = mapTestPlanValueItem(
      "Loaded license specification",
      "license-specification",
      "specification",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
