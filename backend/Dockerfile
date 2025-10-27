FROM node:18-alpine

# Install mysql-client for database health checks
RUN apk add --no-cache mysql-client

ENV NODE_ENV=development

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm ci

COPY . .

# Make wait script executable
RUN chmod +x ./wait-for-db.sh

EXPOSE 8080

# Wait for database, run migrations, seeders, then start the app
CMD ["sh", "-c", "./wait-for-db.sh && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start"]