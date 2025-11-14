FROM node:22-alpine
LABEL "language"="nodejs"
LABEL "framework"="next.js"

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

WORKDIR /src

RUN npm install -g pnpm@9

COPY package*.json pnpm-lock.yaml* ./

RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi

COPY . .

RUN pnpm build

EXPOSE 8080

CMD ["pnpm", "start"]