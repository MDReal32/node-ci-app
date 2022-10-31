# Builder App
FROM node:latest as builder

# Copy source to container
COPY .. /app
WORKDIR /app

# Install node dependencies
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn

# Test App
RUN yarn test

# Build App
RUN yarn build

CMD yarn node /app/dist/index.js