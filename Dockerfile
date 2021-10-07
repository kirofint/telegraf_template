FROM node:alpine

WORKDIR /app

COPY src ./src
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn && yarn build-ts

CMD yarn watch-js