FROM node:22-alpine
LABEL "language"="nodejs"
LABEL "framework"="next.js"

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

WORKDIR /src

RUN npm install -g pnpm@9

COPY package*.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

RUN pnpm build

EXPOSE 8080

CMD ["pnpm", "start"]