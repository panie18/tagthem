# TagThem

Tag your items.

Homepage: https://tagthem.app  
License: MIT

## Table of contents

- [What is TagThem](#what-is-tagthem)
- [Features](#features)
- [Demo / Live app](#demo--live-app)
- [Installation](#installation)
- [Quick start](#quick-start)
  - [Library usage (TypeScript)](#library-usage-typescript)
  - [Browser usage (UMD / script)](#browser-usage-umd--script)
  - [CLI (if available)](#cli-if-available)
- [API (example)](#api-example)
- [Development](#development)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Authors / Maintainers](#authors--maintainers)
- [Contact](#contact)

## What is TagThem

TagThem is a small TypeScript project for tagging items — think flexible labels/tags that you can attach to any item in your app, query, and manage. This repository contains the source code and web app (see homepage) to help you add tagging capabilities to your project.

> Short description from repository metadata: "Tag your items."

## Features

- Written in TypeScript
- Simple, flexible tag model (create, rename, delete tags)
- Attach tags to items and query items by tag
- Designed to work in both browser and Node environments
- MIT licensed, ready for contributions

## Demo / Live app

A deployed demo is available at: https://tagthem.app

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/panie18/tagthem.git
cd tagthem
npm install
```

Build and run (typical scripts — adjust if your project uses different script names):

```bash
npm run build
npm start
```

If this project is published as an npm package in the future, you can install it via:

```bash
npm install tagthem
# or
yarn add tagthem
```

## Quick start

Below are example usages to get you started. These examples are illustrative — update them to match the actual exports and API in the repository.

### Library usage (TypeScript)

```ts
// Example — update imports to match your package or built output
import { TagManager } from 'tagthem';

const tm = new TagManager();

// Create tags
tm.createTag('urgent');
tm.createTag('feature');

// Attach tags to items
tm.addTag('item-1', 'urgent');
tm.addTag('item-2', 'feature');

// Query
const tagsForItem1 = tm.getTags('item-1'); // ['urgent']
const itemsWithFeature = tm.getItemsByTag('feature'); // ['item-2']
```

### Browser usage (UMD / script)

If you provide a UMD build or bundle, include it via a script tag and use a global (example):

```html
<script src="/path/to/tagthem.umd.js"></script>
<script>
  const tm = new TagThem.TagManager();
  tm.createTag('todo');
  tm.addTag('task-123', 'todo');
  console.log(tm.getTags('task-123'));
</script>
```

## Development

Suggested development workflow:

1. Fork the repository
2. Create a feature branch: git checkout -b feat/my-feature
3. Install deps: npm install
4. Run lint and tests locally (if present): npm run lint && npm test
5. Build: npm run build
6. Open a pull request against `main`

Add any repository-specific commands and conventions here (test frameworks, linters, commit message conventions).

## Contributing

Contributions are welcome! Please:

- Open an issue to discuss large changes before implementing them.
- Follow the existing code style and add tests for new behavior.
- Submit pull requests against the `main` branch.

If you want a CONTRIBUTING.md or a code of conduct, add them to improve collaboration.

## Roadmap

Planned improvements and ideas:

- Add persistent backends (localStorage, IndexedDB, server-backed)
- Publish as an npm package with clear API docs
- Add a CLI and UI components (React/Vue)
- Improve search/query capabilities (AND/OR, regex, fuzzy matching)
- Provide example integrations (React, Node APIs)

Feel free to open issues or PRs to propose/implement items on the roadmap.

## License

This project is licensed under the MIT License — see the LICENSE file for details.

## Authors / Maintainers

- panie18 — https://github.com/panie18

## Contact

Project homepage: https://tagthem.app  
Repository: https://github.com/panie18/tagthem
