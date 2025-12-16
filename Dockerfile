FROM node:25-alpine

WORKDIR /var/www

COPY ./* /var/www/*

ENV NODE_ENV=production

COPY --chmod=755 <<EOT /entrypoint.sh
#!/usr/bin/env sh
set -e
npm install --omit=dev
npm start
EOT

ENTRYPOINT ["/entrypoint.sh"]
