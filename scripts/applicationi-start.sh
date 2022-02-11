#!/bin/bash

cd "$HOME/vote-it"
. "$HOME/.nvm/nvm.sh"

export SSL_KEY=$(aws ssm get-parameter --name '/vote-it/SSL_KEY' --query 'Parameter.Value' | tr -d '"')
export SSL_CERT=$(aws ssm get-parameter --name '/vote-it/SSL_CERT' --query 'Parameter.Value' | tr -d '"')

pm2 start dist/main.js
