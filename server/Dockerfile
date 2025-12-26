FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

VOLUME /app/data

EXPOSE 3003

CMD ["node", "server.js"]