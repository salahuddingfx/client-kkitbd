FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package manifests
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application source
COPY . .

# Set environment variables for build
ENV NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
ENV NEXT_PUBLIC_APP_URL=http://localhost:4000
ENV NODE_ENV=production

# Build Next.js application
RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]
