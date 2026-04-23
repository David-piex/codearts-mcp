import { buildClientsForSession } from "./auth-session-runtime.js";
import type { SessionCredentialStore } from "./session-store.js";
import type { SessionToolExtra } from "./auth-session-runtime.js";

export function createSessionAwareHandler<
  THandler extends (client: any) => (input: any) => any
>(options: {
  injectedClient?: Parameters<THandler>[0];
  getClient: (extra: SessionToolExtra) => Parameters<THandler>[0];
  beforeHandle?: (
    input: Parameters<ReturnType<THandler>>[0],
    extra: SessionToolExtra
  ) => void | Promise<void>;
  createProductHandler: THandler;
}) {
  const objectHandlers = new WeakMap<object, ReturnType<THandler>>();
  const primitiveHandlers = new Map<Parameters<THandler>[0], ReturnType<THandler>>();

  function getOrCreateHandler(client: Parameters<THandler>[0]) {
    const isObjectLike =
      (typeof client === "object" && client !== null) || typeof client === "function";

    if (isObjectLike) {
      const cached = objectHandlers.get(client as object);

      if (cached) {
        return cached;
      }

      const nextHandler = options.createProductHandler(client) as ReturnType<THandler>;
      objectHandlers.set(client as object, nextHandler);
      return nextHandler;
    }

    const cached = primitiveHandlers.get(client);

    if (cached) {
      return cached;
    }

    const nextHandler = options.createProductHandler(client) as ReturnType<THandler>;
    primitiveHandlers.set(client, nextHandler);
    return nextHandler;
  }

  return async (
    input: Parameters<ReturnType<THandler>>[0],
    extra: SessionToolExtra
  ): Promise<Awaited<ReturnType<ReturnType<THandler>>>> => {
    await options.beforeHandle?.(input, extra);
    const client = options.injectedClient ?? options.getClient(extra);
    return await getOrCreateHandler(client)(input);
  };
}

export function createSessionAwareProductToolHandler<
  THandler extends (client: any) => (input: any) => any,
  TClients extends ReturnType<typeof buildClientsForSession>
>(options: {
  store: SessionCredentialStore;
  injectedClient?: Parameters<THandler>[0];
  selectClient: (clients: TClients) => Parameters<THandler>[0];
  beforeHandle?: (
    input: Parameters<ReturnType<THandler>>[0],
    extra: SessionToolExtra
  ) => void | Promise<void>;
  createProductHandler: THandler;
}) {
  return createSessionAwareHandler({
    injectedClient: options.injectedClient,
    beforeHandle: options.beforeHandle,
    getClient: (extra) =>
      options.selectClient(buildClientsForSession(options.store, extra) as TClients),
    createProductHandler: options.createProductHandler
  });
}
