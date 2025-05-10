document.addEventListener('DOMContentLoaded', function() {
    const ibanInput = document.getElementById('ibanInput');
    const results = document.getElementById('results');
    const continuousResult = document.getElementById('continuousResult');
    const groupedResult = document.getElementById('groupedResult');
    const copyContinuous = document.getElementById('copyContinuous');
    const copyGrouped = document.getElementById('copyGrouped');
    const messageContainer = document.getElementById('messageContainer');

    // Process IBAN when input changes
    ibanInput.addEventListener('input', processInput);

    // Set up copy buttons
    copyContinuous.addEventListener('click', () => {
        copyToClipboard(continuousResult.textContent, 'Continuous format copied');
    });

    copyGrouped.addEventListener('click', () => {
        copyToClipboard(groupedResult.textContent, 'Grouped format copied');
    });

    // Focus the input when popup opens
    ibanInput.focus();

    // Process input function
    function processInput() {
        const value = ibanInput.value.trim();

        // Clear previous messages
        messageContainer.innerHTML = '';

        // Hide results section if input is empty
        if (!value) {
            results.style.display = 'none';
            return;
        }

        // Check if the input resembles an IBAN
        if (ibanUtils.looksLikeIBAN(value)) {
            const result = ibanUtils.processIBAN(value);

            if (result.isValid) {
                // Show and populate results
                results.style.display = 'block';
                continuousResult.textContent = result.continuous;
                groupedResult.textContent = result.grouped;
                showMessage('Valid IBAN', 'success');
            } else {
                // Show error message
                results.style.display = 'none';
                showMessage(`Invalid IBAN: ${result.errorMessage}`, 'error');
            }
        } else if (value.length > 5) {
            // Only show 'No IBAN pattern detected' if they've typed enough characters
            results.style.display = 'none';
            showMessage('No IBAN pattern detected', 'error');
        } else {
            // Clear message if they're still typing
            results.style.display = 'none';
        }
    }

    // Function to copy text to clipboard
    function copyToClipboard(text, successMessage) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showMessage(successMessage, 'success');
            })
            .catch(err => {
                console.error('Could not copy: ', err);
                showMessage('Error copying to clipboard', 'error');
            });
    }

    // Show message function
    function showMessage(message, type) {
        messageContainer.innerHTML = '';
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = type === 'error' ? 'error-message' : 'success-message';
        messageContainer.appendChild(messageElement);
    }
});