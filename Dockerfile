FROM node:6.5.0-onbuild

RUN npm install pm2 -g

EXPOSE 3000

CMD [ "npm", "run", "pm2-docker-prod" ]