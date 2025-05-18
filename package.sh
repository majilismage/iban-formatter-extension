#!/bin/bash

# Create a clean package for Chrome Web Store submission
echo "Packaging IBANify extension..."

# Create temporary directory
mkdir -p build

# Copy required files
cp manifest.json build/
cp background.js build/
cp content.js build/
cp iban-utils.js build/
cp popup.html build/
cp popup.js build/
cp -r icons build/

# Go to build directory
cd build

# Create ZIP file
zip -r ../ibanify-extension.zip .

# Clean up
cd ..
rm -rf build

echo "Package created: ibanify-extension.zip"