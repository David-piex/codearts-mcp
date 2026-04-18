type DeployStep = {
  id?: string;
  name?: string;
  enable?: boolean;
  params?: unknown;
};

export type DeployParameterHint = {
  name: string;
  type?: string;
  required?: boolean;
  stepId?: string;
  stepName?: string;
  operationIndex?: number;
  operationName?: string;
  options: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function parseJson(value: string): unknown {
  const text = value.trim();
  if (!text.startsWith("{") && !text.startsWith("[")) {
    return undefined;
  }

  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function readName(value: Record<string, unknown>): string | undefined {
  return (
    readString(value.name) ??
    readString(value.key) ??
    readString(value.param_key) ??
    readString(value.paramName) ??
    readString(value.id)
  );
}

function extractOptions(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      if (isRecord(item)) {
        return readString(item.name) ?? readString(item.value) ?? readString(item.label);
      }

      return undefined;
    })
    .filter((item): item is string => Boolean(item));
}

function extractRequired(value: Record<string, unknown>): boolean | undefined {
  if (typeof value.required === "boolean") {
    return value.required;
  }

  if (isRecord(value.validation) && typeof value.validation.required === "boolean") {
    return value.validation.required;
  }

  return undefined;
}

function collectParameterObjects(value: unknown): Array<Record<string, unknown>> {
  if (typeof value === "string") {
    const parsed = parseJson(value);
    return parsed === undefined ? [] : collectParameterObjects(parsed);
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectParameterObjects(item));
  }

  if (!isRecord(value)) {
    return [];
  }

  if ("params" in value) {
    const nested = collectParameterObjects(value.params);
    if (nested.length > 0) {
      return nested;
    }
  }

  if (
    readName(value) ||
    "type" in value ||
    "limits" in value ||
    "options" in value ||
    "validation" in value ||
    "required" in value
  ) {
    return [value];
  }

  return Object.values(value).flatMap((item) => collectParameterObjects(item));
}

function dedupeParameters(parameters: DeployParameterHint[]) {
  return parameters.filter(
    (item, index, list) =>
      list.findIndex(
        (candidate) =>
          candidate.stepId === item.stepId &&
          candidate.operationIndex === item.operationIndex &&
          candidate.name === item.name &&
          candidate.type === item.type
      ) === index
  );
}

export function extractDeployStepParameters(steps?: Record<string, DeployStep>) {
  const parameters: DeployParameterHint[] = [];

  for (const [stepId, step] of Object.entries(steps ?? {})) {
    for (const item of collectParameterObjects(step.params)) {
      const name = readName(item);
      if (!name) {
        continue;
      }

      parameters.push({
        name,
        type: readString(item.type) ?? readString(item.param_type),
        required: extractRequired(item),
        stepId,
        stepName: step.name,
        options: extractOptions(item.limits ?? item.options)
      });
    }
  }

  const uniqueParameters = dedupeParameters(parameters);

  return {
    parameterCount: uniqueParameters.length,
    parameterNames: Array.from(new Set(uniqueParameters.map((item) => item.name))),
    parameters: uniqueParameters
  };
}

export function extractDeployOperationParameters(operationList?: unknown[]) {
  const parameters: DeployParameterHint[] = [];

  for (const [operationIndex, operation] of (operationList ?? []).entries()) {
    if (!isRecord(operation)) {
      continue;
    }

    const operationName =
      readString(operation.name) ??
      readString(operation.display_name) ??
      readString(operation.step_name) ??
      readString(operation.type);

    for (const item of collectParameterObjects(operation.params)) {
      const name = readName(item);
      if (!name) {
        continue;
      }

      parameters.push({
        name,
        type: readString(item.type) ?? readString(item.param_type),
        required: extractRequired(item),
        operationIndex,
        operationName,
        options: extractOptions(item.limits ?? item.options)
      });
    }
  }

  const uniqueParameters = dedupeParameters(parameters);

  return {
    parameterCount: uniqueParameters.length,
    parameterNames: Array.from(new Set(uniqueParameters.map((item) => item.name))),
    parameters: uniqueParameters
  };
}
