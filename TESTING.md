# IBAN Formatter Chrome Extension - Testing Instructions

## Setup

1. **Clone or download** the extension files to your local machine
2. **Create the icon files** in the `icons` folder or use placeholders
3. **Open Chrome** and navigate to `chrome://extensions/`
4. **Enable Developer Mode** using the toggle in the top-right corner
5. **Click "Load unpacked"** and select the folder containing the extension files
6. **Verify** that the extension appears in your extensions list and the icon appears in your toolbar

## Test Cases

### Popup Functionality

1. **Basic Input Validation**
    - Click the extension icon to open the popup
    - Enter invalid text (e.g., "hello") and verify error message appears
    - Enter a valid IBAN pattern (e.g., "DE89370400440532013000") and verify both formats appear

2. **Copy to Clipboard**
    - Enter a valid IBAN in the popup
    - Click the "Copy" button for continuous format
    - Paste in a text editor to verify it copied correctly
    - Repeat for grouped format

3. **Error Messages**
    - Enter IBANs with various issues and verify the appropriate error messages:
        - Invalid length: "FR7630006000011234567890123" (too long for FR)
        - Invalid country code: "XX89370400440532013000"
        - Invalid check digits: "DE89370400440532013001" (modified valid IBAN)

### Context Menu Integration

1. **Menu Item Visibility**
    - Visit any webpage
    - Select text that doesn't resemble an IBAN
    - Right-click and verify "Format IBAN" option appears
    - Try with valid IBAN text (e.g., "DE89 3704 0044 0532 0130 00")

2. **Formatting from Context Menu**
    - Select a valid IBAN with spaces or other separators
    - Right-click and select "Format IBAN"
    - Verify the toast notification appears
    - Paste to verify the correct format was copied to clipboard

### Edge Cases

1. **Already Formatted IBANs**
    - Test with IBANs that are already properly formatted
    - Verify that the extension handles them correctly

2. **IBANs with Various Separators**
    - Test with IBANs containing spaces, hyphens, or other separators
    - Verify that the extension correctly cleans and formats them

3. **Multiple IBANs on a Page**
    - Create a test page with multiple IBANs
    - Select one and use the context menu
    - Verify only the selected IBAN is formatted

## Example Valid IBANs for Testing

- **Germany**: DE89 3704 0044 0532 0130 00
- **France**: FR76 3000 6000 0112 3456 7890 189
- **UK**: GB29 NWBK 6016 1331 9268 19
- **Spain**: ES91 2100 0418 4502 0005 1332
- **Italy**: IT60 X054 2811 1010 0000 0123 456

## Example Invalid IBANs for Testing

- **Wrong length**: DE89 3704 0044 0532 0130 (too short)
- **Invalid country**: XX89 3704 0044 0532 0130 00
- **Invalid check digits**: DE00 3704 0044 0532 0130 00
- **Invalid characters**: DE89 3704 0044 0532 0130 @#

## Bug Reporting

When reporting bugs, please include:

1. The exact IBAN you tested with
2. The expected behavior
3. The actual behavior
4. Any error messages displayed
5. The browser version and OS you're using

## Notes for Production

Before publishing to the Chrome Web Store:

1. Replace placeholder icons with final designs
2. Perform thorough cross-browser testing
3. Create detailed documentation with screenshots
4. Consider adding automated tests for the validation logic