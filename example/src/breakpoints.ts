import { create } from "@kodingdotninja/use-tailwind-breakpoint";

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const { useBreakpoint, useBreakpointEffect, useBreakpointValue } = create(breakpoints);
