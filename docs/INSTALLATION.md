# Installation checks and ERESOLVE troubleshooting

[English README](../README.md) · [繁體中文 README](../README.zh-TW.md)

## What was actually tested

On 2026-11-02, using Node v26.10.0 and npm 11.19.1 against the public registry:

| Project | Operation | Result |
| --- | --- | --- |
| Empty project | Install sidepact@0.5.0 as a dev dependency | Passed |
| React 19.2.6 + react-dom 19.2.6 | Install the application dependencies | Passed |
| Same React 19 project | Add sidepact@0.5.0 | Passed |
| React 19.2.6 + react-dom 19.2.6 + react-quill 2.0.0 | Add sidepact@0.5.0 | ERESOLVE, React/react-quill peer conflict |
| Same conflicting project | Add is-number@7.0.0 as an unrelated, zero-dependency control | Same ERESOLVE |

The deliberately conflicting fixture was initially installed with `--legacy-peer-deps` solely to recreate an already-existing incompatible dependency tree. This is not a recommended user fix. Failed additions left that fixture's package.json and lockfile unchanged.

Published Sidepact 0.5.0 has no `dependencies`, `peerDependencies`, or React requirement. It declares Node >=22.18.0. The audit demonstrates the cases above, not that every package-manager version or application is compatible.

Maintainers can reproduce the audit from the source repository:

```bash
node scripts/audit-install.mjs
```

It uses temporary projects, disables third-party lifecycle scripts, requires network access, and does not touch a real application's files. This online audit is separate from the normal CLI test suite.

## Why installing an unrelated tool can fail

A project-local npm install resolves the application's dependency tree. If a package already requires an incompatible React range, adding a zero-dependency tool does not make that tree valid. In this reproduced case, react-quill 2 accepts React 16/17/18 while the application requests React 19.

This is an onboarding limitation users can encounter, even though Sidepact did not introduce the peer dependency. It must be checked rather than assumed away.

## Supported project-local usage

In a project whose dependency tree resolves:

```bash
npm install -D sidepact && npx --no-install sidepact enable
```

The `&&` ensures activation runs only if installation succeeded. A successful local activation stores `npx --no-install sidepact ...` commands in the managed agent policy, rather than requiring a global executable.

If install reports ERESOLVE, do not run the activation command separately and expect it to find a package that was not installed.

## What to do when the application already conflicts

Inspect the relevant packages without installing anything:

```bash
npm ls react react-dom react-quill
```

Use the project's actual requirements to choose compatible versions, update/replace the conflicting integration, and test the application. Sidepact cannot choose that application's React/editor migration for you.

If you need Sidepact before that application cleanup, its independent global installation remains an option:

```bash
npm install -g sidepact
sidepact enable
```

This is a separate installation scope, not a repair of the application's React compatibility. It is not required for projects with a resolvable local dependency tree.

`--legacy-peer-deps` ignores peer contracts; `--force` relaxes safeguards. Neither is the default Sidepact installation recipe. If a team deliberately uses a workaround, review the resulting manifests/lockfile and test the application under its existing dependency policy. Do not silently add a project-wide npmrc setting to suppress future errors.

## 中文重點

- 已重現：乾淨專案與只有 React 19 的專案，都能專案內安裝 Sidepact。
- React 19＋react-quill 2 的既有 peer 衝突會阻擋新增套件；用另一個零依賴套件也得到相同錯誤。
- 其他已有相依衝突的使用者也可能遇到，所以不能把「支援專案安裝」當成所有專案都一定能安裝的保證。
- 安裝與啟用用 `&&` 串接；安裝失敗先停止，不繼續跑 npx，也不預設加忽略檢查的參數。
- 可先處理專案的相容性，或暫時選獨立全域安裝；此次查核沒有修改使用者的前端程式、React 版本或 lockfile。

## Official npm references

- [Peer dependency configuration and legacy-peer-deps](https://docs.npmjs.com/cli/using-npm/config/)
- [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/)
