FROM node:14-slim

WORKDIR /usr/src/app

ARG MONGO_PWD

COPY package*.json ./

ENV MONGO_PASSWORD=$MONGO_PWD ENV='prd'

RUN npm ci install

COPY . ./

RUN npm run build

CMD [ "npm", "run", "prd" ]

EXPOSE 3000