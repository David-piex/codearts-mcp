type DelayOptions = {
  delayMs: number;
  sleep?: (delayMs: number) => Promise<void>;
};

function defaultSleep(delayMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

export async function mapSequentiallyWithDelay<T, R>(
  items: readonly T[],
  mapper: (item: T, index: number) => Promise<R>,
  options: DelayOptions
): Promise<R[]> {
  const results: R[] = [];
  const sleep = options.sleep ?? defaultSleep;

  for (const [index, item] of items.entries()) {
    results.push(await mapper(item, index));

    if (index < items.length - 1) {
      await sleep(options.delayMs);
    }
  }

  return results;
}
