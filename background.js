// Set up context menu item for IBAN formatting
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "formatIBAN",
        title: "Format IBAN",
        contexts: ["selection"]
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "formatIBAN" && info.selectionText) {
        // Send the selected text to the content script for formatting
        chrome.tabs.sendMessage(tab.id, {
            action: "formatIBAN",
            text: info.selectionText
        });
    }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "showNotification") {
        // Could implement chrome.notifications here if needed
        // For MVP, we're using simpler confirmation methods
        sendResponse({ success: true });
    }
    return true;
});