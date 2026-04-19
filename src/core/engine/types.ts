import type { IngenixConfig } from '../config/types.js';

/**
 * Task contract: All side effects are expressed as declarative tasks.
 * The executor is the only component that performs I/O.
 *
 * Rules:
 * 1. Generators must return Task[] (no side effects)
 * 2. Executor handles all FS operations
 * 3. Planner only aggregates tasks (no I/O)
 */
export type Task =
  | { type: "create-dir"; path: string }
  | { type: "copy-template"; from: string; to: string }
  | { type: "write-file"; path: string; content: string };

/**
 * Execution context passed to generators and planner.
 * Contains project root and resolved configuration.
 */
export interface Context {
  root: string;
  config: IngenixConfig;
}

/**
 * Generator function signature.
 * Pure function: given a Context, returns a Task[] (or Promise thereof).
 * NO I/O here — only describe what should happen.
 */
export type Generator = (ctx: Context) => Task[] | Promise<Task[]>;

export type ExecutionPlan = Task[];