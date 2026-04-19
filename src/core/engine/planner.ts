import type { Context, ExecutionPlan } from './types.js';
import { generateSingleApp } from '../../generators/app/single.js';
import { generateMonorepo } from '../../generators/app/monorepo.js';

export async function planExecution(ctx: Context): Promise<ExecutionPlan> {
  const { config } = ctx;

  if (config.architecture === 'single') {
    return generateSingleApp(ctx);
  } else if (config.architecture === 'monorepo') {
    return generateMonorepo(ctx);
  } else {
    throw new Error(`Unknown architecture: ${config.architecture}`);
  }
}