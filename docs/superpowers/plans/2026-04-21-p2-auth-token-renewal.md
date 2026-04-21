# P2 Auth Token Renewal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure persisted HTTP auth tokens expire correctly and automatically renew when they are close to expiry, without forcing users to re-run `auth_configure_session` during active use.

**Architecture:** Keep the implementation narrow. Extend the auth repository with an in-place `touchByTokenHash` update path, then teach the auth context resolver to reject expired records, cap cache lifetime by the record's real expiry, and renew near-expiry raw-token requests by writing updated timestamps back through the repository. Session-only auth-id reuse should remain read-only.

**Tech Stack:** TypeScript, Node.js, Vitest, JSON file persistence

---

### Task 1: Add failing renewal and expiry regression tests

**Files:**
- Modify: `D:\Code\codearts-mcp\tests\server\auth-context.test.ts`
- Modify: `D:\Code\codearts-mcp\tests\server\auth-repository.test.ts`

- [ ] Add resolver tests for expired-token rejection, cookie-token renewal, bearer-token renewal, and session-only no-write behavior.
- [ ] Add a repository test proving `touchByTokenHash` updates timestamps in place.
- [ ] Run `npm test -- tests/server/auth-context.test.ts` and `npm test -- tests/server/auth-repository.test.ts` and confirm the new expectations fail before implementation.

### Task 2: Implement repository touch support and resolver renewal logic

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\auth-repository.ts`
- Modify: `D:\Code\codearts-mcp\src\server\auth-context.ts`
- Modify: `D:\Code\codearts-mcp\src\server\auth-session-tools.ts`

- [ ] Add an in-place repository update method for `last_used_at`, `updated_at`, and `expires_at`.
- [ ] Reject revoked or expired records during raw-token resolution.
- [ ] Renew only raw-token requests that are inside the configured renewal window.
- [ ] Prevent the in-memory token cache from serving past the persisted record's actual expiry.

### Task 3: Wire HTTP config into the resolver

**Files:**
- Modify: `D:\Code\codearts-mcp\src\server\http-app.ts`

- [ ] Pass the configured auth-token TTL from HTTP auth config into `createAuthContextResolver`.
- [ ] Preserve existing session binding and cookie issuance behavior.

### Task 4: Verify the batch

**Files:**
- Verify: `D:\Code\codearts-mcp\tests\server\auth-context.test.ts`
- Verify: `D:\Code\codearts-mcp\tests\server\auth-repository.test.ts`

- [ ] Run `npm test -- tests/server/auth-context.test.ts`.
- [ ] Run `npm test -- tests/server/auth-repository.test.ts`.
- [ ] Run `npm test -- tests/server/auth-tools.test.ts`.
- [ ] Run `npm test`.
