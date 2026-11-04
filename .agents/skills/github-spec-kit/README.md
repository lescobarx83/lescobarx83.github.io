# GitHub Spec Kit Skill for AI Agent

This repository contains the **Spec Kit** skill for the AI Agent. It enables Spec-Driven Development (SDD) workflows directly within your AI-assisted development environment.

## Overview

The Spec Kit skill guides you through the process of defining, planning, and implementing features using the [GitHub Spec Kit](https://github.com/github/spec-kit) methodology. It transforms the agent into a proactive partner that enforces quality and consistency.

## Features

- **Project Initialization**: Streamlined setup for new Spec Kit projects.
- **Constitution Management**: Define and enforce project principles (Code Quality, Testing, etc.).
- **Spec Generation**: Interactive prompts to create detailed feature specifications.
- **Implementation Planning**: Structured technical planning (architecture, data models).
- **Task Breakdown**: Automatic generation of step-by-step implementation tasks.
- **Guided Implementation**: Context-aware assistance for executing tasks.

## Installation

To use this skill with your AI Agent:

1. Clone this repository or copy the content to your skills directory (e.g., `~/.gemini/skills/spec-kit`).
2. Ensure `SKILL.md` is present in the root of the skill folder.

## Usage

Once the skill is activated, you can use the following triggers to drive the workflow:

- `/speckit.constitution`: Establish project principles.
- `/speckit.specify`: Create a new feature specification.
- `/speckit.plan`: Create a technical implementation plan.
- `/speckit.tasks`: Generate actionable tasks from the plan.
- `/speckit.implement`: Start the implementation phase.

## Workflow

1. **Initialize**: Use `uvx --from specify-cli specify init` to bootstrap.
2. **Principles**: Define your `constitution.md`.
3. **Specify**: Describe *what* you are building in `spec.md`.
4. **Plan**: Decide *how* to build it in `plan.md`.
5. **Tasks**: Break it down into `tasks.md`.
6. **Implement**: Execute the tasks.

For more details on the Spec Kit methodology, visit the [official repository](https://github.com/github/spec-kit).
