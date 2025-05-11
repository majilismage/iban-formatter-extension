// iban-test-data.js
(function() {
    // Use an IIFE to avoid polluting global scope

    // Define the test data
    const testData = [
        // Valid IBANs
        {
            description: "Valid German IBAN",
            input: "DE89370400440532013000",
            expectedResult: {
                isValid: true,
                continuous: "DE89370400440532013000",
                grouped: "DE89 3704 0044 0532 0130 00"
            }
        },
        {
            description: "Valid German IBAN with spaces",
            input: "DE89 3704 0044 0532 0130 00",
            expectedResult: {
                isValid: true,
                continuous: "DE89370400440532013000",
                grouped: "DE89 3704 0044 0532 0130 00"
            }
        },
        {
            description: "Valid French IBAN",
            input: "FR7630006000011234567890189",
            expectedResult: {
                isValid: true,
                continuous: "FR7630006000011234567890189",
                grouped: "FR76 3000 6000 0112 3456 7890 189"
            }
        },
        {
            description: "Valid UK IBAN with hyphens",
            input: "GB29-NWBK-6016-1331-9268-19",
            expectedResult: {
                isValid: true,
                continuous: "GB29NWBK60161331926819",
                grouped: "GB29 NWBK 6016 1331 9268 19"
            }
        },
        {
            description: "Valid Spanish IBAN",
            input: "ES9121000418450200051332",
            expectedResult: {
                isValid: true,
                continuous: "ES9121000418450200051332",
                grouped: "ES91 2100 0418 4502 0005 1332"
            }
        },

        // Invalid IBANs
        {
            description: "Invalid IBAN - Wrong length",
            input: "DE89370400440532013",
            expectedResult: {
                isValid: false,
                errorMessage: "Invalid length for DE (expected 22)"
            }
        },
        {
            description: "Invalid IBAN - Invalid country code",
            input: "XX89370400440532013000",
            expectedResult: {
                isValid: false,
                errorMessage: "Country code not recognized"
            }
        },
        {
            description: "Invalid IBAN - Invalid check digits",
            input: "DE00370400440532013000",
            expectedResult: {
                isValid: false,
                errorMessage: "Invalid check digits"
            }
        },
        {
            description: "Invalid IBAN - Invalid characters",
            input: "DE89370400440532013@#",
            expectedResult: {
                isValid: false,
                errorMessage: "Invalid length for DE (expected 22)"
            }
        },
        {
            description: "IBAN too short",
            input: "DE",
            expectedResult: {
                isValid: false,
                errorMessage: "IBAN too short"
            }
        }
    ];

    // Expose the test data to the window object
    window.ibanTestData = testData;

    // Log a message to verify the script loaded correctly
    console.log("IBAN test data loaded successfully");
})();