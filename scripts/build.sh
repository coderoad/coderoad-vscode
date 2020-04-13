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
# cp -R ./web-app/build/ ./
cp -R ./web-app/build/ ./build
node scripts/fixFontPaths.js

echo "Build complete!"