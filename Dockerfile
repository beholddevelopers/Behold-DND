FROM node:14.2.0

WORKDIR /app

COPY packag*.json ./

RUN npm install

COPY . .