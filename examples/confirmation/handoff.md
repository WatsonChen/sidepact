---
schema_version: 1
kind: "handoff"
id: "hf-20261102-ca819bb1"
from: "Example/uncertain-web"
to: []
source_commit: "12c6190b48e8a112401f1017e01ac18b8cb773ce"
comparison: "HEAD to working tree"
status: "pending"
created_at: "2026-11-02T02:56:01.979Z"
language: "en"
files: ["src/profile.ts"]
tasks: [{"id":"TASK-001","text":"[needs-confirmation] Does GET /api/me already expose an avatar field? Evidence: src/profile.ts:2 only contains a mock with name; confirm the actual field, type, and no-avatar behavior before proposing a new field.","status":"pending"}]
notes: []
---

# Change handoff

Recipients: open — the repository that imports this file can take it on.

## Changed files

- src/profile.ts

## Tasks

- [ ] [TASK-001] \[needs-confirmation\] Does GET /api/me already expose an avatar field? Evidence: src/profile.ts:2 only contains a mock with name; confirm the actual field, type, and no-avatar behavior before proposing a new field. (pending)

## Notes / questions

- Confirm API contracts and acceptance criteria with the receiving team.

## Source and editing

- Tasks come from explicit notes and TODO/FIXME markers in added diff lines; they are not a complete task inventory.
- source_commit identifies HEAD, not uncommitted work. Reply files do not automatically include backend diffs.
- Front matter is machine-readable. Use sidepact update/reply to change task status; do not edit generated files by hand.
