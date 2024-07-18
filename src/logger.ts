import { LoggerOptions } from './types';

/**
 * returns a logger instance which has logic to add left/right paddding via options
 * @param options 
 */
export function Logger(options: LoggerOptions): void {
  this.options = options;
}

Logger.prototype.log = function log(string) {
  console.log(`${' '.repeat(this.options.leftPadding)}${string}`);
};

Logger.prototype.logHeader = function log(string) {
  console.log(`${' '.repeat(this.options.headerPadding)}${string}`);
};
