FROM node:6.10.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install && npm cache clean
COPY . /usr/src/app

RUN npm install pm2 -g



EXPOSE 3000

CMD [ "npm", "run", "pm2-docker-prod" ]