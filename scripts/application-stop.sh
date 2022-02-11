#!/bin/bash

. "$HOME/.nvm/nvm.sh"
pm2 stop main 2> /dev/null || true
pm2 delete main 2> /dev/null || true
