# syntax=docker/dockerfile:1

ARG BUN_VERSION=1.1.4
ARG DISTRO=debian
ARG PROD_BASE=debian:stable-slim

FROM oven/bun:${BUN_VERSION}-${DISTRO} AS builder

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY bun.lockb .
COPY package.json .

RUN bun install --frozen-lockfile --production

COPY src ./src

## add minify if it will work
RUN bun build ./src/index.ts --compile --sourcemap=inline --target=bun --outfile app.bin

FROM ${PROD_BASE} as production

RUN useradd -ms /bin/bash bun

WORKDIR /home/bun
USER bun

COPY --from=builder /usr/src/app/app.bin /usr/src/app.bin

ENV PORT=3000
EXPOSE 3000/tcp

ENV NODE_ENV=production

CMD [ "/usr/src/app.bin" ]
