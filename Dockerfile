# Base image
FROM node:18-alpine AS development

ENV DATABASE_URL "file:./dev.db"

# Create app directory
WORKDIR /usr/src/app

RUN apk update && apk upgrade

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --production=false

# Bundle app source
COPY . .
RUN npx prisma migrate dev --name init

# Expose the application port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]