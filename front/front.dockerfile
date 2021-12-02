FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY ../package*.json ./
RUN npm install
COPY front/ .
RUN npm run build
EXPOSE $PORT
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=$PORT
ENV PROXY_API=$PROXY_API
ENV PROXY_LOGIN=$PROXY_LOGIN
CMD ["npm", "start"]