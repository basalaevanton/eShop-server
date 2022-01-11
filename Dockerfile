FROM node:12.13-alpine

WORKDIR /usr/serv


COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]