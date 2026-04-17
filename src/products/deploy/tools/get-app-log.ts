import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetAppLogInput } from "../schemas.js";

export function mapDeployAppLog(input: {
  application_id: string;
  record_id: string;
  status?: string;
  has_more?: boolean;
  text?: string;
  offset?: string;
  end_offset?: string;
}) {
  return asItemResult(`Loaded deploy app log ${input.record_id}`, {
    id: input.record_id,
    applicationId: input.application_id,
    status: input.status,
    hasMore: input.has_more,
    text: input.text,
    offset: input.offset,
    endOffset: input.end_offset
  });
}

type DeployGetAppLogClient = {
  getAppLog: (input: {
    application_id: string;
    record_id: string;
    step_id?: string;
    offset: string;
    end_offset: string;
  }) => Promise<{
    application_id: string;
    record_id: string;
    status?: string;
    has_more?: boolean;
    text?: string;
    offset?: string;
    end_offset?: string;
  }>;
};

export function createDeployGetAppLogHandler(client: DeployGetAppLogClient) {
  return async (input: unknown) => {
    const parsed = deployGetAppLogInput.parse(input);
    const response = await client.getAppLog(parsed);
    const result = mapDeployAppLog(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
