# README Deployment Usage Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `README.md` prioritize a copy-paste-friendly shared deployment and usage path so first-time readers can deploy and connect without reading the wiki first.

**Architecture:** Keep the generated stats blocks untouched, but reorder and rewrite the human-authored sections around a new fast-start entrypoint. The README should present shared `http + session` as the primary path, then provide a short local `stdio` fallback path and link deeper explanations to the wiki.

**Tech Stack:** Markdown, existing repo docs, npm doc stats check

---

### Task 1: Add the fast-start deployment structure to README

**Files:**
- Modify: `D:\Code\codearts-mcp\README.md`

- [ ] Review the current `README.md` structure and keep the generated stats blocks unchanged.
- [ ] Insert a new `## 3 分钟部署使用` section near the top, after the tool exposure summary and before the long status sections.
- [ ] In that new section, add a clear three-part flow:
  - server admin setup
  - team member client config
  - first-time `auth_configure_session` call plus success signals
- [ ] Include concrete copy-paste snippets for:
  - `.env`
  - `docker compose up -d --build`
  - `node dist/src/server/index.js`
  - MCP client JSON
  - `auth_configure_session` JSON

### Task 2: Rebalance README so shared deployment is the primary path

**Files:**
- Modify: `D:\Code\codearts-mcp\README.md`

- [ ] Rewrite the existing quick-start area into a detailed section where shared deployment comes first and local `stdio` comes second.
- [ ] Split the shared path into two role-based subsections:
  - server admin
  - team member
- [ ] Add “what counts as success” guidance so a reader knows they are done when:
  - `/health` is reachable
  - `/mcp` is reachable
  - `tools/list` succeeds
  - the four recommended read tools can be called
- [ ] Keep deeper architecture, live validation, and troubleshooting details out of the README body and continue to point readers to the wiki pages for those topics.

### Task 3: Verify README consistency

**Files:**
- Modify: `D:\Code\codearts-mcp\README.md`
- Verify: `D:\Code\codearts-mcp\docs\superpowers\specs\2026-04-21-readme-deployment-usage-entry-design.md`

- [ ] Re-read the spec and confirm the final README order matches:
  - project summary
  - `3 分钟部署使用`
  - shared deployment
  - client onboarding
  - validation flow
  - local `stdio`
  - advanced doc links
- [ ] Run `npm run stats:check-docs`.
- [ ] Check `git diff -- README.md` and verify the generated stats markers are still present.
