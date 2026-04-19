import type { IngenixPlugin } from './plugin.js';
import { reactPlugin } from '../../generators/frontend/react.js';
import { nextPlugin } from '../../generators/frontend/next.js';
import { expressPlugin } from '../../generators/backend/express.js';
import { fastifyPlugin } from '../../generators/backend/fastify.js';

/**
 * Internal plugin registry.
 * Maps plugin names to their plugin implementations.
 */
export const pluginRegistry: Record<string, IngenixPlugin> = {
  'frontend-react': reactPlugin,
  'frontend-next': nextPlugin,
  'backend-express': expressPlugin,
  'backend-fastify': fastifyPlugin,
};

/**
 * Resolve a plugin by name from the registry.
 */
export function resolvePlugin(name: string): IngenixPlugin | undefined {
  return pluginRegistry[name];
}

/**
 * List all available plugin names.
 */
export function listPlugins(): string[] {
  return Object.keys(pluginRegistry);
}
