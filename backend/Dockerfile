FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./
COPY drizzle.config.ts ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3000
