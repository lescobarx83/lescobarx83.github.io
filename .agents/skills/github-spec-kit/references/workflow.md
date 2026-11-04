# Spec Kit Workflow Details

## 1. Initialize

If the user hasn't initialized the project:
1.  Check for `specify` CLI: `run_shell_command("uv tool list")` or `run_shell_command("which specify")`.
2.  If missing, install: `run_shell_command("uv tool install specify-cli --from git+https://github.com/github/spec-kit.git")`.
3.  Run init: `run_shell_command("specify init . --here")` (if in root) or `specify init <name>`.

## 2. Constitution

The constitution (`.specify/memory/constitution.md`) holds the "laws" of the project.
-   Ask the user for high-level rules.
-   Draft the file if it doesn't exist.
-   Reference this file when making decisions in later steps.

## 3. Specify (`spec.md`)

When creating a spec:
-   **Location**: `specs/<feature-name>/spec.md`
-   **Structure**:
    -   `# Feature Name`
    -   `## Problem Statement`: Why are we doing this?
    -   `## User Scenarios`: Concrete stories of usage.
    -   `## Requirements`: Functional, Non-functional.
    -   `## Out of Scope`: What we are NOT doing.

## 4. Plan (`plan.md`)

When planning:
-   **Location**: `specs/<feature-name>/plan.md`
-   **Structure**:
    -   `# Implementation Plan`
    -   `## Architecture`: High-level design.
    -   `## Components`: Modules, classes, functions to specific/modify.
    -   `## Data Model`: Schema changes (`data-model.md` if complex).
    -   `## Verification`: How to test.

## 5. Tasks (`tasks.md`)

When creating tasks:
-   **Location**: `specs/<feature-name>/tasks.md`
-   **Format**: Markdown checklist.
-   **Granularity**: Each task should be implementable in one "turn" or small commit.
-   **Example**:
    ```markdown
    - [ ] Create `src/utils/logger.py` with basic logging setup.
    - [ ] Add unit tests for logger in `tests/test_logger.py`.
    - [ ] Integrate logger into `src/main.py`.
    ```

## 6. Implement

When implementing:
1.  **Read**: Read `tasks.md` to find the next unchecked item.
2.  **Context**: Read `spec.md` and `plan.md` to understand the goal.
3.  **Execute**: Write the code and tests for *that specific task*.
4.  **Verify**: Run tests.
5.  **Update**: Check off the task in `tasks.md`.
6.  **Loop**: Repeat until all tasks are done.
