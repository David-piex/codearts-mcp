export function formatReqTimestampText(value?: string | number) {
  if (typeof value === "undefined" || value === null || value === "") {
    return undefined;
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value} 00:00:00 Asia/Shanghai`;
  }

  const numeric = typeof value === "number" ? value : Number(value);
  const date = Number.isFinite(numeric) ? new Date(numeric) : new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  const shanghaiTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  return `${shanghaiTime.toISOString().slice(0, 19).replace("T", " ")} Asia/Shanghai`;
}
