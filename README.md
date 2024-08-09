# Express + TypeScript + Prisma Boilerplate

This is a boilerplate for Express + TypeScript + Prisma. also we are implementing DDD (Domain-Driven Design) with Prisma but we are ignoring Domain/Models since Prisma already have it.

## TODO

- [x] User Registration API
- [x] User Login API
- [x] Auth Middleware
- [x] Get Current User / Authenticated User
- [x] Logout Authenticated User
- [x] Redis Cache
- [x] JWT Auth
- [x] Reset Prisma Migration so it will Clean
- [x] Dockerfile & Docker Compose
- [ ] Prometheus Metrics Setup
- [ ] Swagger Documentation

## Dependencies

`npm install`

## Run

`npm run build && npm run start`

## Run Dev

`npm run dev`

## Prisma Migration

`npx prisma migrate dev`

## Prisma

`npx prisma generate`

## Run Completely

```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```
