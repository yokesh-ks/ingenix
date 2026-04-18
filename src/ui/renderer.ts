import chalk from 'chalk';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { MESSAGES } from '../constants/messages.js';
import type { IngenixConfig } from '../core/config/types.js';

export function renderBanner(): void {
  try {
    console.clear();
    console.log(
      gradient.pastel.multiline(
        figlet.textSync(MESSAGES.BANNER_TITLE, {
          font: 'Slant',
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );
  } catch {
    // Fallback for terminals without figlet support
    console.log(chalk.cyan.bold('\n  INGENIX'));
  }
  
  console.log(chalk.dim('╔══════════════════════════════════════════════════════════╗'));
  console.log(chalk.dim(`║  ${MESSAGES.BANNER_SUBTITLE.padEnd(52)} ║`));
  console.log(chalk.dim('╚══════════════════════════════════════════════════════════╝\n'));
}

export function renderSuccessScreen(config: IngenixConfig): void {
  console.log('\n' + chalk.green('╔══════════════════════════════════════════════════════════╗'));
  console.log(chalk.green('║  ✅ ') + chalk.bold(MESSAGES.SUCCESS.TITLE.padEnd(52)) + chalk.green('║'));
  console.log(chalk.green('╚══════════════════════════════════════════════════════════╝'));
  
  console.log(`\n📄  ${chalk.cyan.bold('File:')}    ingenix.config.json`);
  console.log(`📋  ${chalk.cyan.bold('Status:')}  ${chalk.green(MESSAGES.SUCCESS.STATUS)}\n`);
  
  console.log(chalk.dim('────────────────────────────────────────────────────────────'));
  console.log(chalk.bold('  Final Configuration:'));
  console.log(chalk.dim('────────────────────────────────────────────────────────────\n'));
  
  Object.entries(config).forEach(([key, value]) => {
    console.log(`  ${chalk.cyan(`${key.padEnd(15)}`)} ${chalk.white.bold(value)}`);
  });
  
  try {
    console.log('\n' + gradient.pastel(`  ${MESSAGES.SUCCESS.FINAL_MSG}`) + '\n');
  } catch {
    console.log('\n  ' + MESSAGES.SUCCESS.FINAL_MSG + '\n');
  }
}

export function renderErrors(errors: string[]): void {
  console.error('\n❌ Validation errors:');
  errors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
  console.log();
}