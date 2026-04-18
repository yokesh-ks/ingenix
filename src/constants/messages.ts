export const MESSAGES = {
  BANNER_TITLE: 'INGENIX',
  BANNER_SUBTITLE: 'Config Driven Architecture Engine',
  
  PROMPTS: {
    PROJECT_NAME: 'What is your project name?',
    ARCHITECTURE: 'Select architecture type:',
    APP_TYPE: 'Select app type:',
    FRONTEND_FRAMEWORK: 'Select frontend framework:',
    BACKEND_FRAMEWORK: 'Select backend framework:'
  },

  ERRORS: {
    PROJECT_NAME_EMPTY: 'Project name cannot be empty',
    PROJECT_NAME_INVALID: 'Project name may only contain letters, numbers, dashes and underscores',
    PROJECT_NAME_TOO_LONG: 'Project name must be less than 50 characters'
  },

  SUCCESS: {
    TITLE: 'CONFIG GENERATED SUCCESSFULLY!',
    FILE_CREATED: 'Created: ingenix.config.json',
    STATUS: 'Ready for generation engine',
    FINAL_MSG: '🚀  Let\'s build something amazing!'
  }
} as const;