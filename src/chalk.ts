import * as chalk from 'chalk';

/**
 * returns a chalk instance with applied themes
 * @param theme
 * @param identifier
 * @returns
 */
export const ch = (
  identifier?: undefined | 'header' | 'highlight'
) => {
  const theme = ChalkSingleton.theme;
  let ch = chalk[theme.color];
  if (identifier === 'header') {
    ch = ch[theme.headerColor];
  } else if (identifier === 'highlight') {
    if (theme.highlightBg) {
      ch = ch[theme.highlightBg];
    }
    if (theme.highlightColor) {
      ch = ch[theme.highlightColor];
    }
  }
  return ch;
};

export class ChalkSingleton {
  private static singleInstance;
  static theme;
  static mapper;

  public static get instance(): ChalkSingleton {
    if (!ChalkSingleton.singleInstance) {
      ChalkSingleton.singleInstance = new ChalkSingleton();
    }

    return ChalkSingleton.singleInstance;
  }
}
