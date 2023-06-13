#! /usr/bin/env sh
set -e

env_content='KB_API'="$KB_API"
env_slack='SLACK_URL'="$SLACK_URL"
printf "$env_content" > /usr/share/nginx/html/.env
printf "$env_slack" > /usr/share/nginx/html/.env2

echo "KB_ENVIRONMENTS = {" > /usr/share/nginx/html/env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' /usr/share/nginx/html/.env >> /usr/share/nginx/html/env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' /usr/share/nginx/html/.env2 >> /usr/share/nginx/html/env-config.js
echo "}" >> /usr/share/nginx/html/env-config.js


# sed -i.bak 's~<body[^>]*>~&<script src="/env-config.js"></script>~' /usr/share/nginx/html/index.html

exec "$@"