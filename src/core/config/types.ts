export interface IngenixConfig {
  name: string;
  architecture: 'single' | 'monorepo';
  appType?: 'frontend' | 'backend' | 'fullstack';
  frontend?: 'react' | 'next' | 'none';
  backend?: 'fastify' | 'express' | 'none';
}

export type Architecture = 'single' | 'monorepo';
export type AppType = 'frontend' | 'backend' | 'fullstack';
export type FrontendFramework = 'react' | 'next' | 'none';
export type BackendFramework = 'fastify' | 'express' | 'none';