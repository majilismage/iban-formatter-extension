# IBANify: Permissions Justification

This document explains the permissions requested by the IBANify extension and why each one is necessary for the extension's functionality.

## Permissions Overview

IBANify requires the following permissions:

1. `contextMenus` - For the right-click menu functionality
2. `clipboardWrite` - For copying formatted IBANs to clipboard
3. Content script access to `<all_urls>` - For detecting and processing IBANs on webpages

## Detailed Justification

### `contextMenus` Permission

**What it does:** Allows the extension to add items to Chrome's context menu (the menu that appears when you right-click).

**Why it's necessary:** IBANify adds a "Format IBAN" option to the context menu when text is selected. This is a core feature that enables users to quickly format and validate IBANs they encounter while browsing, without having to manually copy and paste them into the extension popup.

**User benefit:** This creates a seamless workflow for users who frequently work with IBANs across different websites, saving significant time and reducing the risk of transcription errors.

### `clipboardWrite` Permission

**What it does:** Allows the extension to write data to the clipboard.

**Why it's necessary:** After formatting an IBAN, IBANify copies the properly formatted version to the clipboard. This is essential for the extension's utility, as users typically need to use the formatted IBAN elsewhere (in emails, forms, documents, etc.).

**User benefit:** Eliminates the need for manual copying, streamlining the workflow and reducing the chance of errors when transferring the formatted IBAN to its destination.

### Content Script Access to `<all_urls>`

**What it does:** Allows the extension's content scripts to run on any webpage the user visits.

**Why this broad access is necessary:**

1. **Unpredictable IBAN Locations:** IBANs can appear on a vast array of websites including:
    - Banking portals from hundreds of financial institutions worldwide
    - Financial management tools and accounting software
    - Invoice and payment processing systems
    - Government and tax authority websites
    - Business correspondence and documentation portals
    - PDF viewers in browsers
    - Email clients accessed via web browsers
    - Enterprise resource planning (ERP) systems

2. **No Data Collection:** It's important to emphasize that IBANify:
    - Processes all data locally within the browser
    - Does not send any data to external servers
    - Does not track which websites users visit
    - Does not persist or store any IBANs or user data

3. **On-Demand Activation:** The extension's IBAN processing functionality is only activated when:
    - A user explicitly selects text and uses the context menu
    - A user manually inputs an IBAN in the extension popup

**Privacy and Security Considerations:**

- IBANify only accesses page content when explicitly invoked by the user
- The extension's code is transparent and open for review
- No analytics or tracking mechanisms are implemented
- The extension operates entirely offline with no network requests

**Alternatives Considered:**

We considered limiting the extension to specific domains, but this would significantly reduce its utility for users who:
- Work across multiple banking portals
- Process international payments to various institutions
- Handle financial documentation from diverse sources
- Need to validate IBANs in email correspondence

**User Benefits of Broad Access:**

- Consistent experience across all websites
- No need to manually add sites to an allowlist
- Immediate functionality on new or infrequently visited websites
- Ability to process IBANs in any online context where they might appear

## Commitment to User Privacy and Security

IBANify is designed with a "privacy-first" approach:

1. **Minimal Permission Use:** Despite having access to page content, the extension only activates its functionality when explicitly triggered by the user.

2. **Local Processing:** All IBAN detection, validation, and formatting happens entirely on the user's device. No data is transmitted to external servers.

3. **No Data Retention:** IBANify does not store or retain any IBANs or user data beyond the current browser session.

4. **Transparent Code:** Our codebase is open for review, with clear documentation of all functionality.

## Conclusion

The permissions requested by IBANify represent the minimum necessary requirements to deliver its core functionality across the diverse range of websites where users might encounter IBANs. The extension is designed to respect user privacy while providing a valuable productivity tool for those who regularly work with international banking information.