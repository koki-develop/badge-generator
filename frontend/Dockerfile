FROM oven/bun:1.2.16-alpine@sha256:14beb61b5209e743341a80ff2b05e2eac0ccb794b03902e67735f85f731c2b52 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1.2.16-alpine@sha256:14beb61b5209e743341a80ff2b05e2eac0ccb794b03902e67735f85f731c2b52 AS builder
WORKDIR /app
ENV NODE_ENV=production
ARG GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$GA_MEASUREMENT_ID
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1.2.16-alpine@sha256:14beb61b5209e743341a80ff2b05e2eac0ccb794b03902e67735f85f731c2b52 AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["bun", "run", "server.js"]
