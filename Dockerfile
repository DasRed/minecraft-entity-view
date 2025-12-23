FROM node:25-alpine

WORKDIR /var/www

COPY ./.env /var/www/.env
COPY ./apps /var/www/apps
COPY ./packages /var/www/packages
COPY ./package.json /var/www/package.json
COPY ./package-lock.json /var/www/package-lock.json
COPY ./tsconfig.json /var/www/tsconfig.json
COPY ./turbo.json /var/www/turbo.json

ENV NODE_ENV=production

COPY --chmod=755 <<EOT /entrypoint.sh
#!/usr/bin/env sh
set -e
npm install --omit=dev
npm start
EOT

ENTRYPOINT ["/entrypoint.sh"]
