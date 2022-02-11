#!/bin/bash

cd "$HOME/vote-it"
. "$HOME/.nvm/nvm.sh"
pm2 start dist/main.js
