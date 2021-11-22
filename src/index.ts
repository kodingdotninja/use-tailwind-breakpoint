import * as React from "react";

import { isBrowser, useIsomorphicEffect } from "./utils";

export * from "./utils";

export type CreatorReturnType = {
  /**
   * Use breakpoint value from given breakpoint token
   *
   * ---
   *
   * @param breakpoint Breakpoint value
   *
   * @param defaultValue Default value to be used before initializing breakpoint value
   *
   * @returns Boolean value whether current view is on valid breakpoint
   *
   * @example
   *
   * ```jsx
   * const isDesktop = useBreakpoint("md");
   * ```
   */
  useBreakpoint<B>(breakpoint: B, defaultValue?: boolean): boolean;

  /**
   * Use given breakpoint value to run an effect
   *
   * ---
   *
   * @param breakpoint Breakpoint value
   *
   * @param effect Effect callback/closure when current view is on valid breakpoint
   *
   * @example
   *
   * ```jsx
   * useBreakpointEffect("md", (match) => {
   *   if (match) {
   *     ...
   *   }
   * });
   * ```
   */
  useBreakpointEffect<B>(breakpoint: B, effect: (match: boolean) => void): void;

  /**
   * Resolve value from given breakpoint value
   *
   * ---
   *
   * @param breakpoint Breakpoint value
   *
   * @param valid Value if current view is on valid breakpoint
   *
   * @param invalid Value if current view is not on valid breakpoint
   *
   * @returns Resolved value depending from given breakpoint
   *
   * @example
   *
   * ```jsx
   * const message = useBreakpointValue("md", "Desktop view", "Mobile view");
   * ```
   */
  useBreakpointValue<B, T, U>(breakpoint: B, valid: T, invalid: U): T | U;
};

/**
 * Initialize breakpoint hooks from given configuration
 *
 * ---
 *
 * @param screens Breakpoints/screens object (`{ sm: "640px", md: "768px", ... }`)
 *
 * @returns Breakpoint hooks
 *
 * @example
 *
 * ```jsx
 * // hooks/breakpoint.ts
 *
 * import create from "@kodingdotninja/use-tailwind-breakpoint";
 *
 * export const { useBreakpoint, ... } = create({ sm: "640px", ... });
 * ```
 */
export function create(screens: object | undefined) {
  if (!screens) {
    throw new Error("Failed to create breakpoint hooks, given `screens` value is invalid.");
  }

  function useBreakpoint(breakpoint: string, defaultValue: boolean = false) {
    const [match, setMatch] = React.useState(() => defaultValue);
    const matchRef = React.useRef(defaultValue);

    useIsomorphicEffect(() => {
      if (!(isBrowser && "matchMedia" in window)) return undefined;

      function track() {
        // @ts-expect-error accessing index with uncertain `screens` type
        const value = (screens[breakpoint] as string) ?? "999999px";
        const query = window.matchMedia(`(min-width: ${value})`);
        matchRef.current = query.matches;
        if (matchRef.current != match) {
          setMatch(matchRef.current);
        }
      }

      window.addEventListener("resize", track);
      return () => window.removeEventListener("resize", track);
    });

    return match;
  }

  function useBreakpointEffect<Breakpoint extends string>(breakpoint: Breakpoint, effect: (match: boolean) => void) {
    const match = useBreakpoint(breakpoint);
    React.useEffect(() => effect(match));
    return null;
  }

  function useBreakpointValue<Breakpoint extends string, T, U>(breakpoint: Breakpoint, valid: T, invalid: U) {
    const match = useBreakpoint(breakpoint);
    const value = React.useMemo(() => (match ? valid : invalid), [invalid, match, valid]);
    return value;
  }

  return {
    useBreakpoint,
    useBreakpointEffect,
    useBreakpointValue,
  } as CreatorReturnType;
}

export default create;
