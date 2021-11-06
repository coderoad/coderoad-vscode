# Publish
# publish the tutorial to the VSCode Marketplace
# script requires a token
# docs: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
# run: sh scripts/publish.sh {VSCE_KEY}

PACKAGE_VERSION=$(grep 'version' package.json \
  | cut -d '"' -f4)
RELEASES_FOLDER=releases
OUTPUT_FILE=coderoad-$PACKAGE_VERSION.vsix
RAW_PATH=https://github.com/coderoad/coderoad-vscode/blob/master

if [[ -z "$VSCE_KEY" ]] && [[ -z "$OVSX_KEY" ]]; then
  echo "VSCE_KEY or OVSX_KEY is required"
  exit 1;
fi

# comment out until confident in testing process
git tag -a v$PACKAGE_VERSION -m "Releasing version v$PACKAGE_VERSION"
git push origin v$PACKAGE_VERSION

# send to VSCode Marketplace
if ! [[ -z "$VSCE_KEY" ]]; then
  echo "publishing to vscode marketplace..."
  npx vsce publish -p $VSCE_KEY --packagePath ./$RELEASES_FOLDER/$OUTPUT_FILE --baseContentUrl $RAW_PATH --baseImagesUrl $RAW_PATH
fi
# send to Open-VSX Marketplace (https://github.com/eclipse/openvsx/wiki/Publishing-Extensions)
if ! [[ -z "$OVSX_KEY" ]]; then
  echo "publishing to open-vsx marketplace..."
  npx ovsx publish -p $OVSX_KEY ./$RELEASES_FOLDER/$OUTPUT_FILE --baseContentUrl $RAW_PATH --baseImagesUrl $RAW_PATH
fi
