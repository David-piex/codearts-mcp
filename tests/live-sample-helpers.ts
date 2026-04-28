export function softPassWhenNoLiveSample<T>(
  samples: readonly T[] | undefined | null,
  sampleName: string
): samples is readonly [T, ...T[]] {
  if (samples && samples.length > 0) {
    return true;
  }

  process.stdout.write(`[live-soft-pass] ${sampleName} sample is empty; skipping sample assertions.\n`);
  return false;
}

export function readOptionalLiveSampleValue(value: unknown, sampleName: string) {
  const text = String(value ?? "").trim();

  if (text) {
    return text;
  }

  process.stdout.write(`[live-soft-pass] ${sampleName} sample is empty; skipping sample assertions.\n`);
  return undefined;
}
