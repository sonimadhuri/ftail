import { InputFormatConfig, FormatConfig } from './types';
export const errorFormatConfig: InputFormatConfig = {
  highlight: ['message', 'name'],
  header: 'name',
  headerTitle: 'Error'
};

export const tokenFormatConfig: InputFormatConfig = {
  headerTitle: 'token'
};

export const formatConfig: InputFormatConfig = {
  header: 'time',
  headerType: 'date',
  highlight: ['msg'],
  flatten: ['err', 'token'],
  divider: '\n\n',
  formatters: {
    err: errorFormatConfig,
    token: tokenFormatConfig
  }
};

export const buildUpFormatConfig = (formatConfig: InputFormatConfig) => {
  const configCopy: FormatConfig = { ...formatConfig, sortOrder: [] };
  let sortOrder: string[] = [];
  if (configCopy.highlight) {
    sortOrder = sortOrder.concat(configCopy.highlight);
  }
  configCopy.sortOrder = sortOrder;
  return configCopy;
};
