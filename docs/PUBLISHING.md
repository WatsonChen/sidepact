# Publishing Sidepact

Maintainers publish from the tool repository, not an application that uses it.

```bash
npm ci
npm run check
npm test
npm pack --dry-run
npm login --auth-type=web --registry=https://registry.npmjs.org/
npm whoami --registry=https://registry.npmjs.org/
npm publish --access public --registry=https://registry.npmjs.org/
```

The `prepare`/`prepack` scripts compile TypeScript into `dist/`. The runtime bin imports compiled JavaScript: Node does not strip TypeScript inside node_modules. The package includes the MIT license and both README languages.

Before publishing a new immutable version, install the packed tarball in a fresh temporary project with npm, invoke it through the local `.bin`/npm exec path, and verify generated agent instructions use `npx --no-install sidepact`. Also test a global installation using an isolated npm prefix. Do not rely only on extracting a tarball outside node_modules.

Finish any npm browser/2FA approval directly with npm. Do not put passwords, verification codes, or access tokens in project files or issue reports. An account login is not itself a publication. Confirm the published version through the registry before announcing availability or claiming success.

[Official npm publication guide](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages/)
