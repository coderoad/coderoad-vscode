#!/bin/bash

# This script exists because certain dependencies 
# seem to fail to be installed.

PACKAGE_VERSION=$(grep 'version' package.json \
  | cut -d '"' -f4)

# echo "Packaging Extension..."
vsce package

# echo "Installing Extension..."
code --install-extension coderoad-$PACKAGE_VERSION.vsix

# echo "Installing Additional Deps..."
cd ~/.vscode/extensions/coderoad.coderoad-$PACKAGE_VERSION
npm install