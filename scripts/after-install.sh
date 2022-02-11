#!/bin/bash

sudo chown -R ubuntu:ubuntu "$HOME/vote-it"
cd "$HOME/vote-it"
. "$HOME/.nvm/nvm.sh"
npm install
npm run build
