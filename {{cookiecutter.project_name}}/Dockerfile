FROM node:24-trixie-slim AS deps
WORKDIR /build
ENV NODE_ENV=production
COPY package.json package-lock.json /build/
RUN \
  npm ci --only=production

FROM node:24-trixie-slim AS build
WORKDIR /build
COPY package.json package-lock.json tsconfig.json /build/
COPY ./src /build/src
RUN \
  npm install && \
  npm run build

FROM public.ecr.aws/lambda/nodejs:24 AS runtime
ENV NODE_ENV=production
COPY --from=deps /build/node_modules "${LAMBDA_TASK_ROOT}/node_modules"
COPY --from=build /build/dist/ "${LAMBDA_TASK_ROOT}/"
COPY package.json "${LAMBDA_TASK_ROOT}/"
CMD ["app.handler"]
