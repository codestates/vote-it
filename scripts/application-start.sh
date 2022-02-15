#!/bin/bash

cd "$HOME/vote-it"
. "$HOME/.nvm/nvm.sh"

declare -a envs=(
  'SSL_KEY'
  'SSL_CERT'

  'JWT_SECRET'

  'DB_USERNAME'
  'DB_PASSWORD'

  'DB_NAME'
  'DB_HOST'
  'DB_PORT'

  'PORT'
)

for env in "${envs[@]}"
do
  declare -x "$env"="$(aws ssm get-parameter --name "/vote-it/$env" --query 'Parameter.Value' | tr -d '"')"
done

pm2 start dist/main.js
