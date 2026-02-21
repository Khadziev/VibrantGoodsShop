type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'success';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logs: LogEntry[] = [];

  private getTimestamp (): string {
    return new Date().toISOString();
  }

  private formatMessage (level: LogLevel, message: string): string {
    const levelEmoji = {
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
      debug: '🐛',
      success: '✅',
    };
    return `${levelEmoji[level]} [${level.toUpperCase()}] ${message}`;
  }

  private storeLog (level: LogLevel, message: string, data?: unknown) {
    this.logs.push({
      timestamp: this.getTimestamp(),
      level,
      message,
      data,
    });
    // Ограничивать логи до 100 последних записей
    if (this.logs.length > 100) {
      this.logs.shift();
    }
  }

  info (message: string, data?: unknown) {
    const formatted = this.formatMessage('info', message);
    if (this.isDevelopment) console.log(formatted, data ?? '');
    this.storeLog('info', message, data);
  }

  warn (message: string, data?: unknown) {
    const formatted = this.formatMessage('warn', message);
    console.warn(formatted, data ?? '');
    this.storeLog('warn', message, data);
  }

  error (message: string, error?: unknown) {
    const formatted = this.formatMessage('error', message);
    console.error(formatted, error ?? '');
    this.storeLog('error', message, error);
  }

  debug (message: string, data?: unknown) {
    if (this.isDevelopment) {
      const formatted = this.formatMessage('debug', message);
      console.debug(formatted, data ?? '');
      this.storeLog('debug', message, data);
    }
  }

  success (message: string, data?: unknown) {
    const formatted = this.formatMessage('success', message);
    if (this.isDevelopment) console.log(formatted, data ?? '');
    this.storeLog('success', message, data);
  }

  getLogs (): LogEntry[] {
    return [...this.logs];
  }

  clearLogs () {
    this.logs = [];
  }
}

export const logger = new Logger();
