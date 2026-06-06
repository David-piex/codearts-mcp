import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdatePlanImageInput } from "../schemas.js";

export function previewUpdatePlanImage(input: {
  project_id: string;
  plan_id: string;
  img_url: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update image for plan ${input.plan_id}`, {
    projectId: input.project_id,
    planId: input.plan_id,
    imageUrl: input.img_url,
    updated: false,
    executed: false
  });
}

export function mapUpdatedPlanImage(input: {
  id: number | string;
  name?: string;
  type?: string;
  project_id?: string;
  img_url?: string;
}) {
  return asItemResult(`Updated image for plan ${input.name ?? input.id}`, {
    id: String(input.id),
    projectId: input.project_id,
    name: input.name,
    type: input.type,
    imageUrl: input.img_url,
    updated: true,
    executed: true
  });
}

type ReqUpdatePlanImageClient = {
  updatePlanImage: (input: {
    project_id: string;
    plan_id: string;
    img_url: string;
    x_auth_token?: string;
  }) => Promise<{
    id: number | string;
    name?: string;
    type?: string;
    project_id?: string;
    img_url?: string;
  }>;
};

export function createReqUpdatePlanImageHandler(client: ReqUpdatePlanImageClient) {
  return async (input: unknown) => {
    const parsed = reqUpdatePlanImageInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePlanImage(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updatePlanImage(parsed);
    const result = mapUpdatedPlanImage(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
