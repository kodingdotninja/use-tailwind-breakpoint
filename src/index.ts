import * as React from "react";

import { isBrowser, useIsomorphicEffect } from "./utils";

import resolveConfig from "tailwindcss/resolveConfig";
import { TailwindConfig } from "tailwindcss/tailwind-config";

export * from "./utils";

export type Breakpoints = { readonly [breakpoint: string]: string };

export type CreatorReturnType = {
  /**
   * Use breakpoint value from given breakpoint token
   *
   * ---
   *
   * @param breakpoint Breakpoint value ([view documentation](https://tailwindcss.com/docs/breakpoints))
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
   * @param breakpoint Breakpoint value ([view documentation](https://tailwindcss.com/docs/breakpoints))
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
   * @param breakpoint Breakpoint value ([view documentation](https://tailwindcss.com/docs/breakpoints))
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
 * Initialize breakpoint hooks from given Tailwind CSS configuration file
 *
 * ---
 *
 * @param configOrScreens Tailwind CSS configuration file (`tailwind.config.js`)
 *
 * @returns Breakpoint hooks
 *
 * @example
 *
 * ```jsx
 * // hooks/tailwind.ts
 *
 * import create from "@kodingdotninja/use-tailwind-breakpoint";
 * import tailwindConfig from "path/to/tailwind.config";
 *
 * export const { useBreakpoint, useBreakpointEffect, useBreakpointValue, ... } = create(tailwindConfig);
 * ```
 */
export function create<ConfigOrScreens extends TailwindConfig | Breakpoints>(configOrScreens: ConfigOrScreens) {
  const screens = (resolveConfig(configOrScreens as TailwindConfig).theme.screens ?? configOrScreens) as Breakpoints;

  function useBreakpoint(breakpoint: string, defaultValue: boolean = false) {
    const [match, setMatch] = React.useState(() => defaultValue);
    const matchRef = React.useRef(defaultValue);

    useIsomorphicEffect(() => {
      if (!(isBrowser && "matchMedia" in window)) return undefined;

      function track() {
        const value = screens?.[breakpoint] ?? "999999px";
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
