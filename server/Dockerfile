FROM oven/bun:1.2.4-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
COPY server/package.json ./server/
COPY shared/package.json ./shared/
RUN bun install --frozen-lockfile

# Build shared package
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY shared ./shared
COPY server ./server
COPY package.json bun.lock tsconfig.json turbo.json ./

RUN bun run build --filter=shared --filter=server

# Production image
FROM base AS runner
ENV NODE_ENV=production

# Copy built files and dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/prisma ./server/prisma
COPY --from=builder /app/server/package.json ./server/
COPY --from=builder /app/shared/dist ./shared/dist
COPY --from=builder /app/shared/package.json ./shared/

WORKDIR /app/server

# Generate Prisma Client
RUN bunx prisma generate

EXPOSE 3000

CMD ["bun", "run", "start"]
