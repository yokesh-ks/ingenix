#!/usr/bin/env node

import { program } from 'commander';
import { createCommand } from './cli/create.js';

program
  .name('ingenix')
  .description('Config Driven Architecture Engine')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new project configuration')
  .action(async () => {
    try {
      await createCommand();
    } catch (error) {
      console.error('Fatal error:', error);
      process.exit(1);
    }
  });

program.parse();