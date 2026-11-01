FROM node:24.22.1-alpine

WORKDIR /app

RUN addgroup -S lyra && adduser -S lyra -G lyra

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY patches/ ./patches/
COPY server/apps/auth server/apps/auth
COPY server/packages/auth-shared server/packages/auth-shared
COPY server/packages/http-error-shared server/packages/http-error-shared

RUN pnpm install --frozen-lockfile --ignore-scripts --filter @proj-lyra/auth-server...

RUN pnpm -F @proj-lyra/auth-server run build

EXPOSE 3000

USER lyra

CMD ["pnpm", "-F", "@proj-lyra/auth-server", "start"]
