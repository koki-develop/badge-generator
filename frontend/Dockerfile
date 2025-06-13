FROM node:18.20.6-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18.20.6-alpine AS builder
WORKDIR /app
ENV NODE_ENV production
ARG GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID $GA_MEASUREMENT_ID
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18.20.6-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]
