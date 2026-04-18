import fs from 'node:fs/promises';
import type { IngenixConfig } from './types.js';

export const CONFIG_FILENAME = 'ingenix.config.json';

export async function writeConfigFile(config: IngenixConfig): Promise<void> {
  const configJson = JSON.stringify(config, null, 2);
  await fs.writeFile(CONFIG_FILENAME, configJson, 'utf8');
}

export async function configFileExists(): Promise<boolean> {
  try {
    await fs.access(CONFIG_FILENAME);
    return true;
  } catch {
    return false;
  }
}