import {
  FormatConfig,
  LoggerOptions,
} from './types';
import { buildUpFormatConfig } from './config';
import { Logger } from './logger';
import { ch } from './chalk';

export function formatLog(
  logObject,
  formatConfig: FormatConfig,
  paddingOptions: LoggerOptions
) {
  let keyRightPadding = 0;
  let headerValue = formatConfig.headerTitle;
  const { headerPadding } = paddingOptions;
  const logger = new Logger(paddingOptions);
  Object.keys(logObject).forEach((key) => {
    if (key.length > keyRightPadding) {
      keyRightPadding = key.length;
    }
    if (key === formatConfig.header) {
      if (formatConfig.headerType === 'date') {
        headerValue = `${new Date(logObject[key]).toLocaleString()}`;
      } else {
        headerValue = logObject[key];
      }
    }
  });
  // render the header value first
  if (headerValue) {
    logger.logHeader(ch('header')(`[${headerValue}]`));
  }

  // render the highlighted ones
  formatConfig.sortOrder.forEach((key) => {
    logger.log(
      ch(
        'highlight'
      )(`${key.padEnd(keyRightPadding)}: ${logObject[key]}`)
    );
    delete logObject[key];
  });

  // render rest of the object
  Object.entries(logObject).forEach(([key, value]) => {
    if (typeof value === 'string') {
      logger.log(
        ch()(
          `${key.padEnd(keyRightPadding)}: ${`${value}`.replace(
            /\n/g,
            '\n\t\t'
          )}`
        )
      );
    }
  });
  // render rest of the object
  Object.entries(logObject).forEach(([key, value]) => {
    if (
      formatConfig.flatten &&
      formatConfig.flatten.includes(key) &&
      typeof value === 'object' &&
      value !== null
    ) {
      const config = buildUpFormatConfig(formatConfig.formatters?.[key]);
      formatLog(value, config, {
        leftPadding: keyRightPadding,
        headerPadding: paddingOptions.leftPadding
      });
    }
  });
}
