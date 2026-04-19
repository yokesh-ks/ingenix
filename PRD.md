# Product Requirements Document (PRD) - Ingenix

## Overview

Ingenix is a tool that helps developers start applications with clean, scalable structures from the beginning, avoiding the need for later refactoring.

This document serves as a strict architecture contract that defines the fundamental rules and constraints for the Ingenix system. It is not just documentation of features, but a binding specification that determines whether the system will scale or become messy in Phase 3.

## Architecture

### Execution Model (Task-Based Architecture)

Ingenix uses a task-based execution model where generators do not directly manipulate the file system.

Instead, they produce a list of tasks, which are executed by a centralized executor.

This ensures:
- separation of concerns
- predictable execution
- plugin extensibility

### Critical Architectural Rules

These are non-negotiable rules that define the fundamental architecture:

1. **Task System Definition**: The task system must be explicitly defined with clear type definitions and supported task types.
2. **Generator Contract**: Generators must follow a strict contract - they receive Context and return Task[] arrays.
3. **Executor Responsibility**: Only the executor interacts with the filesystem; generators are pure functions.
4. **Context Object**: A shared Context object is passed to all generators and plugins.
5. **Execution Flow**: The flow must be: config → planner → generators → tasks → executor → output.
6. **Plugin Readiness**: Plugins follow the same contract as generators and produce tasks.
7. **Constraints**: Generators must not write files directly, mutate global state, or depend on execution order.
8. **Template Rules**: Templates are static only - no logic, no TS/JS mixing.
9. **Success Criteria**: Generators return task lists, executor executes deterministically, no FS calls in generators.
10. **Risk Management**: Task-related risks must be explicitly documented with mitigations.

These rules determine whether the system scales or becomes messy in Phase 3.

### Task System

#### Supported Task Types

```ts
type Task =
  | { type: "create-dir"; path: string }
  | { type: "copy-template"; from: string; to: string }
  | { type: "write-file"; path: string; content: string };
```

#### Task System Rules

- Task types are strictly defined and cannot be extended arbitrarily
- Each task type has a single, well-defined purpose
- Task execution is deterministic and order-independent
- Task explosion is prevented through structured task types

#### Execution Responsibility

Only the executor interacts with the filesystem. Generators are pure functions that produce task lists without side effects.

### Generator Definition

Generators are responsible for producing a list of tasks based on the configuration and context.

They must not perform direct file system operations.

#### Generator Contract Rules

- Generators are pure functions (no side effects)
- Generators receive Context and return Task[] arrays
- Generators cannot write files directly
- Generators cannot mutate global state
- Generators cannot depend on execution order
- Generators must be deterministic (same input → same output)

#### Generator Interface

```ts
type Generator = (ctx: Context) => Task[];
```

### Execution Flow

```
config → planner → generators → tasks → executor → file system
```

### Executor Responsibility

- Generators = pure (no side effects)
- Executor = side effects (filesystem operations)

Only the executor performs actual file system operations.

#### Executor Rules

- Executor is the only component that interacts with the filesystem
- Executor executes tasks deterministically
- Executor handles task dependencies and ordering
- Executor provides error handling and rollback capabilities

### Context Object

```ts
type Context = {
  root: string;
  config: IngenixConfig;
};
```

* shared execution state
* passed to all generators
* required for plugin system

#### Context Rules

- Context is immutable during execution
- Context contains all necessary information for generators
- Context is passed consistently to all generators and plugins
- Context must not contain execution state or side effects

### Generator Architecture

Generators are divided into:

- App Generators (single, monorepo)
- Tech Generators (frontend, backend)

Each generator contributes tasks to the execution plan.

### Templates Guidelines

Templates are static assets only:
- No embedded logic or scripting
- No TypeScript/JavaScript code mixing
- Pure static files (HTML, CSS, config files, etc.)

Templates are copied via "copy-template" tasks only.

## Plugin Readiness

Even if plugins aren't implemented yet, the PRD must explicitly define plugin architecture for future phases.

### Plugin Contract

Plugins follow the same contract as generators:
- Receive Context object
- Produce Task[] arrays
- Declare dependencies explicitly

This ensures:
- Consistent extensibility
- Predictable plugin behavior
- Seamless integration into the execution engine

#### Plugin Rules

- Plugins must follow the same strict contract as generators
- Plugins must produce tasks, not perform direct operations
- Plugins must declare dependencies explicitly
- Plugins must be pure functions (no side effects)
- Plugins must be deterministic (same input → same output)

## Non-Functional Requirements

* deterministic execution (same config → same output)
* idempotent task execution (future)
* modular extensibility

## Constraints

Generators must not:
- write files directly
- modify global state
- depend on execution order implicitly

This prevents future chaos.

#### Additional Constraints

- Generators must not contain template logic
- Generators must not mix TypeScript/JavaScript inconsistently
- Generators must not have implicit dependencies
- Generators must not perform network operations
- Generators must not access external state

## Risks

| Risk                             | Mitigation                      |
| -------------------------------- | ------------------------------- |
| Generators tightly coupled to FS | enforce task abstraction        |
| plugin complexity                | reuse generator contract        |
| execution bugs                   | deterministic task system       |
| task explosion                   | structured task types           |
| generator side-effects           | strict contract enforcement     |
| plugin inconsistency             | shared interface requirements   |

#### Task-Related Risks

| Risk                             | Mitigation                      |
| -------------------------------- | ------------------------------- |
| Task explosion                   | structured task types           |
| Task ordering issues             | deterministic execution         |
| Task dependency conflicts        | explicit dependency declaration |
| Task execution failures          | robust error handling           |
| Task performance degradation     | efficient task batching         |

## Success Criteria

* generators return task list
* executor executes tasks deterministically
* no direct FS calls inside generators

#### Additional Success Criteria

* task system is extensible but controlled
* plugin architecture is consistent and predictable
* template system remains simple and static
* execution flow is clear and maintainable
* architectural rules are enforced and verifiable