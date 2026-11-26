import { useRef, useLayoutEffect, useCallback } from "react";

/** Devolve uma referência estável que chama sempre a versão mais recente da função. */
export function useCallbackRef<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(((...args) => callbackRef.current?.(...args)) as T, []) as T;
}
