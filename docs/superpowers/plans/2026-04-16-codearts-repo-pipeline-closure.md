# CodeArts Repo + Pipeline Closure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify and finish the `Repo + Pipeline` closure package while producing an evidence-based completion assessment for the 11 existing CodeArts technical modules.

**Architecture:** Reuse the existing per-product module structure instead of adding new abstractions. First verify whether the scoped `Repo` and `Pipeline` tools are already complete, then assess the 11 modules against a shared rubric, and finally patch only the real gaps in code or docs that remain.

**Tech Stack:** TypeScript, Vitest, MCP server registration, product-local clients/schemas/tools, Markdown documentation

---

## File Structure

- Modify: `D:\Code\codearts-mcp\docs\superpowers\plans\2026-04-16-codearts-repo-pipeline-closure.md`
  This implementation plan.
- Modify: `D:\Code\codearts-mcp\docs\superpowers\specs\2026-04-16-codearts-repo-pipeline-closure-design.md`
  Only if spec clarification is needed during execution.
- Create: `D:\Code\codearts-mcp\docs\superpowers\assessments\2026-04-16-codearts-module-completion-matrix.md`
  The 11-module completion matrix with `A/B/C` grading and evidence-backed gaps.
- Modify: `D:\Code\codearts-mcp\README.md`
  Only if the verified capability surface or completion framing needs updated user-facing wording.
- Modify: `D:\Code\codearts-mcp\docs\product-overview.md`
  Only if the assessment reveals stale product capability framing.
- Modify: `D:\Code\codearts-mcp\docs\tool-examples.md`
  Only if high-frequency Repo or Pipeline tools are missing examples after verification.
- Modify as needed: `D:\Code\codearts-mcp\src\products\repo\**\*.ts`
  Only if verification finds a real Repo capability gap in the scoped closure package.
- Modify as needed: `D:\Code\codearts-mcp\src\products\pipeline\**\*.ts`
  Only if verification finds a real Pipeline capability gap in the scoped closure package.
- Modify as needed: `D:\Code\codearts-mcp\src\server\register-tools.ts`
  Only if a verified tool-registration inconsistency is found.
- Modify as needed: `D:\Code\codearts-mcp\src\server\create-server.ts`
  Only if a verified server wiring inconsistency is found.
- Modify as needed: `D:\Code\codearts-mcp\tests\products\repo\tools\*.ts`
  Add or tighten coverage only if Repo verification finds a real gap.
- Modify as needed: `D:\Code\codearts-mcp\tests\products\pipeline\tools\*.ts`
  Add or tighten coverage only if Pipeline verification finds a real gap.
- Modify as needed: `D:\Code\codearts-mcp\tests\server\*.ts`
  Add coverage only if registration or session support gaps are found.
- Modify as needed: `D:\Code\codearts-mcp\tests\e2e\tool-contracts.test.ts`
  Only if exposed tool counts or names change.

### Task 1: Verify The Repo Closure Package Against The Spec

**Files:**
- Read: `D:\Code\codearts-mcp\docs\superpowers\specs\2026-04-16-codearts-repo-pipeline-closure-design.md`
- Read: `D:\Code\codearts-mcp\src\products\repo\tools\index.ts`
- Read: `D:\Code\codearts-mcp\src\products\repo\client.ts`
- Read: `D:\Code\codearts-mcp\src\server\create-server.ts`
- Read: `D:\Code\codearts-mcp\tests\products\repo\tools\*.ts`
- Read: `D:\Code\codearts-mcp\tests\server\session-live-tools.test.ts`

- [ ] **Step 1: Write the failing verification checklist**

Create a local checklist in your notes with these required Repo closure items:

```text
repo_list_merge_request_changes
repo_list_merge_request_discussions
repo_create_merge_request_discussion
repo_review_merge_request
repo_merge_merge_request
repo_list_protected_branches
repo_list_repository_labels
repo_create_tag
repo_delete_tag
```

Mark each item only after you confirm all four conditions:

```text
1. tool file exists
2. tool name is exported in repo/tools/index.ts
3. tool is wired in src/server/create-server.ts
4. test coverage exists (live test or stronger)
```

- [ ] **Step 2: Run repository inspection to find Repo closure coverage**

Run:

```powershell
Get-ChildItem src/products/repo/tools -File | Select-Object Name
Get-ChildItem tests/products/repo/tools -File | Select-Object Name
```

Expected: all nine scoped Repo closure tools appear as implementation files, and matching tests exist for each tool family.

- [ ] **Step 3: Record Repo findings in the assessment draft**

Write these evidence-backed findings into the future assessment document:

```markdown
## Repo

- Grade candidate: A
- Closure package status: all scoped tools already implemented
- Evidence:
  - tool files exist under `src/products/repo/tools/`
  - tool names are exported from `src/products/repo/tools/index.ts`
  - server wiring exists in `src/server/create-server.ts`
  - live coverage exists in `tests/products/repo/tools/`
- Remaining work:
  - verify docs/examples stay aligned
  - only patch code if a specific inconsistency is discovered
```

- [ ] **Step 4: Run the Repo-focused verification tests**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/repo/tools tests/server/register-tools.test.ts tests/server/session-live-tools.test.ts
```

Expected: PASS, confirming Repo closure tools are registered and session-aware wiring remains intact.

- [ ] **Step 5: Commit only if Repo verification required code or doc changes**

If no file changed, skip commit.

If files changed, run:

```powershell
git add src/products/repo src/server README.md docs/product-overview.md docs/tool-examples.md tests/products/repo tests/server
git commit -m "feat(repo): close verified workflow gaps"
```

### Task 2: Verify The Pipeline Closure Package Against The Spec

**Files:**
- Read: `D:\Code\codearts-mcp\docs\superpowers\specs\2026-04-16-codearts-repo-pipeline-closure-design.md`
- Read: `D:\Code\codearts-mcp\src\products\pipeline\tools\index.ts`
- Read: `D:\Code\codearts-mcp\src\products\pipeline\client.ts`
- Read: `D:\Code\codearts-mcp\src\server\create-server.ts`
- Read: `D:\Code\codearts-mcp\tests\products\pipeline\tools\*.ts`
- Read: `D:\Code\codearts-mcp\tests\server\session-live-tools.test.ts`

- [ ] **Step 1: Write the failing verification checklist**

Create a local checklist in your notes with these required Pipeline closure items:

```text
pipeline_get_run_detail
pipeline_get_step_outputs
pipeline_list_artifacts
pipeline_approve_run
pipeline_reject_run
pipeline_retry_run
pipeline_stop_run
```

Mark each item only after you confirm all four conditions:

```text
1. tool file exists
2. tool name is exported in pipeline/tools/index.ts
3. tool is wired in src/server/create-server.ts
4. test coverage exists (live test or stronger)
```

- [ ] **Step 2: Run repository inspection to find Pipeline closure coverage**

Run:

```powershell
Get-ChildItem src/products/pipeline/tools -File | Select-Object Name
Get-ChildItem tests/products/pipeline/tools -File | Select-Object Name
```

Expected: all seven scoped Pipeline closure tools appear as implementation files, and matching tests exist for each tool family.

- [ ] **Step 3: Record Pipeline findings in the assessment draft**

Write these evidence-backed findings into the future assessment document:

```markdown
## Pipeline

- Grade candidate: A
- Closure package status: all scoped tools already implemented
- Evidence:
  - tool files exist under `src/products/pipeline/tools/`
  - tool names are exported from `src/products/pipeline/tools/index.ts`
  - server wiring exists in `src/server/create-server.ts`
  - live coverage exists in `tests/products/pipeline/tools/`
- Remaining work:
  - verify docs/examples stay aligned
  - only patch code if a specific inconsistency is discovered
```

- [ ] **Step 4: Run the Pipeline-focused verification tests**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/pipeline/tools tests/server/register-tools.test.ts tests/server/session-live-tools.test.ts
```

Expected: PASS, confirming Pipeline closure tools are registered and session-aware wiring remains intact.

- [ ] **Step 5: Commit only if Pipeline verification required code or doc changes**

If no file changed, skip commit.

If files changed, run:

```powershell
git add src/products/pipeline src/server README.md docs/product-overview.md docs/tool-examples.md tests/products/pipeline tests/server
git commit -m "feat(pipeline): close verified workflow gaps"
```

### Task 3: Build The 11-Module Completion Matrix

**Files:**
- Create: `D:\Code\codearts-mcp\docs\superpowers\assessments\2026-04-16-codearts-module-completion-matrix.md`
- Read: `D:\Code\codearts-mcp\src\products\**\*`
- Read: `D:\Code\codearts-mcp\src\server\register-tools.ts`
- Read: `D:\Code\codearts-mcp\src\server\create-server.ts`
- Read: `D:\Code\codearts-mcp\tests\products\**\*.ts`
- Read: `D:\Code\codearts-mcp\tests\server\*.ts`
- Read: `D:\Code\codearts-mcp\README.md`
- Read: `D:\Code\codearts-mcp\docs\product-overview.md`
- Read: `D:\Code\codearts-mcp\docs\tool-examples.md`

- [ ] **Step 1: Write the assessment document skeleton**

Create `docs/superpowers/assessments/2026-04-16-codearts-module-completion-matrix.md` with this content:

```markdown
# CodeArts Module Completion Matrix

## Rubric

Each module is graded against:

1. module skeleton
2. tool registration
3. read/write capability depth
4. test coverage
5. shared-session support
6. documentation closure

Grades:

- A: essentially complete
- B: usable but incomplete
- C: connected but still needing visible strengthening

## Matrix

| Module | Grade | Skeleton | Registration | Capability | Tests | Session | Docs | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| req |  |  |  |  |  |  |  |  |
| repo |  |  |  |  |  |  |  |  |
| pipeline |  |  |  |  |  |  |  |  |
| check |  |  |  |  |  |  |  |  |
| testplan |  |  |  |  |  |  |  |  |
| deploy |  |  |  |  |  |  |  |  |
| build |  |  |  |  |  |  |  |  |
| artifact |  |  |  |  |  |  |  |  |
| govern |  |  |  |  |  |  |  |  |
| inspector |  |  |  |  |  |  |  |  |
| perftest |  |  |  |  |  |  |  |  |
```

- [ ] **Step 2: Inspect product structure and fill the skeleton and registration columns**

Run:

```powershell
Get-ChildItem src/products -Directory | Select-Object Name
Get-Content src/server/register-tools.ts
```

Expected: all 11 modules exist under `src/products`, and all are included in the tool collection path.

- [ ] **Step 3: Inspect tests and fill the tests and session columns**

Run:

```powershell
Get-ChildItem tests/products -Directory | Select-Object Name
Get-Content tests/server/session-live-tools.test.ts
Get-Content tests/server/register-tools.test.ts
```

Expected: every module has product-level coverage, and shared-session coverage exists at the server layer for the supported product families.

- [ ] **Step 4: Inspect documentation and fill the docs column**

Run:

```powershell
Get-Content README.md
Get-Content docs/product-overview.md
Get-Content docs/tool-examples.md
```

Expected: product presence and major tool families are documented. Mark `B` instead of `A` if docs clearly lag real capability depth.

- [ ] **Step 5: Write evidence-backed grades and gaps**

Expand the assessment document with one section per module using this format:

```markdown
## <module>

- Grade: <A|B|C>
- Strengths:
  - <evidence-backed item>
  - <evidence-backed item>
- Gaps:
  - <specific missing or weaker area>
  - <specific missing or weaker area>
- Recommended priority:
  - <high|medium|low> with a one-sentence reason
```

Use `Repo` and `Pipeline` as `A` only if Task 1 and Task 2 verification passed with no meaningful gap.

- [ ] **Step 6: Commit the assessment document**

Run:

```powershell
git add docs/superpowers/assessments/2026-04-16-codearts-module-completion-matrix.md
git commit -m "docs: add codearts module completion matrix"
```

### Task 4: Patch Only Verified Gaps In Docs Or Code

**Files:**
- Modify only the specific files identified by Tasks 1-3

- [ ] **Step 1: Turn the assessment gaps into a short implementation list**

Write a local list containing only gaps that satisfy both conditions:

```text
1. within current scope
2. directly evidenced by code, tests, or docs
```

If the list is empty, move to Task 5 with no patching.

- [ ] **Step 2: Write a failing check for the highest-priority verified gap**

Use one of these patterns:

```text
- missing test coverage -> add or tighten a test
- stale docs -> write the exact doc correction
- registration inconsistency -> add server-level verification
- product inconsistency -> add a focused product-level test
```

Expected: a specific failure or mismatch is identified before editing code or docs.

- [ ] **Step 3: Apply the smallest possible fix**

Implement only the minimal patch needed to close the verified gap while preserving the existing architecture:

```text
- update docs if the gap is documentation-only
- update tests and implementation if the gap is real behavior
- avoid unrelated refactors
```

- [ ] **Step 4: Run the focused verification for that patch**

Run the smallest command that proves the gap is closed. For example:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/products/<product>/tools
& 'C:\nvm4w\nodejs\npm.cmd' test -- tests/server/register-tools.test.ts tests/server/session-live-tools.test.ts
```

Expected: PASS for the exact gap that was fixed.

- [ ] **Step 5: Commit the scoped fix**

Run:

```powershell
git add README.md docs/product-overview.md docs/tool-examples.md src tests
git commit -m "fix: align verified codearts closure gaps"
```

### Task 5: Run Final Verification And Publish The Outcome

**Files:**
- Read: `D:\Code\codearts-mcp\docs\superpowers\assessments\2026-04-16-codearts-module-completion-matrix.md`
- Modify as needed: final touched files only

- [ ] **Step 1: Run the full test suite**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' test
```

Expected: PASS with zero failing test files.

- [ ] **Step 2: Run the full build**

Run:

```powershell
& 'C:\nvm4w\nodejs\npm.cmd' run build
```

Expected: PASS and successful TypeScript compilation.

- [ ] **Step 3: Re-read the assessment and docs for consistency**

Read:

```text
docs/superpowers/assessments/2026-04-16-codearts-module-completion-matrix.md
README.md
docs/product-overview.md
docs/tool-examples.md
```

Expected: grades, claims, and user-facing capability statements do not contradict each other.

- [ ] **Step 4: Commit final alignment changes if needed**

If there are no further changes, skip commit.

If files changed, run:

```powershell
git add docs/superpowers/assessments/2026-04-16-codearts-module-completion-matrix.md README.md docs/product-overview.md docs/tool-examples.md
git commit -m "docs: align codearts closure verification results"
```

## Self-Review

### Spec coverage

- Repo closure verification is covered by Task 1.
- Pipeline closure verification is covered by Task 2.
- The 11-module rubric-based completion assessment is covered by Task 3.
- Verified gap remediation is covered by Task 4.
- Final test/build/document consistency verification is covered by Task 5.

No spec requirement is left without a task.

### Placeholder scan

- Removed `TODO`, `TBD`, and vague “implement later” wording.
- Each task contains explicit files, commands, and expected outcomes.
- Patching work is constrained to verified gaps instead of open-ended refactoring.

### Type consistency

- The module list is consistent with the spec across all tasks.
- The scoped Repo and Pipeline tool names match the design document naming.
- The `A/B/C` grading rubric stays consistent across the plan and the assessment task.
