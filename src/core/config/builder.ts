import type { IngenixConfig, Architecture, AppType, FrontendFramework, BackendFramework } from './types.js';

export function buildSingleAppConfig(name: string, appType: AppType): IngenixConfig {
  return {
    name: name.trim(),
    architecture: 'single',
    appType
  };
}

export function buildMonorepoConfig(
  name: string,
  frontend: FrontendFramework,
  backend: BackendFramework
): IngenixConfig {
  return {
    name: name.trim(),
    architecture: 'monorepo',
    frontend,
    backend
  };
}

export function isCompleteConfig(config: Partial<IngenixConfig>): config is IngenixConfig {
  if (config.architecture === 'single') {
    return !!config.name && !!config.architecture && !!config.appType;
  }
  
  if (config.architecture === 'monorepo') {
    return !!config.name && !!config.architecture && 
           config.frontend !== undefined && config.backend !== undefined;
  }
  
  return false;
}