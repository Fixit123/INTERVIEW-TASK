FROM node:18-alpine

ENV NODE_ENV=development

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm ci

COPY . .

# Wait for database and run migrations + seeders
RUN chmod +x ./wait-for-db.sh || true

EXPOSE 8080

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start"]