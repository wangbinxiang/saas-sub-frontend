# FROM node:6.5.0-onbuild

# RUN npm install pm2 -g

# EXPOSE 3000

# CMD [ "npm", "run", "pm2-docker-prod" ]


FROM node:6.10.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

RUN yarn install && yarn cache clean
COPY . /usr/src/app

RUN npm install pm2 -g

RUN npm run compile

EXPOSE 3000

CMD [ "npm", "run", "pm2-docker-prod" ]