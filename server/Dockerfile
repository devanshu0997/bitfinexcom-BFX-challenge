FROM node:10.15-alpine

WORKDIR /opt

# install dependecies
RUN apk update
RUN apk add --no-cache make bash

# set our node environment, either development or production
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

COPY ./package.json ./

RUN npm install

COPY . .
