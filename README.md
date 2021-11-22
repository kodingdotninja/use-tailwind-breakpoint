<!-- markdownlint-disable MD033 MD036 MD041 -->

# use-tailwind-breakpoint

![npm](https://badgen.net/npm/v/@kodingdotninja/use-tailwind-breakpoint)
![packagephobia/install](https://badgen.net/packagephobia/install/@kodingdotninja/use-tailwind-breakpoint)
![packagephobia/publish](https://badgen.net/packagephobia/publish/@kodingdotninja/use-tailwind-breakpoint)

Custom hooks to use breakpoints for React 🎐🔨

---

**Table of contents**

- [Installing](#installing)
- [Usage](#usage)
  - [Resolve from Tailwind CSS configuration](#resolve-from-tailwind-css-configuration)
  - [Extract `screens` values](#extract-screens-values)
  - [Without Tailwind CSS](#without-tailwind-css)
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

### Resolve from Tailwind CSS configuration

[Similar to `pmndrs/zustand`'s `create` API](https://github.com/pmndrs/zustand/#first-create-a-store), initialize the breakpoint hooks by passing the resolved Tailwind CSS configuration using [`resolveConfig`](https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/resolveConfig.js):

```ts
// /hooks/tailwind.ts

import create from "@kodingdotninja/use-tailwind-breakpoint";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "path/to/tailwind.config.js";

const config = resolveConfig(tailwindConfig);

export const { useBreakpoint } = create(config.theme.screens);
```

### Extract `screens` values

Another option is to extract all [`screens`](https://tailwindcss.com/docs/breakpoints) values into a separate file:

```js
// tailwind.screens.js or other name to separate breakpoint values
const screens = {
  sm: "640px",
  md: "768px",
  // ...
};
```

To keep the same values, `require` inside `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: require("path/to/tailwind.screens.js"),
  },
  // ...
};
```

Then pass the extracted `screens` to the `create` function:

```ts
// /hooks/tailwind.ts

import create from "@kodingdotninja/use-tailwind-breakpoint";

import screens from "path/to/tailwind.screens.js";

export const { useBreakpoint } = create(screens);
```

### Without Tailwind CSS

While this package was built in mind for Tailwind CSS usage, it can be used without it since there is no dependency at all. You can pass any breakpoint values:

```ts
// /hooks/breakpoint.ts

import create from "@kodingdotninja/use-tailwind-breakpoint";

export const { useBreakpoint } = create({
  sm: "640px",
  md: "768px",
  // ...
});
```

## Available hooks

### `useBreakpoint()`

Use breakpoint value from given breakpoint token

```jsx
import { useBreakpoint } from "./lib/tailwind";

function App() {
  const isDesktop = useBreakpoint("md");

  return <div>Current view: {isDesktop ? "Desktop" : "Mobile"}</div>;
}
```

### `useBreakpointEffect()`

Use given breakpoint value to run an effect

```jsx
import { useBreakpointEffect } from "./lib/tailwind";

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
import { useBreakpointValue } from "./lib/tailwind";

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
