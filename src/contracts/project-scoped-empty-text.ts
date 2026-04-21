export function formatProjectScopedEmptyText(input: {
  summary: string;
  page: number;
  keyword?: string;
  projectId: string;
  resourceLabel: string;
  serviceLabel: string;
}) {
  if (input.page > 1 || (input.keyword ?? "").trim() !== "") {
    return input.summary;
  }

  return [
    input.summary,
    "",
    `Hint: If you expected ${input.resourceLabel} here, confirm project_id \`${input.projectId}\` points to a project where CodeArts ${input.serviceLabel} is configured and visible to the current account.`
  ].join("\n");
}
