#!/bin/bash

# This script exists because certain dependencies 
# seem to fail to be installed.


PACKAGE_VERSION=$(grep 'version' package.json \
  | cut -d '"' -f4)
RELEASES_FOLDER=releases
OUTPUT_FILE=coderoad-$PACKAGE_VERSION.vsix

echo "Creating $OUTPUT_FILE..."

echo "Building..."
yarn build

echo "Packaging Extension..."
mkdir -p ./$RELEASES_FOLDER
npx vsce package --yarn --out ./$RELEASES_FOLDER

echo "Installing Extension..."
code --install-extension ./$RELEASES_FOLDER/$OUTPUT_FILE
