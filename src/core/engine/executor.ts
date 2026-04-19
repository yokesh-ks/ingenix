import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { copyTemplate } from '../../utils/fs';
import type { ExecutionPlan, Task } from './types.js';

function getTemplatesDir(): string {
  // __dirname points to src/core/engine (dev) or dist/core/engine (dist)
  // templates live at ../../templates from there
  return path.resolve(__dirname, '../../templates');
}

export async function executePlan(plan: ExecutionPlan): Promise<void> {
  const templatesDir = getTemplatesDir();

  for (const task of plan) {
    try {
      switch (task.type) {
        case 'create-dir':
          mkdirSync(task.path, { recursive: true });
          console.log(`✔ Creating directory at ${task.path}`);
          break;
        case 'copy-template':
          const templatePath = path.join(templatesDir, task.from);
          await copyTemplate(templatePath, task.to);
          console.log(`✔ Copying ${task.from} template to ${task.to}`);
          break;
        case 'write-file':
          writeFileSync(task.path, task.content, 'utf-8');
          console.log(`✔ Writing file at ${task.path}`);
          break;
        default:
          const _exhaustive: never = task;
          console.warn(`Unknown task type: ${(task as { type: string }).type}`);
      }
    } catch (error) {
      console.error(`Error executing task: ${task.type}`, error);
    }
  }
}
