#!/bin/bash

cd "$HOME/vote-it"
. "$HOME/.nvm/nvm.sh"

function set_node_env_from_aws {
  VAR_NAME="$1"
  declare -gx "$VAR_NAME"="$(aws ssm get-parameter --name "/vote-it/$VAR_NAME" --query 'Parameter.Value' | tr -d '"')"
}

set_node_env_from_aws 'SSL_KEY'
set_node_env_from_aws 'SSL_CERT'

set_node_env_from_aws 'DB_USERNAME'
set_node_env_from_aws 'DB_PASSWORD'

set_node_env_from_aws 'DB_NAME'
set_node_env_from_aws 'DB_HOST'
set_node_env_from_aws 'DB_PORT'

set_node_env_from_aws 'PORT'

pm2 start dist/main.js
