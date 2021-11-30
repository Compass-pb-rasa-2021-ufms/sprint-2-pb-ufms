FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install
CMD npm start
ENV PORT=3000
EXPOSE $PORT