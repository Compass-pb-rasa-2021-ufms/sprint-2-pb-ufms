FROM node:latest
ENV NODE_ENV=development
COPY . /app
COPY package.json /app
WORKDIR /app
RUN npm install
CMD npm start
EXPOSE 3000