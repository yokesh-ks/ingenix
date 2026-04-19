import { input, select } from '@inquirer/prompts';
import type { IngenixConfig } from '../core/config/types.js';
import type { Context } from '../core/engine/types.js';
import { validateConfig } from '../core/validator/index.js';
import { writeConfigFile } from '../core/config/writer.js';
import { buildSingleAppConfig, buildMonorepoConfig, isCompleteConfig } from '../core/config/builder.js';
import { UserCancelledError, ValidationError, FileSystemError } from '../core/errors.js';
import { renderBanner, renderSuccessScreen, renderErrors } from '../ui/renderer.js';
import { MESSAGES } from '../constants/messages.js';
import { planExecution } from '../core/engine/planner.js';
import { executePlan } from '../core/engine/executor.js';

export async function createCommand(): Promise<IngenixConfig> {
  renderBanner();

  try {
    // Step 1: Project Name
    const name = await input({
      message: MESSAGES.PROMPTS.PROJECT_NAME,
      validate: (value) => value.trim().length > 0 ? true : MESSAGES.ERRORS.PROJECT_NAME_EMPTY
    });

    // Step 2: Architecture Selection
    const architecture = await select<'single' | 'monorepo'>({
      message: MESSAGES.PROMPTS.ARCHITECTURE,
      choices: [
        { name: 'Single App', value: 'single' },
        { name: 'Monorepo', value: 'monorepo' }
      ]
    });

    let config: IngenixConfig;

    // Conditional Flow
    if (architecture === 'single') {
      const appType = await select<'frontend' | 'backend' | 'fullstack'>({
        message: MESSAGES.PROMPTS.APP_TYPE,
        choices: [
          { name: 'Frontend', value: 'frontend' },
          { name: 'Backend', value: 'backend' },
          { name: 'Fullstack (Next.js)', value: 'fullstack' }
        ]
      });
      config = buildSingleAppConfig(name, appType);
    } else {
      const frontend = await select<'react' | 'next' | 'none'>({
        message: MESSAGES.PROMPTS.FRONTEND_FRAMEWORK,
        choices: [
          { name: 'React', value: 'react' },
          { name: 'Next.js', value: 'next' },
          { name: 'None', value: 'none' }
        ]
      });

      const backend = await select<'fastify' | 'express' | 'none'>({
        message: MESSAGES.PROMPTS.BACKEND_FRAMEWORK,
        choices: [
          { name: 'Fastify', value: 'fastify' },
          { name: 'Express', value: 'express' },
          { name: 'None', value: 'none' }
        ]
      });
      config = buildMonorepoConfig(name, frontend, backend);
    }

    // Validate Config
    const validation = validateConfig(config);

    if (!validation.valid) {
      renderErrors(validation.errors);
      throw new ValidationError('Configuration validation failed', validation.errors);
    }

    // Type Guard check
    if (!isCompleteConfig(config)) {
      throw new Error('Incomplete configuration');
    }

    // Write Config File
    try {
      await writeConfigFile(config);
    } catch (error) {
      throw new FileSystemError('Failed to write configuration file', error);
    }

    // Build context and execute plan
    const ctx: Context = {
      root: process.cwd(),
      config
    };

    const plan = await planExecution(ctx);
    await executePlan(plan);
    console.log('Project generation completed successfully!');

    renderSuccessScreen(config);
    
    return config;

  } catch (error) {
    if ((error as Error).message.includes('User force closed')) {
      throw new UserCancelledError();
    }
    throw error;
  }
}