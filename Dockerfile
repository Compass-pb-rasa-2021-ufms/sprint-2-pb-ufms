FROM node:14
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT ["node", "./src/server.js"]
# exposed não é suportado pelo heroku
ENV PORT=8080
EXPOSE $PORT