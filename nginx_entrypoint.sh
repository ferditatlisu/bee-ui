#! /usr/bin/env sh
set -e

env_content='KB_API'="$KB_API"
printf "$env_content" > /usr/share/nginx/html/.env

echo "KB_ENVIRONMENTS = {" > /usr/share/nginx/html/env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' /usr/share/nginx/html/.env >> /usr/share/nginx/html/env-config.js
echo "}" >> /usr/share/nginx/html/env-config.js


# sed -i.bak 's~<body[^>]*>~&<script src="/env-config.js"></script>~' /usr/share/nginx/html/index.html

exec "$@"