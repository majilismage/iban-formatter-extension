// The IBAN utilities will be injected via the manifest.json
// We need to wait for the utilities to be available
function waitForIbanUtils() {
    if (window.ibanUtils) {
        return Promise.resolve(window.ibanUtils);
    }

    return new Promise(resolve => {
        // Check every 50ms if ibanUtils is available
        const checkInterval = setInterval(() => {
            if (window.ibanUtils) {
                clearInterval(checkInterval);
                resolve(window.ibanUtils);
            }
        }, 50);

        // Set a timeout to avoid infinite checking
        setTimeout(() => {
            clearInterval(checkInterval);
            console.error('ibanUtils not available after timeout');
            resolve(null);
        }, 2000);
    });
}

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "formatIBAN") {
        // Use async processing with response callback
        (async function() {
            try {
                const utils = await waitForIbanUtils();
                if (!utils) {
                    showToast("Extension error: IBAN utilities not available");
                    sendResponse({ success: false, error: "IBAN utilities not available" });
                    return;
                }

                const ibanText = request.text.trim();

                // Check if the text resembles an IBAN
                if (utils.looksLikeIBAN(ibanText)) {
                    const result = utils.processIBAN(ibanText);

                    if (result.isValid) {
                        // Use document.execCommand as a fallback for clipboard access
                        // This older API has better compatibility in content scripts
                        const textArea = document.createElement('textarea');
                        textArea.value = result.continuous;
                        textArea.style.position = 'fixed';
                        textArea.style.opacity = '0';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();

                        try {
                            const successful = document.execCommand('copy');
                            document.body.removeChild(textArea);

                            if (successful) {
                                showToast("IBAN formatted and copied to clipboard");
                                sendResponse({ success: true });
                            } else {
                                throw new Error("Copy command failed");
                            }
                        } catch (err) {
                            document.body.removeChild(textArea);
                            console.error("Could not copy to clipboard:", err);
                            showToast("Error copying to clipboard");
                            sendResponse({ success: false, error: err.message });
                        }
                    } else {
                        // Show error notification
                        showToast(`Invalid IBAN: ${result.errorMessage}`);
                        sendResponse({ success: false, error: result.errorMessage });
                    }
                } else {
                    showToast("No valid IBAN pattern detected");
                    sendResponse({ success: false, error: "No IBAN found" });
                }
            } catch (error) {
                console.error("Error in content script:", error);
                showToast("Extension error");
                sendResponse({ success: false, error: error.message });
            }
        })();

        // Return true to indicate we'll call sendResponse asynchronously
        return true;
    }
});

// Function to display a toast notification on the webpage
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = 'white';
    toast.style.padding = '10px 15px';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '10000';

    // Add to page
    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}