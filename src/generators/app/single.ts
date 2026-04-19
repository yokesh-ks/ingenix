import type { Context } from '../../core/engine/types.js';
import type { Task } from '../../core/engine/types.js';
import { generate as generateReact } from '../frontend/react';
import { generate as generateNext } from '../frontend/next';
import { generate as generateExpress } from '../backend/express';
import { generate as generateFastify } from '../backend/fastify';

export function generateSingleApp(ctx: Context): Task[] {
  const { config } = ctx;
  const tasks: Task[] = [];

  // Create the project directory
  tasks.push({ type: 'create-dir', path: config.name });

  // Determine destination for the app template
  const appRoot = config.name;

  switch (config.appType) {
    case 'frontend': {
      const frontend = config.frontend || 'react';
      if (frontend === 'react') {
        tasks.push(...generateReact({ ...ctx, root: appRoot }));
      } else if (frontend === 'next') {
        tasks.push(...generateNext({ ...ctx, root: appRoot }));
      } else {
        throw new Error(`Unsupported frontend framework: ${frontend}`);
      }
      break;
    }
    case 'backend': {
      const backend = config.backend || 'fastify';
      if (backend === 'fastify') {
        tasks.push(...generateFastify({ ...ctx, root: appRoot }));
      } else if (backend === 'express') {
        tasks.push(...generateExpress({ ...ctx, root: appRoot }));
      } else {
        throw new Error(`Unsupported backend framework: ${backend}`);
      }
      break;
    }
    case 'fullstack': {
      // Fullstack typically uses Next.js as frontend, optionally with a backend API
      // For now, we generate Next.js which is fullstack itself
      const frontend = config.frontend || 'next';
      if (frontend === 'next') {
        tasks.push(...generateNext({ ...ctx, root: appRoot }));
      } else if (frontend === 'react') {
        // React-only fullstack would need separate backend, but not supported in single mode
        throw new Error('Fullstack with React requires a separate backend, use monorepo instead');
      } else {
        throw new Error(`Unsupported fullstack framework: ${frontend}`);
      }
      break;
    }
    default:
      throw new Error(`Unknown app type: ${config.appType}`);
  }

  return tasks;
}
