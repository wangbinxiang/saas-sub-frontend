FROM node:6.10.0

RUN npm install pm2 -g

RUN npm install yarn

RUN yarn install

EXPOSE 3000

CMD [ "npm", "run", "pm2-docker-prod" ]