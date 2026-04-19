import type { IngenixConfig } from '../config/types.js';

export type Task =
  | { type: "create-dir"; path: string }
  | { type: "copy-template"; from: string; to: string }
  | { type: "write-file"; path: string; content: string };

export type ExecutionPlan = Task[];

export type Generator = (ctx: Context) => Task[] | Promise<Task[]>;

export interface Context {
  root: string;
  config: IngenixConfig;
}