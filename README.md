# IBAN Formatter Chrome Extension

A lightweight Chrome extension for formatting and validating International Bank Account Numbers (IBANs).

## Features

- **Auto-Detection**: Automatically detects IBAN patterns on webpages
- **One-Click Formatting**: Format detected IBANs with a single context menu click
- **Manual Input**: Paste IBANs into a popup for formatting and validation
- **Multiple Format Options**: View and copy IBANs in continuous or grouped format
- **Validation**: Validates IBAN structure and check digits against country-specific rules
- **Copy-to-Clipboard**: Quickly copy formatted IBANs to clipboard

## Installation for Development

1. Clone or download this repository
2. Add icon files to the `icons` folder (16×16, 48×48, and 128×128 pixels)
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable Developer Mode using the toggle in the top-right corner
5. Click "Load unpacked" and select the folder containing the extension files

## Usage

### Popup Interface

1. Click the extension icon in the toolbar to open the popup
2. Paste an IBAN into the input field
3. If valid, both continuous and grouped formats will be displayed
4. Click the "Copy" button to copy the desired format to clipboard

### Context Menu Integration

1. Select text on a webpage that resembles an IBAN
2. Right-click and select "Format IBAN" from the context menu
3. The formatted IBAN will be copied to your clipboard
4. A notification will confirm the action

## Project Structure

- `manifest.json`: Extension configuration
- `popup.html`: UI for the popup
- `popup.js`: Logic for the popup interface
- `background.js`: Background script for context menu integration
- `content.js`: Content script for webpage interaction
- `iban-utils.js`: IBAN validation and formatting logic
- `icons/`: Extension icons in various sizes

## Testing

See the `Testing and Validation Instructions.md` file for detailed testing procedures.

## License

[MIT License](LICENSE)

## Privacy

This extension processes all data locally and does not transmit any information to external servers.