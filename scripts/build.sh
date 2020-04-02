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
cp -R ./web-app/build/ ./build/
node scripts/fixFontPaths.js

echo "Build complete!"