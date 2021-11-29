FROM node:lts-alpine

WORKDIR /usr/app/pokedex
COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 3000

CMD ["npm", "run", "dev"]

