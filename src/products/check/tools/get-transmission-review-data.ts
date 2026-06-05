import { checkGetTransmissionReviewDataInput } from "../schemas.js";
import { mapCheckRecordItem } from "./generic-read-tools.js";

type Client = {
  getTransmissionReviewData: (input: {
    is_check_project: 0 | 1;
    x_auth_token: string;
    domain_id?: string;
    project_id?: string;
  }) => Promise<{
    status?: string;
    http_status?: string | number;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckGetTransmissionReviewDataHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkGetTransmissionReviewDataInput.parse(input);
    const response = await client.getTransmissionReviewData(parsed);
    const id = parsed.project_id ?? parsed.domain_id ?? `is-check-project-${parsed.is_check_project}`;
    const result = mapCheckRecordItem(
      `Loaded Check transmission review data ${id}`,
      id,
      "reviewData",
      response.raw,
      {
        isCheckProject: parsed.is_check_project,
        status: response.status,
        httpStatus: response.http_status,
        authMode: "x_auth_token"
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
