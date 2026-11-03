FROM node:26-alpine

ENV NODE_ENV=production

WORKDIR /var/www

COPY ./apps /var/www/apps
COPY ./packages /var/www/packages
COPY ./package.json /var/www/package.json
COPY ./package-lock.json /var/www/package-lock.json
COPY ./tsconfig.json /var/www/tsconfig.json
COPY ./turbo.json /var/www/turbo.json

RUN npm ci --omit=dev

CMD ["npm", "start"]
