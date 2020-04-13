#!/bin/bash

echo "Building Extension..."

# remove build directory
echo "Cleaning up previous build..."
rm -rf build

# build extension
echo "Compiling..."
tsc -p ./

# build web app
cd web-app
npm run build
cd ..

# For Windows build: switch the next 2 lines
if [[ "$OSTYPE" == "msys" ]]; then
echo "linux subsystem on windows selected"
cp -R ./web-app/build/ ./
else
echo "Unix system selected"
cp -R ./web-app/build/ ./build/
fi

node scripts/fixFontPaths.js

echo "Build complete!"