import { asItemResult } from "../../../contracts/tool-result.js";
import { deployCopyApplicationInput } from "../schemas.js";

export function previewCopyApplication(input: {
  app_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: copy deploy application ${input.app_id}`, {
    appId: input.app_id,
    executed: false
  });
}

export function mapCopiedApplication(input: {
  id: string;
  name: string;
  region?: string;
  is_disable?: boolean;
  status?: string;
}) {
  return asItemResult(`Copied deploy application ${input.name}`, {
    id: input.id,
    name: input.name,
    region: input.region,
    isDisable: input.is_disable,
    status: input.status,
    executed: true
  });
}

type DeployCopyApplicationClient = {
  copyApplication: (input: {
    app_id: string;
  }) => Promise<{
    id: string;
    name: string;
    region?: string;
    is_disable?: boolean;
    status?: string;
  }>;
};

export function createDeployCopyApplicationHandler(client: DeployCopyApplicationClient) {
  return async (input: unknown) => {
    const parsed = deployCopyApplicationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCopyApplication(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.copyApplication(parsed);
    const result = mapCopiedApplication(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
