# Project Name: slctodo

## technologies used and why:

- [Vite](https://vitejs.dev/guide/): Lightning-fast dev server, optimized builds, seamless HMR, minimal config, modern ecosystem integration. Boost your development speed.
- [SWC](https://swc.rs/): compiles JavaScript rapidly by leveraging Rust's speed and parallelism, optimizing code for performance.
- [Husky](https://typicode.github.io/husky/get-started.html): set up to run linting, formatting, and tests before each commit, ensuring that only properly formatted and tested code gets committed.
- [EditorConfig](https://editorconfig.org/): used to maintain consistent coding styles across different editors.
- [Prettier](https://prettier.io/)/[ESLint](https://eslint.org/): work together to enforce code formatting and best practices.
- [Styled-Components](https://styled-components.com/): easy and maintainable styling solutions for React components.
- [Vitest](https://vitest.dev/guide/): provides a simple and fast testing environment for your components.
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary): guidelines for structuring commit messages in a consistent and standardized format.

### architecture:

- Component-based: Is an approach to software design where the system is built by mounting independent, reusable components that encapsulate specific functionality or visual elements.
- separation of concerns (SoC): is a design principle that dividing a software system into distinct sections, with each responsible for a specific aspect of functionality.

#### Folder architecture:

1 _src:_ This is the main folder where the source code resides.

- _app:_ Contains code related to the core functionality of application.

  - contexts: This folder contains React context providers and related logic for managing global state.
  - hooks: custom React hooks that provide reusable pieces of logic for a components.
  - router: related to routing in application.
  - utils: Contains utility functions and helper methods that are used across application.

- _views:_ Contains code related to the visual representation of application.
  - components: This folder contains reusable UI components that are used across multiple pages or sections.
  - pages: represent different pages or views. Each page component typically corresponds to a specific route.
  - styles: CSS-in-JS files that provide styling for components and pages.

## Getting Started:

1. Clone this repository to your local machine:

   ```bash
       git clone https://github.com/Sallesg/slctodo.git
   ```

2. Navigate into the project directory:

   ```bash
       cd slctodo
   ```

3. Install dependencies:

   ```bash
       pnpm install
   ```

---

## 🔑 Credentials

### Account 1

- **Login:** `slc1@slc.com`
- **Password:** `Slc1@slc.com`
- **_ unlimited _**

### Account 2

- **Login:** `create/register an user`
- **Password:** ``
- **_ limited _**

---

## ⚠️ Important Notices

1. **unlimited:** Has access to all available data.
2. **limited:** Only has access to create new tasks

---

## Available Scripts

In the project directory, you can run the following scripts:

#### Development Server

```bash
    pnpm dev
```

Open http://localhost:5173 to view it in the browser.

#### Testing

Launches the test runner:

```bash
    pnpm test
```

```bash
    pnpm test:coverage
```

```bash
    pnpm test:ui
```

#### License

This project is licensed under the MIT License - see the LICENSE file for details.
