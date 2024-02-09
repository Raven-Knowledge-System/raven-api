FROM --platform=$BUILDPLATFORM node:20-alpine as install

WORKDIR /usr/src/app
ARG GITHUB_ACCESS_TOKEN
ENV GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN
ENV NODE_ENV=development
RUN apk add g++ make python3
ADD package.json package-lock.json /usr/src/app/
RUN npm install

FROM install as build

COPY . .
RUN npm run build

FROM install as development

WORKDIR /usr/src/app

ENV PORT=3000
COPY . .
RUN npm run build

EXPOSE $PORT

CMD ["/bin/sh", "-c", "node dist/src/main"]

FROM node:18-alpine as production

WORKDIR /usr/src/app
ARG GITHUB_ACCESS_TOKEN
ENV GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY package.json package-lock.json ./

RUN npm prune --production

EXPOSE $PORT

CMD ["/bin/sh", "-c", "node dist/src/main"]