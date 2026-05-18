# syntax=docker.io/docker/dockerfile:1

ARG NODE_VERSION="24"
ARG NGINX_VERSION="1.24.0"

ARG PASTE_API=/api/paste
ARG MEILI_SEARCH_KEY

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

ENV NODE_OPTIONS=--max-old-space-size=4096

COPY package.json package-lock.json ./
RUN npm install

ARG PASTE_API
ENV NUXT_PUBLIC_PASTE_API=$PASTE_API

ARG MEILI_SEARCH_KEY
ENV MEILI_SEARCH_KEY=$MEILI_SEARCH_KEY

COPY --exclude=deploy --exclude=scripts . .
RUN npm run generate


FROM nginx:${NGINX_VERSION} AS website

COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY deploy/nginx-compose.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]


FROM node:${NODE_VERSION} AS indexer

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.data/content/contents.sqlite ./.data/content/contents.sqlite
COPY ./i18n/config.ts ./i18n/
COPY ./scripts/updateSearchIndex.js ./scripts/

CMD ["node", "scripts/updateSearchIndex.js"]


FROM nginx:${NGINX_VERSION} AS keyupdater

COPY ./scripts/updateMeiliKeys.sh .

CMD ["bash", "./updateMeiliKeys.sh"]

