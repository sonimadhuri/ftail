#!/usr/bin/env node

import { createInterface } from 'node:readline';
import { buildUpFormatConfig, formatConfig } from './config';
import * as fs from 'fs';
import * as path from 'path';
import { formatLog } from './formatter';
import { ChalkSingleton } from './chalk';
import { darkTheme, lightTheme, FtailRC, CustomTheme, defaultFormatConfig, FormatConfig, InputFormatConfig } from './types';
import * as os from 'os';

const parseLine = (line) => {
  const inputLog = JSON.parse(line);
  const formatConfig = ChalkSingleton.mapper;
  const config = buildUpFormatConfig(formatConfig);
  formatLog(inputLog, config, { leftPadding: 0, headerPadding: 0 });
  if (config.divider) {
    console.log(config.divider);
  }
};

/** loads formatter config and display theme */
async function loadConfig() {
  let theme: CustomTheme = darkTheme, mapper: InputFormatConfig = defaultFormatConfig;
  try {
    const buffer: Buffer = await fs.readFileSync(os.homedir() + '/.ftailrc');
    const config: FtailRC = JSON.parse(buffer.toString())
    if(config.theme && config.theme.mode) {
      const { mode , customTheme} = config.theme;
      if(mode === 'dark') {
        theme = darkTheme;
      } else if (mode === 'light') {
        theme = lightTheme
      } else if(mode === 'custom'){
        theme = customTheme;
      }
    }

    if(config.mapper) {
      mapper = config.mapper;
    }
  } catch(err) {
  }

  ChalkSingleton.theme = theme;
  ChalkSingleton.mapper = mapper;
}

/** watches file changes and outputs formatted log */
async function tailFollow(filePath, numLines) {
  const absPath = path.resolve(filePath);
  let fileSize = fs.statSync(absPath).size;

  // Read the initial last numLines from the file
  const initialStream = fs.createReadStream(absPath, { encoding: 'utf-8' });
  const rlInitial = createInterface({
    input: initialStream,
    crlfDelay: Infinity
  });

  for await (const line of rlInitial) {
    parseLine(line);
  }
  rlInitial.close();

  // Watch the file for changes and process new lines
  fs.watch(absPath, (eventType) => {
    if (eventType === 'change') {
      const newFileSize = fs.statSync(absPath).size;
      if (newFileSize > fileSize) {
        const newStream = fs.createReadStream(absPath, {
          encoding: 'utf-8',
          start: fileSize,
          end: newFileSize
        });
        const rlNew = createInterface({
          input: newStream,
          crlfDelay: Infinity
        });

        rlNew.on('line', (newLine) => {
          parseLine(newLine);
        });

        rlNew.on('close', () => {
          fileSize = newFileSize; // Update file size to the new size
        });
      }
    }
  });
}

// Example usage
const filePath = process.argv[2];
const numLines = 10; // Number of lines you want to read from the end initially

loadConfig()
  .then(() => tailFollow(filePath, numLines))
  .catch((err) => console.error(err));
