import { useMemo, useState } from "react";

import { isBrowser, useIsomorphicEffect } from "./utils";

export function create<TScreens extends Record<string, string>>(screens: TScreens) {
  function useBreakpoint(breakpoint: keyof TScreens, defaultValue: boolean = false) {
    const [match, setMatch] = useState(() => defaultValue);

    useIsomorphicEffect(() => {
      if (!(isBrowser && "matchMedia" in window && window.matchMedia)) return undefined;

      const value = screens[breakpoint] ?? "999999px";
      const query = window.matchMedia(`(min-width: ${value})`);

      function listener(event: MediaQueryListEvent) {
        setMatch(event.matches);
      }

      setMatch(query.matches);

      query.addEventListener("change", listener);
      return () => query.removeEventListener("change", listener);
    }, [breakpoint, defaultValue]);

    return match;
  }

  function useBreakpointEffect(breakpoint: keyof TScreens, effect: (match: boolean) => void) {
    const match = useBreakpoint(breakpoint);
    useIsomorphicEffect(() => effect(match), [breakpoint, effect]);
    return null;
  }

  function useBreakpointValue<T, U>(breakpoint: keyof TScreens, valid: T, invalid: U) {
    const match = useBreakpoint(breakpoint);
    const value = useMemo(() => (match ? valid : invalid), [invalid, match, valid]);
    return value;
  }

  return {
    useBreakpoint,
    useBreakpointEffect,
    useBreakpointValue,
  };
}
