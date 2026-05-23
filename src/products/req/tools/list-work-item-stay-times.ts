import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListWorkItemStayTimesInput } from "../schemas.js";

type ReqWorkItemStayTime = {
  id: string;
  stay_time?: number | string;
};

function formatDurationText(seconds: number | string | undefined) {
  if (typeof seconds === "undefined") {
    return undefined;
  }

  const numericSeconds =
    typeof seconds === "number" ? seconds : Number.parseInt(seconds, 10);
  if (!Number.isFinite(numericSeconds)) {
    return String(seconds);
  }

  const days = Math.floor(numericSeconds / 86400);
  const hours = Math.floor((numericSeconds % 86400) / 3600);
  const minutes = Math.floor((numericSeconds % 3600) / 60);
  const remainingSeconds = numericSeconds % 60;
  const parts = [
    days ? `${days}d` : undefined,
    hours ? `${hours}h` : undefined,
    minutes ? `${minutes}m` : undefined,
    `${remainingSeconds}s`
  ].filter(Boolean);

  return parts.join(" ");
}

export function mapReqWorkItemStayTimes(input: {
  data: ReqWorkItemStayTime[];
  fails: string[];
  total?: number;
  total_stay_time?: number | string;
}) {
  return asListResult(
    `${input.data.length} work item stay times found`,
    input.data.map((item) => ({
      id: item.id,
      stayTimeSeconds:
        typeof item.stay_time !== "undefined" ? String(item.stay_time) : undefined,
      stayTimeText: formatDurationText(item.stay_time),
      rawStayTime: item
    })),
    undefined,
    {
      fails: input.fails,
      total: input.total,
      total_stay_time: input.total_stay_time,
      totalStayTimeText: formatDurationText(input.total_stay_time)
    }
  );
}

type ReqListWorkItemStayTimesClient = {
  listWorkItemStayTimes: (input: {
    project_id: string;
    work_item_ids: string[];
  }) => Promise<{
    data: ReqWorkItemStayTime[];
    fails: string[];
    total?: number;
    total_stay_time?: number | string;
  }>;
};

export function createReqListWorkItemStayTimesHandler(client: ReqListWorkItemStayTimesClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemStayTimesInput.parse(input);
    const response = await client.listWorkItemStayTimes(parsed);
    const result = mapReqWorkItemStayTimes(response);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        {
          label: "stayTime",
          get: (item) =>
            (item as { stayTimeText?: string; stayTimeSeconds?: string }).stayTimeText ??
            (item as { stayTimeSeconds?: string }).stayTimeSeconds
        }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
