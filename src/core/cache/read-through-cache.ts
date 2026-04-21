export function createReadThroughCache<TKey, TValue>(options: {
  ttlMs: number;
  now?: () => number;
}) {
  const now = options.now ?? Date.now;
  const valueCache = new Map<TKey, { expiresAt: number; value: TValue }>();
  const inFlight = new Map<TKey, Promise<TValue>>();

  return {
    clear(key?: TKey) {
      if (key === undefined) {
        valueCache.clear();
        inFlight.clear();
        return;
      }

      valueCache.delete(key);
      inFlight.delete(key);
    },

    async getOrLoad(key: TKey, loader: () => Promise<TValue>) {
      const cached = valueCache.get(key);

      if (cached && cached.expiresAt > now()) {
        return {
          cacheHit: true,
          value: cached.value
        };
      }

      const existing = inFlight.get(key);

      if (existing) {
        return {
          cacheHit: false,
          value: await existing
        };
      }

      const promise = loader().then((value) => {
        valueCache.set(key, {
          expiresAt: now() + options.ttlMs,
          value
        });
        inFlight.delete(key);
        return value;
      });

      inFlight.set(key, promise);

      return {
        cacheHit: false,
        value: await promise
      };
    }
  };
}
