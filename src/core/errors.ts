export class IngenixError extends Error {
  constructor(
    message: string,
    public code: string,
    public cause?: unknown
  ) {
    super(message);
    this.name = 'IngenixError';
  }
}

export class ValidationError extends IngenixError {
  constructor(message: string, public errors: string[]) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class FileSystemError extends IngenixError {
  constructor(message: string, cause?: unknown) {
    super(message, 'FILESYSTEM_ERROR', cause);
    this.name = 'FileSystemError';
  }
}

export class UserCancelledError extends IngenixError {
  constructor() {
    super('Operation cancelled by user', 'USER_CANCELLED');
    this.name = 'UserCancelledError';
  }
}