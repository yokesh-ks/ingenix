import type { Context, Task } from './types.js';

/**
 * Plugin contract: Extensible units of generation logic.
 *
 * Rules:
 * - name: unique identifier (used for resolution)
 * - dependencies: optional list of plugin names required
 * - apply: pure function returning tasks (no side effects)
 *
 * Plugins are the building blocks. Generators are simply one kind of plugin.
 */
export interface IngenixPlugin {
  name: string;
  dependencies?: string[];

  apply(ctx: Context): Task[] | Promise<Task[]>;
}

export type PluginModule = {
  default: IngenixPlugin;
} | IngenixPlugin;
