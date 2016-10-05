#!/bin/bash

HERE=$(dirname $0)

cd "${HERE}/.."

NEW_VERSION=$(node -e "console.log(require('./package.json').version)")

cd runtime

npm version ${NEW_VERSION}

git add package.json
