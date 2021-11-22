<!-- markdownlint-disable MD033 MD036 MD041 -->

# use-tailwind-breakpoint

![npm](https://badgen.net/npm/v/@kodingdotninja/use-tailwind-breakpoint)
![packagephobia/install](https://badgen.net/packagephobia/install/@kodingdotninja/use-tailwind-breakpoint)
![packagephobia/publish](https://badgen.net/packagephobia/publish/@kodingdotninja/use-tailwind-breakpoint)

Custom hooks to use Tailwind CSS breakpoints for React 🎐🔨

---

**Table of contents**

- [Installing](#installing)
- [Usage](#usage)
- [Available hooks](#available-hooks)
  - [`useBreakpoint()`](#usebreakpoint)
  - [`useBreakpointEffect()`](#usebreakpointeffect)
  - [`useBreakpointValue()`](#usebreakpointvalue)
- [Suggestions and/or questions](#suggestions-andor-questions)
- [Maintainers](#maintainers)
- [License](#license)

---

## Installing

```sh
# using npm
npm install @kodingdotninja/use-tailwind-breakpoint

# using yarn
yarn add @kodingdotninja/use-tailwind-breakpoint
```

## Usage

[Similar to `pmndrs/zustand`'s `create` API](https://github.com/pmndrs/zustand/#first-create-a-store), create the breakpoint hooks by resolving your `tailwind.config.js`:

```ts
import create from "@kodingdotninja/use-tailwind-breakpoint";
import tailwindConfig from "path/to/tailwind.config";

export const { useBreakpoint, ... } = create(tailwindConfig);
```

## Available hooks

### `useBreakpoint()`

Use breakpoint value from given breakpoint token

```jsx
import { useBreakpoint } from "@kodingdotninja/use-tailwind-breakpoint";

function App() {
  const isDesktop = useBreakpoint("md");

  return <div>Current view: {isDesktop ? "Desktop" : "Mobile"}</div>;
}
```

### `useBreakpointEffect()`

Use given breakpoint value to run an effect

```jsx
import { useBreakpointEffect } from "@kodingdotninja/use-tailwind-breakpoint";

function App() {
  useBreakpointEffect("md", (match) => {
    if (match) {
      console.log("Desktop view");
    }
  });
}
```

### `useBreakpointValue()`

Resolve value from given breakpoint value

```jsx
import { useBreakpointValue } from "@kodingdotninja/use-tailwind-breakpoint";

function App() {
  const value = useBreakpointValue("md", "Desktop", "Mobile");

  return <div>Current view: {value}</div>;
}
```

## Suggestions and/or questions

Head over to our [dedicated Discord channel for `use-tailwind-breakpoint`](https://discord.gg/Zrfr7VqtpR).

## Maintainers

- Griko Nibras ([@grikomsn](https://github.com/grikomsn))

## License

[MIT License, Copyright (c) 2021 Koding Ninja](./LICENSE)
