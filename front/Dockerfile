FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3001
CMD ["yarn", "start"]
