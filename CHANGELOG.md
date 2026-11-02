# Changelog

## Unreleased

### Installation audit and documentation

- Reproduce published 0.5.0 installation in clean, React 19, and conflicting React 19/react-quill 2 fixtures; use an unrelated zero-dependency package as a control.
- Confirm Sidepact has no published runtime or peer dependencies.
- Document that existing unresolved peer conflicts can block any project-local addition; do not present legacy-peer-deps as a default fix.
- Chain install and activation so failed installs do not trigger a second npx failure.
- Add a reproducible maintainer audit and detailed installation troubleshooting. No runtime behavior or npm release changes.

## 0.5.0 — 2026-11-02

- Publish the first npm release, `sidepact@0.5.0`, with the owner-selected MIT license.
- Verify registry metadata and the exact tested tarball hash, then install the published package by name and run its CLI.
- Compile TypeScript to JavaScript before packing; npm consumers execute `dist/` without TypeScript stripping inside node_modules.
- Add build/prepare/prepack scripts and include only runtime JavaScript plus documentation in the package.
- Support project-local activation: managed agent instructions use `npx --no-install sidepact` when installed at the Git root.
- Replace clone/link onboarding with npm global and project-local installation instructions.
- Validate both real global and project-local tarball installations before publishing.

## 0.4.1 — 2026-11-02

### English documentation and output

- Use `handoff.md` and `reply.md` as default filenames for English documents; preserve Chinese filenames for Traditional Chinese output and honor explicit output paths.
- Correct English README commands and walkthroughs to select English output.
- Add actual English generated handoff, reply, and confirmation examples; link English pages to English artifacts.
- Keep imports compatible with existing documents regardless of file name.

### Worked examples

- Add bilingual worked examples for an avatar contract round trip, an uncertain API contract, and a layout-only task with no handoff.
- Include CLI-generated documents and explain which file users send, how agents respond, and what completion claims mean.
- Link the examples from both README entry points. The walkthrough additions do not change runtime behavior.

## 0.4.0 — 2026-11-02

### Rename to Sidepact

- Rename the package, primary CLI, repository references, agent instructions, and bilingual documentation to Sidepact.
- Use `sidepact` as the public CLI; new projects use `sidepact.config.json` and `.sidepact/`.
- Continue reading existing `handoff.config.json` and `.git-handoff/` data without silently copying or replacing history.
- Recognize legacy managed instruction markers and update them in place on `sidepact enable`.
- Preserve document schema, handoff/task IDs, reply references, and output paths.
- Add a migration guide and agent-focused package keywords.
- The npm registry returned 404 for `sidepact` during the name check; this does not reserve the name. No npm publication was performed.

## 0.3.0 — 2026-10-30

### Agent handoff bridge

- Reposition the tool as a bridge between frontend, backend, mobile, and other agents through traceable Markdown.
- Add `handoff enable`, `disable`, and `agent-status` for one-time project-level activation.
- Support managed blocks in `AGENTS.md`, existing `AGENTS.override.md`, `CLAUDE.md`, and `.github/copilot-instructions.md`.
- Install a shared task-end review: no cross-repo work, work required, or needs confirmation. Require code evidence and acceptance criteria; distinguish assumptions from agreed contracts.
- Preserve other project instructions, back up nonempty files before changes, make enable idempotent, and remove only the managed block on disable.
- Reject malformed markers and symlink instruction paths. Do not modify global agent settings.
- Update both READMEs, the agent workflow, and trial/setup instructions.

This installs instructions for an existing agent to follow. It does not guarantee model compliance, wake a remote agent, deliver a file, install a push hook, or automatically infer requirements in the CLI. Reload project instructions or start a new agent session after activation.

### Verification

- Integration coverage for activation, repeat activation, exact preservation/removal, backups, adapter targets, override precedence, and unsafe instruction paths.
- Existing Markdown generation and cross-repository round-trip tests remain required.

## 0.2.2 — 2026-10-30

- Allow open handoffs without init or recipient setup.
- Record the receiving repo locally on import; keep the original document unchanged.
- Retain recipient checks for explicitly targeted handoffs; automatically address replies to the original sender.

## 0.2.1 — 2026-10-30

- Detect source identity from Git remote URLs, with a folder fallback.
- Add `info`, optional one-time defaults, and explicit aliases.
- Clarify tool installation versus application-repo usage, and agent-provided requirements versus CLI extraction.

## 0.2.0 — 2026-10-30

- Add import, explicit task updates, replies, local history, and JSON export.
- Add English/Traditional Chinese documents and a two-repository trial guide.

## 0.1.0 — 2026-10-30

- Initial Git-diff Markdown generator with explicit notes and added-line TODO/FIXME extraction.
