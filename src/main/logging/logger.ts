export interface Logger {
    trace(...message: unknown[]): void;
    debug(...message: unknown[]): void;
    info(...message: unknown[]): void;
    warn(...message: unknown[]): void;
    error(...message: unknown[]): void;
}
