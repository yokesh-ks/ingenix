import type { Context, ExecutionPlan, Task } from './types.js';
import { resolvePlugin, listPlugins } from './registry.js';

/**
 * Resolve plugin dependencies (basic check).
 * Ensures all required plugins exist in the registry.
 */
function resolveDependencies(pluginName: string, visited = new Set<string>()) {
  if (visited.has(pluginName)) return; // circular check

  const plugin = resolvePlugin(pluginName);
  if (!plugin) {
    throw new Error(`Plugin not found: ${pluginName}`);
  }

  visited.add(pluginName);

  if (plugin.dependencies) {
    for (const dep of plugin.dependencies) {
      if (!resolvePlugin(dep)) {
        throw new Error(`Missing dependency: ${dep} (required by ${pluginName})`);
      }
      // Recursively check deps
      resolveDependencies(dep, visited);
    }
  }
}

/**
 * Build a task list from plugins based on configuration.
 */
export async function planExecution(ctx: Context): Promise<ExecutionPlan> {
  const { config } = ctx;
  const tasks: Task[] = [];

  if (config.architecture === 'single') {
    // Create project directory
    tasks.push({ type: 'create-dir', path: config.name });

    // Determine which plugin to use
    let pluginName: string | undefined;

    if (config.appType === 'frontend') {
      pluginName = config.frontend === 'next' ? 'frontend-next' : 'frontend-react';
    } else if (config.appType === 'backend') {
      pluginName = config.backend === 'express' ? 'backend-express' : 'backend-fastify';
    } else if (config.appType === 'fullstack') {
      pluginName = config.frontend === 'next' ? 'frontend-next' : undefined;
      if (!pluginName) {
        throw new Error('Fullstack requires Next.js frontend (unsupported combination)');
      }
    }

    if (!pluginName) {
      throw new Error(`No plugin matches configuration: ${JSON.stringify(config)}`);
    }

    // Resolve dependency chain
    resolveDependencies(pluginName);

    // Resolve plugin and apply
    const plugin = resolvePlugin(pluginName);
    if (!plugin) {
      throw new Error(`Plugin not registered: ${pluginName}`);
    }

    // Create sub-context pointing to the project directory
    const pluginCtx: Context = {
      root: config.name,
      config
    };

    const pluginTasks = await plugin.apply(pluginCtx);
    tasks.push(...pluginTasks);

  } else if (config.architecture === 'monorepo') {
    // Monorepo is itself a plugin (TODO)
    resolveDependencies('monorepo');
    throw new Error('Monorepo mode not yet implemented as plugin');
  } else {
    throw new Error(`Unknown architecture: ${config.architecture}`);
  }

  return tasks;
}