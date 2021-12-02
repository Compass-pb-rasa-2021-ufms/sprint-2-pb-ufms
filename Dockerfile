FROM node:latest
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT ["node", "./back/server.js"]
ENV PORT=8080
EXPOSE $PORT