// iban-tests.js
(function() {
    // Use an IIFE (Immediately Invoked Function Expression) to avoid polluting global scope

    // Test runner function - will be exposed to window at the end
    function runTests() {
        console.log("Starting IBAN utility tests...");

        // Check if required objects exist
        if (typeof window.ibanUtils === 'undefined') {
            throw new Error('ibanUtils not found. Make sure iban-utils.js is loaded correctly.');
        }
        if (typeof window.ibanTestData === 'undefined') {
            throw new Error('ibanTestData not found. Make sure iban-test-data.js is loaded correctly.');
        }

        let passedTests = 0;
        let failedTests = 0;
        const failedDetails = [];

        window.ibanTestData.forEach((testCase, index) => {
            console.log(`\nTest #${index + 1}: ${testCase.description}`);
            console.log(`Input: "${testCase.input}"`);

            // Process the IBAN
            const result = window.ibanUtils.processIBAN(testCase.input);

            // Check validity
            const validityMatch = result.isValid === testCase.expectedResult.isValid;

            // If both are invalid, check error message
            const errorMatch = !result.isValid && !testCase.expectedResult.isValid ?
                result.errorMessage === testCase.expectedResult.errorMessage :
                true;

            // If both are valid, check formatted outputs
            const continuousMatch = result.isValid && testCase.expectedResult.isValid ?
                result.continuous === testCase.expectedResult.continuous :
                true;

            const groupedMatch = result.isValid && testCase.expectedResult.isValid ?
                result.grouped === testCase.expectedResult.grouped :
                true;

            // Test passed if all applicable checks are true
            const testPassed = validityMatch && errorMatch && continuousMatch && groupedMatch;

            if (testPassed) {
                console.log("PASSED ✓");
                passedTests++;
            } else {
                console.log("FAILED ✗");
                failedTests++;

                const failure = {
                    testCase: testCase,
                    actualResult: result,
                    issues: []
                };

                if (!validityMatch) {
                    console.log(`  - Validity mismatch: Expected ${testCase.expectedResult.isValid}, got ${result.isValid}`);
                    failure.issues.push(`Validity mismatch`);
                }

                if (!errorMatch) {
                    console.log(`  - Error message mismatch: Expected "${testCase.expectedResult.errorMessage}", got "${result.errorMessage}"`);
                    failure.issues.push(`Error message mismatch`);
                }

                if (!continuousMatch) {
                    console.log(`  - Continuous format mismatch: Expected "${testCase.expectedResult.continuous}", got "${result.continuous}"`);
                    failure.issues.push(`Continuous format mismatch`);
                }

                if (!groupedMatch) {
                    console.log(`  - Grouped format mismatch: Expected "${testCase.expectedResult.grouped}", got "${result.grouped}"`);
                    failure.issues.push(`Grouped format mismatch`);
                }

                failedDetails.push(failure);
            }

            console.log("Result:", result);
        });

        // Summary
        console.log("\n----- TEST SUMMARY -----");
        console.log(`Total tests: ${window.ibanTestData.length}`);
        console.log(`Passed: ${passedTests}`);
        console.log(`Failed: ${failedTests}`);

        if (failedTests > 0) {
            console.log("\nFailed test details:");
            failedDetails.forEach((failure, index) => {
                console.log(`\n${index + 1}. ${failure.testCase.description}`);
                console.log(`   Input: "${failure.testCase.input}"`);
                console.log(`   Issues: ${failure.issues.join(", ")}`);
                console.log(`   Expected:`, failure.testCase.expectedResult);
                console.log(`   Actual:`, failure.actualResult);
            });
        }

        return {
            totalTests: window.ibanTestData.length,
            passedTests,
            failedTests,
            failedDetails
        };
    }

    // Expose the test runner to the window object
    window.runIbanTests = runTests;

    // Log a message to verify the script loaded correctly
    console.log("IBAN test runner loaded successfully");
})();