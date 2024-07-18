Pretty print logs while keeping them streamable!
# Overview
This project provides a CLI tool for beautifying the output of log files. The tool is configurable via a .ftailrc file in the user's home directory. It uses the chalk library to style and format log outputs, making it easier to read and analyze.

# Installation
To install the CLI tool, you need to have Node.js and npm installed. Then, you can install the tool using the following command:
```
npm install -g ftail
```

# Configuration
To set up the configuration file, create a .ftailrc file in your home directory with the following content

```
{
  "mapper": {
      "header": "time",
      "headerType": "date",
      "highlight": ["msg"],
      "flatten": ["err", "token"],
      "divider": "\n\n",
      "formatters": {
        "err": {
          "highlight": ["message", "name"],
          "header": "name",
          "headerTitle": "Error"
        },
        "token": {
          "headerTitle": "token"
        }
      }

  },
  "theme": {
    "mode": "dark"
  }
}
```
## Mapper
- header: The field used as the header of each log entry.
- headerType: The type of the header (e.g., date).
- highlight: Fields to be highlighted in the log entry.
- flatten: Fields to be flattened in the log entry. For example, nested objects.
- divider: The divider string used between log entries. For example, new line.
- formatters: Custom formatters for nested fields following the same structure as config. For example if you want to highlight err.message. Check usage in example.

## Theme
mode: The theme mode (dark, light, or custom).
If you choose the custom theme mode, you need to provide a custom theme object with the following properties:
```
{
  "color": "black",
  "headerColor": "magenta",
  "highlightBg": "bgYellowBright",
  "highlightColor": "black"
}
```
Note: Only chalk foreground and background colors are supported for now.

# Usage
After configuring the .ftailrc file, you can use the CLI tool to format your log files. Run the tool with the following command:


```
ftail "$(ls -t | grep 'error' | head -1)" // the recent error file in logs directory
```

# License
This project is licensed under the ISC License. See the LICENSE file for more details.

# Contributing
Contributions are welcome! Please open an issue or submit a pull request with your changes.
