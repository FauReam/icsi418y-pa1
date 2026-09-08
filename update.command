#!/bin/bash
# Double-click this file on macOS to download the latest version from GitHub,
# overwrite the local files, and reopen the app.
cd "$(dirname "$0")"

echo "Checking GitHub for the latest version..."
git fetch origin main

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "Already up to date."
else
    echo "New version found. Overwriting local files..."
    git reset --hard origin/main
    echo "Done. Local files are now at the latest version."
fi

open index.html
