import { useBreakpoint } from "./breakpoints";

export function App() {
  const isSmall = useBreakpoint("sm");
  const isMedium = useBreakpoint("md");
  const isLarge = useBreakpoint("lg");
  const isExtraLarge = useBreakpoint("xl");
  const isExtraExtraLarge = useBreakpoint("2xl");
  return (
    <>
      <h1>use-tailwind-breakpoint</h1>
      <ul>
        <li>isSmall: {`${isSmall}`}</li>
        <li>isMedium: {`${isMedium}`}</li>
        <li>isLarge: {`${isLarge}`}</li>
        <li>isExtraLarge: {`${isExtraLarge}`}</li>
        <li>isExtraExtraLarge: {`${isExtraExtraLarge}`}</li>
      </ul>
    </>
  );
}
