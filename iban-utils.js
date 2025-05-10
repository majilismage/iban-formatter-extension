// IBAN Utility Functions
const ibanUtils = {
    // Country code to IBAN length mapping
    countryLengths: {
        'AL': 28, 'AD': 24, 'AT': 20, 'AZ': 28, 'BH': 22, 'BY': 28, 'BE': 16, 'BA': 20,
        'BR': 29, 'BG': 22, 'CR': 22, 'HR': 21, 'CY': 28, 'CZ': 24, 'DK': 18, 'DO': 28,
        'EG': 29, 'SV': 28, 'EE': 20, 'FO': 18, 'FI': 18, 'FR': 27, 'GE': 22, 'DE': 22,
        'GI': 23, 'GR': 27, 'GL': 18, 'GT': 28, 'HU': 28, 'IS': 26, 'IE': 22, 'IL': 23,
        'IT': 27, 'JO': 30, 'KZ': 20, 'XK': 20, 'KW': 30, 'LV': 21, 'LB': 28, 'LI': 21,
        'LT': 20, 'LU': 20, 'MK': 19, 'MT': 31, 'MR': 27, 'MU': 30, 'MD': 24, 'MC': 27,
        'ME': 22, 'NL': 18, 'NO': 15, 'PK': 24, 'PS': 29, 'PL': 28, 'PT': 25, 'QA': 29,
        'RO': 24, 'LC': 32, 'SM': 27, 'SA': 24, 'RS': 22, 'SC': 31, 'SK': 24, 'SI': 19,
        'ES': 24, 'SE': 24, 'CH': 21, 'TL': 23, 'TN': 24, 'TR': 26, 'UA': 29, 'AE': 23,
        'GB': 22, 'VA': 22, 'VG': 24
    },

    // Check if string resembles an IBAN
    looksLikeIBAN: function(str) {
        // Basic pattern: 2 letters followed by 2 digits and 10-30 alphanumeric chars
        const basicPattern = /^[A-Za-z]{2}\d{2}[A-Za-z0-9]{10,30}$/;
        // Also allow IBANs with spaces
        const withSpacesPattern = /^[A-Za-z]{2}\d{2}[\s]?([A-Za-z0-9]{4}[\s]?){2,7}[A-Za-z0-9]{1,4}$/;

        // Remove all spaces and non-alphanumeric characters
        const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

        return basicPattern.test(cleaned) || withSpacesPattern.test(str.toUpperCase());
    },

    // Clean IBAN by removing non-alphanumeric characters and converting to uppercase
    cleanIBAN: function(iban) {
        return iban.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    },

    // Format IBAN with spaces every 4 characters
    formatGrouped: function(iban) {
        const cleaned = this.cleanIBAN(iban);
        return cleaned.match(/.{1,4}/g).join(' ');
    },

    // Validate IBAN structure (country code and length)
    validateStructure: function(iban) {
        const cleaned = this.cleanIBAN(iban);

        // Check if at least 2 characters long to extract country code
        if (cleaned.length < 4) {
            return {
                isValid: false,
                errorMessage: "IBAN too short"
            };
        }

        const countryCode = cleaned.substring(0, 2);

        // Check if country code is supported
        if (!this.countryLengths[countryCode]) {
            return {
                isValid: false,
                errorMessage: "Country code not recognized"
            };
        }

        // Check if IBAN length matches the expected length for this country
        if (cleaned.length !== this.countryLengths[countryCode]) {
            return {
                isValid: false,
                errorMessage: `Invalid length for ${countryCode} (expected ${this.countryLengths[countryCode]})`
            };
        }

        return {
            isValid: true
        };
    },

    // Validate IBAN check digits using MOD 97 algorithm
    validateCheckDigits: function(iban) {
        const cleaned = this.cleanIBAN(iban);

        // Move the first 4 characters to the end
        const rearranged = cleaned.substring(4) + cleaned.substring(0, 4);

        // Convert letters to numbers (A=10, B=11, ..., Z=35)
        let expandedString = '';
        for (let i = 0; i < rearranged.length; i++) {
            const char = rearranged.charAt(i);
            const code = char.charCodeAt(0);

            // If it's a letter, convert it
            if (code >= 65 && code <= 90) {
                expandedString += (code - 55).toString();
            } else {
                expandedString += char;
            }
        }

        // Perform MOD 97 check
        // Since expandedString can be very long, we need to handle it in chunks
        let remainder = 0;
        for (let i = 0; i < expandedString.length; i += 9) {
            const chunk = remainder + expandedString.substring(i, Math.min(i + 9, expandedString.length));
            remainder = parseInt(chunk, 10) % 97;
        }

        return {
            isValid: remainder === 1,
            errorMessage: remainder !== 1 ? "Invalid check digits" : ""
        };
    },

    // Process IBAN - clean, validate, and format
    processIBAN: function(iban) {
        const cleaned = this.cleanIBAN(iban);

        // Validate structure
        const structureResult = this.validateStructure(cleaned);
        if (!structureResult.isValid) {
            return structureResult;
        }

        // Validate check digits
        const checkDigitResult = this.validateCheckDigits(cleaned);
        if (!checkDigitResult.isValid) {
            return checkDigitResult;
        }

        // If valid, return the formatted versions
        return {
            isValid: true,
            continuous: cleaned,
            grouped: this.formatGrouped(cleaned)
        };
    }
};

// Make the utilities available in global scope for content scripts and popup
// Check if we're in a content script or background/popup context
if (typeof window !== 'undefined') {
    window.ibanUtils = ibanUtils;
} else if (typeof self !== 'undefined') {
    // For service workers
    self.ibanUtils = ibanUtils;
}

// For module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ibanUtils;
}