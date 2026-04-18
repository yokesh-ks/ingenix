import type { IngenixConfig } from '../config/types.js';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateConfig(config: Partial<IngenixConfig>): ValidationResult {
  const errors: string[] = [];

  // Name validation
  if (!config.name || config.name.trim().length === 0) {
    errors.push('Project name is required');
  } else {
    // Validate filename safe characters
    const validNameRegex = /^[a-zA-Z0-9-_]+$/;
    if (!validNameRegex.test(config.name.trim())) {
      errors.push('Project name may only contain letters, numbers, dashes and underscores');
    }
    if (config.name.trim().length > 50) {
      errors.push('Project name must be less than 50 characters');
    }
  }

  // Architecture validation
  if (!config.architecture) {
    errors.push('Architecture selection is required');
  } else if (config.architecture === 'single') {
    if (!config.appType) {
      errors.push('App type is required for single app architecture');
    }
  } else if (config.architecture === 'monorepo') {
    // Handle both undefined and 'none' values
    const hasFrontend = config.frontend && config.frontend !== 'none';
    const hasBackend = config.backend && config.backend !== 'none';
    
    if (!hasFrontend && !hasBackend) {
      errors.push('At least one of frontend or backend must be selected for monorepo');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
