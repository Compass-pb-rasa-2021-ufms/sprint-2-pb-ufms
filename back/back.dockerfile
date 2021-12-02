FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY ../package*.json ./
COPY back/ .
RUN npm install
EXPOSE 8080
CMD ["node", server.js]