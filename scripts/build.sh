#!/bin/bash

echo "Building Extension..."
tsc -v

# remove build directory
echo "Cleaning up previous build..."
rm -rf build

# build extension
echo "Bundling src..."
npm run esbuild

# build web app
echo "Building webapp..."
cd web-app
yarn build
cd ..

# For Windows build: switch the next 2 lines
echo "Bundling webapp..."
if [[ "$OSTYPE" == "msys" ]]; then
    # linux subsystem on windows selected
    cp -R ./web-app/build/ ./
else
    # unix
    cp -R ./web-app/build/. ./build/
fi

node scripts/fixFontPaths.js

echo "Build complete!"