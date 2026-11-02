# Contributing

English and Traditional Chinese feedback are welcome.

## Report a problem

Use the [issue templates](https://github.com/WatsonChen/sidepact/issues/new/choose). Include Node/Git versions, operating system, command, comparison mode, and a minimal example of expected versus actual behavior. Remove private details before posting.

## Propose a feature

Describe the handoff workflow and who receives the output. For larger changes, discuss the design in an issue first. The [roadmap](docs/ROADMAP.md) distinguishes planned work from current functionality.

## Development

Requires Git and Node.js 22.18+.

```bash
npm ci
npm run check
npm test
node bin/sidepact.js --help
```

`src/cli.ts` handles commands, `src/document.ts` handles the shared data model and Markdown, and `src/store.ts` handles local records. `src/identity.ts` normalizes hosted remote identities without network calls. `test/cli.test.js` uses temporary Git repositories, including frontend/backend round trips. Do not use real project repositories as destructive test fixtures.

Keep changes focused. Update both READMEs when behavior changes, and add a meaningful integration test for changes to Git comparison or document generation.

## License

Contributions are made under the project's [MIT license](LICENSE).

## Reproduce installation compatibility

Run `node scripts/audit-install.mjs` from a source checkout. This network-dependent audit installs the published 0.5.0 package in temporary clean, React 19, and deliberately conflicting React/react-quill fixtures, with an unrelated package as a control. It disables third-party lifecycle scripts and deletes its fixtures afterward. It does not change a real application. The fixture-only legacy-peer-deps setup is not an installation recommendation.
