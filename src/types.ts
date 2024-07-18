import { ForegroundColor, BackgroundColor } from 'chalk';

/** CONFIG RELATED TYPES */
export interface InputFormatConfig {
  header?: string,
  headerTitle?: string;
  headerType?: 'date',
  highlight?: Array<string>,
  flatten?: Array<string>,
  divider ?: string,
  formatters?: {
    [key: string]: InputFormatConfig
  }
}

export interface FormatConfig extends InputFormatConfig {
  sortOrder: Array<string>
}

export const defaultFormatConfig = {
  divider: '\n\n'
}
/*********************** */

/** LOGGER RELATED TYPES */
export interface LoggerOptions {
  leftPadding: number;
  headerPadding: number;
}
/*********************** */


/** THEME RELATED TYPES */
export interface ThemeOptions {
  mode: 'dark' | 'light' | 'custom',
  customTheme?: CustomTheme
}

export interface CustomTheme {
  color: typeof ForegroundColor;
  headerColor?: typeof ForegroundColor;
  highlightColor?: string;
  highlightBg?: typeof BackgroundColor;
}

export const darkTheme: CustomTheme = {
  color: 'white',
  headerColor: 'yellow',
  highlightBg: 'bgWhite',
  highlightColor: 'black'
}

export const lightTheme: CustomTheme = {
  color: 'black',
  headerColor: 'magenta',
  highlightBg: 'bgYellowBright',
  highlightColor: 'black'
}

/*********************** */

export interface FtailRC {
  mapper: InputFormatConfig,
  theme: ThemeOptions
}