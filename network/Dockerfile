FROM node:10.15-alpine

WORKDIR /opt

# install dependecies
RUN apk update
RUN apk add --no-cache make bash

# set our node environment, either development or production
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

RUN npm i -g grenache-grape
COPY ./docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# ENTRYPOINT [ "bash -c grape --dp 20001 --dc 32 --aph 30001 --bn 'grape-02:20002,grape-03:20003'" ]
CMD  [ "./docker-entrypoint.sh" ]
