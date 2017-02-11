#!/bin/bash

# extracted from: https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

set -e # Exit with nonzero exit code if anything fails
set -x # Torna isso aqui verboso

SOURCE_BRANCH="master"
TARGET_BRANCH="master"
TRAVIS_NAME="Travis"
REPO=`git config remote.origin.url`
LAST_COMMIT_MESSAGE=$(git log --format=%B -n 1)
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`
LAST_COMMIT_AUTHOR=$(git log --format="%an" -1)
green=`tput setaf 2`
reset=`tput sgr0`

# Pull requests and commits to other branches are ignored.
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Ignoring pull request"
    exit 0
fi

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in oq-aprendi-hoje.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

git pull $SSH_REPO $TARGET_BRANCH
git checkout $TARGET_BRANCH

# Run our compile script
# ./ci/compile.sh


git config user.name "Jota Teles"
git config user.email "josetelesmaciel@gmail.com"
git status

# if [ $(echo "${LAST_COMMIT_MESSAGE}" | grep -c "\[\?#[0-9]*\]\?" ) -gt 0 ]; then
#     ISSUE_NUMBER=$(echo "${LAST_COMMIT_MESSAGE}" | grep -o "\[\?#[0-9]*\]\?")
# else
#     ISSUE_NUMBER="no-issue-specified"
# fi    

if [ "$LAST_COMMIT_AUTHOR" = "$TRAVIS_NAME" ]; then
    echo "Cannot build a Travis commit. Exiting"
    exit 0
else
	mkdir temp
	echo "{}" > temp/aprendizados.json
	gulp concat 
	gulp transformJson 
	gulp handlebars

	if [ -n "$(git status --porcelain)" ]; then 	
		git add -A .
		git commit -m "Atualiza README."
		git push $SSH_REPO $TARGET_BRANCH
		exit 0
	else
		exit 0    		
	fi		
fi