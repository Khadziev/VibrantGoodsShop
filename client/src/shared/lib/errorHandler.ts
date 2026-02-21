import { logger } from './logger';

export class AppError extends Error {
  constructor (
    public message: string,
    public statusCode: number = 500,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown, context?: string): AppError => {
  let appError: AppError;

  if (error instanceof AppError) {
    appError = error;
  } else if (error instanceof Error) {
    appError = new AppError(error.message, 500, { originalError: error });
  } else if (typeof error === 'string') {
    appError = new AppError(error, 500);
  } else {
    appError = new AppError('Неизвестная ошибка', 500, { originalError: error });
  }

  logger.error(
    `${context ? `[${context}] ` : ''}${appError.message}`,
    appError.context || appError
  );

  if (process.env.NODE_ENV === 'production') {
    // captureException(appError);
  }

  return appError;
};

export const safeAsync = async <T>(
  fn: () => Promise<T>,
  context?: string
): Promise<{ data: T | null; error: AppError | null }> => {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    const appError = handleError(error, context);
    return { data: null, error: appError };
  }
};

export const safeFn = <T>(
  fn: () => T,
  context?: string
): { data: T | null; error: AppError | null } => {
  try {
    const data = fn();
    return { data, error: null };
  } catch (error) {
    const appError = handleError(error, context);
    return { data: null, error: appError };
  }
};
