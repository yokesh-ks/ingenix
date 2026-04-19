import type { Context } from '../../core/engine/types.js';
import type { Task } from '../../core/engine/types.js';
import { generate as generateNext } from '../frontend/next';
import { generate as generateReact } from '../frontend/react';
import { generate as generateExpress } from '../backend/express';
import { generate as generateFastify } from '../backend/fastify';

export function generateMonorepo(ctx: Context): Task[] {
  const { config } = ctx;
  const tasks: Task[] = [];

  // Create apps directory
  tasks.push({ type: 'create-dir', path: 'apps' });

  // Generate web app if frontend !== 'none'
  if (config.frontend && config.frontend !== 'none') {
    tasks.push({ type: 'create-dir', path: 'apps/web' });
    const webCtx = { ...ctx, root: 'apps/web' };
    const webFramework = config.frontend === 'next' ? generateNext : generateReact;
    tasks.push(...webFramework(webCtx));
  }

  // Generate api app if backend !== 'none'
  if (config.backend && config.backend !== 'none') {
    tasks.push({ type: 'create-dir', path: 'apps/api' });
    const apiCtx = { ...ctx, root: 'apps/api' };
    const apiFramework = config.backend === 'express' ? generateExpress : generateFastify;
    tasks.push(...apiFramework(apiCtx));
  }

  // Create packages directory
  tasks.push({ type: 'create-dir', path: 'packages' });

  // Create packages/ui
  tasks.push({ type: 'create-dir', path: 'packages/ui' });
  tasks.push({
    type: 'write-file',
    path: 'packages/ui/package.json',
    content: JSON.stringify({ name: 'ui', version: '1.0.0', main: 'index.js' }, null, 2)
  });
  tasks.push({
    type: 'write-file',
    path: 'packages/ui/index.js',
    content: 'console.log(\'UI package\');'
  });

  // Create packages/utils
  tasks.push({ type: 'create-dir', path: 'packages/utils' });
  tasks.push({
    type: 'write-file',
    path: 'packages/utils/package.json',
    content: JSON.stringify({ name: 'utils', version: '1.0.0', main: 'index.js' }, null, 2)
  });
  tasks.push({
    type: 'write-file',
    path: 'packages/utils/index.js',
    content: `function add(a, b) {
  return a + b;
}

module.exports = { add };`
  });

  // Create root package.json
  tasks.push({
    type: 'write-file',
    path: 'package.json',
    content: JSON.stringify({ name: config.name, version: '1.0.0', private: true, workspaces: ['apps/*', 'packages/*'] }, null, 2)
  });

  return tasks;
}