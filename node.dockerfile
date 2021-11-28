FROM node:latest
ENV NODE_ENV=production
WORKDIR /app
#RUN mkdir /app
EXPOSE 3000
ADD . /app
CMD npm start