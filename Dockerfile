# Build Stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Production Stage
FROM node:18-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

# Copy built application and necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env.example .env
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Run migrations before starting the application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
