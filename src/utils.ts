import { useEffect, useLayoutEffect } from "react";

// https://github.com/pmndrs/zustand/blob/833f57ed131e94f3ed48627d4cfbf09cb9c7df03/src/react.ts#L20-L23
export const isSSR =
  typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);

export const isBrowser = !isSSR;

export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect;
