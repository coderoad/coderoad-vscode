# Publish

PACKAGE_VERSION=$(grep 'version' package.json \
  | cut -d '"' -f4)
RELEASES_FOLDER=releases
OUTPUT_FILE=coderoad-$PACKAGE_VERSION.vsix
RAW_PATH=https://github.com/coderoad/coderoad-vscode/blob/master

# comment out until confident in testing process
git tag -a v$PACKAGE_VERSION -m "Releasing version v$PACKAGE_VERSION"
git push origin v$PACKAGE_VERSION

# send to VSCode Marketplace via 
vsce publish -p $VSCE_KEY --packagePath ./$RELEASES_FOLDER/$OUTPUT_FILE --baseContentUrl $RAW_PATH --baseImagesUrl $RAW_PATH
